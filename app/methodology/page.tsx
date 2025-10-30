"use client";

import { useMemo } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ClipboardList,
  Search,
  BarChart3,
  FileText,
  CheckCircle2,
  TrendingUp,
  Target,
} from "lucide-react";
import { useLanguage } from "@/lib/language-context";

const dict = {
  ar: {
    heroTitle: "منهجيتنا في العمل",
    heroText:
      "نتبع منهجية علمية منظمة تجمع بين المعايير الدولية والفهم العميق للسوق المحلي، لضمان تقديم دراسات دقيقة وشاملة",

    approachTitle: "نهجنا الاستشاري",
    approachIntro:
      "نؤمن بأن كل مشروع فريد من نوعه، لذلك نصمم منهجيتنا لتناسب احتياجاتك الخاصة مع الحفاظ على معايير الجودة والدقة",
    approachSteps: [
      { title: "الاستماع والفهم", text: "نبدأ بفهم عميق لفكرتك وأهدافك وتوقعاتك من المشروع" },
      { title: "البحث والتحليل", text: "نجمع البيانات ونحلل السوق والمنافسين والفرص المتاحة" },
      { title: "التقييم والتوصيات", text: "نقيم الجدوى ونقدم توصيات واضحة ومبنية على الأدلة" },
      { title: "المتابعة والدعم", text: "نبقى معك لدعمك في تنفيذ المشروع وتحقيق النجاح" },
    ],

    processTitle: "مراحل إعداد دراسة الجدوى",
    process: [
      {
        icon: "ClipboardList",
        title: "المرحلة الأولى: الدراسة الأولية",
        desc: "نبدأ بجمع المعلومات الأساسية عن المشروع وفكرته وأهدافه",
        bullets: [
          "اجتماع تمهيدي لفهم الفكرة والأهداف",
          "تحديد نطاق الدراسة والمتطلبات",
          "وضع خطة عمل وجدول زمني",
          "تقييم أولي للجدوى العامة للمشروع",
        ],
      },
      {
        icon: "Search",
        title: "المرحلة الثانية: دراسة السوق",
        desc: "تحليل شامل للسوق المستهدف والمنافسين والفرص",
        bullets: [
          "تحليل حجم السوق والطلب المتوقع",
          "دراسة المنافسين ونقاط القوة والضعف",
          "تحديد الفئة المستهدفة وسلوك المستهلك",
          "تحليل الاتجاهات والفرص في السوق",
        ],
      },
      {
        icon: "Target",
        title: "المرحلة الثالثة: الدراسة الفنية",
        desc: "تحديد المتطلبات الفنية والتشغيلية للمشروع",
        bullets: [
          "تحديد الموقع والمساحة المطلوبة",
          "دراسة المعدات والتكنولوجيا اللازمة",
          "تحديد احتياجات الموارد البشرية",
          "وضع خطة الإنتاج أو تقديم الخدمة",
        ],
      },
      {
        icon: "BarChart3",
        title: "المرحلة الرابعة: الدراسة المالية",
        desc: "تحليل مالي شامل لتقييم الجدوى الاقتصادية",
        bullets: [
          "تقدير التكاليف الاستثمارية والتشغيلية",
          "إعداد التوقعات المالية والتدفقات النقدية",
          "حساب معدل العائد الداخلي وفترة الاسترداد",
          "تحليل الحساسية وتقييم المخاطر",
        ],
      },
      {
        icon: "TrendingUp",
        title: "المرحلة الخامسة: التقييم والتوصيات",
        desc: "تقييم شامل وتقديم توصيات واضحة",
        bullets: [
          "تقييم الجدوى الاقتصادية الإجمالية",
          "تحديد نقاط القوة والضعف والفرص والتهديدات",
          "تقديم توصيات واضحة بشأن المضي قدماً",
          "وضع خطة تنفيذ مقترحة",
        ],
      },
      {
        icon: "FileText",
        title: "المرحلة السادسة: التقرير النهائي",
        desc: "إعداد تقرير شامل ومفصل بنتائج الدراسة",
        bullets: [
          "إعداد تقرير مفصل بجميع نتائج الدراسة",
          "عرض النتائج والتوصيات بشكل واضح ومنظم",
          "اجتماع لمناقشة النتائج والإجابة على الأسئلة",
          "تقديم الدعم في مرحلة التنفيذ",
        ],
      },
    ],

    standardsTitle: "معاييرنا المهنية",
    standards: [
      {
        title: "المعايير الدولية",
        intro: "نطبق المعايير الدولية في إعداد دراسات الجدوى، بما في ذلك:",
        bullets: ["معايير UNIDO للأمم المتحدة", "معايير البنك الدولي", "المعايير المحاسبية الدولية"],
      },
      {
        title: "ضمان الجودة",
        intro: "نضمن جودة عملنا من خلال:",
        bullets: ["مراجعة متعددة المستويات", "التحقق من دقة البيانات", "اختبار الافتراضات والنماذج"],
      },
    ],

    ctaTitle: "هل أنت مستعد للبدء؟",
    ctaDesc: "دعنا نساعدك في تحويل فكرتك إلى مشروع ناجح من خلال دراسة جدوى شاملة",
    ctaBtn1: "احجز استشارة مجانية",
    ctaBtn2: "تعرف على خدماتنا",
  },
  en: {
    heroTitle: "Our Methodology",
    heroText:
      "We follow a structured, scientific approach that blends international standards with deep local market insight to deliver accurate, comprehensive studies.",

    approachTitle: "Our Consulting Approach",
    approachIntro:
      "Every project is unique. We tailor our methodology to your needs while maintaining rigorous quality and accuracy standards.",
    approachSteps: [
      { title: "Listen & Understand", text: "We start by deeply understanding your idea, goals, and expectations." },
      { title: "Research & Analyze", text: "We collect data and analyze the market, competitors, and opportunities." },
      { title: "Assess & Recommend", text: "We assess feasibility and provide clear, evidence‑based recommendations." },
      { title: "Follow‑Up & Support", text: "We stay with you to support execution and ensure success." },
    ],

    processTitle: "Feasibility Study Stages",
    process: [
      {
        icon: "ClipboardList",
        title: "Stage 1: Preliminary Study",
        desc: "Gather essential information about the project idea and objectives.",
        bullets: [
          "Kickoff meeting to clarify idea and goals",
          "Define study scope and requirements",
          "Set work plan and timeline",
          "Initial high‑level feasibility assessment",
        ],
      },
      {
        icon: "Search",
        title: "Stage 2: Market Study",
        desc: "Comprehensive analysis of the target market, competitors, and opportunities.",
        bullets: [
          "Analyze market size and expected demand",
          "Study competitors and SWOT",
          "Define target segment and consumer behavior",
          "Analyze trends and opportunities",
        ],
      },
      {
        icon: "Target",
        title: "Stage 3: Technical Study",
        desc: "Define technical and operational requirements for the project.",
        bullets: [
          "Select location and required footprint",
          "Identify equipment and technology",
          "Define human‑resource needs",
          "Plan production/service delivery",
        ],
      },
      {
        icon: "BarChart3",
        title: "Stage 4: Financial Study",
        desc: "Comprehensive financial analysis to evaluate economic feasibility.",
        bullets: [
          "Estimate CAPEX and OPEX",
          "Prepare financial forecasts and cash flows",
          "Compute IRR and Payback Period",
          "Run sensitivity analysis and risk assessment",
        ],
      },
      {
        icon: "TrendingUp",
        title: "Stage 5: Evaluation & Recommendations",
        desc: "Holistic evaluation with clear, actionable recommendations.",
        bullets: [
          "Evaluate overall economic feasibility",
          "Identify strengths, weaknesses, opportunities, threats",
          "Provide clear go‑forward recommendations",
          "Outline an implementation plan",
        ],
      },
      {
        icon: "FileText",
        title: "Stage 6: Final Report",
        desc: "Deliver a comprehensive, detailed study report.",
        bullets: [
          "Prepare a full report with all findings",
          "Present results and recommendations clearly",
          "Hold Q&A session to discuss outcomes",
          "Provide support during execution",
        ],
      },
    ],

    standardsTitle: "Our Professional Standards",
    standards: [
      {
        title: "International Standards",
        intro: "We apply international frameworks in feasibility studies, including:",
        bullets: ["UNIDO guidelines", "World Bank standards", "International accounting standards"],
      },
      {
        title: "Quality Assurance",
        intro: "We ensure quality through:",
        bullets: ["Multi‑level reviews", "Data accuracy verification", "Testing assumptions and models"],
      },
    ],

    ctaTitle: "Ready to Start?",
    ctaDesc: "Let us help you turn your idea into a successful project with a comprehensive feasibility study.",
    ctaBtn1: "Book a Free Consultation",
    ctaBtn2: "Explore Our Services",
  },
};

const iconMap = { ClipboardList, Search, BarChart3, FileText, TrendingUp, Target } as const;

export default function MethodologyPage() {
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

      {/* Our Approach */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 text-center">{t.approachTitle}</h2>
            <p className="text-lg text-muted-foreground leading-relaxed text-center">{t.approachIntro}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {t.approachSteps.map((s, i) => (
              <Card key={i} className="text-center">
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary">{i + 1}</span>
                  </div>
                  <CardTitle className="text-lg">{s.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Process */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">{t.processTitle}</h2>

            <div className="space-y-6">
              {t.process.map((step, idx) => {
                const Icon = iconMap[step.icon as keyof typeof iconMap];
                return (
                  <Card key={idx}>
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-xl mb-2">{step.title}</CardTitle>
                          <CardDescription className="text-base leading-relaxed">{step.desc}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pr-16">
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        {step.bullets.map((b: string, i: number) => (
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

      {/* Our Standards */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">{t.standardsTitle}</h2>

            <div className="grid md:grid-cols-2 gap-6">
              {t.standards.map((card, i) => (
                <Card key={i}>
                  <CardHeader>
                    <CardTitle className="text-xl">{card.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">{card.intro}</p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {card.bullets.map((b: string, j: number) => (
                        <li key={j} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
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