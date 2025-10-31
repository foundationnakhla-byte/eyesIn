// app/layout.tsx
import type React from "react"
import type { Metadata } from "next"
import localFont from "next/font/local"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import ChatWidget from "@/components/ChatWidget"

import { Providers } from "./providers" // يغلّف LanguageProvider داخله
import ContactNudge from "@/components/ContactNudge"

// 🔹 خط DG Agnadeen
const dgAgnadeen = localFont({
  src: [
    { path: "/fonts/DGAgnadeen-Regular.ttf", weight: "400", style: "normal" },
    { path: "/fonts/DGAgnadeen-Light.ttf", weight: "300", style: "normal" },
    { path: "/fonts/DGAgnadeen-Bold.ttf", weight: "700", style: "normal" },
    { path: "/fonts/DGAgnadeen-Extrabold.ttf", weight: "800", style: "normal" },
    { path: "/fonts/DGAgnadeen-Thin.ttf", weight: "200", style: "normal" },
    { path: "/fonts/DGAgnadeen-Ultralight.ttf", weight: "100", style: "normal" },
    { path: "/fonts/DGAgnadeen-Heavy.ttf", weight: "900", style: "normal" },
  ],
  display: "swap",
  variable: "--font-arabic",
  fallback: ["system-ui", "Segoe UI", "Arial"],
})

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-latin",
})

export const metadata: Metadata = {
  title: "عين المستثمر | Investor's Eye - دراسات الجدوى الاقتصادية",
  description:
    "شركة عين المستثمر متخصصة في دراسات الجدوى الاقتصادية والدراسات القانونية وتحليل المشاريع في سوريا",
  keywords:
    "دراسات الجدوى, اقتصاد, سوريا, استثمار, مشاريع, تحليل مالي, استشارات, أعمال, شركات, دراسات قانونية",
  generator: "MULLA-WEB",  icons: {
    icon: "/ico.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // إذا عم تغيّر الاتجاه/اللغة بالعميل، هاد بيمنع تحذيرات الهيدرation
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${dgAgnadeen.variable} ${inter.variable} font-sans antialiased`}>
        {/* لفّ الشجرة كاملة بالـ Providers (يحتوي LanguageProvider) */}
        <Providers>
          {children}

          {/* أي مكوّن يستخدم useLanguage لازم يكون داخل Providers */}
          <ContactNudge
            email="info@investorseye.sy"
            phone="+963 999 999 999"
            contactHref="/contact"
            emoji="👋"
          />
                  <ChatWidget />

        </Providers>

        <Analytics />
      </body>
    </html>
  )
}
