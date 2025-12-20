import Head from "next/head";
import SiteHeader from "../components/SiteHeader";

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>Biz Kimiz? - Lotus Abroad</title>
      </Head>

      <SiteHeader />

      <main className="pt-24">
        <section className="bg-gradient-to-b from-white via-background-light to-background-light dark:from-background-dark dark:via-background-dark dark:to-background-dark border-b border-gray-200/70 dark:border-white/10">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-18">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/15 text-text-main dark:text-white text-xs font-bold uppercase tracking-widest">
                <span className="material-symbols-outlined text-[18px]">
                  groups
                </span>
                Biz Kimiz?
              </div>
              <h1 className="mt-6 text-4xl md:text-6xl font-black tracking-tight text-text-main dark:text-white">
                Lotus Abroad ile süreci netleştir, hedefini hızlandır.
              </h1>
              <p className="mt-6 text-sm md:text-base text-text-muted dark:text-gray-400 leading-relaxed">
                Lotus Abroad; yurtdışı eğitim yolculuğunda program seçimi,
                başvuru dosyası, vize süreci ve yerleşim adımlarını planlı ve
                şeffaf bir şekilde yönetmen için danışmanlık sağlar.
              </p>

              <div className="mt-10 flex flex-wrap gap-3">
                <a
                  className="h-11 px-7 rounded-full bg-primary text-black text-sm font-black flex items-center justify-center hover:brightness-105 transition-all shadow-[0_18px_40px_rgba(249,245,6,0.22)]"
                  aria-haspopup="dialog"
                  data-calendly-open="true"
                  href="/contact"
                >
                  Ücretsiz Görüşme Al
                </a>
                <a
                  className="h-11 px-7 rounded-full bg-white/70 dark:bg-white/5 border border-gray-200/70 dark:border-white/10 text-text-main dark:text-white text-sm font-black flex items-center justify-center hover:bg-white dark:hover:bg-white/10 transition-colors"
                  href="/programs"
                >
                  Programları İncele
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="py-14 md:py-18">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: "checklist",
                  title: "Net yol haritası",
                  body: "Hedef ülke + program + zaman çizelgesi + evrak listesi: adım adım plan.",
                },
                {
                  icon: "verified",
                  title: "Dosya & başvuru desteği",
                  body: "Başvuru paketini düzenleme, kontrol ve eksik/risk noktalarını kapatma.",
                },
                {
                  icon: "public",
                  title: "Vize & yerleşim",
                  body: "Randevu hazırlığı, finans planı ve varış sonrası ilk adımlar için destek.",
                },
              ].map((item) => (
                <div
                  className="rounded-[2rem] bg-white/80 dark:bg-white/5 border border-gray-100 dark:border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.08)] p-7 md:p-8"
                  key={item.title}
                >
                  <div className="size-12 rounded-2xl bg-primary text-black flex items-center justify-center shadow-[0_14px_40px_rgba(249,245,6,0.22)]">
                    <span className="material-symbols-outlined text-[22px]">
                      {item.icon}
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
      </main>
    </>
  );
}
