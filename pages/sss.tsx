import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";

type Locale = "tr" | "en" | "de";

type FaqItem = {
  category: string;
  question: string;
  answer: string;
};

type SourceLink = {
  label: string;
  href: string;
};

const FAQS_TR: FaqItem[] = [
  {
    category: "Genel",
    question: "Lotus Abroad tam olarak hangi konularda destek verir?",
    answer:
      "Program seçimi, okul ve kurum araştırması, başvuru dosyası hazırlığı, motivasyon mektubu ve CV düzeni, vize evrak planı, konaklama ve varış öncesi hazırlık başlıklarında danışmanlık verir. Kapsam seçilen ülke ve programa göre değişir.",
  },
  {
    category: "Genel",
    question: "Hangi ülkeler için danışmanlık veriyorsunuz?",
    answer:
      "Sitedeki ana odak ülkeler Almanya, ABD, Birleşik Krallık, Hollanda, Kanada, İrlanda ve Malta'dır. Program bazlı uygunluk ülkeye, akademik geçmişe ve hedefe göre değerlendirilir.",
  },
  {
    category: "Genel",
    question: "Sitede hangi program türleri var?",
    answer:
      "Lisans, yüksek lisans, doktora, dil okulu, Ausbildung, Work and Travel, Camp USA, Au Pair, staj/work-study, vize danışmanlığı ve bazı ülkelerde diploma tanıma veya mesleki yerleştirme odaklı seçenekler bulunur.",
  },
  {
    category: "Genel",
    question: "Hangi programın bana uygun olduğunu nasıl anlarım?",
    answer:
      "Kararı yaş, eğitim geçmişi, dil seviyesi, bütçe, kariyer hedefi ve ülkeye çıkış süresi belirler. Aynı hedef için herkese aynı program önerilmez; örneğin kısa vadeli çıkış isteyen biriyle akademik hedefi güçlü bir adayın yolu farklı olabilir.",
  },
  {
    category: "Genel",
    question: "Başvuru sürecine ne kadar erken başlamak gerekir?",
    answer:
      "Akademik programlarda çoğu zaman 6 ila 12 ay erken başlamak daha güvenlidir. Dil okulu ve bazı kısa programlarda süre daha kısa olabilir ama vize ve evrak payı bırakmak gerekir.",
  },
  {
    category: "Genel",
    question: "Dil puanı olmadan başvuru yapılabilir mi?",
    answer:
      "Bazı kurumlar şartlı kabul veya hazırlık opsiyonu sunabilir, bazıları ise doğrudan resmi skor ister. Bu durum ülkeye, seviyeye ve kuruma göre değiştiği için dosya bazlı kontrol gerekir.",
  },
  {
    category: "Genel",
    question: "Not ortalaması düşük olan biri yine de yurtdışına gidebilir mi?",
    answer:
      "Evet, ama okul ve program seçimi daha stratejik yapılmalıdır. Düşük ortalama; güçlü motivasyon mektubu, iyi CV, iş tecrübesi, referans ve doğru ülke seçimiyle dengelenebilir.",
  },
  {
    category: "Genel",
    question: "Bölümümle tamamen farklı bir alana geçiş yapabilir miyim?",
    answer:
      "Bazı master ve diploma programlarında mümkün olabilir ancak akademik tutarlılık beklenir. Geçiş mantığını net anlatan bir dosya ve bazen ek ders/tecrübe desteği gerekir.",
  },
  {
    category: "Genel",
    question: "Burs garantisi verilebilir mi?",
    answer:
      "Hayır. Burslar rekabetçidir ve kurum, ülke, akademik profil ve başvuru kalitesi gibi değişkenlere bağlıdır. Doğru eşleşme ve zamanında başvuru şansı artırır ama garanti oluşturmaz.",
  },
  {
    category: "Genel",
    question: "Kabul garantisi var mı?",
    answer:
      "Hiçbir etik danışmanlık kabul garantisi vermez. Yapılabilecek en doğru şey, profilinize uygun okulları seçmek ve dosyayı güçlü, eksiksiz ve zamanında sunmaktır.",
  },
  {
    category: "Başvuru",
    question: "Başvuru için genelde hangi belgeler gerekir?",
    answer:
      "Pasaport, diploma ve transkript, CV, motivasyon mektubu, dil skoru, finansal yeterlilik evrakları ve gerekirse referans mektupları en yaygın belgelerdir. Bazı programlar portfolyo, iş deneyimi veya mülakat da ister.",
  },
  {
    category: "Başvuru",
    question: "Motivasyon mektubu neden bu kadar önemli?",
    answer:
      "Motivasyon mektubu yalnızca neden gitmek istediğinizi değil, neden o ülke, neden o okul ve neden o program sorularını tutarlı biçimde cevaplamalıdır. Zayıf mektup, iyi notları bile gölgeleyebilir.",
  },
  {
    category: "Başvuru",
    question: "Referans mektubu her programda gerekli mi?",
    answer:
      "Hayır, ama özellikle lisansüstü başvurularda çok yaygındır. Akademik referans, adayın ders başarısı ve potansiyeli hakkında; profesyonel referans ise iş disiplini ve alan uygunluğu hakkında değer taşır.",
  },
  {
    category: "Başvuru",
    question: "CV formatı ülkeden ülkeye değişir mi?",
    answer:
      "Evet. Avrupa odaklı başvurularda daha sade ve net bir yapı beklenirken, bazı programlar akademik detayları daha çok görmek ister. Aynı CV'yi her kuruma aynen göndermek doğru yaklaşım değildir.",
  },
  {
    category: "Başvuru",
    question: "Başvuru ücretleri iade edilir mi?",
    answer:
      "Çoğu kurumda başvuru ücreti iade edilmez. Bu nedenle okul listesini rastgele büyütmek yerine, kabul olasılığı ve hedef uyumu yüksek kurumlara odaklanmak daha rasyoneldir.",
  },
  {
    category: "Başvuru",
    question: "Sponsorlu finans gösterilebilir mi?",
    answer:
      "Birçok ülkede sponsorlu finans mümkündür ancak sponsor evraklarının resmi ve açıklanabilir olması gerekir. Sponsorun gelir kaynağı, banka hareketleri ve adayla ilişkisinin tutarlı görünmesi önemlidir.",
  },
  {
    category: "Başvuru",
    question: "Vize reddi almış biri tekrar başvurabilir mi?",
    answer:
      "Evet. Önce ret gerekçesi teknik olarak analiz edilmeli, sonra dosya aynı haliyle tekrar gönderilmemelidir. Eksik belge, zayıf finans kurgusu veya ikna edici olmayan eğitim planı düzeltilmeden yeniden başvuru risklidir.",
  },
  {
    category: "Başvuru",
    question: "Konaklama desteği veriliyor mu?",
    answer:
      "Kurum yurdu, özel yurt, paylaşımlı ev veya aile yanı gibi seçenekler program ve ülkeye göre değişir. Danışmanlık sürecinde bu başlık genelde kabul ve bütçe planına paralel ele alınır.",
  },
  {
    category: "Başvuru",
    question: "Çalışırken eğitim almak mümkün mü?",
    answer:
      "Bazı ülkelerde öğrenci statüsüyle sınırlı sürelerde part-time çalışma mümkündür, bazı programlarda ise çalışma hakkı çok kısıtlıdır. Güncel çalışma kuralları vize tipine ve döneme göre kontrol edilmelidir.",
  },
  {
    category: "Başvuru",
    question: "Tercüme ve noter şart mı?",
    answer:
      "Her belgede değil. Hangi belgenin yeminli tercüme, apostil veya noter istediği hedef ülke ve kurumun talimatına göre değişir; gereksiz masraf yaratmamak için belge bazlı kontrol yapılmalıdır.",
  },
  {
    category: "Almanya",
    question: "Almanya'da lisans veya yüksek lisans için en temel gereklilikler nelerdir?",
    answer:
      "Kurumun kabul şartlarını karşılayan diploma ve not dökümü, uygun dil yeterliliği, finansal plan ve eksiksiz başvuru dosyası temel unsurlardır. Bazı programlar doğrudan alan uyumu ve ön koşul dersler de ister.",
  },
  {
    category: "Almanya",
    question: "Almanya öğrenci vizesinde finansal yeterlilik neden kritik?",
    answer:
      "Resmi süreçte öğrencinin yaşam giderlerini karşılayabileceğinin gösterilmesi beklenir. DAAD ve ilgili resmi kaynaklar, vize aşamasında finans kanıtının merkezi önemde olduğunu açıkça vurgular.",
  },
  {
    category: "Almanya",
    question: "Almanya için bloke hesap her zaman gerekir mi?",
    answer:
      "Birçok aday için bloke hesap en yaygın finans gösterim yöntemidir ancak tek yöntem değildir. Burs, resmi sponsor veya bazı özel finans modelleri dosyaya göre kabul edilebilir; karar vize merciinin beklentisine bağlıdır.",
  },
  {
    category: "Almanya",
    question: "Ausbildung programı kimler için uygundur?",
    answer:
      "Daha pratik ve mesleki bir rota isteyen, belirli alanlarda çalışarak öğrenmeyi hedefleyen adaylar için güçlü bir seçenektir. Dil seviyesi, yaş, alan uygunluğu ve işveren eşleşmesi sürecin kilit parçalarıdır.",
  },
  {
    category: "Almanya",
    question: "Diploma tanıma veya denklik hangi durumlarda gerekir?",
    answer:
      "Özellikle regüle meslekler ve bazı mesleki geçişlerde diploma tanıma süreci kritik olabilir. Her meslekte aynı sistem işlemez; alan ve eyalet bazlı değerlendirme gerekir.",
  },
  {
    category: "Almanya",
    question: "Almanya'da öğrenciyken çalışmak mümkün mü?",
    answer:
      "Mümkün olabilir ancak çalışma hakkı vize ve öğrenci statüsüne göre sınırlıdır. Resmi kurallar dönem dönem güncellendiği için başvuru öncesi güncel çalışma hakkı ayrıca kontrol edilmelidir.",
  },
  {
    category: "ABD",
    question: "ABD öğrenci vizesi için ilk resmi adım nedir?",
    answer:
      "Önce SEVP onaylı bir okuldan kabul almak ve okul tarafından düzenlenen I-20 belgesini edinmek gerekir. Sonrasında SEVIS süreci, DS-160 ve konsolosluk randevu aşamaları gelir.",
  },
  {
    category: "ABD",
    question: "ABD F-1 vizesi için hangi mantıkla değerlendirme yapılır?",
    answer:
      "Adayın gerçek bir öğrenci olduğu, finansal planının tutarlı olduğu ve eğitim hedefinin açıklanabildiği görülmek istenir. Belgelerin yanı sıra dosyanın anlatısı da önemlidir.",
  },
  {
    category: "ABD",
    question: "Work and Travel kimler için uygundur?",
    answer:
      "Genellikle tam zamanlı üniversite öğrencileri için kısa dönem kültürel değişim ve çalışma programı olarak düşünülür. Akademik durum, yaş, İngilizce seviyesi ve sponsorluk yapısı önem taşır.",
  },
  {
    category: "ABD",
    question: "Camp USA ile Work and Travel aynı şey mi?",
    answer:
      "Hayır. İkisi de kültürel değişim mantığı taşısa da işin yapısı, çalışma ortamı ve görev profili farklıdır. Camp USA daha çok kamp ortamında çocuklar ve takım görevleri etrafında şekillenir.",
  },
  {
    category: "ABD",
    question: "ABD Au Pair programında en kritik koşullar nelerdir?",
    answer:
      "Çocuk bakımına uygun profil, iletişim becerisi, İngilizce seviyesi, sürüş gibi operasyonel beklentiler ve program kurallarına uyum öne çıkar. Aile eşleşmesi bu programın en kritik aşamalarından biridir.",
  },
  {
    category: "ABD",
    question: "H-2B gibi geçici çalışma vizeleri öğrenci programlarıyla aynı mı?",
    answer:
      "Hayır. H-2B geçici ve mevsimsel işveren ihtiyacına dayalı ayrı bir vize kategorisidir; öğrenci vizesiyle karıştırılmamalıdır. İşveren talebi ve yasal kota gibi unsurlar belirleyicidir.",
  },
  {
    category: "Birleşik Krallık",
    question: "Birleşik Krallık öğrenci vizesi için temel resmi çerçeve nedir?",
    answer:
      "Genel olarak lisanslı bir kurumdan kabul, CAS bilgisi, finansal yeterlilik ve uygun İngilizce seviyesi beklenir. Kurallar GOV.UK üzerinde açık şekilde yayınlanır ve dönemsel olarak güncellenebilir.",
  },
  {
    category: "Birleşik Krallık",
    question: "CAS nedir ve neden önemlidir?",
    answer:
      "CAS, okulun sizi desteklediğini gösteren referans niteliğinde resmi başvuru bilgisidir. Vize süreci okul kabulü ile vize başvurusunu teknik olarak birbirine bağlayan ana unsurlardan biridir.",
  },
  {
    category: "Birleşik Krallık",
    question: "Birleşik Krallık'ta dil skoru zorunlu mudur?",
    answer:
      "Birçok programda evet, ancak kullanılan sınav ve minimum skor okul ile seviye bazında değişir. Bazı öğrenciler önce pathway veya pre-sessional İngilizce rotasıyla ilerleyebilir.",
  },
  {
    category: "Birleşik Krallık",
    question: "Mezuniyet sonrası kalış veya çalışma şansı var mı?",
    answer:
      "Mezuniyet sonrası kalış hakları kullanılan vize tipi ve dönemin resmi düzenlemelerine göre değişir. Bu alanda kurallar daha sık güncellendiği için başvuru anındaki resmi durum kontrol edilmelidir.",
  },
  {
    category: "Hollanda",
    question: "Hollanda'da üniversite başvurularında hangi başlıklar öne çıkar?",
    answer:
      "Kurumun akademik giriş şartları, dil seviyesi, program uyumu ve zamanında tamamlanmış dosya en kritik başlıklardır. Bazı bölümler seçicidir ve ek değerlendirme ya da kontenjan baskısı olabilir.",
  },
  {
    category: "Hollanda",
    question: "Hollanda'da oturum ve öğrenci statüsü nasıl işler?",
    answer:
      "Genellikle okul, öğrenci adına oturum sürecinin ana parçasında rol alır; ancak belgelerin doğruluğu yine aday sorumluluğundadır. IND kuralları hangi eğitim türünde hangi izinlerin gerektiğini belirler.",
  },
  {
    category: "Hollanda",
    question: "Hollanda'da öğrenciyken çalışma mümkün mü?",
    answer:
      "Mümkün olabilir fakat çalışma saatleri ve işveren izinleri öğrenci statüsüne göre sınırlı olabilir. Bu konu için resmi IND yönlendirmesi esas alınmalıdır.",
  },
  {
    category: "Hollanda",
    question: "Hollanda'da mezuniyet sonrası iş arama imkanı var mı?",
    answer:
      "Bazı mezunlar için orientation year benzeri fırsatlar gündeme gelebilir. Bu hakların kimlere, hangi diplomalara ve hangi tarihlere göre verildiği resmi göç kurallarıyla belirlenir.",
  },
  {
    category: "Kanada",
    question: "Kanada'da study permit almak için ana mantık nedir?",
    answer:
      "Önce uygun bir kurumdan kabul alınır, ardından eğitim amacı, finans planı ve destekleyici belgelerle study permit başvurusu yapılır. Kurumun statüsü ve dosyanın inandırıcılığı çok önemlidir.",
  },
  {
    category: "Kanada",
    question: "Kanada'da hangi okul kabul edilirse study permit için daha güvenli olur?",
    answer:
      "Başvurularda kurumun resmi uygunluğu ve programın adayın geçmişiyle mantıksal ilişkisi kritik görünür. Sadece kabul almak yetmez; seçilen programın eğitim ve kariyer planında anlamlı durması gerekir.",
  },
  {
    category: "Kanada",
    question: "Kanada vizesinde finans dosyası nasıl olmalı?",
    answer:
      "Masrafları karşılayabilecek düzenli ve açıklanabilir bir finans yapısı beklenir. Paranın kaynağı, sponsor ilişkisi ve hesap hareketleri çelişkisiz görünmelidir.",
  },
  {
    category: "Kanada",
    question: "Kanada'da öğrenciyken çalışma hakkı otomatik midir?",
    answer:
      "Hayır, çalışma hakkı izin türüne ve güncel resmi koşullara bağlıdır. Bu alan son yıllarda daha sık değiştiği için başvuru anındaki IRCC duyurusu esas alınmalıdır.",
  },
  {
    category: "İrlanda",
    question: "İrlanda dil okulu ve work and study neden bu kadar popüler?",
    answer:
      "İngilizce eğitim ortamı, nispeten erişilebilir giriş rotaları ve belirli şartlarla öğrenci çalışmasına izin veren yapı nedeniyle öne çıkar. Ancak okul seçimi ve vize dosyası burada da belirleyicidir.",
  },
  {
    category: "İrlanda",
    question: "İrlanda'da öğrenciler haftada kaç saat çalışabilir?",
    answer:
      "Resmi göç kuralları, uygun öğrenci statüsündeki kişilere belirli dönemlerde sınırlı çalışma imkanı tanır. Sık kullanılan genel çerçeve 20 saat ve belirli dönemlerde daha yüksek limitlerdir; kesin durum başvuru tarihinde doğrulanmalıdır.",
  },
  {
    category: "İrlanda",
    question: "İrlanda öğrenci programında okul listesi neden çok önemli?",
    answer:
      "Her okul ve program aynı güven düzeyinde değerlendirilmez. Öğrencinin gideceği kurumun resmi statüsü, eğitim saati ve program yapısı vize dosyasının ciddiyetini doğrudan etkiler.",
  },
  {
    category: "İrlanda",
    question: "İrlanda için finans ve niyet mektubu önemli mi?",
    answer:
      "Evet. Öğrencinin eğitim amacını ve finansal sürdürülebilirliğini net göstermesi beklenir. Özellikle kısa yoldan çalışma amacı taşıdığı izlenimi veren zayıf dosyalar risk oluşturabilir.",
  },
  {
    category: "Malta",
    question: "Malta dil okulu programı kimler için mantıklı bir başlangıç olabilir?",
    answer:
      "İngilizce seviyesini yükseltmek, ilk yurtdışı deneyimini daha kontrollü yaşamak veya daha erişilebilir bütçeyle çıkış planlamak isteyen adaylar için mantıklı olabilir. Ancak okul kalitesi ve vize stratejisi yine önemlidir.",
  },
  {
    category: "Malta",
    question: "Malta öğrenci dosyasında hangi noktalar risk yaratır?",
    answer:
      "Zayıf finans gösterimi, açıklanamayan hesap hareketleri, tutarsız eğitim hedefi ve yalnızca çalışma odaklı görünen dosyalar risk yaratabilir. Dil okulu başvurularında da niyetin eğitim ekseninde kurulması gerekir.",
  },
  {
    category: "Malta",
    question: "Malta'da çalışma hakkı otomatik kabul edilir mi?",
    answer:
      "Hayır. Çalışma hakkı öğrenci statüsü, izin tipi ve güncel yerel düzenlemelere göre değerlendirilir. Bu nedenle başvuru öncesinde resmi ve güncel şartlar ayrıca kontrol edilmelidir.",
  },
  {
    category: "Malta",
    question: "Malta mı, İrlanda mı, yoksa Kanada dil okulu mu daha mantıklı?",
    answer:
      "Bu sorunun tek doğru cevabı yoktur. Bütçe, vize profili, İngilizce seviyesi, çalışma hedefi ve uzun vadeli planınıza göre ülke tercihi değişir; düşük maliyetli seçenek her zaman en doğru seçenek değildir.",
  },
  {
    category: "Strateji",
    question: "Önce ülke mi seçilmeli, program mı?",
    answer:
      "En sağlıklı yaklaşım hedefi seçmektir: akademik derece mi, mesleki rota mı, dil gelişimi mi, kısa dönem gelir mi? Hedef netleşince ülke ve program seçimi daha doğru yapılır.",
  },
  {
    category: "Strateji",
    question: "Herkes için en hızlı ülke hangisi?",
    answer:
      "Böyle bir ülke yoktur. Aynı ülke bir aday için hızlı ilerlerken başka bir aday için belge, finans veya profil uyumsuzluğu nedeniyle yavaş ve riskli olabilir.",
  },
  {
    category: "Strateji",
    question: "En uygun maliyetli rota her zaman en mantıklı rota mıdır?",
    answer:
      "Hayır. Daha düşük başlangıç maliyeti bazen daha zayıf okul, daha riskli vize dosyası veya hedefe hizmet etmeyen bir program anlamına gelebilir. Toplam değer, yalnızca ilk ücretle ölçülmemelidir.",
  },
  {
    category: "Strateji",
    question: "Lotus Abroad ile sürece başlamak için ilk adım nedir?",
    answer:
      "Önce profil değerlendirmesi yapılır; akademik geçmiş, yaş, bütçe, dil seviyesi ve hedefler netleştirilir. Sonra size uygun birkaç rota çıkarılır ve dosya buna göre yapılandırılır.",
  },
];

const SOURCE_LINKS: SourceLink[] = [
  { label: "GOV.UK Student Visa", href: "https://www.gov.uk/student-visa" },
  {
    label: "IRCC Study Permit",
    href: "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit.html",
  },
  {
    label: "U.S. State Department Student Visa",
    href: "https://travel.state.gov/content/travel/en/us-visas/study/student-visa.html",
  },
  {
    label: "J-1 Summer Work Travel",
    href: "https://j1visa.state.gov/programs/summer-work-travel/",
  },
  {
    label: "Irish Immigration Study in Ireland",
    href: "https://www.irishimmigration.ie/coming-to-study-in-ireland/",
  },
  {
    label: "IND Netherlands Student Residence Permit",
    href: "https://ind.nl/en/residence-permits/study/student-residence-permit-for-university-or-higher-professional-education",
  },
  {
    label: "IND Netherlands Working While Studying",
    href: "https://ind.nl/en/residence-permits/work/working-while-studying-in-the-netherlands",
  },
  {
    label: "DAAD Visa Information",
    href: "https://www.daad.de/en/studying-in-germany/requirements/visa/",
  },
  {
    label: "Make it in Germany Student Work Overview",
    href: "https://www.make-it-in-germany.com/en/study-vocational-training/studies-in-germany/work",
  },
  {
    label: "Identita Malta Residence Permit FAQ",
    href: "https://identita.gov.mt/wp-content/uploads/2025/09/FAQs-Residence-Permits-Malta-002.pdf",
  },
];

const SEO_KEYWORDS_TR = [
  "sss yurtdışı eğitim",
  "sıkça sorulan sorular yurtdışı eğitim",
  "almanya ausbildung şartları",
  "abd öğrenci vizesi nasıl alınır",
  "ingiltere öğrenci vizesi şartları",
  "kanada study permit şartları",
  "hollanda üniversite başvurusu",
  "irlanda work and study şartları",
  "malta dil okulu vizesi",
  "lotus abroad sss",
  "yurtdışı eğitim danışmanlığı soruları",
  "öğrenci vizesi gereklilikleri",
];

const PAGE_COPY: Record<
  Locale,
  {
    title: string;
    description: string;
    heroBadge: string;
    heroTitle: string;
    heroText: string;
    quickLinksLabel: string;
    sourceTitle: string;
    sourceText: string;
    ctaTitle: string;
    ctaText: string;
    ctaPrimary: string;
    ctaSecondary: string;
  }
> = {
  tr: {
    title: "SSS | Yurtdışı Eğitim, Vize ve Program Soruları | Lotus Abroad",
    description:
      "Lotus Abroad SSS sayfası: Almanya, ABD, İngiltere, Hollanda, Kanada, İrlanda ve Malta için program seçimi, başvuru gereklilikleri, öğrenci vizesi, finans ve çalışma hakkı hakkında kapsamlı cevaplar.",
    heroBadge: "Sıkça Sorulan Sorular",
    heroTitle: "Yurtdışı eğitim sürecinde en çok sorulan 45+ sorunun net cevapları",
    heroText:
      "Bu sayfa; sitedeki programlar, ülke bazlı gereklilikler, öğrenci vizesi, finans, dil yeterliliği ve başvuru stratejileri için hızlı bir referans olarak hazırlandı. İçerik; Lotus Abroad program yapısı ve resmi kaynak araştırmaları birleştirilerek oluşturuldu.",
    quickLinksLabel: "Hızlı geçiş",
    sourceTitle: "Resmi kaynaklar",
    sourceText:
      "Ülke bazlı şartlar dönemsel olarak değişebildiği için karar aşamasında resmi kurum duyuruları ayrıca kontrol edilmelidir. Aşağıdaki bağlantılar içerik kurgusunda esas alınan başlıca resmi kaynaklardır.",
    ctaTitle: "Dosyanızı genel bilgiyle değil, profilinize göre kurun",
    ctaText:
      "SSS sayfası yön verir; ama doğru rota, yaşınız, not ortalamanız, dil seviyeniz, bütçeniz ve hedef ülkeniz birlikte değerlendirilince çıkar.",
    ctaPrimary: "Ücretsiz Görüşme Al",
    ctaSecondary: "Programları İncele",
  },
  en: {
    title: "FAQ | Study Abroad, Visa and Program Questions | Lotus Abroad",
    description:
      "Lotus Abroad FAQ page covering study abroad programs, student visa basics, application requirements, funding, and country-specific pathways.",
    heroBadge: "Frequently Asked Questions",
    heroTitle: "Clear answers to the most common study abroad questions",
    heroText:
      "This page combines Lotus Abroad's program structure with official public guidance from major destination countries. It is designed as a practical reference point before a one-to-one review.",
    quickLinksLabel: "Quick links",
    sourceTitle: "Official sources",
    sourceText:
      "Rules can change over time, especially for visas and work rights. Final decisions should always be checked against the latest official guidance.",
    ctaTitle: "General answers are useful, but your file needs a profile-based route",
    ctaText:
      "The right path depends on age, academics, language level, budget, and timeline. We use those factors to narrow the safest and most efficient route.",
    ctaPrimary: "Book Free Consultation",
    ctaSecondary: "Explore Programs",
  },
  de: {
    title: "FAQ | Auslandsstudium, Visa und Programme | Lotus Abroad",
    description:
      "Lotus Abroad FAQ zu Auslandsstudium, Visa-Grundlagen, Bewerbungsanforderungen, Finanzierung und länderspezifischen Programmen.",
    heroBadge: "Häufige Fragen",
    heroTitle: "Klare Antworten auf häufige Fragen zum Auslandsstudium",
    heroText:
      "Diese Seite bündelt die Programmlogik von Lotus Abroad mit offiziellen öffentlichen Quellen wichtiger Zielländer. Sie dient als kompakter Ausgangspunkt vor einer individuellen Prüfung.",
    quickLinksLabel: "Schnellzugriff",
    sourceTitle: "Offizielle Quellen",
    sourceText:
      "Regeln können sich ändern, besonders bei Visa und Arbeitsrechten. Vor endgültigen Entscheidungen sollten die aktuellen offiziellen Vorgaben geprüft werden.",
    ctaTitle: "Allgemeine Antworten helfen, aber Ihre Route muss profilbasiert sein",
    ctaText:
      "Die richtige Strategie hängt von Alter, akademischem Hintergrund, Sprachstand, Budget und Zeitplan ab. Genau daraus leiten wir die passende Route ab.",
    ctaPrimary: "Kostenlose Beratung",
    ctaSecondary: "Programme ansehen",
  },
};

const CATEGORY_ORDER = [
  "Genel",
  "Başvuru",
  "Almanya",
  "ABD",
  "Birleşik Krallık",
  "Hollanda",
  "Kanada",
  "İrlanda",
  "Malta",
  "Strateji",
] as const;

function toAbsoluteUrl(baseUrl: string, locale: Locale, path: string) {
  if (locale === "tr") return `${baseUrl}${path}`;
  return `${baseUrl}/${locale}${path}`;
}

export default function FaqPage() {
  const router = useRouter();
  const locale = (router.locale ?? "tr") as Locale;
  const safeLocale: Locale = locale in PAGE_COPY ? locale : "tr";
  const copy = PAGE_COPY[safeLocale];
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.lotusabroad.net").replace(/\/+$/, "");
  const pageUrl = toAbsoluteUrl(siteUrl, safeLocale, "/sss");
  const ogImage = `${siteUrl}/friends-with-thumbs-up-lying-lawn-park-1600.jpg`;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS_TR.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: safeLocale === "tr" ? "Ana Sayfa" : safeLocale === "en" ? "Home" : "Startseite",
        item: toAbsoluteUrl(siteUrl, safeLocale, "/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: safeLocale === "tr" ? "SSS" : "FAQ",
        item: pageUrl,
      },
    ],
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: copy.title,
    description: copy.description,
    url: pageUrl,
    inLanguage: safeLocale,
    about: SEO_KEYWORDS_TR,
  };

  return (
    <>
      <Head>
        <title>{copy.title}</title>
        <meta name="description" content={copy.description} />
        <meta name="keywords" content={SEO_KEYWORDS_TR.join(", ")} />
        <meta property="og:title" content={copy.title} />
        <meta property="og:description" content={copy.description} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={ogImage} />
        <meta name="twitter:title" content={copy.title} />
        <meta name="twitter:description" content={copy.description} />
        <meta name="twitter:image" content={ogImage} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
        />
      </Head>

      <SiteHeader />

      <main className="pt-24 bg-gradient-to-b from-white via-background-light to-background-light dark:from-background-dark dark:via-background-dark dark:to-background-dark">
        <section className="border-b border-gray-200/70 dark:border-white/10">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-18">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/15 text-text-main dark:text-white text-xs font-bold uppercase tracking-widest">
                <span className="material-symbols-outlined text-[18px]">quiz</span>
                {copy.heroBadge}
              </div>
              <h1 className="mt-6 text-4xl md:text-6xl font-black tracking-tight text-text-main dark:text-white">
                {copy.heroTitle}
              </h1>
              <p className="mt-6 max-w-3xl text-sm md:text-base leading-relaxed text-text-muted dark:text-gray-400">
                {copy.heroText}
              </p>

              <div className="mt-8 flex flex-wrap gap-3 text-sm font-bold text-text-main dark:text-white">
                <span className="text-text-muted dark:text-gray-400">{copy.quickLinksLabel}:</span>
                <Link className="hover:text-primary transition-colors" href="/programs?country=Germany#countries">
                  Almanya
                </Link>
                <Link className="hover:text-primary transition-colors" href="/programs?country=USA#countries">
                  ABD
                </Link>
                <Link
                  className="hover:text-primary transition-colors"
                  href="/programs?country=United Kingdom#countries"
                >
                  İngiltere
                </Link>
                <Link
                  className="hover:text-primary transition-colors"
                  href="/programs?country=Netherlands#countries"
                >
                  Hollanda
                </Link>
                <Link className="hover:text-primary transition-colors" href="/programs?country=Canada#countries">
                  Kanada
                </Link>
                <Link className="hover:text-primary transition-colors" href="/programs?country=Ireland#countries">
                  İrlanda
                </Link>
                <Link className="hover:text-primary transition-colors" href="/programs?country=Malta#countries">
                  Malta
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-14 md:py-18">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6">
              {CATEGORY_ORDER.map((category) => {
                const items = FAQS_TR.filter((item) => item.category === category);
                if (!items.length) return null;

                return (
                  <section
                    key={category}
                    className="rounded-[2rem] bg-white/85 dark:bg-white/5 border border-gray-100 dark:border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.08)] p-6 md:p-8"
                  >
                    <div className="flex items-center gap-3">
                      <div className="size-12 rounded-2xl bg-primary text-black flex items-center justify-center shadow-[0_14px_40px_rgba(249,245,6,0.22)]">
                        <span className="material-symbols-outlined text-[22px]">help</span>
                      </div>
                      <h2 className="text-2xl md:text-3xl font-black tracking-tight text-text-main dark:text-white">
                        {category}
                      </h2>
                    </div>

                    <div className="mt-8 grid gap-4">
                      {items.map((item, index) => (
                        <article
                          className="rounded-[1.6rem] border border-gray-100 dark:border-white/10 bg-background-light/70 dark:bg-white/5 p-5 md:p-6"
                          key={`${category}-${index}`}
                        >
                          <h3 className="text-lg md:text-xl font-black text-text-main dark:text-white">
                            {item.question}
                          </h3>
                          <p className="mt-3 text-sm md:text-base leading-relaxed text-text-muted dark:text-gray-400">
                            {item.answer}
                          </p>
                        </article>
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>
          </div>
        </section>

        <section className="pb-14 md:pb-18">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 lg:grid-cols-[1.3fr_0.9fr]">
              <section className="rounded-[2rem] bg-white/85 dark:bg-white/5 border border-gray-100 dark:border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.08)] p-6 md:p-8">
                <h2 className="text-2xl md:text-3xl font-black tracking-tight text-text-main dark:text-white">
                  {copy.sourceTitle}
                </h2>
                <p className="mt-4 text-sm md:text-base leading-relaxed text-text-muted dark:text-gray-400">
                  {copy.sourceText}
                </p>
                <div className="mt-6 grid gap-3">
                  {SOURCE_LINKS.map((source) => (
                    <a
                      key={source.href}
                      className="group rounded-2xl border border-gray-100 dark:border-white/10 bg-background-light/70 dark:bg-white/5 px-4 py-4 text-sm md:text-base font-bold text-text-main dark:text-white hover:border-primary/40 hover:bg-white dark:hover:bg-white/10 transition-colors"
                      href={source.href}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <span>{source.label}</span>
                      <span className="material-symbols-outlined align-middle ml-2 text-[18px] opacity-70 group-hover:opacity-100">
                        north_east
                      </span>
                    </a>
                  ))}
                </div>
              </section>

              <section className="rounded-[2rem] bg-text-main text-white dark:bg-primary dark:text-black shadow-[0_25px_60px_rgba(0,0,0,0.12)] p-6 md:p-8">
                <h2 className="text-2xl md:text-3xl font-black tracking-tight">{copy.ctaTitle}</h2>
                <p className="mt-4 text-sm md:text-base leading-relaxed text-white/80 dark:text-black/80">
                  {copy.ctaText}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <button
                    className="h-12 px-7 rounded-full bg-primary text-black text-sm font-black flex items-center justify-center hover:brightness-105 transition-all shadow-[0_18px_40px_rgba(249,245,6,0.24)] dark:bg-black dark:text-white dark:shadow-[0_18px_40px_rgba(0,0,0,0.18)]"
                    aria-haspopup="dialog"
                    data-calendly-open="true"
                    type="button"
                  >
                    {copy.ctaPrimary}
                  </button>
                  <Link
                    className="h-12 px-7 rounded-full border border-white/20 dark:border-black/15 bg-white/10 dark:bg-black/10 text-sm font-black flex items-center justify-center hover:bg-white/15 dark:hover:bg-black/15 transition-colors"
                    href="/programs"
                  >
                    {copy.ctaSecondary}
                  </Link>
                </div>
              </section>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
