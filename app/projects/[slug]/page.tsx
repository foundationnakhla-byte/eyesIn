// app/projects/[slug]/page.tsx
import Image from "next/image"
import { notFound } from "next/navigation"
import { supabaseServer } from "@/lib/supabase/server"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

type Props = {
  params: Promise<{ slug: string }> | { slug: string }
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await Promise.resolve(params)

  // توحيد الـ slug (لو فيه مسافات/أحرف كبيرة)
  const slugParam = decodeURIComponent(String(slug || "")).trim().toLowerCase()
  if (!slugParam) notFound()

  const supabase = await supabaseServer()

  // خليك دقيق بالحقول اللي بدك ياها
  const { data: project, error } = await supabase
    .from("projects")
    .select(
      `
      id, slug, title_ar, title_en, total_cost,
      body_ar, body_en, cover_url, image1_url, image2_url, published
    `
    )
    .eq("slug", slugParam)
    .single()

  // لو ما لقى صف، رح نطلع 404
  if (error || !project) {
    // فيك تخليها console.error للمساعدة
    // console.error("Project fetch error:", error)
    notFound()
  }

  // (اختياري) لو بدك بس المشاريع المنشورة
  if (project.published === false) notFound()

  const title = project.title_ar || project.title_en || project.slug

  return (
    <main className="container mx-auto  " dir="rtl">
      <Header/>
      <h1 className="text-3xl md:text-4xl font-bold py-10 mb-6">{title}</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {project.cover_url && (
          <div className="relative aspect-[16/10] bg-muted rounded-lg overflow-hidden">
            <Image src={project.cover_url} alt={title} fill className="object-cover" />
          </div>
        )}

        <div className="space-y-4">
          <p className="text-muted-foreground">
            التكلفة الإجمالية: <span className="font-semibold">
              {Number(project.total_cost ?? 0).toLocaleString()}
            </span>
          </p>

          {project.body_ar && (
            <div className="prose max-w-none">
              <p>{project.body_ar}</p>
            </div>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 py-10 gap-6 mt-8">
        {project.image1_url && (
          <div className="relative aspect-[16/10] bg-muted rounded-lg overflow-hidden">
            <Image src={project.image1_url} alt={`${title} - صورة 1`} fill className="object-cover" />
          </div>
        )}
        {project.image2_url && (
          <div className="relative aspect-[16/10] bg-muted rounded-lg overflow-hidden ">
            <Image src={project.image2_url} alt={`${title} - صورة 2`} fill className="object-cover" />
          </div>
        )}
      </div>
      <Footer/>
    </main>
  )
}
