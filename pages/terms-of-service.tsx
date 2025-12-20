import React from "react";

import { useRouter } from "next/router";

import LegalPageLayout from "../components/LegalPageLayout";
import { normalizeLocale } from "../lib/i18n";

const COPY = {
  tr: {
    title: "Kullanım Koşulları",
    subtitle:
      "Bu koşullar, Lotus Abroad web sitesini ve danışmanlık hizmetlerini kullanımınızı düzenler.",
    lastUpdated: "20 Aralık 2025",
    sections: [
      {
        title: "1) Koşulların Kabulü",
        body:
          "Bu web sitesine erişerek veya kullanarak bu koşulları kabul etmiş olursunuz. Kabul etmiyorsanız lütfen siteyi kullanmayın.",
      },
      {
        title: "2) Hizmetlerimiz",
        body:
          "Lotus Abroad; yurtdışı eğitim danışmanlığı kapsamında program seçimi, evrak desteği ve genel vize süreç bilgilendirmesi sunar. Hukuki danışmanlık sağlamayız.",
      },
      {
        title: "3) Randevu ve Planlama",
        body:
          "Randevu planlaması Calendly üzerinden yapılabilir. Doğru bilgi sağlamak, zamanında katılmak ve gerekli durumlarda yeniden planlama yapmak sizin sorumluluğunuzdadır.",
      },
      {
        title: "4) Ücretler ve Ödemeler",
        body:
          "Bazı hizmetler ücretli olabilir. Ücret uygulanıyorsa, onaylamadan önce kapsam ve fiyatlandırma size iletilir. Üniversite/konsolosluk/kargo gibi üçüncü taraf ücretleri Lotus Abroad kontrolünde değildir ve sizin sorumluluğunuzdadır.",
      },
      {
        title: "5) Sorumluluklarınız",
        bullets: [
          "Eksiksiz ve doğru bilgi ve evrak sağlamak",
          "Gönderimden önce çıktıları/başvuruları kontrol edip onaylamak",
          "Paylaşılan takvim ve yönergelere uygun hareket etmek",
        ],
      },
      {
        title: "6) Sonuç Garantisi Yoktur",
        body:
          "Kabul ve vize kararları üniversite, işveren, konsolosluk ve ilgili otoriteler gibi üçüncü taraflar tarafından verilir. Kabul/onarım, süre veya sonuçlar için garanti veremeyiz.",
      },
      {
        title: "7) Fikri Mülkiyet",
        body:
          "Web sitesi içerikleri, tasarım ve marka unsurları Lotus Abroad’a aittir veya izinle kullanılır. İzinsiz kopyalama, çoğaltma veya dağıtım yapılamaz.",
      },
      {
        title: "8) Feragat ve Sorumluluğun Sınırlandırılması",
        body:
          "Web sitesi ve hizmetler “olduğu gibi” sunulur. Yasal olarak izin verilen azami ölçüde, dolaylı/sonuçsal zararlar veya bu sitedeki bilgilere dayanmanızdan kaynaklanan kayıplar için sorumluluk kabul etmeyiz.",
      },
      {
        title: "9) Koşullarda Değişiklik",
        body:
          "Bu koşulları zaman zaman güncelleyebiliriz. Güncellemeler bu sayfada yayımlanır ve “Son güncelleme” tarihi revize edilir.",
      },
    ],
  },
  en: {
    title: "Terms of Service",
    subtitle:
      "These Terms govern your use of the Lotus Abroad website and our consultation services.",
    lastUpdated: "December 20, 2025",
    sections: [
      {
        title: "1) Acceptance of Terms",
        body:
          "By accessing or using this website, you agree to these Terms. If you do not agree, please do not use the website.",
      },
      {
        title: "2) Our Services",
        body:
          "Lotus Abroad provides educational consulting for studying abroad, including program selection, document support, and general visa process guidance. We do not provide legal advice.",
      },
      {
        title: "3) Bookings & Appointments",
        body:
          "Scheduling may be provided through Calendly. You are responsible for providing accurate information, attending on time, and notifying us if you need to reschedule.",
      },
      {
        title: "4) Fees and Payments",
        body:
          "Some services may be paid. If a fee applies, we will communicate scope and pricing before you confirm. Third-party fees (universities, consulates, couriers) are not controlled by Lotus Abroad and are your responsibility.",
      },
      {
        title: "5) Your Responsibilities",
        bullets: [
          "Provide complete and accurate information and documents",
          "Review outputs and confirm details before submission",
          "Follow the timelines and instructions communicated to you",
        ],
      },
      {
        title: "6) No Guarantee of Outcomes",
        body:
          "Admissions and visa decisions are made by third parties (universities, employers, consulates, and authorities). We cannot guarantee acceptance, approvals, timelines, or outcomes.",
      },
      {
        title: "7) Intellectual Property",
        body:
          "Website content, design, and branding are owned by Lotus Abroad or used with permission. You may not copy, reproduce, or distribute materials without permission.",
      },
      {
        title: "8) Disclaimer and Limitation of Liability",
        body:
          "The website and services are provided “as is”. To the maximum extent permitted by law, Lotus Abroad is not liable for indirect or consequential damages or losses resulting from your reliance on this website.",
      },
      {
        title: "9) Changes to These Terms",
        body:
          "We may update these Terms from time to time. Updates will be posted on this page with a revised “Last updated” date.",
      },
    ],
  },
  de: {
    title: "Nutzungsbedingungen",
    subtitle:
      "Diese Bedingungen regeln die Nutzung der Lotus Abroad Website und unserer Beratungsleistungen.",
    lastUpdated: "20. Dezember 2025",
    sections: [
      {
        title: "1) Zustimmung zu den Bedingungen",
        body:
          "Durch Zugriff oder Nutzung dieser Website stimmen Sie diesen Bedingungen zu. Wenn Sie nicht zustimmen, nutzen Sie die Website bitte nicht.",
      },
      {
        title: "2) Unsere Leistungen",
        body:
          "Lotus Abroad bietet Bildungsberatung für Auslandsstudium: Programmauswahl, Unterstützung bei Unterlagen und allgemeine Orientierung im Visa-Prozess. Wir leisten keine Rechtsberatung.",
      },
      {
        title: "3) Buchungen & Termine",
        body:
          "Terminplanung kann über Calendly erfolgen. Sie sind verantwortlich für korrekte Angaben, pünktliche Teilnahme und rechtzeitige Umbuchung bei Bedarf.",
      },
      {
        title: "4) Gebühren und Zahlungen",
        body:
          "Einige Leistungen sind kostenpflichtig. Falls Gebühren anfallen, teilen wir Umfang und Preis vor Ihrer Bestätigung mit. Drittanbietergebühren (Unis, Konsulate, Kurierdienste) liegen nicht in unserer Kontrolle und sind Ihre Verantwortung.",
      },
      {
        title: "5) Ihre Pflichten",
        bullets: [
          "Vollständige und korrekte Informationen und Unterlagen bereitstellen",
          "Ergebnisse prüfen und Details vor Einreichung bestätigen",
          "Zeitpläne und Anweisungen einhalten",
        ],
      },
      {
        title: "6) Keine Ergebnisgarantie",
        body:
          "Zulassungs- und Visaentscheidungen treffen Dritte (Universitäten, Arbeitgeber, Konsulate, Behörden). Wir können keine Zusagen zu Zusage, Bearbeitungszeit oder Ergebnis machen.",
      },
      {
        title: "7) Geistiges Eigentum",
        body:
          "Inhalte, Design und Branding gehören Lotus Abroad oder werden mit Erlaubnis genutzt. Ohne Erlaubnis dürfen Materialien nicht kopiert, reproduziert oder verbreitet werden.",
      },
      {
        title: "8) Haftungsausschluss und Haftungsbegrenzung",
        body:
          "Website und Leistungen werden „wie besehen“ bereitgestellt. Soweit gesetzlich zulässig, haften wir nicht für indirekte oder Folgeschäden oder Verluste aus der Nutzung dieser Website.",
      },
      {
        title: "9) Änderungen der Bedingungen",
        body:
          "Wir können diese Bedingungen gelegentlich aktualisieren. Updates werden auf dieser Seite veröffentlicht und das Datum „Zuletzt aktualisiert“ angepasst.",
      },
    ],
  },
} as const;

export default function TermsOfServicePage() {
  const router = useRouter();
  const locale = normalizeLocale(router.locale);
  const copy = COPY[locale];

  return (
    <LegalPageLayout title={copy.title} subtitle={copy.subtitle} lastUpdated={copy.lastUpdated}>
      <div className="space-y-8">
        {copy.sections.map((section) => (
          <section key={section.title}>
            <h2 className="text-xl md:text-2xl font-black text-text-main dark:text-white">
              {section.title}
            </h2>
            {"body" in section ? (
              <p className="mt-3 text-sm text-text-muted dark:text-gray-400 leading-relaxed">
                {section.body}
              </p>
            ) : null}
            {"bullets" in section ? (
              <ul className="mt-4 space-y-2 text-sm text-text-muted dark:text-gray-400">
                {section.bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}
      </div>
    </LegalPageLayout>
  );
}

