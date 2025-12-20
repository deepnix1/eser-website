# Lotus Abroad Website

Next.js (Pages Router) website for Lotus Abroad.

## Local Development

- Install: `npm install`
- Run: `npm run dev` (defaults to `http://localhost:3010`)

## Environment Variables

Create `.env.local` (not committed) based on `.env.example`.

- `NEXT_PUBLIC_CALENDLY_EVENT_URL` — Calendly event link used by the global “Book Now / Ücretsiz Değerlendirme” modal.
- `NEXT_PUBLIC_SITE_URL` — Canonical site URL for SEO (example: `https://www.lotusabroad.net`).
- `RESEND_API_KEY` — Contact form mail delivery (server-side on Vercel).
- `CONTACT_TO_EMAIL` — Recipient email (defaults to `info@lotusabroad.net`).
- `CONTACT_FROM_EMAIL` — Sender identity (must be verified in Resend for production).

## Deploy (Vercel)

Vercel auto-detects Next.js.

- **Build command:** `npm run build`
- **Output:** Next.js default
- **Env vars:** add values from `.env.example` in Vercel Project Settings → Environment Variables

## SEO

- `GET /sitemap.xml` and `GET /robots.txt` are generated dynamically (Vercel-compatible).

