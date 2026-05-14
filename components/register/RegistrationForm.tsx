'use client'

import { useState, FormEvent } from 'react'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import Button from '@/components/ui/Button'

type FormState = {
  name: string
  instagram_id: string
  email: string
  phone: string
  why_invite: string
}

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function RegistrationForm() {
  const [form, setForm] = useState<FormState>({
    name: '',
    instagram_id: '',
    email: '',
    phone: '',
    why_invite: '',
  })
  const [errors, setErrors] = useState<Partial<FormState>>({})
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const validate = (): boolean => {
    const newErrors: Partial<FormState> = {}
    if (!form.name.trim()) newErrors.name = 'Name is required'
    if (!form.instagram_id.trim()) newErrors.instagram_id = 'Instagram ID is required'
    if (!form.email.trim()) newErrors.email = 'Email is required'
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) newErrors.email = 'Enter a valid email'
    if (!form.phone.trim()) newErrors.phone = 'Phone number is required'
    else if (!/^\+?[\d\s\-]{7,15}$/.test(form.phone)) newErrors.phone = 'Enter a valid phone number'
    if (!form.why_invite.trim()) newErrors.why_invite = 'Tell us why you should be invited'
    else if (form.why_invite.trim().length < 20) newErrors.why_invite = 'Please write at least 20 characters'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (field: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Something went wrong')
      setStatus('success')
    } catch (err) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Try again.')
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-white border-4 border-pop-black shadow-[8px_8px_0px_#00FFFF] p-10 text-center">
        <div className="text-6xl mb-6">🎉</div>
        <h2
          className="font-anton text-4xl uppercase text-pop-black mb-4"
          style={{ textShadow: '3px 3px 0px #FAFF00' }}
        >
          You&apos;re In The Queue!
        </h2>
        <p className="font-archivo text-lg text-pop-on-surface leading-relaxed mb-4">
          Your request has been received. We review every entry personally — if you&apos;re selected,
          you&apos;ll hear from us directly.
        </p>
        <p className="font-mono text-sm text-gray-500 uppercase tracking-widest">
          Keep an eye on your inbox (and your DMs).
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Full Name"
          placeholder="Your name"
          value={form.name}
          onChange={handleChange('name')}
          error={errors.name}
          autoComplete="name"
        />
        <Input
          label="Instagram ID"
          placeholder="@yourhandle"
          value={form.instagram_id}
          onChange={handleChange('instagram_id')}
          error={errors.instagram_id}
          autoComplete="off"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Email Address"
          type="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={handleChange('email')}
          error={errors.email}
          autoComplete="email"
        />
        <Input
          label="Phone Number"
          type="tel"
          placeholder="+91 98765 43210"
          value={form.phone}
          onChange={handleChange('phone')}
          error={errors.phone}
          autoComplete="tel"
        />
      </div>

      <Textarea
        label="Why Should We Invite You?"
        placeholder="Sell yourself. What's your vibe? What do you bring to the table? Be real, be bold — boring answers don't get invites."
        rows={5}
        value={form.why_invite}
        onChange={handleChange('why_invite')}
        error={errors.why_invite}
      />

      {status === 'error' && (
        <div className="border-4 border-red-500 bg-red-50 p-4 font-mono text-sm text-red-700 font-bold">
          ⚠ {errorMsg}
        </div>
      )}

      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 pt-2">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={status === 'loading'}
          className={status === 'loading' ? 'opacity-70 cursor-not-allowed' : ''}
        >
          {status === 'loading' ? '⏳ Submitting...' : '🚀 Submit My Request'}
        </Button>
        <p className="font-mono text-xs text-gray-500 uppercase tracking-wider">
          No spam. Ever. 🤙
        </p>
      </div>
    </form>
  )
}
