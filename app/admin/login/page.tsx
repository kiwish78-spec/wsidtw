'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Invalid credentials')
      router.push('/admin')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 bg-pop-black"
      style={{
        backgroundImage: 'radial-gradient(circle, rgba(255,0,255,0.15) 1px, transparent 1px)',
        backgroundSize: '20px 20px',
      }}
    >
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div
            className="font-anton text-5xl text-secondary uppercase mb-2"
            style={{ textShadow: '4px 4px 0px #FF00FF' }}
          >
            WSIDTW
          </div>
          <div className="font-mono text-xs text-gray-500 uppercase tracking-widest">
            Admin Portal
          </div>
        </div>

        {/* Login card */}
        <div className="bg-white border-4 border-secondary shadow-[10px_10px_0px_#FAFF00]">
          <div className="bg-secondary border-b-4 border-pop-black px-6 py-4">
            <h1 className="font-anton text-2xl uppercase text-pop-black">
              🔐 Restricted Access
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="flex flex-col gap-1">
              <label className="font-mono font-bold text-sm uppercase tracking-widest text-pop-black">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                autoComplete="username"
                required
                className="w-full px-4 py-3 border-4 border-pop-black font-archivo text-base focus:outline-none focus:border-primary bg-white"
                placeholder="admin"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-mono font-bold text-sm uppercase tracking-widest text-pop-black">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                className="w-full px-4 py-3 border-4 border-pop-black font-archivo text-base focus:outline-none focus:border-primary bg-white"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="border-4 border-red-500 bg-red-50 p-4 font-mono text-sm text-red-700 font-bold">
                ⚠ {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-primary text-white border-4 border-pop-black px-6 py-4 font-mono text-base font-bold uppercase tracking-widest shadow-[6px_6px_0px_#000] transition-all
                ${loading ? 'opacity-60 cursor-not-allowed' : 'hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-[2px_2px_0px_#000]'}`}
            >
              {loading ? '⏳ Authenticating...' : 'Enter Dashboard →'}
            </button>
          </form>
        </div>

        <p className="text-center font-mono text-xs text-gray-600 mt-6 uppercase tracking-widest">
          Unauthorized access is prohibited.
        </p>
      </div>
    </div>
  )
}
