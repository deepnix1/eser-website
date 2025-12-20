import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";

import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";

const OFFICE_ADDRESS =
  "MAHFESIĞMAZ MAHALLESİ\n79129 SK. AZİZ KAYA SİTESİ SİT. A BLOK APT. NO: 9 -1/01\nÇUKUROVA / ADANA";

const WHATSAPP_NUMBER_DISPLAY = "+90 530 212 69 22";
const WHATSAPP_NUMBER_E164 = "9053021266922";
const WHATSAPP_LINK_URL = `https://wa.me/${WHATSAPP_NUMBER_E164}?text=${encodeURIComponent(
  "Merhaba! Ücretsiz değerlendirme için bilgi almak istiyorum.",
)}`;

const EMAIL_ADDRESS = "info@lotusabroad.net";

const MAPS_EMBED_URL = `https://www.google.com/maps?q=${encodeURIComponent(
  OFFICE_ADDRESS,
)}&output=embed`;
const MAPS_LINK_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  OFFICE_ADDRESS,
)}`;

const COPY = {
  tr: {
    title: "İletişim | Lotus Abroad",
    description:
      "Lotus Abroad ile iletişime geçin: WhatsApp, e-posta veya form üzerinden ücretsiz değerlendirme talep edin.",
    heroTitle: "İletişim",
    heroSubtitle:
      "Hedef ülke ve programınızı paylaşın; 24 saat içinde profilinize uygun net bir yol haritası ile size dönüş yapalım.",
    badge: "Ücretsiz Değerlendirme",
    cardTitle: "Bize Ulaşın",
    cardSubtitle:
      "Hedefinizi ve zaman planınızı paylaşın. Ekibimiz, sizin için en uygun rotayı netleştirip gerekli evrak ve adımları iletir.",
    fullName: "Ad Soyad",
    fullNamePh: "Adınız Soyadınız",
    email: "E-posta",
    emailPh: "ornek@eposta.com",
    phone: "Telefon",
    phonePh: "+90 5xx xxx xx xx",
    country: "İlgilendiğiniz Ülke",
    program: "İlgilendiğiniz Program",
    programChoose: "Program Seçin",
    message: "Mesajınız",
    messagePh: "Hedefiniz, bütçeniz ve zaman planınız gibi detayları yazabilirsiniz.",
    send: "Mesaj Gönder",
    sending: "Gönderiliyor...",
    success: "Mesajınız alındı. 24 saat içinde size dönüş yapacağız.",
    averageResponse:
      "Ortalama dönüş süresi: 24 saat (yoğun dönemlerde değişebilir).",
    address: "Adres",
    hours: "Çalışma Saatleri",
    whatsapp: "WhatsApp",
    whatsappCta: "WhatsApp ile hemen ulaş",
    emailLabel: "E-posta",
    mapsOpen: "Google Maps'te Aç",
    book: "Ücretsiz Görüşme Planla",
  },
  en: {
    title: "Contact | Lotus Abroad",
    description:
      "Get in touch with Lotus Abroad via WhatsApp, email or the contact form.",
    heroTitle: "Contact",
    heroSubtitle:
      "Share your target country and program; we’ll get back within 24 hours with a clear roadmap tailored to your profile.",
    badge: "Free Assessment",
    cardTitle: "Get in Touch",
    cardSubtitle:
      "Tell us your goals and timeline. We’ll clarify the best route and share the required steps and documents.",
    fullName: "Full Name",
    fullNamePh: "Your name",
    email: "Email",
    emailPh: "you@example.com",
    phone: "Phone",
    phonePh: "+90 5xx xxx xx xx",
    country: "Interested Country",
    program: "Interested Program",
    programChoose: "Select a program",
    message: "Message",
    messagePh: "Share your goals, budget, and timeline.",
    send: "Send Message",
    sending: "Sending...",
    success: "We received your message. We’ll reply within 24 hours.",
    averageResponse: "Average response time: 24 hours (may vary).",
    address: "Address",
    hours: "Business Hours",
    whatsapp: "WhatsApp",
    whatsappCta: "Message on WhatsApp",
    emailLabel: "Email",
    mapsOpen: "Open in Google Maps",
    book: "Book a Free Consultation",
  },
  de: {
    title: "Kontakt | Lotus Abroad",
    description:
      "Kontaktieren Sie Lotus Abroad per WhatsApp, E-Mail oder über das Kontaktformular.",
    heroTitle: "Kontakt",
    heroSubtitle:
      "Teilen Sie Zielland und Programm – wir melden uns innerhalb von 24 Stunden mit einem klaren Fahrplan.",
    badge: "Kostenlose Einschätzung",
    cardTitle: "Kontakt aufnehmen",
    cardSubtitle:
      "Teilen Sie Ihre Ziele und Ihren Zeitplan. Wir klären die beste Route und senden die nötigen Schritte und Unterlagen.",
    fullName: "Name",
    fullNamePh: "Ihr Name",
    email: "E-Mail",
    emailPh: "name@beispiel.de",
    phone: "Telefon",
    phonePh: "+90 5xx xxx xx xx",
    country: "Interessiertes Land",
    program: "Interessiertes Programm",
    programChoose: "Programm wählen",
    message: "Nachricht",
    messagePh: "Ziele, Budget und Zeitplan kurz beschreiben.",
    send: "Nachricht senden",
    sending: "Wird gesendet...",
    success: "Nachricht erhalten. Wir melden uns innerhalb von 24 Stunden.",
    averageResponse: "Ø Antwortzeit: 24 Stunden (kann variieren).",
    address: "Adresse",
    hours: "Öffnungszeiten",
    whatsapp: "WhatsApp",
    whatsappCta: "Per WhatsApp schreiben",
    emailLabel: "E-Mail",
    mapsOpen: "In Google Maps öffnen",
    book: "Kostenlose Beratung buchen",
  },
} as const;

const COUNTRY_OPTIONS = {
  tr: [
    "Birleşik Krallık",
    "Almanya",
    "ABD",
    "Malta",
    "Hollanda",
    "İrlanda",
    "Kanada",
    "Diğer",
  ],
  en: [
    "United Kingdom",
    "Germany",
    "USA",
    "Malta",
    "Netherlands",
    "Ireland",
    "Canada",
    "Other",
  ],
  de: [
    "Vereinigtes Königreich",
    "Deutschland",
    "USA",
    "Malta",
    "Niederlande",
    "Irland",
    "Kanada",
    "Sonstiges",
  ],
} as const;

const PROGRAM_OPTIONS = {
  tr: [
    "Ausbildung",
    "Lisans",
    "Yüksek Lisans",
    "Doktora",
    "Dil Okulu",
    "Work and Travel",
    "Denklik",
    "Vize Danışmanlığı",
  ],
  en: [
    "Ausbildung (Vocational Training)",
    "Bachelor’s Degree",
    "Master’s Degree",
    "PhD",
    "Language School",
    "Work and Travel",
    "Degree Recognition",
    "Visa Consulting",
  ],
  de: [
    "Ausbildung",
    "Bachelor",
    "Master",
    "Promotion",
    "Sprachschule",
    "Work and Travel",
    "Anerkennung (Denklik)",
    "Visaberatung",
  ],
} as const;

function InfoRow({
  icon,
  title,
  value,
}: {
  icon: string;
  title: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="size-11 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center shrink-0">
        <span className="material-symbols-outlined text-[18px] text-text-main dark:text-white">
          {icon}
        </span>
      </div>
      <div className="pt-0.5">
        <div className="text-sm font-bold text-text-main dark:text-white">{title}</div>
        <div className="text-sm text-text-muted dark:text-gray-400">{value}</div>
      </div>
    </div>
  );
}

type Locale = keyof typeof COPY;

export default function ContactPage() {
  const router = useRouter();
  const locale = ((router.locale ?? "tr") as Locale) in COPY ? ((router.locale ?? "tr") as Locale) : "tr";
  const copy = COPY[locale];

  const countryOptions = useMemo(() => COUNTRY_OPTIONS[locale] ?? COUNTRY_OPTIONS.tr, [locale]);
  const programOptions = useMemo(() => PROGRAM_OPTIONS[locale] ?? PROGRAM_OPTIONS.tr, [locale]);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: countryOptions[0] ?? "",
    program: "",
    message: "",
    company: "",
  });

  useEffect(() => {
    setForm((prev) => {
      if (prev.country && countryOptions.includes(prev.country as any)) return prev;
      return { ...prev, country: countryOptions[0] ?? "" };
    });
  }, [countryOptions]);

  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const onFieldChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "sending") return;

    setStatus("sending");
    setStatusMessage(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, locale }),
      });
      const data = (await response.json().catch(() => null)) as
        | { ok: true }
        | { ok: false; error: string }
        | null;

      if (!response.ok || !data?.ok) {
        throw new Error(
          data && "error" in data ? data.error : "Mesaj gönderilemedi. Lütfen tekrar deneyin.",
        );
      }

      setStatus("success");
      setStatusMessage(copy.success);
      setForm((prev) => ({
        ...prev,
        fullName: "",
        email: "",
        phone: "",
        program: "",
        message: "",
        company: "",
      }));
    } catch (err) {
      setStatus("error");
      setStatusMessage(
        err instanceof Error ? err.message : "Bir hata oluştu. Lütfen tekrar deneyin.",
      );
    }
  };

  return (
    <>
      <Head>
        <title>{copy.title}</title>
        <meta name="description" content={copy.description} />
      </Head>

      <SiteHeader />

      <main className="pt-24">
        <section className="bg-gradient-to-b from-white via-background-light to-background-light dark:from-background-dark dark:via-background-dark dark:to-background-dark border-b border-gray-200/70 dark:border-white/10">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-text-main dark:text-white">
              {copy.heroTitle}
            </h1>
            <p className="mt-4 text-sm md:text-base text-text-muted dark:text-gray-400 max-w-2xl leading-relaxed">
              {copy.heroSubtitle}
            </p>
          </div>
        </section>

        <section className="bg-background-light dark:bg-background-dark">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
              <div className="rounded-[2rem] bg-white/80 dark:bg-white/5 shadow-[0_25px_60px_rgba(0,0,0,0.08)] ring-1 ring-black/5 dark:ring-white/10 backdrop-blur-sm p-8 md:p-10 h-full flex flex-col">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full bg-[#e9e8df] dark:bg-white/10 px-4 py-2 text-xs font-black text-text-main dark:text-white">
                      <span className="material-symbols-outlined text-[16px]">support_agent</span>
                      {copy.badge}
                    </div>
                    <h2 className="mt-4 text-3xl font-black text-text-main dark:text-white">
                      {copy.cardTitle}
                    </h2>
                    <p className="mt-2 text-sm text-text-muted dark:text-gray-400 max-w-lg leading-relaxed">
                      {copy.cardSubtitle}
                    </p>
                  </div>
                  <div className="hidden md:flex size-12 rounded-2xl bg-black text-white items-center justify-center shadow-[0_18px_40px_rgba(0,0,0,0.18)]">
                    <span className="material-symbols-outlined">chat</span>
                  </div>
                </div>

                <form className="mt-8 flex flex-col flex-1 gap-5" onSubmit={handleSubmit}>
                  <input
                    aria-hidden="true"
                    autoComplete="off"
                    className="hidden"
                    name="company"
                    tabIndex={-1}
                    value={form.company}
                    onChange={onFieldChange}
                  />

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-black text-text-main dark:text-white">
                        {copy.fullName}
                      </label>
                      <input
                        className="w-full h-11 px-4 rounded-full bg-white/70 dark:bg-white/5 border border-gray-200/80 dark:border-white/10 outline-none transition-all focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background-light dark:focus-visible:ring-offset-background-dark"
                        name="fullName"
                        placeholder={copy.fullNamePh}
                        required
                        type="text"
                        value={form.fullName}
                        onChange={onFieldChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-black text-text-main dark:text-white">
                        {copy.email}
                      </label>
                      <input
                        className="w-full h-11 px-4 rounded-full bg-white/70 dark:bg-white/5 border border-gray-200/80 dark:border-white/10 outline-none transition-all focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background-light dark:focus-visible:ring-offset-background-dark"
                        name="email"
                        placeholder={copy.emailPh}
                        required
                        type="email"
                        value={form.email}
                        onChange={onFieldChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-black text-text-main dark:text-white">
                      {copy.phone}
                    </label>
                    <input
                      className="w-full h-11 px-4 rounded-full bg-white/70 dark:bg-white/5 border border-gray-200/80 dark:border-white/10 outline-none transition-all focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background-light dark:focus-visible:ring-offset-background-dark"
                      name="phone"
                      placeholder={copy.phonePh}
                      type="tel"
                      value={form.phone}
                      onChange={onFieldChange}
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-black text-text-main dark:text-white">
                        {copy.country}
                      </label>
                      <div className="relative">
                        <select
                          className="w-full h-11 pl-4 pr-11 rounded-full bg-white/70 dark:bg-white/5 bg-none border border-gray-200/80 dark:border-white/10 outline-none transition-all focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background-light dark:focus-visible:ring-offset-background-dark appearance-none cursor-pointer"
                          name="country"
                          value={form.country}
                          onChange={onFieldChange}
                        >
                          {countryOptions.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400">
                          <span className="material-symbols-outlined">expand_more</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-black text-text-main dark:text-white">
                        {copy.program}
                      </label>
                      <div className="relative">
                        <select
                          className="w-full h-11 pl-4 pr-11 rounded-full bg-white/70 dark:bg-white/5 bg-none border border-gray-200/80 dark:border-white/10 outline-none transition-all focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background-light dark:focus-visible:ring-offset-background-dark appearance-none cursor-pointer"
                          name="program"
                          value={form.program}
                          onChange={onFieldChange}
                        >
                          <option value="">{copy.programChoose}</option>
                          {programOptions.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400">
                          <span className="material-symbols-outlined">expand_more</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 flex flex-col flex-1">
                    <label className="text-sm font-black text-text-main dark:text-white">
                      {copy.message}
                    </label>
                    <textarea
                      className="w-full flex-1 min-h-[140px] px-4 py-3 rounded-2xl bg-white/70 dark:bg-white/5 border border-gray-200/80 dark:border-white/10 outline-none transition-all focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background-light dark:focus-visible:ring-offset-background-dark resize-none"
                      name="message"
                      placeholder={copy.messagePh}
                      required
                      value={form.message}
                      onChange={onFieldChange}
                    />
                  </div>

                  <button
                    className={[
                      "w-full h-14 rounded-full bg-primary text-black font-black text-base transition-all shadow-[0_18px_40px_rgba(249,245,6,0.28)] mt-2",
                      status === "sending" ? "opacity-70 cursor-not-allowed" : "hover:brightness-105",
                    ].join(" ")}
                    disabled={status === "sending"}
                    type="submit"
                  >
                    {status === "sending" ? copy.sending : copy.send}
                  </button>

                  {statusMessage ? (
                    <div
                      className={[
                        "text-sm rounded-2xl px-4 py-3 border",
                        status === "error"
                          ? "bg-red-50 border-red-200 text-red-800 dark:bg-red-500/10 dark:border-red-500/20 dark:text-red-200"
                          : "bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-500/10 dark:border-emerald-500/20 dark:text-emerald-200",
                      ].join(" ")}
                      role={status === "error" ? "alert" : "status"}
                    >
                      {statusMessage}
                    </div>
                  ) : null}

                  <div className="text-xs text-text-muted dark:text-gray-400">
                    {copy.averageResponse}
                  </div>
                </form>
              </div>

              <div className="h-full flex flex-col gap-6">
                <div className="rounded-[2rem] bg-white/80 dark:bg-white/5 border border-gray-100 dark:border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.08)] backdrop-blur-sm p-7 md:p-8">
                  <div className="space-y-5">
                    <InfoRow
                      icon="location_on"
                      title={copy.address}
                      value={<span className="whitespace-pre-line">{OFFICE_ADDRESS}</span>}
                    />
                    <InfoRow
                      icon="chat"
                      title={copy.whatsapp}
                      value={
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                          <span className="font-medium text-text-main dark:text-white">
                            {WHATSAPP_NUMBER_DISPLAY}
                          </span>
                          <a
                            className="inline-flex items-center justify-center gap-2 h-9 px-4 rounded-full bg-primary text-black text-xs font-black tracking-wide hover:brightness-105 transition-all shadow-[0_10px_30px_rgba(249,245,6,0.22)]"
                            href={WHATSAPP_LINK_URL}
                            rel="noreferrer"
                            target="_blank"
                          >
                            <span className="material-symbols-outlined text-[16px]">chat</span>
                            {copy.whatsappCta}
                          </a>
                        </div>
                      }
                    />
                    <InfoRow
                      icon="mail"
                      title={copy.emailLabel}
                      value={
                        <a className="hover:text-primary transition-colors" href={`mailto:${EMAIL_ADDRESS}`}>
                          {EMAIL_ADDRESS}
                        </a>
                      }
                    />
                    <InfoRow icon="schedule" title={copy.hours} value="Pzt-Cum: 09:00-18:00" />
                  </div>
                </div>

                <div className="rounded-[2rem] overflow-hidden bg-white/80 dark:bg-white/5 border border-gray-100 dark:border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.08)] flex flex-col flex-1 min-h-[360px]">
                  <div className="w-full flex-1 bg-gray-100 dark:bg-white/10">
                    <iframe
                      aria-label="Google Maps"
                      className="w-full h-full"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      src={MAPS_EMBED_URL}
                      title="Google Maps"
                    />
                  </div>
                  <a
                    className="flex items-center justify-center gap-2 px-6 py-4 text-sm font-bold text-text-main dark:text-white border-t border-gray-100 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/10 transition-colors"
                    href={MAPS_LINK_URL}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <span className="material-symbols-outlined text-[18px]">open_in_new</span>
                    {copy.mapsOpen}
                  </a>
                </div>

                <button
                  className="w-full h-16 rounded-full bg-primary text-black font-black text-lg hover:brightness-105 transition-all shadow-[0_18px_40px_rgba(249,245,6,0.28)] mt-auto"
                  aria-haspopup="dialog"
                  data-calendly-open="true"
                  type="button"
                >
                  {copy.book}
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}

