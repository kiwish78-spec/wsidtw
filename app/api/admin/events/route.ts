import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminToken, ADMIN_COOKIE } from '@/lib/auth'
import { supabaseAdmin } from '@/lib/supabase-admin'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const token = req.cookies.get(ADMIN_COOKIE)?.value
  if (!token || !(await verifyAdminToken(token))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data, error } = await supabaseAdmin
    .from('events')
    .select(`*, event_images(id, url, r2_key, display_order)`)
    .order('date', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ events: data })
}

export async function POST(req: NextRequest) {
  const token = req.cookies.get(ADMIN_COOKIE)?.value
  if (!token || !(await verifyAdminToken(token))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { title, host, date, time, venue, description, images } = body

    if (!title || !host || !date || !time || !venue) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const { data: event, error: eventError } = await supabaseAdmin
      .from('events')
      .insert([{ title, host, date, time, venue, description: description || null }])
      .select()
      .single()

    if (eventError) throw eventError

    if (images && images.length > 0) {
      const imageRows = images.map(
        (img: { url: string; key: string }, idx: number) => ({
          event_id: event.id,
          url: img.url,
          r2_key: img.key,
          display_order: idx,
        })
      )
      const { error: imgError } = await supabaseAdmin
        .from('event_images')
        .insert(imageRows)
      if (imgError) throw imgError
    }

    return NextResponse.json({ event }, { status: 201 })
  } catch (err) {
    console.error('Create event error:', err)
    return NextResponse.json({ error: 'Failed to create event' }, { status: 500 })
  }
}
