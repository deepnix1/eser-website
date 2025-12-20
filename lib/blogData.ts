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

export const CATEGORY_LABELS_TR: Record<BlogCategory, string> = {
  Guides: "Rehberler",
  Visa: "Vize",
  Scholarships: "Burslar",
  "Student Life": "Öğrenci Hayatı",
};

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    id: "usa-work-travel-camp-usa",
    title: "ABD Work & Travel / Camp USA: 2025 Sezonu için Adımlar ve Riskler",
    excerpt:
      "J-1 sürecinde DS-2019, SEVIS, sponsor kuralları ve iş yerleştirme: Türkiye’den katılanların bilmesi gereken temel noktalar.",
    category: "Guides",
    readTime: "5 dk okuma",
    dateLabel: "2025",
    heroImageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/1/1e/Camp_Cottaquilla%2C_Girl_Scout_Camp%2C_Choccolocco%2C_Alabama_%287187233295%29.jpg",
    sections: [
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
  },
  {
    id: "germany-uni-visa-update",
    title: "Almanya: Üniversite Başvurusu ve Öğrenci Vizesi (2025) Kontrol Listesi",
    excerpt:
      "Başvuru takvimi, finansman kanıtı, randevu-biyometri adımları ve evrak düzeni: Türkiye’den başvuranlar için pratik kontrol listesi.",
    category: "Visa",
    readTime: "6 dk okuma",
    dateLabel: "2025",
    heroImageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/a/a6/Brandenburger_Tor_abends.jpg",
    sections: [
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
  },
  {
    id: "uk-student-visa-graduate-route",
    title: "İngiltere Öğrenci Vizesi ve Graduate Route: Mezuniyet Sonrası Seçenekler",
    excerpt:
      "CAS, finansal yeterlilik, başvuru evrakları ve mezuniyet sonrası çalışma planı: Türkiye’den gidenler için özet rehber.",
    category: "Visa",
    readTime: "7 dk okuma",
    dateLabel: "2025",
    heroImageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/5/54/Tower_Bridge-London%2C_England%2C_United_Kingdom.jpg",
    sections: [
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
  },
  {
    id: "scholarship-funding-opportunities",
    title: "Burs ve Fon Fırsatları: Türkiye’den Başvuranlar için 9 Pratik Strateji",
    excerpt:
      "Başarılı başvuruyu öne çıkaran belgeler, referanslar, niyet mektubu ve zamanlama: uygulanabilir öneriler.",
    category: "Scholarships",
    readTime: "6 dk okuma",
    dateLabel: "2025",
    heroImageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/0/05/Students_at_graduation_at_The_Ohio_State_University_-_DPLA_-_dd0b6dd3942f089e46f14c67b013b028.jpg",
    sections: [
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
  },
  {
    id: "living-costs-budget-comparison",
    title: "Yaşam Maliyeti Karşılaştırması: Almanya – ABD – İngiltere için Bütçe Planı",
    excerpt:
      "Kira, ulaşım, market ve sigorta giderleri: Türkiye’den giden öğrenciler için 3 ülkeye göre pratik bütçe yaklaşımı.",
    category: "Student Life",
    readTime: "6 dk okuma",
    dateLabel: "2025",
    heroImageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Currencies_on_White_Background.jpg/2400px-Currencies_on_White_Background.jpg",
    sections: [
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
  },
  {
    id: "common-visa-mistakes",
    title: "Türkiye’den Başvurularda En Sık Görülen 10 Vize Hatası (ve Nasıl Önlenir)",
    excerpt:
      "Eksik çeviri, tutarsız finansman, zayıf niyet mektubu, randevu hazırlığı: ret riskini azaltan net adımlar.",
    category: "Visa",
    readTime: "6 dk okuma",
    dateLabel: "2025",
    heroImageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/0/0f/World_Passport_with_PRC_visa_and_entry_stamp.jpg",
    sections: [
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
  },
  {
    id: "global-policy-changes",
    title: "Küresel Göç ve Eğitim Politikaları: 2025’te Öne Çıkan Trendler",
    excerpt:
      "Dijital vize süreçleri, biyometri yoğunluğu, ek güvenlik kontrolleri ve yeni giriş sistemleri: takip edilmesi gereken başlıklar.",
    category: "Visa",
    readTime: "7 dk okuma",
    dateLabel: "2025",
    heroImageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/b/b8/Outside_the_European_Parliament_in_Brussels_%2847937298368%29.jpg",
    sections: [
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
  },
  {
    id: "accommodation-student-life",
    title: "Konaklama ve Öğrenci Hayatı: Güvenli Kiralama ve Ev Bulma İpuçları",
    excerpt:
      "Yurt başvurusu, oda/ev arama, depozito sözleşmesi ve dolandırıcılıktan korunma: pratik öneriler.",
    category: "Student Life",
    readTime: "6 dk okuma",
    dateLabel: "2025",
    heroImageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Oakes_College_Student_Dormitories.jpg/2400px-Oakes_College_Student_Dormitories.jpg",
    sections: [
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
  },
  {
    id: "pre-departure-checklist",
    title: "Yurtdışına Gitmeden Önce Son 14 Gün: Türkiye’den Gidenler için Checklist",
    excerpt:
      "Vize, uçuş, konaklama, sigorta, sim kart, banka ve belgeler: uçuş öncesi son iki haftada yapılacaklar listesi.",
    category: "Guides",
    readTime: "6 dk okuma",
    dateLabel: "2025",
    heroImageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/f/f4/Passport_and_AirFrance_Boarding_Pass_%2853928563481%29.jpg",
    sections: [
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
  },
];

