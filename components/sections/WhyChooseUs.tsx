// components/sections/WhyChooseUs.tsx
"use client"

import { motion, useReducedMotion } from "framer-motion"
import { CheckCircle2 } from "lucide-react"

type Props = {
  // دالة الترجمة المستخدمة عندك في الصفحة: t("key")
  t: (key: string) => string
}

const containerVariants = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: "easeOut" },
  },
}

export default function WhyChooseUs({ t }: Props) {
  const prefersReduced = useReducedMotion()

  const features = [
    { titleKey: "localExpertise", descKey: "localExpertiseDesc" },
    { titleKey: "internationalStandards", descKey: "internationalDesc" },
    { titleKey: "specializedTeam", descKey: "specializedDesc" },
    { titleKey: "accuracyObjectivity", descKey: "accuracyDesc" },
    { titleKey: "continuousSupport", descKey: "continuousDesc" },
    { titleKey: "confidentiality", descKey: "confidentialityDesc" },
  ]

  return (
    <section className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t("whyChooseUs")}</h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
            {t("whyDescription")}
          </p>
        </div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {features.map((f) => (
            <motion.div
              key={f.titleKey}
              variants={itemVariants}
              className="flex gap-4"
              whileHover={prefersReduced ? undefined : { scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 220, damping: 18 }}
            >
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-primary-foreground" />
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">{t(f.titleKey)}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{t(f.descKey)}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
