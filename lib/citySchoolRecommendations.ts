import type { AppLocale } from "./i18n";
import { normalizeLocale } from "./i18n";
import type { CountryId } from "./programCatalog";

export type CitySchoolRecommendation = {
  city: string;
  highlights: string[];
  schools: string[];
  note?: string;
};

type CitySchoolRecommendationSource = {
  city: string;
  highlights: Record<AppLocale, string[]>;
  schools: string[];
  note?: Record<AppLocale, string>;
};

const DATA: Record<CountryId, readonly CitySchoolRecommendationSource[]> = {
  Germany: [
    {
      city: "Berlin",
      highlights: {
        tr: ["İngilizce program çeşitliliği", "Teknoloji & start-up ekosistemi", "Uluslararası ortam"],
        en: ["English program variety", "Tech & startup ecosystem", "International environment"],
        de: ["Viele englische Programme", "Tech- & Startup-Ökosystem", "Internationales Umfeld"],
      },
      schools: ["TU Berlin", "Humboldt-Universität zu Berlin", "Freie Universität Berlin"],
    },
    {
      city: "Münih",
      highlights: {
        tr: ["Güçlü mühendislik ekosistemi", "Yüksek yaşam kalitesi", "Kariyer odaklı"],
        en: ["Strong engineering ecosystem", "High quality of life", "Career-focused"],
        de: ["Starkes Engineering-Ökosystem", "Hohe Lebensqualität", "Karrierefokus"],
      },
      schools: ["TUM", "LMU München"],
    },
    {
      city: "Köln",
      highlights: {
        tr: ["Öğrenci şehri", "Ulaşım ve yaşam dengesi", "Geniş bölüm seçenekleri"],
        en: ["Student city", "Great commute & life balance", "Broad program options"],
        de: ["Studentenstadt", "Gute Balance", "Viele Studienoptionen"],
      },
      schools: ["Universität zu Köln", "TH Köln"],
    },
  ],
  USA: [
    {
      city: "New York",
      highlights: {
        tr: ["Küresel network", "Geniş program seçenekleri", "Hızlı şehir yaşamı"],
        en: ["Global network", "Wide program options", "Fast-paced city life"],
        de: ["Globales Netzwerk", "Viele Programme", "Dynamisches Stadtleben"],
      },
      schools: ["NYU", "Columbia University", "CUNY (various campuses)"],
    },
    {
      city: "Boston",
      highlights: {
        tr: ["Akademi odağı", "İnovasyon ekosistemi", "Öğrenci kültürü"],
        en: ["Academic hub", "Innovation ecosystem", "Student culture"],
        de: ["Akademisches Zentrum", "Innovations-Ökosystem", "Studentenkultur"],
      },
      schools: ["Boston University", "Northeastern University"],
    },
  ],
  Netherlands: [
    {
      city: "Amsterdam",
      highlights: {
        tr: ["Uluslararası ortam", "İngilizce programlar", "Kariyer fırsatları"],
        en: ["International environment", "English-taught options", "Career opportunities"],
        de: ["Internationales Umfeld", "Englische Programme", "Karrierechancen"],
      },
      schools: ["University of Amsterdam", "Vrije Universiteit Amsterdam"],
    },
    {
      city: "Delft",
      highlights: {
        tr: ["Mühendislik odağı", "Teknoloji ekosistemi", "Araştırma kültürü"],
        en: ["Engineering focus", "Tech ecosystem", "Research culture"],
        de: ["Engineering-Fokus", "Tech-Ökosystem", "Forschungskultur"],
      },
      schools: ["TU Delft"],
    },
  ],
  "United Kingdom": [
    {
      city: "London",
      highlights: {
        tr: ["Küresel merkez", "Kariyer & network", "Prestijli okullar"],
        en: ["Global hub", "Career & networking", "Prestigious schools"],
        de: ["Globales Zentrum", "Karriere & Networking", "Renommierte Hochschulen"],
      },
      schools: ["UCL", "King's College London", "Imperial College London"],
    },
    {
      city: "Manchester",
      highlights: {
        tr: ["Öğrenci şehri", "Geniş bölüm çeşitliliği", "Kampüs kültürü"],
        en: ["Student city", "Broad program variety", "Campus culture"],
        de: ["Studentenstadt", "Viele Studiengänge", "Campus-Kultur"],
      },
      schools: ["University of Manchester"],
    },
  ],
  Canada: [
    {
      city: "Toronto",
      highlights: {
        tr: ["Kariyer fırsatları", "Çok kültürlü şehir", "Güçlü kampüs ekosistemi"],
        en: ["Career opportunities", "Multicultural city", "Strong campus ecosystem"],
        de: ["Karrierechancen", "Multikulturelle Stadt", "Starkes Campus-Ökosystem"],
      },
      schools: ["University of Toronto", "Toronto Metropolitan University"],
    },
    {
      city: "Vancouver",
      highlights: {
        tr: ["Yaşam kalitesi", "Teknoloji & start-up", "Doğa ve şehir dengesi"],
        en: ["Quality of life", "Tech & startups", "Nature-city balance"],
        de: ["Lebensqualität", "Tech & Startups", "Natur-Stadt-Balance"],
      },
      schools: ["University of British Columbia (UBC)", "Simon Fraser University (SFU)"],
    },
  ],
  Ireland: [
    {
      city: "Dublin",
      highlights: {
        tr: ["Teknoloji şirketleri", "İngilizce konuşulan AB", "Kariyer odaklı"],
        en: ["Tech companies", "English-speaking EU", "Career-focused"],
        de: ["Tech-Unternehmen", "Englischsprachige EU", "Karrierefokus"],
      },
      schools: ["Trinity College Dublin", "University College Dublin"],
    },
  ],
  Malta: [
    {
      city: "St. Julian's",
      highlights: {
        tr: ["Dil okulu yoğunluğu", "Sosyal yaşam", "Kolay ulaşım"],
        en: ["Language school hub", "Social life", "Easy commute"],
        de: ["Sprachschulzentrum", "Soziales Leben", "Gute Erreichbarkeit"],
      },
      schools: ["Language schools (regional campuses)"],
      note: {
        tr: "Okul ve program uygunluğu başlangıç tarihlerine göre değişebilir.",
        en: "School availability may vary by start date.",
        de: "Verfügbarkeit kann je Starttermin variieren.",
      },
    },
  ],
} as const;

export function getCitySchoolRecommendations(
  localeInput?: string,
): Record<CountryId, readonly CitySchoolRecommendation[]> {
  const locale = normalizeLocale(localeInput);
  const result = {} as Record<CountryId, readonly CitySchoolRecommendation[]>;

  for (const key of Object.keys(DATA) as CountryId[]) {
    result[key] = DATA[key].map((item) => ({
      city: item.city,
      highlights: item.highlights[locale] ?? item.highlights.tr,
      schools: item.schools,
      note: item.note ? item.note[locale] ?? item.note.tr : undefined,
    }));
  }

  return result;
}

