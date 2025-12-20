import type { CountryId } from "./programCatalog";

export type CitySchoolRecommendation = {
  city: string;
  highlights: string[];
  schools: string[];
  note?: string;
};

export const CITY_SCHOOL_RECOMMENDATIONS: Record<
  CountryId,
  readonly CitySchoolRecommendation[]
> = {
  Germany: [
    {
      city: "Berlin",
      highlights: ["İngilizce program çeşitliliği", "Teknoloji & start-up ekosistemi"],
      schools: ["TU Berlin", "Humboldt-Universität zu Berlin", "Freie Universität Berlin"],
    },
    {
      city: "Münih",
      highlights: ["Güçlü mühendislik ekosistemi", "Yüksek yaşam kalitesi"],
      schools: ["TUM", "LMU München"],
    },
    {
      city: "Köln",
      highlights: ["Öğrenci şehri", "Ulaşım ve yaşam dengesi"],
      schools: ["Universität zu Köln", "TH Köln"],
    },
    {
      city: "Hamburg",
      highlights: ["Uluslararası şehir", "Lojistik & iş dünyası"],
      schools: ["Universität Hamburg", "HAW Hamburg"],
    },
    {
      city: "Frankfurt",
      highlights: ["Finans merkezi", "Kariyer odaklı fırsatlar"],
      schools: ["Goethe-Universität Frankfurt", "Frankfurt UAS"],
    },
    {
      city: "Stuttgart",
      highlights: ["Otomotiv & endüstri", "Mühendislik odaklı"],
      schools: ["Universität Stuttgart", "HfT Stuttgart"],
    },
  ],
  USA: [
    {
      city: "New York",
      highlights: ["Küresel network", "Geniş program seçenekleri"],
      schools: ["NYU", "Columbia University", "CUNY (çeşitli kampüsler)"],
    },
    {
      city: "Boston",
      highlights: ["Öğrenci & akademi odağı", "İnovasyon ekosistemi"],
      schools: ["Boston University", "Northeastern University"],
    },
    {
      city: "Los Angeles",
      highlights: ["Yaratıcı endüstriler", "Çeşitli kampüs seçenekleri"],
      schools: ["UCLA", "USC"],
    },
    {
      city: "Chicago",
      highlights: ["Büyük şehir fırsatları", "Kariyer odaklı"],
      schools: ["University of Chicago", "UIC"],
    },
    {
      city: "Miami",
      highlights: ["Turizm & hizmet sektörü", "Dinamik şehir"],
      schools: ["Florida International University (FIU)", "University of Miami"],
    },
  ],
  Netherlands: [
    {
      city: "Amsterdam",
      highlights: ["Uluslararası ortam", "İngilizce programlar"],
      schools: ["University of Amsterdam", "Vrije Universiteit Amsterdam"],
    },
    {
      city: "Rotterdam",
      highlights: ["İşletme & ekonomi odağı", "Liman & endüstri"],
      schools: ["Erasmus University Rotterdam"],
    },
    {
      city: "Delft",
      highlights: ["Mühendislik odağı", "Teknoloji ekosistemi"],
      schools: ["TU Delft"],
    },
    {
      city: "Utrecht",
      highlights: ["Öğrenci şehri", "Yaşam dengesi"],
      schools: ["Utrecht University"],
    },
  ],
  "United Kingdom": [
    {
      city: "London",
      highlights: ["Küresel merkez", "Kariyer & network"],
      schools: ["UCL", "King's College London", "Imperial College London"],
    },
    {
      city: "Manchester",
      highlights: ["Öğrenci şehri", "Geniş bölüm çeşitliliği"],
      schools: ["University of Manchester"],
    },
    {
      city: "Edinburgh",
      highlights: ["Prestijli akademi", "Güçlü araştırma"],
      schools: ["University of Edinburgh"],
    },
    {
      city: "Birmingham",
      highlights: ["Ulaşım merkezî", "Kampüs hayatı"],
      schools: ["University of Birmingham"],
    },
  ],
  Canada: [
    {
      city: "Toronto",
      highlights: ["Kariyer fırsatları", "Çok kültürlü şehir"],
      schools: ["University of Toronto", "Toronto Metropolitan University"],
    },
    {
      city: "Vancouver",
      highlights: ["Yaşam kalitesi", "Teknoloji & start-up"],
      schools: ["University of British Columbia (UBC)", "SFU"],
    },
    {
      city: "Montreal",
      highlights: ["İngilizce/Fransızca seçenekleri", "Öğrenci dostu"],
      schools: ["McGill University", "Université de Montréal"],
    },
    {
      city: "Ottawa",
      highlights: ["Başkent", "Teknoloji & kamu ekosistemi"],
      schools: ["University of Ottawa", "Carleton University"],
    },
  ],
  Ireland: [
    {
      city: "Dublin",
      highlights: ["Teknoloji şirketleri", "İngilizce konuşulan AB"],
      schools: ["Trinity College Dublin", "University College Dublin"],
    },
    {
      city: "Cork",
      highlights: ["Öğrenci şehri", "Daha sakin yaşam"],
      schools: ["University College Cork"],
    },
    {
      city: "Galway",
      highlights: ["Kültür & yaşam dengesi", "Öğrenci topluluğu"],
      schools: ["University of Galway"],
    },
  ],
  Malta: [
    {
      city: "St. Julian's",
      highlights: ["Dil okulu yoğunluğu", "Sosyal yaşam"],
      schools: ["Dil okulları (bölgesel kampüsler)"],
      note: "Dil okulları ve program uygunluğu, başlangıç tarihlerine göre değişebilir.",
    },
    {
      city: "Sliema",
      highlights: ["Ulaşım kolaylığı", "Konaklama seçenekleri"],
      schools: ["Dil okulları (yakın bölge)"],
    },
    {
      city: "Valletta",
      highlights: ["Merkezî lokasyon", "Kültürel deneyim"],
      schools: ["Dil okulları (şehir merkezi)"],
    },
  ],
} as const;

