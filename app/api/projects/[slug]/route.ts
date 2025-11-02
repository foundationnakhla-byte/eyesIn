import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

type RouteParams = Promise<{ slug: string }>;
export const dynamic = "force-dynamic";

// GET: مشروع واحد (يُستخدم في صفحة التعديل)
export async function GET(_req: Request, { params }: { params: RouteParams }) {
  const { slug } = await params; // ✅ مهم
  const supabase = await supabaseServer();

  const { data, error } = await supabase
    .from("projects")
    .select("id, slug, title_ar, title_en, body_ar, body_en, cover_url, image1_url, image2_url, total_cost, published, created_at")
    .eq("slug", decodeURIComponent(slug))
    .maybeSingle();

  if (error || !data) {
    return NextResponse.json({ error: error?.message || "Not found" }, { status: 404 });
  }
  return NextResponse.json(data);
}

// PATCH: تعديل بواسطة slug (للأدمن)
export async function PATCH(req: Request, { params }: { params: RouteParams }) {
  const { slug } = await params; // ✅
  const supabase = await supabaseServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Auth required" }, { status: 401 });

  const { data: profile } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .maybeSingle();
  if (!profile?.is_admin) {
    return NextResponse.json({ error: "Only admins can update" }, { status: 403 });
  }

  const body = await req.json();
  const { data, error } = await supabase
    .from("projects")
    .update(body)
    .eq("slug", decodeURIComponent(slug))
    .select("slug")
    .maybeSingle();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data);
}

// DELETE: حذف بواسطة slug (للأدمن)
export async function DELETE(_req: Request, { params }: { params: RouteParams }) {
  const { slug } = await params; // ✅
  const supabase = await supabaseServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Auth required" }, { status: 401 });

  const { data: profile } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .maybeSingle();
  if (!profile?.is_admin) {
    return NextResponse.json({ error: "Only admins can delete" }, { status: 403 });
  }

  const { error } = await supabase
    .from("projects")
    .delete()
    .eq("slug", decodeURIComponent(slug));

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ ok: true });
}
