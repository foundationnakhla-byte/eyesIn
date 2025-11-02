"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, ArrowRight, BarChart3, FileText, Scale, TrendingUp, Users, CheckCircle2 } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/lib/language-context"
import LatestProjectsSection from "@/components/projects/latest-projects"
import ValuesSection from "@/components/values/ValuesSection"
import WhyChooseUs from "@/components/sections/WhyChooseUs"
import HeroBackground from "@/components/hero-background"

export default function HomePage() {
  // اجلب isRTL مباشرة من كونتكست اللغة بدل تعريفه كمُدخل مفقود
  const { t, isRTL } = useLanguage()

  // كلاس الهامش المناسب حسب الاتجاه
  const dirMargin = isRTL ? "ml-2" : "mr-2"

  // اختر الأيقونة حسب الاتجاه
  const DirArrow = isRTL ? ArrowLeft : ArrowRight

  return (
    <div className="min-h-screen bg-background">
      {/* Header/Navigation */}
      <Header />

      {/* Hero Section */}
      <section
        className="relative overflow-hidden min-h-[92vh] md:min-h-[96vh] flex items-center py-16 md:py-24"
        aria-label={t("heroSection")}
      >
        {/* الخلفية المتحركة */}
        <HeroBackground
          images={["/images/hero/11.jpg", "/images/hero/22.jpg", "/images/hero/33.jpg", "/images/hero/44.jpg", "/images/hero/55.jpg"]}
          interval={6000}
          overlay
          overlayOpacity={45} // إن كان المكوّن يتوقع 0-1 بدّلها إلى 0.45
          blur={0}
        />

        {/* محتوى الهيرو */}
        <div className="relative z-10 w-full">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center space-y-8">
              {/* شارة ثقة */}
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                <CheckCircle2 className="w-4 h-4" aria-hidden />
                <span>{t("trustedPartner")}</span>
              </div>

              {/* العنوان والوصف */}
              <h1 className="text-4xl md:text-6xl font-bold leading-tight text-balance text-white">
                {t("heroTitle")}
              </h1>

              <p className="text-lg md:text-2xl text-white/90 text-balance">
                {t("heroDescription")}
              </p>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 bg-primary text-primary-foreground hover:opacity-95 transition"
                >
                  {t("startProject")}
                  <DirArrow className={`h-5 w-5 ${dirMargin}`} />
                </Link>

                <Link
                  href="/services"
                  className="inline-flex items-center justify-center rounded-lg px-6 py-3 border border-white/30 bg-white/5 text-white hover:bg-white/10 transition"
                >
                  {t("exploreServices")}
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* طبقة تدرّج لإبراز النص */}
        <div className="pointer-events-none absolute inset-0 z-[5] bg-gradient-to-t from-black/35 via-black/10 to-transparent" />
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-card border-y border-border" aria-label={t("statsSection")}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">+150</div>
              <div className="text-sm text-muted-foreground">{t("completedStudies")}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">+120</div>
              <div className="text-sm text-muted-foreground">{t("satisfiedClients")}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">15+</div>
              <div className="text-sm text-muted-foreground">{t("economicSectors")}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">98%</div>
              <div className="text-sm text-muted-foreground">{t("successRate")}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t("ourServices")}</h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
              {t("servicesDescription")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Service Card */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-primary" aria-hidden />
                </div>
                <CardTitle className="text-xl">{t("feasibilityStudies")}</CardTitle>
                <CardDescription className="text-base leading-relaxed">{t("feasibilityDesc")}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="link" asChild className="p-0 h-auto">
                  <Link href="/services/feasibility-studies" className="inline-flex items-center">
                    {t("learnMore")}
                    <DirArrow className={`h-4 w-4 ${dirMargin}`} />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-primary" aria-hidden />
                </div>
                <CardTitle className="text-xl">{t("financialAnalysis")}</CardTitle>
                <CardDescription className="text-base leading-relaxed">{t("financialDesc")}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="link" asChild className="p-0 h-auto">
                  <Link href="/services/financial-analysis" className="inline-flex items-center">
                    {t("learnMore")}
                    <DirArrow className={`h-4 w-4 ${dirMargin}`} />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Scale className="w-6 h-6 text-primary" aria-hidden />
                </div>
                <CardTitle className="text-xl">{t("legalStudies")}</CardTitle>
                <CardDescription className="text-base leading-relaxed">{t("legalDesc")}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="link" asChild className="p-0 h-auto">
                  <Link href="/services/legal-studies" className="inline-flex items-center">
                    {t("learnMore")}
                    <DirArrow className={`h-4 w-4 ${dirMargin}`} />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-primary" aria-hidden />
                </div>
                <CardTitle className="text-xl">{t("marketResearch")}</CardTitle>
                <CardDescription className="text-base leading-relaxed">{t("marketDesc")}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="link" asChild className="p-0 h-auto">
                  <Link href="/services/market-research" className="inline-flex items-center">
                    {t("learnMore")}
                    <DirArrow className={`h-4 w-4 ${dirMargin}`} />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-primary" aria-hidden />
                </div>
                <CardTitle className="text-xl">{t("managementConsulting")}</CardTitle>
                <CardDescription className="text-base leading-relaxed">{t("managementDesc")}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="link" asChild className="p-0 h-auto">
                  <Link href="/services/management-consulting" className="inline-flex items-center">
                    {t("learnMore")}
                    <DirArrow className={`h-4 w-4 ${dirMargin}`} />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-primary/50 bg-primary/5">
              <CardHeader>
                <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-6 h-6 text-accent-foreground" aria-hidden />
                </div>
                <CardTitle className="text-xl">{t("customServices")}</CardTitle>
                <CardDescription className="text-base leading-relaxed">{t("customDesc")}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="link" asChild className="p-0 h-auto">
                  <Link href="/contact" className="inline-flex items-center">
                    {t("contact")}
                    <DirArrow className={`h-4 w-4 ${dirMargin}`} />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <WhyChooseUs t={t} />

      {/* CTA Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-br from-primary to-primary/80 border-0 text-primary-foreground">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-3xl md:text-4xl mb-4">{t("haveProjectIdea")}</CardTitle>
              <CardDescription className="text-lg text-primary-foreground/90 max-w-2xl mx-auto leading-relaxed">
                {t("ctaDescription")}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" variant="secondary" asChild className="w-full sm:w-auto">
                <Link href="/contact" className="inline-flex items-center">
                  {t("bookConsultation")}
                  <DirArrow className={`h-5 w-5 ${dirMargin}`} />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="w-full sm:w-auto bg-transparent border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10"
              >
                <Link href="/about">{t("learnMoreAbout")}</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <ValuesSection />
      <LatestProjectsSection />
      <Footer />
    </div>
  )
}
