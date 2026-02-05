import type { AppLocale } from "./i18n";
import { normalizeLocale } from "./i18n";

export type ProgramDetails = {
  overview: string;
  whoFor: string[];
  keyAdvantages: string[];
  duration: string;
  workRights?: string;
  applicationSteps: string[];
  requiredDocuments: string[];
  feesAndVisa: string;
  notes?: string;
};

export type Program = {
  id: string;
  title: string;
  tagline: string;
  details: ProgramDetails;
  heroImageUrl?: string;
  badge?: "Shared" | "Popular" | "New";
};

export type CountryPrograms = {
  heroImageUrl: string;
  programs: readonly Program[];
};

export const COUNTRY_ORDER = [
  "Germany",
  "USA",
  "Netherlands",
  "United Kingdom",
  "Canada",
  "Ireland",
  "Malta",
] as const;

export type CountryId = (typeof COUNTRY_ORDER)[number];

type Localized<T> = Record<AppLocale, T>;

type ProgramSource = {
  id: string;
  badge?: Program["badge"];
  title: Localized<string>;
  tagline: Localized<string>;
  heroImageUrl?: string;
  getDetails: (locale: AppLocale) => ProgramDetails;
};

type CountrySource = {
  heroImageUrl: string;
  programs: readonly ProgramSource[];
};

const DEFAULT_STEPS: Localized<string[]> = {
  tr: [
    "Ücretsiz profil değerlendirmesi ve uygunluk kontrolü",
    "Evrak hazırlığı + uygunluk doğrulaması",
    "Başvuru gönderimi ve takip",
    "Vize & seyahat planlama (uygunsa)",
    "Uçuş öncesi bilgilendirme + varış desteği",
  ],
  en: [
    "Free profile review & eligibility check",
    "Document preparation + eligibility validation",
    "Application submission & follow-up",
    "Visa & travel planning (if applicable)",
    "Pre-departure briefing + arrival support",
  ],
  de: [
    "Kostenlose Profilprüfung & Eignungscheck",
    "Unterlagen vorbereiten + Eignung bestätigen",
    "Bewerbung einreichen & nachverfolgen",
    "Visa- & Reiseplanung (falls zutreffend)",
    "Vorbereitung vor Abreise + Unterstützung nach Ankunft",
  ],
};

const BASE_DOCS: Localized<string[]> = {
  tr: [
    "Pasaport (en az 12 ay geçerli)",
    "CV + motivasyon mektubu",
    "Diploma ve transkriptler (gerekirse tercümeli)",
    "Finansal yeterlilik / sponsor evrakları (gerekirse)",
  ],
  en: [
    "Passport (valid for at least 12 months)",
    "CV + motivation letter",
    "Diploma and transcripts (translated if needed)",
    "Proof of funds / sponsor documents (if required)",
  ],
  de: [
    "Reisepass (mind. 12 Monate gültig)",
    "Lebenslauf + Motivationsschreiben",
    "Diplom und Transkripte (ggf. übersetzt)",
    "Finanzierungsnachweis / Sponsorunterlagen (falls erforderlich)",
  ],
};

function unique(items: string[]) {
  const seen = new Set<string>();
  const result: string[] = [];
  for (const item of items) {
    if (seen.has(item)) continue;
    seen.add(item);
    result.push(item);
  }
  return result;
}

function detailsBase(
  locale: AppLocale,
  input: Omit<ProgramDetails, "applicationSteps" | "requiredDocuments"> & {
    applicationSteps?: string[];
    requiredDocuments?: string[];
  },
): ProgramDetails {
  return {
    overview: input.overview,
    whoFor: input.whoFor,
    keyAdvantages: input.keyAdvantages,
    duration: input.duration,
    workRights: input.workRights,
    applicationSteps: input.applicationSteps ?? DEFAULT_STEPS[locale],
    requiredDocuments: unique([...(input.requiredDocuments ?? []), ...BASE_DOCS[locale]]),
    feesAndVisa: input.feesAndVisa,
    notes: input.notes,
  };
}

const COUNTRY_LABELS: Localized<Record<CountryId, string>> = {
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

function academicDetails(opts: {
  countryId: CountryId;
  level: "bachelor" | "master" | "phd";
  duration: Localized<string>;
  workRights?: Localized<string>;
}): ProgramSource["getDetails"] {
  return (locale) => {
    const country = COUNTRY_LABELS[locale][opts.countryId];
    const levelLabel =
      locale === "tr"
        ? opts.level === "bachelor"
          ? "Lisans"
          : opts.level === "master"
            ? "Yüksek Lisans"
            : "Doktora (PhD)"
        : locale === "de"
          ? opts.level === "bachelor"
            ? "Bachelor"
            : opts.level === "master"
              ? "Master"
              : "Promotion (PhD)"
          : opts.level === "bachelor"
            ? "Bachelor's"
            : opts.level === "master"
              ? "Master's"
              : "PhD";

    const overview =
      locale === "tr"
        ? `${country} ${levelLabel} programlarında hedefinize uygun bölüm seçimi, başvuru dosyası, kabul stratejisi ve vize planı birlikte yürütülür.`
        : locale === "de"
          ? `Für ${country} ${levelLabel}-Programme begleiten wir Programmauswahl, Bewerbungsunterlagen, Zulassungsstrategie und Visa-Planung.`
          : `For ${country} ${levelLabel} programs, we guide program selection, application files, admission strategy, and visa planning.`;

    const whoFor =
      locale === "tr"
        ? [
            `${country}’da ${levelLabel.toLowerCase()} hedefleyen adaylar`,
            "Net zaman planı ve dosya standardı isteyenler",
            "Burs/finansman ve vize adımlarını sistemli yönetmek isteyenler",
          ]
        : locale === "de"
          ? [
              `Bewerber:innen für ${levelLabel}-Programme in ${country}`,
              "Personen mit Bedarf an klarer Timeline und sauberen Unterlagen",
              "Kandidat:innen, die Finanzierung und Visa-Schritte strukturiert planen möchten",
            ]
          : [
              `Applicants targeting ${levelLabel} programs in ${country}`,
              "Those who want a clear timeline and clean documentation",
              "Candidates who want structured funding and visa planning",
            ];

    const keyAdvantages =
      locale === "tr"
        ? [
            "Profil odaklı program/okul listesi",
            "Evrak ve deadline yönetimi",
            "Risk odaklı vize ve dosya kontrolü",
          ]
        : locale === "de"
          ? [
              "Program-/Schulliste nach Profil",
              "Dokumente & Deadlines im Griff",
              "Risikoorientierte Visa- und Unterlagenprüfung",
            ]
          : [
              "Profile-fit program/school shortlist",
              "Document and deadline management",
              "Risk-focused visa and file review",
            ];

    const feesAndVisa =
      locale === "tr"
        ? "Ücretler kuruma göre değişir. Vize için finansal yeterlilik, sigorta ve evrak seti kritik olabilir; adımları netleştiririz."
        : locale === "de"
          ? "Gebühren variieren je Institution. Für das Visum können Finanzierungsnachweis, Versicherung und Unterlagen entscheidend sein; wir klären die Schritte."
          : "Fees vary by institution. Proof of funds, insurance, and documentation may be critical for the visa; we clarify the steps.";

    return detailsBase(locale, {
      overview,
      whoFor,
      keyAdvantages,
      duration: opts.duration[locale],
      workRights: opts.workRights?.[locale],
      feesAndVisa,
    });
  };
}

function visaDetails(countryId: CountryId): ProgramSource["getDetails"] {
  return (locale) => {
    const country = COUNTRY_LABELS[locale][countryId];
    return detailsBase(locale, {
      overview:
        locale === "tr"
          ? `${country} için vize sürecini netleştirir; evrak setinizi konsolosluk beklentilerine göre düzenler ve zaman planınızı birlikte oluştururuz.`
          : locale === "de"
            ? `Wir klären den Visaprozess für ${country}, strukturieren Unterlagen nach Konsulatsanforderungen und erstellen eine klare Timeline.`
            : `We clarify the visa flow for ${country}, organize your documents to match consulate expectations, and build a clear timeline.`,
      whoFor:
        locale === "tr"
          ? [`${country} vizesine başvuracak adaylar`, "Evrak ve randevu planında destek isteyenler"]
          : locale === "de"
            ? [`Bewerber:innen für ein Visum nach ${country}`, "Support bei Unterlagen und Terminplanung"]
            : [
                `Applicants applying for a ${country} visa`,
                "Those needing document and appointment planning support",
              ],
      keyAdvantages:
        locale === "tr"
          ? ["Checklist + timeline", "Dosya kontrolü", "Mülakat/biyometri hazırlığı"]
          : locale === "de"
            ? ["Checkliste + Timeline", "Unterlagenprüfung", "Interview/Biometrics Vorbereitung"]
            : ["Checklist + timeline", "File review", "Interview/biometrics preparation"],
      duration:
        locale === "tr"
          ? "Ülkeye göre değişir (çoğu rota 2–8 hafta planlama gerektirir)"
          : locale === "de"
            ? "Je nach Land (meist 2–8 Wochen Planung)"
            : "Varies by country (most routes require 2–8 weeks of planning)",
      workRights:
        locale === "tr"
          ? "Vize türüne göre değişir."
          : locale === "de"
            ? "Abhängig vom Visatyp."
            : "Depends on visa type.",
      feesAndVisa:
        locale === "tr"
          ? "Konsolosluk/vize ücretleri ülkeye göre değişir. Hizmet kapsamını şeffaf şekilde planlarız."
          : locale === "de"
            ? "Konsular-/Visa-Gebühren variieren. Umfang und Schritte bleiben transparent."
            : "Consular/visa fees vary. We keep scope and steps transparent.",
    });
  };
}

const sharedAuPair: ProgramSource = {
  id: "au-pair",
  badge: "Shared",
  title: { tr: "Au Pair Programı", en: "Au Pair Program", de: "Au-pair Programm" },
  tagline: {
    tr: "Bir aile yanında yaşayın, dilinizi geliştirin ve kültürel deneyim kazanın.",
    en: "Live with a host family, improve your language, and gain cultural experience.",
    de: "Bei einer Gastfamilie leben, Sprache verbessern und Erfahrung sammeln.",
  },
  getDetails: (locale) =>
    detailsBase(locale, {
      overview:
        locale === "tr"
          ? "Au pair; ev sahibi aile yanında konaklayıp çocuk bakımı ve hafif ev işlerine destek verirken aynı zamanda dil kurslarına katılabildiğiniz yapılandırılmış bir kültürel değişim rotasıdır."
          : locale === "de"
            ? "Au-pair ist eine strukturierte Austauschroute: bei einer Gastfamilie wohnen, Kinderbetreuung/leichte Hausarbeiten unterstützen und Sprachkurse besuchen."
            : "Au pair is a structured exchange route: live with a host family, support childcare/light tasks, and attend language courses.",
      whoFor:
        locale === "tr"
          ? ["Bütçe dostu yurtdışı deneyimi isteyenler", "Günlük pratikle dili geliştirmek isteyenler"]
          : locale === "de"
            ? ["Budgetfreundlicher Auslandsaufenthalt", "Sprache durch Alltagspraxis verbessern"]
            : ["Budget-friendly abroad experience", "Improve language through daily immersion"],
      keyAdvantages:
        locale === "tr"
          ? ["Konaklama + yemek çoğu zaman aile tarafından karşılanır", "Planlı süreç", "Hızlı dil gelişimi"]
          : locale === "de"
            ? ["Unterkunft/Verpflegung oft inklusive", "Strukturierter Ablauf", "Schneller Sprachfortschritt"]
            : ["Accommodation/meals often included", "Structured process", "Fast language improvement"],
      duration: locale === "tr" ? "6–12 ay (yaygın)" : locale === "de" ? "6–12 Monate" : "6–12 months",
      workRights:
        locale === "tr"
          ? "Görevler aile anlaşması ve yerel kurallarla belirlenir; harçlık ödemesi yapılır."
          : locale === "de"
            ? "Aufgaben nach Vereinbarung und lokalen Regeln; Taschengeld wird gezahlt."
            : "Duties depend on agreement/local rules; a stipend is provided.",
      feesAndVisa:
        locale === "tr"
          ? "Vize, sigorta ve yerleştirme ücretleri ülkeye göre değişir; doğru vize türünü birlikte netleştiririz."
          : locale === "de"
            ? "Visa-, Versicherungs- und Vermittlungsgebühren variieren; wir klären den passenden Visatyp."
            : "Visa, insurance, and placement fees vary; we help choose the right visa type.",
      notes:
        locale === "tr"
          ? "Almanya ve ABD altında ortak program olarak listelenir."
          : locale === "de"
            ? "Als gemeinsames Programm unter Deutschland und USA gelistet."
            : "Listed as a shared program under Germany and the USA.",
    }),
};

const HERO: Record<CountryId, string> = {
  Germany:
    "https://images.unsplash.com/photo-1528728329032-2972f65dfb3f?auto=format&fit=crop&w=2400&q=80",
  USA:
    "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=2400&q=80",
  Netherlands:
    "https://images.unsplash.com/photo-1468436385273-8abca6dfd8d3?auto=format&fit=crop&w=2400&q=80",
  "United Kingdom":
    "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=2400&q=80",
  Canada:
    "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=2400&q=80",
  Ireland:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/O%27Brien%27s_Tower_at_Cliffs_of_Moher.jpg/2400px-O%27Brien%27s_Tower_at_Cliffs_of_Moher.jpg",
  Malta:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/A_Glowing_Night_Over_the_Grand_Harbour.jpg/2400px-A_Glowing_Night_Over_the_Grand_Harbour.jpg",
};

const GERMANY_PROGRAMS: readonly ProgramSource[] = [
  {
    id: "ausbildung",
    badge: "Popular",
    heroImageUrl:
      "https://unsplash.com/photos/k9Dc5zT1Gq0/download?force=true",
    title: {
      tr: "Ausbildung (Maaşlı Mesleki Eğitim)",
      en: "Ausbildung (Paid Vocational Training)",
      de: "Ausbildung (Vergütete Berufsausbildung)",
    },
    tagline: {
      tr: "Teori + işyeri pratiğiyle meslek edin, maaş al.",
      en: "Combine theory with company training and earn a salary.",
      de: "Theorie + Praxis im Betrieb und dabei Vergütung erhalten.",
    },
    getDetails: (locale) =>
      detailsBase(locale, {
        overview:
          locale === "tr"
            ? "Ausbildung, Almanya’nın maaşlı mesleki eğitim modelidir. Okul + işyeri pratiğini birleştirir."
            : locale === "de"
              ? "Ausbildung ist das vergütete Berufsbildungsmodell in Deutschland: Berufsschule + Praxis im Betrieb."
              : "Ausbildung is Germany’s paid vocational training model combining school and on-the-job practice.",
        whoFor:
          locale === "tr"
            ? ["Pratik, meslek odaklı rota isteyenler", "Okurken çalışmayı tercih edenler"]
            : locale === "de"
              ? ["Praxisnahe, berufsorientierte Route", "Während der Ausbildung arbeiten"]
              : ["Practical, job-focused route", "Work while learning"],
        keyAdvantages:
          locale === "tr"
            ? ["Program süresince maaş", "Mezuniyet sonrası güçlü istihdam", "Net sözleşme ve süreç"]
            : locale === "de"
              ? ["Vergütung während der Ausbildung", "Gute Jobchancen danach", "Klare Vertragsstruktur"]
              : ["Salary during the program", "Strong job prospects", "Clear contract structure"],
        duration: locale === "tr" ? "2–3,5 yıl" : locale === "de" ? "2–3,5 Jahre" : "2–3.5 years",
        workRights:
          locale === "tr"
            ? "Eğitim sözleşmesi kapsamında çalışma; maaş ve saatler işverene göre belirlenir."
            : locale === "de"
              ? "Arbeit im Rahmen des Ausbildungsvertrags; Bedingungen je Arbeitgeber."
              : "Work is covered under the training contract; terms vary by employer.",
        feesAndVisa:
          locale === "tr"
            ? "Ana maliyetler tercüme, sigorta ve vize ücretleridir; maaş yaşam giderlerini destekleyebilir."
            : locale === "de"
              ? "Hauptkosten: Übersetzungen, Versicherung, Visa-Gebühren; Vergütung kann Lebenshaltungskosten decken."
              : "Main costs are translations, insurance, and visa fees; salary can support living costs.",
      }),
  },
  {
    id: "bachelors",
    title: { tr: "Lisans Programları", en: "Bachelor’s Degree", de: "Bachelorstudium" },
    tagline: {
      tr: "Uygun maliyetli ve güçlü akademik ekosistem.",
      en: "Strong academics with cost-effective options.",
      de: "Starke Akademik mit oft kosteneffizienten Optionen.",
    },
    getDetails: academicDetails({
      countryId: "Germany",
      level: "bachelor",
      duration: { tr: "Genellikle 3 yıl", en: "Typically 3 years", de: "Meist 3 Jahre" },
    }),
  },
  {
    id: "masters",
    title: { tr: "Yüksek Lisans", en: "Master’s Degree", de: "Masterstudium" },
    tagline: {
      tr: "Uzmanlaşma ve Avrupa kariyeri için güçlü fırsatlar.",
      en: "Specialize and access European career networks.",
      de: "Spezialisieren und europäische Karrierenetzwerke nutzen.",
    },
    getDetails: academicDetails({
      countryId: "Germany",
      level: "master",
      duration: { tr: "1–2 yıl", en: "1–2 years", de: "1–2 Jahre" },
    }),
  },
  {
    id: "phd",
    title: { tr: "Doktora (PhD)", en: "PhD Programs", de: "Promotion (PhD)" },
    tagline: {
      tr: "Araştırma odaklı rotalar ve danışman eşleştirme.",
      en: "Research-focused routes and supervisor matching.",
      de: "Forschungsorientierte Route und Betreuer-Matching.",
    },
    getDetails: academicDetails({
      countryId: "Germany",
      level: "phd",
      duration: { tr: "3–5 yıl", en: "3–5 years", de: "3–5 Jahre" },
    }),
  },
  sharedAuPair,
  {
    id: "degree-recognition",
    title: { tr: "Denklik (Diploma Tanıma)", en: "Degree Recognition", de: "Anerkennung (Denklik)" },
    tagline: {
      tr: "Resmi tanıma süreçleri ve uygunluk kontrolü.",
      en: "Guidance for official recognition steps.",
      de: "Begleitung bei Anerkennungsprozessen.",
    },
    getDetails: (locale) =>
      detailsBase(locale, {
        overview:
          locale === "tr"
            ? "Denklik; diplomanın/mesleki yeterliliğin Almanya’daki karşılığının değerlendirilmesidir. Süreç mesleğe göre değişir."
            : locale === "de"
              ? "Anerkennung prüft, wie Ihr Abschluss in Deutschland eingeordnet wird. Anforderungen variieren je Beruf."
              : "Recognition checks how your qualification maps to German standards. Requirements vary by profession.",
        whoFor:
          locale === "tr"
            ? ["Regule mesleklerde çalışmak isteyen mezunlar", "Kariyer geçişi planlayan profesyoneller"]
            : locale === "de"
              ? ["Reglementierte Berufe", "Professionals mit Karrierewechsel"]
              : ["Regulated professions", "Professionals planning a career transition"],
        keyAdvantages:
          locale === "tr"
            ? ["Doğru kurum ve evrak seti", "Daha az gecikme", "Net adımlar ve takip"]
            : locale === "de"
              ? ["Passende Stelle & Unterlagen", "Weniger Verzögerung", "Klare Schritte und Follow-up"]
              : ["Right institution and docs", "Less delay", "Clear steps and follow-up"],
        duration:
          locale === "tr"
            ? "Kurum ve mesleğe göre değişir"
            : locale === "de"
              ? "Je nach Stelle und Beruf"
              : "Varies by institution and profession",
        feesAndVisa:
          locale === "tr"
            ? "Kurum ücretleri ve tercüme maliyetleri değişkendir. Vize rotası hedefe göre planlanır."
            : locale === "de"
              ? "Gebühren und Übersetzungen variieren. Visa-Route wird nach Ziel geplant."
              : "Fees and translations vary. Visa route is planned based on your target.",
      }),
  },
  {
    id: "nurse-doctor-placement",
    title: {
      tr: "Hemşire & Doktor İş Yerleştirme",
      en: "Nurse & Doctor Job Placement",
      de: "Jobvermittlung: Pflege & Ärzt:innen",
    },
    tagline: {
      tr: "Sağlık alanında iş yerleştirme ve süreç desteği.",
      en: "Placement and process support for healthcare roles.",
      de: "Vermittlung und Prozess-Support im Gesundheitsbereich.",
    },
    getDetails: (locale) =>
      detailsBase(locale, {
        overview:
          locale === "tr"
            ? "Sağlık alanında iş hedefleyen adaylar için; uygunluk, evrak düzeni, denklik ve vize adımlarını bütünsel planlarız."
            : locale === "de"
              ? "Für Gesundheitsberufe planen wir Eignung, Unterlagen, Anerkennung und Visa-Schritte ganzheitlich."
              : "For healthcare candidates, we plan eligibility, documentation, recognition and visa steps end-to-end.",
        whoFor:
          locale === "tr"
            ? ["Hemşireler ve doktorlar", "Denklik ve iş arama sürecinde destek isteyenler"]
            : locale === "de"
              ? ["Pflegekräfte und Ärzt:innen", "Support bei Anerkennung und Jobsuche"]
              : ["Nurses and doctors", "Applicants needing structured recognition/job search support"],
        keyAdvantages:
          locale === "tr"
            ? ["Profil odaklı rota", "Sistemli dosya yönetimi", "İşveren beklentisine uygun paket"]
            : locale === "de"
              ? ["Route nach Profil", "System bei Unterlagen", "Bewerbung passend zum Arbeitgeber"]
              : ["Profile-based route", "Systematic file management", "Employer-aligned package"],
        duration:
          locale === "tr"
            ? "Profile ve kurumlara göre değişir"
            : locale === "de"
              ? "Je nach Profil und Institution"
              : "Varies by profile and institution",
        feesAndVisa:
          locale === "tr"
            ? "Kurum/denklik ücretleri ve vize maliyetleri değişkendir; süreci şeffaf planlarız."
            : locale === "de"
              ? "Gebühren und Visa-Kosten variieren; wir planen transparent."
              : "Fees and visa costs vary; we keep the process transparent.",
      }),
  },
  {
    id: "visa-consulting",
    title: { tr: "Vize Danışmanlığı", en: "Visa Consulting", de: "Visaberatung" },
    tagline: {
      tr: "Vize stratejisi, evrak hazırlığı ve randevu desteği.",
      en: "Visa strategy, documents, and appointment support.",
      de: "Visa-Strategie, Unterlagen und Termin-Support.",
    },
    getDetails: visaDetails("Germany"),
  },
];

const USA_PROGRAMS: readonly ProgramSource[] = [
  {
    id: "language-courses",
    title: { tr: "Dil Kursları", en: "Language Courses", de: "Sprachkurse" },
    tagline: {
      tr: "Kısa/uzun süreli dil eğitimi ve vize planı.",
      en: "Language study routes with visa planning.",
      de: "Sprachkurs-Routen mit Visa-Planung.",
    },
    getDetails: (locale) =>
      detailsBase(locale, {
        overview:
          locale === "tr"
            ? "ABD dil okulları; yoğun programlarla kısa sürede seviyenizi yükseltmenizi hedefler. Süre ve kuruma göre vize gereklilikleri değişir."
            : locale === "de"
              ? "Sprachschulen in den USA bieten intensive Programme. Visa-Anforderungen hängen von Dauer und Schule ab."
              : "US language schools offer intensive programs. Visa requirements vary by duration and institution.",
        whoFor:
          locale === "tr"
            ? ["İngilizce seviyesini hızlı yükseltmek isteyenler", "Akademik/iş hedefi için temel isteyenler"]
            : locale === "de"
              ? ["Englisch schnell verbessern", "Basis für akademische/berufliche Ziele"]
              : ["Improve English quickly", "Build a base for academic/career goals"],
        keyAdvantages:
          locale === "tr"
            ? ["Esnek başlangıç tarihleri (kuruma göre)", "Seviye bazlı sınıflar", "Şehir seçenekleri"]
            : locale === "de"
              ? ["Flexible Starttermine", "Niveau-Klassen", "Viele Städte"]
              : ["Flexible start dates", "Level-based classes", "Many city options"],
        duration:
          locale === "tr"
            ? "4–48 hafta (programa göre)"
            : locale === "de"
              ? "4–48 Wochen (je nach Programm)"
              : "4–48 weeks (depends on program)",
        workRights:
          locale === "tr"
            ? "Vize türüne göre değişir (çoğu rota kısıtlıdır)."
            : locale === "de"
              ? "Abhängig vom Visum (oft eingeschränkt)."
              : "Depends on visa type (often limited).",
        feesAndVisa:
          locale === "tr"
            ? "Program ücreti, konaklama ve sigorta değişir. Vize evrak seti ve timeline planlanır."
            : locale === "de"
              ? "Gebühren, Unterkunft und Versicherung variieren. Unterlagen und Timeline werden geplant."
              : "Tuition, accommodation, and insurance vary. We plan documents and timeline.",
      }),
  },
  {
    id: "work-and-travel",
    badge: "Popular",
    title: { tr: "Work and Travel", en: "Work and Travel", de: "Work and Travel" },
    tagline: {
      tr: "Sezonluk çalışma + seyahat deneyimi.",
      en: "Seasonal work combined with travel.",
      de: "Saisonarbeit kombiniert mit Reisen.",
    },
    getDetails: (locale) =>
      detailsBase(locale, {
        overview:
          locale === "tr"
            ? "Uygun öğrencilerin ABD’de sezonluk çalışıp sonrasında seyahat edebildiği sponsor destekli program."
            : locale === "de"
              ? "Sponsor-gestütztes Saisonprogramm: arbeiten in den USA und anschließend reisen (bei Eignung)."
              : "Sponsor-supported seasonal program: work in the US and travel afterwards (if eligible).",
        whoFor:
          locale === "tr"
            ? ["Üniversite öğrencileri (uygunluk şartlarına göre)", "Kültürel değişim + deneyim isteyenler"]
            : locale === "de"
              ? ["Studierende (Eignung erforderlich)", "Austausch + Erfahrung"]
              : ["University students (eligibility required)", "Cultural exchange + experience"],
        keyAdvantages:
          locale === "tr"
            ? ["Sponsor destekli süreç", "İngilizce pratiği", "Kısa sürede güçlü deneyim"]
            : locale === "de"
              ? ["Sponsor-Support", "Englischpraxis", "Starkes Erlebnis in kurzer Zeit"]
              : ["Sponsor support", "English practice", "High impact in a short time"],
        duration: locale === "tr" ? "Sezonluk" : locale === "de" ? "Saisonal" : "Seasonal",
        workRights:
          locale === "tr"
            ? "Çalışma izni program kapsamındadır ve sponsor kurallarına tabidir."
            : locale === "de"
              ? "Arbeitserlaubnis im Programmrahmen, nach Sponsor-Regeln."
              : "Work authorization is included under the program and sponsor rules.",
        feesAndVisa:
          locale === "tr"
            ? "Sponsor/SEVIS, vize, uçuş ve konaklama maliyetleri planlanır; evrak ve mülakat hazırlığı yapılır."
            : locale === "de"
              ? "Planung inkl. Sponsor/SEVIS, Visa, Flug und Unterkunft; Unterstützung bei Unterlagen und Interview."
              : "We plan sponsor/SEVIS, visa, flight and accommodation; support documents and interview prep.",
      }),
  },
  {
    id: "camp-usa",
    title: { tr: "Camp USA", en: "Camp USA", de: "Camp USA" },
    tagline: {
      tr: "Yaz kamplarında staff/counselor olarak çalışma.",
      en: "Work as staff/counselor at summer camps.",
      de: "Arbeiten als Staff/Counselor in Sommercamps.",
    },
    getDetails: (locale) =>
      detailsBase(locale, {
        overview:
          locale === "tr"
            ? "Yaz kamplarında çalışıp yapılandırılmış bir ortamda kültürel deneyim kazanacağınız program."
            : locale === "de"
              ? "Programm: im Sommercamp arbeiten und kulturelle Erfahrung sammeln."
              : "Program: work at summer camps and gain cultural experience.",
        whoFor:
          locale === "tr"
            ? ["Yaz dönemini verimli değerlendirmek isteyenler", "Çocuklarla çalışmaya uygun adaylar"]
            : locale === "de"
              ? ["Sommer sinnvoll nutzen", "Gern mit Kindern arbeiten"]
              : ["Use summer efficiently", "Applicants comfortable with childcare"],
        keyAdvantages:
          locale === "tr"
            ? ["Sponsor destekli süreç", "İngilizce pratiği", "Güçlü kültürel deneyim"]
            : locale === "de"
              ? ["Sponsor-Support", "Englischpraxis", "Starkes kulturelles Erlebnis"]
              : ["Sponsor support", "English practice", "Strong cultural experience"],
        duration: locale === "tr" ? "Yaz sezonu" : locale === "de" ? "Sommersaison" : "Summer season",
        workRights:
          locale === "tr"
            ? "Çalışma izni program kapsamındadır ve sponsor kurallarına tabidir."
            : locale === "de"
              ? "Arbeitserlaubnis im Programmrahmen, nach Sponsor-Regeln."
              : "Work authorization is included under the program and sponsor rules.",
        feesAndVisa:
          locale === "tr"
            ? "Sponsor ve vize adımları programa göre değişir. Evrak ve mülakat hazırlığı sunarız."
            : locale === "de"
              ? "Sponsor- und Visa-Schritte variieren. Wir unterstützen Unterlagen und Interview."
              : "Sponsor and visa steps vary. We support documents and interview prep.",
      }),
  },
  {
    id: "h2b",
    title: { tr: "H-2B Çalışma Vizesi", en: "H-2B Work Visa", de: "H-2B Arbeitsvisum" },
    tagline: {
      tr: "İşveren sponsorluğu ile sezonluk çalışma rotası.",
      en: "Employer-sponsored seasonal work route.",
      de: "Arbeitgebergesponserte saisonale Arbeitsroute.",
    },
    getDetails: (locale) =>
      detailsBase(locale, {
        overview:
          locale === "tr"
            ? "H-2B; sezonluk/temporary pozisyonlar için işveren sponsorluğu ile ilerleyen çalışma vizesi rotasıdır."
            : locale === "de"
              ? "H-2B ist eine arbeitgebergesponserte Route für temporäre/saisonale Jobs."
              : "H-2B is an employer-sponsored route for temporary/seasonal roles.",
        whoFor:
          locale === "tr"
            ? ["Sezonluk işlerde çalışmak isteyen adaylar", "Sponsorlu rota arayanlar"]
            : locale === "de"
              ? ["Saisonarbeit", "Route mit Arbeitgeber-Sponsoring"]
              : ["Seasonal work", "Employer-sponsored route seekers"],
        keyAdvantages:
          locale === "tr"
            ? ["Net sözleşme ve süreç", "Dosya ve takip desteği", "Uygunluk kontrolü"]
            : locale === "de"
              ? ["Klarer Vertrag", "Unterlagen & Follow-up", "Eignungscheck"]
              : ["Clear contract", "Documents & follow-up", "Eligibility check"],
        duration: locale === "tr" ? "Sezonluk" : locale === "de" ? "Saisonal" : "Seasonal",
        workRights:
          locale === "tr"
            ? "Onaylanan iş ve işveren kapsamında çalışma."
            : locale === "de"
              ? "Arbeit nur im genehmigten Job/Arbeitgeber."
              : "Work limited to approved employer/role.",
        feesAndVisa:
          locale === "tr"
            ? "Süreç işveren ve dönemlere göre değişir. Evrak seti ve zaman planını netleştiririz."
            : locale === "de"
              ? "Ablauf variiert je Arbeitgeber/Saison. Wir klären Unterlagen und Timing."
              : "Process varies by employer/season. We clarify documents and timing.",
      }),
  },
  {
    id: "university-bachelors",
    title: { tr: "Üniversite (Lisans)", en: "University (Bachelor’s)", de: "Universität (Bachelor)" },
    tagline: {
      tr: "Okul listesi, başvuru dosyası ve kabul stratejisi.",
      en: "School list, application file, and admission strategy.",
      de: "Schulliste, Unterlagen und Zulassungsstrategie.",
    },
    getDetails: academicDetails({
      countryId: "USA",
      level: "bachelor",
      duration: { tr: "Genellikle 4 yıl", en: "Typically 4 years", de: "Meist 4 Jahre" },
    }),
  },
  sharedAuPair,
  {
    id: "visa-consulting",
    title: { tr: "Vize Danışmanlığı", en: "Visa Consulting", de: "Visaberatung" },
    tagline: {
      tr: "Vize stratejisi, evrak hazırlığı ve randevu desteği.",
      en: "Visa strategy, documents, and appointment support.",
      de: "Visa-Strategie, Unterlagen und Termin-Support.",
    },
    getDetails: visaDetails("USA"),
  },
];

const NETHERLANDS_PROGRAMS: readonly ProgramSource[] = [
  {
    id: "summer-schools",
    title: {
      tr: "Yaz Okulları (Lisans & Yüksek Lisans)",
      en: "Summer Schools (Bachelor’s & Master’s)",
      de: "Summer Schools (Bachelor & Master)",
    },
    tagline: {
      tr: "Kısa süreli akademik programlar ve sertifika rotaları.",
      en: "Short academic programs and certificate routes.",
      de: "Kurze akademische Programme und Zertifikate.",
    },
    getDetails: (locale) =>
      detailsBase(locale, {
        overview:
          locale === "tr"
            ? "Yaz okulları; kısa sürede sertifika almak, üniversite deneyimi yaşamak ve uluslararası network kurmak için idealdir."
            : locale === "de"
              ? "Summer Schools: Zertifikat, Uni-Erfahrung und internationales Networking in kurzer Zeit."
              : "Summer schools are ideal to earn a certificate and build an international network in a short time.",
        whoFor:
          locale === "tr"
            ? ["Kısa süreli akademik deneyim isteyenler", "Dosyasını güçlendirmek isteyen adaylar"]
            : locale === "de"
              ? ["Kurze akademische Erfahrung", "Profil für Bewerbungen stärken"]
              : ["Short academic experience seekers", "Applicants strengthening their profile"],
        keyAdvantages:
          locale === "tr"
            ? ["Kısa sürede sertifika", "Uluslararası sınıflar", "Üniversite deneyimi"]
            : locale === "de"
              ? ["Zertifikat", "Internationale Klasse", "Uni-Exposure"]
              : ["Certificate", "International classroom", "University exposure"],
        duration: locale === "tr" ? "2–8 hafta" : locale === "de" ? "2–8 Wochen" : "2–8 weeks",
        feesAndVisa:
          locale === "tr"
            ? "Program ücretleri üniversiteye göre değişir. Vize ve konaklama planı birlikte yapılır."
            : locale === "de"
              ? "Gebühren variieren je Universität. Visa und Unterkunft werden gemeinsam geplant."
              : "Fees vary by university. We plan visa and accommodation together.",
      }),
  },
  {
    id: "bachelors",
    title: { tr: "Lisans Programları", en: "Bachelor’s Degree", de: "Bachelorstudium" },
    tagline: {
      tr: "İngilizce program seçenekleriyle uluslararası ortam.",
      en: "International environment with English-taught options.",
      de: "Internationales Umfeld mit englischen Programmen.",
    },
    getDetails: academicDetails({
      countryId: "Netherlands",
      level: "bachelor",
      duration: { tr: "3–4 yıl", en: "3–4 years", de: "3–4 Jahre" },
    }),
  },
  {
    id: "masters",
    title: { tr: "Yüksek Lisans", en: "Master’s Degree", de: "Masterstudium" },
    tagline: {
      tr: "Araştırma/uygulama odaklı İngilizce master programları.",
      en: "English-taught master programs with strong output.",
      de: "Englische Masterprogramme mit starkem Output.",
    },
    getDetails: academicDetails({
      countryId: "Netherlands",
      level: "master",
      duration: { tr: "1–2 yıl", en: "1–2 years", de: "1–2 Jahre" },
    }),
  },
  {
    id: "visa-consulting",
    title: { tr: "Vize Danışmanlığı", en: "Visa Consulting", de: "Visaberatung" },
    tagline: {
      tr: "Vize stratejisi, evrak hazırlığı ve randevu desteği.",
      en: "Visa strategy, documents, and appointment support.",
      de: "Visa-Strategie, Unterlagen und Termin-Support.",
    },
    getDetails: visaDetails("Netherlands"),
  },
];

const UK_PROGRAMS: readonly ProgramSource[] = [
  {
    id: "language-courses",
    title: { tr: "Dil Kursları", en: "Language Courses", de: "Sprachkurse" },
    tagline: {
      tr: "Yoğun programlarla İngilizceyi hızlandırın.",
      en: "Accelerate English with intensive courses.",
      de: "Englisch mit Intensivkursen beschleunigen.",
    },
    getDetails: (locale) =>
      detailsBase(locale, {
        overview:
          locale === "tr"
            ? "UK dil okulları; yoğun programlar ve güçlü immersion ortamıyla İngilizceyi hızlandırmak için idealdir."
            : locale === "de"
              ? "Sprachschulen im UK: intensive Programme und Immersion für schnellen Fortschritt."
              : "UK language schools offer intensive programs and immersion for fast progress.",
        whoFor:
          locale === "tr"
            ? ["Kısa sürede dil seviyesini yükseltmek isteyenler", "Akademik hedef için hazırlık yapanlar"]
            : locale === "de"
              ? ["Sprachniveau schnell erhöhen", "Vorbereitung auf akademische Ziele"]
              : ["Improve quickly", "Prepare for academic goals"],
        keyAdvantages:
          locale === "tr"
            ? ["Yoğun eğitim", "Immersion", "Esnek süre seçenekleri"]
            : locale === "de"
              ? ["Intensiv", "Immersion", "Flexible Dauer"]
              : ["Intensive", "Immersion", "Flexible duration"],
        duration: locale === "tr" ? "2–36 hafta" : locale === "de" ? "2–36 Wochen" : "2–36 weeks",
        feesAndVisa:
          locale === "tr"
            ? "Program ücreti ve konaklama değişkendir. Vize tipi ve evrak seti rotaya göre netleşir."
            : locale === "de"
              ? "Gebühren und Unterkunft variieren. Visum und Unterlagen hängen von der Route ab."
              : "Tuition and accommodation vary. Visa and documents depend on the route.",
      }),
  },
  {
    id: "bachelors",
    title: { tr: "Lisans Programları", en: "Bachelor’s Degree", de: "Bachelorstudium" },
    tagline: {
      tr: "Prestijli okullar ve güçlü kariyer ekosistemi.",
      en: "Prestigious schools with strong career ecosystems.",
      de: "Renommierte Hochschulen mit starkem Karrierenetzwerk.",
    },
    getDetails: academicDetails({
      countryId: "United Kingdom",
      level: "bachelor",
      duration: { tr: "3–4 yıl", en: "3–4 years", de: "3–4 Jahre" },
    }),
  },
  {
    id: "masters",
    badge: "Popular",
    title: { tr: "Yüksek Lisans", en: "Master’s Degree", de: "Masterstudium" },
    tagline: {
      tr: "Hızlı 1 yıllık yoğun programlar ve uzmanlaşma.",
      en: "Fast 1-year programs and specialization.",
      de: "Schnelle 1-jährige Programme und Spezialisierung.",
    },
    getDetails: academicDetails({
      countryId: "United Kingdom",
      level: "master",
      duration: { tr: "1 yıl (yaygın)", en: "1 year (common)", de: "1 Jahr (häufig)" },
    }),
  },
  {
    id: "visa-consulting",
    title: { tr: "Vize Danışmanlığı", en: "Visa Consulting", de: "Visaberatung" },
    tagline: {
      tr: "Vize stratejisi, evrak hazırlığı ve randevu desteği.",
      en: "Visa strategy, documents, and appointment support.",
      de: "Visa-Strategie, Unterlagen und Termin-Support.",
    },
    getDetails: visaDetails("United Kingdom"),
  },
];

const CANADA_PROGRAMS: readonly ProgramSource[] = [
  {
    id: "language-courses",
    title: { tr: "Dil Kursları", en: "Language Courses", de: "Sprachkurse" },
    tagline: {
      tr: "Dil eğitimi + rota planlama (kuruma göre).",
      en: "Language study + route planning (by institution).",
      de: "Sprachkurs + Routenplanung (je Institution).",
    },
    getDetails: (locale) =>
      detailsBase(locale, {
        overview:
          locale === "tr"
            ? "Kanada dil okulları; süre ve hedefe göre farklı vize rotalarıyla planlanır. Kurum seçimi ve bütçe planı önemlidir."
            : locale === "de"
              ? "Sprachschulen in Kanada: Visa-Route je nach Dauer/Ziel. Schulwahl und Budget sind wichtig."
              : "Canadian language routes depend on duration/goals. School selection and budgeting matter.",
        whoFor:
          locale === "tr"
            ? ["İngilizce seviyesini yükseltmek isteyenler", "Kanada’yı deneyimlemek isteyenler"]
            : locale === "de"
              ? ["Englisch verbessern", "Kanada erleben"]
              : ["Improve English", "Experience Canada"],
        keyAdvantages:
          locale === "tr"
            ? ["Güvenli yaşam", "Çeşitli şehir seçenekleri", "Esnek programlar (kuruma göre)"]
            : locale === "de"
              ? ["Sicheres Leben", "Viele Städte", "Flexible Programme"]
              : ["Safe living", "Many cities", "Flexible programs"],
        duration: locale === "tr" ? "4–48 hafta" : locale === "de" ? "4–48 Wochen" : "4–48 weeks",
        feesAndVisa:
          locale === "tr"
            ? "Study permit gereklilikleri rotaya göre değişir. Finansman ve evrak planı yapılır."
            : locale === "de"
              ? "Study-Permit-Anforderungen variieren. Finanzierung und Unterlagenplan werden erstellt."
              : "Study permit requirements vary. We plan funding and documents.",
      }),
  },
  {
    id: "bachelors",
    title: { tr: "Lisans Programları", en: "Bachelor’s Degree", de: "Bachelorstudium" },
    tagline: {
      tr: "Kampüs hayatı ve co-op seçenekleri (programa göre).",
      en: "Campus life and co-op options (by program).",
      de: "Campusleben und Co-op Optionen (je nach Programm).",
    },
    getDetails: academicDetails({
      countryId: "Canada",
      level: "bachelor",
      duration: { tr: "3–4 yıl", en: "3–4 years", de: "3–4 Jahre" },
    }),
  },
  {
    id: "masters",
    title: { tr: "Yüksek Lisans", en: "Master’s Degree", de: "Masterstudium" },
    tagline: {
      tr: "Araştırma veya profesyonel master seçenekleri.",
      en: "Research or professional master options.",
      de: "Forschungs- oder professionelle Masteroptionen.",
    },
    getDetails: academicDetails({
      countryId: "Canada",
      level: "master",
      duration: { tr: "1–2 yıl", en: "1–2 years", de: "1–2 Jahre" },
    }),
  },
  {
    id: "visa-consulting",
    title: { tr: "Vize Danışmanlığı", en: "Visa Consulting", de: "Visaberatung" },
    tagline: {
      tr: "Vize stratejisi, evrak hazırlığı ve randevu desteği.",
      en: "Visa strategy, documents, and appointment support.",
      de: "Visa-Strategie, Unterlagen und Termin-Support.",
    },
    getDetails: visaDetails("Canada"),
  },
];

const IRELAND_PROGRAMS: readonly ProgramSource[] = [
  {
    id: "work-and-study",
    badge: "Popular",
    title: { tr: "Work and Study Programı", en: "Work and Study Program", de: "Work-and-Study Programm" },
    tagline: {
      tr: "Dil eğitimi + vizeye bağlı çalışma potansiyeli (kurallara göre).",
      en: "Language study with work potential (based on visa rules).",
      de: "Sprachkurs mit Arbeitsmöglichkeiten (nach Visaregeln).",
    },
    getDetails: (locale) =>
      detailsBase(locale, {
        overview:
          locale === "tr"
            ? "Work and Study; vize ve program türüne bağlı olarak yasal sınırlar içinde part-time çalışma potansiyeliyle dil eğitimini birleştiren rotadır."
            : locale === "de"
              ? "Work and Study verbindet Sprachkurs mit möglicher Teilzeit-Arbeit (je nach Visum/Regeln)."
              : "Work and Study combines language learning with potential part-time work depending on visa rules.",
        whoFor:
          locale === "tr"
            ? ["Dil eğitimi alırken deneyim kazanmak isteyenler", "İrlanda’da İngilizce öğrenmek isteyenler"]
            : locale === "de"
              ? ["Erfahrung während Sprachkurs", "Englisch in Irland lernen"]
              : ["Gain experience while studying", "Learn English in Ireland"],
        keyAdvantages:
          locale === "tr"
            ? ["Planlı rota", "Immersion", "Uygunsa part-time çalışma"]
            : locale === "de"
              ? ["Geplante Route", "Immersion", "Teilzeit möglich (falls geeignet)"]
              : ["Planned route", "Immersion", "Part-time work if eligible"],
        duration: locale === "tr" ? "Genellikle 25+ hafta" : locale === "de" ? "Oft 25+ Wochen" : "Often 25+ weeks",
        workRights:
          locale === "tr"
            ? "Çalışma hakkı vize/program türüne bağlıdır."
            : locale === "de"
              ? "Arbeitsrecht hängt von Visum/Programm ab."
              : "Work rights depend on visa/program type.",
        feesAndVisa:
          locale === "tr"
            ? "Okul, konaklama ve sigorta maliyetleri değişir. Vize adımlarını ve timeline’ı netleştiririz."
            : locale === "de"
              ? "Kosten variieren. Visa-Schritte und Timeline werden geklärt."
              : "Costs vary. We clarify visa steps and timeline.",
      }),
  },
  {
    id: "visa-consulting",
    title: { tr: "Vize Danışmanlığı", en: "Visa Consulting", de: "Visaberatung" },
    tagline: {
      tr: "Vize stratejisi, evrak hazırlığı ve randevu desteği.",
      en: "Visa strategy, documents, and appointment support.",
      de: "Visa-Strategie, Unterlagen und Termin-Support.",
    },
    getDetails: visaDetails("Ireland"),
  },
];

const MALTA_PROGRAMS: readonly ProgramSource[] = [
  {
    id: "language-school",
    title: { tr: "Dil Okulu", en: "Language School", de: "Sprachschule" },
    tagline: {
      tr: "İngilizce eğitim ve Akdeniz yaşamı.",
      en: "English education and Mediterranean lifestyle.",
      de: "Englisch lernen und mediterraner Lifestyle.",
    },
    getDetails: (locale) =>
      detailsBase(locale, {
        overview:
          locale === "tr"
            ? "Malta dil okulları; esnek başlangıç tarihleri ve yoğun program seçenekleriyle İngilizce gelişimi için popülerdir."
            : locale === "de"
              ? "Sprachschulen auf Malta: flexible Starttermine und Intensivkurse."
              : "Malta language schools are popular with flexible start dates and intensive options.",
        whoFor:
          locale === "tr"
            ? ["İngilizcesini geliştirmek isteyenler", "Kısa/orta vadeli rota arayanlar"]
            : locale === "de"
              ? ["Englisch verbessern", "Kurz-/Mittelfristige Route"]
              : ["Improve English", "Short/mid-term routes"],
        keyAdvantages:
          locale === "tr"
            ? ["Esnek süre", "Yoğun kurslar", "Sosyal ve güvenli ortam"]
            : locale === "de"
              ? ["Flexible Dauer", "Intensivkurse", "Soziales Umfeld"]
              : ["Flexible duration", "Intensive courses", "Social environment"],
        duration: locale === "tr" ? "2–36 hafta" : locale === "de" ? "2–36 Wochen" : "2–36 weeks",
        feesAndVisa:
          locale === "tr"
            ? "Program ücreti, konaklama ve sigorta değişir. Vize adımları ve evrak seti planlanır."
            : locale === "de"
              ? "Gebühren variieren. Visa-Schritte und Unterlagen werden geplant."
              : "Costs vary. Visa steps and documents are planned.",
      }),
  },
  {
    id: "internship-work-study",
    title: { tr: "Staj (Work and Study)", en: "Internship (Work and Study)", de: "Praktikum (Work and Study)" },
    tagline: {
      tr: "Eğitimle birlikte staj/iş deneyimi rotası (uygunsa).",
      en: "Study with internship/work experience (if eligible).",
      de: "Studium mit Praktikum/Arbeitserfahrung (falls möglich).",
    },
    getDetails: (locale) =>
      detailsBase(locale, {
        overview:
          locale === "tr"
            ? "Bazı rotalarda eğitimle birlikte staj/iş deneyimi hedeflenebilir. Uygunluk vize ve kurum koşullarına göre değişir."
            : locale === "de"
              ? "Manche Routen kombinieren Kurs/Studium mit Praktikum/Arbeitserfahrung. Eignung hängt von Visum/Institution ab."
              : "Some routes combine study with internship/work experience. Eligibility depends on visa and institution.",
        whoFor:
          locale === "tr"
            ? ["Eğitim + deneyim isteyenler", "CV güçlendirmek isteyen adaylar"]
            : locale === "de"
              ? ["Studium + Erfahrung", "CV stärken"]
              : ["Study + experience seekers", "Applicants strengthening their CV"],
        keyAdvantages:
          locale === "tr"
            ? ["Deneyim odaklı rota", "Dil pratiği", "Network fırsatı"]
            : locale === "de"
              ? ["Erfahrungsfokus", "Sprachpraxis", "Networking"]
              : ["Experience-focused route", "Language practice", "Networking"],
        duration: locale === "tr" ? "8–52 hafta" : locale === "de" ? "8–52 Wochen" : "8–52 weeks",
        workRights:
          locale === "tr"
            ? "Vize ve kurum kurallarına göre değişir."
            : locale === "de"
              ? "Abhängig von Visum/Institution."
              : "Depends on visa/institution rules.",
        feesAndVisa:
          locale === "tr"
            ? "Uygunluk ve maliyetler rotaya göre değişir; evrak ve timeline netleştirilir."
            : locale === "de"
              ? "Eignung und Kosten variieren; Unterlagen und Timeline werden geklärt."
              : "Eligibility and costs vary; documents and timeline are clarified.",
      }),
  },
  {
    id: "visa-consulting",
    title: { tr: "Vize Danışmanlığı", en: "Visa Consulting", de: "Visaberatung" },
    tagline: {
      tr: "Vize stratejisi, evrak hazırlığı ve randevu desteği.",
      en: "Visa strategy, documents, and appointment support.",
      de: "Visa-Strategie, Unterlagen und Termin-Support.",
    },
    getDetails: visaDetails("Malta"),
  },
];

const PROGRAM_CATALOG_SOURCE: Record<CountryId, CountrySource> = {
  Germany: { heroImageUrl: HERO.Germany, programs: GERMANY_PROGRAMS },
  USA: { heroImageUrl: HERO.USA, programs: USA_PROGRAMS },
  Netherlands: { heroImageUrl: HERO.Netherlands, programs: NETHERLANDS_PROGRAMS },
  "United Kingdom": { heroImageUrl: HERO["United Kingdom"], programs: UK_PROGRAMS },
  Canada: { heroImageUrl: HERO.Canada, programs: CANADA_PROGRAMS },
  Ireland: { heroImageUrl: HERO.Ireland, programs: IRELAND_PROGRAMS },
  Malta: { heroImageUrl: HERO.Malta, programs: MALTA_PROGRAMS },
} as const;

export function getProgramCatalog(localeInput?: string): Record<CountryId, CountryPrograms> {
  const locale = normalizeLocale(localeInput);
  const result = {} as Record<CountryId, CountryPrograms>;

  for (const countryId of COUNTRY_ORDER) {
    const country = PROGRAM_CATALOG_SOURCE[countryId];
    result[countryId] = {
      heroImageUrl: country.heroImageUrl,
      programs: country.programs.map((program) => ({
        id: program.id,
        badge: program.badge,
        title: program.title[locale] ?? program.title.tr,
        tagline: program.tagline[locale] ?? program.tagline.tr,
        heroImageUrl: program.heroImageUrl,
        details: program.getDetails(locale),
      })),
    };
  }

  return result;
}
