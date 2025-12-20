import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";

type LegalPageLayoutProps = {
  title: string;
  subtitle: string;
  lastUpdated: string;
  children: React.ReactNode;
};

export default function LegalPageLayout({
  title,
  subtitle,
  lastUpdated,
  children,
}: LegalPageLayoutProps) {
  const router = useRouter();
  const locale = router.locale ?? "tr";
  const ui =
    locale === "en"
      ? {
          badge: "Legal",
          lastUpdated: "Last updated",
          questions: "Questions?",
          questionsBodyPrefix: "If you have questions about these policies, contact us via",
          contactLink: "the Contact page",
        }
      : locale === "de"
        ? {
            badge: "Rechtliches",
            lastUpdated: "Zuletzt aktualisiert",
            questions: "Fragen?",
            questionsBodyPrefix:
              "Wenn Sie Fragen zu diesen Richtlinien haben, kontaktieren Sie uns über",
            contactLink: "die Kontaktseite",
          }
        : {
            badge: "Yasal",
            lastUpdated: "Son güncelleme",
            questions: "Sorularınız mı var?",
            questionsBodyPrefix:
              "Bu politikalarla ilgili sorularınız varsa bizimle şu sayfadan iletişime geçin:",
            contactLink: "İletişim sayfası",
          };

  return (
    <>
      <Head>
        <title>{title} - Lotus Abroad</title>
      </Head>
      <SiteHeader />

      <main className="pt-24">
        <section className="bg-gradient-to-b from-white via-background-light to-background-light dark:from-background-dark dark:via-background-dark dark:to-background-dark border-b border-gray-200/70 dark:border-white/10">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/15 text-text-main dark:text-white text-xs font-bold uppercase tracking-widest">
              {ui.badge}
            </div>
            <h1 className="mt-4 text-4xl md:text-5xl font-black tracking-tight text-text-main dark:text-white">
              {title}
            </h1>
            <p className="mt-4 text-sm md:text-base text-text-muted dark:text-gray-400 max-w-3xl leading-relaxed">
              {subtitle}
            </p>
            <div className="mt-6 text-xs text-text-muted dark:text-gray-500">
              {ui.lastUpdated}: {lastUpdated}
            </div>
          </div>
        </section>

        <section className="bg-background-light dark:bg-background-dark">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12">
            <div className="rounded-[2rem] border border-gray-100 dark:border-white/10 bg-white/70 dark:bg-white/5 shadow-[0_25px_60px_rgba(0,0,0,0.08)] p-6 md:p-10">
              {children}
              <div className="mt-10 rounded-3xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 p-5">
                <div className="flex items-start gap-3">
                  <div className="size-11 rounded-2xl bg-primary text-black flex items-center justify-center shadow-[0_14px_40px_rgba(249,245,6,0.22)] shrink-0">
                    <span className="material-symbols-outlined text-[20px]">help</span>
                  </div>
                  <div>
                    <div className="text-sm font-black text-text-main dark:text-white">
                      {ui.questions}
                    </div>
                    <div className="mt-1 text-sm text-text-muted dark:text-gray-400 leading-relaxed">
                      {ui.questionsBodyPrefix}{" "}
                      <a className="text-text-main dark:text-white underline decoration-primary/70 hover:decoration-primary" href="/contact">
                        {ui.contactLink}
                      </a>
                      .
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
