"use client";

import { useMemo } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, Scale, FileCheck, Shield, BookOpen } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

const dict = {
  ar: {
    heroIconLabel: "الدراسات القانونية",
    heroTitle: "الدراسات القانونية",
    heroText: "استشارات قانونية متخصصة لضمان امتثال مشروعك للقوانين والأنظمة وحماية حقوقك ومصالحك",

    servicesTitle: "خدماتنا القانونية",
    services: [
      {
        icon: "FileCheck",
        title: "دراسة الإطار القانوني للمشروع",
        desc: "تحليل شامل للقوانين والأنظمة المتعلقة بمشروعك",
        bullets: [
          "دراسة القوانين والأنظمة ذات الصلة بنشاط المشروع",
          "تحديد المتطلبات القانونية للترخيص والتشغيل",
          "دراسة القوانين الضريبية والجمركية",
          "تحليل قوانين العمل والتأمينات الاجتماعية",
        ],
      },
      {
        icon: "BookOpen",
        title: "اختيار الشكل القانوني الأمثل",
        desc: "تحديد الهيكل القانوني الأنسب لمشروعك",
        bullets: [
          "دراسة أشكال الشركات المتاحة (فردية، تضامن، محدودة، مساهمة)",
          "مقارنة المزايا والعيوب لكل شكل قانوني",
          "تحديد الشكل الأنسب بناءً على طبيعة المشروع وأهدافه",
          "دراسة الآثار الضريبية والقانونية لكل خيار",
        ],
      },
      {
        icon: "Shield",
        title: "حماية الملكية الفكرية",
        desc: "حماية علامتك التجارية وابتكاراتك",
        bullets: [
          "تسجيل العلامات التجارية والأسماء التجارية",
          "حماية براءات الاختراع والتصاميم الصناعية",
          "إعداد اتفاقيات السرية وعدم الإفشاء",
          "حماية حقوق النشر والمحتوى الرقمي",
        ],
      },
      {
        icon: "Scale",
        title: "إعداد العقود والاتفاقيات",
        desc: "صياغة ومراجعة العقود القانونية",
        bullets: [
          "صياغة عقود التأسيس والشراكة",
          "إعداد عقود العمل والموظفين",
          "مراجعة عقود الموردين والعملاء",
          "صياغة اتفاقيات الإيجار والتمويل",
        ],
      },
    ],

    benefitsTitle: "أهمية الدراسة القانونية",
    benefits: [
      { title: "الامتثال القانوني", text: "تأكد من امتثال مشروعك لجميع القوانين والأنظمة المعمول بها وتجنب المخالفات والغرامات" },
      { title: "حماية الحقوق", text: "احمِ حقوقك ومصالحك من خلال عقود واتفاقيات قانونية محكمة" },
      { title: "تقليل المخاطر القانونية", text: "حدد المخاطر القانونية المحتملة مبكراً وضع خططاً للتعامل معها" },
      { title: "بناء أساس قانوني متين", text: "ابنِ مشروعك على أساس قانوني سليم يضمن استمراريته ونموه" },
    ],

    ctaTitle: "هل تحتاج إلى استشارة قانونية؟",
    ctaDesc: "تواصل معنا للحصول على دراسة قانونية شاملة لمشروعك",
    ctaBtn1: "احجز استشارة مجانية",
    ctaBtn2: "عودة إلى الخدمات",
  },
  en: {
    heroIconLabel: "Legal Studies",
    heroTitle: "Legal Studies",
    heroText: "Specialized legal advisory to ensure compliance and protect your rights and interests.",

    servicesTitle: "Our Legal Services",
    services: [
      {
        icon: "FileCheck",
        title: "Project Legal Framework Review",
        desc: "Comprehensive analysis of laws and regulations relevant to your project",
        bullets: [
          "Review sector‑specific laws and regulations",
          "Identify licensing and operating requirements",
          "Review tax and customs regulations",
          "Analyze labor laws and social insurance",
        ],
      },
      {
        icon: "BookOpen",
        title: "Choosing the Optimal Legal Form",
        desc: "Determine the most suitable legal structure for your business",
        bullets: [
          "Assess available company forms (sole prop, partnership, LLC, JSC)",
          "Compare pros and cons of each form",
          "Select the best option based on your goals and business nature",
          "Review legal and tax implications for each option",
        ],
      },
      {
        icon: "Shield",
        title: "Intellectual Property Protection",
        desc: "Protect your trademarks and innovations",
        bullets: [
          "Register trademarks and trade names",
          "Protect patents and industrial designs",
          "Draft NDAs and confidentiality agreements",
          "Protect copyrights and digital content",
        ],
      },
      {
        icon: "Scale",
        title: "Contracts & Agreements",
        desc: "Drafting and reviewing legal contracts",
        bullets: [
          "Draft incorporation and partnership agreements",
          "Prepare employment contracts",
          "Review vendor and client agreements",
          "Draft lease and financing agreements",
        ],
      },
    ],

    benefitsTitle: "Why a Legal Study Matters",
    benefits: [
      { title: "Legal Compliance", text: "Ensure full compliance and avoid violations and penalties." },
      { title: "Rights Protection", text: "Protect your rights with robust contracts and agreements." },
      { title: "Reduced Legal Risks", text: "Identify potential legal risks early and plan mitigations." },
      { title: "Solid Legal Foundation", text: "Build your business on a sound legal base for continuity and growth." },
    ],

    ctaTitle: "Need Legal Advisory?",
    ctaDesc: "Contact us for a comprehensive legal review for your project.",
    ctaBtn1: "Book a Free Consultation",
    ctaBtn2: "Back to Services",
  },
};

const iconMap = { FileCheck, BookOpen, Shield, Scale } as const;

export default function LegalStudiesPage() {
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
              <Scale className="w-10 h-10 text-primary" />
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
                  {t.language === "ar" ? "احجز استشارة مجانية" : "Book a Free Consultation"}
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