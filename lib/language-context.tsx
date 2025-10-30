"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "ar" | "en"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations = {
  ar: {
    // Header
    home: "الرئيسية",
    about: "من نحن",
    services: "خدماتنا",
    methodology: "منهجيتنا",
    team: "فريقنا",
    contact: "تواصل معنا",
    getConsultation: "احصل على استشارة",

    // Hero
    trustedPartner: "شريكك الموثوق في اتخاذ القرارات الاستثمارية",
    heroTitle: "دراسات جدوى اقتصادية احترافية",
    heroDescription:
      "نساعدك في تحويل أفكارك إلى مشاريع ناجحة من خلال دراسات جدوى شاملة ودقيقة تعتمد على أحدث المعايير الدولية",
    startProject: "ابدأ مشروعك الآن",
    exploreServices: "تعرف على خدماتنا",

    // Stats
    completedStudies: "دراسة جدوى منجزة",
    satisfiedClients: "عميل راضٍ",
    economicSectors: "قطاع اقتصادي",
    successRate: "معدل النجاح",

    // Services
    ourServices: "خدماتنا المتخصصة",
    servicesDescription: "نقدم مجموعة شاملة من الخدمات الاستشارية لضمان نجاح مشروعك الاستثماري",
    learnMore: "اعرف المزيد",

    feasibilityStudies: "دراسات الجدوى الاقتصادية",
    feasibilityDesc: "تحليل شامل للجوانب المالية والتسويقية والفنية لمشروعك",

    financialAnalysis: "التحليل المالي والاستثماري",
    financialDesc: "تقييم الأداء المالي وتحليل العوائد والمخاطر الاستثمارية",

    legalStudies: "الدراسات القانونية",
    legalDesc: "استشارات قانونية متخصصة لضمان امتثال مشروعك للأنظمة",

    marketResearch: "دراسات السوق",
    marketDesc: "أبحاث معمقة لفهم السوق والمنافسين والفرص المتاحة",

    managementConsulting: "الاستشارات الإدارية",
    managementDesc: "تطوير الهياكل التنظيمية وتحسين الكفاءة التشغيلية",

    customServices: "خدمات مخصصة",
    customDesc: "حلول استشارية مصممة خصيصاً لتلبية احتياجاتك الفريدة",

    // Why Choose Us
    whyChooseUs: "لماذا تختار عين المستثمر؟",
    whyDescription: "نتميز بخبرتنا العميقة وفهمنا الشامل للسوق السوري والإقليمي",

    localExpertise: "خبرة محلية عميقة",
    localExpertiseDesc: "فهم شامل للسوق السوري وتحدياته وفرصه الاستثمارية",

    internationalStandards: "معايير دولية",
    internationalDesc: "نطبق أفضل الممارسات والمعايير الدولية في جميع دراساتنا",

    specializedTeam: "فريق متخصص",
    specializedDesc: "خبراء في الاقتصاد والمالية والقانون والإدارة",

    accuracyObjectivity: "دقة وموضوعية",
    accuracyDesc: "تحليلات دقيقة مبنية على بيانات موثوقة ومنهجية علمية",

    continuousSupport: "متابعة مستمرة",
    continuousDesc: "نبقى معك من مرحلة الدراسة حتى تنفيذ المشروع",

    confidentiality: "سرية تامة",
    confidentialityDesc: "نحافظ على سرية معلوماتك وأفكارك الاستثمارية",

    // CTA
    haveProjectIdea: "هل لديك فكرة مشروع؟",
    ctaDescription: "دعنا نساعدك في تحويلها إلى واقع من خلال دراسة جدوى شاملة ومهنية",
    bookConsultation: "احجز استشارة مجانية",
    learnMoreAbout: "تعرف علينا أكثر",

    // Footer
    companyName: "عين المستثمر",
    companyTagline: "Investor's Eye",
    footerDescription: "شريكك الموثوق في دراسات الجدوى الاقتصادية والاستشارات الاستثمارية في سوريا",
    quickLinks: "روابط سريعة",
    ourServices: "خدماتنا",
    contactInfo: "معلومات التواصل",
    allRightsReserved: "جميع الحقوق محفوظة",
  },
  en: {
    // Header
    home: "Home",
    about: "About Us",
    services: "Services",
    methodology: "Methodology",
    team: "Team",
    contact: "Contact",
    getConsultation: "Get Consultation",

    // Hero
    trustedPartner: "Your Trusted Partner in Investment Decisions",
    heroTitle: "Professional Economic Feasibility Studies",
    heroDescription:
      "We help you transform your ideas into successful projects through comprehensive and accurate feasibility studies based on the latest international standards",
    startProject: "Start Your Project Now",
    exploreServices: "Explore Our Services",

    // Stats
    completedStudies: "Completed Studies",
    satisfiedClients: "Satisfied Clients",
    economicSectors: "Economic Sectors",
    successRate: "Success Rate",

    // Services
    ourServices: "Our Specialized Services",
    servicesDescription:
      "We offer a comprehensive range of consulting services to ensure the success of your investment project",
    learnMore: "Learn More",

    feasibilityStudies: "Economic Feasibility Studies",
    feasibilityDesc: "Comprehensive analysis of financial, marketing, and technical aspects of your project",

    financialAnalysis: "Financial & Investment Analysis",
    financialDesc: "Evaluation of financial performance and analysis of investment returns and risks",

    legalStudies: "Legal Studies",
    legalDesc: "Specialized legal consultations to ensure your project complies with regulations",

    marketResearch: "Market Research",
    marketDesc: "In-depth research to understand the market, competitors, and available opportunities",

    managementConsulting: "Management Consulting",
    managementDesc: "Development of organizational structures and improvement of operational efficiency",

    customServices: "Custom Services",
    customDesc: "Consulting solutions designed specifically to meet your unique needs",

    // Why Choose Us
    whyChooseUs: "Why Choose Investor's Eye?",
    whyDescription:
      "We stand out with our deep expertise and comprehensive understanding of the Syrian and regional market",

    localExpertise: "Deep Local Expertise",
    localExpertiseDesc: "Comprehensive understanding of the Syrian market, its challenges and investment opportunities",

    internationalStandards: "International Standards",
    internationalDesc: "We apply best practices and international standards in all our studies",

    specializedTeam: "Specialized Team",
    specializedDesc: "Experts in economics, finance, law, and management",

    accuracyObjectivity: "Accuracy & Objectivity",
    accuracyDesc: "Precise analyses based on reliable data and scientific methodology",

    continuousSupport: "Continuous Support",
    continuousDesc: "We stay with you from the study phase to project implementation",

    confidentiality: "Complete Confidentiality",
    confidentialityDesc: "We maintain the confidentiality of your information and investment ideas",

    // CTA
    haveProjectIdea: "Have a Project Idea?",
    ctaDescription: "Let us help you turn it into reality through a comprehensive and professional feasibility study",
    bookConsultation: "Book Free Consultation",
    learnMoreAbout: "Learn More About Us",

    // Footer
    companyName: "Investor's Eye",
    companyTagline: "عين المستثمر",
    footerDescription: "Your trusted partner in economic feasibility studies and investment consulting in Syria",
    quickLinks: "Quick Links",
    ourServices: "Our Services",
    contactInfo: "Contact Information",
    allRightsReserved: "All Rights Reserved",
  },
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("ar")

  useEffect(() => {
    const savedLang = localStorage.getItem("language") as Language
    if (savedLang && (savedLang === "ar" || savedLang === "en")) {
      setLanguageState(savedLang)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem("language", lang)

    // Update HTML attributes
    document.documentElement.lang = lang
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr"
  }

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.ar] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
