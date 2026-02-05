import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import ProgramDetails from "../components/programs/ProgramDetails";
import ProgramList from "../components/programs/ProgramList";
import CitySchoolRecommendations from "../components/programs/CitySchoolRecommendations";
import { PROGRAMS_UI } from "../components/programs/i18n";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import type { AppLocale } from "../lib/i18n";
import { normalizeLocale } from "../lib/i18n";
import { getCitySchoolRecommendations } from "../lib/citySchoolRecommendations";
import {
  COUNTRY_ORDER,
  type CountryId,
  getProgramCatalog,
} from "../lib/programCatalog";
import { COUNTRY_SLUG, getProgramDetailPath } from "../lib/programRoutes";

const COUNTRY_LABELS: Record<AppLocale, Record<CountryId, string>> = {
  tr: {
    Germany: "Almanya",
    USA: "ABD",
    Netherlands: "Hollanda",
    "United Kingdom": "Birleşik Krallık",
    Canada: "Kanada",
    Ireland: "İrlanda",
    Malta: "Malta",
  },
  en: {
    Germany: "Germany",
    USA: "USA",
    Netherlands: "Netherlands",
    "United Kingdom": "United Kingdom",
    Canada: "Canada",
    Ireland: "Ireland",
    Malta: "Malta",
  },
  de: {
    Germany: "Deutschland",
    USA: "USA",
    Netherlands: "Niederlande",
    "United Kingdom": "Vereinigtes Königreich",
    Canada: "Kanada",
    Ireland: "Irland",
    Malta: "Malta",
  },
};

function CountryFlag({ countryId }: { countryId: CountryId }) {
  const baseProps = {
    viewBox: "0 0 100 100",
    xmlns: "http://www.w3.org/2000/svg",
    preserveAspectRatio: "xMidYMid meet",
    className: "w-full h-full block",
    "aria-hidden": true,
    focusable: "false",
  } as const;

  if (countryId === "Germany") {
    return (
      <svg {...baseProps}>
        <rect width="100" height="33.3333" fill="#000" />
        <rect y="33.3333" width="100" height="33.3333" fill="#DD0000" />
        <rect y="66.6666" width="100" height="33.3334" fill="#FFCE00" />
      </svg>
    );
  }

  if (countryId === "Netherlands") {
    return (
      <svg {...baseProps}>
        <rect width="100" height="33.3333" fill="#AE1C28" />
        <rect y="33.3333" width="100" height="33.3333" fill="#fff" />
        <rect y="66.6666" width="100" height="33.3334" fill="#21468B" />
      </svg>
    );
  }

  if (countryId === "Ireland") {
    return (
      <svg {...baseProps}>
        <rect width="33.3333" height="100" fill="#169B62" />
        <rect x="33.3333" width="33.3334" height="100" fill="#fff" />
        <rect x="66.6666" width="33.3334" height="100" fill="#FF883E" />
      </svg>
    );
  }

  if (countryId === "Malta") {
    return (
      <svg {...baseProps}>
        <rect width="50" height="100" fill="#fff" />
        <rect x="50" width="50" height="100" fill="#CF142B" />
        <rect x="12" y="12" width="18" height="18" fill="#C8102E" opacity="0.92" />
        <rect x="18.8" y="12" width="4.4" height="18" fill="#fff" />
        <rect x="12" y="18.8" width="18" height="4.4" fill="#fff" />
      </svg>
    );
  }

  if (countryId === "Canada") {
    return (
      <svg {...baseProps}>
        <rect width="100" height="100" fill="#fff" />
        <rect width="25" height="100" fill="#D80621" />
        <rect x="75" width="25" height="100" fill="#D80621" />
        <path
          d="M50 22l4 10 10-3-6 9 10 3-10 3 6 9-10-3-4 10-4-10-10 3 6-9-10-3 10-3-6-9 10 3 4-10z"
          fill="#D80621"
        />
      </svg>
    );
  }

  if (countryId === "United Kingdom") {
    return (
      <svg {...baseProps}>
        <rect width="100" height="100" fill="#012169" />
        {/* White diagonals */}
        <polygon points="0,0 18,0 100,82 100,100 82,100 0,18" fill="#fff" />
        <polygon points="100,0 82,0 0,82 0,100 18,100 100,18" fill="#fff" />
        {/* Red diagonals */}
        <polygon points="0,0 12,0 100,88 100,100 88,100 0,12" fill="#C8102E" />
        <polygon points="100,0 88,0 0,88 0,100 12,100 100,12" fill="#C8102E" />
        {/* White cross */}
        <rect x="0" y="40" width="100" height="20" fill="#fff" />
        <rect x="40" y="0" width="20" height="100" fill="#fff" />
        {/* Red cross */}
        <rect x="0" y="44" width="100" height="12" fill="#C8102E" />
        <rect x="44" y="0" width="12" height="100" fill="#C8102E" />
      </svg>
    );
  }

  // USA
  return (
    <svg {...baseProps}>
      <rect width="100" height="100" fill="#B22234" />
      {Array.from({ length: 6 }).map((_, i) => (
        <rect
          key={i}
          y={(i * 100) / 13 + 100 / 13}
          width="100"
          height={100 / 13}
          fill="#fff"
        />
      ))}
      <rect width="42" height={(7 * 100) / 13} fill="#3C3B6E" />
      {Array.from({ length: 4 }).map((_, row) =>
        Array.from({ length: 6 }).map((__, col) => (
          <circle
            key={`${row}-${col}`}
            cx={6 + col * 6}
            cy={7 + row * 6}
            r="1.1"
            fill="#fff"
            opacity="0.95"
          />
        )),
      )}
    </svg>
  );
}

const PROGRAMS_SEO_KEYWORDS: Record<AppLocale, readonly string[]> = {
  tr: [
    "yurtdışı eğitim danışmanlığı",
    "yurtdışı çalışma vizesi",
    "öğrenci vizesi",
    "vize danışmanlığı",
    "Almanya Ausbildung",
    "Almanya üniversite başvurusu",
    "Almanya yüksek lisans",
    "Denklik (diploma tanıma)",
    "Work and Travel",
    "Camp USA",
    "H-2B çalışma vizesi",
    "ABD dil okulu",
    "Kanada dil okulu",
    "İrlanda Work and Study",
    "Malta dil okulu",
    "Au Pair Almanya",
    "Au Pair Amerika",
  ],
  en: [
    "study abroad consulting",
    "work visa",
    "student visa",
    "visa consulting",
    "Germany Ausbildung",
    "Germany university application",
    "Germany master's",
    "degree recognition",
    "Work and Travel",
    "Camp USA",
    "H-2B work visa",
    "USA language courses",
    "Canada language courses",
    "Ireland work and study",
    "Malta language school",
    "Au Pair Germany",
    "Au Pair USA",
  ],
  de: [
    "Auslandsstudium Beratung",
    "Arbeitsvisum",
    "Studentenvisum",
    "Visaberatung",
    "Deutschland Ausbildung",
    "Universitätsbewerbung Deutschland",
    "Master in Deutschland",
    "Anerkennung von Abschlüssen",
    "Work and Travel",
    "Camp USA",
    "H-2B Arbeitsvisum",
    "Sprachkurse USA",
    "Sprachkurse Kanada",
    "Irland Work and Study",
    "Sprachschule Malta",
    "Au Pair Deutschland",
    "Au Pair USA",
  ],
};

const LANGUAGE_TAG: Record<AppLocale, string> = {
  tr: "tr-TR",
  en: "en-US",
  de: "de-DE",
};

const COUNTRY_BAR_UI: Record<
  AppLocale,
  { label: string; hint: string; selectLabel: string }
> = {
  tr: {
    label: "Ülkeler:",
    hint: "Hangi ülkeyi araştırmak istersiniz?",
    selectLabel: "Tüm Ülkeler",
  },
  en: {
    label: "Countries:",
    hint: "Which country would you like to explore?",
    selectLabel: "All Countries",
  },
  de: {
    label: "Länder:",
    hint: "Welches Land möchten Sie erkunden?",
    selectLabel: "Alle Länder",
  },
};

const BLOG_CTA_UI: Record<
  AppLocale,
  { badge: string; title: (countryLabel: string) => string; body: string; button: string }
> = {
  tr: {
    badge: "Blog",
    title: (countryLabel) => `${countryLabel} hakkında rehberler`,
    body: "Seçili ülke için vize, üniversite, yaşam ve başvuru süreçleriyle ilgili pratik rehberleri inceleyin.",
    button: "Bu ülke hakkında rehberler",
  },
  en: {
    badge: "Blog",
    title: (countryLabel) => `Guides about ${countryLabel}`,
    body: "Explore practical guides on visas, universities, living costs, and application timelines for this country.",
    button: "Guides about this country",
  },
  de: {
    badge: "Blog",
    title: (countryLabel) => `Leitfäden zu ${countryLabel}`,
    body: "Praktische Beiträge zu Visum, Hochschulen, Lebenshaltungskosten und Bewerbungstimeline für dieses Land.",
    button: "Leitfäden zu diesem Land",
  },
};

const PROGRAMS_FAQ_UI: Record<
  AppLocale,
  {
    badge: string;
    title: (countryLabel: string) => string;
    description: string;
    questions: {
      eligibility: (countryLabel: string, programTitle: string) => string;
      documents: string;
      duration: string;
      workRights: string;
      fees: string;
      timeline: string;
    };
    answers: {
      eligibility: (countryLabel: string, programTitle: string) => string;
      documents: (countryLabel: string, programTitle: string) => string;
      duration: (durationText: string) => string;
      workRights: (workRightsText: string) => string;
      fees: (feesText: string) => string;
      timeline: (countryLabel: string) => string;
    };
  }
> = {
  tr: {
    badge: "Sık Sorulan Sorular",
    title: (countryLabel) => `${countryLabel} Programları: Sık Sorulan Sorular`,
    description:
      "Başvuru, vize, süre ve gerekli belgeler gibi en çok merak edilen soruları hızlıca yanıtladık.",
    questions: {
      eligibility: (countryLabel, programTitle) =>
        `${countryLabel} — ${programTitle} için uygun muyum?`,
      documents: "Başvuru için hangi belgeler gerekiyor?",
      duration: "Program ne kadar sürer?",
      workRights: "Çalışma hakkı var mı?",
      fees: "Ücretler ve vize notları nedir?",
      timeline: "Başvuruyu ne zaman başlatmalıyım?",
    },
    answers: {
      eligibility: (countryLabel, programTitle) =>
        `${countryLabel} ${programTitle} uygunluğu; eğitim geçmişi, dil seviyesi, yaş, finansal durum ve hedef takvim gibi kriterlere göre değişir. Detaylı uygunluk için program detaylarını inceleyin.`,
      documents: (countryLabel, programTitle) =>
        `${countryLabel} ${programTitle} başvurularında genellikle pasaport, CV, motivasyon mektubu, diploma/transkript ve (gerekiyorsa) finansal evraklar istenir. Kesin liste kurum ve döneme göre değişir; program detayında güncel checklist yer alır.`,
      duration: (durationText) =>
        `Program süresi rotaya göre değişir. Seçili program için genel süre bilgisi: ${durationText}`,
      workRights: (workRightsText) =>
        `Çalışma hakkı rota ve yerel düzenlemelere göre değişir. Seçili program için özet: ${workRightsText}`,
      fees: (feesText) =>
        `Ücretler; okul/kurum, şehir, dönem ve vize türüne göre değişir. Seçili program için notlar: ${feesText}`,
      timeline: (countryLabel) =>
        `${countryLabel} programlarında doğru zamanlama; kontenjan, dönem başlangıcı ve vize randevu yoğunluğuna göre değişir. Genelde 2–6 ay önceden planlama önerilir; erken başvuru daha güvenli olur.`,
    },
  },
  en: {
    badge: "FAQ",
    title: (countryLabel) => `${countryLabel} Programs: Frequently Asked Questions`,
    description:
      "Quick answers to common questions about applications, visas, duration, and required documents.",
    questions: {
      eligibility: (countryLabel, programTitle) =>
        `Am I eligible for ${countryLabel} — ${programTitle}?`,
      documents: "Which documents are required?",
      duration: "How long does the program take?",
      workRights: "Are there work rights?",
      fees: "What about fees and visa notes?",
      timeline: "When should I start my application?",
    },
    answers: {
      eligibility: (countryLabel, programTitle) =>
        `Eligibility for ${countryLabel} ${programTitle} depends on academic background, language level, age, finances, and timeline. For a precise view, check the program details.`,
      documents: (countryLabel, programTitle) =>
        `For ${countryLabel} ${programTitle}, you typically need a passport, CV, motivation letter, diplomas/transcripts, and (if required) proof of funds. The exact list varies by provider and intake; see program details.`,
      duration: (durationText) =>
        `Duration depends on the route. For the selected program: ${durationText}`,
      workRights: (workRightsText) =>
        `Work rights depend on the route and local regulations. For the selected program: ${workRightsText}`,
      fees: (feesText) =>
        `Fees vary by provider, city, intake, and visa type. For the selected program: ${feesText}`,
      timeline: (countryLabel) =>
        `For ${countryLabel}, timing depends on intake dates, quotas, and visa appointment availability. Planning 2–6 months ahead is usually recommended.`,
    },
  },
  de: {
    badge: "FAQ",
    title: (countryLabel) => `${countryLabel} Programme: Häufige Fragen`,
    description:
      "Kurze Antworten zu Bewerbung, Visum, Dauer und benötigten Unterlagen.",
    questions: {
      eligibility: (countryLabel, programTitle) =>
        `Bin ich geeignet für ${countryLabel} — ${programTitle}?`,
      documents: "Welche Unterlagen werden benötigt?",
      duration: "Wie lange dauert das Programm?",
      workRights: "Gibt es Arbeitsrechte?",
      fees: "Wie sind Gebühren und Visa-Hinweise?",
      timeline: "Wann sollte ich starten?",
    },
    answers: {
      eligibility: (countryLabel, programTitle) =>
        `Die Eignung für ${countryLabel} ${programTitle} hängt von Bildungshintergrund, Sprachlevel, Alter, Finanzen und Zeitplan ab. Für Details bitte die Programmdetails ansehen.`,
      documents: (countryLabel, programTitle) =>
        `Für ${countryLabel} ${programTitle} werden häufig Reisepass, Lebenslauf, Motivationsschreiben, Diplome/Transkripte und (falls nötig) Finanzierungsnachweise benötigt. Die genaue Liste variiert je Anbieter/Intake; siehe Programmdetails.`,
      duration: (durationText) =>
        `Die Dauer hängt von der Route ab. Für das ausgewählte Programm: ${durationText}`,
      workRights: (workRightsText) =>
        `Arbeitsrechte hängen von Route und lokalen Regeln ab. Für das ausgewählte Programm: ${workRightsText}`,
      fees: (feesText) =>
        `Gebühren variieren je Anbieter, Stadt, Intake und Visumtyp. Für das ausgewählte Programm: ${feesText}`,
      timeline: (countryLabel) =>
        `Bei ${countryLabel} hängen Zeitfenster von Intake-Terminen, Kontingenten und Visaterminen ab. Planung 2–6 Monate vorher ist meist sinnvoll.`,
    },
  },
};

type ProgramTabId =
  | "all"
  | "popular"
  | "work"
  | "language"
  | "bachelor"
  | "master"
  | "phd";

const PROGRAM_TABS_UI: Record<
  AppLocale,
  { label: string; tabs: Record<ProgramTabId, string> }
> = {
  tr: {
    label: "Program Kategorileri",
    tabs: {
      all: "Tümü",
      popular: "Popüler",
      work: "Çalışma",
      language: "Dil",
      bachelor: "Lisans",
      master: "Yüksek Lisans",
      phd: "Doktora",
    },
  },
  en: {
    label: "Program Categories",
    tabs: {
      all: "All",
      popular: "Popular",
      work: "Work",
      language: "Language",
      bachelor: "Bachelor",
      master: "Master",
      phd: "PhD",
    },
  },
  de: {
    label: "Programmkategorien",
    tabs: {
      all: "Alle",
      popular: "Beliebt",
      work: "Arbeit",
      language: "Sprache",
      bachelor: "Bachelor",
      master: "Master",
      phd: "Promotion",
    },
  },
};

const JOURNEY_UI: Record<
  AppLocale,
  {
    badge: string;
    title: string;
    description: string;
    steps: Array<{ id: string; icon: string; title: string; body: string; meta: string }>;
  }
> = {
  tr: {
    badge: "Müşteri Yolculuğu",
    title: "Hedefinden vizeye: adım adım ilerleyelim.",
    description:
      "Her adımda ne olacağını bil: biz planlarız ve takip ederiz; sen de güvenle ilerlersin.",
    steps: [
      {
        id: "assessment",
        icon: "fact_check",
        title: "Ücretsiz değerlendirme",
        body: "Hedeflerini, profilini ve uygunluğunu netleştirir; en doğru rotayı birlikte belirleriz.",
        meta: "24 saat içinde dönüş",
      },
      {
        id: "route",
        icon: "travel_explore",
        title: "Rota tasarımı",
        body: "Ülke + program seçimi, alternatifler ve zaman planı: net bir yol haritası oluştururuz.",
        meta: "Program eşleştirme",
      },
      {
        id: "documents",
        icon: "description",
        title: "Dosya hazırlığı",
        body: "Evrak listesini özelleştirir, kontrol eder ve başvuru dosyanı premium düzende hazırlarız.",
        meta: "Evrak kontrolü",
      },
      {
        id: "application",
        icon: "shield_lock",
        title: "Başvuru & vize",
        body: "Başvurular, randevu ve takip: süreci adım adım yönetir, riskleri önceden kapatırız.",
        meta: "Takip & yönlendirme",
      },
      {
        id: "departure",
        icon: "flight_takeoff",
        title: "Yola çıkış & destek",
        body: "Uçuş öncesi checklist, konaklama/varış bilgileri ve yeni ülkende ilk gün desteği.",
        meta: "Varışa kadar",
      },
    ],
  },
  en: {
    badge: "Customer Journey",
    title: "From goals to visa: step by step.",
    description:
      "Know what happens at every stage: we plan and track the process so you can move forward with confidence.",
    steps: [
      {
        id: "assessment",
        icon: "fact_check",
        title: "Free assessment",
        body: "We clarify your goals, profile, and eligibility and align on the best route for you.",
        meta: "Reply within 24h",
      },
      {
        id: "route",
        icon: "travel_explore",
        title: "Route design",
        body: "Country + program selection, alternatives, and a clear timeline for a strong plan.",
        meta: "Program matching",
      },
      {
        id: "documents",
        icon: "description",
        title: "Document preparation",
        body: "We tailor your checklist, review documents, and prepare a premium-quality application file.",
        meta: "Document review",
      },
      {
        id: "application",
        icon: "shield_lock",
        title: "Application & visa",
        body: "Submissions, appointments, and tracking—managed step by step with risks handled early.",
        meta: "Tracking & guidance",
      },
      {
        id: "departure",
        icon: "flight_takeoff",
        title: "Departure support",
        body: "Pre-departure checklist, accommodation/arrival guidance, and support for your first days.",
        meta: "Until arrival",
      },
    ],
  },
  de: {
    badge: "Kundenreise",
    title: "Vom Ziel zum Visum: Schritt für Schritt.",
    description:
      "Du weißt jederzeit, was als Nächstes kommt: Wir planen und verfolgen den Prozess, damit du sicher vorankommst.",
    steps: [
      {
        id: "assessment",
        icon: "fact_check",
        title: "Kostenlose Einschätzung",
        body: "Wir klären Ziele, Profil und Eignung und legen gemeinsam die beste Route fest.",
        meta: "Antwort in 24 Std.",
      },
      {
        id: "route",
        icon: "travel_explore",
        title: "Route planen",
        body: "Land + Programmauswahl, Alternativen und eine klare Timeline für deinen Plan.",
        meta: "Programm-Matching",
      },
      {
        id: "documents",
        icon: "description",
        title: "Unterlagen vorbereiten",
        body: "Wir passen die Checkliste an, prüfen Dokumente und erstellen eine Premium-Bewerbungsmappe.",
        meta: "Dokumentencheck",
      },
      {
        id: "application",
        icon: "shield_lock",
        title: "Bewerbung & Visum",
        body: "Einreichung, Termine und Tracking: Schritt für Schritt, Risiken reduzieren wir frühzeitig.",
        meta: "Tracking & Guidance",
      },
      {
        id: "departure",
        icon: "flight_takeoff",
        title: "Abreise & Support",
        body: "Pre-Departure-Checkliste, Ankunft/Unterkunft und Unterstützung für die ersten Tage.",
        meta: "Bis zur Ankunft",
      },
    ],
  },
};

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setPrefersReducedMotion(media.matches);
    onChange();

    if (typeof media.addEventListener === "function") {
      media.addEventListener("change", onChange);
      return () => media.removeEventListener("change", onChange);
    }

    media.addListener(onChange);
    return () => media.removeListener(onChange);
  }, []);

  return prefersReducedMotion;
}

export default function ProgramsPage() {
  const router = useRouter();
  const locale = normalizeLocale(router.locale);
  const ui = PROGRAMS_UI[locale];
  const journey = JOURNEY_UI[locale];
  const countryBar = COUNTRY_BAR_UI[locale];
  const blogCta = BLOG_CTA_UI[locale];
  const faqUi = PROGRAMS_FAQ_UI[locale];
  const tabsUi = PROGRAM_TABS_UI[locale];
  const countryLabels = COUNTRY_LABELS[locale];
  const programCatalog = useMemo(() => getProgramCatalog(locale), [locale]);
  const citySchool = useMemo(() => getCitySchoolRecommendations(locale), [locale]);

  const prefersReducedMotion = usePrefersReducedMotion();
  const [hydrated, setHydrated] = useState(false);
  const showClientOnlySections = process.env.NODE_ENV === "production" || hydrated;

  useEffect(() => {
    setHydrated(true);
  }, []);

  const [selectedCountry, setSelectedCountry] = useState<CountryId>(COUNTRY_ORDER[0]);
  const selectedCountryLabel = countryLabels[selectedCountry] ?? selectedCountry;
  const [pendingCountry, setPendingCountry] = useState<CountryId | null>(null);
  const activeCountry = pendingCountry ?? selectedCountry;
  const [countryTransitionState, setCountryTransitionState] = useState<
    "idle" | "out" | "in"
  >("idle");
  const countryTimeoutRef = useRef<number | null>(null);
  const countryIdleTimeoutRef = useRef<number | null>(null);

  const programs = useMemo(
    () => programCatalog[selectedCountry]?.programs ?? [],
    [programCatalog, selectedCountry],
  );
  const firstProgramId = programs[0]?.id ?? null;

  const getTabForProgram = useCallback((program: (typeof programs)[number]) => {
    const id = program.id.toLowerCase();
    const title = program.title.toLowerCase();
    const isBachelor = id.includes("bachelors") || id.includes("university-bachelors");
    const isMaster = id.includes("masters");
    const isPhd = id.includes("phd");
    const isLanguage = id.includes("language") || id.includes("summer-schools");
    const isWork =
      id.includes("work") ||
      id.includes("ausbildung") ||
      id.includes("camp") ||
      id.includes("h2b") ||
      id.includes("internship") ||
      id.includes("placement") ||
      title.includes("work") ||
      title.includes("au pair");

    return { isBachelor, isMaster, isPhd, isLanguage, isWork };
  }, []);

  const tabCounts = useMemo(() => {
    const counts: Record<ProgramTabId, number> = {
      all: programs.length,
      popular: 0,
      work: 0,
      language: 0,
      bachelor: 0,
      master: 0,
      phd: 0,
    };

    for (const program of programs) {
      if (program.badge === "Popular") counts.popular += 1;
      const flags = getTabForProgram(program);
      if (flags.isWork) counts.work += 1;
      if (flags.isLanguage) counts.language += 1;
      if (flags.isBachelor) counts.bachelor += 1;
      if (flags.isMaster) counts.master += 1;
      if (flags.isPhd) counts.phd += 1;
    }

    return counts;
  }, [getTabForProgram, programs]);

  const [activeTab, setActiveTab] = useState<ProgramTabId>("all");

  useEffect(() => {
    setActiveTab("all");
  }, [selectedCountry]);

  const availableTabs = useMemo(() => {
    const order: ProgramTabId[] = ["popular", "work", "language", "bachelor", "master", "phd"];
    const visible = order.filter((id) => tabCounts[id] > 0);
    return ["all" as const, ...visible];
  }, [tabCounts]);

  const filteredPrograms = useMemo(() => {
    if (activeTab === "all") return programs;
    return programs.filter((program) => {
      if (activeTab === "popular") return program.badge === "Popular";
      const flags = getTabForProgram(program);
      if (activeTab === "work") return flags.isWork;
      if (activeTab === "language") return flags.isLanguage;
      if (activeTab === "bachelor") return flags.isBachelor;
      if (activeTab === "master") return flags.isMaster;
      if (activeTab === "phd") return flags.isPhd;
      return true;
    });
  }, [activeTab, getTabForProgram, programs]);

  const [selectedProgramId, setSelectedProgramId] = useState<string | null>(
    firstProgramId,
  );
  const [displayProgramId, setDisplayProgramId] = useState<string | null>(firstProgramId);
  const [programTransitionState, setProgramTransitionState] = useState<
    "idle" | "out" | "in"
  >("idle");
  const programTimeoutRef = useRef<number | null>(null);
  const programIdleTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    setSelectedProgramId(firstProgramId);
    setDisplayProgramId(firstProgramId);
    setProgramTransitionState("idle");
  }, [firstProgramId, selectedCountry]);

  const selectedProgram = useMemo(() => {
    if (!programs.length) return null;
    return programs.find((program) => program.id === selectedProgramId) ?? programs[0];
  }, [programs, selectedProgramId]);

  const seoKeywords = PROGRAMS_SEO_KEYWORDS[locale];

  const seoItemList = useMemo(() => {
    return {
      "@type": "ItemList",
      name:
        locale === "tr"
          ? "Lotus Abroad Programları"
          : locale === "de"
            ? "Lotus Abroad Programme"
            : "Lotus Abroad Programs",
      itemListElement: COUNTRY_ORDER.flatMap((countryId, countryIndex) => {
        const countryLabel = countryLabels[countryId] ?? countryId;
        const list = programCatalog[countryId]?.programs ?? [];
        return list.map((program, programIndex) => ({
          "@type": "ListItem",
          position: countryIndex * 100 + programIndex + 1,
          name: `${countryLabel} - ${program.title}`,
          description: program.tagline,
        }));
      }),
    } as const;
  }, [countryLabels, locale, programCatalog]);

  const displayProgram = useMemo(() => {
    if (!programs.length) return null;
    if (!displayProgramId) return programs[0];
    return programs.find((program) => program.id === displayProgramId) ?? programs[0];
  }, [displayProgramId, programs]);

  const heroImageUrl =
    displayProgram?.heroImageUrl ??
    selectedProgram?.heroImageUrl ??
    programCatalog[selectedCountry]?.heroImageUrl;

  const faqEntities = useMemo(() => {
    const programForFaq = displayProgram ?? selectedProgram ?? programs[0] ?? null;
    const programTitle = programForFaq?.title ?? ui.detailsEmptyTitle;
    const durationText = programForFaq?.details.duration ?? ui.workRightsFallback;
    const workRightsText = programForFaq?.details.workRights ?? ui.workRightsFallback;
    const feesText = programForFaq?.details.feesAndVisa ?? ui.pageDescription;

    return [
      {
        question: faqUi.questions.eligibility(selectedCountryLabel, programTitle),
        answer: faqUi.answers.eligibility(selectedCountryLabel, programTitle),
      },
      {
        question: faqUi.questions.documents,
        answer: faqUi.answers.documents(selectedCountryLabel, programTitle),
      },
      { question: faqUi.questions.duration, answer: faqUi.answers.duration(durationText) },
      { question: faqUi.questions.workRights, answer: faqUi.answers.workRights(workRightsText) },
      { question: faqUi.questions.fees, answer: faqUi.answers.fees(feesText) },
      { question: faqUi.questions.timeline, answer: faqUi.answers.timeline(selectedCountryLabel) },
    ] as const;
  }, [
    displayProgram,
    faqUi.answers,
    faqUi.questions,
    programs,
    selectedCountryLabel,
    selectedProgram,
    ui.detailsEmptyTitle,
    ui.pageDescription,
    ui.workRightsFallback,
  ]);

  const faqSchema = useMemo(() => {
    return {
      "@type": "FAQPage",
      mainEntity: faqEntities.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    } as const;
  }, [faqEntities]);

  const requestCountryChange = useCallback(
    (nextCountry: CountryId) => {
      if (nextCountry === selectedCountry) return;
      if (typeof window === "undefined") return;

      if (countryTimeoutRef.current) window.clearTimeout(countryTimeoutRef.current);
      if (countryIdleTimeoutRef.current) window.clearTimeout(countryIdleTimeoutRef.current);
      if (prefersReducedMotion) {
        setSelectedCountry(nextCountry);
        setPendingCountry(null);
        setCountryTransitionState("idle");
        return;
      }

      setPendingCountry(nextCountry);
      setCountryTransitionState("out");
      setProgramTransitionState("out");
      countryTimeoutRef.current = window.setTimeout(() => {
        setSelectedCountry(nextCountry);
        setPendingCountry(null);
        setCountryTransitionState("in");
        setProgramTransitionState("in");
        countryIdleTimeoutRef.current = window.setTimeout(() => {
          setCountryTransitionState("idle");
        }, 240);
      }, 180);
    },
    [prefersReducedMotion, selectedCountry],
  );

  const countryFromQuery = useMemo(() => {
    const raw = router.query.country;
    const value = Array.isArray(raw) ? raw[0] : raw;
    if (!value) return null;
    return (COUNTRY_ORDER as readonly string[]).includes(value)
      ? (value as CountryId)
      : null;
  }, [router.query.country]);

  useEffect(() => {
    if (!countryFromQuery) return;
    requestCountryChange(countryFromQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countryFromQuery]);

  const requestProgramChange = useCallback(
    (nextProgramId: string) => {
      setSelectedProgramId(nextProgramId);
      if (typeof window === "undefined") return;

      if (programTimeoutRef.current) window.clearTimeout(programTimeoutRef.current);
      if (programIdleTimeoutRef.current) window.clearTimeout(programIdleTimeoutRef.current);
      if (prefersReducedMotion) {
        setDisplayProgramId(nextProgramId);
        setProgramTransitionState("idle");
        return;
      }

      setProgramTransitionState("out");
      programTimeoutRef.current = window.setTimeout(() => {
        setDisplayProgramId(nextProgramId);
        setProgramTransitionState("in");
        programIdleTimeoutRef.current = window.setTimeout(() => {
          setProgramTransitionState("idle");
        }, 220);
      }, 160);
    },
    [prefersReducedMotion],
  );

  const detailsAnchorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!filteredPrograms.length) return;
    if (!selectedProgramId) {
      requestProgramChange(filteredPrograms[0].id);
      return;
    }
    const exists = filteredPrograms.some((program) => program.id === selectedProgramId);
    if (!exists) requestProgramChange(filteredPrograms[0].id);
  }, [filteredPrograms, requestProgramChange, selectedProgramId]);

  useEffect(() => {
    if (!detailsAnchorRef.current) return;
    if (typeof window === "undefined") return;
    if (!selectedProgramId) return;

    const el = detailsAnchorRef.current;
    const rect = el.getBoundingClientRect();
    const headerOffset = 110;

    if (rect.top < headerOffset || rect.top > window.innerHeight * 0.75) {
      el.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start",
      });
      window.scrollBy({ top: -headerOffset, left: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
    }
  }, [prefersReducedMotion, selectedProgramId]);

  useEffect(() => {
    return () => {
      if (typeof window === "undefined") return;
      if (countryTimeoutRef.current) window.clearTimeout(countryTimeoutRef.current);
      if (countryIdleTimeoutRef.current) window.clearTimeout(countryIdleTimeoutRef.current);
      if (programTimeoutRef.current) window.clearTimeout(programTimeoutRef.current);
      if (programIdleTimeoutRef.current) window.clearTimeout(programIdleTimeoutRef.current);
    };
  }, []);

  return (
    <>
      <Head>
        <title>
          {ui.pageTitle} | Lotus Abroad
        </title>
        <meta
          name="description"
          content={ui.pageDescription}
        />
        <meta name="keywords" content={seoKeywords.join(", ")} />
        <meta property="og:title" content={`${ui.pageTitle} | Lotus Abroad`} />
        <meta
          property="og:description"
          content={ui.pageDescription}
        />
        <meta property="og:type" content="website" />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebPage",
                  name: ui.pageTitle,
                  inLanguage: LANGUAGE_TAG[locale],
                  about: seoKeywords,
                  mainEntity: {
                    "@type": "ItemList",
                    name: seoItemList.name,
                  },
                },
                seoItemList,
                faqSchema,
              ],
            }),
          }}
        />
      </Head>

      <SiteHeader />

      <main className="pt-24">
        <section className="bg-gradient-to-b from-white via-background-light to-background-light dark:from-background-dark dark:via-background-dark dark:to-background-dark border-b border-gray-200/70 dark:border-white/10">
          <div className="max-w-[1440px] 2xl:max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
            <div className="flex flex-col items-center gap-5">
              <div className="w-full">
                <div className="flex items-center justify-center gap-3 w-full">
                  <div className="w-full overflow-x-auto no-scrollbar">
                    <div className="w-fit mx-auto flex items-center gap-2 rounded-full lotus-glass px-2 py-2">
                      {COUNTRY_ORDER.map((countryId) => {
                        const isActive = countryId === activeCountry;
                        return (
                          <button
                            key={countryId}
                            type="button"
                            aria-pressed={isActive}
                            onClick={() => requestCountryChange(countryId)}
                            className={[
                              "shrink-0 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-black transition-all duration-300 motion-reduce:transition-none",
                              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
                              isActive
                                ? "bg-white/80 dark:bg-white/10 text-text-main dark:text-white shadow-[0_16px_34px_rgba(0,0,0,0.10)]"
                                : "bg-white/40 dark:bg-transparent text-text-main dark:text-white/90 hover:bg-white/70 hover:shadow-[0_16px_34px_rgba(0,0,0,0.08)] hover:-translate-y-0.5",
                            ].join(" ")}
                          >
                            <span className="size-6 rounded-full overflow-hidden bg-white/95 dark:bg-white/10 border border-black/10 dark:border-white/10 flex items-center justify-center">
                              <CountryFlag countryId={countryId} />
                            </span>
                            <span>{countryLabels[countryId] ?? countryId}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Select dropdown removed per request */}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-background-light dark:bg-background-dark">
          <div className="max-w-[1440px] 2xl:max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12">
            <div className="space-y-8">
                <div
                  className="rounded-[2rem] overflow-hidden lotus-glass-strong programs-swap"
                  data-state={countryTransitionState}
                >
                  <header className="relative">
                    <div aria-hidden="true" className="absolute inset-0">
                      <div
                        className="absolute inset-0 bg-cover bg-center opacity-35 dark:opacity-26"
                        style={{ backgroundImage: `url('${heroImageUrl ?? ""}')` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-white/75 via-white/88 to-white/92 dark:from-background-dark/60 dark:via-background-dark/82 dark:to-background-dark/90" />
                      <div
                        className="absolute -inset-10 opacity-0 blur-3xl pointer-events-none"
                        style={{ background: "transparent" }}
                      />
                      <div
                        className="absolute inset-0 opacity-[0.06] dark:opacity-[0.05]"
                        style={{
                          backgroundImage:
                            "radial-gradient(circle at 2px 2px, rgba(0,0,0,0.55) 1px, transparent 0)",
                          backgroundSize: "44px 44px",
                        }}
                      />
                    </div>

                    <div className="relative px-6 md:px-8 py-7 md:py-8 border-b border-gray-100/80 dark:border-white/10">
                      <div className="flex flex-col gap-5">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="inline-flex items-center gap-2 rounded-full bg-white/80 dark:bg-white/5 border border-gray-100/80 dark:border-white/10 text-text-main dark:text-white text-[12px] font-black px-3 py-1.5">
                              <span className="material-symbols-outlined text-[16px]">explore</span>
                              {ui.heroPill}
                            </span>
                            <span className="inline-flex items-center gap-2 rounded-full bg-primary text-black text-[12px] font-black px-3 py-1.5">
                              <span className="material-symbols-outlined text-[16px]">public</span>
                              {selectedCountryLabel}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="inline-flex items-center gap-2 rounded-full bg-black/5 dark:bg-white/10 text-text-main dark:text-white text-[12px] font-black px-3 py-1.5">
                              <span className="material-symbols-outlined text-[16px]">format_list_bulleted</span>
                              {programs.length}
                            </span>
                            {selectedProgram ? (
                              <span className="hidden md:inline-flex items-center gap-2 rounded-full bg-black/5 dark:bg-white/10 text-text-muted dark:text-gray-300 text-[12px] font-black px-3 py-1.5">
                                <span className="material-symbols-outlined text-[16px]">bookmark</span>
                                {selectedProgram.title}
                              </span>
                            ) : null}
                          </div>
                        </div>

                        <div className="max-w-4xl">
                          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-text-main dark:text-white">
                            {ui.heroTitle(selectedCountryLabel)}
                          </h2>
                          <p className="mt-3 text-sm md:text-base text-text-muted dark:text-gray-400 leading-relaxed">
                            {selectedProgram ? ui.heroDescriptionWithProgram : ui.heroDescriptionEmpty}
                          </p>
                        </div>
                      </div>
                    </div>
                  </header>

                  <div className="p-6 md:p-8">
                    <div
                      className="mb-6 flex flex-col gap-3"
                      role="tablist"
                      aria-label={tabsUi.label}
                    >
                      <div className="inline-flex items-center gap-2 rounded-full lotus-glass px-2 py-2 overflow-x-auto no-scrollbar w-fit max-w-full">
                        {availableTabs.map((tabId) => {
                          const isActive = tabId === activeTab;
                          return (
                            <button
                              key={tabId}
                              type="button"
                              role="tab"
                              aria-selected={isActive}
                              tabIndex={isActive ? 0 : -1}
                              onClick={() => setActiveTab(tabId)}
                              className={[
                                "shrink-0 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-black transition-all duration-300 motion-reduce:transition-none",
                                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
                                isActive
                                  ? "bg-primary text-black shadow-[0_16px_34px_rgba(249,245,6,0.24)]"
                                  : "bg-black/5 dark:bg-white/10 text-text-main dark:text-white hover:bg-black/10 dark:hover:bg-white/15",
                              ].join(" ")}
                            >
                              {tabsUi.tabs[tabId]}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="programs-swap" data-state={countryTransitionState}>
                      <ProgramList
                        programs={filteredPrograms}
                        selectedProgramId={selectedProgramId}
                        onSelectProgram={requestProgramChange}
                        detailsLabel={ui.detailsLink}
                        getDetailsHref={(programId) =>
                          getProgramDetailPath(selectedCountry, programId)
                        }
                        variant="grid"
                        sticky={false}
                        scroll={false}
                        ui={ui}
                        badgeLabels={ui.badges}
                        isLoading={!prefersReducedMotion && countryTransitionState !== "idle"}
                      />
                    </div>

                    <div
                      ref={detailsAnchorRef}
                      className="mt-8 programs-swap"
                      data-state={programTransitionState === "idle" ? "in" : programTransitionState}
                    >
                      {showClientOnlySections && programTransitionState === "idle" ? (
                        <ProgramDetails
                          countryLabel={selectedCountryLabel}
                          program={displayProgram}
                          variant="panel"
                          detailsHref={
                            displayProgram
                              ? getProgramDetailPath(selectedCountry, displayProgram.id)
                              : undefined
                          }
                          detailsLabel={ui.detailsLink}
                          ui={ui}
                        />
                      ) : (
                        <div className="rounded-[2rem] lotus-glass-strong overflow-hidden">
                          <div className="p-6 md:p-7 border-b border-gray-100 dark:border-white/10">
                            <div className="lotus-shimmer h-6 w-2/3 rounded-full bg-black/10 dark:bg-white/10" />
                            <div className="lotus-shimmer mt-3 h-4 w-5/6 rounded-full bg-black/10 dark:bg-white/10" />
                          </div>
                          <div className="p-6 md:p-7 space-y-3">
                            {Array.from({ length: 6 }).map((_, idx) => (
                              <div
                                key={idx}
                                className="lotus-shimmer h-12 rounded-2xl bg-black/5 dark:bg-white/5"
                              />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="programs-swap" data-state={countryTransitionState}>
                  <CitySchoolRecommendations
                    countryLabel={selectedCountryLabel}
                    items={citySchool[selectedCountry] ?? []}
                    ui={ui.citySchool}
                  />
                </div>

                {showClientOnlySections ? (
                  <section
                    className="rounded-[2rem] lotus-glass-strong overflow-hidden"
                    aria-label={faqUi.badge}
                  >
                    <div className="p-6 md:p-8 border-b border-gray-100 dark:border-white/10 bg-gradient-to-b from-white/90 via-white/60 to-white/40 dark:from-white/10 dark:via-white/5 dark:to-transparent">
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/85 dark:bg-white/5 border border-gray-100 dark:border-white/10 backdrop-blur-sm shadow-[0_18px_45px_rgba(0,0,0,0.10)]">
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        <span className="text-xs font-black uppercase tracking-widest text-text-main dark:text-white">
                          {faqUi.badge}
                        </span>
                      </div>
                      <h2 className="mt-3 text-2xl md:text-3xl font-black text-text-main dark:text-white tracking-tight">
                        {faqUi.title(selectedCountryLabel)}
                      </h2>
                      <p className="mt-2 text-sm md:text-base text-text-muted dark:text-gray-400 leading-relaxed max-w-3xl">
                        {faqUi.description}
                      </p>
                    </div>

                    <div className="px-6 md:px-8">
                      {faqEntities.map((item) => (
                        <details
                          key={item.question}
                          className="group border-b border-gray-100 dark:border-white/10 last:border-b-0"
                        >
                          <summary className="flex cursor-pointer items-center justify-between gap-3 py-5 text-text-main dark:text-white font-black [&_::-webkit-details-marker]:hidden">
                            <span className="inline-flex items-center gap-2">
                              <span className="material-symbols-outlined text-[18px] text-text-muted dark:text-gray-300">
                                help
                              </span>
                              {item.question}
                            </span>
                            <span className="material-symbols-outlined text-[20px] text-text-muted dark:text-gray-400 transition group-open:rotate-180">
                              expand_more
                            </span>
                          </summary>
                          <div className="pb-5 text-sm text-text-muted dark:text-gray-400 leading-relaxed">
                            {item.answer}
                          </div>
                        </details>
                      ))}
                    </div>
                  </section>
                ) : null}
            </div>

            {/* SEO: UI'da görünmez anahtar kelimeler */}
            <section aria-hidden="true" className="sr-only">
              <h2>{ui.seoHiddenTitle}</h2>
              <p>{seoKeywords.join(" • ")}</p>
            </section>
          </div>
        </section>
      </main>

      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-background-light to-white dark:from-background-dark dark:via-background-dark dark:to-background-dark border-t border-gray-100 dark:border-white/5">
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none opacity-[0.09] dark:opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, rgba(0,0,0,0.55) 1px, transparent 0)",
            backgroundSize: "44px 44px",
          }}
        />
        <div className="max-w-[1680px] 2xl:max-w-[1920px] mx-auto relative">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/85 dark:bg-white/5 border border-gray-100 dark:border-white/10 backdrop-blur-sm shadow-[0_18px_45px_rgba(0,0,0,0.10)]">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-black uppercase tracking-widest text-text-main dark:text-white">
                {journey.badge}
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black mt-3 tracking-tight text-text-main dark:text-white">
              {journey.title}
            </h2>
            <p className="mt-4 text-sm md:text-base text-text-muted dark:text-gray-400 leading-relaxed">
              {journey.description}
            </p>
          </div>

          <div className="relative mt-14">
            <div
              aria-hidden="true"
              className="hidden lg:block absolute left-6 right-6 top-[52px] h-px bg-border-light/90 dark:bg-border-dark/90"
            />
            <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-7">
              {journey.steps.map((step, index) => (
                <li
                  className={[
                    "group relative min-w-0",
                    "lg:after:content-[''] lg:after:absolute lg:after:top-[52px] lg:after:left-full lg:after:w-6 lg:after:h-px lg:after:bg-border-light/90 dark:lg:after:bg-border-dark/90",
                    "lg:before:content-[''] lg:before:absolute lg:before:top-[52px] lg:before:left-full lg:before:w-6 lg:before:h-px lg:before:bg-primary lg:before:origin-left lg:before:scale-x-0 lg:before:transition-transform lg:before:duration-300 motion-reduce:lg:before:transition-none",
                    "group-hover:lg:before:scale-x-100",
                    index === journey.steps.length - 1 ? "lg:after:hidden lg:before:hidden" : "",
                  ].join(" ")}
                  key={step.id}
                >
                  <div className="relative h-full min-h-[276px] rounded-[2rem] lotus-glass-strong p-7 md:p-8 transition-all duration-300 motion-reduce:transition-none hover:-translate-y-1 hover:shadow-[0_48px_130px_rgba(0,0,0,0.18),0_0_0_1px_rgba(249,245,6,0.16),0_0_80px_rgba(249,245,6,0.10)] dark:hover:shadow-[0_55px_160px_rgba(0,0,0,0.30),0_0_0_1px_rgba(249,245,6,0.16),0_0_80px_rgba(249,245,6,0.08)] overflow-hidden">
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 motion-reduce:transition-none"
                      style={{
                        background:
                          "linear-gradient(120deg, rgba(249,245,6,0) 0%, rgba(249,245,6,0.18) 35%, rgba(255,255,255,0) 70%)",
                      }}
                    />
                    <div
                      aria-hidden="true"
                      className="absolute -inset-8 opacity-0 translate-x-[-120%] group-hover:opacity-100 group-hover:translate-x-[120%] transition-all duration-[1100ms] ease-out motion-reduce:transition-none pointer-events-none"
                      style={{
                        background:
                          "linear-gradient(100deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.55) 45%, rgba(255,255,255,0) 60%)",
                      }}
                    />

                    <div className="relative flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="relative shrink-0 size-11 rounded-full bg-primary text-black flex items-center justify-center shadow-[0_14px_40px_rgba(249,245,6,0.22)] transition-transform duration-300 motion-reduce:transition-none group-hover:scale-105 group-hover:-rotate-2">
                          <span className="material-symbols-outlined text-[22px]">{step.icon}</span>
                          <span className="absolute -bottom-1 -right-1 size-5 rounded-full bg-black text-white text-[10px] font-black flex items-center justify-center shadow-sm">
                            {index + 1}
                          </span>
                        </div>
                        <span className="text-[11px] font-black uppercase tracking-widest text-text-muted dark:text-gray-400 leading-tight">
                          {step.meta}
                        </span>
                      </div>
                      <span className="hidden sm:inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-text-muted dark:text-gray-400">
                        Lotus
                      </span>
                    </div>
                    <div className="relative mt-5 text-[19px] font-black text-text-main dark:text-white leading-snug">
                      {step.title}
                    </div>
                    <p className="relative mt-3 text-sm text-text-muted dark:text-gray-400 leading-relaxed">
                      {step.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="bg-background-light dark:bg-background-dark px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-[1680px] 2xl:max-w-[1920px] mx-auto">
          <div className="rounded-[2rem] lotus-glass-strong p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6 overflow-hidden">
            <div className="min-w-0">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/85 dark:bg-white/5 border border-gray-100 dark:border-white/10 backdrop-blur-sm shadow-[0_18px_45px_rgba(0,0,0,0.10)] w-fit">
                <span className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-xs font-black uppercase tracking-widest text-text-main dark:text-white">
                  {blogCta.badge}
                </span>
              </div>
              <div className="mt-4 text-2xl md:text-3xl font-black tracking-tight text-text-main dark:text-white">
                {blogCta.title(selectedCountryLabel)}
              </div>
              <div className="mt-2 text-sm md:text-base text-text-muted dark:text-gray-400 leading-relaxed max-w-3xl">
                {blogCta.body}
              </div>
            </div>

            <Link
              className="h-11 px-6 rounded-full bg-primary text-black text-sm font-black inline-flex items-center justify-center hover:brightness-105 transition-all whitespace-nowrap"
              href={`/blog?category=Guides&country=${COUNTRY_SLUG[selectedCountry]}`}
            >
              {blogCta.button}
              <span className="material-symbols-outlined text-[18px] ml-2">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />

      <style jsx global>{`
        .programs-swap {
          transition: opacity 260ms cubic-bezier(0.2, 0.9, 0.2, 1),
            transform 260ms cubic-bezier(0.2, 0.9, 0.2, 1);
          will-change: transform, opacity;
        }

        .programs-swap[data-state="out"] {
          opacity: 0;
          transform: translate3d(0, 10px, 0);
        }

        .programs-swap[data-state="in"],
        .programs-swap[data-state="idle"] {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }

        @media (prefers-reduced-motion: reduce) {
          .programs-swap {
            transition: none !important;
          }
          .lotus-shimmer {
            animation: none !important;
          }
        }

        .lotus-shimmer {
          position: relative;
          overflow: hidden;
        }

        .lotus-shimmer:after {
          content: "";
          position: absolute;
          inset: 0;
          transform: translateX(-120%);
          background: linear-gradient(
            100deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.55) 45%,
            rgba(255, 255, 255, 0) 60%
          );
          animation: lotus-shimmer 1200ms ease-out infinite;
        }

        .dark .lotus-shimmer:after {
          background: linear-gradient(
            100deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.18) 45%,
            rgba(255, 255, 255, 0) 60%
          );
        }

        @keyframes lotus-shimmer {
          0% {
            transform: translateX(-120%);
          }
          100% {
            transform: translateX(120%);
          }
        }
      `}</style>
    </>
  );
}
