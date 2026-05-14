import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminToken, ADMIN_COOKIE } from '@/lib/auth'
import { supabaseAdmin } from '@/lib/supabase-admin'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const token = req.cookies.get(ADMIN_COOKIE)?.value
  if (!token || !(await verifyAdminToken(token))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  console.log('--- ADMIN REGISTRATIONS DEBUG ---')
  console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)
  console.log('Service key present:', !!process.env.SUPABASE_SERVICE_ROLE_KEY)
  console.log('Service key prefix:', process.env.SUPABASE_SERVICE_ROLE_KEY?.slice(0, 20))

  const { data, error, count } = await supabaseAdmin
    .from('registrations')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })

  console.log('Supabase error:', error)
  console.log('Supabase data:', data)
  console.log('Supabase count:', count)
  console.log('--- END DEBUG ---')

  if (error) {
    console.error('Fetch registrations error:', error)
    return NextResponse.json({ error: error.message, details: error }, { status: 500 })
  }

  return NextResponse.json({ registrations: data, count })
}
