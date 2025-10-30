"use client";

import { useState, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Mail, Phone, MessageSquare } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useLanguage } from "@/lib/language-context";

// i18n dictionary
const dict = {
  ar: {
    ariaLabel: "تواصل معنا",
    title: "هل نساعدك؟",
    desc: "اختر الطريقة المناسبة للتواصل معنا",
    contactPage: "صفحة التواصل",
    email: "بريد إلكتروني",
    phone: "اتصال هاتفي",
    city: "دمشق، سوريا",
  },
  en: {
    ariaLabel: "Contact us",
    title: "Need help?",
    desc: "Choose your preferred way to reach us",
    contactPage: "Contact page",
    email: "Email",
    phone: "Phone call",
    city: "Damascus, Syria",
  },
} as const;

type Props = {
  email?: string;
  phone?: string;
  contactHref?: string; // e.g. "/contact"
  emoji?: string; // floating button emoji
};

export default function ContactNudge({
  email = "info@investorseye.sy",
  phone = "+963 XXX XXX XXX",
  contactHref = "/contact",
  emoji = "💬",
}: Props) {
  const { language } = useLanguage();
  const t = useMemo(() => dict[(language as "ar" | "en") ?? "ar"], [language]);
  const isAr = language === "ar";

  const [open, setOpen] = useState(false);
  const prefersReduced = useReducedMotion();

  return (
    <div className={`fixed z-50 bottom-5 ${isAr ? "rtl:left-5" : "ltr:right-5"}`} dir={isAr ? "rtl" : "ltr"}>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <motion.button
            aria-label={t.ariaLabel}
            className="relative flex items-center justify-center w-14 h-14 rounded-full shadow-lg bg-primary text-primary-foreground hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            whileHover={prefersReduced ? {} : { scale: 1.06 }}
            whileTap={{ scale: 0.96 }}
            animate=
              {prefersReduced
                ? {}
                : {
                    y: [0, -6, 0],
                    boxShadow: [
                      "0 10px 20px rgba(0,0,0,0.12)",
                      "0 14px 28px rgba(0,0,0,0.18)",
                      "0 10px 20px rgba(0,0,0,0.12)",
                    ],
                  }}
            transition={prefersReduced ? {} : { repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
          >
            <span className="text-2xl leading-none select-none">{emoji}</span>
            {!prefersReduced && (
              <span className="pointer-events-none absolute inset-0 rounded-full animate-ping bg-primary/30" />
            )}
          </motion.button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-md" dir={isAr ? "rtl" : "ltr"}>
          <DialogHeader>
            <DialogTitle>{t.title}</DialogTitle>
            <DialogDescription>{t.desc}</DialogDescription>
          </DialogHeader>

          <div className="grid gap-3">
            <Button asChild size="lg" className="w-full">
              <Link href={contactHref}>
                <MessageSquare className={`w-4 h-4 ${isAr ? "ms-1 me-2" : "me-1 ms-2"}`} />
                {t.contactPage}
              </Link>
            </Button>

            <Button variant="secondary" asChild className="w-full">
              <a href={`mailto:${email}`}>
                <Mail className={`w-4 h-4 ${isAr ? "ms-1 me-2" : "me-1 ms-2"}`} />
                {t.email}
              </a>
            </Button>

            <Button variant="outline" asChild className="w-full">
              <a href={`tel:${phone.replace(/\s+/g, "")}`}>
                <Phone className={`w-4 h-4 ${isAr ? "ms-1 me-2" : "me-1 ms-2"}`} />
                {t.phone}
              </a>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}