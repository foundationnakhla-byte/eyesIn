'use client'
import { createBrowserClient } from '@supabase/ssr'

export const supabaseBrowser = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// (اختياري – مفيد للتشخيص في dev)
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  ;(window as any).supabase = supabaseBrowser
}
