"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, Linkedin, Mail } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export default function TeamPage() {
  const { language } = useLanguage()

  const team =
    language === "ar"
      ? [
          {
            name: "د. أحمد السيد",
            title: "المدير التنفيذي",
            description: "خبير في الاقتصاد والتحليل المالي مع أكثر من 15 عاماً من الخبرة في دراسات الجدوى",
            expertise: ["الاقتصاد", "التحليل المالي", "التخطيط الاستراتيجي"],
          },
          {
            name: "م. سارة محمود",
            title: "مديرة الدراسات الفنية",
            description: "مهندسة صناعية متخصصة في تخطيط المشاريع وتحليل العمليات التشغيلية",
            expertise: ["الهندسة الصناعية", "تخطيط المشاريع", "إدارة العمليات"],
          },
          {
            name: "د. محمد العلي",
            title: "مستشار قانوني",
            description: "محامٍ ومستشار قانوني متخصص في قانون الشركات والاستثمار",
            expertise: ["القانون التجاري", "قانون الاستثمار", "العقود"],
          },
          {
            name: "أ. ليلى حسن",
            title: "مديرة أبحاث السوق",
            description: "خبيرة في أبحاث السوق والتحليل التسويقي مع خبرة واسعة في السوق السوري",
            expertise: ["أبحاث السوق", "التحليل التسويقي", "سلوك المستهلك"],
          },
          {
            name: "م. خالد يوسف",
            title: "مستشار إداري",
            description: "متخصص في تطوير الهياكل التنظيمية وتحسين الأداء المؤسسي",
            expertise: ["الإدارة الاستراتيجية", "التطوير التنظيمي", "إدارة الأداء"],
          },
          {
            name: "أ. رنا الأحمد",
            title: "محللة مالية",
            description: "محللة مالية معتمدة متخصصة في التقييم المالي وتحليل الاستثمارات",
            expertise: ["التحليل المالي", "تقييم الاستثمارات", "النمذجة المالية"],
          },
        ]
      : [
          {
            name: "Dr. Ahmed Al-Sayed",
            title: "Chief Executive Officer",
            description:
              "Expert in economics and financial analysis with over 15 years of experience in feasibility studies",
            expertise: ["Economics", "Financial Analysis", "Strategic Planning"],
          },
          {
            name: "Eng. Sarah Mahmoud",
            title: "Technical Studies Director",
            description: "Industrial engineer specialized in project planning and operational process analysis",
            expertise: ["Industrial Engineering", "Project Planning", "Operations Management"],
          },
          {
            name: "Dr. Mohammed Al-Ali",
            title: "Legal Consultant",
            description: "Lawyer and legal consultant specialized in corporate and investment law",
            expertise: ["Commercial Law", "Investment Law", "Contracts"],
          },
          {
            name: "Ms. Layla Hassan",
            title: "Market Research Director",
            description:
              "Expert in market research and marketing analysis with extensive experience in the Syrian market",
            expertise: ["Market Research", "Marketing Analysis", "Consumer Behavior"],
          },
          {
            name: "Eng. Khaled Youssef",
            title: "Management Consultant",
            description: "Specialist in developing organizational structures and improving institutional performance",
            expertise: ["Strategic Management", "Organizational Development", "Performance Management"],
          },
          {
            name: "Ms. Rana Al-Ahmad",
            title: "Financial Analyst",
            description: "Certified financial analyst specialized in financial valuation and investment analysis",
            expertise: ["Financial Analysis", "Investment Valuation", "Financial Modeling"],
          },
        ]

  const content =
    language === "ar"
      ? {
          pageTitle: "فريقنا",
          pageDescription: "فريق من الخبراء المتخصصين في مختلف المجالات الاقتصادية والمالية والقانونية والإدارية",
          whyUs: "لماذا نحن؟",
          diverseExpertise: "خبرة متنوعة",
          diverseDesc: "فريقنا يجمع خبرات متنوعة في الاقتصاد والمالية والقانون والإدارة والتسويق",
          localKnowledge: "معرفة محلية عميقة",
          localDesc: "فهم شامل للسوق السوري والبيئة الاقتصادية والقانونية المحلية",
          intlStandards: "معايير دولية",
          intlDesc: "نطبق أفضل الممارسات والمعايير الدولية في جميع أعمالنا",
          excellence: "التزام بالتميز",
          excellenceDesc: "نسعى دائماً لتقديم أعلى مستويات الجودة والاحترافية",
          ctaTitle: "هل تريد العمل معنا؟",
          ctaDesc: "تواصل معنا لمناقشة مشروعك والحصول على استشارة من فريقنا المتخصص",
          contactUs: "تواصل معنا",
          ourServices: "تعرف على خدماتنا",
        }
      : {
          pageTitle: "Our Team",
          pageDescription:
            "A team of experts specialized in various economic, financial, legal, and administrative fields",
          whyUs: "Why Us?",
          diverseExpertise: "Diverse Expertise",
          diverseDesc: "Our team combines diverse expertise in economics, finance, law, management, and marketing",
          localKnowledge: "Deep Local Knowledge",
          localDesc: "Comprehensive understanding of the Syrian market and local economic and legal environment",
          intlStandards: "International Standards",
          intlDesc: "We apply best practices and international standards in all our work",
          excellence: "Commitment to Excellence",
          excellenceDesc: "We always strive to deliver the highest levels of quality and professionalism",
          ctaTitle: "Want to Work With Us?",
          ctaDesc: "Contact us to discuss your project and get consultation from our specialized team",
          contactUs: "Contact Us",
          ourServices: "Explore Our Services",
        }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">{content.pageTitle}</h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-pretty">
              {content.pageDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {team.map((member, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary">{member.name.charAt(0)}</span>
                  </div>
                  <CardTitle className="text-xl text-center">{member.name}</CardTitle>
                  <CardDescription className="text-center text-base">{member.title}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed text-center">{member.description}</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {member.expertise.map((skill, skillIndex) => (
                      <span key={skillIndex} className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-center gap-3 mt-4 pt-4 border-t border-border">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Mail className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Linkedin className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">{content.whyUs}</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-foreground mb-3 text-lg">{content.diverseExpertise}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{content.diverseDesc}</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-foreground mb-3 text-lg">{content.localKnowledge}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{content.localDesc}</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-foreground mb-3 text-lg">{content.intlStandards}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{content.intlDesc}</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-foreground mb-3 text-lg">{content.excellence}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{content.excellenceDesc}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-br from-primary to-primary/80 border-0 text-primary-foreground max-w-4xl mx-auto">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-3xl md:text-4xl mb-4">{content.ctaTitle}</CardTitle>
              <CardDescription className="text-lg text-primary-foreground/90 leading-relaxed">
                {content.ctaDesc}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/contact">
                  {content.contactUs}
                  <ArrowLeft className="mr-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="bg-transparent border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10"
              >
                <Link href="/services">{content.ourServices}</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  )
}
