import type { NextApiRequest, NextApiResponse } from "next";

type ContactPayload = {
  fullName: string;
  email: string;
  phone?: string;
  country?: string;
  program?: string;
  message: string;
  company?: string; // honeypot
};

type ContactResponse =
  | { ok: true }
  | { ok: false; error: string };

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

  const payload: ContactPayload = {
    fullName: clampString(body.fullName, 120),
    email: clampString(body.email, 180),
    phone: clampString(body.phone, 80),
    country: clampString(body.country, 80),
    program: clampString(body.program, 120),
    message: clampString(body.message, 4000),
    company: clampString(body.company, 120),
  };

  if (payload.company) {
    return res.status(200).json({ ok: true });
  }

  if (!payload.fullName || payload.fullName.length < 2) {
    return res.status(400).json({ ok: false, error: "Ad Soyad gerekli." });
  }

  if (!payload.email || !isValidEmail(payload.email)) {
    return res.status(400).json({ ok: false, error: "Geçerli bir e-posta girin." });
  }

  if (!payload.message || payload.message.length < 10) {
    return res.status(400).json({ ok: false, error: "Mesaj en az 10 karakter olmalı." });
  }

  const toEmail = process.env.CONTACT_TO_EMAIL ?? "info@lotusabroad.net";
  const fromEmail =
    process.env.CONTACT_FROM_EMAIL ?? "Lotus Abroad <onboarding@resend.dev>";
  const resendApiKey = process.env.RESEND_API_KEY ?? "";

  if (!resendApiKey) {
    return res.status(500).json({
      ok: false,
      error:
        "E-posta servisi yapılandırılmadı. Vercel ortam değişkenlerine RESEND_API_KEY ekleyin.",
    });
  }

  const subject = `Yeni İletişim Formu: ${payload.fullName}`;
  const text = [
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
        error: `E-posta gönderilemedi. (${resp.status}) ${errorText}`.trim(),
      });
    }

    return res.status(200).json({ ok: true });
  } catch {
    return res.status(502).json({
      ok: false,
      error: "E-posta servisine bağlanılamadı. Lütfen tekrar deneyin.",
    });
  }
}

