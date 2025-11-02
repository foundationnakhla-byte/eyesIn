// app//admin/projects/page.tsx
'use client'

import useSWR from 'swr'
import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const fetcher = (url: string) => fetch(url).then(r => r.json())

export default function AdminProjectsListPage() {
  const { data, error, mutate, isLoading } = useSWR('/api/admin/projects', fetcher)
  const [deleting, setDeleting] = useState<string | null>(null)

  async function handleDelete(slug: string) {
    if (!confirm('متأكد من الحذف؟')) return
    setDeleting(slug)
    try {
      const res = await fetch(`/api/projects/${encodeURIComponent(slug)}`, { method: 'DELETE' })
      if (!res.ok) {
        const j = await res.json().catch(() => ({}))
        alert(j?.error || 'فشل الحذف')
      } else {
        mutate()
      }
    } finally {
      setDeleting(null)
    }
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <Card>
        <CardHeader><CardTitle>إدارة المشاريع</CardTitle></CardHeader>
        <CardContent>
          {error && <div className="text-red-600">خطأ في الجلب</div>}
          {isLoading && <div>جارِ التحميل…</div>}
          {!isLoading && Array.isArray(data) && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left border-b">
                    <th className="py-2 px-2">العنوان</th>
                    <th className="py-2 px-2">Slug</th>
                    <th className="py-2 px-2">الحالة</th>
                    <th className="py-2 px-2">إجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((p: any) => (
                    <tr key={p.slug} className="border-b">
                      <td className="py-2 px-2">{p.title_ar || p.title_en}</td>
                      <td className="py-2 px-2">{p.slug}</td>
                      <td className="py-2 px-2">{p.published ? 'منشور' : 'مسودة'}</td>
                      <td className="py-2 px-2 flex gap-3">
                        <Link className="underline" href={`/admin/projects/${encodeURIComponent(p.slug)}/edit`}>تعديل</Link>
                        <Button variant="destructive" size="sm"
                          onClick={() => handleDelete(p.slug)}
                          disabled={deleting === p.slug}>
                          {deleting === p.slug ? 'يحذف…' : 'حذف'}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
