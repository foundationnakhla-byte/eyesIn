'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'


type ProjectForm = {
  slug: string
  title_ar: string
  title_en: string
  body_ar: string
  body_en: string
  cover_url: string
  image1_url: string
  image2_url: string
  total_cost: number
  published: boolean
}

export default function EditProjectClient({ initialSlug }: { initialSlug: string }) {
  const r = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const [form, setForm] = useState<ProjectForm>({
    slug: '',
    title_ar: '',
    title_en: '',
    body_ar: '',
    body_en: '',
    cover_url: '',
    image1_url: '',
    image2_url: '',
    total_cost: 0,
    published: true,
  })

  // ملفات الاستبدال (اختيارية)
  const [coverFile, setCoverFile] = useState<File | null>(null)
  const [image1File, setImage1File] = useState<File | null>(null)
  const [image2File, setImage2File] = useState<File | null>(null)

  // معاينة محلية للصور المختارة
  const coverPreview = useMemo(
    () => (coverFile ? URL.createObjectURL(coverFile) : form.cover_url || ''),
    [coverFile, form.cover_url]
  )
  const image1Preview = useMemo(
    () => (image1File ? URL.createObjectURL(image1File) : form.image1_url || ''),
    [image1File, form.image1_url]
  )
  const image2Preview = useMemo(
    () => (image2File ? URL.createObjectURL(image2File) : form.image2_url || ''),
    [image2File, form.image2_url]
  )

  useEffect(() => {
    ;(async () => {
      const res = await fetch(`/api/projects/${encodeURIComponent(initialSlug)}`)
      const json = await res.json()
      if (!res.ok) {
        alert(json?.error || 'تعذر جلب المشروع')
        r.replace('/admin/projects')
        return
      }
      setForm(json)
      setLoading(false)
    })()
  }, [initialSlug, r])

  function set<K extends keyof ProjectForm>(k: K, v: ProjectForm[K]) {
    setForm(s => ({ ...s, [k]: v }))
  }

  async function uploadViaAPI(file: File, prefix: 'covers' | 'images') {
    const fd = new FormData()
    fd.append('file', file)
    fd.append('prefix', prefix)
    const res = await fetch('/api/storage/upload', { method: 'POST', body: fd })
    const j = await res.json().catch(() => ({}))
    if (!res.ok) throw new Error(j?.error || 'فشل رفع الملف')
    return j.publicUrl as string
  }

  async function onSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    try {
      const payload: ProjectForm = { ...form }

      // إذا اختار صور جديدة: ارفعها وخزّن الروابط
      if (coverFile) {
        payload.cover_url = await uploadViaAPI(coverFile, 'covers')
      }
      if (image1File) {
        payload.image1_url = await uploadViaAPI(image1File, 'images')
      }
      if (image2File) {
        payload.image2_url = await uploadViaAPI(image2File, 'images')
      }

      const res = await fetch(`/api/projects/${encodeURIComponent(initialSlug)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const j = await res.json().catch(() => ({}))
      if (!res.ok) {
        alert(j?.error || 'فشل الحفظ')
      } else {
        // رجّع للقائمة بعد الحفظ (خصوصًا لو تغيّر الـ slug)
        r.push('/admin/projects')
      }
    } catch (err: any) {
      alert(err?.message || 'حدث خطأ أثناء الحفظ')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="p-6">جارِ التحميل…</div>

  return (
    <div className="container mx-auto px-4 py-10 max-w-3xl">

      
      <Card>
        <CardHeader><CardTitle>تعديل مشروع</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={onSave} className="grid gap-4" noValidate>
            <div className="grid md:grid-cols-2 gap-3">
              <Input
                value={form.slug}
                onChange={e => set('slug', e.target.value)}
                placeholder="slug"
                required
              />
              <Input
                type="number"
                value={form.total_cost ?? 0}
                onChange={e => set('total_cost', Number(e.target.value))}
                placeholder="التكلفة"
              />
              <Input
                value={form.title_ar || ''}
                onChange={e => set('title_ar', e.target.value)}
                placeholder="العنوان (عربي)"
              />
              <Input
                value={form.title_en || ''}
                onChange={e => set('title_en', e.target.value)}
                placeholder="Title (English)"
              />
            </div>

            <Textarea
              value={form.body_ar || ''}
              onChange={e => set('body_ar', e.target.value)}
              rows={4}
              placeholder="شرح المشروع (عربي)"
            />
            <Textarea
              value={form.body_en || ''}
              onChange={e => set('body_en', e.target.value)}
              rows={4}
              placeholder="Project description (English)"
            />

            {/* غلاف */}
            <div className="grid md:grid-cols-2 gap-3 items-start">
              <div className="space-y-2">
                <label className="text-sm font-medium">الغلاف (استبدال اختياري)</label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={e => setCoverFile(e.currentTarget.files?.[0] ?? null)}
                />
                <p className="text-xs text-muted-foreground">
                  إذا لم تختر ملفًا، سيبقى رابط الغلاف الحالي كما هو.
                </p>
              </div>
              {coverPreview ? (
                <img src={coverPreview} alt="cover" className="rounded-lg border max-h-40 object-contain" />
              ) : null}
            </div>

            {/* صورة 1 */}
            <div className="grid md:grid-cols-2 gap-3 items-start">
              <div className="space-y-2">
                <label className="text-sm font-medium">صورة 1 (استبدال اختياري)</label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={e => setImage1File(e.currentTarget.files?.[0] ?? null)}
                />
              </div>
              {image1Preview ? (
                <img src={image1Preview} alt="image1" className="rounded-lg border max-h-40 object-contain" />
              ) : null}
            </div>

            {/* صورة 2 */}
            <div className="grid md:grid-cols-2 gap-3 items-start">
              <div className="space-y-2">
                <label className="text-sm font-medium">صورة 2 (استبدال اختياري)</label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={e => setImage2File(e.currentTarget.files?.[0] ?? null)}
                />
              </div>
              {image2Preview ? (
                <img src={image2Preview} alt="image2" className="rounded-lg border max-h-40 object-contain" />
              ) : null}
            </div>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={!!form.published}
                onChange={e => set('published', e.target.checked)}
              />
              <span>منشور</span>
            </label>

            <div className="flex justify-end gap-2">
              <Button type="submit" disabled={saving}>
                {saving ? 'يحفظ…' : 'حفظ'}
              </Button>
              <Button type="button" variant="secondary" onClick={() => r.back()}>
                رجوع
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
