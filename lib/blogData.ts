import type { AppLocale } from "./i18n";
import { normalizeLocale } from "./i18n";

export type BlogCategory = "Guides" | "Visa" | "Scholarships" | "Student Life";

export type ArticleSection = {
  heading?: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type BlogArticle = {
  id: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  readTime: string;
  dateLabel: string;
  heroImageUrl: string;
  sections: ArticleSection[];
};

type Localized<T> = Record<AppLocale, T>;

const CATEGORY_LABELS: Localized<Record<BlogCategory, string>> = {
  tr: {
    Guides: "Rehberler",
    Visa: "Vize",
    Scholarships: "Burslar",
    "Student Life": "Öğrenci Hayatı",
  },
  en: {
    Guides: "Guides",
    Visa: "Visa",
    Scholarships: "Scholarships",
    "Student Life": "Student Life",
  },
  de: {
    Guides: "Leitfäden",
    Visa: "Visum",
    Scholarships: "Stipendien",
    "Student Life": "Studentenleben",
  },
};

type BlogArticleSource = {
  id: string;
  category: BlogCategory;
  heroImageUrl: string;
  dateLabel: string;
  title: Localized<string>;
  excerpt: Localized<string>;
  readTime: Localized<string>;
  sections: Localized<ArticleSection[]>;
};

const ARTICLES: readonly BlogArticleSource[] = [
  {
    id: "usa-work-travel-camp-usa",
    category: "Guides",
    dateLabel: "2025",
    heroImageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/1/1e/Camp_Cottaquilla%2C_Girl_Scout_Camp%2C_Choccolocco%2C_Alabama_%287187233295%29.jpg",
    title: {
      tr: "ABD Work & Travel / Camp USA: 2025 Sezonu için Adımlar ve Riskler",
      en: "USA Work & Travel / Camp USA: Steps & Risks for the 2025 Season",
      de: "USA Work & Travel / Camp USA: Schritte & Risiken für die Saison 2025",
    },
    excerpt: {
      tr: "J-1 sürecinde DS-2019, SEVIS, sponsor kuralları ve iş yerleştirme: Türkiye’den katılanların bilmesi gereken temel noktalar.",
      en: "In the J-1 process: DS-2019, SEVIS, sponsor rules and placement—key points for applicants from Turkey.",
      de: "Im J-1 Prozess: DS-2019, SEVIS, Sponsorregeln und Placement – wichtige Punkte für Bewerber:innen aus der Türkei.",
    },
    readTime: { tr: "5 dk okuma", en: "5 min read", de: "5 Min. Lesezeit" },
    sections: {
      tr: [
        {
          heading: "Genel Bakış",
          paragraphs: [
            "Work & Travel ve Camp USA, J-1 vizesi kapsamında sponsor aracılığıyla yürüyen sezonluk kültürel değişim programlarıdır. Sürecin en kritik noktası: evrakların doğruluğu, sponsor kuralları ve zaman planıdır.",
          ],
        },
        {
          heading: "Temel Adımlar",
          bullets: [
            "Uygunluk kontrolü ve profil değerlendirmesi",
            "Sponsor seçimi + pozisyon/yerleştirme süreci",
            "DS-2019 ve SEVIS işlemleri",
            "Vize randevusu, evrak seti ve mülakat hazırlığı",
            "Uçuş/konaklama planı ve varış öncesi checklist",
          ],
        },
        {
          heading: "En Sık Riskler (ve nasıl azaltılır?)",
          bullets: [
            "Eksik/tutarsız evrak: tek bir kontrol listesiyle dosyayı standardize edin",
            "Sponsor–iş–tarih uyumsuzluğu: sözleşme ve tarihleri yazılı teyit edin",
            "Mülakatta belirsiz hedef: 60–90 sn net bir program anlatımı hazırlayın",
            "Bütçe planı yok: ilk 1 ay giderleri için ayrı bir buffer oluşturun",
          ],
        },
        {
          heading: "Not",
          paragraphs: [
            "Kural ve belgeler sponsor ve döneme göre değişebilir. Başvuru öncesi resmi sponsor dokümantasyonunu mutlaka kontrol edin.",
          ],
        },
      ],
      en: [
        {
          heading: "Overview",
          paragraphs: [
            "Work & Travel and Camp USA are seasonal cultural exchange programs under the J-1 visa and run through a sponsor. The most critical parts of the process are: accurate documents, sponsor rules, and a realistic timeline.",
          ],
        },
        {
          heading: "Core Steps",
          bullets: [
            "Eligibility check and profile review",
            "Sponsor selection + position/placement process",
            "DS-2019 and SEVIS steps",
            "Visa appointment, document set, and interview prep",
            "Flight/accommodation planning and a pre-arrival checklist",
          ],
        },
        {
          heading: "Common Risks (and how to reduce them)",
          bullets: [
            "Missing/inconsistent documents: standardize your file with one checklist",
            "Sponsor–job–date mismatch: confirm the contract and dates in writing",
            "Unclear goal in the interview: prepare a clear 60–90 sec program story",
            "No budget plan: keep a separate buffer for the first month’s expenses",
          ],
        },
        {
          heading: "Note",
          paragraphs: [
            "Rules and required documents may change by sponsor and season. Always review the official sponsor documentation before applying.",
          ],
        },
      ],
      de: [
        {
          heading: "Überblick",
          paragraphs: [
            "Work & Travel und Camp USA sind saisonale Kultur-Austauschprogramme unter dem J-1 Visum und laufen über einen Sponsor. Entscheidend sind: korrekte Unterlagen, Sponsorregeln und eine realistische Timeline.",
          ],
        },
        {
          heading: "Kernschritte",
          bullets: [
            "Eignungscheck und Profilanalyse",
            "Sponsor wählen + Position/Placement",
            "DS-2019 und SEVIS Schritte",
            "Visatermin, Unterlagen-Set und Interviewvorbereitung",
            "Flug/Unterkunft planen und Pre-Arrival-Checkliste",
          ],
        },
        {
          heading: "Häufige Risiken (und wie man sie reduziert)",
          bullets: [
            "Fehlende/inkonsistente Dokumente: Datei mit einer Checkliste standardisieren",
            "Sponsor–Job–Datum passt nicht: Vertrag und Termine schriftlich bestätigen",
            "Unklares Ziel im Interview: 60–90 Sek. klare Programmerzählung vorbereiten",
            "Kein Budgetplan: Puffer für die ersten Monatkosten einplanen",
          ],
        },
        {
          heading: "Hinweis",
          paragraphs: [
            "Regeln und Unterlagen können je Sponsor und Saison variieren. Prüfen Sie vor der Bewerbung immer die offiziellen Sponsor-Unterlagen.",
          ],
        },
      ],
    },
  },
  {
    id: "germany-uni-visa-update",
    category: "Visa",
    dateLabel: "2025",
    heroImageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/a/a6/Brandenburger_Tor_abends.jpg",
    title: {
      tr: "Almanya: Üniversite Başvurusu ve Öğrenci Vizesi (2025) Kontrol Listesi",
      en: "Germany: University Application & Student Visa (2025) Checklist",
      de: "Deutschland: Uni-Bewerbung & Studentenvisum (2025) Checkliste",
    },
    excerpt: {
      tr: "Başvuru takvimi, finansman kanıtı, randevu-biyometri adımları ve evrak düzeni: Türkiye’den başvuranlar için pratik kontrol listesi.",
      en: "Timeline, proof of funds, appointment/biometrics, and document order: a practical checklist for applicants from Turkey.",
      de: "Zeitplan, Finanzierungsnachweis, Termin/Biometrie und Unterlagen-Ordnung: praktische Checkliste für Bewerber:innen aus der Türkei.",
    },
    readTime: { tr: "6 dk okuma", en: "6 min read", de: "6 Min. Lesezeit" },
    sections: {
      tr: [
        {
          heading: "Özet",
          paragraphs: [
            "Almanya sürecinde en çok sorun yaratan konu, belgelerin sırası/tutarlılığı ve finansman kanıtıdır. Dosyayı tek seferlik “paket” gibi değil; adım adım bir süreç olarak yönetmek gecikme riskini azaltır.",
          ],
        },
        {
          heading: "Üniversite Başvurusu: Takvim ve Belge Uyumu",
          bullets: [
            "Program koşullarını resmi sayfadan doğrulayın (dil, not, ön koşullar)",
            "Çeviri–noter–apostil sürecini erken başlatın",
            "Motivasyon mektubunu programa özel yazın (şablon kullanmayın)",
            "Tüm belgelerde isim/tarih/okul bilgilerinin birebir aynı olduğundan emin olun",
          ],
        },
        {
          heading: "Finansman Kanıtı: En Kritik Bölüm",
          bullets: [
            "Para kaynağını netleştirin (birikim, sponsor, burs vb.)",
            "Banka dökümleri ve beyan edilen hikâye birbirini desteklemeli",
            "Son dakika para transferlerinden kaçının; hazırlığı planlı yapın",
          ],
        },
        {
          heading: "Randevu & Biyometri",
          bullets: [
            "Dosya sırası + çıktılar + yedek kopya seti hazır olsun",
            "Kısa bir “dosya özeti” hazırlayın: program, tarih, finansman, konaklama",
          ],
        },
      ],
      en: [
        {
          heading: "Summary",
          paragraphs: [
            "For Germany, the most common issues are document consistency/order and proof of funds. Managing the process step-by-step (instead of as a single “package”) reduces delay risk.",
          ],
        },
        {
          heading: "University Application: Timeline & Document Alignment",
          bullets: [
            "Verify requirements on the official program page (language, grades, prerequisites)",
            "Start translations/notary/apostille early",
            "Write a program-specific motivation letter (avoid templates)",
            "Ensure name/date/school details match exactly across all documents",
          ],
        },
        {
          heading: "Proof of Funds: The Most Critical Part",
          bullets: [
            "Clarify the funding source (savings, sponsor, scholarship, etc.)",
            "Bank statements must support the story you declare",
            "Avoid last-minute transfers; plan the preparation",
          ],
        },
        {
          heading: "Appointment & Biometrics",
          bullets: [
            "Prepare file order + printouts + a backup copy set",
            "Create a short “file summary”: program, dates, funding, accommodation",
          ],
        },
      ],
      de: [
        {
          heading: "Kurzüberblick",
          paragraphs: [
            "In Deutschland sorgen meist Unterlagen-Reihenfolge/Konsistenz und der Finanzierungsnachweis für Probleme. Schrittweise Prozessführung reduziert Verzögerungsrisiken.",
          ],
        },
        {
          heading: "Uni-Bewerbung: Zeitplan & Unterlagenabgleich",
          bullets: [
            "Voraussetzungen auf der offiziellen Seite prüfen (Sprache, Noten, Voraussetzungen)",
            "Übersetzung/Notar/Apostille früh starten",
            "Motivationsschreiben programmspezifisch verfassen (keine Templates)",
            "Name/Datum/Schulinfos müssen in allen Dokumenten exakt übereinstimmen",
          ],
        },
        {
          heading: "Finanzierungsnachweis: Der kritischste Teil",
          bullets: [
            "Finanzierungsquelle klären (Ersparnisse, Sponsor, Stipendium usw.)",
            "Kontoauszüge müssen die erklärte Geschichte stützen",
            "Last-Minute-Überweisungen vermeiden; Vorbereitung planen",
          ],
        },
        {
          heading: "Termin & Biometrie",
          bullets: [
            "Unterlagenreihenfolge + Ausdrucke + Backup-Set vorbereiten",
            "Kurze „Dateizusammenfassung“ erstellen: Programm, Termine, Finanzierung, Unterkunft",
          ],
        },
      ],
    },
  },
  {
    id: "uk-student-visa-graduate-route",
    category: "Visa",
    dateLabel: "2025",
    heroImageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/5/54/Tower_Bridge-London%2C_England%2C_United_Kingdom.jpg",
    title: {
      tr: "İngiltere Öğrenci Vizesi ve Graduate Route: Mezuniyet Sonrası Seçenekler",
      en: "UK Student Visa & Graduate Route: Post-Study Options",
      de: "UK Studentenvisum & Graduate Route: Optionen nach dem Abschluss",
    },
    excerpt: {
      tr: "CAS, finansal yeterlilik, başvuru evrakları ve mezuniyet sonrası çalışma planı: Türkiye’den gidenler için özet rehber.",
      en: "CAS, proof of funds, application documents and post-study work planning: a quick guide for applicants from Turkey.",
      de: "CAS, Finanzierungsnachweis, Unterlagen und Planung nach dem Abschluss: kurzer Leitfaden für Bewerber:innen aus der Türkei.",
    },
    readTime: { tr: "7 dk okuma", en: "7 min read", de: "7 Min. Lesezeit" },
    sections: {
      tr: [
        {
          heading: "CAS ve Zaman Planı",
          bullets: [
            "CAS bilgileri ile pasaport/okul bilgileri birebir aynı olmalı",
            "Finansal yeterlilik dokümanlarını “tarih kuralı”na göre hazırlayın",
            "Randevu ve başvuru takvimini intake dönemine göre geri planlayın",
          ],
        },
        {
          heading: "Graduate Route Kısa Notlar",
          bullets: [
            "Mezuniyet sonrası kalış seçenekleri programa ve güncel kurallara bağlıdır",
            "Kariyer planınızı (sektör, şehir, hedef rol) mezuniyetten önce netleştirin",
          ],
        },
        {
          heading: "Öneri",
          paragraphs: [
            "UKVI ve üniversitenizin uluslararası ofisi duyurularını takip edin; en güncel bilgi her zaman resmi kaynaklardadır.",
          ],
        },
      ],
      en: [
        {
          heading: "CAS and Timeline",
          bullets: [
            "CAS details must match your passport and school records exactly",
            "Prepare proof-of-funds documents according to the “date rule”",
            "Work backwards from the intake date for appointment and submission planning",
          ],
        },
        {
          heading: "Graduate Route: Quick Notes",
          bullets: [
            "Post-study stay options depend on the program and current rules",
            "Clarify your career plan (sector, city, target role) before graduation",
          ],
        },
        {
          heading: "Recommendation",
          paragraphs: [
            "Follow UKVI and your university’s international office updates. The most reliable info is always the official sources.",
          ],
        },
      ],
      de: [
        {
          heading: "CAS und Zeitplan",
          bullets: [
            "CAS-Angaben müssen exakt mit Pass- und Schuldaten übereinstimmen",
            "Finanzierungsnachweise nach der „Datumsregel“ vorbereiten",
            "Termin- und Bewerbungsplan vom Intake-Termin rückwärts planen",
          ],
        },
        {
          heading: "Graduate Route: Kurznotizen",
          bullets: [
            "Optionen nach dem Abschluss hängen von Programm und aktuellen Regeln ab",
            "Karriereplan (Branche, Stadt, Zielrolle) vor dem Abschluss klären",
          ],
        },
        {
          heading: "Tipp",
          paragraphs: [
            "UKVI sowie Updates des International Office Ihrer Uni verfolgen. Verlässlich sind immer die offiziellen Quellen.",
          ],
        },
      ],
    },
  },
  {
    id: "scholarship-funding-opportunities",
    category: "Scholarships",
    dateLabel: "2025",
    heroImageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/0/05/Students_at_graduation_at_The_Ohio_State_University_-_DPLA_-_dd0b6dd3942f089e46f14c67b013b028.jpg",
    title: {
      tr: "Burs ve Fon Fırsatları: Türkiye’den Başvuranlar için 9 Pratik Strateji",
      en: "Scholarships & Funding: 9 Practical Strategies for Applicants from Turkey",
      de: "Stipendien & Finanzierung: 9 praktische Strategien für Bewerber:innen aus der Türkei",
    },
    excerpt: {
      tr: "Başarılı başvuruyu öne çıkaran belgeler, referanslar, niyet mektubu ve zamanlama: uygulanabilir öneriler.",
      en: "Documents, references, motivation letter and timing: practical tips that strengthen successful applications.",
      de: "Unterlagen, Referenzen, Motivationsschreiben und Timing: umsetzbare Tipps für starke Bewerbungen.",
    },
    readTime: { tr: "6 dk okuma", en: "6 min read", de: "6 Min. Lesezeit" },
    sections: {
      tr: [
        {
          heading: "Kazandıran Ortak Noktalar",
          bullets: [
            "Tutarlı hikâye + ölçülebilir kanıt (projeler, çıktılar, başarılar)",
            "Kriterlere göre yeniden yazılmış niyet mektubu",
            "Güçlü referanslar (örneklerle anlatabilen kişiler)",
          ],
        },
        {
          heading: "9 Pratik Strateji",
          bullets: [
            "Tek bir ana CV hazırlayın; her bursa göre sadeleştirin",
            "Portföy/kanıt dosyası oluşturun (Notion/Drive linki)",
            "Referans mektuplarını deadline’dan en az 2 hafta önce bitirin",
            "Bütçe tablosu ekleyin: giderler + kaynaklar + eksik tutar",
            "Dil belgesi ve çevirileri son dakikaya bırakmayın",
          ],
        },
        {
          heading: "Takip Edilecek Kaynaklar",
          paragraphs: [
            "DAAD, Fulbright, Chevening ve üniversitelerin burs sayfaları iyi başlangıç noktalarıdır. Şartlar sık güncellenebilir.",
          ],
        },
      ],
      en: [
        {
          heading: "What Winners Have in Common",
          bullets: [
            "A consistent story + measurable proof (projects, outputs, achievements)",
            "A motivation letter rewritten for the criteria (not generic)",
            "Strong references (people who can give concrete examples)",
          ],
        },
        {
          heading: "9 Practical Strategies",
          bullets: [
            "Build one master CV; tailor and simplify for each scholarship",
            "Create a portfolio/proof file (Notion/Drive link)",
            "Finalize reference letters at least 2 weeks before the deadline",
            "Add a budget table: costs + sources + gap",
            "Do not leave language tests and translations to the last minute",
          ],
        },
        {
          heading: "Useful Sources",
          paragraphs: [
            "DAAD, Fulbright, Chevening, and university scholarship pages are strong starting points. Requirements may change frequently.",
          ],
        },
      ],
      de: [
        {
          heading: "Gemeinsame Merkmale erfolgreicher Bewerbungen",
          bullets: [
            "Konsistente Story + messbare Belege (Projekte, Ergebnisse, Erfolge)",
            "Motivationsschreiben passend zu den Kriterien (nicht generisch)",
            "Starke Referenzen (mit konkreten Beispielen)",
          ],
        },
        {
          heading: "9 praktische Strategien",
          bullets: [
            "Ein Master-CV erstellen; für jedes Stipendium anpassen und kürzen",
            "Portfolio/Belegmappe anlegen (Notion/Drive-Link)",
            "Empfehlungsschreiben mind. 2 Wochen vor Deadline finalisieren",
            "Budget-Tabelle hinzufügen: Kosten + Quellen + Lücke",
            "Sprachnachweis und Übersetzungen nicht auf den letzten Moment schieben",
          ],
        },
        {
          heading: "Quellen zum Nachverfolgen",
          paragraphs: [
            "DAAD, Fulbright, Chevening und Stipendienseiten der Unis sind gute Startpunkte. Anforderungen können sich häufig ändern.",
          ],
        },
      ],
    },
  },
  {
    id: "living-costs-budget-comparison",
    category: "Student Life",
    dateLabel: "2025",
    heroImageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Currencies_on_White_Background.jpg/2400px-Currencies_on_White_Background.jpg",
    title: {
      tr: "Yaşam Maliyeti Karşılaştırması: Almanya – ABD – İngiltere için Bütçe Planı",
      en: "Cost of Living Comparison: Budget Plan for Germany – USA – UK",
      de: "Lebenshaltungskosten: Budgetplan für Deutschland – USA – UK",
    },
    excerpt: {
      tr: "Kira, ulaşım, market ve sigorta giderleri: Türkiye’den giden öğrenciler için 3 ülkeye göre pratik bütçe yaklaşımı.",
      en: "Rent, transport, groceries and insurance: a practical budget approach for three countries.",
      de: "Miete, Verkehr, Lebensmittel und Versicherung: praktischer Budgetansatz für drei Länder.",
    },
    readTime: { tr: "6 dk okuma", en: "6 min read", de: "6 Min. Lesezeit" },
    sections: {
      tr: [
        {
          heading: "Bütçeyi 4 Kaleme Ayırın",
          bullets: [
            "Konaklama: kira + depozito + faturalar",
            "Günlük yaşam: market, dışarıda yeme, kişisel harcamalar",
            "Ulaşım: şehir içi/şehirler arası",
            "Zorunlular: sigorta, hat, okul/kurum ücretleri",
          ],
        },
        {
          heading: "Ülke Bazlı Pratik Notlar",
          bullets: [
            "Şehir farkı çoğu zaman ülke farkından daha büyüktür",
            "Depozito/kontrat şartlarını baştan anlayın",
            "İlk ay giderleri için ayrı bir “kurulum bütçesi” ayırın",
          ],
        },
      ],
      en: [
        {
          heading: "Split Your Budget into 4 Buckets",
          bullets: [
            "Housing: rent + deposit + utilities",
            "Daily life: groceries, eating out, personal spending",
            "Transportation: local/intercity",
            "Mandatory items: insurance, phone, school/institution fees",
          ],
        },
        {
          heading: "Country-Specific Notes",
          bullets: [
            "City differences are often larger than country differences",
            "Understand deposit/contract terms early",
            "Keep a separate “setup budget” for the first month",
          ],
        },
      ],
      de: [
        {
          heading: "Budget in 4 Bereiche aufteilen",
          bullets: [
            "Wohnen: Miete + Kaution + Nebenkosten",
            "Alltag: Lebensmittel, Essen gehen, persönliche Ausgaben",
            "Transport: innerhalb der Stadt/zwischen Städten",
            "Pflichtkosten: Versicherung, Telefon, Schul-/Institutionsgebühren",
          ],
        },
        {
          heading: "Praxis-Tipps nach Land",
          bullets: [
            "Unterschiede zwischen Städten sind oft größer als zwischen Ländern",
            "Kaution/Vertragsbedingungen früh verstehen",
            "Separates „Setup-Budget“ für den ersten Monat einplanen",
          ],
        },
      ],
    },
  },
  {
    id: "common-visa-mistakes",
    category: "Visa",
    dateLabel: "2025",
    heroImageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/0/0f/World_Passport_with_PRC_visa_and_entry_stamp.jpg",
    title: {
      tr: "Türkiye’den Başvurularda En Sık Görülen 10 Vize Hatası (ve Nasıl Önlenir)",
      en: "10 Common Visa Mistakes (and How to Avoid Them) for Applicants from Turkey",
      de: "10 häufige Visafehler (und wie man sie vermeidet) für Bewerber:innen aus der Türkei",
    },
    excerpt: {
      tr: "Eksik çeviri, tutarsız finansman, zayıf niyet mektubu, randevu hazırlığı: ret riskini azaltan net adımlar.",
      en: "Missing translations, inconsistent funding, weak motivation letters, appointment prep: clear steps to reduce refusal risk.",
      de: "Fehlende Übersetzungen, inkonsistente Finanzierung, schwaches Motivationsschreiben, Terminvorbereitung: klare Schritte zur Risikoreduktion.",
    },
    readTime: { tr: "6 dk okuma", en: "6 min read", de: "6 Min. Lesezeit" },
    sections: {
      tr: [
        {
          heading: "En Sık Hatalar",
          bullets: [
            "Belge listesini eksik/yanlış formatta sunmak",
            "Finansal kaynağı açıklayamamak (belgesiz hikâye)",
            "Form ile belgelerde çelişkili bilgiler",
            "Zayıf niyet mektubu (hedef belirsiz)",
            "Konaklama ve zaman planını netleştirmemek",
          ],
        },
        {
          heading: "Kısa Reçete",
          bullets: [
            "Her belge için “neyi kanıtlıyor?” notu yazın",
            "Tek sayfalık özet hazırlayın: program, tarih, finansman, plan",
            "Mülakat provasını 90 saniyelik net bir anlatımla yapın",
          ],
        },
      ],
      en: [
        {
          heading: "Most Common Mistakes",
          bullets: [
            "Submitting the document list incomplete or in the wrong format",
            "Failing to explain funding (a story without proof)",
            "Conflicting information between forms and documents",
            "Weak motivation letter (unclear goal)",
            "Not clarifying accommodation and timeline",
          ],
        },
        {
          heading: "Quick Fix",
          bullets: [
            "Write a note for every document: “what does this prove?”",
            "Prepare a one-page summary: program, dates, funding, plan",
            "Practice the interview with a clear 90-second story",
          ],
        },
      ],
      de: [
        {
          heading: "Häufigste Fehler",
          bullets: [
            "Unterlagenliste unvollständig oder im falschen Format einreichen",
            "Finanzierung nicht erklären können (Story ohne Nachweise)",
            "Widersprüche zwischen Formularen und Dokumenten",
            "Schwaches Motivationsschreiben (unklares Ziel)",
            "Unterkunft und Zeitplan nicht klar darstellen",
          ],
        },
        {
          heading: "Kurzes Rezept",
          bullets: [
            "Für jedes Dokument notieren: „Was wird hiermit belegt?“",
            "Einseitige Zusammenfassung: Programm, Termine, Finanzierung, Plan",
            "Interview mit einer klaren 90-Sekunden-Story üben",
          ],
        },
      ],
    },
  },
  {
    id: "global-policy-changes",
    category: "Visa",
    dateLabel: "2025",
    heroImageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/b/b8/Outside_the_European_Parliament_in_Brussels_%2847937298368%29.jpg",
    title: {
      tr: "Küresel Göç ve Eğitim Politikaları: 2025’te Öne Çıkan Trendler",
      en: "Global Migration & Education Policies: Key Trends in 2025",
      de: "Globale Migrations- & Bildungspolitik: Wichtige Trends 2025",
    },
    excerpt: {
      tr: "Dijital vize süreçleri, biyometri yoğunluğu, ek güvenlik kontrolleri ve yeni giriş sistemleri: takip edilmesi gereken başlıklar.",
      en: "Digital visa processes, biometrics, extra security checks and new entry systems: what to watch.",
      de: "Digitale Visa-Prozesse, Biometrie, zusätzliche Sicherheitschecks und neue Einreisesysteme: wichtige Themen.",
    },
    readTime: { tr: "7 dk okuma", en: "7 min read", de: "7 Min. Lesezeit" },
    sections: {
      tr: [
        {
          heading: "Trend 1: Dijitalleşme",
          paragraphs: [
            "Formlar, randevular ve belge yüklemeleri giderek daha dijital hale geliyor. Bu da dosya yönetimini daha kritik yapıyor.",
          ],
        },
        {
          heading: "Trend 2: Biyometri ve Ek Kontroller",
          bullets: [
            "Randevu bulunabilirliği ve yoğunluk dönemleri",
            "Ek evrak talepleri ve daha sık doğrulama adımları",
          ],
        },
        {
          heading: "Ne Yapmalı?",
          bullets: [
            "Takvimi erken planlayın, resmi duyuruları takip edin",
            "Evrakları tek formatta, tutarlı ve okunur hazırlayın",
          ],
        },
      ],
      en: [
        {
          heading: "Trend 1: Digitalization",
          paragraphs: [
            "Forms, appointments and document uploads are becoming more digital. That makes file management and consistency even more important.",
          ],
        },
        {
          heading: "Trend 2: Biometrics and Extra Checks",
          bullets: [
            "Appointment availability and peak periods",
            "Additional document requests and more frequent verification steps",
          ],
        },
        {
          heading: "What to Do",
          bullets: [
            "Plan early and follow official announcements",
            "Prepare documents in one format, consistent and easy to read",
          ],
        },
      ],
      de: [
        {
          heading: "Trend 1: Digitalisierung",
          paragraphs: [
            "Formulare, Termine und Dokumenten-Uploads werden zunehmend digital. Dadurch wird sauberes Dokumentenmanagement noch wichtiger.",
          ],
        },
        {
          heading: "Trend 2: Biometrie und zusätzliche Checks",
          bullets: [
            "Terminverfügbarkeit und Stoßzeiten",
            "Zusätzliche Unterlagenanforderungen und häufigere Prüfungen",
          ],
        },
        {
          heading: "Was tun?",
          bullets: [
            "Früh planen und offizielle Updates verfolgen",
            "Unterlagen einheitlich, konsistent und gut lesbar vorbereiten",
          ],
        },
      ],
    },
  },
  {
    id: "accommodation-student-life",
    category: "Student Life",
    dateLabel: "2025",
    heroImageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Oakes_College_Student_Dormitories.jpg/2400px-Oakes_College_Student_Dormitories.jpg",
    title: {
      tr: "Konaklama ve Öğrenci Hayatı: Güvenli Kiralama ve Ev Bulma İpuçları",
      en: "Accommodation & Student Life: Safe Renting and Finding Housing",
      de: "Wohnen & Studentenleben: Sicher mieten und Unterkunft finden",
    },
    excerpt: {
      tr: "Yurt başvurusu, oda/ev arama, depozito sözleşmesi ve dolandırıcılıktan korunma: pratik öneriler.",
      en: "Dorm applications, room/house search, deposit contracts, and avoiding scams: practical tips.",
      de: "Wohnheim, Zimmer/Wohnungssuche, Kaution und Schutz vor Betrug: praktische Tipps.",
    },
    readTime: { tr: "6 dk okuma", en: "6 min read", de: "6 Min. Lesezeit" },
    sections: {
      tr: [
        {
          heading: "Güvenli Kiralama Kontrol Listesi",
          bullets: [
            "Depozito ödemeden önce kontrat ve kimlik doğrulaması",
            "Sahte ilanlara karşı görüntülü görüşme + sözleşme kontrolü",
            "Fatura/aidat dahil mi? Yazılı teyit alın",
          ],
        },
        {
          heading: "Yurt mu Ev mi?",
          paragraphs: [
            "İlk defa gidenler için yurt, süreç ve güvenlik açısından daha kolay olabilir. Uzun vadede ev/oda opsiyonları bütçeye göre optimize edilebilir.",
          ],
        },
      ],
      en: [
        {
          heading: "Safe Renting Checklist",
          bullets: [
            "Verify identity and contract before paying any deposit",
            "Avoid fake listings: video call + contract review",
            "Are utilities/fees included? Get written confirmation",
          ],
        },
        {
          heading: "Dorm or Private Housing?",
          paragraphs: [
            "For first-time movers, dorms can be easier for process and safety. Long-term, you can optimize with rooms/apartments based on your budget.",
          ],
        },
      ],
      de: [
        {
          heading: "Checkliste: Sicher mieten",
          bullets: [
            "Identität und Vertrag prüfen, bevor eine Kaution gezahlt wird",
            "Fake-Anzeigen vermeiden: Videocall + Vertragscheck",
            "Sind Nebenkosten enthalten? Schriftlich bestätigen lassen",
          ],
        },
        {
          heading: "Wohnheim oder Wohnung?",
          paragraphs: [
            "Für Erstankömmlinge kann ein Wohnheim in Prozess und Sicherheit einfacher sein. Langfristig lassen sich Zimmer/Wohnung je Budget optimieren.",
          ],
        },
      ],
    },
  },
  {
    id: "pre-departure-checklist",
    category: "Guides",
    dateLabel: "2025",
    heroImageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/f/f4/Passport_and_AirFrance_Boarding_Pass_%2853928563481%29.jpg",
    title: {
      tr: "Yurtdışına Gitmeden Önce Son 14 Gün: Türkiye’den Gidenler için Checklist",
      en: "The Final 14 Days Before Departure: Checklist for Applicants from Turkey",
      de: "Die letzten 14 Tage vor Abreise: Checkliste für Bewerber:innen aus der Türkei",
    },
    excerpt: {
      tr: "Vize, uçuş, konaklama, sigorta, sim kart, banka ve belgeler: uçuş öncesi son iki haftada yapılacaklar listesi.",
      en: "Visa, flight, accommodation, insurance, SIM, banking and documents: what to do in the last two weeks.",
      de: "Visum, Flug, Unterkunft, Versicherung, SIM, Bank und Unterlagen: To-dos in den letzten zwei Wochen.",
    },
    readTime: { tr: "6 dk okuma", en: "6 min read", de: "6 Min. Lesezeit" },
    sections: {
      tr: [
        {
          heading: "Son 14 Gün: Hızlı Liste",
          bullets: [
            "Vize/oturum belgesi + sigorta: çıktı ve dijital kopya",
            "Uçuş/konaklama: adres, check-in, ulaşım planı",
            "Banka: kart limitleri, yurtdışı ayarları, yedek kart",
            "İletişim: sim/eSIM planı, acil iletişim listesi",
            "Belgeler: transkript, kabul belgesi, tercümeler (kopya seti)",
          ],
        },
        {
          heading: "Varış Sonrası İlk 72 Saat",
          bullets: [
            "Ulaşım kartı, market alışverişi, okul/kurum adresi",
            "Konaklama sözleşmesi ve depozito süreçleri",
            "Gerekli kayıt/appointment adımları (ülkeye göre)",
          ],
        },
      ],
      en: [
        {
          heading: "Last 14 Days: Quick List",
          bullets: [
            "Visa/residence permit + insurance: printouts and digital copies",
            "Flight/accommodation: address, check-in, transport plan",
            "Banking: card limits, international settings, backup card",
            "Connectivity: SIM/eSIM plan, emergency contact list",
            "Documents: transcripts, admission letter, translations (backup set)",
          ],
        },
        {
          heading: "First 72 Hours After Arrival",
          bullets: [
            "Transport card, groceries, school/institution address",
            "Accommodation contract and deposit steps",
            "Required registrations/appointments (country-specific)",
          ],
        },
      ],
      de: [
        {
          heading: "Letzte 14 Tage: Kurzliste",
          bullets: [
            "Visum/Aufenthalt + Versicherung: Ausdrucke und digitale Kopien",
            "Flug/Unterkunft: Adresse, Check-in, Transportplan",
            "Bank: Kartenlimits, Auslandseinstellungen, Ersatzkarte",
            "Kommunikation: SIM/eSIM, Notfallkontakte",
            "Dokumente: Transkripte, Zulassung, Übersetzungen (Backup-Set)",
          ],
        },
        {
          heading: "Erste 72 Stunden nach Ankunft",
          bullets: [
            "Fahrkarte, Einkauf, Adresse von Uni/Institution",
            "Unterkunftsvertrag und Kautionsprozess",
            "Notwendige Registrierungen/Termine (je nach Land)",
          ],
        },
      ],
    },
  },
];

export const BLOG_ARTICLE_IDS = ARTICLES.map((a) => a.id);

export function getCategoryLabels(localeInput?: string): Record<BlogCategory, string> {
  const locale = normalizeLocale(localeInput);
  return CATEGORY_LABELS[locale];
}

export function getBlogArticles(localeInput?: string): BlogArticle[] {
  const locale = normalizeLocale(localeInput);
  return ARTICLES.map((a) => ({
    id: a.id,
    category: a.category,
    heroImageUrl: a.heroImageUrl,
    dateLabel: a.dateLabel,
    title: a.title[locale] ?? a.title.tr,
    excerpt: a.excerpt[locale] ?? a.excerpt.tr,
    readTime: a.readTime[locale] ?? a.readTime.tr,
    sections: a.sections[locale] ?? a.sections.tr,
  }));
}

export function getBlogArticleById(id: string, localeInput?: string): BlogArticle | null {
  const locale = normalizeLocale(localeInput);
  const found = ARTICLES.find((a) => a.id === id);
  if (!found) return null;
  return {
    id: found.id,
    category: found.category,
    heroImageUrl: found.heroImageUrl,
    dateLabel: found.dateLabel,
    title: found.title[locale] ?? found.title.tr,
    excerpt: found.excerpt[locale] ?? found.excerpt.tr,
    readTime: found.readTime[locale] ?? found.readTime.tr,
    sections: found.sections[locale] ?? found.sections.tr,
  };
}
