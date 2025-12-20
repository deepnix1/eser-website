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
  badge?: "Shared" | "Popular" | "New";
};

export type CountryPrograms = {
  heroImageUrl: string;
  programs: readonly Program[];
};

const HERO_GERMANY_IMG_URL =
  "https://lh3.googleusercontent.com/aida-public/" +
  "AB6AXuBariXW4-TEYcf68MStOrgBGkl8Z078-X5bI-6Suol-vIO8iZC2Jrdcz_Dt" +
  "NSGnM9_9zVHJmg6A0v-JR8gukpZ803P9o3_bDbOxUr-ve4ilDx7aqmlkg6_ZIG" +
  "C9iLko_DzE-KsVSCqxhXCSWmpZWQnQYgqVs3mptUXS6hm7G2606vk25qhTSm9k" +
  "AIk48VCi8MTB4urv3I2mLOB_EZ_Kcrsm-80iWtkx_sDI-LsC2rZMJ4AtR44NvW" +
  "c53WKnTFIbzXuP3xFe6mLn4Hb-";

const HERO_USA_IMG_URL =
  "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b" +
  "?auto=format&fit=crop&w=2400&q=80";

const HERO_UK_IMG_URL =
  "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad" +
  "?auto=format&fit=crop&w=2400&q=80";

const HERO_MALTA_IMG_URL =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/" +
  "A_Glowing_Night_Over_the_Grand_Harbour.jpg/" +
  "3200px-A_Glowing_Night_Over_the_Grand_Harbour.jpg";

const HERO_NETHERLANDS_IMG_URL =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/" +
  "Amsterdam_Canal_Houses_at_Night_%2852555856777%29.jpg/" +
  "3200px-Amsterdam_Canal_Houses_at_Night_%2852555856777%29.jpg";

const HERO_IRELAND_IMG_URL =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/" +
  "O%27Brien%27s_Tower_at_Cliffs_of_Moher.jpg/" +
  "3200px-O%27Brien%27s_Tower_at_Cliffs_of_Moher.jpg";

const HERO_CANADA_IMG_URL =
  "https://images.unsplash.com/photo-1503614472-8c93d56e92ce" +
  "?auto=format&fit=crop&w=2400&q=80";

const baseDocs = [
  "Pasaport (en az 12 ay geçerli)",
  "CV (İngilizce) + motivasyon mektubu",
  "Diploma ve transkriptler (gerekirse tercümeli)",
  "Finansal yeterlilik / sponsor evrakları (gerekirse)",
] as const;

function makeDetails(input: {
  overview: string;
  whoFor: string[];
  advantages: string[];
  duration: string;
  workRights?: string;
  steps?: string[];
  docs?: string[];
  feesAndVisa: string;
  notes?: string;
}): ProgramDetails {
  return {
    overview: input.overview,
    whoFor: input.whoFor,
    keyAdvantages: input.advantages,
    duration: input.duration,
    workRights: input.workRights,
    applicationSteps:
      input.steps ??
      [
        "Ücretsiz profil değerlendirmesi ve uygunluk kontrolü",
        "Evrak hazırlığı + uygunluk doğrulaması",
        "Başvuru gönderimi ve takip",
        "Vize & seyahat planlama (uygunsa)",
        "Uçuş öncesi bilgilendirme + varış desteği",
      ],
    requiredDocuments: Array.from(new Set([...(input.docs ?? []), ...baseDocs])),
    feesAndVisa: input.feesAndVisa,
    notes: input.notes,
  };
}

const sharedAuPair: Program = {
  id: "au-pair",
  title: "Au Pair Programı",
  tagline: "Bir aile yanında yaşayın, dilinizi geliştirin ve kültürel deneyim kazanın.",
  badge: "Shared",
  details: makeDetails({
    overview:
      "Bir ev sahibi aile yanında yaşadığınız, çocuk bakımı ve hafif ev işlerine destek verdiğiniz; aynı zamanda dil kurslarına katılabildiğiniz yapılandırılmış bir kültürel değişim programıdır.",
    whoFor: [
      "Bütçe dostu bir yurtdışı deneyimi isteyen öğrenciler ve genç yetişkinler",
      "Yurt yerine aile ortamını tercih eden adaylar",
      "Dil pratiğini günlük yaşamla hızlı geliştirmek isteyenler",
    ],
    advantages: [
      "Konaklama ve yemek çoğu zaman ev sahibi aile tarafından karşılanır",
      "Net haftalık program ve destekli süreç",
      "Günlük pratikle hızlı dil gelişimi",
      "Uzun vadeli eğitim/çalışma planları için güçlü bir başlangıç",
    ],
    duration: "6–12 ay (yaygın), uzatma ülkeye göre değişir",
    workRights:
      "Au pair görevleri ev sahibi aile anlaşması ve yerel kurallarla belirlenir; harçlık ödemesi yapılır.",
    feesAndVisa:
      "Vize kuralları, sigorta ve yerleştirme ücretleri ülkeye ve profile göre değişir. Doğru vize türünü ve evrak listesini netleştiririz.",
    notes: "Almanya ve ABD altında ortak program olarak listelenir.",
  }),
};

export const PROGRAM_CATALOG = {
  Germany: {
    heroImageUrl: HERO_GERMANY_IMG_URL,
    programs: [
      {
        id: "ausbildung",
        title: "Ausbildung (Maaşlı Mesleki Eğitim)",
        tagline: "Maaş alarak eğitim + çalışma; uzun vadeli kariyer yolu.",
        badge: "Popular",
        details: makeDetails({
          overview:
            "Ausbildung, Almanya’nın maaşlı mesleki eğitim modelidir. Okul eğitimi ile işyerinde uygulamalı eğitimi birleştirir ve çoğu alanda sözleşmeli bir çalışma düzeni sunar.",
          whoFor: [
            "Pratik, meslek odaklı bir rota arayan adaylar",
            "Okurken çalışmayı tercih eden öğrenciler",
            "Almanya’da uzun vadeli çalışma/yerleşim hedefleyenler",
          ],
          advantages: [
            "Program süresince aylık maaş",
            "Mezuniyet sonrası yüksek istihdam şansı",
            "Net yapı ve işveren desteği",
            "Çok sayıda alan (sağlık, IT, turizm, teknik meslekler)",
          ],
          duration: "2–3,5 yıl (mesleğe göre değişir)",
          workRights:
            "Eğitim sözleşmesi kapsamında çalışma; maaş ve çalışma saatleri işveren sözleşmesine göre belirlenir.",
          feesAndVisa:
            "Ana maliyetler tercüme, sigorta ve vize başvuru ücretleridir. Maaş yaşam giderlerini destekleyebilir; finansal yeterlilik gerekliliği rotaya göre değişir.",
        }),
      },
      {
        id: "bachelors",
        title: "Lisans Programı",
        tagline: "Güçlü uluslararası tanınırlığa sahip kaliteli üniversiteler.",
        details: makeDetails({
          overview:
            "Almanya, güçlü akademik standartlara sahip ve çoğu zaman düşük harçlı/uygun maliyetli lisans programları sunar.",
          whoFor: [
            "Yurtdışında tam lisans eğitimi planlayan lise mezunları",
            "Seçenekleri artırmak için Almanca öğrenmeye açık adaylar",
            "Mühendislik, işletme veya uygulamalı bilim hedefleyenler",
          ],
          advantages: [
            "Güçlü üniversite itibarı ve sektör bağlantıları",
            "Uygun dönemlik ücretler (eyalet/üniversiteye göre değişir)",
            "Yasal sınırlar içinde part-time çalışma imkânı",
            "Mezuniyet sonrası iş arama/kalış opsiyonları (kurallara göre)",
          ],
          duration: "Genellikle 3 yıl (programa göre değişir)",
          workRights:
            "Öğrenci çalışma hakkı vize türüne ve mevzuata göre değişir; profilinize göre netleştiririz.",
          feesAndVisa:
            "Ücretler üniversiteye göre değişir; vize için finansal yeterlilik ve sigorta gerekir. Bütçe planı ve evrak kontrol listesi hazırlarız.",
        }),
      },
      {
        id: "masters",
        title: "Yüksek Lisans Programı",
        tagline: "Araştırma veya uygulamalı programlarla uzmanlaşın.",
        details: makeDetails({
          overview:
            "Almanya’daki yüksek lisans programları; uzmanlaşma, Avrupa’daki sektör ve araştırma ekosistemlerine erişim açısından güçlü fırsatlar sunar.",
          whoFor: [
            "Uzmanlaşmak veya alan değiştirmek isteyen lisans mezunları",
            "STEM, business analytics veya araştırma odaklı adaylar",
            "Avrupa merkezli kariyer hedefleyen öğrenciler",
          ],
          advantages: [
            "İngilizce ve Almanca program seçenekleri (üniversiteye göre)",
            "Güçlü staj ve istihdam ekosistemi",
            "Şeffaf başvuru kriterleri",
            "Planlı başvuru stratejisiyle kabul ihtimali artar",
          ],
          duration: "1–2 yıl",
          workRights:
            "Öğrenci çalışma hakkı vize türüne ve mevzuata göre değişir; profilinize göre yönlendiririz.",
          feesAndVisa:
            "Dönemlik ücretler/harçlar üniversiteye göre değişir. Vize planında finansal yeterlilik ve sigorta yer alır; zaman çizelgesi ve evrak planı çıkarırız.",
        }),
      },
      {
        id: "phd",
        title: "Doktora (PhD) Programları",
        tagline: "Araştırma odaklı rotalar ve danışman eşleştirme desteği.",
        details: makeDetails({
          overview:
            "Almanya’da doktora başvuruları çoğunlukla araştırma önerisi ve danışman uyumu gerektirir; bazı rotalarda fonlu pozisyon seçenekleri bulunur.",
          whoFor: [
            "Akademi veya Ar-Ge kariyeri hedefleyen yüksek lisans mezunları",
            "Araştırma deneyimi veya güçlü projeleri olan adaylar",
            "Mümkünse fonlu araştırma rolü arayanlar",
          ],
          advantages: [
            "Güçlü araştırma altyapısı ve laboratuvarlar",
            "Araştırma grupları ve hibelerle fon ihtimali",
            "Uluslararası akademik ağ",
            "Akademi ve endüstri Ar-Ge’de kariyer seçenekleri",
          ],
          duration: "3–5 yıl",
          feesAndVisa:
            "Fon ve sözleşme şartları değişkendir. Vize rotası program türüne göre (çalışma vs. eğitim) belirlenir; doğru yol ve evraklarla yönlendiririz.",
        }),
      },
      sharedAuPair,
      {
        id: "degree-recognition",
        title: "Denklik (Diploma Tanıma)",
        tagline: "Resmî denklik ve mesleki uygunluk süreçleri için rehberlik.",
        details: makeDetails({
          overview:
            "Denklik, önceki eğitiminizin Almanya’daki kurumlar veya regüle meslekler için değerlendirilmesi ve tanınması sürecidir.",
          whoFor: [
            "Regüle mesleklere geçiş yapmak isteyen mezunlar",
            "Lisanslama/işveren için resmî denklik belgesi gereken adaylar",
            "Uzun vadeli kariyer planı yapan profesyoneller",
          ],
          advantages: [
            "Resmî şartlara uygun, net bir dosya hazırlığı",
            "Kabul ve işe alım süreçlerinde avantaj",
            "Kurumlarla yazışma/geri dönüşleri azaltır",
            "Tercüme ve evrak kontrolüyle daha az gecikme",
          ],
          duration: "Genellikle 4–16 hafta (kurum ve dosya durumuna göre değişir)",
          feesAndVisa:
            "Maliyetler kurum ücretleri ve tercümelere bağlıdır. Gecikmeleri azaltmak için dosyayı eksiksiz hazırlamanıza yardımcı oluruz.",
        }),
      },
      {
        id: "healthcare-placement",
        title: "Hemşire & Doktor İş Yerleştirme",
        tagline: "Sağlık alanında iş eşleştirme ve lisans/denklik adımlarında destek.",
        details: makeDetails({
          overview:
            "Sağlık profesyonelleri için işveren eşleştirme desteği ve lisans/denklik adımlarını kapsayan yönlendirmeli bir süreçtir.",
          whoFor: [
            "Almanya’da çalışmak isteyen hemşire ve doktorlar",
            "Dil ve denklik adımlarını tamamlamaya hazır adaylar",
            "AB’de uzun vadeli kariyer rotası arayan profesyoneller",
          ],
          advantages: [
            "İşveren uyumu ve yapılandırılmış onboarding",
            "Net lisans/denklik yol haritası ve evrak listesi",
            "Zaman planlamasıyla gecikmeleri azaltır",
            "Taşınma ve yerleşim planında destek",
          ],
          duration: "Denklik + işveren zamanına göre değişir (çoğunlukla 3–9 ay)",
          workRights:
            "Çalışma temelli rota; çalışma hakkı sözleşme türü ve lisans aşamasına göre değişir.",
          feesAndVisa:
            "Denklik ücretleri, tercümeler ve vize maliyetleri bulunur. Bazı işverenler destek sunabilir; sorumlulukları baştan netleştiririz.",
        }),
      },
      {
        id: "visa-consulting",
        title: "Vize Danışmanlığı",
        tagline: "Vize stratejisi, dosya hazırlığı ve randevu desteği.",
        details: makeDetails({
          overview:
            "Seçtiğiniz programa göre özelleştirilmiş vize desteği: evraklarınızın ve zaman planınızın konsolosluk beklentileriyle uyumlu olmasını hedefler.",
          whoFor: [
            "Kontrol listesiyle ilerleyen, stressiz bir süreç isteyen adaylar",
            "Farklı şartlara sahip birden fazla programa başvuran öğrenciler",
            "Evrak stratejisi ve tercüme kontrolü ihtiyacı olan profesyoneller",
          ],
          advantages: [
            "Net yol haritası, kilometre taşları ve deadline’lar",
            "Ret riskini azaltan evrak kontrolü",
            "Bütçe planı ve finansal yeterlilik yönlendirmesi",
            "Uçuş öncesi bilgilendirme ve seyahat kontrol listesi",
          ],
          duration: "Genellikle 2–6 hafta (hazırlık ve randevu bulunabilirliğine göre)",
          feesAndVisa:
            "Danışmanlık ücreti kapsamına göre değişir. Resmî konsolosluk ücretleri ayrıdır; kalem kalem şeffaf bir özet sunarız.",
        }),
      },
    ],
  },
  USA: {
    heroImageUrl: HERO_USA_IMG_URL,
    programs: [
      {
        id: "usa-language",
        title: "Dil Okulları",
        tagline: "Esnek başlangıç tarihleri ve farklı şehir/kampüs seçenekleriyle İngilizcenizi geliştirin.",
        details: makeDetails({
          overview:
            "Seviye tespit ve kur ilerleme sistemi olan; kısa veya uzun dönem İngilizce eğitimleri. Bazı kurumlarda üniversiteye geçiş (pathway) opsiyonu bulunur.",
          whoFor: [
            "Üniversite başvurularına hazırlanan öğrenciler",
            "Kariyer hedefi için İngilizcesini geliştirmek isteyen profesyoneller",
            "Kısa süreli, planlı bir yurtdışı eğitim isteyen adaylar",
          ],
          advantages: [
            "Birden fazla başlangıç tarihi ve süre seçeneği",
            "Seviye tespit ve düzenli kur ilerlemesi",
            "Şehir ve kampüs çeşitliliği",
            "Seçili kurumlarda pathway programları",
          ],
          duration: "4–36 hafta (esnek)",
          feesAndVisa:
            "Birçok program için F-1 öğrenci vizesi gerekir; I-20, finansal yeterlilik, sigorta ve mülakat hazırlığında destek veririz.",
        }),
      },
      {
        id: "work-and-travel",
        title: "Work and Travel",
        tagline: "Sezonluk çalışma deneyimi + seyahati birleştiren kültürel değişim programı.",
        badge: "Popular",
        details: makeDetails({
          overview:
            "Uygun öğrencilerin tatil dönemlerinde ABD’de çalışıp sonrasında seyahat edebildiği yapılandırılmış sezonluk program.",
          whoFor: [
            "Uygunluk kriterlerini karşılayan üniversite öğrencileri",
            "Bütçe dostu şekilde ABD’de çalışma deneyimi isteyen adaylar",
            "Kısa süreli taahhütleri tercih eden öğrenciler",
          ],
          advantages: [
            "Program süresince gelir elde etme fırsatı",
            "Uluslararası katılımcılarla kültürel değişim",
            "Hizmet/turizm alanlarında güçlü CV deneyimi",
            "Çalışma sonrası seyahat edebilme seçeneği",
          ],
          duration: "Genellikle 3–5 ay (sezona bağlı)",
          workRights: "Çalışma izni program kapsamındadır ve sponsor kurallarına tabidir.",
          feesAndVisa:
            "Sponsor ve vize ücretleri bulunur. Sponsor koordinasyonu, evraklar, mülakat hazırlığı ve seyahat kontrol listesinde destek oluruz.",
        }),
      },
      {
        id: "camp-usa",
        title: "Camp USA",
        tagline: "Yaz kamplarında çalışın; konaklama ve yemek çoğu zaman dahildir.",
        details: makeDetails({
          overview:
            "Yaz kamplarında staff/counselor olarak çalışıp yapılandırılmış bir ortamda kültürel deneyim kazandığınız program.",
          whoFor: [
            "İletişimi güçlü öğrenciler ve genç yetişkinler",
            "Takım çalışmasına uyumlu adaylar",
            "Daha düşük yaşam maliyetiyle yaz dönemi yurtdışı deneyimi isteyenler",
          ],
          advantages: [
            "Konaklama ve yemek çoğu zaman dahildir",
            "Güçlü topluluk ve destek yapısı",
            "Liderlik ve takım çalışması deneyimi",
            "Kısa sürede yüksek deneyim değeri",
          ],
          duration: "8–12 hafta (yaz sezonu)",
          workRights: "Çalışma izni program kapsamındadır ve sponsor kurallarına tabidir.",
          feesAndVisa:
            "Sponsor yerleştirme ve vize ücretleri bulunur. Uygunluk, evraklar ve sponsor zaman planında destek veririz.",
        }),
      },
      {
        id: "h2b",
        title: "H-2B Çalışma Vizesi",
        tagline: "İşveren sponsorluğu ile sezonluk (tarım dışı) çalışma rotası.",
        details: makeDetails({
          overview:
            "Uygun sezonluk işlerde, işverenin H-2B kapsamında çalışma izni sürecini sponsorladığı rota.",
          whoFor: [
            "İşveren sponsorluğu ile sezonluk rol hedefleyen adaylar",
            "Zaman planına bağlı ilerleyebilen adaylar",
            "Tekrarlanabilir sezonluk çalışma döngüsü arayanlar",
          ],
          advantages: [
            "İşveren sponsorlu çalışma izni",
            "Aynı işverenle tekrar sezon fırsatı",
            "Net sezonluk iş kategorileri",
            "Düzenli uyum ve onboarding",
          ],
          duration: "9 aya kadar (sezona bağlı, işverene göre değişir)",
          workRights:
            "Çalışma, sponsor işveren ve onaylı süre ile sınırlıdır.",
          feesAndVisa:
            "İşveren dilekçesi ve vize adımları değişebilir; evrak, mülakat hazırlığı ve uyum kurallarında destek veririz.",
        }),
      },
      {
        id: "usa-university",
        title: "Üniversite (Lisans)",
        tagline: "Kabul stratejisi + burs odaklı planlama ile ABD üniversiteleri.",
        details: makeDetails({
          overview:
            "Okul listeleme, başvuru stratejisi ve uygun profiller için burs/finansal destek konumlandırmasını içeren yapılandırılmış kabul süreci.",
          whoFor: [
            "ABD’de tam lisans eğitimi hedefleyen öğrenciler",
            "Güçlü kampüs ve kariyer ekosistemi arayan adaylar",
            "Takvimli, adım adım başvuru planı isteyen öğrenciler",
          ],
          advantages: [
            "Geniş bölüm ve kampüs seçeneği",
            "Birçok kurumda güçlü staj/kariyer servisleri",
            "Burs fırsatları (uygunluğa göre değişir)",
            "Net, adım adım kabul planı",
          ],
          duration: "Genellikle 4 yıl",
          feesAndVisa:
            "Ücretler kuruma göre geniş aralıkta değişir. F-1 vizesi için I-20 ve finansal yeterlilik gerekir; dosya ve mülakat hazırlığında destek oluruz.",
        }),
      },
      sharedAuPair,
      {
        id: "visa-consulting",
        title: "Vize Danışmanlığı",
        tagline: "Dosya kontrolü, mülakat hazırlığı ve zaman planı desteği.",
        details: makeDetails({
          overview:
            "Seçtiğiniz ABD program rotası için; netlik, uygunluk ve güven odaklı vize destek hizmeti.",
          whoFor: [
            "Yapılandırılmış kontrol listesi ve dosya incelemesi isteyen adaylar",
            "Sponsor evrakları dahil çoklu belgeyle ilerleyen öğrenciler",
            "Finansal yeterlilik stratejisini netleştirmek isteyen aileler",
          ],
          advantages: [
            "Programa göre kişiselleştirilmiş evrak listesi",
            "Mülakat hazırlığı ve güven kazandırma",
            "Sponsor/DS-2019/I-20 uyumluluğu desteği (uygunsa)",
            "Net zaman planı, hatırlatmalar ve bir sonraki adımlar",
          ],
          duration: "Genellikle 1–4 hafta",
          feesAndVisa:
            "Danışmanlık ücreti kapsamına göre değişir. Resmî konsolosluk ücretleri ve varsa sponsor ücretleri ayrıdır.",
        }),
      },
    ],
  },
  Netherlands: {
    heroImageUrl: HERO_NETHERLANDS_IMG_URL,
    programs: [
      {
        id: "nl-summer-schools",
        title: "Yaz Okulları (Lisans & Yüksek Lisans)",
        tagline: "Uluslararası sınıflarla kısa süreli akademik programlar.",
        details: makeDetails({
          overview:
            "Yaz okulları; Hollanda eğitim sistemini deneyimlemek, sertifika almak ve uluslararası network kurmak için üniversitelerde yoğun, kısa süreli programlar sunar.",
          whoFor: [
            "İleride yurtdışında tam eğitim düşünen öğrenciler",
            "Kısa ama etkisi yüksek akademik deneyim isteyen adaylar",
            "Uluslararası network ve sertifika hedefleyenler",
          ],
          advantages: [
            "Kısa ve esnek katılım",
            "Sertifika ve transkript opsiyonları",
            "Uluslararası öğrenci ağı",
            "Profil güçlendirme için ideal",
          ],
          duration: "2–8 hafta",
          feesAndVisa:
            "Vize gereklilikleri vatandaşlık ve süreye göre değişir. Doğru giriş/vize türünü ve evrakları netleştiririz.",
        }),
      },
      {
        id: "nl-bachelors",
        title: "Lisans Programı",
        tagline: "İngilizce eğitim seçenekleri ve güçlü Avrupa kariyer rotaları.",
        details: makeDetails({
          overview:
            "Hollanda; İngilizce eğitimli programları ve çok uluslu kampüs ortamıyla öne çıkar.",
          whoFor: [
            "Avrupa’da İngilizce lisans eğitimi isteyen öğrenciler",
            "Uygulamalı ve yenilikçi eğitim modelini hedefleyen adaylar",
            "Uluslararası kampüs deneyimini önemseyen öğrenciler",
          ],
          advantages: [
            "Çok sayıda İngilizce program seçeneği",
            "Güçlü uluslararası öğrenci ekosistemi",
            "Uygulamalı ve araştırma üniversitesi alternatifleri",
            "AB’de staj ve network fırsatları",
          ],
          duration: "3–4 yıl (programa göre)",
          feesAndVisa:
            "Ücretler AB/AB dışı statüsüne göre değişir. Başvuru takvimi, konaklama planı ve oturum izni adımlarında destek oluruz.",
        }),
      },
      {
        id: "nl-masters",
        title: "Yüksek Lisans Programı",
        tagline: "1 ve 2 yıllık seçenekler; araştırma ve uygulamalı rotalar.",
        details: makeDetails({
          overview:
            "Hollanda’daki yüksek lisans programları; güçlü araştırma çıktısı ve sektörle pratik bağlantılar sunar; birçok program İngilizcedir.",
          whoFor: [
            "Avrupa pazarında uzmanlaşmak isteyen mezunlar",
            "STEM, işletme ve sosyal bilimler odaklı adaylar",
            "Hızlı 1 yıllık yüksek lisans seçenekleri arayan öğrenciler",
          ],
          advantages: [
            "Çok sayıda İngilizce program",
            "Seçili alanlarda güçlü sektör iş birliği",
            "Net kabul kriterleri ve başvuru takvimi",
            "Uluslararası sınıf deneyimi",
          ],
          duration: "1–2 years",
          feesAndVisa:
            "Oturum izni, sigorta ve finansal yeterlilik planı kritik. Net kontrol listesi ve zaman planı sağlarız.",
        }),
      },
      {
        id: "visa-consulting",
        title: "Vize/Oturum Danışmanlığı",
        tagline: "Oturum izni planı, evrak kontrolü ve süreç takibi.",
        details: makeDetails({
          overview:
            "Kabul ve oturum izni adımlarının; eksiksiz evrakla, doğru sırada ve zamanında ilerlemesini sağlayan premium destek.",
          whoFor: [
            "AB dışı oturum izni gerekliliklerini yöneten adaylar",
            "Sıkı deadline ve konaklama kısıtı olan öğrenciler",
            "Uçtan uca yapılandırılmış süreç isteyen adaylar",
          ],
          advantages: [
            "Net zaman planı ve hatırlatmalar",
            "Evrak kontrolü ve tercüme yönetimi",
            "Bütçe ve finansal yeterlilik yönlendirmesi",
            "Uçuş öncesi kontrol listesi ve yerleşim ipuçları",
          ],
          duration: "Genellikle 1–4 hafta",
          feesAndVisa:
            "Danışmanlık ücreti kapsamına göre değişir. Resmî ücretler kurumlara ve oturum izni kurallarına göre belirlenir.",
        }),
      },
    ],
  },
  "United Kingdom": {
    heroImageUrl: HERO_UK_IMG_URL,
    programs: [
      {
        id: "uk-language",
        title: "Dil Okulları",
        tagline: "Esnek süreler ve şehir seçenekleriyle İngilizce immersion.",
        details: makeDetails({
          overview:
            "Birleşik Krallık dil okulları; yoğun programlar ve güçlü immersion ortamıyla İngilizceyi hızlandırmak için idealdir.",
          whoFor: [
            "UK üniversitelerine hazırlanan öğrenciler",
            "İngilizcesini kısa sürede geliştirmek isteyen profesyoneller",
            "Kısa süreli, net hedefli eğitim arayan adaylar",
          ],
          advantages: [
            "Yüksek immersion ortamı",
            "Farklı yoğunlukta kurs seçenekleri",
            "Kısa ve uzun dönem alternatifler",
            "Şehir bazlı geniş seçenek",
          ],
          duration: "2–36 hafta",
          feesAndVisa:
            "Vize gereklilikleri süre ve profile göre değişir. Doğru vize rotası ve evrak listesini netleştiririz.",
        }),
      },
      {
        id: "uk-bachelors",
        title: "Lisans Programı",
        tagline: "Dünya çapında üniversiteler ve güçlü küresel marka değeri.",
        details: makeDetails({
          overview:
            "UK lisans programları; güçlü akademik yapı ve kariyer ekosistemiyle dünya çapında tanınır.",
          whoFor: [
            "Küresel ölçekte tanınan kurumları hedefleyen öğrenciler",
            "Tamamen İngilizce eğitim rotasını tercih eden adaylar",
            "Uluslararası taşınabilir diploma hedefleyenler",
          ],
          advantages: [
            "Küresel tanınırlık ve alumni network’leri",
            "Net program yapısı ve modüller",
            "Güçlü öğrenci servisleri ve kampüs hayatı",
            "Staj ve projelerle kariyer deneyimi (programa göre değişir)",
          ],
          duration: "3–4 yıl (programa göre)",
          feesAndVisa:
            "Ücretler geniş aralıkta değişir. Vize planında CAS, finansal yeterlilik ve zaman planı yer alır; uçtan uca destek veririz.",
        }),
      },
      {
        id: "uk-masters",
        title: "Yüksek Lisans Programı",
        tagline: "Güçlü uzmanlaşma seçenekleriyle hızlı 1 yıllık programlar.",
        details: makeDetails({
          overview:
            "UK yüksek lisans programlarının bir kısmı 1 yıllık yoğun eğitim sunar; hızlı uzmanlaşma ve kariyer dönüşümü için idealdir.",
          whoFor: [
            "Hızlı bir yüksek lisans rotası isteyen mezunlar",
            "Güçlü küresel bir yetkinlik belgesi hedefleyen profesyoneller",
            "Uzmanlaşmış programları hedefleyen adaylar (işletme, teknoloji, analitik)",
          ],
          advantages: [
            "Hızlı tamamlanma süresi",
            "Güçlü akademik marka ve networking",
            "Geniş uzmanlık alanı çeşitliliği",
            "Net kabul kriterleri ve intake dönemleri",
          ],
          duration: "Genellikle 1 yıl",
          feesAndVisa:
            "Vize ve CAS takvimleri sıkıdır. Yapılandırılmış plan, bütçe özeti ve evrak kontrolü sağlarız.",
        }),
      },
      {
        id: "visa-consulting",
        title: "Vize Danışmanlığı",
        tagline: "CAS odaklı zaman planı ve premium dosya hazırlığı.",
        details: makeDetails({
          overview:
            "UK odaklı öğrenci vizesi danışmanlığı: CAS hazırlığı, finansal yeterlilik kontrolleri ve randevu planlaması dahil.",
          whoFor: [
            "Sıkı zaman planı ve kontrol listesi isteyen adaylar",
            "Çoklu finansal evrakla ilerleyen öğrenciler",
            "Netlik ve daha az stres isteyen aileler",
          ],
          advantages: [
            "Deadline kontrolü ve hatırlatmalar",
            "Ret riskini azaltan finansal evrak kontrolleri",
            "Dosya sunumu ve evrak stratejisi",
            "Uçuş öncesi kontrol listesi ve varış yönlendirmesi",
          ],
          duration: "Genellikle 1–3 hafta",
          feesAndVisa:
            "Danışmanlık ücreti kapsamına göre değişir. Resmî vize ücretleri ve varsa sağlık harcı ayrıdır.",
        }),
      },
    ],
  },
  Canada: {
    heroImageUrl: HERO_CANADA_IMG_URL,
    programs: [
      {
        id: "ca-language",
        title: "Dil Okulları",
        tagline: "Güvenli şehirler ve esnek tarihlerle İngilizce/Fransızca geliştirme.",
        details: makeDetails({
          overview:
            "Kanada dil okulları; kaliteli eğitim ortamı ve öğrenci dostu yaşam tarzıyla öne çıkar.",
          whoFor: [
            "Kanada kolej/üniversitelerine hazırlanan öğrenciler",
            "Kariyer planı için dilini geliştirmek isteyen profesyoneller",
            "Güvenli ve planlı bir yurtdışı eğitim deneyimi isteyen adaylar",
          ],
          advantages: [
            "Kaliteli eğitim ortamı",
            "Güvenli şehirler ve güçlü öğrenci desteği",
            "Birden fazla başlangıç tarihi ve süre seçeneği",
            "Seçili kurumlarda pathway opsiyonları",
          ],
          duration: "4–36 hafta",
          feesAndVisa:
            "Study permit gereklilikleri programa ve süreye göre değişir. Finansal yeterlilik, evraklar ve zaman planında destek oluruz.",
        }),
      },
      {
        id: "ca-bachelors",
        title: "Lisans Programı",
        tagline: "Güçlü istihdam ekosistemi ve kampüs desteğiyle kaliteli diplomalar.",
        details: makeDetails({
          overview:
            "Kanada üniversiteleri; güçlü öğrenci servisleri ve kariyer desteğiyle dünya çapında tanınan diplomalar sunar.",
          whoFor: [
            "Uzun vadeli yurtdışı eğitim rotası hedefleyen öğrenciler",
            "Kampüs desteği ve güvenli yaşamı önemseyen adaylar",
            "Güçlü istihdam ekosistemi arayan adaylar",
          ],
          advantages: [
            "Güçlü öğrenci servisleri ve kampüs hayatı",
            "Araştırma ve uygulamalı derece seçenekleri",
            "Co-op/staj modelleri (programa göre değişir)",
            "Uluslararası tanınırlık",
          ],
          duration: "Genellikle 4 yıl",
          feesAndVisa:
            "Ücretler eyalet ve kuruma göre değişir. Study permit için finansal yeterlilik ve evrak gerekir; dosya ve zaman planını yapılandırırız.",
        }),
      },
      {
        id: "ca-masters",
        title: "Yüksek Lisans Programı",
        tagline: "Araştırma ve profesyonel master seçenekleri; net intake dönemleri.",
        details: makeDetails({
          overview:
            "Kanada’da yüksek lisans; üniversite ve alana göre araştırma dereceleri veya profesyonel programlar şeklinde sunulur.",
          whoFor: [
            "Uzmanlaşmak veya araştırma yönünü güçlendirmek isteyen mezunlar",
            "Güçlü küresel bir yetkinlik belgesi hedefleyen profesyoneller",
            "Uygun yerlerde co-op/profesyonel program hedefleyen adaylar",
          ],
          advantages: [
            "Birçok üniversitede güçlü araştırma çıktısı",
            "Net kabul dönemleri ve gereklilikler",
            "Seçili programlarda co-op opsiyonu",
            "Öğrenciler için yüksek yaşam kalitesi",
          ],
          duration: "1–2 years",
          feesAndVisa:
            "Study permit ve finansal planlama kritik. Net kontrol listesi sunar, evrak stratejisini uçtan uca yönetiriz.",
        }),
      },
      {
        id: "visa-consulting",
        title: "Vize/Oturum Danışmanlığı",
        tagline: "Study permit dosyası için zaman planı ve evrak kontrolü.",
        details: makeDetails({
          overview:
            "Study permit başarısına odaklı yapılandırılmış danışmanlık: netlik, eksiksizlik ve güven.",
          whoFor: [
            "Karmaşık finansal evrakları olan adaylar",
            "Sıkı intake deadline’ı olan öğrenciler",
            "Adım adım net yönlendirme isteyen aileler",
          ],
          advantages: [
            "Evrak ve finansal yeterlilik kontrolü",
            "Zaman planı ve hatırlatmalar",
            "Statement/motivasyon metni kurgusu",
            "Uçuş öncesi kontrol listesi ve yerleşim notları",
          ],
          duration: "Genellikle 1–3 hafta",
          feesAndVisa:
            "Danışmanlık ücreti kapsamına göre değişir. Resmî permit ücretleri ayrıdır; şeffaf bir özet sunarız.",
        }),
      },
    ],
  },
  Ireland: {
    heroImageUrl: HERO_IRELAND_IMG_URL,
    programs: [
      {
        id: "ie-work-study",
        title: "Work and Study Programı",
        tagline: "Dil okulu + part-time çalışma rotası (uygunluğa bağlı).",
        badge: "Popular",
        details: makeDetails({
          overview:
            "Vize ve program türüne bağlı olarak; yasal sınırlar içinde part-time çalışma potansiyeliyle dil eğitimini birleştiren yapılandırılmış rota.",
          whoFor: [
            "Çalışma esnekliği potansiyeli olan bir eğitim rotası arayan adaylar",
            "İngilizce konuşulan bir AB destinasyonu isteyen öğrenciler",
            "Bütçe ve zaman planı net olan adaylar",
          ],
          advantages: [
            "İngilizce konuşulan ortam",
            "Part-time çalışma ile maliyeti dengeleme potansiyeli (kurallar geçerlidir)",
            "Esnek başlangıç tarihleri",
            "Güçlü uluslararası öğrenci topluluğu",
          ],
          duration:
            "Uzun süreli rotalar için genellikle 25+ hafta (programa göre değişir)",
          workRights:
            "Çalışma hakkı vize/program türüne bağlıdır. Doğru rota ve uyum kurallarında destek veririz.",
          feesAndVisa:
            "Vize ve kayıt gereklilikleri vatandaşlık ve süreye göre değişir. Yapılandırılmış kontrol listesi ve zaman planı sunarız.",
        }),
      },
      {
        id: "visa-consulting",
        title: "Vize Danışmanlığı",
        tagline: "İrlanda eğitim rotanız için planlama ve evrak yönetimi.",
        details: makeDetails({
          overview:
            "Rotanızı planlamak, evrakları eksiksiz hazırlamak ve vize stresini azaltmak için özel destek.",
          whoFor: [
            "Adım adım net süreç isteyen adaylar",
            "Finansal yeterlilik şartlarını yöneten öğrenciler",
            "Zaman kontrolü ve hatırlatma ihtiyacı olan adaylar",
          ],
          advantages: [
            "Kontrol listesiyle hazırlık ve inceleme",
            "Bütçe planı ve finansal yeterlilik stratejisi",
            "Uçuş öncesi bilgilendirme ve varış adımları",
            "Kayıt ve yerleşim yönlendirmesinde destek",
          ],
          duration: "Genellikle 1–3 hafta",
          feesAndVisa:
            "Danışmanlık ücreti kapsamına göre değişir. Resmî ücretler rotaya bağlıdır; şeffaf bir özet sunarız.",
        }),
      },
    ],
  },
  Malta: {
    heroImageUrl: HERO_MALTA_IMG_URL,
    programs: [
      {
        id: "mt-language",
        title: "Dil Okulu",
        tagline: "Akdeniz yaşam tarzında esnek dönemlerle İngilizce eğitimi.",
        details: makeDetails({
          overview:
            "Malta; esnek kurs seçenekleri ve rahat yaşam temposuyla İngilizce eğitim için popüler bir destinasyondur.",
          whoFor: [
            "Bütçe dostu bir İngilizce eğitim destinasyonu arayan öğrenciler",
            "Kısa süreli dil immersion isteyen adaylar",
            "Eğitimi seyahat deneyimiyle birleştirmek isteyenler",
          ],
          advantages: [
            "Esnek başlangıç tarihleri ve süreler",
            "İngilizce konuşulan ortam",
            "Çekici yaşam tarzı ve iklim",
            "Birçok konaklama seçeneği",
          ],
          duration: "1–24+ hafta",
          feesAndVisa:
            "Vize gereklilikleri süre ve vatandaşlığa göre değişir. Doğru rota ve evrak listesini netleştiririz.",
        }),
      },
      {
        id: "mt-internship",
        title: "Staj (Work and Study)",
        tagline:
          "Pratik deneyim için eğitim + staj rotası (uygunluğa bağlı).",
        details: makeDetails({
          overview:
            "Program ve uygunluğa bağlı olarak; eğitimi yapılandırılmış staj yerleştirmesiyle birleştiren rota.",
          whoFor: [
            "Okurken pratik deneyim kazanmak isteyen adaylar",
            "Uluslararası deneyimle CV’sini güçlendirmek isteyen öğrenciler",
            "Yapılandırılmış ve yönlendirmeli yerleştirmeyi tercih eden adaylar",
          ],
          advantages: [
            "Pratik deneyim ve CV gelişimi",
            "Yapılandırılmış zaman planı ve destek",
            "Daha düşük giriş bariyeriyle uluslararası ortam",
            "İlk yurtdışı deneyimi için ideal",
          ],
          duration: "Genellikle 8–26 hafta (programa göre değişir)",
          workRights:
            "Çalışma/staj izinleri program kurallarına bağlıdır; uyum ve evrak konusunda yönlendiririz.",
          feesAndVisa:
            "Maliyetler eğitim ücreti ve varsa yerleştirme ücretlerini içerir. Vize gereklilikleri değişir; net bir dosya planı sunarız.",
        }),
      },
      {
        id: "visa-consulting",
        title: "Vize Danışmanlığı",
        tagline: "Malta eğitim rotaları için premium plan ve evrak yönetimi.",
        details: makeDetails({
          overview:
            "Malta rotanızı eksiksiz evrak ve düzenli zaman planıyla hazırlamak için özel destek.",
          whoFor: [
            "Kontrol listesiyle ilerlemek isteyen adaylar",
            "Seyahat tarihi yakın olan öğrenciler",
            "Ücretler ve evraklar konusunda netlik isteyen adaylar",
          ],
          advantages: [
            "Evrak eksiksizlik kontrolleri",
            "Hatırlatmalarla zaman planı",
            "Ücret ve vize rotasını net anlatım",
            "Uçuş öncesi kontrol listesi ve varış yönlendirmesi",
          ],
          duration: "Genellikle 1–2 hafta",
          feesAndVisa:
            "Danışmanlık ücreti kapsamına göre değişir. Resmî vize ücretleri rotaya bağlıdır; şeffaf bir özet sunarız.",
        }),
      },
    ],
  },
} as const satisfies Record<string, CountryPrograms>;

export type CountryId = keyof typeof PROGRAM_CATALOG;

export const COUNTRY_ORDER = [
  "Germany",
  "USA",
  "Netherlands",
  "United Kingdom",
  "Canada",
  "Ireland",
  "Malta",
] as const satisfies readonly CountryId[];
