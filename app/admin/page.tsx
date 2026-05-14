import { redirect } from 'next/navigation'
import { getAdminFromCookies } from '@/lib/auth'
import RegistrationsTable from '@/components/admin/RegistrationsTable'
import AdminLogoutButton from '@/components/admin/LogoutButton'

export const metadata = {
  title: 'Admin Dashboard — WSIDTW',
}

export default async function AdminPage() {
  const isAdmin = await getAdminFromCookies()
  if (!isAdmin) redirect('/admin/login')

  return (
    <div className="min-h-screen bg-pop-bg">
      {/* Admin header */}
      <header className="bg-pop-black border-b-4 border-secondary sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 md:px-10 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div
              className="font-anton text-2xl text-secondary uppercase"
              style={{ textShadow: '2px 2px 0px #FF00FF' }}
            >
              WSIDTW
            </div>
            <span className="border-2 border-secondary text-secondary font-mono text-xs uppercase tracking-widest px-3 py-1">
              Admin
            </span>
          </div>
          <AdminLogoutButton />
        </div>
      </header>

      {/* Dashboard content */}
      <main className="max-w-7xl mx-auto px-4 md:px-10 py-10">
        {/* Page title */}
        <div className="mb-10">
          <div className="inline-block bg-secondary border-4 border-pop-black px-4 py-2 font-mono text-xs font-bold uppercase tracking-widest shadow-[3px_3px_0px_#000] mb-4 rotate-[-1deg]">
            🎟 Villa Night · 16 May 2026
          </div>
          <h1
            className="font-anton uppercase text-pop-black leading-none"
            style={{
              fontSize: 'clamp(36px, 5vw, 64px)',
              textShadow: '3px 3px 0px #FAFF00',
            }}
          >
            REGISTRATIONS
            <br />
            <span style={{ color: '#FF00FF', textShadow: '3px 3px 0px #000' }}>
              DASHBOARD
            </span>
          </h1>
          <p className="font-mono text-sm text-gray-500 mt-3 uppercase tracking-widest">
            Click any row to view full details
          </p>
        </div>

        <RegistrationsTable />
      </main>
    </div>
  )
}
