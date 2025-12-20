import type { NextApiRequest, NextApiResponse } from "next";

type ContactPayload = {
  fullName: string;
  email: string;
  phone?: string;
  country?: string;
  program?: string;
  message: string;
  company?: string; // honeypot
  locale?: "tr" | "en" | "de";
};

type ContactResponse = { ok: true } | { ok: false; error: string };

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;
const rateLimitBuckets = new Map<string, number[]>();

function getClientIp(req: NextApiRequest) {
  const forwardedFor = req.headers["x-forwarded-for"];
  if (typeof forwardedFor === "string" && forwardedFor.trim()) {
    return forwardedFor.split(",")[0]?.trim() ?? "unknown";
  }
  return req.socket.remoteAddress ?? "unknown";
}

function clampString(value: unknown, max = 5000) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function rateLimit(ip: string) {
  const now = Date.now();
  const bucket = rateLimitBuckets.get(ip) ?? [];
  const fresh = bucket.filter((ts) => now - ts < RATE_LIMIT_WINDOW_MS);
  if (fresh.length >= RATE_LIMIT_MAX) return false;
  fresh.push(now);
  rateLimitBuckets.set(ip, fresh);
  return true;
}

function pickLocale(value: unknown): "tr" | "en" | "de" {
  if (value === "en" || value === "de" || value === "tr") return value;
  return "tr";
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ContactResponse>,
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const ip = getClientIp(req);
  if (!rateLimit(ip)) {
    return res.status(429).json({
      ok: false,
      error: "Çok hızlı istek gönderildi. Lütfen biraz sonra tekrar deneyin.",
    });
  }

  const body = (req.body ?? {}) as Partial<ContactPayload>;
  const locale = pickLocale(body.locale);

  const messages =
    locale === "en"
      ? {
          rateLimit: "Too many requests. Please try again shortly.",
          nameRequired: "Full name is required.",
          emailInvalid: "Please enter a valid email address.",
          messageShort: "Message must be at least 10 characters.",
          notConfigured:
            "Email service is not configured. Please add RESEND_API_KEY to Vercel environment variables.",
          sendFailed: "Email could not be sent.",
          serviceDown: "Could not reach email service. Please try again.",
        }
      : locale === "de"
        ? {
            rateLimit: "Zu viele Anfragen. Bitte versuche es später erneut.",
            nameRequired: "Name ist erforderlich.",
            emailInvalid: "Bitte gib eine gültige E-Mail-Adresse ein.",
            messageShort: "Die Nachricht muss mindestens 10 Zeichen haben.",
            notConfigured:
              "E-Mail-Dienst ist nicht konfiguriert. Bitte RESEND_API_KEY in Vercel Environment Variables setzen.",
            sendFailed: "E-Mail konnte nicht gesendet werden.",
            serviceDown: "E-Mail-Dienst nicht erreichbar. Bitte erneut versuchen.",
          }
        : {
            rateLimit:
              "Çok hızlı istek gönderildi. Lütfen biraz sonra tekrar deneyin.",
            nameRequired: "Ad Soyad gerekli.",
            emailInvalid: "Geçerli bir e-posta girin.",
            messageShort: "Mesaj en az 10 karakter olmalı.",
            notConfigured:
              "E-posta servisi yapılandırılmadı. Vercel ortam değişkenlerine RESEND_API_KEY ekleyin.",
            sendFailed: "E-posta gönderilemedi.",
            serviceDown: "E-posta servisine bağlanılamadı. Lütfen tekrar deneyin.",
          };

  const payload: ContactPayload = {
    fullName: clampString(body.fullName, 120),
    email: clampString(body.email, 180),
    phone: clampString(body.phone, 80),
    country: clampString(body.country, 80),
    program: clampString(body.program, 120),
    message: clampString(body.message, 4000),
    company: clampString(body.company, 120),
    locale,
  };

  if (payload.company) {
    return res.status(200).json({ ok: true });
  }

  if (!payload.fullName || payload.fullName.length < 2) {
    return res.status(400).json({ ok: false, error: messages.nameRequired });
  }

  if (!payload.email || !isValidEmail(payload.email)) {
    return res.status(400).json({ ok: false, error: messages.emailInvalid });
  }

  if (!payload.message || payload.message.length < 10) {
    return res.status(400).json({ ok: false, error: messages.messageShort });
  }

  const toEmail = process.env.CONTACT_TO_EMAIL ?? "info@lotusabroad.net";
  const fromEmail =
    process.env.CONTACT_FROM_EMAIL ?? "Lotus Abroad <onboarding@resend.dev>";
  const resendApiKey = process.env.RESEND_API_KEY ?? "";

  if (!resendApiKey) {
    return res.status(500).json({ ok: false, error: messages.notConfigured });
  }

  const subject =
    locale === "en"
      ? `New Contact Form: ${payload.fullName}`
      : locale === "de"
        ? `Neues Kontaktformular: ${payload.fullName}`
        : `Yeni İletişim Formu: ${payload.fullName}`;

  const text =
    locale === "en"
      ? [
          "New contact form submission",
          "",
          `Full Name: ${payload.fullName}`,
          `Email: ${payload.email}`,
          payload.phone ? `Phone: ${payload.phone}` : null,
          payload.country ? `Country: ${payload.country}` : null,
          payload.program ? `Program: ${payload.program}` : null,
          "",
          "Message:",
          payload.message,
          "",
          `IP: ${ip}`,
        ]
          .filter(Boolean)
          .join("\n")
      : locale === "de"
        ? [
            "Neue Kontaktformular-Einsendung",
            "",
            `Name: ${payload.fullName}`,
            `E-Mail: ${payload.email}`,
            payload.phone ? `Telefon: ${payload.phone}` : null,
            payload.country ? `Land: ${payload.country}` : null,
            payload.program ? `Programm: ${payload.program}` : null,
            "",
            "Nachricht:",
            payload.message,
            "",
            `IP: ${ip}`,
          ]
            .filter(Boolean)
            .join("\n")
        : [
            "Yeni iletişim formu gönderimi",
            "",
            `Ad Soyad: ${payload.fullName}`,
            `E-posta: ${payload.email}`,
            payload.phone ? `Telefon: ${payload.phone}` : null,
            payload.country ? `Ülke: ${payload.country}` : null,
            payload.program ? `Program: ${payload.program}` : null,
            "",
            "Mesaj:",
            payload.message,
            "",
            `IP: ${ip}`,
          ]
            .filter(Boolean)
            .join("\n");

  try {
    const resp = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        subject,
        reply_to: payload.email,
        text,
      }),
    });

    if (!resp.ok) {
      const errorText = await resp.text().catch(() => "");
      return res.status(502).json({
        ok: false,
        error: `${messages.sendFailed} (${resp.status}) ${errorText}`.trim(),
      });
    }

    return res.status(200).json({ ok: true });
  } catch {
    return res.status(502).json({ ok: false, error: messages.serviceDown });
  }
}

