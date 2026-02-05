import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useRef, useState } from "react";
import PartnerLogo, { type PartnerLogoProps } from "../components/PartnerLogo";
import VideoModal from "../components/VideoModal";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";

const PARTNER_LOGOS: PartnerLogoProps[] = [
  { id: "aupair", type: "image", src: "/aupair-com-logo.png", alt: "AuPair.com" },
  { id: "balliedu", type: "image", src: "/balliedu_logo.png", alt: "BalliEdu" },
  { id: "ccusa", type: "image", src: "/ccusa-logo.png", alt: "CCUSA" },
  {
    id: "rheinland",
    type: "image",
    src: "/logo_1_TmabWzQ.png",
    alt: "Rheinland Privatschule",
  },
  {
    id: "tandem",
    type: "image",
    src: "/tandem-koeln-logo-rot.svg",
    alt: "Tandem Köln",
  },
  {
    id: "ceb",
    type: "image",
    src: "/ceb-logo.png",
    alt: "Cultural Exchange Bridge",
  },
];

const HERO_BG_URL =
  "https://images.unsplash.com/photo-98Elr-LIvD8?auto=format&fit=crop&w=2400&q=80";

const HERO_BG_URL_ALT =
  "https://images.unsplash.com/photo-_kd5cxwZOK4?auto=format&fit=crop&w=2400&q=80";

const HERO_BG_URL_FALLBACK =
  "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=2400&q=80";

const DEST_GERMANY_BG_URL =
  "https://upload.wikimedia.org/wikipedia/commons/b/bb/Technische_Universit%C3%A4t_M%C3%BCnchen.jpg";

const DEST_USA_BG_URL =
  "https://upload.wikimedia.org/wikipedia/commons/9/94/MIT_Killian_Court.jpg";

const DEST_ENGLAND_BG_URL =
  "https://upload.wikimedia.org/wikipedia/commons/2/2e/Queen%27s_Tower%2C_Imperial_College_London.jpg";

const DEST_MALTA_BG_URL =
  "https://upload.wikimedia.org/wikipedia/commons/2/2f/University_of_Malta_library_Valletta_campus.jpg";

const DEST_NETHERLANDS_BG_URL =
  "https://upload.wikimedia.org/wikipedia/commons/1/1e/TU-Delft-Bibl-2.jpg";

const DEST_IRELAND_BG_URL =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Campanile%2C_Trinity_College_Dublin.jpg/1280px-Campanile%2C_Trinity_College_Dublin.jpg";

const STORY_SARAH_IMG_URL =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCK4_9qC48fP-EhuRCZG1xXMmRchvbIhYWS7ZuG8C9ffR2njTy20TXUb5i0nmGzRm778ubM_yBtl3TmFiaexr_jJ2xK6u_q9VVLQ3ooI8j0EaIRjj3u1BkMlxSK2SQhhfevoZuQgmrq6bxOlwjNISyCboseVR68gFdqi4iiaEGXo42kLulRukwc6neGDBUiQEEWLwLY9q2bVxDrBimGL3dBWf4joF0M6wv-yECgln1Y-W8qczCg2X3gp9MSE6TB_CpKgV7RwOeyeRKh";

const STORY_AHMET_IMG_URL =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBBaYfSM8Eb6HEve5-Yrg7YCHd9WG7huV4IexISAI1dFjb_FB7PUNpn3NNuxKhCJDY2q6NIkiMT0-N88CwaLEHH3_LrqoH7-WmkxzdmjHnnenrfJl30sZdsMEbZbDEAVcUSf4zRu-jvqyx6DuKFaVRNisWfqfJtgEezOtka3HyzvwSjCFBWR6mdu9nxyIeAtHsccAICokA8gBcNZQ5m41rRCm9u9QTt6yRs5eTlrGd2DtAPbWuV6NYucMm-InQU3lQddwihQzp15xWo";

const STORY_ELENA_IMG_URL =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBuyr_eyYZBv_d6YnQSIDyExVINEN_X0-87DvjyVZk6C3_yop3YnVMeJYqCNVTVu7BqMdtqt9VVCGKB3r7YsWQqQNtM9O9JubrYUs-ktgm72cQtRnpNxPtGhrVF7F8s_0nbbLcUpb_Hz-Vk4L6Wh94GSC5i9VNbB7H0P_T_VGSNKsrFg5uqjJN9dM06x0uSurj8IvxSXz65gEQuyTBLOvPGyrx6VvrKfl6EJSgzUTQFnD7kPMBeKuLJoTD5yoSYY05PaxhIarzNB6rM";

const STORY_JOHN_IMG_URL =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDkjGZBP3TUGkygFRaX4mUUmW70rh3Przq7HR2XexYWinOD2Uij6om_XKw7b6LbbpwEdISUZrbKkox94geLEpTZTru59lBeEg0XeHhxNQyPU-HO14mFeXgH82Mf91_CXpv1zz9pmrsE_tsMYTiHAasq_eyLulq51XLOGP-KRNO6M6C5G4wo8vQWV5Zrt2bd27SqGXcyvfXvJSKp8gE7a5PRRGBBzWeNk40ZMsLggug6RmrsKxtZX6gjHuK7KxWIGyCAlnu8y03KRFtt";

const REVIEW_AVATAR_MERVE_URL =
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&h=200&q=80";

const REVIEW_AVATAR_EMRE_URL =
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&h=200&q=80";

const REVIEW_AVATAR_AYSE_URL =
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&h=200&q=80";

const SUPABASE_PROJECT_URL = (
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://balauszpznhuceqbgubs.supabase.co"
).replace(/\/+$/, "");
const SUPABASE_VIDEO_BUCKET = (process.env.NEXT_PUBLIC_SUPABASE_VIDEO_BUCKET ?? "videos").replace(
  /^\/+|\/+$/g,
  "",
);

const STORY_VIDEO_PATHS = {
  sarah: process.env.NEXT_PUBLIC_STORY_VIDEO_SARAH ?? "",
  ahmet: process.env.NEXT_PUBLIC_STORY_VIDEO_AHMET ?? "IMG_6266 (1).mov",
  elena: process.env.NEXT_PUBLIC_STORY_VIDEO_ELENA ?? "",
  john: process.env.NEXT_PUBLIC_STORY_VIDEO_JOHN ?? "",
} as const;

function encodePathSegment(segment: string) {
  return encodeURIComponent(segment).replace(/[!'()*]/g, (char) =>
    `%${char.charCodeAt(0).toString(16).toUpperCase()}`,
  );
}

function getSupabasePublicVideoUrl(path: string) {
  if (!path.trim()) return "";
  if (path.startsWith("https://") || path.startsWith("http://")) return path;
  if (!SUPABASE_PROJECT_URL) return "";
  const encodedPath = path
    .split("/")
    .filter(Boolean)
    .map((segment) => encodePathSegment(segment))
    .join("/");
  return `${SUPABASE_PROJECT_URL}/storage/v1/object/public/${encodePathSegment(
    SUPABASE_VIDEO_BUCKET,
  )}/${encodedPath}`;
}

function isVideoDebugEnabled(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const params = new URLSearchParams(window.location.search);
    const paramEnabled =
      params.get("debug") === "1" ||
      params.get("lotus_debug") === "1" ||
      params.get("video_debug") === "1";
    const storedEnabled = window.localStorage?.getItem("lotus_debug") === "1";
    return Boolean(paramEnabled || storedEnabled);
  } catch {
    return false;
  }
}

const COPY = {
  tr: {
    meta: {
      title: "Lotus Abroad | Yurtdışı Eğitim & Vize Danışmanlığı",
      description:
        "Lotus Abroad ile yurtdışı eğitim danışmanlığı: Almanya, ABD, İngiltere, Hollanda, Kanada, İrlanda ve Malta için program seçimi, başvuru, öğrenci vizesi ve yurtdışı çalışma vizesi süreçlerinde premium destek.",
      ogTitle: "Lotus Abroad | Yurtdışı Eğitim & Vize Danışmanlığı",
      ogDescription:
        "Program seçimi, başvuru, öğrenci vizesi ve yurtdışı çalışma vizesi süreçlerinde premium danışmanlık.",
      schemaDescription:
        "Yurtdışı eğitim danışmanlığı ve vize danışmanlığı: program seçimi, başvuru, öğrenci vizesi ve yurtdışı çalışma vizesi süreçlerinde premium destek.",
      schemaLanguage: "tr-TR",
    },
    seoKeywords: [
      "Yurtdışı eğitim danışmanlığı",
      "Yurtdışı çalışma vizesi",
      "Öğrenci vizesi",
      "Vize danışmanlığı",
      "Almanya Ausbildung",
      "Work and Travel",
      "Camp USA",
      "Dil okulu (ABD, Kanada, Malta)",
      "İngiltere yüksek lisans",
      "İrlanda work and study",
      "Denklik (Diploma denkliği)",
    ],
    hero: {
      badge: "2026 Başvuruları Açık",
      titleLine1: "Geleceğinizin",
      titleHighlight: "Sınırı Yok",
      description:
        "Almanya, ABD, İngiltere ve daha fazlası için yurtdışı eğitim danışmanlığı: program seçimi, başvuru, öğrenci vizesi ve yurtdışı çalışma vizesi süreçlerinde premium destek.",
      primaryCta: "Hemen Başla",
      secondaryCta: "Programları Keşfet",
    },
    partners: {
      label: "İş Ortaklarımız",
    },
    destinations: {
      title: "Hikayen nerede başlıyor?",
      description:
        "Dünyanın en güçlü eğitim destinasyonlarını keşfet. Kaliteli üniversiteler, güçlü kariyer ağları ve yepyeni fırsatlar seni bekliyor.",
      cta: "Tüm Ülkeleri Gör",
      cards: {
        germany: {
          title: "Almanya",
          tagline: "Uygun maliyetli üniversiteler & mühendislikte güçlü ekosistem.",
        },
        usa: {
          title: "ABD",
          tagline: "Güçlü üniversiteler & geniş kampüs seçenekleri.",
        },
        uk: {
          title: "İngiltere",
          tagline: "Prestijli okullar & 1 yıllık yoğun yüksek lisans.",
        },
        malta: {
          title: "Malta",
          tagline: "İngilizce eğitim & Akdeniz yaşamı.",
        },
        netherlands: {
          title: "Hollanda",
          tagline: "Yenilikçi eğitim & uluslararası ortam.",
        },
        ireland: {
          title: "İrlanda",
          tagline:
            "Avrupa'nın teknoloji merkezi & mezuniyet sonrası çalışma seçenekleri.",
        },
      },
    },
    process: {
      badge: "Sürecimiz",
      title: "3 Adımda Başvuru",
      steps: [
        {
          title: "1. Ücretsiz Görüşme",
          description:
            "Akademik profilini ve hedeflerini analiz edip en doğru ülke ve program rotasını çıkarıyoruz.",
        },
        {
          title: "2. Başvuru & Vize",
          description:
            "Evrak düzeni, okul başvuruları ve vize sürecinde dosyanı premium şekilde hazırlayıp takip ediyoruz.",
        },
        {
          title: "3. Yolculuk & Yerleşim",
          description:
            "Uçuş, konaklama ve varış sonrası ilk adımlar için oryantasyon ve yerleşim desteği sağlıyoruz.",
        },
      ],
    },
    stories: {
      title: "Lotus Abroad Öğrenci Deneyimleri",
      description:
        "Yakında öğrencilerimizin gerçek deneyimlerini burada paylaşacağız. Şimdilik programları keşfederek en uygun rotayı seçebilirsin.",
      filters: {
        all: "Tümü",
        germany: "Almanya",
        usa: "ABD",
        uk: "İngiltere",
        netherlands: "Hollanda",
      },
      cards: {
        sarah: {
          country: "ABD",
          title: "Sarah'ın Yolculuğu",
          subtitle: "NYU'da Bilgisayar Bilimleri (Yüksek Lisans)",
        },
        ahmet: {
          country: "Almanya",
          title: "İbrahim'in Hikayesi",
          subtitle: "Mühendislik @ Köln",
        },
        elena: {
          country: "İngiltere",
          title: "Elena'nın Başarısı",
          subtitle: "Oxford'da MBA",
        },
        john: {
          country: "Hollanda",
          title: "John'un Deneyimi",
          subtitle: "Amsterdam'da Tasarım",
        },
      },
    },
    reviews: {
      avatarAlt: "Öğrenci fotoğrafı",
      items: [
        {
          quote:
            "\"Lotus Abroad imkânsızı mümkün kıldı. Berlin'de hayalimdeki üniversiteye tam bursla kabul aldım!\"",
          name: "Merve S.",
          meta: "Almanya'da okuyor",
        },
        {
          quote:
            "\"Vize süreci çok göz korkutucuydu ama ekip her şeyi yönetti. Ben sadece randevuya gittim.\"",
          name: "Emre T.",
          meta: "İngiltere'de okuyor",
        },
        {
          quote:
            "\"Şimdiye kadarki en iyi danışmanlık. Sizi herhangi bir yere yerleştirmekten çok geleceğinizi önemsiyorlar.\"",
          name: "Ayşe K.",
          meta: "ABD'de okuyor",
        },
      ],
    },
    why: {
      badge: "Neden Lotus Abroad?",
      title: "Premium bir süreç deneyimi.",
      description:
        "Karmaşık başvuru adımlarını sadeleştiriyoruz: doğru program, düzenli dosya, net zaman planı ve güven veren iletişim.",
      items: [
        {
          id: "roadmap",
          icon: "verified",
          title: "Şeffaf yol haritası",
          body: "Başvurudan vizeye; adımlar, evrak listesi ve net bir timeline.",
        },
        {
          id: "risk-control",
          icon: "shield_lock",
          title: "Risk odaklı kontrol",
          body: "Eksik/uyumsuz belge, deadline ve vize risklerini önceden kapatırız.",
        },
        {
          id: "support",
          icon: "support_agent",
          title: "7/24 İletişim",
          body: "Süreç boyunca düzenli bilgilendirme ve hızlı geri dönüş.",
        },
        {
          id: "fit-selection",
          icon: "travel_explore",
          title: "Hedefe uygun seçim",
          body: "Profiline uygun ülke/program seçimiyle doğru rota oluştururuz.",
        },
      ],
	    },
	    journey: {
	      badge: "Müşteri Yolculuğu",
	      title: "Hedefinden vizeye: adım adım ilerleyelim.",
	      description:
	        "Her adımda ne olacağını bil: biz planlarız, takip ederiz; sen de güvenle ilerlersin.",
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
	    assessment: {
	      badge: "Ücretsiz Değerlendirme",
      title: "Profilini analiz edelim, sana rota çıkaralım.",
      description:
        "Kısa formu doldur. Ekibimiz 24 saat içinde seninle iletişime geçsin.",
      bullets: [
        "Kişiselleştirilmiş program önerisi",
        "Vize uygunluğu & evrak kontrolü",
        "Bütçe & zaman planı",
      ],
      form: {
        firstNameLabel: "Ad",
        lastNameLabel: "Soyad",
        emailLabel: "E-posta",
        countryLabel: "Hedef Ülke",
        firstNamePlaceholder: "Ad",
        lastNamePlaceholder: "Soyad",
        emailPlaceholder: "email@ornek.com",
        countryPlaceholder: "Lütfen seçin",
        countries: {
          germany: "Almanya",
          usa: "ABD",
          uk: "İngiltere",
          other: "Diğer",
        },
        submit: "Ücretsiz Değerlendirme Al",
        note: "Kredi kartı gerekmez. Verileriniz güvende.",
        submitting: "Gönderiliyor...",
        success: "Teşekkürler! Talebiniz alındı. 24 saat içinde sizinle iletişime geçeceğiz.",
        error: "Gönderim başarısız. Lütfen tekrar deneyin.",
      },
    },
    faq: {
      title: "Sıkça Sorulan Sorular",
      items: [
        {
          q: "Almanya'da okumak için Almanca bilmem gerekiyor mu?",
          a: "Hayır! Özellikle yüksek lisans seviyesinde birçok üniversitede tamamen İngilizce programlar bulunur. Uygun seçenekleri birlikte belirliyoruz.",
        },
        {
          q: "Görüşme ücreti ne kadar?",
          a: "İlk değerlendirme tamamen ücretsizdir. Hedeflerinizi ve uygunluğunuzu netleştirir, ücretli hizmetlere geçmeden önce size özel bir plan çıkarırız.",
        },
        {
          q: "Yurtdışında okurken çalışabilir miyim?",
          a: "Evet, birçok öğrenci vizesi ülkeden ülkeye değişen kurallar ile dönem içinde yarı zamanlı, tatillerde ise tam zamanlı çalışma imkânı sunar. Biz, hedef ülkenize göre en güncel çalışma haklarını netleştiririz.",
        },
      ],
    },
  },
  en: {
    meta: {
      title: "Lotus Abroad | Study Abroad & Visa Consulting",
      description:
        "Premium study abroad consulting for Germany, the USA, the UK, the Netherlands, Canada, Ireland, and Malta: program selection, applications, student visas, and work visas.",
      ogTitle: "Lotus Abroad | Study Abroad & Visa Consulting",
      ogDescription:
        "Premium guidance for program selection, applications, student visas, and work visas abroad.",
      schemaDescription:
        "Study abroad and visa consulting: program selection, applications, student visas, and work visas with premium guidance.",
      schemaLanguage: "en-US",
    },
    seoKeywords: [
      "study abroad consulting",
      "student visa",
      "work visa abroad",
      "visa consulting",
      "Germany Ausbildung",
      "Work and Travel",
      "Camp USA",
      "language school (USA, Canada, Malta)",
      "UK master's degree",
      "Ireland work and study",
      "degree recognition",
    ],
    hero: {
      badge: "Applications Open for 2026",
      titleLine1: "Your Future",
      titleHighlight: "Has No Borders",
      description:
        "Premium study abroad consulting for Germany, the USA, the UK and more: program selection, applications, student visas, and work visas abroad.",
      primaryCta: "Get Started",
      secondaryCta: "Explore Programs",
    },
    partners: {
      label: "Our Partners",
    },
    destinations: {
      title: "Where will your story begin?",
      description:
        "Explore top education destinations worldwide. High-quality universities, strong career networks, and new opportunities await.",
      cta: "View All Destinations",
      cards: {
        germany: {
          title: "Germany",
          tagline: "Affordable universities & a strong engineering ecosystem.",
        },
        usa: {
          title: "USA",
          tagline: "World-class universities & diverse campus options.",
        },
        uk: {
          title: "United Kingdom",
          tagline: "Prestigious schools & intensive 1-year master's programs.",
        },
        malta: {
          title: "Malta",
          tagline: "English education & Mediterranean lifestyle.",
        },
        netherlands: {
          title: "Netherlands",
          tagline: "Innovative education & an international environment.",
        },
        ireland: {
          title: "Ireland",
          tagline: "Europe's tech hub & post-study work options.",
        },
      },
    },
    process: {
      badge: "Our Process",
      title: "3 Steps to Enrollment",
      steps: [
        {
          title: "1. Free Consultation",
          description:
            "We review your academic profile and goals to build the right country and program route.",
        },
        {
          title: "2. Application & Visa",
          description:
            "We prepare and manage your documents, school applications, and visa process end-to-end.",
        },
        {
          title: "3. Departure & Settling In",
          description:
            "We support you with flights, accommodation, and orientation for your first steps after arrival.",
        },
      ],
    },
    stories: {
      title: "Lotus Abroad Student Stories",
      description:
        "We'll share real student experiences here soon. For now, explore programs to find your best route.",
      filters: {
        all: "All",
        germany: "Germany",
        usa: "USA",
        uk: "United Kingdom",
        netherlands: "Netherlands",
      },
      cards: {
        sarah: {
          country: "USA",
          title: "Sarah's Journey",
          subtitle: "Computer Science (Master's) at NYU",
        },
        ahmet: {
          country: "Germany",
          title: "İbrahim's Story",
          subtitle: "Engineering in Cologne",
        },
        elena: {
          country: "United Kingdom",
          title: "Elena's Success",
          subtitle: "MBA at Oxford",
        },
        john: {
          country: "Netherlands",
          title: "John's Experience",
          subtitle: "Design in Amsterdam",
        },
      },
    },
    reviews: {
      avatarAlt: "Student photo",
      items: [
        {
          quote:
            "\"Lotus Abroad made the impossible possible. I got a full scholarship to my dream university in Berlin!\"",
          name: "Merve S.",
          meta: "Studying in Germany",
        },
        {
          quote:
            "\"The visa process felt intimidating, but the team handled everything. I just showed up for the appointment.\"",
          name: "Emre T.",
          meta: "Studying in the UK",
        },
        {
          quote:
            "\"Best consulting I've experienced. They care about your future, not just placing you somewhere.\"",
          name: "Ayşe K.",
          meta: "Studying in the USA",
        },
      ],
    },
    why: {
      badge: "Why Lotus Abroad?",
      title: "A premium, guided journey.",
      description:
        "We simplify complex steps: the right program, organized documents, clear timelines, and confident communication.",
      items: [
        {
          id: "roadmap",
          icon: "verified",
          title: "Transparent roadmap",
          body: "Clear steps, document lists, and a reliable timeline from application to visa.",
        },
        {
          id: "risk-control",
          icon: "shield_lock",
          title: "Risk-focused review",
          body: "We proactively prevent document gaps, deadline misses, and visa risks.",
        },
        {
          id: "support",
          icon: "support_agent",
          title: "24/7 communication",
          body: "Consistent updates throughout the process with fast responses.",
        },
        {
          id: "fit-selection",
          icon: "travel_explore",
          title: "Profile-fit selection",
          body: "We match you with the right country/program for a strong route.",
        },
      ],
	    },
	    journey: {
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
	    assessment: {
	      badge: "Free Assessment",
      title: "Let's analyze your profile and map your route.",
      description:
        "Fill out the short form. Our team will reach out within 24 hours.",
      bullets: [
        "Personalized program recommendations",
        "Visa eligibility & document check",
        "Budget & timeline planning",
      ],
      form: {
        firstNameLabel: "First name",
        lastNameLabel: "Last name",
        emailLabel: "Email",
        countryLabel: "Target country",
        firstNamePlaceholder: "First name",
        lastNamePlaceholder: "Last name",
        emailPlaceholder: "name@example.com",
        countryPlaceholder: "Please select",
        countries: {
          germany: "Germany",
          usa: "USA",
          uk: "United Kingdom",
          other: "Other",
        },
        submit: "Get a Free Assessment",
        note: "No credit card required. Your data is safe.",
        submitting: "Sending...",
        success: "Thanks! We received your request. We’ll reach out within 24 hours.",
        error: "Could not send. Please try again.",
      },
    },
    faq: {
      title: "Frequently Asked Questions",
      items: [
        {
          q: "Do I need to know German to study in Germany?",
          a: "Not necessarily. Many universities, especially at master's level, offer fully English-taught programs. We help you find the right options.",
        },
        {
          q: "How much is the consultation?",
          a: "The first assessment is completely free. We clarify your goals and eligibility and share a tailored plan before any paid services.",
        },
        {
          q: "Can I work while studying abroad?",
          a: "Yes. Many student visas allow part-time work during semesters and full-time work during breaks, depending on the country. We confirm the latest rules for your destination.",
        },
      ],
    },
  },
  de: {
    meta: {
      title: "Lotus Abroad | Auslandsstudium & Visaberatung",
      description:
        "Premium Beratung für Auslandsstudium und Visa für Deutschland, USA, Vereinigtes Königreich, Niederlande, Kanada, Irland und Malta: Programmauswahl, Bewerbung, Studentenvisum und Arbeitsvisum.",
      ogTitle: "Lotus Abroad | Auslandsstudium & Visaberatung",
      ogDescription:
        "Premium Unterstützung bei Programmauswahl, Bewerbung, Studentenvisum und Arbeitsvisum im Ausland.",
      schemaDescription:
        "Auslandsstudium- und Visaberatung: Programmauswahl, Bewerbung, Studentenvisum und Arbeitsvisum mit Premium Unterstützung.",
      schemaLanguage: "de-DE",
    },
    seoKeywords: [
      "Auslandsstudium Beratung",
      "Studentenvisum",
      "Arbeitsvisum Ausland",
      "Visaberatung",
      "Deutschland Ausbildung",
      "Work and Travel",
      "Camp USA",
      "Sprachschule (USA, Kanada, Malta)",
      "Master in Großbritannien",
      "Irland Work and Study",
      "Anerkennung von Abschlüssen",
    ],
    hero: {
      badge: "Bewerbungen für 2026 geöffnet",
      titleLine1: "Deine Zukunft",
      titleHighlight: "kennt keine Grenzen",
      description:
        "Premium Beratung für Auslandsstudium: Programmauswahl, Bewerbung, Studentenvisum und Arbeitsvisum für Deutschland, USA, UK und mehr.",
      primaryCta: "Jetzt starten",
      secondaryCta: "Programme entdecken",
    },
    partners: {
      label: "Unsere Partner",
    },
    destinations: {
      title: "Wo beginnt deine Geschichte?",
      description:
        "Entdecke die besten Bildungsziele weltweit. Hochwertige Universitäten, starke Netzwerke und neue Chancen warten auf dich.",
      cta: "Alle Ziele ansehen",
      cards: {
        germany: {
          title: "Deutschland",
          tagline: "Bezahlbare Unis & ein starkes Engineering-Ökosystem.",
        },
        usa: {
          title: "USA",
          tagline: "Top-Universitäten & vielfältige Campus-Optionen.",
        },
        uk: {
          title: "Vereinigtes Königreich",
          tagline: "Renommierte Schulen & intensive 1-jährige Masterprogramme.",
        },
        malta: {
          title: "Malta",
          tagline: "Englisch lernen & mediterraner Lifestyle.",
        },
        netherlands: {
          title: "Niederlande",
          tagline: "Innovative Bildung & internationales Umfeld.",
        },
        ireland: {
          title: "Irland",
          tagline: "Europas Tech-Hub & Optionen nach dem Studium zu arbeiten.",
        },
      },
    },
    process: {
      badge: "Unser Prozess",
      title: "In 3 Schritten zur Bewerbung",
      steps: [
        {
          title: "1. Kostenlose Beratung",
          description:
            "Wir analysieren Profil und Ziele und erstellen die passende Länder- und Programmroute.",
        },
        {
          title: "2. Bewerbung & Visum",
          description:
            "Wir bereiten Unterlagen vor, koordinieren Bewerbungen und begleiten den Visaprozess komplett.",
        },
        {
          title: "3. Abreise & Ankommen",
          description:
            "Wir unterstützen bei Flug, Unterkunft und Orientierung für die ersten Schritte vor Ort.",
        },
      ],
    },
    stories: {
      title: "Erfahrungen unserer Studierenden",
      description:
        "Bald teilen wir hier echte Erfahrungsberichte. Bis dahin kannst du Programme entdecken und deine beste Route wählen.",
      filters: {
        all: "Alle",
        germany: "Deutschland",
        usa: "USA",
        uk: "Vereinigtes Königreich",
        netherlands: "Niederlande",
      },
      cards: {
        sarah: {
          country: "USA",
          title: "Sarahs Weg",
          subtitle: "Informatik (Master) an der NYU",
        },
        ahmet: {
          country: "Deutschland",
          title: "İbrahims Geschichte",
          subtitle: "Engineering in Köln",
        },
        elena: {
          country: "Vereinigtes Königreich",
          title: "Elenas Erfolg",
          subtitle: "MBA in Oxford",
        },
        john: {
          country: "Niederlande",
          title: "Johns Erfahrung",
          subtitle: "Design in Amsterdam",
        },
      },
    },
    reviews: {
      avatarAlt: "Studentenfoto",
      items: [
        {
          quote:
            "\"Lotus Abroad hat das Unmögliche möglich gemacht. Ich habe ein Vollstipendium an meiner Traum-Uni in Berlin bekommen!\"",
          name: "Merve S.",
          meta: "Studiert in Deutschland",
        },
        {
          quote:
            "\"Der Visaprozess war einschüchternd, aber das Team hat alles gemanagt. Ich musste nur zum Termin gehen.\"",
          name: "Emre T.",
          meta: "Studiert im Vereinigten Königreich",
        },
        {
          quote:
            "\"Die beste Beratung bisher. Sie kümmern sich um deine Zukunft - nicht nur um eine Platzierung.\"",
          name: "Ayşe K.",
          meta: "Studiert in den USA",
        },
      ],
    },
    why: {
      badge: "Warum Lotus Abroad?",
      title: "Ein Premium-Prozess, der dich führt.",
      description:
        "Wir machen Komplexes einfach: die richtige Programmauswahl, saubere Unterlagen, klare Timeline und verlässliche Kommunikation.",
      items: [
        {
          id: "roadmap",
          icon: "verified",
          title: "Transparente Roadmap",
          body: "Klare Schritte, Dokumentenliste und zuverlässige Timeline von Bewerbung bis Visum.",
        },
        {
          id: "risk-control",
          icon: "shield_lock",
          title: "Risikofokus",
          body: "Wir vermeiden Lücken bei Unterlagen, Deadlines und Visarisiken frühzeitig.",
        },
        {
          id: "support",
          icon: "support_agent",
          title: "24/7 Kommunikation",
          body: "Regelmäßige Updates und schnelle Antworten während des gesamten Prozesses.",
        },
        {
          id: "fit-selection",
          icon: "travel_explore",
          title: "Passende Auswahl",
          body: "Wir matchen Land und Programm zu deinem Profil und bauen eine starke Route.",
        },
      ],
	    },
	    journey: {
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
	    assessment: {
	      badge: "Kostenlose Einschätzung",
      title: "Wir analysieren dein Profil und planen deine Route.",
      description:
        "Fülle das kurze Formular aus. Unser Team meldet sich innerhalb von 24 Stunden.",
      bullets: [
        "Personalisierte Programmauswahl",
        "Visa-Eignung & Dokumentencheck",
        "Budget- & Zeitplanung",
      ],
      form: {
        firstNameLabel: "Vorname",
        lastNameLabel: "Nachname",
        emailLabel: "E-Mail",
        countryLabel: "Zielland",
        firstNamePlaceholder: "Vorname",
        lastNamePlaceholder: "Nachname",
        emailPlaceholder: "name@beispiel.de",
        countryPlaceholder: "Bitte auswählen",
        countries: {
          germany: "Deutschland",
          usa: "USA",
          uk: "Vereinigtes Königreich",
          other: "Andere",
        },
        submit: "Kostenlos einschätzen lassen",
        note: "Keine Kreditkarte nötig. Deine Daten sind sicher.",
        submitting: "Wird gesendet...",
        success: "Danke! Anfrage erhalten. Wir melden uns innerhalb von 24 Stunden.",
        error: "Senden fehlgeschlagen. Bitte erneut versuchen.",
      },
    },
    faq: {
      title: "Häufige Fragen",
      items: [
        {
          q: "Muss ich Deutsch können, um in Deutschland zu studieren?",
          a: "Nicht unbedingt. Viele Universitäten bieten, besonders im Master, vollständig englischsprachige Programme an. Wir helfen dir, passende Optionen zu finden.",
        },
        {
          q: "Was kostet das Gespräch?",
          a: "Die erste Einschätzung ist komplett kostenlos. Wir klären Ziele und Eignung und geben dir einen individuellen Plan, bevor es zu kostenpflichtigen Services geht.",
        },
        {
          q: "Kann ich während des Studiums im Ausland arbeiten?",
          a: "Ja. Viele Studentenvisa erlauben Teilzeit während des Semesters und Vollzeit in den Ferien, abhängig vom Land. Wir bestätigen die aktuellsten Regeln für dein Zielland.",
        },
      ],
    },
  },
} as const;

export default function HomePage() {
  const router = useRouter();
  const locale = (router.locale ?? "tr") as keyof typeof COPY;
  const copy = COPY[locale] ?? COPY.tr;

  const [videoOpen, setVideoOpen] = useState(false);
  const [activeStory, setActiveStory] = useState<keyof typeof STORY_VIDEO_PATHS | null>(null);
  const lastStoryTriggerRef = useRef<HTMLElement | null>(null);

  const [storyVideoUrls, setStoryVideoUrls] = useState<
    Record<keyof typeof STORY_VIDEO_PATHS, string>
  >(() => ({
    sarah: getSupabasePublicVideoUrl(STORY_VIDEO_PATHS.sarah),
    ahmet: getSupabasePublicVideoUrl(STORY_VIDEO_PATHS.ahmet),
    elena: getSupabasePublicVideoUrl(STORY_VIDEO_PATHS.elena),
    john: getSupabasePublicVideoUrl(STORY_VIDEO_PATHS.john),
  }));

  const [assessmentForm, setAssessmentForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    company: "",
  });
  const [assessmentStatus, setAssessmentStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [assessmentError, setAssessmentError] = useState<string | null>(null);

  const activeVideoSrc = useMemo(() => {
    if (!activeStory) return "";
    return storyVideoUrls[activeStory] ?? "";
  }, [activeStory, storyVideoUrls]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const debugEnabled = isVideoDebugEnabled();
    const controller = new AbortController();
    const storyKeys = Object.keys(STORY_VIDEO_PATHS) as Array<keyof typeof STORY_VIDEO_PATHS>;

    if (debugEnabled) {
      try {
        console.groupCollapsed("[LotusAbroad] video debug");
        console.info("bucket", SUPABASE_VIDEO_BUCKET);
        console.info("paths", { ...STORY_VIDEO_PATHS });
        console.info("initialUrls", { ...storyVideoUrls });
        console.groupEnd();
      } catch {}
    }

    const loadSignedUrl = async (key: keyof typeof STORY_VIDEO_PATHS) => {
      const rawPath = (STORY_VIDEO_PATHS[key] ?? "").trim();
      if (!rawPath) return;
      if (rawPath.startsWith("http://") || rawPath.startsWith("https://")) return;

      const query = new URLSearchParams({
        bucket: SUPABASE_VIDEO_BUCKET,
        path: rawPath,
        expiresIn: String(60 * 60 * 24), // 24h
      });

      try {
        if (debugEnabled) {
          console.info("[LotusAbroad] requesting signed url", { key, rawPath });
        }
        const resp = await fetch(`/api/story-video?${query.toString()}`, {
          signal: controller.signal,
        });
        const data = (await resp.json().catch(() => null)) as
          | { ok: true; url: string }
          | { ok: false; error: string }
          | null;

        if (!resp.ok || !data || (data as any).ok !== true || typeof (data as any).url !== "string") {
          if (debugEnabled) {
            console.warn("[LotusAbroad] story video signed-url failed", {
              key,
              rawPath,
              status: resp.status,
              error: (data as any)?.error ?? null,
            });
          }
          return;
        }

        setStoryVideoUrls((prev) => ({ ...prev, [key]: (data as any).url }));
        if (debugEnabled) {
          console.info("[LotusAbroad] story video signed-url ready", { key, rawPath });
        }
      } catch (err) {
        if (debugEnabled) {
          console.warn("[LotusAbroad] story video signed-url request failed", { key, rawPath, err });
        }
      }
    };

    storyKeys.forEach((key) => {
      void loadSignedUrl(key);
    });

    return () => controller.abort();
  }, []);

  const onAssessmentSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (assessmentStatus === "sending") return;

    setAssessmentStatus("sending");
    setAssessmentError(null);

    const fullName = `${assessmentForm.firstName} ${assessmentForm.lastName}`.trim();
    const messagePrefix =
      locale === "de"
        ? "Anfrage: Kostenlose Einschätzung (Landing Page)"
        : locale === "en"
          ? "Request: Free Assessment (Landing Page)"
          : "Talep: Ücretsiz Değerlendirme (Landing Page)";

    const message = [
      messagePrefix,
      "",
      assessmentForm.country ? `Country: ${assessmentForm.country}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    try {
      const resp = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email: assessmentForm.email.trim(),
          country: assessmentForm.country,
          message,
          company: assessmentForm.company,
          locale,
        }),
      });

      const data = (await resp.json().catch(() => null)) as { ok?: boolean; error?: string } | null;

      if (!resp.ok || !data?.ok) {
        setAssessmentStatus("error");
        setAssessmentError(data?.error || copy.assessment.form.error);
        return;
      }

      setAssessmentStatus("success");
      setAssessmentForm((prev) => ({ ...prev, firstName: "", lastName: "", email: "", country: "", company: "" }));
    } catch {
      setAssessmentStatus("error");
      setAssessmentError(copy.assessment.form.error);
    }
  };

  const seoKeywordsMeta = copy.seoKeywords.join(", ");
  const heroImages = useMemo(
    () => [
      HERO_BG_URL,
      HERO_BG_URL_ALT,
      HERO_BG_URL_FALLBACK,
    ],
    [],
  );
  const [heroIndex, setHeroIndex] = useState(0);
  const [heroIsFading, setHeroIsFading] = useState(false);

  useEffect(() => {
    if (heroImages.length < 2) return;

    heroImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    const fadeMs = 1000;
    const rotateMs = 6500;
    let fadeTimeout: number | undefined;

    const interval = window.setInterval(() => {
      setHeroIsFading(true);
      fadeTimeout = window.setTimeout(() => {
        setHeroIndex((current) => (current + 1) % heroImages.length);
        setHeroIsFading(false);
      }, fadeMs);
    }, rotateMs);

    return () => {
      window.clearInterval(interval);
      if (fadeTimeout) window.clearTimeout(fadeTimeout);
    };
  }, [heroImages]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    document.documentElement.classList.add("reveal-enabled");
    return () => {
      document.documentElement.classList.remove("reveal-enabled");
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const revealElements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    ).filter((element) => !element.classList.contains("reveal-in"));
    if (!revealElements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          (entry.target as HTMLElement).classList.add("reveal-in");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.15 },
    );

    revealElements.forEach((element) => observer.observe(element));
    return () => {
      observer.disconnect();
    };
  }, [locale]);

  const heroCurrentUrl = heroImages[heroIndex] ?? HERO_BG_URL;
  const heroNextUrl =
    heroImages.length > 0 ? heroImages[(heroIndex + 1) % heroImages.length] : HERO_BG_URL;

  return (
    <>
      <Head>
        <title>{copy.meta.title}</title>
        <meta
          content={copy.meta.description}
          name="description"
        />
        <meta
          content={seoKeywordsMeta}
          name="keywords"
        />
        <meta content="website" property="og:type" />
        <meta
          content={copy.meta.ogTitle}
          property="og:title"
        />
        <meta
          content={copy.meta.ogDescription}
          property="og:description"
        />
        <meta content="summary_large_image" name="twitter:card" />
        <script
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Lotus Abroad",
              description:
                copy.meta.schemaDescription,
              inLanguage: copy.meta.schemaLanguage,
              potentialAction: {
                "@type": "SearchAction",
                target: "/programs?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
          type="application/ld+json"
        />
      </Head>

      <SiteHeader />

      <section className="relative min-h-[90vh] flex items-center justify-center pt-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-center"
            data-alt="Happy students studying outdoors on a university campus with sunlight filtering through trees"
            style={{ backgroundImage: `url('${heroCurrentUrl}')` }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `url('${heroNextUrl}')`,
              opacity: heroIsFading ? 1 : 0,
              transition: heroIsFading ? "opacity 1000ms ease" : "none",
              willChange: "opacity",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-background-light dark:to-background-dark z-10" />
        </div>
        <div className="relative z-20 max-w-[1280px] w-full px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center gap-8 mt-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white text-xs font-bold uppercase tracking-widest mb-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            {copy.hero.badge}
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[1.1] tracking-tight max-w-4xl drop-shadow-xl">
            {copy.hero.titleLine1} <br />
            <span className="text-primary relative inline-block">
              {copy.hero.titleHighlight}
              <svg
                className="absolute w-full h-3 -bottom-1 left-0 text-white opacity-40"
                preserveAspectRatio="none"
                viewBox="0 0 100 10"
              >
                <path
                  d="M0 5 Q 50 10 100 5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 font-medium max-w-2xl leading-relaxed drop-shadow-md">
            {copy.hero.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-4">
            <button
              className="h-14 px-8 rounded-full bg-primary text-black text-base font-bold tracking-wide hover:scale-105 transition-transform flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(249,245,6,0.4)]"
              type="button"
            >
              {copy.hero.primaryCta}
              <span className="material-symbols-outlined text-xl">
                arrow_forward
              </span>
            </button>
            <Link
              className="h-14 px-8 rounded-full bg-white/10 backdrop-blur-md border border-white/30 text-white text-base font-bold tracking-wide hover:bg-white/20 transition-all flex items-center justify-center gap-2"
              href="/programs"
            >
              <span className="material-symbols-outlined filled">
                travel_explore
              </span>
              {copy.hero.secondaryCta}
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 border-b border-gray-200 dark:border-white/10 overflow-hidden bg-white dark:bg-white/5">
        <div className="max-w-[1280px] mx-auto px-4 mb-8">
          <p className="text-center text-sm font-bold text-text-muted dark:text-gray-400 uppercase tracking-widest">
            {copy.partners.label}
          </p>
        </div>
        <div className="flex overflow-hidden">
          <div className="flex animate-marquee gap-16 px-8 items-center min-w-full justify-around shrink-0 text-text-muted dark:text-gray-400 hover:text-text-main dark:hover:text-white transition-colors duration-300">
            {PARTNER_LOGOS.map((logo) => (
              <PartnerLogo key={logo.id} {...logo} />
            ))}
          </div>
          <div
            aria-hidden="true"
            className="flex animate-marquee gap-16 px-8 items-center min-w-full justify-around shrink-0 text-text-muted dark:text-gray-400 hover:text-text-main dark:hover:text-white transition-colors duration-300"
          >
            {PARTNER_LOGOS.map((logo) => (
              <PartnerLogo key={`dup-${logo.id}`} {...logo} />
            ))}
          </div>
        </div>
      </section>

      <style jsx global>{`
        .partner-logo[data-logo="aupair"] .partner-logo__img {
          opacity: 0.72;
          filter: grayscale(100%) brightness(0.75) contrast(1.05);
          transition:
            filter 200ms ease,
            opacity 200ms ease,
            transform 200ms ease;
        }

        .partner-logo[data-logo="aupair"]:hover .partner-logo__img {
          opacity: 0.92;
          filter: grayscale(100%) brightness(0.6) contrast(1.1);
          transform: scale(1.03);
        }

        html.dark .partner-logo[data-logo="aupair"] .partner-logo__img {
          opacity: 0.82;
          filter: grayscale(100%) brightness(1.35) contrast(0.95);
        }

        html.dark .partner-logo[data-logo="aupair"]:hover .partner-logo__img {
          opacity: 1;
          filter: grayscale(100%) brightness(1.5) contrast(0.95);
          transform: scale(1.03);
        }

        .partner-logo[data-logo="balliedu"] .partner-logo__img,
        .partner-logo[data-logo="ceb"] .partner-logo__img,
        .partner-logo[data-logo="ccusa"] .partner-logo__img,
        .partner-logo[data-logo="rheinland"] .partner-logo__img,
        .partner-logo[data-logo="tandem"] .partner-logo__img {
          opacity: 0.78;
          filter: grayscale(100%) brightness(0.55) contrast(1.15);
          mix-blend-mode: multiply;
          transition:
            filter 200ms ease,
            opacity 200ms ease,
            transform 200ms ease;
        }

        .partner-logo[data-logo="balliedu"]:hover .partner-logo__img,
        .partner-logo[data-logo="ceb"]:hover .partner-logo__img,
        .partner-logo[data-logo="ccusa"]:hover .partner-logo__img,
        .partner-logo[data-logo="rheinland"]:hover .partner-logo__img,
        .partner-logo[data-logo="tandem"]:hover .partner-logo__img {
          opacity: 0.92;
          filter: grayscale(100%) brightness(0.45) contrast(1.2);
          transform: scale(1.03);
        }

        html.dark .partner-logo[data-logo="balliedu"] .partner-logo__img,
        html.dark .partner-logo[data-logo="ceb"] .partner-logo__img,
        html.dark .partner-logo[data-logo="ccusa"] .partner-logo__img,
        html.dark .partner-logo[data-logo="rheinland"] .partner-logo__img,
        html.dark .partner-logo[data-logo="tandem"] .partner-logo__img {
          opacity: 0.88;
          filter: grayscale(100%) invert(1) brightness(1.25) contrast(1.05);
          mix-blend-mode: screen;
        }

        html.dark .partner-logo[data-logo="balliedu"]:hover .partner-logo__img,
        html.dark .partner-logo[data-logo="ceb"]:hover .partner-logo__img,
        html.dark .partner-logo[data-logo="ccusa"]:hover .partner-logo__img,
        html.dark .partner-logo[data-logo="rheinland"]:hover .partner-logo__img,
        html.dark .partner-logo[data-logo="tandem"]:hover .partner-logo__img {
          opacity: 1;
          filter: grayscale(100%) invert(1) brightness(1.35) contrast(1.05);
          transform: scale(1.03);
        }

        .reveal-enabled [data-reveal] {
          opacity: 0;
          transform: translateY(14px);
          filter: blur(10px);
          transition:
            opacity 700ms cubic-bezier(0.2, 0.9, 0.2, 1),
            transform 700ms cubic-bezier(0.2, 0.9, 0.2, 1),
            filter 700ms cubic-bezier(0.2, 0.9, 0.2, 1);
          will-change: opacity, transform, filter;
        }

        .reveal-enabled .reveal-in {
          opacity: 1;
          transform: translateY(0);
          filter: blur(0);
        }

        .premium-card {
          position: relative;
          overflow: hidden;
        }

        .premium-card::before {
          content: "";
          position: absolute;
          inset: -2px;
          pointer-events: none;
          opacity: 0.65;
          background: linear-gradient(
            120deg,
            rgba(249, 245, 6, 0) 0%,
            rgba(249, 245, 6, 0.22) 35%,
            rgba(255, 255, 255, 0.0) 70%
          );
          transform: translateX(-120%);
          transition: transform 900ms cubic-bezier(0.2, 0.9, 0.2, 1);
          mix-blend-mode: overlay;
        }

        .premium-card:hover::before {
          transform: translateX(120%);
        }

        .premium-blob {
          animation: premiumFloat 7s ease-in-out infinite;
        }

        .premium-blob--slow {
          animation-duration: 10s;
        }

        .process-flow {
          --process-c1: 0;
          --process-c2: 0;
        }

        .process-connector {
          position: relative;
          overflow: hidden;
        }

        .process-connector::after {
          content: "";
          position: absolute;
          inset: 0;
          transform-origin: left;
          transition: transform 650ms cubic-bezier(0.2, 0.9, 0.2, 1);
          will-change: transform;
          background: linear-gradient(
            90deg,
            rgba(249, 245, 6, 1) 0%,
            rgba(249, 245, 6, 0.75) 55%,
            rgba(249, 245, 6, 0.25) 100%
          );
          transform: scaleX(0);
        }

        .process-connector--1::after {
          transform: scaleX(var(--process-c1));
        }

        .process-connector--2::after {
          transform: scaleX(var(--process-c2));
        }

        @supports selector(:has(*)) {
          .process-flow:has(.process-step[data-step="1"]:hover) {
            --process-c1: 1;
            --process-c2: 0;
          }
          .process-flow:has(.process-step[data-step="2"]:hover) {
            --process-c1: 1;
            --process-c2: 1;
          }
          .process-flow:has(.process-step[data-step="3"]:hover) {
            --process-c1: 0;
            --process-c2: 1;
          }
          .process-flow:has(.process-connector--1:hover) {
            --process-c1: 1;
          }
          .process-flow:has(.process-connector--2:hover) {
            --process-c2: 1;
          }
        }

        @keyframes premiumFloat {
          0% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          50% {
            transform: translate3d(10px, -10px, 0) scale(1.04);
          }
          100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .reveal-enabled [data-reveal] {
            opacity: 1 !important;
            transform: none !important;
            filter: none !important;
            transition: none !important;
          }
          .premium-card::before {
            transition: none !important;
          }
          .premium-blob {
            animation: none !important;
          }
          .process-connector::after {
            transition: none !important;
          }
        }
      `}</style>

      <section className="py-20 px-4 sm:px-6 lg:px-8" id="destinations">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid gap-6 md:grid-cols-[1fr,auto] md:items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                {copy.destinations.title}
              </h2>
              <p className="text-text-muted dark:text-gray-400 text-lg max-w-xl">
                {copy.destinations.description}
              </p>
            </div>
            <Link
              className="flex items-center gap-2 text-sm font-bold border-b-2 border-primary pb-1 hover:text-primary transition-colors w-fit md:justify-self-end"
              href="/programs"
            >
              {copy.destinations.cta}
              <span className="material-symbols-outlined text-lg">
                arrow_forward
              </span>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link
              className="group relative rounded-2xl overflow-hidden cursor-pointer h-[350px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background-light dark:focus-visible:ring-offset-background-dark"
              href={{ pathname: "/programs", query: { country: "Germany" }, hash: "countries" }}
              aria-label={`${copy.destinations.cards.germany.title} programlarını görüntüle`}
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                data-alt="Brandenburg Gate in Berlin, Germany during sunset"
                data-location="Germany"
                style={{ backgroundImage: `url('${DEST_GERMANY_BG_URL}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute bottom-0 p-8 w-full">
                <h3 className="text-2xl font-bold text-white mb-1">
                  {copy.destinations.cards.germany.title}
                </h3>
                <p className="text-white/80 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                  {copy.destinations.cards.germany.tagline}
                </p>
              </div>
            </Link>
            <Link
              className="group relative rounded-2xl overflow-hidden cursor-pointer h-[350px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background-light dark:focus-visible:ring-offset-background-dark"
              href={{ pathname: "/programs", query: { country: "USA" }, hash: "countries" }}
              aria-label={`${copy.destinations.cards.usa.title} programlarını görüntüle`}
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                data-alt="Statue of Liberty in New York City, USA"
                data-location="USA"
                style={{ backgroundImage: `url('${DEST_USA_BG_URL}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute bottom-0 p-8 w-full">
                <h3 className="text-2xl font-bold text-white mb-1">
                  {copy.destinations.cards.usa.title}
                </h3>
                <p className="text-white/80 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                  {copy.destinations.cards.usa.tagline}
                </p>
              </div>
            </Link>
            <Link
              className="group relative rounded-2xl overflow-hidden cursor-pointer h-[350px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background-light dark:focus-visible:ring-offset-background-dark"
              href={{ pathname: "/programs", query: { country: "United Kingdom" }, hash: "countries" }}
              aria-label={`${copy.destinations.cards.uk.title} programlarını görüntüle`}
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                data-alt="Big Ben and Westminster Bridge in London, England"
                data-location="England"
                style={{ backgroundImage: `url('${DEST_ENGLAND_BG_URL}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute bottom-0 p-8 w-full">
                <h3 className="text-2xl font-bold text-white mb-1">
                  {copy.destinations.cards.uk.title}
                </h3>
                <p className="text-white/80 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                  {copy.destinations.cards.uk.tagline}
                </p>
              </div>
            </Link>
            <Link
              className="group relative rounded-2xl overflow-hidden cursor-pointer h-[350px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background-light dark:focus-visible:ring-offset-background-dark"
              href={{ pathname: "/programs", query: { country: "Malta" }, hash: "countries" }}
              aria-label={`${copy.destinations.cards.malta.title} programlarını görüntüle`}
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                data-alt="Beautiful architecture in Valletta Malta"
                data-location="Malta"
                style={{ backgroundImage: `url('${DEST_MALTA_BG_URL}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute bottom-0 p-8 w-full">
                <h3 className="text-2xl font-bold text-white mb-1">
                  {copy.destinations.cards.malta.title}
                </h3>
                <p className="text-white/80 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                  {copy.destinations.cards.malta.tagline}
                </p>
              </div>
            </Link>
            <Link
              className="group relative rounded-2xl overflow-hidden cursor-pointer h-[350px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background-light dark:focus-visible:ring-offset-background-dark"
              href={{ pathname: "/programs", query: { country: "Netherlands" }, hash: "countries" }}
              aria-label={`${copy.destinations.cards.netherlands.title} programlarını görüntüle`}
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                data-alt="Traditional Dutch architecture and canal in Amsterdam"
                data-location="Netherlands"
                style={{ backgroundImage: `url('${DEST_NETHERLANDS_BG_URL}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute bottom-0 p-8 w-full">
                <h3 className="text-2xl font-bold text-white mb-1">
                  {copy.destinations.cards.netherlands.title}
                </h3>
                <p className="text-white/80 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                  {copy.destinations.cards.netherlands.tagline}
                </p>
              </div>
            </Link>
            <Link
              className="group relative rounded-2xl overflow-hidden cursor-pointer h-[350px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background-light dark:focus-visible:ring-offset-background-dark"
              href={{ pathname: "/programs", query: { country: "Ireland" }, hash: "countries" }}
              aria-label={`${copy.destinations.cards.ireland.title} programlarını görüntüle`}
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                data-alt="Green landscape and cliffs in Ireland"
                data-location="Ireland"
                style={{ backgroundImage: `url('${DEST_IRELAND_BG_URL}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute bottom-0 p-8 w-full">
                <h3 className="text-2xl font-bold text-white mb-1">
                  {copy.destinations.cards.ireland.title}
                </h3>
                <p className="text-white/80 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                  {copy.destinations.cards.ireland.tagline}
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50 dark:bg-white/5">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-primary text-sm font-bold uppercase tracking-widest">
              {copy.process.badge}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mt-3">
              {copy.process.title}
            </h2>
          </div>
          <div className="process-flow relative grid gap-10 md:gap-8 md:grid-cols-[1fr_minmax(3rem,8rem)_1fr_minmax(3rem,8rem)_1fr]">
            <div className="process-step flex flex-col items-center text-center group" data-step="1">
              <div className="w-24 h-24 rounded-full bg-white dark:bg-[#323226] border-4 border-primary flex items-center justify-center shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="material-symbols-outlined text-4xl text-text-main dark:text-white">
                  chat_bubble
                </span>
              </div>
              <h3 className="text-xl font-bold mb-3">
                {copy.process.steps[0].title}
              </h3>
              <p className="text-text-muted dark:text-gray-400">
                {copy.process.steps[0].description}
              </p>
            </div>

            <div
              aria-hidden="true"
              className="process-connector process-connector--1 hidden md:block mt-12 h-1 rounded-full bg-gray-200 dark:bg-white/10"
            />

            <div className="process-step flex flex-col items-center text-center group" data-step="2">
              <div className="w-24 h-24 rounded-full bg-white dark:bg-[#323226] border-4 border-gray-200 dark:border-gray-700 flex items-center justify-center shadow-lg mb-6 group-hover:border-primary group-hover:scale-110 transition-all duration-300">
                <span className="material-symbols-outlined text-4xl text-text-main dark:text-white">
                  edit_document
                </span>
              </div>
              <h3 className="text-xl font-bold mb-3">
                {copy.process.steps[1].title}
              </h3>
              <p className="text-text-muted dark:text-gray-400">
                {copy.process.steps[1].description}
              </p>
            </div>

            <div
              aria-hidden="true"
              className="process-connector process-connector--2 hidden md:block mt-12 h-1 rounded-full bg-gray-200 dark:bg-white/10"
            />

            <div className="process-step flex flex-col items-center text-center group" data-step="3">
              <div className="w-24 h-24 rounded-full bg-white dark:bg-[#323226] border-4 border-gray-200 dark:border-gray-700 flex items-center justify-center shadow-lg mb-6 group-hover:border-primary group-hover:scale-110 transition-all duration-300">
                <span className="material-symbols-outlined text-4xl text-text-main dark:text-white">
                  flight_takeoff
                </span>
              </div>
              <h3 className="text-xl font-bold mb-3">
                {copy.process.steps[2].title}
              </h3>
              <p className="text-text-muted dark:text-gray-400">
                {copy.process.steps[2].description}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1280px] mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-center">
            {copy.stories.title}
          </h2>
          <p className="text-center text-text-muted dark:text-gray-400 mb-10 max-w-2xl mx-auto">
            {copy.stories.description}
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            <button
              className="px-6 py-2 rounded-full bg-primary text-black font-bold text-sm hover:brightness-105 transition-all"
              type="button"
            >
              {copy.stories.filters.all}
            </button>
            <button
              className="px-6 py-2 rounded-full bg-gray-100 dark:bg-white/10 text-text-main dark:text-white font-medium text-sm hover:bg-gray-200 dark:hover:bg-white/20 transition-all"
              type="button"
            >
              {copy.stories.filters.germany}
            </button>
            <button
              className="px-6 py-2 rounded-full bg-gray-100 dark:bg-white/10 text-text-main dark:text-white font-medium text-sm hover:bg-gray-200 dark:hover:bg-white/20 transition-all"
              type="button"
            >
              {copy.stories.filters.usa}
            </button>
            <button
              className="px-6 py-2 rounded-full bg-gray-100 dark:bg-white/10 text-text-main dark:text-white font-medium text-sm hover:bg-gray-200 dark:hover:bg-white/20 transition-all"
              type="button"
            >
              {copy.stories.filters.uk}
            </button>
            <button
              className="px-6 py-2 rounded-full bg-gray-100 dark:bg-white/10 text-text-main dark:text-white font-medium text-sm hover:bg-gray-200 dark:hover:bg-white/20 transition-all"
              type="button"
            >
              {copy.stories.filters.netherlands}
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            <button
              className="relative aspect-[9/16] rounded-2xl overflow-hidden group shadow-lg text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
              type="button"
              onClick={(event) => {
                lastStoryTriggerRef.current = event.currentTarget;
                setActiveStory("sarah");
                setVideoOpen(true);
              }}
            >
              {storyVideoUrls.sarah ? (
                <video
                  aria-hidden="true"
                  className="pointer-events-none w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  src={storyVideoUrls.sarah}
                />
              ) : (
                <img
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  data-alt="Student smiling in library"
                  src={STORY_SARAH_IMG_URL}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/40 group-hover:scale-110 transition-transform duration-300">
                  <span className="material-symbols-outlined text-white text-4xl filled drop-shadow-lg">
                    play_arrow
                  </span>
                </div>
              </div>
              <div className="absolute bottom-5 left-5 text-white">
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded-md bg-white/20 backdrop-blur-sm text-[10px] font-bold uppercase tracking-wider">
                    {copy.stories.cards.sarah.country}
                  </span>
                </div>
                <p className="font-bold text-lg leading-tight">
                  {copy.stories.cards.sarah.title}
                </p>
                <p className="text-xs text-white/80">
                  {copy.stories.cards.sarah.subtitle}
                </p>
              </div>
            </button>
            <button
              className="relative aspect-[9/16] rounded-2xl overflow-hidden group shadow-lg md:mt-8 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
              type="button"
              onClick={(event) => {
                lastStoryTriggerRef.current = event.currentTarget;
                setActiveStory("ahmet");
                setVideoOpen(true);
              }}
            >
              {storyVideoUrls.ahmet ? (
                <video
                  aria-hidden="true"
                  autoPlay
                  className="pointer-events-none w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  src={storyVideoUrls.ahmet}
                />
              ) : (
                <div
                  aria-hidden="true"
                  className="w-full h-full bg-gradient-to-br from-black via-[#1f1e16] to-[#2c2b18] transition-transform duration-700 group-hover:scale-105"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/40 group-hover:scale-110 transition-transform duration-300">
                  <span className="material-symbols-outlined text-white text-4xl filled drop-shadow-lg">
                    play_arrow
                  </span>
                </div>
              </div>
              <div className="absolute bottom-5 left-5 text-white">
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded-md bg-white/20 backdrop-blur-sm text-[10px] font-bold uppercase tracking-wider">
                    {copy.stories.cards.ahmet.country}
                  </span>
                </div>
                <p className="font-bold text-lg leading-tight">
                  {copy.stories.cards.ahmet.title}
                </p>
                <p className="text-xs text-white/80">
                  {copy.stories.cards.ahmet.subtitle}
                </p>
              </div>
            </button>
            <button
              className="relative aspect-[9/16] rounded-2xl overflow-hidden group shadow-lg text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
              type="button"
              onClick={(event) => {
                lastStoryTriggerRef.current = event.currentTarget;
                setActiveStory("elena");
                setVideoOpen(true);
              }}
            >
              {storyVideoUrls.elena ? (
                <video
                  aria-hidden="true"
                  className="pointer-events-none w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  src={storyVideoUrls.elena}
                />
              ) : (
                <img
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  data-alt="Female student looking at tablet in cafe"
                  src={STORY_ELENA_IMG_URL}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/40 group-hover:scale-110 transition-transform duration-300">
                  <span className="material-symbols-outlined text-white text-4xl filled drop-shadow-lg">
                    play_arrow
                  </span>
                </div>
              </div>
              <div className="absolute bottom-5 left-5 text-white">
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded-md bg-white/20 backdrop-blur-sm text-[10px] font-bold uppercase tracking-wider">
                    {copy.stories.cards.elena.country}
                  </span>
                </div>
                <p className="font-bold text-lg leading-tight">
                  {copy.stories.cards.elena.title}
                </p>
                <p className="text-xs text-white/80">
                  {copy.stories.cards.elena.subtitle}
                </p>
              </div>
            </button>
            <button
              className="relative aspect-[9/16] rounded-2xl overflow-hidden group shadow-lg md:mt-8 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
              type="button"
              onClick={(event) => {
                lastStoryTriggerRef.current = event.currentTarget;
                setActiveStory("john");
                setVideoOpen(true);
              }}
            >
              {storyVideoUrls.john ? (
                <video
                  aria-hidden="true"
                  className="pointer-events-none w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  src={storyVideoUrls.john}
                />
              ) : (
                <img
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  data-alt="Male student working on laptop in modern office"
                  src={STORY_JOHN_IMG_URL}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/40 group-hover:scale-110 transition-transform duration-300">
                  <span className="material-symbols-outlined text-white text-4xl filled drop-shadow-lg">
                    play_arrow
                  </span>
                </div>
              </div>
              <div className="absolute bottom-5 left-5 text-white">
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded-md bg-white/20 backdrop-blur-sm text-[10px] font-bold uppercase tracking-wider">
                    {copy.stories.cards.john.country}
                  </span>
                </div>
                <p className="font-bold text-lg leading-tight">
                  {copy.stories.cards.john.title}
                </p>
                <p className="text-xs text-white/80">
                  {copy.stories.cards.john.subtitle}
                </p>
              </div>
            </button>
          </div>

          <div className="flex gap-6 overflow-x-auto no-scrollbar pb-8 snap-x">
            <div className="snap-center min-w-[300px] md:min-w-[400px] p-8 bg-white dark:bg-[#323226] rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm">
              <div className="flex gap-1 text-primary mb-4">
                <span className="material-symbols-outlined text-sm filled">
                  star
                </span>
                <span className="material-symbols-outlined text-sm filled">
                  star
                </span>
                <span className="material-symbols-outlined text-sm filled">
                  star
                </span>
                <span className="material-symbols-outlined text-sm filled">
                  star
                </span>
                <span className="material-symbols-outlined text-sm filled">
                  star
                </span>
              </div>
              <p className="text-lg italic mb-6">{copy.reviews.items[0].quote}</p>
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full bg-gray-200 bg-cover bg-center"
                  data-alt={copy.reviews.avatarAlt}
                  style={{ backgroundImage: `url('${REVIEW_AVATAR_MERVE_URL}')` }}
                />
                <div>
                  <p className="font-bold text-sm">{copy.reviews.items[0].name}</p>
                  <p className="text-xs text-text-muted">{copy.reviews.items[0].meta}</p>
                </div>
              </div>
            </div>
            <div className="snap-center min-w-[300px] md:min-w-[400px] p-8 bg-white dark:bg-[#323226] rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm">
              <div className="flex gap-1 text-primary mb-4">
                <span className="material-symbols-outlined text-sm filled">
                  star
                </span>
                <span className="material-symbols-outlined text-sm filled">
                  star
                </span>
                <span className="material-symbols-outlined text-sm filled">
                  star
                </span>
                <span className="material-symbols-outlined text-sm filled">
                  star
                </span>
                <span className="material-symbols-outlined text-sm filled">
                  star
                </span>
              </div>
              <p className="text-lg italic mb-6">{copy.reviews.items[1].quote}</p>
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full bg-gray-200 bg-cover bg-center"
                  data-alt={copy.reviews.avatarAlt}
                  style={{ backgroundImage: `url('${REVIEW_AVATAR_EMRE_URL}')` }}
                />
                <div>
                  <p className="font-bold text-sm">{copy.reviews.items[1].name}</p>
                  <p className="text-xs text-text-muted">{copy.reviews.items[1].meta}</p>
                </div>
              </div>
            </div>
            <div className="snap-center min-w-[300px] md:min-w-[400px] p-8 bg-white dark:bg-[#323226] rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm">
              <div className="flex gap-1 text-primary mb-4">
                <span className="material-symbols-outlined text-sm filled">
                  star
                </span>
                <span className="material-symbols-outlined text-sm filled">
                  star
                </span>
                <span className="material-symbols-outlined text-sm filled">
                  star
                </span>
                <span className="material-symbols-outlined text-sm filled">
                  star
                </span>
                <span className="material-symbols-outlined text-sm filled">
                  star
                </span>
              </div>
              <p className="text-lg italic mb-6">{copy.reviews.items[2].quote}</p>
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full bg-gray-200 bg-cover bg-center"
                  data-alt={copy.reviews.avatarAlt}
                  style={{ backgroundImage: `url('${REVIEW_AVATAR_AYSE_URL}')` }}
                />
                <div>
                  <p className="font-bold text-sm">{copy.reviews.items[2].name}</p>
                  <p className="text-xs text-text-muted">{copy.reviews.items[2].meta}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-20 overflow-hidden bg-gradient-to-b from-white via-background-light to-gray-50 dark:from-background-dark dark:via-background-dark dark:to-background-dark">
        <div className="absolute inset-0 pointer-events-none">
          <div className="premium-blob absolute -top-24 -left-24 size-[420px] rounded-full bg-primary/25 blur-[90px]" />
          <div className="premium-blob premium-blob--slow absolute -bottom-28 -right-28 size-[520px] rounded-full bg-black/10 dark:bg-white/10 blur-[110px]" />
        </div>
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto" data-reveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/85 dark:bg-white/5 border border-gray-100 dark:border-white/10 backdrop-blur-sm shadow-[0_18px_45px_rgba(0,0,0,0.10)]">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-black uppercase tracking-widest text-text-main dark:text-white">
                {copy.why.badge}
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black mt-3 tracking-tight text-text-main dark:text-white">
              {copy.why.title}
            </h2>
            <p className="mt-4 text-sm md:text-base text-text-muted dark:text-gray-400 leading-relaxed">
              {copy.why.description}
            </p>
          </div>

          <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {copy.why.items.map((item) => (
              <div
                className="premium-card group rounded-[2rem] bg-white/80 dark:bg-white/5 border border-gray-100 dark:border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.08)] p-7 md:p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_35px_90px_rgba(0,0,0,0.14)]"
                data-reveal
                key={item.id}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="size-12 rounded-2xl bg-primary text-black flex items-center justify-center shadow-[0_14px_40px_rgba(249,245,6,0.22)] transition-transform duration-300 group-hover:scale-105">
                    <span className="material-symbols-outlined text-[22px]">
                      {item.icon}
                    </span>
                  </div>
                  <span className="text-[11px] font-black uppercase tracking-widest text-text-muted dark:text-gray-400">
                    Lotus
                  </span>
                </div>
                <div className="mt-5 text-lg font-black text-text-main dark:text-white">
                  {item.title}
                </div>
                <p className="mt-3 text-sm text-text-muted dark:text-gray-400 leading-relaxed">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
	      </section>

	      <section className="py-24 bg-primary px-4 sm:px-6 lg:px-8 relative overflow-hidden">
	        <div
	          aria-hidden="true"
	          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, black 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="max-w-[1280px] mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <div data-reveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/10 text-black text-xs font-bold uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-black/70 animate-pulse" />
              {copy.assessment.badge}
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-black mt-6 mb-6 tracking-tight">
              {copy.assessment.title}
            </h2>
            <p className="text-xl font-medium text-black/80 mb-8 max-w-md">
              {copy.assessment.description}
            </p>
            <div className="flex flex-col gap-4 text-black/70">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined">check_circle</span>
                <span>{copy.assessment.bullets[0]}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined">check_circle</span>
                <span>{copy.assessment.bullets[1]}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined">check_circle</span>
                <span>{copy.assessment.bullets[2]}</span>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-2xl premium-card" data-reveal>
            <form className="flex flex-col gap-5" onSubmit={onAssessmentSubmit}>
              <input
                aria-hidden="true"
                className="hidden"
                autoComplete="off"
                tabIndex={-1}
                type="text"
                value={assessmentForm.company}
                onChange={(e) => setAssessmentForm((prev) => ({ ...prev, company: e.target.value }))}
              />
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-text-main">
                    {copy.assessment.form.firstNameLabel}
                  </label>
                  <input
                    className="h-12 px-4 rounded-xl border border-gray-200 bg-gray-50 focus:border-black focus:ring-0"
                    placeholder={copy.assessment.form.firstNamePlaceholder}
                    autoComplete="given-name"
                    required
                    type="text"
                    value={assessmentForm.firstName}
                    onChange={(e) => setAssessmentForm((prev) => ({ ...prev, firstName: e.target.value }))}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-text-main">
                    {copy.assessment.form.lastNameLabel}
                  </label>
                  <input
                    className="h-12 px-4 rounded-xl border border-gray-200 bg-gray-50 focus:border-black focus:ring-0"
                    placeholder={copy.assessment.form.lastNamePlaceholder}
                    autoComplete="family-name"
                    required
                    type="text"
                    value={assessmentForm.lastName}
                    onChange={(e) => setAssessmentForm((prev) => ({ ...prev, lastName: e.target.value }))}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-text-main">
                  {copy.assessment.form.emailLabel}
                </label>
                <input
                  className="h-12 px-4 rounded-xl border border-gray-200 bg-gray-50 focus:border-black focus:ring-0"
                  placeholder={copy.assessment.form.emailPlaceholder}
                  autoComplete="email"
                  required
                  type="email"
                  value={assessmentForm.email}
                  onChange={(e) => setAssessmentForm((prev) => ({ ...prev, email: e.target.value }))}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-text-main">
                  {copy.assessment.form.countryLabel}
                </label>
                <select
                  className="h-12 px-4 rounded-xl border border-gray-200 bg-gray-50 focus:border-black focus:ring-0"
                  required
                  value={assessmentForm.country}
                  onChange={(e) => setAssessmentForm((prev) => ({ ...prev, country: e.target.value }))}
                >
                  <option value="" disabled>
                    {copy.assessment.form.countryPlaceholder}
                  </option>
                  <option value={copy.assessment.form.countries.germany}>
                    {copy.assessment.form.countries.germany}
                  </option>
                  <option value={copy.assessment.form.countries.usa}>
                    {copy.assessment.form.countries.usa}
                  </option>
                  <option value={copy.assessment.form.countries.uk}>
                    {copy.assessment.form.countries.uk}
                  </option>
                  <option value={copy.assessment.form.countries.other}>
                    {copy.assessment.form.countries.other}
                  </option>
                </select>
              </div>
              <button
                className="h-14 mt-2 rounded-xl bg-black text-white font-bold text-lg hover:bg-gray-800 transition-colors shadow-lg hover:scale-[1.01] active:scale-[0.99] disabled:opacity-90 disabled:hover:bg-black disabled:cursor-not-allowed"
                disabled={assessmentStatus === "sending"}
                type="submit"
              >
                {assessmentStatus === "sending" ? copy.assessment.form.submitting : copy.assessment.form.submit}
              </button>
              <p className="text-xs text-center text-gray-500 mt-2">
                {copy.assessment.form.note}
              </p>
              {assessmentStatus === "success" ? (
                <p className="text-xs text-center text-green-700" role="status">
                  {copy.assessment.form.success}
                </p>
              ) : null}
              {assessmentStatus === "error" ? (
                <p className="text-xs text-center text-red-700" role="status">
                  {assessmentError ?? copy.assessment.form.error}
                </p>
              ) : null}
            </form>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-background-dark border-t border-gray-100 dark:border-white/5">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-10 text-center">
            {copy.faq.title}
          </h2>
          <div className="space-y-4">
            <details className="group bg-gray-50 dark:bg-white/5 rounded-xl">
              <summary className="flex justify-between items-center font-medium cursor-pointer list-none p-6">
                <span>{copy.faq.items[0].q}</span>
                <span className="transition group-open:rotate-180">
                  <span className="material-symbols-outlined">expand_more</span>
                </span>
              </summary>
              <div className="text-text-muted dark:text-gray-400 mt-0 px-6 pb-6">
                {copy.faq.items[0].a}
              </div>
            </details>
            <details className="group bg-gray-50 dark:bg-white/5 rounded-xl">
              <summary className="flex justify-between items-center font-medium cursor-pointer list-none p-6">
                <span>{copy.faq.items[1].q}</span>
                <span className="transition group-open:rotate-180">
                  <span className="material-symbols-outlined">expand_more</span>
                </span>
              </summary>
              <div className="text-text-muted dark:text-gray-400 mt-0 px-6 pb-6">
                {copy.faq.items[1].a}
              </div>
            </details>
            <details className="group bg-gray-50 dark:bg-white/5 rounded-xl">
              <summary className="flex justify-between items-center font-medium cursor-pointer list-none p-6">
                <span>{copy.faq.items[2].q}</span>
                <span className="transition group-open:rotate-180">
                  <span className="material-symbols-outlined">expand_more</span>
                </span>
              </summary>
              <div className="text-text-muted dark:text-gray-400 mt-0 px-6 pb-6">
                {copy.faq.items[2].a}
              </div>
            </details>
          </div>
        </div>
      </section>

      <VideoModal
        open={videoOpen}
        onClose={() => {
          setVideoOpen(false);
          setActiveStory(null);
        }}
        restoreFocusTo={lastStoryTriggerRef.current}
        src={activeVideoSrc}
        poster={
          activeStory === "sarah"
            ? STORY_SARAH_IMG_URL
            : activeStory === "ahmet"
              ? undefined
              : activeStory === "elena"
                ? STORY_ELENA_IMG_URL
                : activeStory === "john"
                  ? STORY_JOHN_IMG_URL
                  : undefined
        }
        title={
          activeStory === "sarah"
            ? copy.stories.cards.sarah.title
            : activeStory === "ahmet"
              ? copy.stories.cards.ahmet.title
              : activeStory === "elena"
                ? copy.stories.cards.elena.title
                : activeStory === "john"
                  ? copy.stories.cards.john.title
                  : "Video"
        }
        subtitle={
          activeStory === "sarah"
            ? copy.stories.cards.sarah.subtitle
            : activeStory === "ahmet"
              ? copy.stories.cards.ahmet.subtitle
              : activeStory === "elena"
                ? copy.stories.cards.elena.subtitle
                : activeStory === "john"
                  ? copy.stories.cards.john.subtitle
                  : undefined
        }
      />

      <SiteFooter />
    </>
  );
}
