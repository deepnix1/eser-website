import React from "react";

import { useRouter } from "next/router";

import LegalPageLayout from "../components/LegalPageLayout";
import { normalizeLocale } from "../lib/i18n";

const COPY = {
  tr: {
    title: "Çerez Politikası",
    subtitle:
      "Bu Çerez Politikası, çerezlerin ne olduğunu, nasıl kullanıldığını ve nasıl kontrol edebileceğinizi açıklar.",
    lastUpdated: "20 Aralık 2025",
    sections: {
      what: {
        title: "1) Çerez Nedir?",
        body:
          "Çerezler, bir web sitesi tarafından cihazınıza kaydedilen küçük dosyalardır. Tercihleri hatırlamak, performansı iyileştirmek ve bazı işlevleri sağlamak için kullanılır.",
      },
      types: {
        title: "2) Kullanabileceğimiz Çerez Türleri",
        items: [
          {
            title: "Zorunlu çerezler",
            body:
              "Siteyi çalıştırmak ve güvenlik/temel gezinme gibi çekirdek özellikleri sağlamak için gereklidir.",
          },
          {
            title: "Tercih çerezleri",
            body:
              "Tema (açık/koyu) gibi tercihleri ve benzer ayarları hatırlamak için kullanılabilir.",
          },
          {
            title: "Analitik (opsiyonel)",
            body:
              "Ziyaretçilerin siteyi nasıl kullandığını anlamamıza yardımcı olarak içerik ve performansı iyileştirebilir.",
          },
          {
            title: "Üçüncü taraf widget’lar",
            body:
              "Randevu widget’ları (ör. Calendly) hizmet sunmak ve kötüye kullanımı önlemek için çerez ayarlayabilir.",
          },
        ],
      },
      manage: {
        title: "3) Çerezleri Yönetme",
        body:
          "Çerezleri tarayıcı ayarlarından yönetebilirsiniz (engelleme, silme veya kısıtlama). Bazı çerezleri devre dışı bırakmak site işlevselliğini etkileyebilir.",
      },
      updates: {
        title: "4) Politika Güncellemeleri",
        body:
          "Site geliştikçe bu politikayı güncelleyebiliriz. Güncellemeler bu sayfada yayımlanır ve “Son güncelleme” tarihi revize edilir.",
      },
    },
  },
  en: {
    title: "Cookie Policy",
    subtitle:
      "This Cookie Policy explains what cookies are, how we use them, and how you can control them.",
    lastUpdated: "December 20, 2025",
    sections: {
      what: {
        title: "1) What Are Cookies?",
        body:
          "Cookies are small files stored on your device by a website. They help the site remember preferences, improve performance, and enable certain functionality.",
      },
      types: {
        title: "2) Cookies We May Use",
        items: [
          {
            title: "Strictly necessary",
            body:
              "Required to operate the website and provide core features such as security and basic navigation.",
          },
          {
            title: "Preferences",
            body:
              "Used to remember choices such as theme settings (light/dark) and similar preferences.",
          },
          {
            title: "Analytics (optional)",
            body:
              "May help us understand how visitors use the site so we can improve clarity and performance.",
          },
          {
            title: "Third-party widgets",
            body:
              "Scheduling widgets (e.g., Calendly) may set cookies to provide their service and prevent abuse.",
          },
        ],
      },
      manage: {
        title: "3) Managing Cookies",
        body:
          "You can control cookies through your browser settings (block, delete, or limit cookies). Note that disabling certain cookies may affect website functionality.",
      },
      updates: {
        title: "4) Updates to This Cookie Policy",
        body:
          "We may update this policy as our site evolves. Updates will be posted on this page with a revised “Last updated” date.",
      },
    },
  },
  de: {
    title: "Cookie-Richtlinie",
    subtitle:
      "Diese Cookie-Richtlinie erklärt, was Cookies sind, wie wir sie verwenden und wie Sie sie kontrollieren können.",
    lastUpdated: "20. Dezember 2025",
    sections: {
      what: {
        title: "1) Was sind Cookies?",
        body:
          "Cookies sind kleine Dateien, die eine Website auf Ihrem Gerät speichert. Sie helfen, Einstellungen zu merken, Performance zu verbessern und bestimmte Funktionen bereitzustellen.",
      },
      types: {
        title: "2) Cookies, die wir verwenden können",
        items: [
          {
            title: "Unbedingt erforderlich",
            body:
              "Notwendig für den Betrieb der Website sowie Kernfunktionen wie Sicherheit und grundlegende Navigation.",
          },
          {
            title: "Einstellungen",
            body:
              "Zum Speichern von Präferenzen wie Theme (Hell/Dunkel) und ähnlichen Einstellungen.",
          },
          {
            title: "Analyse (optional)",
            body:
              "Kann helfen zu verstehen, wie Besucher die Website nutzen, um Klarheit und Performance zu verbessern.",
          },
          {
            title: "Drittanbieter-Widgets",
            body:
              "Termin-Widgets (z. B. Calendly) können Cookies setzen, um den Service bereitzustellen und Missbrauch zu verhindern.",
          },
        ],
      },
      manage: {
        title: "3) Cookies verwalten",
        body:
          "Sie können Cookies über Browser-Einstellungen kontrollieren (blockieren, löschen, einschränken). Das Deaktivieren bestimmter Cookies kann die Funktion der Website beeinträchtigen.",
      },
      updates: {
        title: "4) Updates dieser Richtlinie",
        body:
          "Wir können diese Richtlinie aktualisieren, wenn sich die Website weiterentwickelt. Updates werden auf dieser Seite mit einem aktualisierten Datum veröffentlicht.",
      },
    },
  },
} as const;

export default function CookiePolicyPage() {
  const router = useRouter();
  const locale = normalizeLocale(router.locale);
  const copy = COPY[locale];

  return (
    <LegalPageLayout title={copy.title} subtitle={copy.subtitle} lastUpdated={copy.lastUpdated}>
      <div className="space-y-8">
        <section>
          <h2 className="text-xl md:text-2xl font-black text-text-main dark:text-white">
            {copy.sections.what.title}
          </h2>
          <p className="mt-3 text-sm text-text-muted dark:text-gray-400 leading-relaxed">
            {copy.sections.what.body}
          </p>
        </section>

        <section>
          <h2 className="text-xl md:text-2xl font-black text-text-main dark:text-white">
            {copy.sections.types.title}
          </h2>
          <div className="mt-4 grid md:grid-cols-2 gap-4">
            {copy.sections.types.items.map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-gray-100 dark:border-white/10 bg-white dark:bg-white/5 p-5"
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
            {copy.sections.manage.title}
          </h2>
          <p className="mt-3 text-sm text-text-muted dark:text-gray-400 leading-relaxed">
            {copy.sections.manage.body}
          </p>
        </section>

        <section>
          <h2 className="text-xl md:text-2xl font-black text-text-main dark:text-white">
            {copy.sections.updates.title}
          </h2>
          <p className="mt-3 text-sm text-text-muted dark:text-gray-400 leading-relaxed">
            {copy.sections.updates.body}
          </p>
        </section>
      </div>
    </LegalPageLayout>
  );
}

