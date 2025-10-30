"use client"

import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"
import { Languages } from "lucide-react"

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <Button variant="outline" size="sm" onClick={() => setLanguage(language === "ar" ? "en" : "ar")} className="gap-2">
      <Languages className="h-4 w-4" />
      <span className="text-sm font-medium">{language === "ar" ? "EN" : "ع"}</span>
    </Button>
  )
}
