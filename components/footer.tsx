"use client"

import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "@/lib/language-context"
import { Facebook, Instagram, Mail, MessageCircle, MapPin, Phone } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="border-t border-border bg-card/50 py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* الهوية + سوشال أيقونات فقط */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/01-ksnyp69TjXJHtsz1woJTeBAssEhVcM.png"
                alt="Investor's Eye Logo"
                width={80}
                height={50}
                className="object-contain"
              />
              <div>
                <h5 className="font-bold text-foreground">{t("companyName")}</h5>
                <p className="text-xs text-muted-foreground">{t("companyTagline")}</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{t("footerDescription")}</p>


          </div>

          {/* روابط سريعة (تبقى نصية إن حبيت) */}
          <div>
            <h6 className="font-semibold text-foreground mb-4">{t("quickLinks")}</h6>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">{t("about")}</Link></li>
              <li><Link href="/services" className="text-sm text-muted-foreground hover:text-primary transition-colors">{t("services")}</Link></li>
              <li><Link href="/methodology" className="text-sm text-muted-foreground hover:text-primary transition-colors">{t("methodology")}</Link></li>
              <li><Link href="/team" className="text-sm text-muted-foreground hover:text-primary transition-colors">{t("team")}</Link></li>
            </ul>
          </div>

          {/* خدماتنا (نص) */}
          <div>
            <h6 className="font-semibold text-foreground mb-4">{t("ourServices")}</h6>
            <ul className="space-y-2">
              <li><Link href="/services/feasibility-studies" className="text-sm text-muted-foreground hover:text-primary transition-colors">{t("feasibilityStudies")}</Link></li>
              <li><Link href="/services/financial-analysis" className="text-sm text-muted-foreground hover:text-primary transition-colors">{t("financialAnalysis")}</Link></li>
              <li><Link href="/services/legal-studies" className="text-sm text-muted-foreground hover:text-primary transition-colors">{t("legalStudies")}</Link></li>
              <li><Link href="/services/market-research" className="text-sm text-muted-foreground hover:text-primary transition-colors">{t("marketResearch")}</Link></li>
            </ul>
          </div>

          {/* معلومات التواصل – أيقونات فقط */}
          <div>
            <h6 className="font-semibold text-foreground mb-4">{t("contactInfo")}</h6>



                        <TooltipProvider>
              <div className="mt-4 flex items-center gap-3">
                {/* Facebook */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href="https://www.facebook.com/profile.php?id=61576291155931"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Facebook"
                      className="inline-flex h-9 w-9 items-center justify-center ftess rounded-full border border-border hover:bg-primary/10 transition"
                    >
                      <Facebook className="h-4 w-4" />
                      <span className="sr-only">Facebook</span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>Facebook</TooltipContent>
                </Tooltip>

                {/* addres */}

                <Tooltip>
                  <TooltipTrigger asChild>
                <Link
  href="https://www.google.com/maps/search/?api=1&query=33.5189167,36.2978889"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="العنوان"
  className="inline-flex h-9 w-9 items-center justify-center ftess rounded-full border border-border hover:bg-primary/10 transition"
>
                      <MapPin className="h-4 w-4" />
                      <span className="sr-only">العنوان</span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>دمشق، سوريا</TooltipContent>
                </Tooltip>


                {/* Instagram */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href="https://www.instagram.com/eyesinvestor?igsh=MWpxbWFrN29wd2thdw=="
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                      className="inline-flex h-9 w-9 items-center justify-center ftess rounded-full border border-border hover:bg-primary/10 transition"
                    >
                      <Instagram className="h-4 w-4" />
                      <span className="sr-only">Instagram</span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>Instagram</TooltipContent>
                </Tooltip>

                {/* WhatsApp */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href="https://wa.me/963944525797"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="WhatsApp"
                      className="inline-flex h-9 w-9 items-center justify-center ftess rounded-full border border-border hover:bg-primary/10 transition"
                    >
                      <MessageCircle className="h-4 w-4" />
                      <span className="sr-only">WhatsApp</span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>WhatsApp</TooltipContent>
                </Tooltip>

                {/* Email */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href="mailto:info@investorseye.sy"
                      aria-label="Email"
                      className="inline-flex h-9 w-9 items-center justify-center ftess rounded-full border border-border hover:bg-primary/10 transition"
                    >
                      <Mail className="h-4 w-4" />
                      <span className="sr-only">Email</span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>Email</TooltipContent>
                </Tooltip>
              </div>
            </TooltipProvider>
          </div>
        </div>

        <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>© 2025 {t("companyName")}. {t("allRightsReserved")}.</p>
        </div>
      </div>
    </footer>
  )
}
