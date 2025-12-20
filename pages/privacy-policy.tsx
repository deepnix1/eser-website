import React from "react";

import { useRouter } from "next/router";

import LegalPageLayout from "../components/LegalPageLayout";
import { normalizeLocale } from "../lib/i18n";

const COPY = {
  tr: {
    title: "Gizlilik Politikası",
    subtitle:
      "Bu Gizlilik Politikası, Lotus Abroad web sitesi ve hizmetlerini kullanırken kişisel verilerin nasıl toplandığını, kullanıldığını ve korunduğunu açıklar.",
    lastUpdated: "20 Aralık 2025",
    sections: {
      collect: {
        title: "1) Topladığımız Veriler",
        intro:
          "Sizden doğrudan aldığımız bilgiler ve siteyi çalıştırmak için gereken sınırlı teknik veriler toplanabilir.",
        provideTitle: "Sizin sağladığınız bilgiler",
        provideItems: [
          "İletişim bilgileri (ad, e-posta, telefon/WhatsApp)",
          "Mesaj içeriği ve görüşme/uygunluk detayları",
          "Gönüllü paylaştığınız eğitim ve kariyer bilgileri",
        ],
        technicalTitle: "Teknik ve kullanım verileri",
        technicalItems: [
          "Cihaz ve tarayıcı bilgileri",
          "Yaklaşık konum (ülke/bölge düzeyi)",
          "Ziyaret edilen sayfalar ve temel etkileşimler (basit analiz)",
        ],
      },
      use: {
        title: "2) Verilerinizi Nasıl Kullanırız?",
        items: [
          {
            title: "Danışmanlık ve hizmet sunumu",
            body: "Taleplerinize yanıt vermek, uygunluğu değerlendirmek ve seçtiğiniz programa yönelik yol haritası sunmak için.",
          },
          {
            title: "İletişim",
            body: "Randevu, evrak ihtiyaçları ve talebinizle ilgili takipler için sizinle iletişime geçmek amacıyla.",
          },
          {
            title: "Site güvenliği ve işletimi",
            body: "Web sitesini stabil tutmak, kötüye kullanımı önlemek ve performans/UX iyileştirmek için.",
          },
        ],
      },
      calendly: {
        title: "3) Calendly ile Randevu",
        body:
          "Takvim üzerinden randevu aldığınızda, Calendly randevu bilgilerinizi işleyebilir ve hizmetin bir parçası olarak çerez/izleyici kullanabilir. Randevu verileriniz Calendly’nin kendi politikalarına tabidir.",
      },
      sharing: {
        title: "4) Paylaşım ve Hizmet Sağlayıcılar",
        body:
          "Kişisel verilerinizi satmayız. Sadece web sitesini işletmek ve hizmeti sunmak için gerekli olduğunda güvenilir sağlayıcılarla (ör. randevu, e-posta gönderimi, barındırma) paylaşabiliriz.",
      },
      retention: {
        title: "5) Saklama Süresi",
        body:
          "Kişisel verileri, bu politikada belirtilen amaçlar için gerekli olduğu sürece saklarız; yasal yükümlülükler ve anlaşmaların uygulanması gibi durumlarda daha uzun süre gerekebilir.",
      },
      rights: {
        title: "6) Haklarınız",
        body:
          "Bulunduğunuz ülkeye göre kişisel verilerinize erişme, düzeltme, silme veya işlemeye itiraz etme haklarınız olabilir. Taleplerinizi iletişim kanallarımız üzerinden iletebilirsiniz.",
      },
    },
  },
  en: {
    title: "Privacy Policy",
    subtitle:
      "This Privacy Policy explains how Lotus Abroad collects, uses, and protects personal data when you use our website and services.",
    lastUpdated: "December 20, 2025",
    sections: {
      collect: {
        title: "1) What We Collect",
        intro:
          "We collect information you provide, plus limited technical data needed to operate the site.",
        provideTitle: "Information you provide",
        provideItems: [
          "Contact details (name, email, phone/WhatsApp)",
          "Message content and consultation/eligibility details",
          "Education/career information you share voluntarily",
        ],
        technicalTitle: "Technical and usage data",
        technicalItems: [
          "Device and browser information",
          "Approximate location (country/region level)",
          "Pages visited and interactions (basic analytics)",
        ],
      },
      use: {
        title: "2) How We Use Your Data",
        items: [
          {
            title: "Provide consultations and services",
            body: "To respond to your requests, assess eligibility, and provide guidance for your chosen route.",
          },
          {
            title: "Communications",
            body: "To contact you about your request, scheduling, document needs, and follow-ups you opt into.",
          },
          {
            title: "Site operations and security",
            body: "To keep the website stable, prevent abuse, and improve performance and UX.",
          },
        ],
      },
      calendly: {
        title: "3) Calendly Scheduling",
        body:
          "When you book via our embedded Calendly widget, Calendly may process scheduling details and use cookies/trackers as part of their service. Booking data is handled under Calendly’s policies.",
      },
      sharing: {
        title: "4) Sharing and Service Providers",
        body:
          "We do not sell your personal data. We may share information with trusted providers only when necessary to operate the site and deliver the service (e.g., scheduling, email delivery, hosting).",
      },
      retention: {
        title: "5) Data Retention",
        body:
          "We retain personal data only as long as needed for the purposes described in this policy, including legal obligations and enforcement of agreements.",
      },
      rights: {
        title: "6) Your Rights",
        body:
          "Depending on your location, you may have rights to access, correct, delete, or object to processing of your personal data. You can reach us via our contact channels to make a request.",
      },
    },
  },
  de: {
    title: "Datenschutzerklärung",
    subtitle:
      "Diese Datenschutzerklärung beschreibt, wie Lotus Abroad personenbezogene Daten erhebt, nutzt und schützt, wenn Sie unsere Website und Services verwenden.",
    lastUpdated: "20. Dezember 2025",
    sections: {
      collect: {
        title: "1) Welche Daten wir erheben",
        intro:
          "Wir erheben Daten, die Sie bereitstellen, sowie begrenzte technische Daten, die für den Betrieb der Website erforderlich sind.",
        provideTitle: "Von Ihnen bereitgestellte Daten",
        provideItems: [
          "Kontaktdaten (Name, E-Mail, Telefon/WhatsApp)",
          "Nachrichteninhalt und Beratungs-/Eignungsdetails",
          "Freiwillig geteilte Bildungs- und Karrieredaten",
        ],
        technicalTitle: "Technische und Nutzungsdaten",
        technicalItems: [
          "Geräte- und Browserinformationen",
          "Ungefähre Standortdaten (Land/Region)",
          "Besuchte Seiten und Interaktionen (Basis-Analytics)",
        ],
      },
      use: {
        title: "2) Wie wir Ihre Daten nutzen",
        items: [
          {
            title: "Beratung und Servicebereitstellung",
            body: "Zur Beantwortung Ihrer Anfrage, Eignungsprüfung und Erstellung einer passenden Roadmap.",
          },
          {
            title: "Kommunikation",
            body: "Für Rückfragen, Terminierung, Unterlagenbedarf und Opt-in-Follow-ups.",
          },
          {
            title: "Betrieb und Sicherheit",
            body: "Um die Website stabil zu halten, Missbrauch zu verhindern und Performance/UX zu verbessern.",
          },
        ],
      },
      calendly: {
        title: "3) Terminplanung mit Calendly",
        body:
          "Wenn Sie über das eingebettete Calendly-Widget buchen, kann Calendly Terminierungsdaten verarbeiten und Cookies/Tracker einsetzen. Buchungsdaten unterliegen den Richtlinien von Calendly.",
      },
      sharing: {
        title: "4) Weitergabe und Dienstleister",
        body:
          "Wir verkaufen keine personenbezogenen Daten. Eine Weitergabe erfolgt nur an vertrauenswürdige Dienstleister, wenn dies für Betrieb/Service nötig ist (z. B. Terminierung, E-Mail-Versand, Hosting).",
      },
      retention: {
        title: "5) Speicherdauer",
        body:
          "Wir speichern personenbezogene Daten nur so lange, wie es für die in dieser Erklärung genannten Zwecke erforderlich ist, inkl. rechtlicher Pflichten und Durchsetzung von Vereinbarungen.",
      },
      rights: {
        title: "6) Ihre Rechte",
        body:
          "Je nach Standort haben Sie ggf. Rechte auf Auskunft, Berichtigung, Löschung oder Widerspruch. Für Anfragen nutzen Sie bitte unsere Kontaktkanäle.",
      },
    },
  },
} as const;

export default function PrivacyPolicyPage() {
  const router = useRouter();
  const locale = normalizeLocale(router.locale);
  const copy = COPY[locale];

  return (
    <LegalPageLayout
      title={copy.title}
      subtitle={copy.subtitle}
      lastUpdated={copy.lastUpdated}
    >
      <div className="space-y-8">
        <section>
          <h2 className="text-xl md:text-2xl font-black text-text-main dark:text-white">
            {copy.sections.collect.title}
          </h2>
          <p className="mt-3 text-sm text-text-muted dark:text-gray-400 leading-relaxed">
            {copy.sections.collect.intro}
          </p>
          <div className="mt-4 grid md:grid-cols-2 gap-4">
            <div className="rounded-3xl border border-gray-100 dark:border-white/10 bg-white dark:bg-white/5 p-5">
              <div className="text-sm font-black text-text-main dark:text-white">
                {copy.sections.collect.provideTitle}
              </div>
              <ul className="mt-3 space-y-2 text-sm text-text-muted dark:text-gray-400">
                {copy.sections.collect.provideItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border border-gray-100 dark:border-white/10 bg-white dark:bg-white/5 p-5">
              <div className="text-sm font-black text-text-main dark:text-white">
                {copy.sections.collect.technicalTitle}
              </div>
              <ul className="mt-3 space-y-2 text-sm text-text-muted dark:text-gray-400">
                {copy.sections.collect.technicalItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl md:text-2xl font-black text-text-main dark:text-white">
            {copy.sections.use.title}
          </h2>
          <div className="mt-4 grid gap-4">
            {copy.sections.use.items.map((item) => (
              <div
                className="rounded-3xl border border-gray-100 dark:border-white/10 bg-white dark:bg-white/5 p-5"
                key={item.title}
              >
                <div className="text-sm font-black text-text-main dark:text-white">
                  {item.title}
                </div>
                <p className="mt-2 text-sm text-text-muted dark:text-gray-400 leading-relaxed">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl md:text-2xl font-black text-text-main dark:text-white">
            {copy.sections.calendly.title}
          </h2>
          <p className="mt-3 text-sm text-text-muted dark:text-gray-400 leading-relaxed">
            {copy.sections.calendly.body}
          </p>
        </section>

        <section>
          <h2 className="text-xl md:text-2xl font-black text-text-main dark:text-white">
            {copy.sections.sharing.title}
          </h2>
          <p className="mt-3 text-sm text-text-muted dark:text-gray-400 leading-relaxed">
            {copy.sections.sharing.body}
          </p>
        </section>

        <section>
          <h2 className="text-xl md:text-2xl font-black text-text-main dark:text-white">
            {copy.sections.retention.title}
          </h2>
          <p className="mt-3 text-sm text-text-muted dark:text-gray-400 leading-relaxed">
            {copy.sections.retention.body}
          </p>
        </section>

        <section>
          <h2 className="text-xl md:text-2xl font-black text-text-main dark:text-white">
            {copy.sections.rights.title}
          </h2>
          <p className="mt-3 text-sm text-text-muted dark:text-gray-400 leading-relaxed">
            {copy.sections.rights.body}
          </p>
        </section>
      </div>
    </LegalPageLayout>
  );
}

