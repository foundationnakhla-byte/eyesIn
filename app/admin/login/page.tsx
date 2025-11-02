// app/admin/login/page.tsx

'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabaseBrowser } from '@/lib/supabase/client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useLanguage } from '@/lib/language-context'
import Link from 'next/link'

export default function AdminLoginPage() {
  const { language } = useLanguage()
  const isAr = language === 'ar'
  const router = useRouter()

  const t = isAr
    ? {
        title: 'تسجيل دخول الأدمن',
        email: 'البريد الإلكتروني',
        password: 'كلمة المرور',
        login: 'تسجيل الدخول',
        loggingIn: '...جاري تسجيل الدخول',
        error: 'تعذّر تسجيل الدخول. تأكد من البريد وكلمة المرور.',
        forgot: 'نسيت كلمة المرور؟',
        goHome: 'العودة للرئيسية',
        already: 'تم تسجيل الدخول مسبقًا، جارٍ التحويل...',
      }
    : {
        title: 'Admin Sign In',
        email: 'Email',
        password: 'Password',
        login: 'Sign in',
        loggingIn: 'Signing in...',
        error: 'Login failed. Check your email and password.',
        forgot: 'Forgot password?',
        goHome: 'Back to Home',
        already: 'You are already signed in. Redirecting...',
      }

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [info, setInfo] = useState<string | null>(null)

  // إذا فيه جلسة مسبقة، حوّل مباشرة
  useEffect(() => {
    let mounted = true
    ;(async () => {
      const { data } = await supabaseBrowser.auth.getSession()
      if (!mounted) return
      if (data.session) {
        setInfo(t.already)
        // تأكد من تزامن الكوكيز مع السيرفر ثم حوّل
        router.refresh()
        router.replace('/admin/projects/new')
      }
    })()
    return () => {
      mounted = false
    }
  }, [router, t.already])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (loading) return

    setError(null)
    setInfo(null)
    setLoading(true)

    const form = new FormData(e.currentTarget)
    const email = String(form.get('email') || '').trim()
    const password = String(form.get('password') || '')

    try {
      // تسجيل الدخول
      const { error: signInError } = await supabaseBrowser.auth.signInWithPassword({
        email,
        password,
      })

      if (signInError) {
        setError(signInError.message || t.error)
        return
      }

      // تأكيد الجلسة وتحديث الكوكيز
      await supabaseBrowser.auth.getSession()

      // نحدّث السيرفر كومبوننتس ليلتقطوا الجلسة الجديدة
      router.refresh()

      // نجاح: توجيه إلى صفحة إضافة مشروع
      router.replace('/admin/projects/new')
    } catch (err: any) {
      setError(err?.message || t.error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4" dir={isAr ? 'rtl' : 'ltr'}>
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">{t.title}</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <label htmlFor="email" className="text-sm font-medium">
                {t.email}
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                inputMode="email"
              />
            </div>

            <div className="grid gap-2">
              <label htmlFor="password" className="text-sm font-medium">
                {t.password}
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
              />
            </div>

            {error && (
              <p className="text-sm text-destructive">
                {isAr ? `خطأ: ${error}` : `Error: ${error}`}
              </p>
            )}

            {info && (
              <p className="text-sm text-muted-foreground">
                {info}
              </p>
            )}

            <Button type="submit" disabled={loading}>
              {loading ? t.loggingIn : t.login}
            </Button>

            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <Link href="/" className="hover:underline">
                {t.goHome}
              </Link>
              <Link href="/reset-password" className="hover:underline">
                {t.forgot}
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
