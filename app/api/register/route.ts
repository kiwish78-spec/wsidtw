import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, instagram_id, email, phone, why_invite } = body

    if (!name || !instagram_id || !email || !phone || !why_invite) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    const { error } = await supabase.from('registrations').insert([
      {
        name: name.trim(),
        instagram_id: instagram_id.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        why_invite: why_invite.trim(),
      },
    ])

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json(
          { error: 'This email or Instagram ID has already been submitted.' },
          { status: 409 }
        )
      }
      throw error
    }

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (err) {
    console.error('Registration error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
