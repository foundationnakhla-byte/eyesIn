"use client";

import { useMemo } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, TrendingUp, BarChart3, PieChart, LineChart } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

const dict = {
  ar: {
    heroIconLabel: "التحليل المالي والاستثماري",
    heroTitle: "التحليل المالي والاستثماري",
    heroText:
      "تقييم شامل للأداء المالي وتحليل العوائد والمخاطر الاستثمارية لمساعدتك في اتخاذ قرارات مالية سليمة",

    servicesTitle: "خدمات التحليل المالي",
    services: [
      {
        icon: "BarChart3",
        title: "تحليل القوائم المالية",
        desc: "تحليل معمق للقوائم المالية لتقييم الأداء المالي",
        bullets: [
          "تحليل قائمة الدخل والربحية",
          "تحليل الميزانية العمومية والمركز المالي",
          "تحليل قائمة التدفقات النقدية",
          "حساب النسب المالية الرئيسية",
        ],
      },
      {
        icon: "TrendingUp",
        title: "تقييم الاستثمارات",
        desc: "تقييم جدوى الفرص الاستثمارية المختلفة",
        bullets: [
          "حساب معدل العائد الداخلي (IRR)",
          "حساب صافي القيمة الحالية (NPV)",
          "تحديد فترة الاسترداد (Payback Period)",
          "مقارنة البدائل الاستثمارية",
        ],
      },
      {
        icon: "PieChart",
        title: "تحليل المخاطر المالية",
        desc: "تقييم وإدارة المخاطر المالية المحتملة",
        bullets: [
          "تحليل الحساسية للمتغيرات الرئيسية",
          "تحليل السيناريوهات المختلفة",
          "تقييم مخاطر السيولة والائتمان",
          "وضع استراتيجيات لإدارة المخاطر",
        ],
      },
      {
        icon: "LineChart",
        title: "التخطيط المالي والتوقعات",
        desc: "إعداد خطط مالية وتوقعات مستقبلية",
        bullets: [
          "إعداد الموازنات التقديرية",
          "التوقعات المالية قصيرة وطويلة الأجل",
          "تخطيط التدفقات النقدية",
          "تحديد احتياجات التمويل",
        ],
      },
    ],

    whyTitle: "لماذا تحتاج إلى التحليل المالي؟",
    why: [
      { title: "قرارات مبنية على البيانات", text: "اتخذ قرارات استثمارية ومالية مدروسة بناءً على تحليل دقيق للبيانات المالية" },
      { title: "تحسين الأداء المالي", text: "حدد نقاط القوة والضعف في أدائك المالي وطور استراتيجيات للتحسين" },
      { title: "إدارة أفضل للمخاطر", text: "تعرف على المخاطر المالية المحتملة وضع خططاً للتعامل معها بفعالية" },
      { title: "زيادة ثقة المستثمرين", text: "تحليل مالي احترافي يعزز ثقة المستثمرين والممولين في مشروعك" },
    ],

    ctaTitle: "هل تحتاج إلى تحليل مالي؟",
    ctaDesc: "تواصل معنا للحصول على تحليل مالي شامل لمشروعك أو استثمارك",
    ctaBtn1: "احجز استشارة مجانية",
    ctaBtn2: "عودة إلى الخدمات",
  },
  en: {
    heroIconLabel: "Financial & Investment Analysis",
    heroTitle: "Financial & Investment Analysis",
    heroText:
      "Comprehensive assessment of financial performance, returns, and investment risks to support sound financial decisions.",

    servicesTitle: "Financial Analysis Services",
    services: [
      {
        icon: "BarChart3",
        title: "Financial Statements Analysis",
        desc: "In‑depth analysis of statements to evaluate financial performance",
        bullets: [
          "Analyze Income Statement and profitability",
          "Analyze Balance Sheet and financial position",
          "Analyze Cash Flow Statement",
          "Compute key financial ratios",
        ],
      },
      {
        icon: "TrendingUp",
        title: "Investment Appraisal",
        desc: "Evaluating the feasibility of various investment opportunities",
        bullets: [
          "Calculate Internal Rate of Return (IRR)",
          "Calculate Net Present Value (NPV)",
          "Determine Payback Period",
          "Compare investment alternatives",
        ],
      },
      {
        icon: "PieChart",
        title: "Financial Risk Analysis",
        desc: "Assessing and managing potential financial risks",
        bullets: [
          "Sensitivity analysis for key variables",
          "Scenario analysis",
          "Assess liquidity and credit risks",
          "Define risk‑management strategies",
        ],
      },
      {
        icon: "LineChart",
        title: "Financial Planning & Forecasting",
        desc: "Preparing financial plans and future projections",
        bullets: [
          "Build operating budgets",
          "Short‑ and long‑term forecasts",
          "Cash‑flow planning",
          "Identify funding requirements",
        ],
      },
    ],

    whyTitle: "Why Financial Analysis?",
    why: [
      { title: "Data‑Driven Decisions", text: "Make informed investment and financial decisions based on rigorous analysis." },
      { title: "Improve Financial Performance", text: "Identify strengths/weaknesses and develop improvement strategies." },
      { title: "Better Risk Management", text: "Understand potential financial risks and plan effective mitigations." },
      { title: "Increase Investor Confidence", text: "Professional analysis builds credibility with investors and lenders." },
    ],

    ctaTitle: "Need Financial Analysis?",
    ctaDesc: "Contact us for a comprehensive financial analysis of your project or investment.",
    ctaBtn1: "Book a Free Consultation",
    ctaBtn2: "Back to Services",
  },
};

const iconMap = {
  BarChart3: BarChart3,
  TrendingUp: TrendingUp,
  PieChart: PieChart,
  LineChart: LineChart,
} as const;

export default function FinancialAnalysisPage() {
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
              <TrendingUp className="w-10 h-10 text-primary" />
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

      {/* Why Choose Us */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">{t.whyTitle}</h2>

            <div className="grid md:grid-cols-2 gap-6">
              {t.why.map((w, i) => (
                <Card key={i}>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-foreground mb-3 text-lg">{w.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{w.text}</p>
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