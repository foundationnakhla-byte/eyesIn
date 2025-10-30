// ./app/api/user/route.ts
import { supabaseServer } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  const supabase = await supabaseServer()
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error) return NextResponse.json({ error: error.message }, { status: 401 })
  return NextResponse.json({ user })
}
