// src/app/messages/page.tsx
import { supabaseAdmin } from "@/lib/supabase/admin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Contact = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string | null;
  service: string | null;
  message: string;
  language: "ar" | "en" | null;
};

function formatDate(dt: string) {
  return new Date(dt).toLocaleString("ar-SY", { hour12: false });
}

export const revalidate = 0; // دايمًا حديث

export default async function MessagesPage({
  searchParams,
}: {
  searchParams?: { q?: string; page?: string; per?: string };
}) {
  const q = (searchParams?.q || "").trim();
  const page = Math.max(parseInt(searchParams?.page || "1", 10), 1);
  const per = Math.min(Math.max(parseInt(searchParams?.per || "20", 10), 5), 100);
  const from = (page - 1) * per;
  const to = from + per - 1;

  // فلترة بسيطة بالـ server
  let query = supabaseAdmin
    .from("contacts")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to);

  if (q) {
    // بحث جزئي بالاسم/الإيميل/الهاتف/الخدمة/النص
    query = query.or(
      `name.ilike.%${q}%,email.ilike.%${q}%,phone.ilike.%${q}%,service.ilike.%${q}%,message.ilike.%${q}%`
    );
  }

  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error("Failed to load messages");
  }

  const rows = (data || []) as Contact[];
  const total = count || 0;
  const totalPages = Math.max(Math.ceil(total / per), 1);

  return (
    <div className="container mx-auto px-4 py-10">
      <Card>
        <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <CardTitle className="text-2xl">الرسائل الواردة</CardTitle>
          <div className="flex items-center gap-2">
            <form className="flex gap-2" action="/messages" method="get">
              <Input name="q" defaultValue={q} placeholder="ابحث بالاسم/الإيميل/النص..." />
              <input type="hidden" name="per" value={per} />
              <Button type="submit">بحث</Button>
            </form>
            <Link
              href={`/api/messages/export${q ? `?q=${encodeURIComponent(q)}` : ""}`}
              className="underline text-sm"
              prefetch={false}
            >
              تصدير CSV
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b">
                  <th className="py-2 px-2">التاريخ</th>
                  <th className="py-2 px-2">الاسم</th>
                  <th className="py-2 px-2">الإيميل</th>
                  <th className="py-2 px-2">الهاتف</th>
                  <th className="py-2 px-2">الخدمة</th>
                  <th className="py-2 px-2">الرسالة</th>
                  <th className="py-2 px-2">اللغة</th>
                </tr>
              </thead>
              <tbody>
                {rows.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-6 text-center text-muted-foreground">
                      لا توجد رسائل.
                    </td>
                  </tr>
                ) : (
                  rows.map((r) => (
                    <tr key={r.id} className="border-b align-top">
                      <td className="py-2 px-2 whitespace-nowrap">{formatDate(r.created_at)}</td>
                      <td className="py-2 px-2">{r.name}</td>
                      <td className="py-2 px-2">
                        <a className="underline" href={`mailto:${r.email}`}>{r.email}</a>
                      </td>
                      <td className="py-2 px-2">{r.phone || "-"}</td>
                      <td className="py-2 px-2">{r.service || "-"}</td>
                      <td className="py-2 px-2 max-w-[520px]">
                        <div className="whitespace-pre-wrap leading-6">{r.message}</div>
                      </td>
                      <td className="py-2 px-2">{r.language || "-"}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4">
            <div className="text-xs text-muted-foreground">
              صفحة {page} من {totalPages} — إجمالي {total} رسالة
            </div>
            <div className="flex gap-2">
              <Link
                prefetch={false}
                href={`/messages?${new URLSearchParams({ q, page: String(Math.max(1, page - 1)), per: String(per) })}`}
                className={`px-3 py-1 rounded border ${page <= 1 ? "pointer-events-none opacity-50" : ""}`}
              >
                السابق
              </Link>
              <Link
                prefetch={false}
                href={`/messages?${new URLSearchParams({ q, page: String(Math.min(totalPages, page + 1)), per: String(per) })}`}
                className={`px-3 py-1 rounded border ${page >= totalPages ? "pointer-events-none opacity-50" : ""}`}
              >
                التالي
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
