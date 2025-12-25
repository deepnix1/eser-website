import Head from "next/head";
import Link from "next/link";
import type { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";

import SiteHeader from "../../../components/SiteHeader";
import SiteFooter from "../../../components/SiteFooter";
import ProgramDetails from "../../../components/programs/ProgramDetails";
import { PROGRAMS_UI } from "../../../components/programs/i18n";
import type { AppLocale } from "../../../lib/i18n";
import { normalizeLocale } from "../../../lib/i18n";
import {
  COUNTRY_ORDER,
  type CountryId,
  getProgramCatalog,
  type Program,
} from "../../../lib/programCatalog";
import { COUNTRY_SLUG, SLUG_TO_COUNTRY } from "../../../lib/programRoutes";

type ProgramDetailPageProps = {
  countryId: CountryId;
  programId: string;
  locale: AppLocale;
};

function getProgramOrNull(locale: AppLocale, countryId: CountryId, programId: string): Program | null {
  const catalog = getProgramCatalog(locale);
  const country = catalog[countryId];
  if (!country) return null;
  return country.programs.find((program) => program.id === programId) ?? null;
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const allLocales = (locales ?? ["tr", "en", "de"]) as AppLocale[];
  const paths = allLocales.flatMap((locale) => {
    const catalog = getProgramCatalog(locale);
    return COUNTRY_ORDER.flatMap((countryId) => {
      const countrySlug = COUNTRY_SLUG[countryId];
      const programs = catalog[countryId]?.programs ?? [];
      return programs.map((program) => ({
        params: { country: countrySlug, program: program.id },
        locale,
      }));
    });
  });

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<ProgramDetailPageProps> = async (context) => {
  const locale = normalizeLocale(context.locale) as AppLocale;
  const countrySlug = typeof context.params?.country === "string" ? context.params.country : "";
  const programId = typeof context.params?.program === "string" ? context.params.program : "";
  const countryId = SLUG_TO_COUNTRY[countrySlug];

  if (!countryId || !programId) {
    return { notFound: true };
  }

  const program = getProgramOrNull(locale, countryId, programId);
  if (!program) return { notFound: true };

  return {
    props: {
      countryId,
      programId,
      locale,
    },
  };
};

export default function ProgramDetailPage({ countryId, programId, locale: staticLocale }: ProgramDetailPageProps) {
  const router = useRouter();
  const locale = normalizeLocale(router.locale ?? staticLocale);
  const ui = PROGRAMS_UI[locale];

  const catalog = getProgramCatalog(locale);
  const country = catalog[countryId];
  const program = country.programs.find((p) => p.id === programId) ?? country.programs[0];

  const countryLabel =
    locale === "tr"
      ? {
          Germany: "Almanya",
          USA: "ABD",
          Netherlands: "Hollanda",
          "United Kingdom": "Birleşik Krallık",
          Canada: "Kanada",
          Ireland: "İrlanda",
          Malta: "Malta",
        }[countryId]
      : locale === "de"
        ? {
            Germany: "Deutschland",
            USA: "USA",
            Netherlands: "Niederlande",
            "United Kingdom": "Vereinigtes Königreich",
            Canada: "Kanada",
            Ireland: "Irland",
            Malta: "Malta",
          }[countryId]
        : {
            Germany: "Germany",
            USA: "USA",
            Netherlands: "Netherlands",
            "United Kingdom": "United Kingdom",
            Canada: "Canada",
            Ireland: "Ireland",
            Malta: "Malta",
          }[countryId];

  const backLabel =
    locale === "tr" ? "Programlara dön" : locale === "de" ? "Zurück zu Programmen" : "Back to Programs";
  const detailsTitlePrefix =
    locale === "tr" ? "Program Detayı" : locale === "de" ? "Programmdetails" : "Program Details";

  return (
    <>
      <Head>
        <title>
          {program.title} | Lotus Abroad
        </title>
        <meta name="description" content={program.tagline} />
      </Head>

      <div className="bg-background-light dark:bg-background-dark text-text-main-light dark:text-text-main-dark font-display antialiased flex flex-col min-h-screen transition-colors duration-300">
        <SiteHeader />

        <main className="flex-grow w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-14">
          <nav className="flex flex-wrap items-center gap-2 text-sm text-text-muted dark:text-gray-400">
            <Link className="hover:text-primary transition-colors" href="/">
              {locale === "tr" ? "Ana Sayfa" : locale === "de" ? "Start" : "Home"}
            </Link>
            <span className="opacity-60">/</span>
            <Link className="hover:text-primary transition-colors" href="/programs">
              {ui.pageTitle}
            </Link>
            <span className="opacity-60">/</span>
            <span className="font-bold text-text-main dark:text-white">{countryLabel}</span>
          </nav>

          <header className="mt-6 rounded-[2rem] border border-gray-100 dark:border-white/10 bg-white/70 dark:bg-white/5 shadow-[0_25px_60px_rgba(0,0,0,0.08)] overflow-hidden">
            <div className="relative px-6 sm:px-10 py-10">
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-[0.08] pointer-events-none"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 2px 2px, rgba(0,0,0,0.55) 1px, transparent 0)",
                  backgroundSize: "44px 44px",
                }}
              />
              <div className="relative">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-2 rounded-full bg-primary/90 text-black text-[12px] font-black px-3 py-1.5">
                    <span className="material-symbols-outlined text-[16px]">school</span>
                    {detailsTitlePrefix}
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-black/5 dark:bg-white/10 text-text-main dark:text-white text-[12px] font-black px-3 py-1.5">
                    <span className="material-symbols-outlined text-[16px]">public</span>
                    {countryLabel}
                  </span>
                </div>

                <h1 className="mt-4 text-3xl md:text-5xl font-black tracking-tight text-text-main dark:text-white">
                  {program.title}
                </h1>
                <p className="mt-3 text-base md:text-lg text-text-muted dark:text-gray-400 max-w-3xl leading-relaxed">
                  {program.tagline}
                </p>

                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <button
                    className="h-11 px-6 rounded-full bg-primary text-black text-sm font-black inline-flex items-center justify-center hover:brightness-105 transition-all"
                    aria-haspopup="dialog"
                    data-calendly-open="true"
                    type="button"
                  >
                    {ui.eligibilityCta}
                  </button>
                  <Link
                    className="h-11 px-6 rounded-full bg-white/80 dark:bg-white/5 border border-gray-100 dark:border-white/10 text-text-main dark:text-white text-sm font-black inline-flex items-center justify-center hover:bg-white dark:hover:bg-white/10 transition-all"
                    href="/programs"
                  >
                    {backLabel}
                  </Link>
                </div>
              </div>
            </div>
          </header>

          <section className="mt-8">
            <ProgramDetails countryLabel={countryLabel} program={program} ui={ui} />
          </section>
        </main>

        <SiteFooter />
      </div>
    </>
  );
}
