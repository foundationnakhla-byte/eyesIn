// components/projects/latest-projects.tsx
'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/lib/language-context'

type Project = {
  slug: string
  cover_url: string
  title_ar: string
  title_en: string
  total_cost: number
}

export default function LatestProjectsSection() {
  const { language } = useLanguage()
  const isAr = language === 'ar'
  const t = isAr
    ? { title: 'أحدث المشاريع', view: 'عرض التفاصيل', cost: 'التكلفة الإجمالية' }
    : { title: 'Latest Projects', view: 'View details', cost: 'Total Cost' }

  const [data, setData] = useState<Project[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [err, setErr] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    fetch('/api/projects')
      .then(async (r) => {
        const json = await r.json().catch(() => null)
        if (!r.ok) throw new Error((json && json.error) || r.statusText)
        return json
      })
      .then((json) => {
        if (!mounted) return
        // تأكد إنها Array
        setData(Array.isArray(json) ? json : [])
      })
      .catch((e) => {
        if (!mounted) return
        setErr(e.message || 'Failed to load projects')
        setData([])
      })
      .finally(() => mounted && setLoading(false))
    return () => { mounted = false }
  }, [])

  // دايمًا رجّع Array للعرض
  const list: (Project | null)[] = useMemo(() => {
    if (loading) return new Array(3).fill(null) // skeletons
    return Array.isArray(data) ? data : []
  }, [loading, data])

  return (
    <section className="py-20 bg-muted/30" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">{t.title}</h2>

          {err && (
            <p className="text-center text-sm text-destructive mb-4">
              {isAr ? 'تعذّر تحميل المشاريع.' : 'Failed to load projects.'}
            </p>
          )}

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {list.map((p, i) => (
              <Card key={p?.slug ?? i} className="overflow-hidden">
                <div className="relative aspect-[16/10] bg-muted">
                  {p?.cover_url && (
                    <Image src={p.cover_url} alt={p.title_ar ?? p.title_en} fill className="object-cover" />
                  )}
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">
                    {isAr ? p?.title_ar ?? '—' : p?.title_en ?? '—'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    {t.cost}: <span className="font-semibold">
                      {p?.total_cost != null ? Number(p.total_cost).toLocaleString() : '—'}
                    </span>
                  </div>
                  {p?.slug ? (
                    <Button asChild size="sm">
                      <Link href={`/projects/${p.slug}`}>{t.view}</Link>
                    </Button>
                  ) : (
                    <div className="h-9" /> // placeholder لهيكل التحميل
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
