import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createServerClient } from "@supabase/ssr"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next({ request: { headers: req.headers } })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (key) => req.cookies.get(key)?.value,
        set: (key, value, options) => {
          res.cookies.set({ name: key, value, ...options })
        },
        remove: (key, options) => {
          res.cookies.set({ name: key, value: "", ...options })
        },
      },
    }
  )

  // هذا يسترجع الجلسة ويحدّث الكوكيز تلقائياً عند الحاجة
  await supabase.auth.getSession()

  return res
}

export const config = {
  // مرّر عبر كل المسارات التي قد تحتاج الجلسة (Pages + API + App Router)
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}