'use client'
import { useLanguage } from '@/lib/language-context'

export default function ClientText({
  titleAr, titleEn, bodyAr, bodyEn, totalCost,
}: { titleAr: string; titleEn: string; bodyAr: string; bodyEn: string; totalCost: number }) {
  const { language } = useLanguage()
  const isAr = language === 'ar'
  return (
    <div dir={isAr ? 'rtl' : 'ltr'}>
      <h1 className="text-3xl font-bold mb-2">{isAr ? titleAr : titleEn}</h1>
      <p className="text-muted-foreground leading-relaxed mb-3">{isAr ? bodyAr : bodyEn}</p>
      <div className="text-sm">
        {isAr ? 'التكلفة الإجمالية' : 'Total Cost'}: <span className="font-semibold">{totalCost.toLocaleString()}</span>
      </div>
    </div>
  )
}
