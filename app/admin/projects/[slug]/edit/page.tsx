// لا تضع "use client" هنا

import EditProjectClient from "./EditProjectClient";

type RouteParams = Promise<{ slug: string }>;

export default async function Page({ params }: { params: RouteParams }) {
  const { slug } = await params;                // ✅ نفك الـ Promise
  const currentSlug = decodeURIComponent(slug); // للتأكد

  return <EditProjectClient initialSlug={currentSlug} />;
}
