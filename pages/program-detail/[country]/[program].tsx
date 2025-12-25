import type { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";

import ProgramDetailTemplatePage, {
  type ProgramDetailTemplateContent,
} from "../../../program_detail_template/code";
import type { AppLocale } from "../../../lib/i18n";
import { normalizeLocale } from "../../../lib/i18n";
import type { CountryId, Program } from "../../../lib/programCatalog";
import { COUNTRY_ORDER, getProgramCatalog } from "../../../lib/programCatalog";
import { COUNTRY_SLUG, SLUG_TO_COUNTRY } from "../../../lib/programRoutes";

type PageProps = {
  content: ProgramDetailTemplateContent;
};

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

function getProgramOrNull(locale: AppLocale, countryId: CountryId, programId: string): Program | null {
  const catalog = getProgramCatalog(locale);
  const country = catalog[countryId];
  if (!country) return null;
  return country.programs.find((program) => program.id === programId) ?? null;
}

function joinShort(items: string[], max = 3) {
  const sliced = items.slice(0, max);
  const suffix = items.length > max ? "…" : "";
  return sliced.join(", ") + suffix;
}

function buildContent(locale: AppLocale, countryId: CountryId, program: Program): ProgramDetailTemplateContent {
  const countryLabel = COUNTRY_LABELS[locale][countryId] ?? String(countryId);
  const details = program.details;
  const workRightsFallback =
    locale === "tr"
      ? "Rota ve yerel düzenlemelere göre değişir."
      : locale === "de"
        ? "Abhängig von Route und lokalen Regeln."
        : "Depends on route and local regulations.";
  const workRights = details.workRights ?? workRightsFallback;

  const otherPrograms = getProgramCatalog(locale)[countryId]?.programs
    ?.filter((p) => p.id !== program.id)
    .slice(0, 3) ?? [];

  while (otherPrograms.length < 3) otherPrograms.push(program);

  const metaTitle = `${program.title} - Lotus Abroad`;

  const labels =
    locale === "tr"
      ? {
          home: "Ana Sayfa",
          programs: "Programlar",
          badge1: "Lotus Abroad Programı",
          badge2: "Premium Destek",
          overview: "Genel Bakış",
          requirements: "Uygunluk & Gereksinimler",
          timeline: "Başvuru Süreci",
          lotusDiff: "Lotus Farkı",
          costs: "Ücretler & Masraflar",
          item: "Kalem",
          frequency: "Tür",
          estimated: "Not",
          programFee: "Program / Eğitim Ücreti",
          accommodation: "Konaklama",
          insurance: "Sigorta",
          visaFees: "Vize / Resmi Harçlar",
          lotusFee: "Lotus Abroad Danışmanlığı",
          variable: "Değişken",
          contactQuote: "Teklif için iletişime geçin",
          video: "Program Tanıtımı",
          videoTitle: "Video yakında",
          videoSubtitle: "Güncel içerikler hazırlanıyor.",
          faq: "Sık Sorulan Sorular",
          q1: "Çalışma hakkı var mı?",
          q2: "Hangi belgeler gerekli?",
          q3: "Başvuru adımları nelerdir?",
          tuition: "Ücret",
          duration: "Süre",
          work: "Çalışma Hakkı",
          docs: "Belgeler",
          response: "Geri dönüş",
          responseValue: "24 saat",
          cta1: "Ücretsiz Değerlendirme Al",
          cta2: "Bilgi PDF (Yakında)",
          social: "24 saat içinde dönüş garantisi.",
          needHelp: "Yardıma mı ihtiyacın var?",
          expertLine: `${countryLabel} uzmanımızla konuş.`,
          related: "Benzer Programlar",
          viewAll: "Tümünü gör",
          footerLinks: ["Programlar", "Hakkımızda", "İletişim", "Gizlilik"],
          copyright: `© ${new Date().getFullYear()} Lotus Abroad. Tüm hakları saklıdır.`,
          stepTitles: ["Adım 1", "Adım 2", "Adım 3", "Adım 4"],
          stepDates: ["Ön değerlendirme", "Evrak hazırlığı", "Başvuru & takip", "Vize & planlama"],
        }
      : locale === "de"
        ? {
            home: "Start",
            programs: "Programme",
            badge1: "Lotus Abroad Programm",
            badge2: "Premium Support",
            overview: "Überblick",
            requirements: "Eignung & Anforderungen",
            timeline: "Bewerbungsprozess",
            lotusDiff: "Lotus-Vorteile",
            costs: "Kosten & Gebühren",
            item: "Posten",
            frequency: "Typ",
            estimated: "Hinweis",
            programFee: "Programm-/Kursgebühr",
            accommodation: "Unterkunft",
            insurance: "Versicherung",
            visaFees: "Visum / Gebühren",
            lotusFee: "Lotus Abroad Beratung",
            variable: "Variabel",
            contactQuote: "Kontakt für Angebot",
            video: "Programm-Überblick",
            videoTitle: "Video bald verfügbar",
            videoSubtitle: "Aktuelle Inhalte in Vorbereitung.",
            faq: "Häufige Fragen",
            q1: "Gibt es Arbeitsrechte?",
            q2: "Welche Unterlagen werden benötigt?",
            q3: "Wie läuft der Prozess ab?",
            tuition: "Kosten",
            duration: "Dauer",
            work: "Arbeitsrecht",
            docs: "Unterlagen",
            response: "Rückmeldung",
            responseValue: "24 Std.",
            cta1: "Kostenlose Einschätzung",
            cta2: "PDF (Bald)",
            social: "Rückmeldung innerhalb von 24 Stunden.",
            needHelp: "Brauchen Sie Hilfe?",
            expertLine: `Sprechen Sie mit unserem ${countryLabel}-Team.`,
            related: "Ähnliche Programme",
            viewAll: "Alle ansehen",
            footerLinks: ["Programme", "Über uns", "Kontakt", "Datenschutz"],
            copyright: `© ${new Date().getFullYear()} Lotus Abroad. Alle Rechte vorbehalten.`,
            stepTitles: ["Schritt 1", "Schritt 2", "Schritt 3", "Schritt 4"],
            stepDates: ["Vorprüfung", "Unterlagen", "Bewerbung & Tracking", "Visum & Planung"],
          }
        : {
            home: "Home",
            programs: "Programs",
            badge1: "Lotus Abroad Program",
            badge2: "Premium Support",
            overview: "Overview",
            requirements: "Eligibility & Requirements",
            timeline: "Application Flow",
            lotusDiff: "The Lotus Difference",
            costs: "Costs & Fees",
            item: "Item",
            frequency: "Type",
            estimated: "Note",
            programFee: "Program / Course Fee",
            accommodation: "Accommodation",
            insurance: "Insurance",
            visaFees: "Visa / Official Fees",
            lotusFee: "Lotus Abroad Consulting",
            variable: "Varies",
            contactQuote: "Contact for quote",
            video: "Program Overview",
            videoTitle: "Video coming soon",
            videoSubtitle: "New content is being prepared.",
            faq: "Frequently Asked Questions",
            q1: "Do I have work rights?",
            q2: "Which documents are required?",
            q3: "What are the application steps?",
            tuition: "Cost",
            duration: "Duration",
            work: "Work Rights",
            docs: "Documents",
            response: "Response",
            responseValue: "24h",
            cta1: "Get a Free Assessment",
            cta2: "PDF (Soon)",
            social: "We respond within 24 hours.",
            needHelp: "Need help?",
            expertLine: `Talk to our ${countryLabel} team.`,
            related: "Similar Programs",
            viewAll: "View all",
            footerLinks: ["Programs", "About", "Contact", "Privacy"],
            copyright: `© ${new Date().getFullYear()} Lotus Abroad. All rights reserved.`,
            stepTitles: ["Step 1", "Step 2", "Step 3", "Step 4"],
            stepDates: ["Assessment", "Documents", "Submission & tracking", "Visa & planning"],
          };

  const overviewSecond =
    locale === "tr"
      ? `Başvuru adımlarını birlikte planlıyoruz: ${joinShort(details.applicationSteps, 3)}.`
      : locale === "de"
        ? `Wir planen den Ablauf gemeinsam: ${joinShort(details.applicationSteps, 3)}.`
        : `We plan the flow together: ${joinShort(details.applicationSteps, 3)}.`;

  return {
    metaTitle,
    breadcrumbs: { home: labels.home, programs: labels.programs, country: countryLabel, program: program.title },
    badges: { primary: labels.badge1, secondary: labels.badge2 },
    hero: { title: program.title, location: countryLabel, institution: "Lotus Abroad" },
    overview: { title: labels.overview, paragraphs: [details.overview, overviewSecond] },
    requirements: {
      title: labels.requirements,
      items: [
        { title: locale === "tr" ? "Kimler için?" : locale === "de" ? "Für wen?" : "Who is this for?", body: joinShort(details.whoFor, 3) },
        { title: labels.duration, body: details.duration },
        { title: labels.work, body: workRights },
        { title: labels.docs, body: joinShort(details.requiredDocuments, 4) },
      ],
    },
    timeline: {
      title: labels.timeline,
      steps: [
        { title: labels.stepTitles[0], date: labels.stepDates[0], body: details.applicationSteps[0] ?? "" },
        { title: labels.stepTitles[1], date: labels.stepDates[1], body: details.applicationSteps[1] ?? "" },
        { title: labels.stepTitles[2], date: labels.stepDates[2], body: details.applicationSteps[2] ?? "" },
        { title: labels.stepTitles[3], date: labels.stepDates[3], body: details.applicationSteps[3] ?? "" },
      ],
    },
    lotusDifference: {
      title: labels.lotusDiff,
      items: [
        { icon: "support_agent", title: details.keyAdvantages[0] ? (locale === "tr" ? "Birebir danışmanlık" : locale === "de" ? "1:1 Beratung" : "1:1 consulting") : (locale === "tr" ? "Birebir danışmanlık" : locale === "de" ? "1:1 Beratung" : "1:1 consulting"), body: details.keyAdvantages[0] ?? details.feesAndVisa },
        { icon: "work", title: details.keyAdvantages[1] ? (locale === "tr" ? "Süreç yönetimi" : locale === "de" ? "Prozessmanagement" : "Process management") : (locale === "tr" ? "Süreç yönetimi" : locale === "de" ? "Prozessmanagement" : "Process management"), body: details.keyAdvantages[1] ?? workRights },
      ],
    },
    pricing: {
      title: labels.costs,
      headers: { item: labels.item, frequency: labels.frequency, estimatedCost: labels.estimated },
      rows: [
        { item: labels.programFee, frequency: "-", cost: labels.variable },
        { item: labels.accommodation, frequency: "-", cost: labels.variable },
        { item: labels.insurance, frequency: "-", cost: labels.variable },
        { item: labels.visaFees, frequency: "-", cost: labels.variable },
        { item: labels.lotusFee, frequency: locale === "tr" ? "Tek sefer" : locale === "de" ? "Einmalig" : "One-time", cost: labels.contactQuote, emphasize: true },
      ],
      footnote: details.feesAndVisa,
    },
    video: { title: labels.video, cardTitle: labels.videoTitle, cardSubtitle: labels.videoSubtitle },
    faq: {
      title: labels.faq,
      items: [
        { q: labels.q1, a: workRights },
        { q: labels.q2, a: joinShort(details.requiredDocuments, 8) },
        { q: labels.q3, a: joinShort(details.applicationSteps, 6) },
      ],
    },
    sidebar: {
      tuitionLabel: labels.tuition,
      tuitionValue: labels.variable,
      tuitionUnit: "",
      stats: [
        { label: labels.duration, value: details.duration },
        { label: labels.work, value: locale === "tr" ? "Yerel kurallara göre" : locale === "de" ? "Je nach Regeln" : "By local rules" },
        { label: labels.docs, value: `${details.requiredDocuments.length}+` },
        { label: labels.response, value: labels.responseValue, valueClassName: "text-red-500" },
      ],
      primaryCta: labels.cta1,
      secondaryCta: labels.cta2,
      socialProof: labels.social,
    },
    contactWidget: { hint: labels.needHelp, expertLine: labels.expertLine },
    related: {
      title: labels.related,
      viewAll: labels.viewAll,
      cards: [
        {
          city: countryLabel,
          degree: locale === "tr" ? "Program" : locale === "de" ? "Programm" : "Program",
          title: otherPrograms[0].title,
          school: otherPrograms[0].tagline,
          duration: otherPrograms[0].details.duration,
          fee: locale === "tr" ? "Detaylar" : locale === "de" ? "Details" : "Details",
        },
        {
          city: countryLabel,
          degree: locale === "tr" ? "Program" : locale === "de" ? "Programm" : "Program",
          title: otherPrograms[1].title,
          school: otherPrograms[1].tagline,
          duration: otherPrograms[1].details.duration,
          fee: locale === "tr" ? "Detaylar" : locale === "de" ? "Details" : "Details",
        },
        {
          city: countryLabel,
          degree: locale === "tr" ? "Program" : locale === "de" ? "Programm" : "Program",
          title: otherPrograms[2].title,
          school: otherPrograms[2].tagline,
          duration: otherPrograms[2].details.duration,
          fee: locale === "tr" ? "Detaylar" : locale === "de" ? "Details" : "Details",
        },
      ],
    },
    footer: {
      links: labels.footerLinks.map((label) => ({ label })),
      copyright: labels.copyright,
    },
  };
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const allLocales = (locales ?? ["tr", "en", "de"]) as AppLocale[];
  const paths = allLocales.flatMap((locale) => {
    const catalog = getProgramCatalog(locale);
    return COUNTRY_ORDER.flatMap((countryId) => {
      const countrySlug = COUNTRY_SLUG[countryId];
      const programs = catalog[countryId]?.programs ?? [];
      return programs.map((program) => ({
        params: { country: countrySlug, program: program.id },
        locale,
      }));
    });
  });

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<PageProps> = async (context) => {
  const locale = normalizeLocale(context.locale) as AppLocale;
  const countrySlug = typeof context.params?.country === "string" ? context.params.country : "";
  const programId = typeof context.params?.program === "string" ? context.params.program : "";
  const countryId = SLUG_TO_COUNTRY[countrySlug];

  if (!countryId || !programId) return { notFound: true };

  const program = getProgramOrNull(locale, countryId, programId);
  if (!program) return { notFound: true };

  return {
    props: {
      content: buildContent(locale, countryId, program),
    },
  };
};

export default function ProgramDetailTemplateRoute({ content }: PageProps) {
  const router = useRouter();
  const locale = normalizeLocale(router.locale);
  return <ProgramDetailTemplatePage content={content} key={locale} />;
}

