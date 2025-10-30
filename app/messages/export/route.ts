// src/app/api/messages/export/route.ts
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get("q") || "").trim();

  let query = supabaseAdmin
    .from("contacts")
    .select("*")
    .order("created_at", { ascending: false });

  if (q) {
    query = query.or(
      `name.ilike.%${q}%,email.ilike.%${q}%,phone.ilike.%${q}%,service.ilike.%${q}%,message.ilike.%${q}%`
    );
  }

  const { data, error } = await query;
  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  const rows = (data || []).map((r) => ({
    id: r.id,
    created_at: r.created_at,
    name: r.name,
    email: r.email,
    phone: r.phone ?? "",
    service: r.service ?? "",
    language: r.language ?? "",
    message: r.message.replace(/\r?\n/g, "\\n"),
  }));

  const header = "id,created_at,name,email,phone,service,language,message";
  const csv = [
    header,
    ...rows.map((r) =>
      [
        r.id,
        r.created_at,
        `"${r.name.replace(/"/g, '""')}"`,
        r.email,
        r.phone,
        r.service,
        r.language,
        `"${r.message.replace(/"/g, '""')}"`,
      ].join(",")
    ),
  ].join("\n");

  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="contacts_export.csv"`,
    },
  });
}
