"use client";

import { useMemo } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, Users, Target, TrendingUp, Settings } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

const dict = {
  ar: {
    heroIconLabel: "الاستشارات الإدارية",
    heroTitle: "الاستشارات الإدارية",
    heroText:
      "استشارات متخصصة لتطوير الهياكل التنظيمية وتحسين الكفاءة التشغيلية وتعزيز الأداء المؤسسي",

    servicesTitle: "خدمات الاستشارات الإدارية",
    services: [
      {
        icon: "Target",
        title: "التخطيط الاستراتيجي",
        desc: "وضع رؤية واضحة واستراتيجيات فعالة لتحقيق أهدافك",
        bullets: [
          "تطوير الرؤية والرسالة والقيم المؤسسية",
          "وضع الأهداف الاستراتيجية والخطط التنفيذية",
          "تحليل SWOT وتحديد الفرص والتحديات",
          "وضع مؤشرات الأداء الرئيسية (KPIs)",
        ],
      },
      {
        icon: "Users",
        title: "تطوير الهيكل التنظيمي",
        desc: "تصميم هياكل تنظيمية فعالة ومرنة",
        bullets: [
          "تصميم الهيكل التنظيمي الأمثل",
          "تحديد الأدوار والمسؤوليات بوضوح",
          "تطوير الوصف الوظيفي لكل منصب",
          "تحسين خطوط الاتصال والتنسيق",
        ],
      },
      {
        icon: "Settings",
        title: "تحسين العمليات التشغيلية",
        desc: "رفع الكفاءة وتقليل التكاليف التشغيلية",
        bullets: [
          "تحليل وتوثيق العمليات الحالية",
          "تحديد نقاط الضعف والهدر في العمليات",
          "إعادة تصميم العمليات لتحسين الكفاءة",
          "تطبيق أفضل الممارسات الإدارية",
        ],
      },
      {
        icon: "TrendingUp",
        title: "إدارة الأداء والتطوير",
        desc: "قياس وتحسين أداء الأفراد والفرق",
        bullets: [
          "تطوير نظام تقييم الأداء",
          "وضع خطط التطوير الوظيفي",
          "تصميم برامج التدريب والتطوير",
          "تحسين ثقافة الأداء والمساءلة",
        ],
      },
    ],

    benefitsTitle: "فوائد الاستشارات الإدارية",
    benefits: [
      { title: "تحسين الكفاءة", text: "رفع الكفاءة التشغيلية وتقليل الهدر في الموارد والوقت" },
      { title: "تعزيز الأداء", text: "تحسين أداء الأفراد والفرق وتحقيق الأهداف المؤسسية" },
      { title: "تقليل التكاليف", text: "خفض التكاليف التشغيلية من خلال تحسين العمليات والإجراءات" },
      { title: "نمو مستدام", text: "بناء أساس قوي للنمو المستدام والتوسع المستقبلي" },
    ],

    ctaTitle: "هل تحتاج إلى استشارات إدارية؟",
    ctaDesc: "تواصل معنا لتطوير مؤسستك وتحسين أدائها التشغيلي",
    ctaBtn1: "احجز استشارة مجانية",
    ctaBtn2: "عودة إلى الخدمات",
  },
  en: {
    heroIconLabel: "Management Consulting",
    heroTitle: "Management Consulting",
    heroText:
      "Specialized advisory to develop org structures, boost operational efficiency, and enhance institutional performance.",

    servicesTitle: "Management Consulting Services",
    services: [
      {
        icon: "Target",
        title: "Strategic Planning",
        desc: "Define a clear vision and effective strategies to achieve your goals",
        bullets: [
          "Develop vision, mission, and core values",
          "Set strategic objectives and execution plans",
          "SWOT analysis to identify opportunities and challenges",
          "Define key performance indicators (KPIs)",
        ],
      },
      {
        icon: "Users",
        title: "Organizational Design",
        desc: "Design effective and flexible organizational structures",
        bullets: [
          "Design the optimal organization structure",
          "Clearly define roles and responsibilities",
          "Develop job descriptions for each role",
          "Improve communication and coordination lines",
        ],
      },
      {
        icon: "Settings",
        title: "Operational Process Improvement",
        desc: "Increase efficiency and reduce operating costs",
        bullets: [
          "Analyze and document current processes",
          "Identify bottlenecks and waste",
          "Redesign processes to improve efficiency",
          "Apply management best practices",
        ],
      },
      {
        icon: "TrendingUp",
        title: "Performance Management & Development",
        desc: "Measure and improve individual and team performance",
        bullets: [
          "Build performance appraisal systems",
          "Set career development plans",
          "Design training and development programs",
          "Strengthen accountability and performance culture",
        ],
      },
    ],

    benefitsTitle: "Benefits of Management Consulting",
    benefits: [
      { title: "Higher Efficiency", text: "Boost operational efficiency and reduce time/resource waste." },
      { title: "Enhanced Performance", text: "Improve team and individual performance and achieve objectives." },
      { title: "Lower Costs", text: "Cut operating costs through better processes and procedures." },
      { title: "Sustainable Growth", text: "Lay strong foundations for sustainable growth and future expansion." },
    ],

    ctaTitle: "Need Management Consulting?",
    ctaDesc: "Contact us to transform your organization and improve operations.",
    ctaBtn1: "Book a Free Consultation",
    ctaBtn2: "Back to Services",
  },
};

const iconMap = { Users, Target, Settings, TrendingUp } as const;

export default function ManagementConsultingPage() {
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
              <Users className="w-10 h-10 text-primary" />
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

      {/* Benefits */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">{t.benefitsTitle}</h2>

            <div className="grid md:grid-cols-2 gap-6">
              {t.benefits.map((b, i) => (
                <Card key={i}>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-foreground mb-3 text-lg">{b.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{b.text}</p>
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
                  {language === "ar" ? "احجز استشارة مجانية" : "Book a Free Consultation"}
                  {isAr ? <ArrowLeft className="mr-2 h-5 w-5" /> : <ArrowRight className="ml-2 h-5 w-5" />}
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="bg-transparent border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10"
              >
                <Link href="/services">{language === "ar" ? "عودة إلى الخدمات" : "Back to Services"}</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}