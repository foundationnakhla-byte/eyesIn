"use client";

import { useMemo } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Target, Eye, Award, Users, TrendingUp, Globe } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

// In-file i18n copy. You can move this to a shared messages file later.
const dict = {
  ar: {
    heroTitle: "من نحن",
    heroText:
      "عين المستثمر هي شركة استشارية متخصصة في دراسات الجدوى الاقتصادية والتحليل المالي، نساعد المستثمرين ورواد الأعمال على اتخاذ قرارات استثمارية مدروسة ومبنية على أسس علمية",
    storyTitle: "قصتنا",
    storyP1:
      "تأسست شركة عين المستثمر من إيمان عميق بأهمية اتخاذ القرارات الاستثمارية المدروسة والمبنية على معلومات دقيقة وتحليلات موضوعية. في بيئة اقتصادية متغيرة ومليئة بالتحديات والفرص، أدركنا الحاجة الماسة لخدمات استشارية متخصصة تفهم السوق المحلي وتطبق المعايير الدولية.",
    storyP2:
      "منذ انطلاقتنا، عملنا مع أكثر من 120 عميلاً من مختلف القطاعات الاقتصادية، وأنجزنا أكثر من 150 دراسة جدوى شاملة. نفخر بأن معظم المشاريع التي درسناها حققت نجاحاً ملموساً، مما يعكس دقة تحليلاتنا وعمق فهمنا للسوق.",
    storyP3:
      "اليوم، نواصل مسيرتنا بالتزام ثابت تجاه التميز والمهنية، ساعين دائماً لتقديم أفضل الخدمات الاستشارية التي تساعد عملاءنا على تحقيق أهدافهم الاستثمارية.",
    vision: "رؤيتنا",
    visionText:
      "أن نكون الشريك الاستشاري الأول للمستثمرين ورواد الأعمال في سوريا والمنطقة، ومرجعاً موثوقاً في دراسات الجدوى الاقتصادية والتحليل المالي، نساهم في بناء اقتصاد قوي ومستدام من خلال دعم المشاريع الناجحة والمدروسة.",
    mission: "رسالتنا",
    missionText:
      "تقديم خدمات استشارية متميزة في دراسات الجدوى الاقتصادية والتحليل المالي، مبنية على أسس علمية ومعايير دولية، مع فهم عميق للسوق المحلي. نلتزم بالدقة والموضوعية والسرية التامة، ونسعى لبناء علاقات طويلة الأمد مع عملائنا قائمة على الثقة والنتائج.",
    valuesTitle: "قيمنا",
    valuesSub: "القيم التي توجه عملنا وتحدد علاقتنا مع عملائنا",
    v1: "التميز والجودة",
    v1Text: "نسعى دائماً لتقديم أعلى مستويات الجودة في جميع خدماتنا، ونلتزم بالمعايير المهنية والدولية",
    v2: "الدقة والموضوعية",
    v2Text: "نعتمد على البيانات الموثوقة والتحليل العلمي، ونقدم توصيات موضوعية بعيداً عن التحيز",
    v3: "التركيز على العميل",
    v3Text: "نضع احتياجات عملائنا في المقام الأول، ونعمل كشركاء حقيقيين في نجاحهم",
    v4: "الابتكار والتطوير",
    v4Text: "نواكب أحدث الأساليب والأدوات في مجال التحليل الاقتصادي والمالي، ونطور خدماتنا باستمرار",
    v5: "الشفافية والنزاهة",
    v5Text: "نلتزم بأعلى معايير الشفافية والنزاهة في جميع تعاملاتنا، ونحافظ على سرية معلومات عملائنا",
    v6: "المسؤولية الاجتماعية",
    v6Text: "نؤمن بدورنا في دعم التنمية الاقتصادية المستدامة والمساهمة في بناء مجتمع أفضل",
    ctaTitle: "هل تريد معرفة المزيد؟",
    ctaDesc: "تعرف على منهجيتنا في العمل وكيف نساعدك في تحقيق أهدافك الاستثمارية",
    ctaMethod: "تعرف على منهجيتنا",
    ctaContact: "تواصل معنا",
  },
  en: {
    heroTitle: "About Us",
    heroText:
      "Investor Eye is a consultancy specialized in feasibility studies and financial analysis. We help investors and entrepreneurs make informed, research‑based decisions.",
    storyTitle: "Our Story",
    storyP1:
      "Investor Eye was founded on a firm belief in data‑driven investment decisions based on accurate information and objective analysis. In a dynamic economy full of challenges and opportunities, we saw a real need for specialized advisory services that understand the local market while applying international standards.",
    storyP2:
      "Since our launch, we have worked with over 120 clients across sectors and completed more than 150 comprehensive feasibility studies. We are proud that most of the projects we assessed achieved tangible success—evidence of our market insight and analytical rigor.",
    storyP3:
      "Today, we continue with a commitment to excellence and professionalism, always striving to deliver the best advisory services that help our clients achieve their investment goals.",
    vision: "Our Vision",
    visionText:
      "To be the leading advisory partner for investors and entrepreneurs in Syria and the region, and a trusted reference in feasibility studies and financial analysis—contributing to a strong, sustainable economy by supporting well‑designed, successful projects.",
    mission: "Our Mission",
    missionText:
      "To deliver outstanding advisory services in feasibility studies and financial analysis based on scientific methods and international standards, with deep understanding of the local market. We are committed to accuracy, objectivity, and confidentiality, and we build long‑term, trust‑based relationships with our clients.",
    valuesTitle: "Our Values",
    valuesSub: "The principles that guide our work and shape our client relationships",
    v1: "Excellence & Quality",
    v1Text: "We consistently aim for top quality across our services and adhere to professional, international standards.",
    v2: "Accuracy & Objectivity",
    v2Text: "We rely on credible data and scientific analysis to provide unbiased recommendations.",
    v3: "Client Focus",
    v3Text: "We put our clients’ needs first and act as true partners in their success.",
    v4: "Innovation & Growth",
    v4Text: "We keep up with the latest methods and tools in economic and financial analysis and continuously evolve our services.",
    v5: "Transparency & Integrity",
    v5Text: "We uphold the highest standards of transparency and integrity and protect our clients’ confidentiality.",
    v6: "Social Responsibility",
    v6Text: "We believe in supporting sustainable economic development and contributing to a better society.",
    ctaTitle: "Want to learn more?",
    ctaDesc: "Explore our methodology and how we help you reach your investment goals.",
    ctaMethod: "Explore Our Methodology",
    ctaContact: "Contact Us",
  },
};

export default function AboutPage() {
  const { language } = useLanguage(); // "ar" | "en" from your context
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

      {/* Our Story */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">{t.storyTitle}</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-muted-foreground leading-relaxed mb-6">{t.storyP1}</p>
              <p className="text-muted-foreground leading-relaxed mb-6">{t.storyP2}</p>
              <p className="text-muted-foreground leading-relaxed">{t.storyP3}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Eye className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-2xl">{t.vision}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{t.visionText}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-2xl">{t.mission}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{t.missionText}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t.valuesTitle}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">{t.valuesSub}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>{t.v1}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">{t.v1Text}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>{t.v2}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">{t.v2Text}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>{t.v3}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">{t.v3Text}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>{t.v4}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">{t.v4Text}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Globe className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>{t.v5}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">{t.v5Text}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>{t.v6}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">{t.v6Text}</p>
              </CardContent>
            </Card>
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
                <Link href="/methodology">{/* context-driven; if you want to persist the lang in URL add ?lang= */}
                  {t.ctaMethod}
                  {isAr ? <ArrowLeft className="mr-2 h-5 w-5" /> : <ArrowRight className="ml-2 h-5 w-5" />}
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="bg-transparent border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10"
              >
                <Link href="/contact">{t.ctaContact}</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}
