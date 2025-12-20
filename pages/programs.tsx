import Head from "next/head";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import ProgramDetails from "../components/programs/ProgramDetails";
import ProgramList from "../components/programs/ProgramList";
import CitySchoolRecommendations from "../components/programs/CitySchoolRecommendations";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import {
  COUNTRY_ORDER,
  PROGRAM_CATALOG,
  type CountryId,
} from "../lib/programCatalog";

const COUNTRY_LABELS_TR: Record<CountryId, string> = {
  Germany: "Almanya",
  USA: "ABD",
  Netherlands: "Hollanda",
  "United Kingdom": "Birleşik Krallık",
  Canada: "Kanada",
  Ireland: "İrlanda",
  Malta: "Malta",
};

const PROGRAMS_SEO_KEYWORDS_TR = [
  "yurtdışı eğitim danışmanlığı",
  "yurtdışı çalışma vizesi",
  "öğrenci vizesi",
  "vize danışmanlığı",
  "Almanya Ausbildung",
  "Almanya üniversite başvurusu",
  "Almanya yüksek lisans",
  "Denklik (diploma tanıma)",
  "Work and Travel",
  "Camp USA",
  "H-2B çalışma vizesi",
  "ABD dil okulu",
  "Kanada dil okulu",
  "İrlanda Work and Study",
  "Malta dil okulu",
  "Au Pair Almanya",
  "Au Pair Amerika",
] as const;

const PROGRAMS_SEO_ITEMLIST = {
  "@type": "ItemList",
  name: "Lotus Abroad Programları",
  itemListElement: COUNTRY_ORDER.flatMap((countryId, countryIndex) => {
    const countryLabel = COUNTRY_LABELS_TR[countryId] ?? countryId;
    const programs = PROGRAM_CATALOG[countryId]?.programs ?? [];
    return programs.map((program, programIndex) => ({
      "@type": "ListItem",
      position: countryIndex * 100 + programIndex + 1,
      name: `${countryLabel} - ${program.title}`,
      description: program.tagline,
    }));
  }),
} as const;

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setPrefersReducedMotion(media.matches);
    onChange();

    if (typeof media.addEventListener === "function") {
      media.addEventListener("change", onChange);
      return () => media.removeEventListener("change", onChange);
    }

    media.addListener(onChange);
    return () => media.removeListener(onChange);
  }, []);

  return prefersReducedMotion;
}

export default function ProgramsPage() {
  const prefersReducedMotion = usePrefersReducedMotion();

  const [selectedCountry, setSelectedCountry] = useState<CountryId>(COUNTRY_ORDER[0]);
  const selectedCountryLabel = COUNTRY_LABELS_TR[selectedCountry] ?? selectedCountry;
  const [pendingCountry, setPendingCountry] = useState<CountryId | null>(null);
  const activeCountry = pendingCountry ?? selectedCountry;
  const [countryTransitionState, setCountryTransitionState] = useState<
    "idle" | "out" | "in"
  >("idle");
  const countryTimeoutRef = useRef<number | null>(null);
  const countryIdleTimeoutRef = useRef<number | null>(null);

  const programs = useMemo(
    () => PROGRAM_CATALOG[selectedCountry]?.programs ?? [],
    [selectedCountry],
  );
  const firstProgramId = programs[0]?.id ?? null;

  const [selectedProgramId, setSelectedProgramId] = useState<string | null>(
    firstProgramId,
  );
  const [displayProgramId, setDisplayProgramId] = useState<string | null>(firstProgramId);
  const [programTransitionState, setProgramTransitionState] = useState<
    "idle" | "out" | "in"
  >("idle");
  const programTimeoutRef = useRef<number | null>(null);
  const programIdleTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    setSelectedProgramId(firstProgramId);
    setDisplayProgramId(firstProgramId);
    setProgramTransitionState("idle");
  }, [firstProgramId, selectedCountry]);

  const selectedProgram = useMemo(() => {
    if (!programs.length) return null;
    return programs.find((program) => program.id === selectedProgramId) ?? programs[0];
  }, [programs, selectedProgramId]);

  const displayProgram = useMemo(() => {
    if (!programs.length) return null;
    if (!displayProgramId) return programs[0];
    return programs.find((program) => program.id === displayProgramId) ?? programs[0];
  }, [displayProgramId, programs]);

  const heroImageUrl = PROGRAM_CATALOG[selectedCountry]?.heroImageUrl;

  const requestCountryChange = useCallback(
    (nextCountry: CountryId) => {
      if (nextCountry === selectedCountry) return;
      if (typeof window === "undefined") return;

      if (countryTimeoutRef.current) window.clearTimeout(countryTimeoutRef.current);
      if (countryIdleTimeoutRef.current) window.clearTimeout(countryIdleTimeoutRef.current);

      if (prefersReducedMotion) {
        setSelectedCountry(nextCountry);
        setPendingCountry(null);
        setCountryTransitionState("idle");
        return;
      }

      setPendingCountry(nextCountry);
      setCountryTransitionState("out");
      countryTimeoutRef.current = window.setTimeout(() => {
        setSelectedCountry(nextCountry);
        setPendingCountry(null);
        setCountryTransitionState("in");
        countryIdleTimeoutRef.current = window.setTimeout(() => {
          setCountryTransitionState("idle");
        }, 240);
      }, 180);
    },
    [prefersReducedMotion, selectedCountry],
  );

  const requestProgramChange = useCallback(
    (nextProgramId: string) => {
      setSelectedProgramId(nextProgramId);
      if (typeof window === "undefined") return;

      if (programTimeoutRef.current) window.clearTimeout(programTimeoutRef.current);
      if (programIdleTimeoutRef.current) window.clearTimeout(programIdleTimeoutRef.current);

      if (prefersReducedMotion) {
        setDisplayProgramId(nextProgramId);
        setProgramTransitionState("idle");
        return;
      }

      setProgramTransitionState("out");
      programTimeoutRef.current = window.setTimeout(() => {
        setDisplayProgramId(nextProgramId);
        setProgramTransitionState("in");
        programIdleTimeoutRef.current = window.setTimeout(() => {
          setProgramTransitionState("idle");
        }, 220);
      }, 160);
    },
    [prefersReducedMotion],
  );

  useEffect(() => {
    return () => {
      if (typeof window === "undefined") return;
      if (countryTimeoutRef.current) window.clearTimeout(countryTimeoutRef.current);
      if (countryIdleTimeoutRef.current) window.clearTimeout(countryIdleTimeoutRef.current);
      if (programTimeoutRef.current) window.clearTimeout(programTimeoutRef.current);
      if (programIdleTimeoutRef.current) window.clearTimeout(programIdleTimeoutRef.current);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Programlar | Lotus Abroad</title>
        <meta
          name="description"
          content="Lotus Abroad programları: Ülke seçin, programları keşfedin ve başvuru adımları, belgeler, süre ve vize notlarını aynı ekranda görüntüleyin."
        />
        <meta name="keywords" content={PROGRAMS_SEO_KEYWORDS_TR.join(", ")} />
        <meta property="og:title" content="Programlar | Lotus Abroad" />
        <meta
          property="og:description"
          content="Almanya, ABD, Hollanda, Birleşik Krallık, Kanada, İrlanda ve Malta için eğitim & kariyer programlarını ülkeye göre keşfedin."
        />
        <meta property="og:type" content="website" />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebPage",
                  name: "Programlar",
                  inLanguage: "tr-TR",
                  about: PROGRAMS_SEO_KEYWORDS_TR,
                  mainEntity: {
                    "@type": "ItemList",
                    name: PROGRAMS_SEO_ITEMLIST.name,
                  },
                },
                PROGRAMS_SEO_ITEMLIST,
              ],
            }),
          }}
        />
      </Head>

      <SiteHeader />

      <main className="pt-24">
        <section className="bg-gradient-to-b from-white via-background-light to-background-light dark:from-background-dark dark:via-background-dark dark:to-background-dark border-b border-gray-200/70 dark:border-white/10">
          <div className="max-w-[1680px] 2xl:max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-10 py-12 md:py-16">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-text-main dark:text-white">
              Programlar
            </h1>
            <p className="mt-4 text-base md:text-lg text-text-muted dark:text-gray-400 max-w-3xl leading-relaxed">
              Ülke seçin, program rotalarını keşfedin ve detayları anında aynı ekranda görüntüleyin.
            </p>

            <div className="mt-10 inline-flex items-center gap-2 rounded-full bg-[#e9e8df] dark:bg-white/5 border border-gray-200/70 dark:border-white/10 px-6 py-3 shadow-[0_18px_45px_rgba(0,0,0,0.06)]">
              <span className="material-symbols-outlined text-[18px] text-text-main dark:text-white">
                public
              </span>
              <span className="text-base font-black text-text-main dark:text-white">
                Ülkeye Göre Programlar
              </span>
            </div>
          </div>
        </section>

        <section className="bg-background-light dark:bg-background-dark">
          <div className="max-w-[1680px] 2xl:max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-10 py-10 md:py-12">
            <div className="grid lg:grid-cols-[420px,1fr] gap-8 items-start">
              <aside className="lg:sticky lg:top-28">
                <div className="rounded-[2rem] bg-white/80 dark:bg-white/5 border border-gray-100 dark:border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.08)] p-4">
                  <div className="flex items-center justify-between px-2 pb-3">
                    <div className="text-base font-black text-text-main dark:text-white">
                      Ülkeler
                    </div>
                    <div className="text-xs font-bold text-text-muted dark:text-gray-400">
                      Seçmek için tıkla
                    </div>
                  </div>

                  <div className="flex lg:flex-col gap-2 overflow-x-auto no-scrollbar px-1 pb-1">
                    {COUNTRY_ORDER.map((name) => {
                      const isActive = name === activeCountry;
                      return (
                        <button
                          className={[
                            "shrink-0 lg:w-full text-left px-5 py-4 rounded-2xl text-base font-bold transition-all border",
                            isActive
                              ? "bg-[#e9e8df] dark:bg-white/10 text-text-main dark:text-white border-black/10 dark:border-white/10 shadow-[0_18px_40px_rgba(0,0,0,0.06)]"
                              : "bg-white/60 dark:bg-white/0 hover:bg-gray-50 dark:hover:bg-white/10 text-text-main dark:text-white/90 border-transparent",
                          ].join(" ")}
                          key={name}
                          onClick={() => requestCountryChange(name)}
                          type="button"
                        >
                          <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-2">
                              <span className="material-symbols-outlined text-[18px]">
                                location_on
                              </span>
                              <span>{COUNTRY_LABELS_TR[name] ?? name}</span>
                            </div>
                            <span
                              className={[
                                "inline-flex items-center gap-1 rounded-full text-[11px] px-2.5 py-1",
                                "bg-primary/90 text-black font-black",
                              ].join(" ")}
                            >
                              Aktif
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-5 rounded-[2rem] bg-black text-white p-6 shadow-[0_25px_60px_rgba(0,0,0,0.18)]">
                  <div className="flex items-center gap-3">
                    <div className="size-11 rounded-2xl bg-white/10 flex items-center justify-center">
                      <span className="material-symbols-outlined">support_agent</span>
                    </div>
                    <div>
                      <div className="text-base font-black">Ücretsiz Değerlendirme</div>
                      <div className="text-sm text-white/70">
                        24 saat içinde kişisel yol haritası
                      </div>
                    </div>
                  </div>
                  <a
                    className="mt-5 h-11 rounded-full bg-primary text-black text-sm font-black flex items-center justify-center hover:brightness-105 transition-all"
                    aria-haspopup="dialog"
                    data-calendly-open="true"
                    href="/contact"
                  >
                    Hemen Randevu Al
                  </a>
                </div>
              </aside>

              <div className="space-y-6">
                <div
                  className="rounded-[2rem] overflow-hidden border border-gray-100 dark:border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.08)] bg-white/70 dark:bg-white/5 programs-swap"
                  data-state={countryTransitionState}
                >
                  <div className="relative h-[240px] md:h-[300px]">
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url('${heroImageUrl ?? ""}')` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/35 to-black/85" />
                    <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-end">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center gap-1 rounded-full bg-white/15 text-white text-[12px] font-black px-3 py-1.5 backdrop-blur">
                          <span className="material-symbols-outlined text-[16px]">explore</span>
                          Ülkeye Göre Programlar
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-full bg-primary text-black text-[12px] font-black px-3 py-1.5">
                          {selectedCountryLabel}
                        </span>
                      </div>
                      <h2 className="mt-3 text-3xl md:text-4xl font-black text-white tracking-tight">
                        {selectedCountryLabel}: Programlar &amp; Fırsatlar
                      </h2>
                      <p className="mt-3 text-base md:text-lg text-white/80 max-w-4xl leading-relaxed">
                        {selectedProgram
                          ? "Bir program seçerek uygunluk, süre, gerekli belgeler ve vize notlarını düzenli bir formatta görüntüleyin."
                          : "Mevcut program rotalarını ve detayları görmek için bir ülke seçin."}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 md:p-8">
                    <div
                      className="programs-swap"
                      data-state={countryTransitionState}
                    >
                      <CitySchoolRecommendations
                        countryId={selectedCountry}
                        countryLabel={selectedCountryLabel}
                      />
                    </div>

                    <div className="mt-6" />

                    <div className="grid lg:grid-cols-[520px,1fr] gap-6 items-start">
                      <div
                        className="programs-swap"
                        data-state={countryTransitionState}
                      >
                        <ProgramList
                          programs={programs}
                          selectedProgramId={selectedProgram?.id ?? null}
                          onSelectProgram={requestProgramChange}
                          isLoading={false}
                        />
                      </div>

                      <div
                        className="programs-swap"
                        data-state={programTransitionState === "idle" ? "in" : programTransitionState}
                      >
                        <ProgramDetails
                          countryLabel={selectedCountryLabel}
                          program={displayProgram}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* SEO: UI'da görünmez anahtar kelimeler */}
            <section aria-hidden="true" className="sr-only">
              <h2>Yurtdışı Eğitim ve Vize Danışmanlığı</h2>
              <p>{PROGRAMS_SEO_KEYWORDS_TR.join(" • ")}</p>
            </section>
          </div>
        </section>
      </main>

      <SiteFooter />

      <style jsx global>{`
        .programs-swap {
          transition: opacity 260ms cubic-bezier(0.2, 0.9, 0.2, 1),
            transform 260ms cubic-bezier(0.2, 0.9, 0.2, 1);
          will-change: transform, opacity;
        }

        .programs-swap[data-state="out"] {
          opacity: 0;
          transform: translate3d(0, 10px, 0);
        }

        .programs-swap[data-state="in"],
        .programs-swap[data-state="idle"] {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }

        @media (prefers-reduced-motion: reduce) {
          .programs-swap {
            transition: none !important;
          }
        }
      `}</style>
    </>
  );
}
