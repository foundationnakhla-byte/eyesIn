"use client"

import { useState } from "react"
import { MessageCircle, Send, X } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function ChatWidget() {
  const { language } = useLanguage()
  const isAr = language === "ar"
  const t = isAr
    ? {
        ask: "اكتب سؤالك...",
        open: "مساعدة",
        send: "إرسال",
        bot: "المساعد",
      }
    : {
        ask: "Type your question...",
        open: "Help",
        send: "Send",
        bot: "Assistant",
      }

  const [open, setOpen] = useState(false)
  const [text, setText] = useState("")
  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState<{ role: "user" | "bot"; content: string }[]>([
    { role: "bot", content: isAr ? "أهلاً! كيف فيني ساعدك؟" : "Hi! How can I help?" },
  ])

  async function send(q?: string) {
    const question = (q ?? text).trim()
    if (!question) return
    setMessages((m) => [...m, { role: "user", content: question }])
    setText("")
    setLoading(true)
    try {
      const res = await fetch("/api/faqbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, lang: isAr ? "ar" : "en" }),
      })
      const data = await res.json()
      const answer = data?.answer || (isAr ? "تعذر الحصول على إجابة." : "Couldn’t get an answer.")
      setMessages((m) => [...m, { role: "bot", content: answer }])
      if (Array.isArray(data?.suggestions) && data.suggestions.length) {
        setMessages((m) => [
          ...m,
          { role: "bot", content: (isAr ? "اقتراحات: " : "Suggestions: ") + data.suggestions.join(" • ") },
        ])
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* زر الفتح */}
      <button
        onClick={() => setOpen(true)}
        className="fixed z-50 bottom-5 rtl:left-5 ltr:right-5 w-14 h-14 rounded-full shadow-lg bg-primary text-primary-foreground"
        aria-label={t.open}
      >
        <MessageCircle className="w-6 h-6 m-auto" />
      </button>

      {/* الصندوق */}
      {open && (
        <div className="fixed z-50 bottom-24 rtl:left-5 ltr:right-5 w-[340px] max-w-[90vw] rounded-2xl border bg-background shadow-xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <div className="font-semibold">{t.bot}</div>
            <button className="opacity-70 hover:opacity-100" onClick={() => setOpen(false)}>
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="h-72 p-3 space-y-2 overflow-y-auto">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`px-3 py-2 rounded-xl text-sm ${
                    m.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {loading && <div className="text-xs opacity-70">{isAr ? "جارٍ التفكير..." : "Thinking..."}</div>}
          </div>

          <div className="p-3 border-t flex items-center gap-2">
            <Input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={t.ask}
              onKeyDown={(e) => e.key === "Enter" && send()}
            />
            <Button onClick={() => send()} disabled={loading || !text.trim()} size="icon">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </>
  )
}
