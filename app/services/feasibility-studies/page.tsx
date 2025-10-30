"use client";

import { useMemo } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, FileText, TrendingUp, Users, Target } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

const dict = {
  ar: {
    heroIconLabel: "دراسات الجدوى الاقتصادية",
    heroTitle: "دراسات الجدوى الاقتصادية",
    heroText:
      "دراسة شاملة ومتكاملة لتقييم جدوى مشروعك الاستثماري من جميع الجوانب المالية والتسويقية والفنية والقانونية",
    offerTitle: "ما نقدمه في هذه الخدمة",
    marketingTitle: "الدراسة التسويقية",
    marketingList: [
      "تحليل حجم السوق المستهدف والطلب المتوقع على المنتج أو الخدمة",
      "دراسة المنافسين وتحليل نقاط القوة والضعف والفرص والتهديدات",
      "تحديد الفئة المستهدفة وسلوك المستهلك وتفضيلاته",
      "وضع استراتيجية تسويقية وتسعيرية مناسبة",
    ],
    technicalTitle: "الدراسة الفنية",
    technicalList: [
      "تحديد الموقع الأمثل للمشروع والمساحة المطلوبة",
      "دراسة المعدات والآلات والتكنولوجيا اللازمة",
      "تحديد احتياجات الموارد البشرية والمهارات المطلوبة",
      "وضع خطة الإنتاج أو تقديم الخدمة والطاقة الإنتاجية",
    ],
    financialTitle: "الدراسة المالية",
    financialList: [
      "تقدير التكاليف الاستثمارية الأولية (أصول ثابتة ورأس مال عامل)",
      "حساب التكاليف التشغيلية والإيرادات المتوقعة",
      "إعداد القوائم المالية المتوقعة (قائمة الدخل، الميزانية، التدفقات النقدية)",
      "حساب مؤشرات الربحية (معدل العائد الداخلي، صافي القيمة الحالية، فترة الاسترداد)",
      "تحليل الحساسية وتقييم المخاطر المالية",
    ],
    legalTitle: "الدراسة القانونية والتنظيمية",
    legalList: [
      "دراسة القوانين والأنظمة المتعلقة بالمشروع",
      "تحديد التراخيص والموافقات المطلوبة",
      "دراسة الشكل القانوني الأمثل للمشروع",
      "تقييم المخاطر القانونية والتنظيمية",
    ],
    benefitsTitle: "فوائد دراسة الجدوى الاقتصادية",
    b1Title: "اتخاذ قرار مدروس",
    b1Text: "تساعدك على اتخاذ قرار استثماري مبني على معلومات دقيقة وتحليل موضوعي",
    b2Title: "تقليل المخاطر",
    b2Text: "تحديد المخاطر المحتملة مبكراً ووضع خطط للتعامل معها",
    b3Title: "جذب المستثمرين",
    b3Text: "دراسة احترافية تساعدك في إقناع المستثمرين والحصول على التمويل",
    b4Title: "خارطة طريق واضحة",
    b4Text: "توفر خطة تنفيذ واضحة ومفصلة لإطلاق وإدارة المشروع",
    ctaTitle: "هل تحتاج إلى دراسة جدوى؟",
    ctaDesc: "تواصل معنا اليوم لمناقشة مشروعك والحصول على عرض سعر مخصص",
    ctaBtn1: "احجز استشارة مجانية",
    ctaBtn2: "عودة إلى الخدمات",
  },
  en: {
    heroIconLabel: "Feasibility Studies",
    heroTitle: "Feasibility Studies",
    heroText:
      "A comprehensive assessment that evaluates your project's feasibility across financial, marketing, technical, and legal dimensions.",
    offerTitle: "What This Service Includes",
    marketingTitle: "Marketing Study",
    marketingList: [
      "Analyze target market size and expected demand for the product or service",
      "Competitor analysis with strengths, weaknesses, opportunities, and threats",
      "Define target segments and consumer behavior and preferences",
      "Set an appropriate marketing and pricing strategy",
    ],
    technicalTitle: "Technical Study",
    technicalList: [
      "Select the optimal location and required footprint",
      "Assess required equipment, machinery, and technology",
      "Define human‑resource needs and required skills",
      "Plan service delivery or production and specify capacity",
    ],
    financialTitle: "Financial Study",
    financialList: [
      "Estimate initial investment (fixed assets and working capital)",
      "Project operating costs and revenues",
      "Prepare pro‑forma statements (Income Statement, Balance Sheet, Cash Flow)",
      "Compute profitability metrics (IRR, NPV, Payback Period)",
      "Run sensitivity analysis and assess financial risks",
    ],
    legalTitle: "Legal & Regulatory Study",
    legalList: [
      "Review laws and regulations relevant to the project",
      "Identify required permits and approvals",
      "Choose the optimal legal form for the business",
      "Assess legal and regulatory risks",
    ],
    benefitsTitle: "Benefits of a Feasibility Study",
    b1Title: "Informed Decision",
    b1Text: "Enables data‑driven investment decisions based on objective analysis.",
    b2Title: "Risk Reduction",
    b2Text: "Identifies potential risks early and defines mitigation plans.",
    b3Title: "Attract Investors",
    b3Text: "A professional study that helps convince investors and secure funding.",
    b4Title: "Clear Roadmap",
    b4Text: "Provides a detailed implementation plan to launch and run the project.",
    ctaTitle: "Need a Feasibility Study?",
    ctaDesc: "Contact us today to discuss your project and get a tailored quote.",
    ctaBtn1: "Book a Free Consultation",
    ctaBtn2: "Back to Services",
  },
};

export default function FeasibilityStudiesPage() {
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
              <FileText className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">{t.heroTitle}</h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-pretty">{t.heroText}</p>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">{t.offerTitle}</h2>

            <div className="space-y-6">
              {/* Marketing */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">{t.marketingTitle}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    {t.marketingList.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Technical */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">{t.technicalTitle}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    {t.technicalList.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Financial */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">{t.financialTitle}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    {t.financialList.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Legal */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">{t.legalTitle}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    {t.legalList.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">{t.benefitsTitle}</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Target className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2 text-lg">{t.b1Title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{t.b1Text}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2 text-lg">{t.b2Title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{t.b2Text}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2 text-lg">{t.b3Title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{t.b3Text}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2 text-lg">{t.b4Title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{t.b4Text}</p>
                </div>
              </div>
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