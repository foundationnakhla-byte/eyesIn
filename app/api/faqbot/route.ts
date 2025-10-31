// app/api/faqbot/route.ts
import { NextResponse } from "next/server"
import { FAQS } from "@/data/faq"

function normalize(s: string) {
  return s.toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, "").trim()
}

function score(q: string, cand: string) {
  // تشابه بسيط: عدد الكلمات المشتركة / عدد كلمات السؤال
  const qs = new Set(normalize(q).split(/\s+/).filter(Boolean))
  const cs = new Set(normalize(cand).split(/\s+/).filter(Boolean))
  if (!qs.size) return 0
  let inter = 0
  qs.forEach((w) => { if (cs.has(w)) inter++ })
  return inter / qs.size
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}))
  const q: string = body?.question || ""
  const lang: "ar" | "en" = body?.lang === "ar" ? "ar" : "en"

  if (!q.trim()) {
    return NextResponse.json({ answer: lang === "ar" ? "اكتب سؤالك من فضلك." : "Please enter your question." })
  }

  const pool = FAQS.filter((f) => f.lang === lang)
  let best = { a: "", s: 0 }
  for (const item of pool) {
    const s = score(q, item.q)
    if (s > best.s) best = { a: item.a, s }
  }

  if (best.s >= 0.3) {
    return NextResponse.json({ answer: best.a })
  }

  // جواب افتراضي مع اقتراحات
  const suggestions = pool.slice(0, 4).map((x) => x.q)
  return NextResponse.json({
    answer:
      lang === "ar"
        ? "لم أجد إجابة دقيقة. جرّب صياغة أخرى أو اختر من الأسئلة المقترحة."
        : "I couldn’t find an exact answer. Try rephrasing or pick a suggested question.",
    suggestions,
  })
}
