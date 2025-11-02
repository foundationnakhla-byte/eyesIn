'use client'

import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabaseBrowser } from '@/lib/supabase/client'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

function safeName(s: string) {
  return s.replace(/[^a-zA-Z0-9._-]/g, '_')
}

// يرسل الملف إلى /api/storage/upload (سيرفري)
async function uploadFileOrThrow(file: File | null, prefix: string) {
  if (!file) throw new Error('الملف مفقود')
  if (file.size === 0) throw new Error('الملف فارغ')

  const fd = new FormData()
  // اسم الملف فقط للتوثيق—المسار النهائي يُجهّز في الـ API
  fd.append('file', file, safeName(file.name))
  fd.append('prefix', prefix)

  const res = await fetch('/api/storage/upload', {
    method: 'POST',
    body: fd,
  })

  if (!res.ok) {
    let msg = res.statusText
    try {
      const j = await res.json()
      if (j?.error) msg = j.error
    } catch {}
    throw new Error(`Storage: ${msg}`)
  }

  const json = await res.json()
  return json.publicUrl as string
}

export default function NewProjectPage() {
  const formRef = useRef<HTMLFormElement>(null)
  const [loading, setLoading] = useState(false)
  const r = useRouter()

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    e.stopPropagation()

    const formEl = formRef.current
    if (!formEl) {
      alert('Form element not found')
      return
    }

    setLoading(true)
    try {
      // تحقّق الجلسة في المتصفّح (تنبيه واضح إذا مو مسجّل)
      const { data: { user }, error: uErr } = await supabaseBrowser.auth.getUser()
      if (!user) {
        console.error('no user session on browser', uErr)
        throw new Error('الرجاء تسجيل الدخول كأدمن ثم إعادة المحاولة.')
      }

      const fd = new FormData(formEl)
      const slug = String(fd.get('slug') || '').trim()
      if (!slug) throw new Error('Slug مطلوب')

      const cover  = fd.get('cover')  as File | null
      const image1 = fd.get('image1') as File | null
      const image2 = fd.get('image2') as File | null

      // الرفع عبر API السيرفر (Service Role) → لا RLS
      const [coverUrl, image1Url, image2Url] = await Promise.all([
        uploadFileOrThrow(cover,  'covers'),
        uploadFileOrThrow(image1, 'images'),
        uploadFileOrThrow(image2, 'images'),
      ])

      const payload = {
        slug,
        cover_url: coverUrl,
        title_ar: String(fd.get('title_ar') || ''),
        title_en: String(fd.get('title_en') || ''),
        total_cost: Number(fd.get('total_cost') || 0),
        body_ar: String(fd.get('body_ar') || ''),
        body_en: String(fd.get('body_en') || ''),
        image1_url: image1Url,
        image2_url: image2Url,
        published: true,
      }

      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error(await res.text())

      r.push(`/projects/${slug}`)
    } catch (err: any) {
      console.error(err)
      alert(err?.message || 'حدث خطأ أثناء الإضافة')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-10 max-w-3xl">
      <Card>
        <CardHeader><CardTitle>إضافة مشروع جديد</CardTitle></CardHeader>
        <CardContent>
          <form ref={formRef} onSubmit={onSubmit} className="grid gap-4" noValidate>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Input name="slug" placeholder="slug-unique" required />
              <Input name="total_cost" type="number" placeholder="التكلفة الإجمالية" required />
              <Input name="title_ar" placeholder="العنوان (عربي)" required />
              <Input name="title_en" placeholder="Title (English)" required />
            </div>

            <Textarea name="body_ar" placeholder="شرح المشروع (عربي)" rows={4} required />
            <Textarea name="body_en" placeholder="Project description (English)" rows={4} required />

            <div className="grid md:grid-cols-3 gap-3">
              <div>
                <label className="text-sm mb-1 block">غلاف</label>
                <Input name="cover" type="file" accept="image/*" required />
              </div>
              <div>
                <label className="text-sm mb-1 block">صورة 1</label>
                <Input name="image1" type="file" accept="image/*" required />
              </div>
              <div>
                <label className="text-sm mb-1 block">صورة 2</label>
                <Input name="image2" type="file" accept="image/*" required />
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button type="submit" disabled={loading}>
                {loading ? 'جاري الحفظ...' : 'حفظ المشروع'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
