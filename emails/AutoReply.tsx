import * as React from "react";
import { Html, Head, Body, Container, Text } from "@react-email/components";

export default function AutoReplyEmail(props: { name: string; language?: "ar"|"en" }) {
  const { name, language = "ar" } = props;
  const isAr = language === "ar";
  return (
    <Html lang={language}>
      <Head />
      <Body style={{ backgroundColor: "#ffffff", fontFamily: "Arial, sans-serif" }}>
        <Container style={{ padding: "24px", maxWidth: "640px" }}>
          <Text style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>
            {isAr ? "تم استلام رسالتك ✅" : "We received your message ✅"}
          </Text>
          <Text>
            {isAr
              ? `شكرًا ${name} على تواصلك مع عين المستثمر. وصلتنا رسالتك وسنردّ عليك خلال أقرب وقت.`
              : `Thanks ${name} for contacting Investors Eye. We've received your message and will reply soon.`}
          </Text>
          <Text>
            {isAr
              ? "إذا كانت المسألة مستعجلة، يُرجى الاتصال بنا عبر الهاتف الموجود في صفحة التواصل."
              : "If it's urgent, please call the phone number listed on our contact page."}
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
