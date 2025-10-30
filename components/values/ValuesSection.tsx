// components/values/ValuesSection.tsx
"use client"

import { useLanguage } from "@/lib/language-context"
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"

export default function ValuesSection() {
  const { language } = useLanguage()
  const isAr = language === "ar"

  const t = isAr
    ? {
        title: "القيم المؤسسية",
        subtitle:
          'تؤمن شركة "عين المستثمر" بأن المعرفة قوة، وأن القرار الاستثماري السليم لا يُبنى على العاطفة، بل على الأرقام والتحليل والتخطيط. ومن هذا المبدأ تنطلق قيمنا الأساسية:',
        items: [
          { title: "الدقة العلمية", desc: "لا نقدّم توصية دون تحليل وتوثيق", color: "text-teal-600" },
          { title: "الشفافية", desc: "نضع جميع المعطيات أمام العميل بوضوح", color: "text-blue-600" },
          { title: "الحيادية", desc: "دراساتنا مستقلة وغير موجهة", color: "text-green-600" },
          { title: "المرونة", desc: "نخدم كل مشروع وفق حجمه وظروفه", color: "text-purple-600" },
          { title: "الاحترافية", desc: "نستخدم أدوات تحليل متقدمة ونهجًا ممنهجًا", color: "text-orange-600" },
        ],
      }
    : {
        title: "Our Core Values",
        subtitle:
          'At Investor’s Eye, we believe knowledge is power. Sound investment decisions are built on numbers, analysis, and planning—not emotions. From this principle, our core values emerge:',
        items: [
          { title: "Scientific Rigor", desc: "No recommendation without analysis and documentation", color: "text-teal-600" },
          { title: "Transparency", desc: "We present all data clearly to our clients", color: "text-blue-600" },
          { title: "Neutrality", desc: "Our studies are independent and unbiased", color: "text-green-600" },
          { title: "Flexibility", desc: "We tailor our work to each project’s size and context", color: "text-purple-600" },
          { title: "Professionalism", desc: "We use advanced tools and a systematic approach", color: "text-orange-600" },
        ],
      }

  return (
    <section className="py-20 bg-muted/30" dir={isAr ? "rtl" : "ltr"}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">{t.title}</h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
          {t.items.map((item, i) => (
            <Card key={i} className="text-center">
              <CardHeader>
                <CardTitle className={`text-lg font-semibold tracking-tight ${item.color}`}>
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
