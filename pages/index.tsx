import Head from "next/head";
import { useEffect, useMemo, useState } from "react";
import PartnerLogo, { type PartnerLogoProps } from "../components/PartnerLogo";
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
  "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=2400&q=80";

const DEST_GERMANY_BG_URL =
  "https://images.unsplash.com/photo-1528728329032-2972f65dfb3f?auto=format&fit=crop&w=2400&q=80";

const DEST_USA_BG_URL =
  "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=2400&q=80";

const DEST_ENGLAND_BG_URL =
  "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=2400&q=80";

const DEST_MALTA_BG_URL =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/A_Glowing_Night_Over_the_Grand_Harbour.jpg/3200px-A_Glowing_Night_Over_the_Grand_Harbour.jpg";

const DEST_NETHERLANDS_BG_URL =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Amsterdam_Canal_Houses_at_Night_%2852555856777%29.jpg/3200px-Amsterdam_Canal_Houses_at_Night_%2852555856777%29.jpg";

const DEST_IRELAND_BG_URL =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/O%27Brien%27s_Tower_at_Cliffs_of_Moher.jpg/3200px-O%27Brien%27s_Tower_at_Cliffs_of_Moher.jpg";

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

export default function HomePage() {
  const SEO_KEYWORDS = useMemo(
    () => [
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
    [],
  );
  const seoKeywordsMeta = SEO_KEYWORDS.join(", ");
  const heroImages = useMemo(
    () => [
      HERO_BG_URL,
      DEST_GERMANY_BG_URL,
      DEST_USA_BG_URL,
      DEST_ENGLAND_BG_URL,
      DEST_MALTA_BG_URL,
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

    const revealElements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
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
      document.documentElement.classList.remove("reveal-enabled");
    };
  }, []);

  const heroCurrentUrl = heroImages[heroIndex] ?? HERO_BG_URL;
  const heroNextUrl =
    heroImages.length > 0 ? heroImages[(heroIndex + 1) % heroImages.length] : HERO_BG_URL;

  return (
    <>
      <Head>
        <title>Lotus Abroad | Yurtdışı Eğitim &amp; Vize Danışmanlığı</title>
        <meta
          content="Lotus Abroad ile yurtdışı eğitim danışmanlığı: Almanya, ABD, İngiltere, Hollanda, Kanada, İrlanda ve Malta için program seçimi, öğrenci vizesi ve yurtdışı çalışma vizesi süreçlerinde premium destek."
          name="description"
        />
        <meta
          content={seoKeywordsMeta}
          name="keywords"
        />
        <meta content="website" property="og:type" />
        <meta
          content="Lotus Abroad | Yurtdışı Eğitim & Vize Danışmanlığı"
          property="og:title"
        />
        <meta
          content="Program seçimi, başvuru, öğrenci vizesi ve yurtdışı çalışma vizesi süreçlerinde premium danışmanlık."
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
                "Yurtdışı eğitim danışmanlığı ve vize danışmanlığı: program seçimi, başvuru, öğrenci vizesi ve yurtdışı çalışma vizesi süreçlerinde premium destek.",
              inLanguage: "tr-TR",
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
            2026 Başvuruları Açık
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[1.1] tracking-tight max-w-4xl drop-shadow-xl">
            Geleceğinizin <br />
            <span className="text-primary relative inline-block">
              Sınırı Yok
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
            Almanya, ABD, İngiltere ve daha fazlası için yurtdışı eğitim danışmanlığı:
            program seçimi, başvuru, öğrenci vizesi ve yurtdışı çalışma vizesi
            süreçlerinde premium destek.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-4">
            <button
              className="h-14 px-8 rounded-full bg-primary text-black text-base font-bold tracking-wide hover:scale-105 transition-transform flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(249,245,6,0.4)]"
              type="button"
            >
              Hemen Başla
              <span className="material-symbols-outlined text-xl">
                arrow_forward
              </span>
            </button>
            <a
              className="h-14 px-8 rounded-full bg-white/10 backdrop-blur-md border border-white/30 text-white text-base font-bold tracking-wide hover:bg-white/20 transition-all flex items-center justify-center gap-2"
              href="/programs"
            >
              <span className="material-symbols-outlined filled">
                travel_explore
              </span>
              Programları Keşfet
            </a>
          </div>
        </div>
      </section>

      <section className="py-12 border-b border-gray-200 dark:border-white/10 overflow-hidden bg-white dark:bg-white/5">
        <div className="max-w-[1280px] mx-auto px-4 mb-8">
          <p className="text-center text-sm font-bold text-text-muted dark:text-gray-400 uppercase tracking-widest">
            İş Ortaklarımız
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
                Hikayen nerede başlıyor?
              </h2>
              <p className="text-text-muted dark:text-gray-400 text-lg max-w-xl">
                Dünyanın en güçlü eğitim destinasyonlarını keşfet. Kaliteli
                üniversiteler, güçlü kariyer ağları ve yepyeni fırsatlar seni
                bekliyor.
              </p>
            </div>
            <a
              className="flex items-center gap-2 text-sm font-bold border-b-2 border-primary pb-1 hover:text-primary transition-colors w-fit md:justify-self-end"
              href="/programs"
            >
              Tüm Ülkeleri Gör
              <span className="material-symbols-outlined text-lg">
                arrow_forward
              </span>
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="group relative rounded-2xl overflow-hidden cursor-pointer h-[350px]">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                data-alt="Brandenburg Gate in Berlin, Germany during sunset"
                data-location="Germany"
                style={{ backgroundImage: `url('${DEST_GERMANY_BG_URL}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute bottom-0 p-8 w-full">
                <h3 className="text-2xl font-bold text-white mb-1">Almanya</h3>
                <p className="text-white/80 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                  Uygun maliyetli üniversiteler &amp; mühendislikte güçlü ekosistem.
                </p>
              </div>
            </div>
            <div className="group relative rounded-2xl overflow-hidden cursor-pointer h-[350px]">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                data-alt="Statue of Liberty in New York City, USA"
                data-location="USA"
                style={{ backgroundImage: `url('${DEST_USA_BG_URL}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute bottom-0 p-8 w-full">
                <h3 className="text-2xl font-bold text-white mb-1">ABD</h3>
                <p className="text-white/80 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                  Güçlü üniversiteler &amp; geniş kampüs seçenekleri.
                </p>
              </div>
            </div>
            <div className="group relative rounded-2xl overflow-hidden cursor-pointer h-[350px]">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                data-alt="Big Ben and Westminster Bridge in London, England"
                data-location="England"
                style={{ backgroundImage: `url('${DEST_ENGLAND_BG_URL}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute bottom-0 p-8 w-full">
                <h3 className="text-2xl font-bold text-white mb-1">İngiltere</h3>
                <p className="text-white/80 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                  Prestijli okullar &amp; 1 yıllık yoğun yüksek lisans.
                </p>
              </div>
            </div>
            <div className="group relative rounded-2xl overflow-hidden cursor-pointer h-[350px]">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                data-alt="Beautiful architecture in Valletta Malta"
                data-location="Malta"
                style={{ backgroundImage: `url('${DEST_MALTA_BG_URL}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute bottom-0 p-8 w-full">
                <h3 className="text-2xl font-bold text-white mb-1">Malta</h3>
                <p className="text-white/80 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                  İngilizce eğitim &amp; Akdeniz yaşamı.
                </p>
              </div>
            </div>
            <div className="group relative rounded-2xl overflow-hidden cursor-pointer h-[350px]">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                data-alt="Traditional Dutch architecture and canal in Amsterdam"
                data-location="Netherlands"
                style={{ backgroundImage: `url('${DEST_NETHERLANDS_BG_URL}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute bottom-0 p-8 w-full">
                <h3 className="text-2xl font-bold text-white mb-1">
                  Hollanda
                </h3>
                <p className="text-white/80 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                  Yenilikçi eğitim &amp; uluslararası ortam.
                </p>
              </div>
            </div>
            <div className="group relative rounded-2xl overflow-hidden cursor-pointer h-[350px]">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                data-alt="Green landscape and cliffs in Ireland"
                data-location="Ireland"
                style={{ backgroundImage: `url('${DEST_IRELAND_BG_URL}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute bottom-0 p-8 w-full">
                <h3 className="text-2xl font-bold text-white mb-1">İrlanda</h3>
                <p className="text-white/80 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                  Avrupa&apos;nın teknoloji merkezi &amp; mezuniyet sonrası çalışma seçenekleri.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50 dark:bg-white/5">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-primary text-sm font-bold uppercase tracking-widest">
              Sürecimiz
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mt-3">
              3 Adımda Başvuru
            </h2>
          </div>
          <div className="process-flow relative grid gap-10 md:gap-8 md:grid-cols-[1fr_minmax(3rem,8rem)_1fr_minmax(3rem,8rem)_1fr]">
            <div className="process-step flex flex-col items-center text-center group" data-step="1">
              <div className="w-24 h-24 rounded-full bg-white dark:bg-[#323226] border-4 border-primary flex items-center justify-center shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="material-symbols-outlined text-4xl text-text-main dark:text-white">
                  chat_bubble
                </span>
              </div>
              <h3 className="text-xl font-bold mb-3">1. Ücretsiz Görüşme</h3>
              <p className="text-text-muted dark:text-gray-400">
                Akademik profilini ve hedeflerini analiz edip en doğru ülke ve
                program rotasını çıkarıyoruz.
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
              <h3 className="text-xl font-bold mb-3">2. Başvuru &amp; Vize</h3>
              <p className="text-text-muted dark:text-gray-400">
                Evrak düzeni, okul başvuruları ve vize sürecinde dosyanı premium
                şekilde hazırlayıp takip ediyoruz.
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
              <h3 className="text-xl font-bold mb-3">3. Yolculuk &amp; Yerleşim</h3>
              <p className="text-text-muted dark:text-gray-400">
                Uçuş, konaklama ve varış sonrası ilk adımlar için oryantasyon ve
                yerleşim desteği sağlıyoruz.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1280px] mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-center">
            Lotus Abroad Öğrenci Deneyimleri
          </h2>
          <p className="text-center text-text-muted dark:text-gray-400 mb-10 max-w-2xl mx-auto">
            Yakında öğrencilerimizin gerçek deneyimlerini burada paylaşacağız.
            Şimdilik programları keşfederek en uygun rotayı seçebilirsin.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            <button
              className="px-6 py-2 rounded-full bg-primary text-black font-bold text-sm hover:brightness-105 transition-all"
              type="button"
            >
              Tümü
            </button>
            <button
              className="px-6 py-2 rounded-full bg-gray-100 dark:bg-white/10 text-text-main dark:text-white font-medium text-sm hover:bg-gray-200 dark:hover:bg-white/20 transition-all"
              type="button"
            >
              Almanya
            </button>
            <button
              className="px-6 py-2 rounded-full bg-gray-100 dark:bg-white/10 text-text-main dark:text-white font-medium text-sm hover:bg-gray-200 dark:hover:bg-white/20 transition-all"
              type="button"
            >
              ABD
            </button>
            <button
              className="px-6 py-2 rounded-full bg-gray-100 dark:bg-white/10 text-text-main dark:text-white font-medium text-sm hover:bg-gray-200 dark:hover:bg-white/20 transition-all"
              type="button"
            >
              İngiltere
            </button>
            <button
              className="px-6 py-2 rounded-full bg-gray-100 dark:bg-white/10 text-text-main dark:text-white font-medium text-sm hover:bg-gray-200 dark:hover:bg-white/20 transition-all"
              type="button"
            >
              Hollanda
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            <div className="relative aspect-[9/16] rounded-2xl overflow-hidden group cursor-pointer shadow-lg">
              <img
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                data-alt="Student smiling in library"
                src={STORY_SARAH_IMG_URL}
              />
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
                    ABD
                  </span>
                </div>
                <p className="font-bold text-lg leading-tight">
                  Sarah&apos;ın Yolculuğu
                </p>
                <p className="text-xs text-white/80">
                  NYU&apos;da Bilgisayar Bilimleri (Yüksek Lisans)
                </p>
              </div>
            </div>
            <div className="relative aspect-[9/16] rounded-2xl overflow-hidden group cursor-pointer shadow-lg md:mt-8">
              <img
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                data-alt="Student group laughing on campus steps"
                src={STORY_AHMET_IMG_URL}
              />
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
                    Almanya
                  </span>
                </div>
                <p className="font-bold text-lg leading-tight">
                  Ahmet&apos;in Hikayesi
                </p>
                <p className="text-xs text-white/80">Mühendislik @ Münih</p>
              </div>
            </div>
            <div className="relative aspect-[9/16] rounded-2xl overflow-hidden group cursor-pointer shadow-lg">
              <img
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                data-alt="Female student looking at tablet in cafe"
                src={STORY_ELENA_IMG_URL}
              />
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
                    İngiltere
                  </span>
                </div>
                <p className="font-bold text-lg leading-tight">
                  Elena&apos;nın Başarısı
                </p>
                <p className="text-xs text-white/80">Oxford&apos;da MBA</p>
              </div>
            </div>
            <div className="relative aspect-[9/16] rounded-2xl overflow-hidden group cursor-pointer shadow-lg md:mt-8">
              <img
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                data-alt="Male student working on laptop in modern office"
                src={STORY_JOHN_IMG_URL}
              />
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
                    Hollanda
                  </span>
                </div>
                <p className="font-bold text-lg leading-tight">
                  John&apos;un Deneyimi
                </p>
                <p className="text-xs text-white/80">Amsterdam&apos;da Tasarım</p>
              </div>
            </div>
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
              <p className="text-lg italic mb-6">
                &quot;Lotus Abroad imkânsızı mümkün kıldı. Berlin&apos;de hayalimdeki
                üniversiteye tam bursla kabul aldım!&quot;
              </p>
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full bg-gray-200 bg-cover bg-center"
                  data-alt="Öğrenci fotoğrafı"
                  style={{ backgroundImage: `url('${REVIEW_AVATAR_MERVE_URL}')` }}
                />
                <div>
                  <p className="font-bold text-sm">Merve S.</p>
                  <p className="text-xs text-text-muted">Almanya&apos;da okuyor</p>
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
              <p className="text-lg italic mb-6">
                &quot;Vize süreci çok göz korkutucuydu ama ekip her şeyi yönetti. Ben
                sadece randevuya gittim.&quot;
              </p>
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full bg-gray-200 bg-cover bg-center"
                  data-alt="Öğrenci fotoğrafı"
                  style={{ backgroundImage: `url('${REVIEW_AVATAR_EMRE_URL}')` }}
                />
                <div>
                  <p className="font-bold text-sm">Emre T.</p>
                  <p className="text-xs text-text-muted">İngiltere&apos;de okuyor</p>
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
              <p className="text-lg italic mb-6">
                &quot;Şimdiye kadarki en iyi danışmanlık. Sizi herhangi bir yere
                yerleştirmekten çok geleceğinizi önemsiyorlar.&quot;
              </p>
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full bg-gray-200 bg-cover bg-center"
                  data-alt="Öğrenci fotoğrafı"
                  style={{ backgroundImage: `url('${REVIEW_AVATAR_AYSE_URL}')` }}
                />
                <div>
                  <p className="font-bold text-sm">Ayşe K.</p>
                  <p className="text-xs text-text-muted">ABD&apos;de okuyor</p>
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
                Neden Lotus Abroad?
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black mt-3 tracking-tight text-text-main dark:text-white">
              Premium bir süreç deneyimi.
            </h2>
            <p className="mt-4 text-sm md:text-base text-text-muted dark:text-gray-400 leading-relaxed">
              Karmaşık başvuru adımlarını sadeleştiriyoruz: doğru program,
              düzenli dosya, net zaman planı ve güven veren iletişim.
            </p>
          </div>

          <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: "verified",
                title: "Şeffaf yol haritası",
                body: "Başvurudan vizeye; adımlar, evrak listesi ve net bir timeline.",
              },
              {
                icon: "shield_lock",
                title: "Risk odaklı kontrol",
                body: "Eksik/uyumsuz belge, deadline ve vize risklerini önceden kapatırız.",
              },
              {
                icon: "support_agent",
                title: "7/24 İletişim",
                body: "Süreç boyunca düzenli bilgilendirme ve hızlı geri dönüş.",
              },
              {
                icon: "travel_explore",
                title: "Hedefe uygun seçim",
                body: "Profiline uygun ülke/program seçimiyle doğru rota oluştururuz.",
              },
            ].map((item) => (
              <div
                className="premium-card group rounded-[2rem] bg-white/80 dark:bg-white/5 border border-gray-100 dark:border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.08)] p-7 md:p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_35px_90px_rgba(0,0,0,0.14)]"
                data-reveal
                key={item.title}
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
              Ücretsiz Değerlendirme
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-black mt-6 mb-6 tracking-tight">
              Profilini analiz edelim, sana rota çıkaralım.
            </h2>
            <p className="text-xl font-medium text-black/80 mb-8 max-w-md">
              Kısa formu doldur. Ekibimiz 24 saat içinde seninle iletişime geçsin.
            </p>
            <div className="flex flex-col gap-4 text-black/70">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined">check_circle</span>
                <span>Kişiselleştirilmiş program önerisi</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined">check_circle</span>
                <span>Vize uygunluğu &amp; evrak kontrolü</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined">check_circle</span>
                <span>Bütçe &amp; zaman planı</span>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-2xl premium-card" data-reveal>
            <form className="flex flex-col gap-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-text-main">Ad</label>
                  <input
                    className="h-12 px-4 rounded-xl border border-gray-200 bg-gray-50 focus:border-black focus:ring-0"
                    placeholder="Ad"
                    type="text"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-text-main">
                    Soyad
                  </label>
                  <input
                    className="h-12 px-4 rounded-xl border border-gray-200 bg-gray-50 focus:border-black focus:ring-0"
                    placeholder="Soyad"
                    type="text"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-text-main">
                  E-posta
                </label>
                <input
                  className="h-12 px-4 rounded-xl border border-gray-200 bg-gray-50 focus:border-black focus:ring-0"
                  placeholder="email@ornek.com"
                  type="email"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-text-main">
                  Hedef Ülke
                </label>
                <select className="h-12 px-4 rounded-xl border border-gray-200 bg-gray-50 focus:border-black focus:ring-0">
                  <option>Lütfen seçin</option>
                  <option>Almanya</option>
                  <option>ABD</option>
                  <option>İngiltere</option>
                  <option>Diğer</option>
                </select>
              </div>
              <button className="h-14 mt-2 rounded-xl bg-black text-white font-bold text-lg hover:bg-gray-800 transition-colors shadow-lg hover:scale-[1.01] active:scale-[0.99]">
                Ücretsiz Değerlendirme Al
              </button>
              <p className="text-xs text-center text-gray-500 mt-2">
                Kredi kartı gerekmez. Verileriniz güvende.
              </p>
            </form>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-background-dark border-t border-gray-100 dark:border-white/5">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-10 text-center">
            Sıkça Sorulan Sorular
          </h2>
          <div className="space-y-4">
            <details className="group bg-gray-50 dark:bg-white/5 rounded-xl">
              <summary className="flex justify-between items-center font-medium cursor-pointer list-none p-6">
                <span>Almanya&apos;da okumak için Almanca bilmem gerekiyor mu?</span>
                <span className="transition group-open:rotate-180">
                  <span className="material-symbols-outlined">expand_more</span>
                </span>
              </summary>
              <div className="text-text-muted dark:text-gray-400 mt-0 px-6 pb-6">
                Hayır! Özellikle yüksek lisans seviyesinde birçok üniversitede tamamen
                İngilizce programlar bulunur. Uygun seçenekleri birlikte belirliyoruz.
              </div>
            </details>
            <details className="group bg-gray-50 dark:bg-white/5 rounded-xl">
              <summary className="flex justify-between items-center font-medium cursor-pointer list-none p-6">
                <span>Görüşme ücreti ne kadar?</span>
                <span className="transition group-open:rotate-180">
                  <span className="material-symbols-outlined">expand_more</span>
                </span>
              </summary>
              <div className="text-text-muted dark:text-gray-400 mt-0 px-6 pb-6">
                İlk değerlendirme tamamen ücretsizdir. Hedeflerinizi ve uygunluğunuzu
                netleştirir, ücretli hizmetlere geçmeden önce size özel bir plan çıkarırız.
              </div>
            </details>
            <details className="group bg-gray-50 dark:bg-white/5 rounded-xl">
              <summary className="flex justify-between items-center font-medium cursor-pointer list-none p-6">
                <span>Yurtdışında okurken çalışabilir miyim?</span>
                <span className="transition group-open:rotate-180">
                  <span className="material-symbols-outlined">expand_more</span>
                </span>
              </summary>
              <div className="text-text-muted dark:text-gray-400 mt-0 px-6 pb-6">
                Evet, birçok öğrenci vizesi ülkeden ülkeye değişen kurallar ile dönem
                içinde yarı zamanlı, tatillerde ise tam zamanlı çalışma imkânı sunar.
                Biz, hedef ülkenize göre en güncel çalışma haklarını netleştiririz.
              </div>
            </details>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
