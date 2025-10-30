"use client";

import { useMemo } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, ArrowRight, FileText, TrendingUp, Scale, BarChart3, Users, Briefcase } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

const dict = {
  ar: {
    heroTitle: "خدماتنا الاستشارية",
    heroText:
      "نقدم مجموعة شاملة من الخدمات الاستشارية المتخصصة لدعم قراراتك الاستثمارية وضمان نجاح مشروعك",
    services: [
      {
        title: "دراسات الجدوى الاقتصادية",
        desc: "تحليل شامل ومتكامل لجميع جوانب مشروعك الاستثماري",
        text: "نقدم دراسات جدوى متكاملة تشمل التحليل المالي والتسويقي والفني والقانوني لمشروعك",
        link: "/services/feasibility-studies",
      },
      {
        title: "التحليل المالي والاستثماري",
        desc: "تقييم الأداء المالي وتحليل العوائد والمخاطر",
        text: "تحليل مالي دقيق لتقييم جدوى الاستثمار وتوقع العوائد وإدارة المخاطر",
        link: "/services/financial-analysis",
      },
      {
        title: "الدراسات القانونية",
        desc: "استشارات قانونية متخصصة للمشاريع الاستثمارية",
        text: "دراسة الجوانب القانونية والتنظيمية لضمان امتثال مشروعك للقوانين",
        link: "/services/legal-studies",
      },
      {
        title: "دراسات السوق",
        desc: "أبحاث معمقة لفهم السوق والمنافسة",
        text: "تحليل شامل للسوق المستهدف والمنافسين والفرص الاستثمارية المتاحة",
        link: "/services/market-research",
      },
      {
        title: "الاستشارات الإدارية",
        desc: "تطوير الهياكل التنظيمية وتحسين الأداء",
        text: "استشارات إدارية لتحسين الكفاءة التشغيلية وتطوير الأداء المؤسسي",
        link: "/services/management-consulting",
      },
      {
        title: "خدمات مخصصة",
        desc: "حلول استشارية مصممة خصيصاً لاحتياجاتك",
        text: "نصمم حلولاً استشارية فريدة تناسب متطلبات مشروعك الخاصة",
        link: "/contact",
      },
    ],
    ctaTitle: "هل تحتاج إلى استشارة؟",
    ctaDesc: "تواصل معنا اليوم للحصول على استشارة مجانية حول احتياجات مشروعك",
    ctaBtn1: "احجز استشارة مجانية",
    ctaBtn2: "تعرف على منهجيتنا",
  },
  en: {
    heroTitle: "Our Consulting Services",
    heroText:
      "We offer a comprehensive range of specialized consulting services to support your investment decisions and ensure your project's success.",
    services: [
      {
        title: "Feasibility Studies",
        desc: "Comprehensive analysis of all aspects of your investment project",
        text: "We provide full feasibility studies covering financial, marketing, technical, and legal aspects of your project.",
        link: "/services/feasibility-studies",
      },
      {
        title: "Financial & Investment Analysis",
        desc: "Assessing financial performance, returns, and risks",
        text: "Accurate financial analysis to evaluate investment feasibility, expected returns, and risk management.",
        link: "/services/financial-analysis",
      },
      {
        title: "Legal Studies",
        desc: "Specialized legal consulting for investment projects",
        text: "We examine the legal and regulatory aspects to ensure your project’s full compliance.",
        link: "/services/legal-studies",
      },
      {
        title: "Market Research",
        desc: "In-depth research to understand markets and competition",
        text: "Comprehensive market analysis of target audiences, competitors, and available investment opportunities.",
        link: "/services/market-research",
      },
      {
        title: "Management Consulting",
        desc: "Developing organizational structures and improving performance",
        text: "Advisory services focused on enhancing operational efficiency and institutional performance.",
        link: "/services/management-consulting",
      },
      {
        title: "Customized Services",
        desc: "Tailored consulting solutions for your unique needs",
        text: "We design unique consulting solutions to fit your project’s specific requirements.",
        link: "/contact",
      },
    ],
    ctaTitle: "Need a Consultation?",
    ctaDesc: "Contact us today for a free consultation about your project’s needs.",
    ctaBtn1: "Book a Free Consultation",
    ctaBtn2: "Explore Our Methodology",
  },
};

export default function ServicesPage() {
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
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">{t.heroTitle}</h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-pretty">{t.heroText}</p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {t.services.map((s, i) => {
              const Icon = [FileText, TrendingUp, Scale, BarChart3, Users, Briefcase][i];
              const accent = i === 5;
              return (
                <Card
                  key={i}
                  className={`hover:shadow-lg transition-shadow ${accent ? "border-primary/50 bg-primary/5" : ""}`}
                >
                  <CardHeader>
                    <div
                      className={`w-16 h-16 rounded-lg flex items-center justify-center mb-4 ${
                        accent ? "bg-accent/20" : "bg-primary/10"
                      }`}
                    >
                      <Icon className={`w-8 h-8 ${accent ? "text-accent-foreground" : "text-primary"}`} />
                    </div>
                    <CardTitle className="text-2xl mb-2">{s.title}</CardTitle>
                    <CardDescription className="text-base leading-relaxed">{s.desc}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{s.text}</p>
                    <Button asChild>
                      <Link href={s.link}>
                        {language === "ar" ? "تفاصيل الخدمة" : "View Details"}
                        {isAr ? (
                          <ArrowLeft className="mr-2 h-4 w-4" />
                        ) : (
                          <ArrowRight className="ml-2 h-4 w-4" />
                        )}
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/30">
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
                <Link href="/methodology">{t.ctaBtn2}</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}