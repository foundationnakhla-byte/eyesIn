// app/projects/[slug]/page.tsx
import { notFound } from "next/navigation"
import { supabaseServer } from "@/lib/supabase/server"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
export const revalidate = 0
export const dynamic = "force-dynamic"

// لاحظ: نوع params صار Promise ولازم نعمل await
type RouteParams = Promise<{ slug: string }>

export default async function ProjectPage({
  params,
}: {
  params: RouteParams
}) {
  const { slug } = await params // 👈 ضروري
  const slugParam = decodeURIComponent(slug).trim().toLowerCase()

  const supabase = await supabaseServer()

  const { data: project, error } = await supabase
    .from("projects")
    .select(
      `
      id, slug, title_ar, title_en, body_ar, body_en,
      cover_url, image1_url, image2_url, total_cost, published
    `
    )
    .eq("slug", slugParam)
    .maybeSingle()

  if (error) {
    // مفيد للتشخيص لو في RLS أو أي خطأ
    console.error("projects query error:", error)
  }

  if (!project || project.published === false) {
    return notFound()
  }

  return (
    <div className="container mx-auto px-4">
      <Header/>
      <h1 className="text-3xl font-bold mb-4">
        {project.title_ar || project.title_en}
      </h1>

      <div className="prose max-w-none mb-6">
        <p>{project.body_ar || project.body_en}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {project.cover_url && (
          // استبدلها بـ <Image> إذا حابب وتضبط domains بالـ next.config
          <img src={project.cover_url} alt="" className="rounded-lg" />
        )}
        {project.image1_url && (
          <img src={project.image1_url} alt="" className="rounded-lg" />
        )}
        {project.image2_url && (
          <img src={project.image2_url} alt="" className="rounded-lg" />
        )}
      </div>

      <div className="mt-6 text-muted-foreground">
        {project.total_cost ? `التكلفة الإجمالية: ${project.total_cost}` : null}
      </div>

      <Footer/>

    </div>
  )
}
