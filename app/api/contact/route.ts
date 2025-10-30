// app/api/contact/route.ts
import { NextResponse } from "next/server";
import { z } from "zod";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { Resend } from "resend";
import ContactNotificationEmail from "@/emails/ContactNotification";
import AutoReplyEmail from "@/emails/AutoReply";

// اجبر هذا الراوت على العمل على Node.js runtime (مو Edge)
export const runtime = "nodejs";

const schema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email(),
  phone: z.string().max(30).optional().nullable(),
  service: z.string().max(60).optional().nullable(),
  message: z.string().min(5).max(5000),
  language: z.enum(["ar", "en"]).optional().default("ar"),
  company: z.string().optional().default(""), // honeypot
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, errors: parsed.error.flatten() },
        { status: 400 }
      );
    }

    // honeypot
    if (parsed.data.company && parsed.data.company.trim().length > 0) {
      return NextResponse.json({ ok: true }, { status: 204 });
    }

    const { name, email, phone, service, message, language } = parsed.data;

    // 1) إدخال Supabase
    const { data, error } = await supabaseAdmin
      .from("contacts")
      .insert([{ name, email, phone, service, message, language }])
      .select("id")
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { ok: false, error: "Failed to save message" },
        { status: 500 }
      );
    }

    // 2) إرسال البريد — فقط إذا كان مفتاح Resend متاح
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const FROM_EMAIL = process.env.FROM_EMAIL;
    const NOTIFY_TO = process.env.NOTIFY_TO;

    if (RESEND_API_KEY && FROM_EMAIL && NOTIFY_TO) {
      const resend = new Resend(RESEND_API_KEY);

      const adminPromise = resend.emails.send({
        from: FROM_EMAIL,
        to: NOTIFY_TO,
        subject: "رسالة جديدة من نموذج التواصل - عين المستثمر",
        react: ContactNotificationEmail({
          name,
          email,
          phone: phone || undefined,
          service: service || undefined,
          message,
          language,
        }),
      });

      const userPromise = resend.emails.send({
        from: FROM_EMAIL,
        to: email,
        subject: language === "ar" ? "تم استلام رسالتك" : "We received your message",
        react: AutoReplyEmail({ name, language }),
      });

      // ما نخلي البريد يكسّر نجاح الإدخال
      await Promise.allSettled([adminPromise, userPromise]);
    } else {
      console.warn(
        "[/api/contact] Email not sent: missing RESEND_API_KEY or FROM_EMAIL or NOTIFY_TO"
      );
    }

    return NextResponse.json({ ok: true, id: data.id }, { status: 201 });
  } catch (err) {
    console.error("API /contact error:", err);
    return NextResponse.json(
      { ok: false, error: "Unexpected error" },
      { status: 500 }
    );
  }
}
