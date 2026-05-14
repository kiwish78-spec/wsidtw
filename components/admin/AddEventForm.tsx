'use client'

import { useState, useRef, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import Button from '@/components/ui/Button'

type ImageUpload = {
  id: string
  file: File
  preview: string
  status: 'pending' | 'uploading' | 'done' | 'error'
  url?: string
  key?: string
  error?: string
}

type FormState = {
  title: string
  host: string
  date: string
  time: string
  venue: string
  description: string
}

export default function AddEventForm() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [form, setForm] = useState<FormState>({
    title: '',
    host: '',
    date: '',
    time: '',
    venue: '',
    description: '',
  })
  const [images, setImages] = useState<ImageUpload[]>([])
  const [submitting, setSubmitting] = useState(false)
  const [errors, setErrors] = useState<Partial<FormState>>({})
  const [submitError, setSubmitError] = useState('')

  const handleChange = (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm(prev => ({ ...prev, [field]: e.target.value }))
      if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }))
    }

  const handleFiles = (files: FileList | null) => {
    if (!files) return
    const newImages: ImageUpload[] = Array.from(files).map(file => ({
      id: Math.random().toString(36).slice(2),
      file,
      preview: URL.createObjectURL(file),
      status: 'pending',
    }))
    setImages(prev => [...prev, ...newImages])
  }

  const removeImage = (id: string) => {
    setImages(prev => {
      const img = prev.find(i => i.id === id)
      if (img) URL.revokeObjectURL(img.preview)
      return prev.filter(i => i.id !== id)
    })
  }

  const reorderImage = (id: string, dir: 'up' | 'down') => {
    setImages(prev => {
      const idx = prev.findIndex(i => i.id === id)
      if (idx === -1) return prev
      const next = [...prev]
      const swapIdx = dir === 'up' ? idx - 1 : idx + 1
      if (swapIdx < 0 || swapIdx >= next.length) return prev
      ;[next[idx], next[swapIdx]] = [next[swapIdx], next[idx]]
      return next
    })
  }

  const uploadImage = async (img: ImageUpload): Promise<ImageUpload> => {
    setImages(prev => prev.map(i => i.id === img.id ? { ...i, status: 'uploading' } : i))
    try {
      const fd = new FormData()
      fd.append('file', img.file)
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Upload failed')
      const updated = { ...img, status: 'done' as const, url: data.url, key: data.key }
      setImages(prev => prev.map(i => i.id === img.id ? updated : i))
      return updated
    } catch (err) {
      const updated = { ...img, status: 'error' as const, error: err instanceof Error ? err.message : 'Upload failed' }
      setImages(prev => prev.map(i => i.id === img.id ? updated : i))
      return updated
    }
  }

  const validate = (): boolean => {
    const e: Partial<FormState> = {}
    if (!form.title.trim()) e.title = 'Required'
    if (!form.host.trim()) e.host = 'Required'
    if (!form.date) e.date = 'Required'
    if (!form.time) e.time = 'Required'
    if (!form.venue.trim()) e.venue = 'Required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setSubmitting(true)
    setSubmitError('')

    try {
      // Upload all pending images
      const toUpload = images.filter(i => i.status === 'pending')
      const uploaded = await Promise.all(toUpload.map(uploadImage))

      // Collect all done images (previously uploaded + newly uploaded)
      const allImages = [
        ...images.filter(i => i.status === 'done'),
        ...uploaded.filter(i => i.status === 'done'),
      ]

      const failed = uploaded.filter(i => i.status === 'error')
      if (failed.length > 0) {
        setSubmitError(`${failed.length} image(s) failed to upload. Remove them and try again.`)
        setSubmitting(false)
        return
      }

      const res = await fetch('/api/admin/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          images: allImages.map(i => ({ url: i.url!, key: i.key! })),
        }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to create event')

      router.push('/admin')
      router.refresh()
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-8">
      {/* Event details */}
      <div className="bg-white border-4 border-pop-black shadow-pop p-8">
        <div className="font-mono text-xs font-bold uppercase tracking-widest text-pop-black border-b-4 border-pop-black pb-3 mb-6">
          Event Details
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <Input label="Event Title" placeholder="e.g. Villa Night Lonavala" value={form.title} onChange={handleChange('title')} error={errors.title} />
          </div>
          <Input label="Host / Organiser" placeholder="e.g. WSIDTW x Kiwish" value={form.host} onChange={handleChange('host')} error={errors.host} />
          <Input label="Venue" placeholder="e.g. Private Villa, Lonavala" value={form.venue} onChange={handleChange('venue')} error={errors.venue} />
          <Input label="Date" type="date" value={form.date} onChange={handleChange('date')} error={errors.date} />
          <Input label="Time" type="time" value={form.time} onChange={handleChange('time')} error={errors.time} />
          <div className="md:col-span-2">
            <Textarea label="Description (optional)" placeholder="What's this event about? Keep it hype." rows={4} value={form.description} onChange={handleChange('description')} />
          </div>
        </div>
      </div>

      {/* Image upload */}
      <div className="bg-white border-4 border-pop-black shadow-pop p-8">
        <div className="font-mono text-xs font-bold uppercase tracking-widest text-pop-black border-b-4 border-pop-black pb-3 mb-6">
          Event Images
          <span className="ml-2 text-gray-400 normal-case font-normal">(max ~4MB each · jpg, png, webp)</span>
        </div>

        {/* Drop zone */}
        <div
          className="border-4 border-dashed border-pop-black p-10 text-center cursor-pointer hover:bg-pop-surface transition-colors mb-6"
          onClick={() => fileInputRef.current?.click()}
          onDragOver={e => e.preventDefault()}
          onDrop={e => { e.preventDefault(); handleFiles(e.dataTransfer.files) }}
        >
          <div className="text-4xl mb-3">📸</div>
          <div className="font-mono font-bold text-sm uppercase tracking-widest text-pop-black">
            Click or drag images here
          </div>
          <div className="font-arquivo text-xs text-gray-500 mt-1">Multiple images supported</div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={e => handleFiles(e.target.files)}
          />
        </div>

        {/* Image preview grid */}
        {images.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((img, idx) => (
              <div key={img.id} className="relative border-4 border-pop-black group">
                {/* Preview */}
                <div className="aspect-square overflow-hidden bg-pop-surface">
                  <img src={img.preview} alt="" className="w-full h-full object-cover" />
                </div>

                {/* Status overlay */}
                {img.status === 'uploading' && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <div className="font-mono text-xs text-secondary uppercase tracking-widest animate-pulse">Uploading...</div>
                  </div>
                )}
                {img.status === 'done' && (
                  <div className="absolute top-2 right-2 bg-tertiary border-2 border-pop-black w-6 h-6 flex items-center justify-center text-xs font-bold">✓</div>
                )}
                {img.status === 'error' && (
                  <div className="absolute inset-0 bg-red-500/70 flex items-center justify-center p-2">
                    <div className="font-mono text-xs text-white text-center">{img.error}</div>
                  </div>
                )}

                {/* Order badge */}
                <div className="absolute top-2 left-2 bg-secondary border-2 border-pop-black w-6 h-6 flex items-center justify-center font-mono text-xs font-bold">
                  {idx + 1}
                </div>

                {/* Controls */}
                <div className="flex border-t-4 border-pop-black">
                  <button
                    type="button"
                    onClick={() => reorderImage(img.id, 'up')}
                    disabled={idx === 0}
                    className="flex-1 py-1 font-mono text-xs border-r-2 border-pop-black hover:bg-secondary disabled:opacity-30 transition-colors"
                  >←</button>
                  <button
                    type="button"
                    onClick={() => reorderImage(img.id, 'down')}
                    disabled={idx === images.length - 1}
                    className="flex-1 py-1 font-mono text-xs border-r-2 border-pop-black hover:bg-secondary disabled:opacity-30 transition-colors"
                  >→</button>
                  <button
                    type="button"
                    onClick={() => removeImage(img.id)}
                    className="flex-1 py-1 font-mono text-xs text-red-600 hover:bg-red-100 transition-colors"
                  >✕</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Submit */}
      {submitError && (
        <div className="border-4 border-red-500 bg-red-50 p-4 font-mono text-sm text-red-700 font-bold">
          ⚠ {submitError}
        </div>
      )}

      <div className="flex flex-wrap gap-4">
        <Button type="submit" variant="primary" size="lg" disabled={submitting} className={submitting ? 'opacity-70 cursor-not-allowed' : ''}>
          {submitting ? '⏳ Saving...' : '🚀 Publish Event'}
        </Button>
        <Button type="button" variant="outline" size="lg" onClick={() => router.push('/admin')}>
          Cancel
        </Button>
      </div>
    </form>
  )
}
