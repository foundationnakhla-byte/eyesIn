// ./lib/supabase/server.ts
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

/**
 * ملاحظة: استخدم هذا العميل فقط في:
 * - Route Handlers داخل app/api/**/

export async function supabaseServer() {
  // ✅ Next 16: cookies() صارت Promise — لازم await
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        // مهم: كل وظائف الكوكيز لازملها try/catch لأن Next ممكن يرمي أخطاء وقت الـ streaming
        get: (name: string) => {
          try {
            const c = cookieStore.get(name);
            return c?.value;
          } catch {
            return undefined;
          }
        },
        set: (name: string, value: string, options: any) => {
          try {
            cookieStore.set({ name, value, ...options });
          } catch {
            /* ignore */
          }
        },
        remove: (name: string, options: any) => {
          try {
            cookieStore.set({ name, value: "", ...options, maxAge: 0 });
          } catch {
            /* ignore */
          }
        },
      },
    }
  );
}
