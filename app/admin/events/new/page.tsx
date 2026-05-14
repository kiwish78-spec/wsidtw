import { redirect } from 'next/navigation'
import { getAdminFromCookies } from '@/lib/auth'
import AddEventForm from '@/components/admin/AddEventForm'
import AdminLogoutButton from '@/components/admin/LogoutButton'
import Link from 'next/link'

export const metadata = { title: 'Add Event — WSIDTW Admin' }

export default async function AddEventPage() {
  const isAdmin = await getAdminFromCookies()
  if (!isAdmin) redirect('/admin/login')

  return (
    <div className="min-h-screen bg-pop-bg">
      <header className="bg-pop-black border-b-4 border-secondary sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 md:px-10 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="font-anton text-2xl text-secondary uppercase" style={{ textShadow: '2px 2px 0px #FF00FF' }}>
              WSIDTW
            </Link>
            <span className="border-2 border-secondary text-secondary font-mono text-xs uppercase tracking-widest px-3 py-1">Admin</span>
            <span className="text-gray-600 font-mono text-xs">›</span>
            <span className="border-2 border-primary text-primary font-mono text-xs uppercase tracking-widest px-3 py-1">New Event</span>
          </div>
          <AdminLogoutButton />
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 md:px-10 py-10">
        <div className="mb-10">
          <Link href="/admin" className="font-mono text-xs uppercase tracking-widest text-gray-500 hover:text-primary transition-colors">
            ← Back to Dashboard
          </Link>
          <h1
            className="font-anton uppercase text-pop-black leading-none mt-4"
            style={{ fontSize: 'clamp(36px, 5vw, 64px)', textShadow: '3px 3px 0px #FAFF00' }}
          >
            ADD NEW
            <br />
            <span style={{ color: '#FF00FF', textShadow: '3px 3px 0px #000' }}>EVENT</span>
          </h1>
          <p className="font-mono text-sm text-gray-500 mt-3 uppercase tracking-widest">
            Fill in the details. Images upload to Cloudflare R2.
          </p>
        </div>

        <AddEventForm />
      </main>
    </div>
  )
}
