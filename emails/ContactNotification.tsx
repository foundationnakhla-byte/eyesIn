import * as React from "react";
import { Html, Head, Body, Container, Text, Hr } from "@react-email/components";

export default function ContactNotificationEmail(props: {
  name: string; email: string; phone?: string; service?: string; message: string; language?: "ar"|"en";
}) {
  const { name, email, phone, service, message, language } = props;
  return (
    <Html lang={language || "ar"}>
      <Head />
      <Body style={{ backgroundColor: "#ffffff", fontFamily: "Arial, sans-serif" }}>
        <Container style={{ padding: "24px", maxWidth: "640px" }}>
          <Text style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>
            رسالة جديدة من نموذج التواصل
          </Text>
          <Hr />
          <Text><b>الاسم:</b> {name}</Text>
          <Text><b>الإيميل:</b> {email}</Text>
          {phone ? <Text><b>الهاتف:</b> {phone}</Text> : null}
          {service ? <Text><b>الخدمة المطلوبة:</b> {service}</Text> : null}
          <Text style={{ marginTop: 16 }}><b>الرسالة:</b></Text>
          <Text style={{ whiteSpace: "pre-wrap", lineHeight: 1.6 }}>{message}</Text>
          <Hr />
          <Text style={{ color: "#666", fontSize: 12 }}>تم الإرسال من موقع عين المستثمر</Text>
        </Container>
      </Body>
    </Html>
  );
}
