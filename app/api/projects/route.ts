// app/api/projects/route.ts
import { NextResponse } from "next/server"
import { supabaseServer } from "@/lib/supabase/server"

export const dynamic = "force-dynamic"

// GET: آخر المشاريع المنشورة
export async function GET() {
  const supabase = await supabaseServer()

  // رجّع فقط المشاريع المنشورة، الأحدث أولاً، وحدّها بـ 6
  const { data, error } = await supabase
    .from("projects")
    .select("slug, cover_url, title_ar, title_en, total_cost, published")
    .eq("published", true)
    .order("created_at", { ascending: false })
    .limit(6)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // دايمًا رجّع Array
  return NextResponse.json(Array.isArray(data) ? data : [], {
    status: 200,
    headers: {
      "Cache-Control": "no-store", // لا كاش على هالمسار
    },
  })
}

// POST: الإدراج (يبقى مثل ما ضبطناه سابقاً مع تحقّق الأدمن)
export async function POST(req: Request) {
  const supabase = await supabaseServer()

  // تحقّق من المستخدم → لازم يكون أدمن
  const {
    data: { user },
    error: meErr,
  } = await supabase.auth.getUser()
  if (meErr || !user) {
    return NextResponse.json({ error: "Auth session missing!" }, { status: 401 })
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .maybeSingle()

  if (!profile?.is_admin) {
    return NextResponse.json({ error: "Only admins can create projects." }, { status: 403 })
  }

  // استقبل البيانات
  const body = await req.json()

  // إدراج
  const { data, error } = await supabase.from("projects").insert(body).select("slug").maybeSingle()
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  return NextResponse.json(data, { status: 201 })
}






