"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useLanguage } from "@/lib/language-context"
import { LanguageSwitcher } from "@/components/language-switcher"
import Image from "next/image"

export function Header() {
  const { t } = useLanguage()

  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/01-ksnyp69TjXJHtsz1woJTeBAssEhVcM.png"
              alt="Investor's Eye Logo"
              width={80}
              height={50}
              className="object-contain"
            />
            <div>
              <h1 className="text-xl font-bold text-foreground">{t("companyName")}</h1>
              <p className="text-xs text-muted-foreground">{t("companyTagline")}</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              {t("home")}
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {t("about")}
            </Link>
            <Link
              href="/services"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {t("services")}
            </Link>
            <Link
              href="/methodology"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {t("methodology")}
            </Link>
            <Link
              href="/team"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {t("team")}
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {t("contact")}
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <Button asChild className="hidden md:flex">
              <Link href="/contact">{t("getConsultation")}</Link>
            </Button>

            {/* Mobile Navigation */}
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="outline" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px]">
                <div className="flex flex-col gap-4 mt-8">
                  <Link href="/" className="text-base font-medium text-foreground hover:text-primary transition-colors">
                    {t("home")}
                  </Link>
                  <Link
                    href="/about"
                    className="text-base font-medium text-foreground hover:text-primary transition-colors"
                  >
                    {t("about")}
                  </Link>
                  <Link
                    href="/services"
                    className="text-base font-medium text-foreground hover:text-primary transition-colors"
                  >
                    {t("services")}
                  </Link>
                  <Link
                    href="/methodology"
                    className="text-base font-medium text-foreground hover:text-primary transition-colors"
                  >
                    {t("methodology")}
                  </Link>
                  <Link
                    href="/team"
                    className="text-base font-medium text-foreground hover:text-primary transition-colors"
                  >
                    {t("team")}
                  </Link>
                  <Link
                    href="/contact"
                    className="text-base font-medium text-foreground hover:text-primary transition-colors"
                  >
                    {t("contact")}
                  </Link>
                  <Button asChild className="mt-4">
                    <Link href="/contact">{t("getConsultation")}</Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </header>
  )
}
