"use client";

import { useMemo } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, BarChart3, Users, Target, TrendingUp } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

const dict = {
  ar: {
    heroIconLabel: "دراسات السوق",
    heroTitle: "دراسات السوق",
    heroText:
      "أبحاث معمقة لفهم السوق المستهدف والمنافسين والفرص الاستثمارية المتاحة لضمان نجاح مشروعك",

    servicesTitle: "ما نقدمه في دراسات السوق",
    services: [
      {
        icon: "BarChart3",
        title: "تحليل حجم السوق والطلب",
        desc: "قياس حجم السوق المستهدف وتقدير الطلب المتوقع",
        bullets: [
          "تقدير حجم السوق الإجمالي والقابل للخدمة",
          "تحليل معدلات النمو والاتجاهات السوقية",
          "توقع الطلب المستقبلي على المنتج أو الخدمة",
          "تحديد الحصة السوقية المستهدفة",
        ],
      },
      {
        icon: "Users",
        title: "دراسة المنافسين",
        desc: "تحليل شامل للمنافسين واستراتيجياتهم",
        bullets: [
          "تحديد المنافسين الرئيسيين المباشرين وغير المباشرين",
          "تحليل نقاط القوة والضعف لكل منافس",
          "دراسة استراتيجيات التسعير والتسويق للمنافسين",
          "تحديد الميزة التنافسية لمشروعك",
        ],
      },
      {
        icon: "Target",
        title: "تحليل الفئة المستهدفة",
        desc: "فهم عميق لاحتياجات وسلوك العملاء المستهدفين",
        bullets: [
          "تحديد الخصائص الديموغرافية والسيكوغرافية للعملاء",
          "دراسة سلوك الشراء والعوامل المؤثرة في القرار",
          "تحليل احتياجات ورغبات العملاء المستهدفين",
          "تقسيم السوق إلى شرائح مستهدفة",
        ],
      },
      {
        icon: "TrendingUp",
        title: "تحليل الاتجاهات والفرص",
        desc: "رصد الاتجاهات السوقية والفرص الاستثمارية",
        bullets: [
          "رصد الاتجاهات الحالية والمستقبلية في السوق",
          "تحديد الفرص الاستثمارية الواعدة",
          "تحليل التهديدات والتحديات المحتملة",
          "دراسة العوامل الاقتصادية والاجتماعية المؤثرة",
        ],
      },
    ],

    methodologyTitle: "منهجيتنا في البحث",
    methodology: [
      { title: "البحث الأولي", text: "جمع بيانات جديدة من خلال الاستبيانات والمقابلات والملاحظة المباشرة" },
      { title: "البحث الثانوي", text: "تحليل البيانات المتاحة من المصادر الموثوقة والتقارير والدراسات السابقة" },
      { title: "التحليل الكمي", text: "استخدام الأساليب الإحصائية والنماذج الرياضية لتحليل البيانات" },
      { title: "التحليل النوعي", text: "فهم عميق للسلوكيات والدوافع من خلال المقابلات المعمقة ومجموعات التركيز" },
    ],

    ctaTitle: "هل تحتاج إلى دراسة سوق؟",
    ctaDesc: "تواصل معنا للحصول على دراسة سوق شاملة تساعدك في فهم فرصتك الاستثمارية",
    ctaBtn1: "احجز استشارة مجانية",
    ctaBtn2: "عودة إلى الخدمات",
  },
  en: {
    heroIconLabel: "Market Research",
    heroTitle: "Market Research",
    heroText:
      "In‑depth research to understand your target market, competitors, and investment opportunities to set your project up for success.",

    servicesTitle: "What We Deliver in Market Research",
    services: [
      {
        icon: "BarChart3",
        title: "Market Size & Demand Analysis",
        desc: "Measure target market size and estimate expected demand",
        bullets: [
          "Estimate total and serviceable market size",
          "Analyze growth rates and market trends",
          "Forecast future demand for the product/service",
          "Define the target market share",
        ],
      },
      {
        icon: "Users",
        title: "Competitor Analysis",
        desc: "Comprehensive analysis of competitors and their strategies",
        bullets: [
          "Identify direct and indirect key competitors",
          "Assess each competitor’s strengths and weaknesses",
          "Review competitors’ pricing and marketing strategies",
          "Determine your project’s competitive advantage",
        ],
      },
      {
        icon: "Target",
        title: "Target Segment Analysis",
        desc: "Deep understanding of target customers’ needs and behaviors",
        bullets: [
          "Define customer demographics and psychographics",
          "Study buying behavior and decision drivers",
          "Analyze target customers’ needs and preferences",
          "Segment the market into actionable cohorts",
        ],
      },
      {
        icon: "TrendingUp",
        title: "Trends & Opportunities Analysis",
        desc: "Track market trends and investment opportunities",
        bullets: [
          "Monitor current and emerging market trends",
          "Identify promising investment opportunities",
          "Analyze potential threats and challenges",
          "Review relevant economic and social factors",
        ],
      },
    ],

    methodologyTitle: "Our Research Methodology",
    methodology: [
      { title: "Primary Research", text: "Collect new data via surveys, interviews, and direct observation." },
      { title: "Secondary Research", text: "Analyze reputable sources, reports, and prior studies." },
      { title: "Quantitative Analysis", text: "Use statistical methods and models to analyze data." },
      { title: "Qualitative Analysis", text: "Gain deep insight via in‑depth interviews and focus groups." },
    ],

    ctaTitle: "Need Market Research?",
    ctaDesc: "Contact us for a comprehensive market study to understand your investment opportunity.",
    ctaBtn1: "Book a Free Consultation",
    ctaBtn2: "Back to Services",
  },
};

const iconMap = { BarChart3, Users, Target, TrendingUp } as const;

export default function MarketResearchPage() {
  const { language } = useLanguage();
  const t = useMemo(() => dict[language as "ar" | "en"], [language]);
  const isAr = language === "ar";

  return (
    <div className="min-h-screen bg-background" dir={isAr ? "rtl" : "ltr"}>
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6" aria-label={t.heroIconLabel}>
              <BarChart3 className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">{t.heroTitle}</h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-pretty">{t.heroText}</p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">{t.servicesTitle}</h2>

            <div className="space-y-6">
              {t.services.map((srv, idx) => {
                const Icon = iconMap[srv.icon as keyof typeof iconMap];
                return (
                  <Card key={idx}>
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-xl mb-2">{srv.title}</CardTitle>
                          <CardDescription className="text-base leading-relaxed">{srv.desc}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pr-16">
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        {srv.bullets.map((b: string, i: number) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">{t.methodologyTitle}</h2>

            <div className="grid md:grid-cols-2 gap-6">
              {t.methodology.map((m, i) => (
                <Card key={i}>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-foreground mb-3 text-lg">{m.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{m.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-br from-primary to-primary/80 border-0 text-primary-foreground max-w-4xl mx-auto">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-3xl md:text-4xl mb-4">{t.ctaTitle}</CardTitle>
              <CardDescription className="text-lg text-primary-foreground/90 leading-relaxed">{t.ctaDesc}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/contact">
                  {t.ctaBtn1}
                  {isAr ? <ArrowLeft className="mr-2 h-5 w-5" /> : <ArrowRight className="ml-2 h-5 w-5" />}
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="bg-transparent border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10"
              >
                <Link href="/services">{t.ctaBtn2}</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}
