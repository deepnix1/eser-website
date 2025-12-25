import type { AppLocale } from "../../lib/i18n";

type BadgeLabels = Record<"Shared" | "Popular" | "New", string>;

export const PROGRAMS_UI: Record<
  AppLocale,
  {
    pageTitle: string;
    pageDescription: string;
    pillLabel: string;
    countriesTitle: string;
    countriesHint: string;
    activeLabel: string;
    heroPill: string;
    heroTitle: (countryLabel: string) => string;
    heroDescriptionWithProgram: string;
    heroDescriptionEmpty: string;
    listTitle: string;
    listHint: string;
    listAria: string;
    listEmptyTitle: string;
    listEmptyBody: string;
    detailsLink: string;
    detailsEmptyTitle: string;
    detailsEmptyBody: string;
    section: {
      overview: string;
      whoFor: string;
      advantages: string;
      duration: string;
      workRights: string;
      steps: string;
      docs: string;
      fees: string;
    };
    badges: BadgeLabels;
    workRightsFallback: string;
    eligibilityTitle: (countryLabel: string, programShortTitle: string) => string;
    eligibilityBody: string;
    eligibilityCta: string;
    citySchool: {
      title: string;
      description: (countryLabel: string) => string;
      badge: string;
      cardTitle: string;
      footerNote: string;
    };
    seoHiddenTitle: string;
  }
> = {
  tr: {
    pageTitle: "Programlar",
    pageDescription:
      "Ülke seçin, program rotalarını keşfedin ve detayları anında aynı ekranda görüntüleyin.",
    pillLabel: "Ülkeye Göre Programlar",
    countriesTitle: "Ülkeler",
    countriesHint: "Seçmek için tıkla",
    activeLabel: "Aktif",
    heroPill: "Ülkeye Göre Programlar",
    heroTitle: (countryLabel) => `${countryLabel}: Programlar & Fırsatlar`,
    heroDescriptionWithProgram:
      "Bir program seçerek uygunluk, süre, gerekli belgeler ve vize notlarını düzenli bir formatta görüntüleyin.",
    heroDescriptionEmpty:
      "Mevcut program rotalarını ve detayları görmek için bir ülke seçin.",
    listTitle: "Programlar",
    listHint: "Detay için seçin",
    listAria: "Programlar",
    listEmptyTitle: "Program bulunamadı",
    listEmptyBody:
      "Lütfen başka bir ülke seçin veya ücretsiz değerlendirme planlayın.",
    detailsLink: "Detaylar için tıklayın",
    detailsEmptyTitle: "Bir program seçin",
    detailsEmptyBody: "Düzenli açıklamayı görmek için soldan bir program seçin.",
    section: {
      overview: "Genel Bakış",
      whoFor: "Kimler İçin?",
      advantages: "Öne Çıkan Avantajlar",
      duration: "Süre",
      workRights: "Çalışma Hakkı",
      steps: "Başvuru Adımları",
      docs: "Gerekli Belgeler",
      fees: "Ücret / Vize Notları",
    },
    badges: { Shared: "Ortak", Popular: "Popüler", New: "Yeni" },
    workRightsFallback: "Rota ve yerel düzenlemelere göre değişir.",
    eligibilityTitle: (countryLabel, programShortTitle) =>
      `${countryLabel} ${programShortTitle} için uygun muyum?`,
    eligibilityBody:
      "24 saat içinde profilinize göre net bir yol haritası çıkaralım.",
    eligibilityCta: "Ücretsiz Değerlendirme Al",
    citySchool: {
      title: "Şehir / Okul Önerileri",
      description: (countryLabel) =>
        `${countryLabel} için popüler şehirler ve örnek okul seçenekleri.`,
      badge: "Öneriler",
      cardTitle: "Okul Önerileri",
      footerNote:
        "Not: Okul örnekleri bilgilendirme amaçlıdır; uygunluk ve kontenjan dönemlere göre değişebilir.",
    },
    seoHiddenTitle: "Yurtdışı Eğitim ve Vize Danışmanlığı",
  },
  en: {
    pageTitle: "Programs",
    pageDescription:
      "Select a country, explore program routes, and view details instantly on the same screen.",
    pillLabel: "Programs by Country",
    countriesTitle: "Countries",
    countriesHint: "Click to select",
    activeLabel: "Active",
    heroPill: "Programs by Country",
    heroTitle: (countryLabel) => `${countryLabel}: Programs & Opportunities`,
    heroDescriptionWithProgram:
      "Select a program to view eligibility, duration, required documents, and visa notes in a clean format.",
    heroDescriptionEmpty:
      "Select a country to view available program routes and details.",
    listTitle: "Programs",
    listHint: "Select for details",
    listAria: "Programs",
    listEmptyTitle: "No programs found",
    listEmptyBody: "Please select another country or book a free assessment.",
    detailsLink: "Click for details",
    detailsEmptyTitle: "Select a program",
    detailsEmptyBody: "Choose a program on the left to view the details panel.",
    section: {
      overview: "Overview",
      whoFor: "Who Is This For?",
      advantages: "Key Advantages",
      duration: "Duration",
      workRights: "Work Rights",
      steps: "Application Steps",
      docs: "Required Documents",
      fees: "Fees / Visa Notes",
    },
    badges: { Shared: "Shared", Popular: "Popular", New: "New" },
    workRightsFallback: "Depends on route and local regulations.",
    eligibilityTitle: (countryLabel, programShortTitle) =>
      `Am I eligible for ${countryLabel} ${programShortTitle}?`,
    eligibilityBody: "Get a clear, profile-based roadmap within 24 hours.",
    eligibilityCta: "Get a Free Assessment",
    citySchool: {
      title: "City / School Suggestions",
      description: (countryLabel) =>
        `Popular cities and example schools for ${countryLabel}.`,
      badge: "Suggestions",
      cardTitle: "School Suggestions",
      footerNote:
        "Note: School examples are for guidance; eligibility and availability may change by term.",
    },
    seoHiddenTitle: "Study Abroad & Visa Consulting",
  },
  de: {
    pageTitle: "Programme",
    pageDescription:
      "Wählen Sie ein Land, entdecken Sie Programme und sehen Sie Details sofort auf derselben Seite.",
    pillLabel: "Programme nach Land",
    countriesTitle: "Länder",
    countriesHint: "Zum Auswählen klicken",
    activeLabel: "Aktiv",
    heroPill: "Programme nach Land",
    heroTitle: (countryLabel) => `${countryLabel}: Programme & Möglichkeiten`,
    heroDescriptionWithProgram:
      "Wählen Sie ein Programm, um Eignung, Dauer, Unterlagen und Visa-Notizen übersichtlich zu sehen.",
    heroDescriptionEmpty:
      "Wählen Sie ein Land, um verfügbare Programme und Details zu sehen.",
    listTitle: "Programme",
    listHint: "Für Details auswählen",
    listAria: "Programme",
    listEmptyTitle: "Keine Programme gefunden",
    listEmptyBody: "Bitte ein anderes Land wählen oder kostenlose Einschätzung buchen.",
    detailsLink: "Für Details klicken",
    detailsEmptyTitle: "Programm auswählen",
    detailsEmptyBody: "Wählen Sie links ein Programm, um Details zu sehen.",
    section: {
      overview: "Überblick",
      whoFor: "Für wen ist das?",
      advantages: "Vorteile",
      duration: "Dauer",
      workRights: "Arbeitsrecht",
      steps: "Bewerbungsschritte",
      docs: "Benötigte Unterlagen",
      fees: "Gebühren / Visa-Notizen",
    },
    badges: { Shared: "Gemeinsam", Popular: "Beliebt", New: "Neu" },
    workRightsFallback: "Abhängig von Route und lokalen Regeln.",
    eligibilityTitle: (countryLabel, programShortTitle) =>
      `Bin ich geeignet für ${countryLabel} ${programShortTitle}?`,
    eligibilityBody:
      "Erhalten Sie innerhalb von 24 Stunden eine klare Roadmap basierend auf Ihrem Profil.",
    eligibilityCta: "Kostenlose Einschätzung",
    citySchool: {
      title: "Stadt- / Schulvorschläge",
      description: (countryLabel) =>
        `Beliebte Städte und Beispiel-Schulen für ${countryLabel}.`,
      badge: "Vorschläge",
      cardTitle: "Schulvorschläge",
      footerNote:
        "Hinweis: Beispiele dienen der Orientierung; Eignung und Verfügbarkeit können sich je Term ändern.",
    },
    seoHiddenTitle: "Auslandsstudium & Visaberatung",
  },
};
