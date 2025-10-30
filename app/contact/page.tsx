"use client"

import type React from "react"
import { useState } from "react"
import { useLanguage } from "@/lib/language-context"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export default function ContactPage() {
  const { language } = useLanguage()
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<null | { type: "ok" | "err"; msg: string }>(null)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
    company: "", // honeypot (يجب أن يبقى فارغ)
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus(null)
    setLoading(true)
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          language: language === "ar" ? "ar" : "en",
        }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data?.error || "Failed to send message")
      }
      setStatus({
        type: "ok",
        msg:
          language === "ar"
            ? "تم إرسال رسالتك بنجاح. سنعاود التواصل قريبًا."
            : "Your message has been sent successfully. We'll get back to you soon.",
      })
      // تفريغ الحقول
      setFormData({ name: "", email: "", phone: "", service: "", message: "", company: "" })
    } catch (err: any) {
      setStatus({
        type: "err",
        msg:
          language === "ar"
            ? "عذرًا، حصل خطأ أثناء الإرسال. جرّب لاحقًا."
            : "Sorry, something went wrong. Please try again later.",
      })
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // ... (محتوى content الذي عندك كما هو)
const content = language === "ar" ? { pageTitle: "تواصل معنا", pageDescription: "نحن هنا للإجابة على استفساراتك ومساعدتك في تحقيق أهدافك الاستثمارية", formTitle: "أرسل لنا رسالة", formDescription: "املأ النموذج أدناه وسنتواصل معك في أقرب وقت ممكن", fullName: "الاسم الكامل", fullNamePlaceholder: "أدخل اسمك الكامل", email: "البريد الإلكتروني", phone: "رقم الهاتف", phonePlaceholder: "+963 XXX XXX XXX", serviceRequired: "الخدمة المطلوبة", selectService: "اختر الخدمة", message: "رسالتك", messagePlaceholder: "أخبرنا عن مشروعك أو استفسارك...", sendMessage: "إرسال الرسالة", contactInfo: "معلومات التواصل", address: "العنوان", addressDetails: "دمشق، سوريا\nشارع المتنبي، مبنى الأعمال", workingHours: "ساعات العمل", workingHoursDetails: "الأحد - الخميس: 9:00 ص - 5:00 م\nالجمعة - السبت: مغلق", freeConsultation: "استشارة مجانية", consultationDesc: "احصل على استشارة مجانية لمدة 30 دقيقة لمناقشة مشروعك واحتياجاتك", bookAppointment: "احجز موعداً", ourLocation: "موقعنا", locationDesc: "نحن في قلب دمشق، في انتظار زيارتك", mapPlaceholder: "خريطة الموقع", faqTitle: "أسئلة شائعة", faq1Q: "كم تستغرق دراسة الجدوى؟", faq1A: "تختلف المدة حسب حجم وتعقيد المشروع، لكن عادة تستغرق دراسة الجدوى الشاملة من 2 إلى 6 أسابيع. سنقدم لك جدولاً زمنياً دقيقاً بعد مناقشة تفاصيل مشروعك.", faq2Q: "ما هي تكلفة الخدمات؟", faq2A: "تختلف التكلفة حسب نوع الخدمة ونطاق العمل المطلوب. نقدم عروض أسعار مخصصة بعد فهم احتياجاتك. تواصل معنا للحصول على عرض سعر مجاني.", faq3Q: "هل تقدمون خدمات المتابعة بعد الدراسة؟", faq3A: "نعم، نقدم خدمات المتابعة والدعم خلال مرحلة تنفيذ المشروع لضمان تطبيق توصيات الدراسة بشكل صحيح وتحقيق النتائج المرجوة.", faq4Q: "هل تعملون مع مشاريع من خارج سوريا؟", faq4A: "نعم، نقدم خدماتنا للمشاريع في سوريا والمنطقة العربية. لدينا خبرة في التعامل مع مختلف الأسواق الإقليمية.", services: { feasibility: "دراسات الجدوى الاقتصادية", financial: "التحليل المالي والاستثماري", legal: "الدراسات القانونية", market: "دراسات السوق", management: "الاستشارات الإدارية", other: "خدمات أخرى", }, } : { pageTitle: "Contact Us", pageDescription: "We're here to answer your questions and help you achieve your investment goals", formTitle: "Send Us a Message", formDescription: "Fill out the form below and we'll get back to you as soon as possible", fullName: "Full Name", fullNamePlaceholder: "Enter your full name", email: "Email", phone: "Phone Number", phonePlaceholder: "+963 XXX XXX XXX", serviceRequired: "Service Required", selectService: "Select Service", message: "Your Message", messagePlaceholder: "Tell us about your project or inquiry...", sendMessage: "Send Message", contactInfo: "Contact Information", address: "Address", addressDetails: "Damascus, Syria\nAl-Mutanabbi Street, Business Building", workingHours: "Working Hours", workingHoursDetails: "Sunday - Thursday: 9:00 AM - 5:00 PM\nFriday - Saturday: Closed", freeConsultation: "Free Consultation", consultationDesc: "Get a free 30-minute consultation to discuss your project and needs", bookAppointment: "Book Appointment", ourLocation: "Our Location", locationDesc: "We're in the heart of Damascus, waiting for your visit", mapPlaceholder: "Location Map", faqTitle: "Frequently Asked Questions", faq1Q: "How long does a feasibility study take?", faq1A: "The duration varies depending on the size and complexity of the project, but typically a comprehensive feasibility study takes 2 to 6 weeks. We'll provide you with an accurate timeline after discussing your project details.", faq2Q: "What is the cost of services?", faq2A: "The cost varies depending on the type of service and scope of work required. We provide customized quotes after understanding your needs. Contact us for a free quote.", faq3Q: "Do you provide follow-up services after the study?", faq3A: "Yes, we provide follow-up and support services during the project implementation phase to ensure proper application of study recommendations and achievement of desired results.", faq4Q: "Do you work with projects outside Syria?", faq4A: "Yes, we provide our services for projects in Syria and the Arab region. We have experience dealing with various regional markets.", services: { feasibility: "Economic Feasibility Studies", financial: "Financial & Investment Analysis", legal: "Legal Studies", market: "Market Research", management: "Management Consulting", other: "Other Services", }, }

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
      {/* ... Hero ... */}

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">{content.formTitle}</CardTitle>
                  <CardDescription className="text-base">{content.formDescription}</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                    {/* Honeypot field (مخفي عن البشر) */}
                    <div className="hidden">
                      <Label htmlFor="company">Company</Label>
                      <Input
                        id="company"
                        autoComplete="off"
                        tabIndex={-1}
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="name">{content.fullName} *</Label>
                      <Input
                        id="name"
                        placeholder={content.fullNamePlaceholder}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">{content.email} *</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="example@email.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">{content.phone} *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder={content.phonePlaceholder}
                          dir="ltr"
                          className="text-right"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="service">{content.serviceRequired} *</Label>
                      <Select
                        value={formData.service}
                        onValueChange={(value) => setFormData({ ...formData, service: value })}
                      >
                        <SelectTrigger id="service">
                          <SelectValue placeholder={content.selectService} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="feasibility">{content.services.feasibility}</SelectItem>
                          <SelectItem value="financial">{content.services.financial}</SelectItem>
                          <SelectItem value="legal">{content.services.legal}</SelectItem>
                          <SelectItem value="market">{content.services.market}</SelectItem>
                          <SelectItem value="management">{content.services.management}</SelectItem>
                          <SelectItem value="other">{content.services.other}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">{content.message} *</Label>
                      <Textarea
                        id="message"
                        placeholder={content.messagePlaceholder}
                        rows={6}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full" disabled={loading}>
                      {loading
                        ? language === "ar"
                          ? "جاري الإرسال..."
                          : "Sending..."
                        : content.sendMessage}
                    </Button>

                    {status && (
                      <p
                        className={`text-sm ${
                          status.type === "ok" ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {status.msg}
                      </p>
                    )}
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* ... باقي الأعمدة كما هي (معلومات التواصل + الاستشارة المجانية) ... */}
          </div>
        </div>
      </section>




      {/* Map Section */}
   <section className="py-20 bg-muted/30">
  <div className="container mx-auto px-4">
    <div className="max-w-6xl mx-auto">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">{content.ourLocation}</CardTitle>
          <CardDescription className="text-base">{content.locationDesc}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full h-96 rounded-lg overflow-hidden">
         

<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d831.5813529097193!2d36.297289269552515!3d33.518924116419164!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1518e72577415b69%3A0xfe986e55c0df4b6d!2sG79X%2BG6H%2C%20Damascus%2C%20Syrie!5e0!3m2!1sfr!2snl!4v1761731781200!5m2!1sfr!2snl"
    className="w-full h-full border-0"
    loading="lazy"
    allowFullScreen
    referrerPolicy="no-referrer-when-downgrade"
  />

          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</section>


      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">{content.faqTitle}</h2>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{content.faq1Q}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">{content.faq1A}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{content.faq2Q}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">{content.faq2A}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{content.faq3Q}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">{content.faq3A}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{content.faq4Q}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">{content.faq4A}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
