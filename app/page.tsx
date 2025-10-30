"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, BarChart3, FileText, Scale, TrendingUp, Users, CheckCircle2 } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/lib/language-context"
import LatestProjectsSection from '@/components/projects/latest-projects'
import ValuesSection from "@/components/values/ValuesSection"
import WhyChooseUs from "@/components/sections/WhyChooseUs"


export default function HomePage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-background">
      {/* Header/Navigation */}
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <CheckCircle2 className="w-4 h-4" />
              <span>{t("trustedPartner")}</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">{t("heroTitle")}</h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto leading-relaxed">
              {t("heroDescription")}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" asChild className="w-full sm:w-auto">
                <Link href="/contact">
                  {t("startProject")}
                  <ArrowLeft className="mr-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="w-full sm:w-auto bg-transparent">
                <Link href="/services">{t("exploreServices")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-card border-y border-border">
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
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{t("feasibilityStudies")}</CardTitle>
                <CardDescription className="text-base leading-relaxed">{t("feasibilityDesc")}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="link" asChild className="p-0 h-auto">
                  <Link href="/services/feasibility-studies">
                    {t("learnMore")}
                    <ArrowLeft className="mr-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{t("financialAnalysis")}</CardTitle>
                <CardDescription className="text-base leading-relaxed">{t("financialDesc")}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="link" asChild className="p-0 h-auto">
                  <Link href="/services/financial-analysis">
                    {t("learnMore")}
                    <ArrowLeft className="mr-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Scale className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{t("legalStudies")}</CardTitle>
                <CardDescription className="text-base leading-relaxed">{t("legalDesc")}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="link" asChild className="p-0 h-auto">
                  <Link href="/services/legal-studies">
                    {t("learnMore")}
                    <ArrowLeft className="mr-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{t("marketResearch")}</CardTitle>
                <CardDescription className="text-base leading-relaxed">{t("marketDesc")}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="link" asChild className="p-0 h-auto">
                  <Link href="/services/market-research">
                    {t("learnMore")}
                    <ArrowLeft className="mr-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{t("managementConsulting")}</CardTitle>
                <CardDescription className="text-base leading-relaxed">{t("managementDesc")}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="link" asChild className="p-0 h-auto">
                  <Link href="/services/management-consulting">
                    {t("learnMore")}
                    <ArrowLeft className="mr-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-primary/50 bg-primary/5">
              <CardHeader>
                <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-6 h-6 text-accent-foreground" />
                </div>
                <CardTitle className="text-xl">{t("customServices")}</CardTitle>
                <CardDescription className="text-base leading-relaxed">{t("customDesc")}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="link" asChild className="p-0 h-auto">
                  <Link href="/contact">
                    {t("contact")}
                    <ArrowLeft className="mr-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      {/* <section className="py-20 md:py-32 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t("whyChooseUs")}</h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
              {t("whyDescription")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-primary-foreground" />
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">{t("localExpertise")}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{t("localExpertiseDesc")}</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-primary-foreground" />
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">{t("internationalStandards")}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{t("internationalDesc")}</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-primary-foreground" />
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">{t("specializedTeam")}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{t("specializedDesc")}</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-primary-foreground" />
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">{t("accuracyObjectivity")}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{t("accuracyDesc")}</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-primary-foreground" />
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">{t("continuousSupport")}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{t("continuousDesc")}</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-primary-foreground" />
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">{t("confidentiality")}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{t("confidentialityDesc")}</p>
              </div>
            </div>
          </div>
        </div>
      </section> */}
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
                <Link href="/contact">
                  {t("bookConsultation")}
                  <ArrowLeft className="mr-2 h-5 w-5" />
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
