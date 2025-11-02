// app/admin/layout.tsx  (Server Component)
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div dir="rtl" className="min-h-screen flex flex-col">
      <Header />{/* إذا عندك كومبوننت جاهز، غيره حسب مشروعك */}
      <main className="flex-1 container mx-auto px-4 py-8">
        {children}
      </main>
      <Footer />
    </div>
  )
}
