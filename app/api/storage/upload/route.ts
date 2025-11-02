import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { supabaseServer } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  try {
    // 1) جلسة المستخدم
    const supabase = await supabaseServer()
    const { data: { user }, error: meErr } = await supabase.auth.getUser()
    if (meErr || !user) {
      return NextResponse.json({ error: 'Auth session missing' }, { status: 401 })
    }

    // 2) لازم يكون أدمن
    const { data: profile, error: pErr } = await supabase
      .from('profiles')
      .select('is_admin')
      .eq('id', user.id)
      .maybeSingle()
    if (pErr) return NextResponse.json({ error: pErr.message }, { status: 500 })
    if (!profile?.is_admin) {
      return NextResponse.json({ error: 'Only admins can upload' }, { status: 403 })
    }

    // 3) استلام الملف
    const form = await req.formData()
    const file = form.get('file') as File | null
    const prefix = String(form.get('prefix') || 'uploads')
    if (!file) return NextResponse.json({ error: 'file missing' }, { status: 400 })
    if (file.size === 0) return NextResponse.json({ error: 'empty file' }, { status: 400 })

    // 4) عميل Service Role (يتجاوز RLS – لا تفضحه في المتصفح)
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
    if (!url || !serviceKey) {
      return NextResponse.json({ error: 'Missing Supabase env vars' }, { status: 500 })
    }
    const admin = createClient(url, serviceKey)

    // 5) تجهيز المسار والرفع
    const safe = (s: string) => s.replace(/[^a-zA-Z0-9._-]/g, '_')
    const ext = file.name.includes('.') ? '.' + file.name.split('.').pop() : ''
    const path = `${safe(prefix)}/${Date.now()}_${crypto.randomUUID()}${ext}`
    const buffer = new Uint8Array(await file.arrayBuffer())

    const { data, error } = await admin.storage
      .from('projects')
      .upload(path, buffer, {
        upsert: true,
        contentType: file.type || 'application/octet-stream',
        cacheControl: '3600',
      })
    if (error) {
      return NextResponse.json({ error: `Storage upload failed: ${error.message}` }, { status: 400 })
    }

    const { data: pub } = admin.storage.from('projects').getPublicUrl(data.path)
    return NextResponse.json({ ok: true, path: data.path, publicUrl: pub.publicUrl })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Unexpected error' }, { status: 500 })
  }
}
