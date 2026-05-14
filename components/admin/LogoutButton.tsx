'use client'

import { useRouter } from 'next/navigation'

export default function AdminLogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <button
      onClick={handleLogout}
      className="font-mono text-xs font-bold uppercase tracking-widest border-4 border-secondary text-secondary px-4 py-2 hover:bg-secondary hover:text-pop-black transition-colors"
    >
      Logout →
    </button>
  )
}
