import Head from "next/head";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";

const OFFICE_ADDRESS =
  "MAHFESIĞMAZ MAHALLESİ\n79129 SK. AZİZ KAYA SİTESİ SİT. A BLOK APT. NO: 9 -1/01\nÇUKUROVA / ADANA";

const WHATSAPP_NUMBER_DISPLAY = "+90 530 212 69 22";
const WHATSAPP_NUMBER_E164 = "9053021266922";
const WHATSAPP_LINK_URL = `https://wa.me/${WHATSAPP_NUMBER_E164}?text=${encodeURIComponent(
  "Merhaba! Ücretsiz değerlendirme için bilgi almak istiyorum.",
)}`;

const EMAIL_ADDRESS = "info@lotusabroad.net";

const MAPS_EMBED_URL = `https://www.google.com/maps?q=${encodeURIComponent(
  OFFICE_ADDRESS,
)}&output=embed`;
const MAPS_LINK_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  OFFICE_ADDRESS,
)}`;

function InfoRow({
  icon,
  title,
  value,
}: {
  icon: string;
  title: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="size-11 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center shrink-0">
        <span className="material-symbols-outlined text-[18px] text-text-main dark:text-white">
          {icon}
        </span>
      </div>
      <div className="pt-0.5">
        <div className="text-sm font-bold text-text-main dark:text-white">
          {title}
        </div>
        <div className="text-sm text-text-muted dark:text-gray-400">{value}</div>
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <>
      <Head>
        <title>İletişim | Lotus Abroad</title>
        <meta
          name="description"
          content="Lotus Abroad ile iletişime geçin: WhatsApp, e-posta veya form üzerinden ücretsiz değerlendirme talep edin."
        />
      </Head>

      <SiteHeader />

      <main className="pt-24">
        <section className="bg-gradient-to-b from-white via-background-light to-background-light dark:from-background-dark dark:via-background-dark dark:to-background-dark border-b border-gray-200/70 dark:border-white/10">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-text-main dark:text-white">
              İletişim
            </h1>
            <p className="mt-4 text-sm md:text-base text-text-muted dark:text-gray-400 max-w-2xl leading-relaxed">
              Hedef ülke ve programınızı paylaşın; 24 saat içinde profilinize uygun
              net bir yol haritası ile size dönüş yapalım.
            </p>
          </div>
        </section>

        <section className="bg-background-light dark:bg-background-dark">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
              <div className="rounded-[2rem] bg-white/80 dark:bg-white/5 shadow-[0_25px_60px_rgba(0,0,0,0.08)] ring-1 ring-black/5 dark:ring-white/10 backdrop-blur-sm p-8 md:p-10 h-full flex flex-col">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full bg-[#e9e8df] dark:bg-white/10 px-4 py-2 text-xs font-black text-text-main dark:text-white">
                      <span className="material-symbols-outlined text-[16px]">
                        support_agent
                      </span>
                      Ücretsiz Değerlendirme
                    </div>
                    <h2 className="mt-4 text-3xl font-black text-text-main dark:text-white">
                      Bize Ulaşın
                    </h2>
                    <p className="mt-2 text-sm text-text-muted dark:text-gray-400 max-w-lg leading-relaxed">
                      Hedefinizi ve zaman planınızı paylaşın. Ekibimiz, sizin için en uygun
                      rotayı netleştirip gerekli evrak ve adımları iletir.
                    </p>
                  </div>
                  <div className="hidden md:flex size-12 rounded-2xl bg-black text-white items-center justify-center shadow-[0_18px_40px_rgba(0,0,0,0.18)]">
                    <span className="material-symbols-outlined">chat</span>
                  </div>
                </div>

                <form className="mt-8 flex flex-col flex-1 gap-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-black text-text-main dark:text-white">
                        Ad Soyad
                      </label>
                      <input
                        className="w-full h-11 px-4 rounded-full bg-white/70 dark:bg-white/5 border border-gray-200/80 dark:border-white/10 outline-none transition-all focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background-light dark:focus-visible:ring-offset-background-dark"
                        placeholder="Adınız Soyadınız"
                        type="text"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-black text-text-main dark:text-white">
                        E-posta
                      </label>
                      <input
                        className="w-full h-11 px-4 rounded-full bg-white/70 dark:bg-white/5 border border-gray-200/80 dark:border-white/10 outline-none transition-all focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background-light dark:focus-visible:ring-offset-background-dark"
                        placeholder="ornek@eposta.com"
                        type="email"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-black text-text-main dark:text-white">
                      Telefon
                    </label>
                    <input
                      className="w-full h-11 px-4 rounded-full bg-white/70 dark:bg-white/5 border border-gray-200/80 dark:border-white/10 outline-none transition-all focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background-light dark:focus-visible:ring-offset-background-dark"
                      placeholder="+90 5xx xxx xx xx"
                      type="tel"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-black text-text-main dark:text-white">
                        İlgilendiğiniz Ülke
                      </label>
                      <div className="relative">
                        <select className="w-full h-11 pl-4 pr-11 rounded-full bg-white/70 dark:bg-white/5 bg-none border border-gray-200/80 dark:border-white/10 outline-none transition-all focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background-light dark:focus-visible:ring-offset-background-dark appearance-none cursor-pointer">
                          <option>Birleşik Krallık</option>
                          <option>Almanya</option>
                          <option>ABD</option>
                          <option>Malta</option>
                          <option>Hollanda</option>
                          <option>İrlanda</option>
                          <option>Kanada</option>
                          <option>Diğer</option>
                        </select>
                        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400">
                          <span className="material-symbols-outlined">expand_more</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-black text-text-main dark:text-white">
                        İlgilendiğiniz Program
                      </label>
                      <div className="relative">
                        <select className="w-full h-11 pl-4 pr-11 rounded-full bg-white/70 dark:bg-white/5 bg-none border border-gray-200/80 dark:border-white/10 outline-none transition-all focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background-light dark:focus-visible:ring-offset-background-dark appearance-none cursor-pointer">
                          <option>Program Seçin</option>
                          <option>Ausbildung</option>
                          <option>Lisans</option>
                          <option>Yüksek Lisans</option>
                          <option>Doktora</option>
                          <option>Dil Okulu</option>
                          <option>Work and Travel</option>
                          <option>Denklik</option>
                          <option>Vize Danışmanlığı</option>
                        </select>
                        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400">
                          <span className="material-symbols-outlined">expand_more</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 flex flex-col flex-1">
                    <label className="text-sm font-black text-text-main dark:text-white">
                      Mesajınız
                    </label>
                    <textarea
                      className="w-full flex-1 min-h-[140px] px-4 py-3 rounded-2xl bg-white/70 dark:bg-white/5 border border-gray-200/80 dark:border-white/10 outline-none transition-all focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background-light dark:focus-visible:ring-offset-background-dark resize-none"
                      placeholder="Hedefiniz, bütçeniz ve zaman planınız gibi detayları yazabilirsiniz."
                    />
                  </div>

                  <button
                    className="w-full h-14 rounded-full bg-primary text-black font-black text-base hover:brightness-105 transition-all shadow-[0_18px_40px_rgba(249,245,6,0.28)] mt-2"
                    type="button"
                  >
                    Mesaj Gönder
                  </button>

                  <div className="text-xs text-text-muted dark:text-gray-400">
                    Ortalama dönüş süresi: 24 saat (yoğun dönemlerde değişebilir).
                  </div>
                </form>
              </div>

              <div className="h-full flex flex-col gap-6">
                <div className="rounded-[2rem] bg-white/80 dark:bg-white/5 border border-gray-100 dark:border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.08)] backdrop-blur-sm p-7 md:p-8">
                  <div className="space-y-5">
                    <InfoRow
                      icon="location_on"
                      title="Adres"
                      value={<span className="whitespace-pre-line">{OFFICE_ADDRESS}</span>}
                    />
                    <InfoRow
                      icon="chat"
                      title="WhatsApp"
                      value={
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                          <span className="font-medium text-text-main dark:text-white">
                            {WHATSAPP_NUMBER_DISPLAY}
                          </span>
                          <a
                            className="inline-flex items-center justify-center gap-2 h-9 px-4 rounded-full bg-primary text-black text-xs font-black tracking-wide hover:brightness-105 transition-all shadow-[0_10px_30px_rgba(249,245,6,0.22)]"
                            href={WHATSAPP_LINK_URL}
                            rel="noreferrer"
                            target="_blank"
                          >
                            <span className="material-symbols-outlined text-[16px]">
                              chat
                            </span>
                            WhatsApp ile hemen ulaş
                          </a>
                        </div>
                      }
                    />
                    <InfoRow icon="call" title="Telefon" value={WHATSAPP_NUMBER_DISPLAY} />
                    <InfoRow
                      icon="mail"
                      title="E-posta"
                      value={
                        <a
                          className="font-medium text-text-main dark:text-white hover:text-primary transition-colors"
                          href={`mailto:${EMAIL_ADDRESS}`}
                        >
                          {EMAIL_ADDRESS}
                        </a>
                      }
                    />
                    <InfoRow icon="schedule" title="Çalışma Saatleri" value="Pzt-Cum: 09:00-18:00" />
                  </div>
                </div>

                <div className="rounded-[2rem] overflow-hidden bg-white/80 dark:bg-white/5 border border-gray-100 dark:border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.08)] flex flex-col flex-1 min-h-[360px]">
                  <div className="w-full flex-1 bg-gray-100 dark:bg-white/10">
                    <iframe
                      aria-label="Google Maps"
                      className="w-full h-full"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      src={MAPS_EMBED_URL}
                      title="Google Maps"
                    />
                  </div>
                  <a
                    className="flex items-center justify-center gap-2 px-6 py-4 text-sm font-bold text-text-main dark:text-white border-t border-gray-100 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/10 transition-colors"
                    href={MAPS_LINK_URL}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      open_in_new
                    </span>
                    Google Maps'te Aç
                  </a>
                </div>

                <button
                  className="w-full h-16 rounded-full bg-primary text-black font-black text-lg hover:brightness-105 transition-all shadow-[0_18px_40px_rgba(249,245,6,0.28)] mt-auto"
                  aria-haspopup="dialog"
                  data-calendly-open="true"
                  type="button"
                >
                  Ücretsiz Değerlendirme Al
                </button>
              </div>
            </div>
          </div>
        </section>

        <div className="h-10" />
      </main>

      <SiteFooter />
    </>
  );
}
