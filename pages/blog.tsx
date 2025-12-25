import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";

import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import {
  getBlogArticles,
  getCategoryLabels,
  type BlogCategory,
} from "../lib/blogData";
import { normalizeLocale } from "../lib/i18n";

type BlogCategoryFilter = BlogCategory | "All";

const CATEGORIES: BlogCategoryFilter[] = [
  "All",
  "Guides",
  "Visa",
  "Scholarships",
  "Student Life",
];

const BLOG_UI = {
  tr: {
    headTitle: "Blog | Lotus Abroad",
    description:
      "Yurtdışı eğitim ve vize süreçleri için rehberler: net adımlar, gerçekçi takvimler ve güçlü başvuru önerileri.",
    heroTitle: "Blog",
    featured: "Öne Çıkan",
    freeAssessment: "Ücretsiz Değerlendirme Al",
    readMore: "Devamını Oku",
    all: "Tümü",
    bottomCtaTitle: "En doğru rotayı seçmekte zorlanıyor musunuz?",
    bottomCtaBody:
      "Hedef ülkenizi, programınızı ve zaman planınızı paylaşın. Lotus Abroad size net bir plan ve kontrol listesi hazırlasın.",
    seoHiddenTitle: "Yurtdışı Eğitim Rehberleri",
    seoKeywords: [
      "yurtdışı eğitim",
      "öğrenci vizesi",
      "work and travel",
      "ausbildung",
      "vize danışmanlığı",
      "burs başvurusu",
      "yaşam maliyeti",
      "konaklama",
    ],
  },
  en: {
    headTitle: "Blog | Lotus Abroad",
    description:
      "Guides for studying abroad and visa processes: clear steps, realistic timelines, and strong application tips.",
    heroTitle: "Blog",
    featured: "Featured",
    freeAssessment: "Get a Free Assessment",
    readMore: "Continue Reading",
    all: "All",
    bottomCtaTitle: "Not sure which route is best for you?",
    bottomCtaBody:
      "Share your target country, program, and timeline. Lotus Abroad will prepare a clear plan and checklist for you.",
    seoHiddenTitle: "Study Abroad Guides",
    seoKeywords: [
      "study abroad",
      "student visa",
      "work and travel",
      "ausbildung",
      "visa consulting",
      "scholarships",
      "cost of living",
      "accommodation",
    ],
  },
  de: {
    headTitle: "Blog | Lotus Abroad",
    description:
      "Leitfäden zu Auslandsstudium und Visa: klare Schritte, realistische Timelines und starke Bewerbungstipps.",
    heroTitle: "Blog",
    featured: "Empfohlen",
    freeAssessment: "Kostenlose Einschätzung",
    readMore: "Weiterlesen",
    all: "Alle",
    bottomCtaTitle: "Unsicher, welche Route am besten passt?",
    bottomCtaBody:
      "Teilen Sie Zielland, Programm und Zeitplan. Lotus Abroad erstellt einen klaren Plan und eine Checkliste.",
    seoHiddenTitle: "Leitfäden Auslandsstudium",
    seoKeywords: [
      "Auslandsstudium",
      "Studentenvisum",
      "Work and Travel",
      "Ausbildung",
      "Visaberatung",
      "Stipendien",
      "Lebenshaltungskosten",
      "Unterkunft",
    ],
  },
} as const;

function CategoryPill({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      className={[
        "h-10 px-4 rounded-full text-sm font-bold transition-all border",
        active
          ? "bg-[#e9e8df] dark:bg-white/10 text-text-main dark:text-white border-black/10 dark:border-white/10 shadow-[0_18px_40px_rgba(0,0,0,0.06)]"
          : "bg-white/70 dark:bg-white/5 text-text-main dark:text-white/90 border-gray-100 dark:border-white/10 hover:bg-white hover:dark:bg-white/10",
      ].join(" ")}
      onClick={onClick}
      type="button"
    >
      {label}
    </button>
  );
}

export default function BlogPage() {
  const router = useRouter();
  const locale = normalizeLocale(router.locale);
  const ui = BLOG_UI[locale];
  const categoryLabels = getCategoryLabels(locale);
  const categoryFilterLabel: Record<BlogCategoryFilter, string> = {
    All: ui.all,
    Guides: categoryLabels.Guides,
    Visa: categoryLabels.Visa,
    Scholarships: categoryLabels.Scholarships,
    "Student Life": categoryLabels["Student Life"],
  };

  const [activeCategory, setActiveCategory] = useState<BlogCategoryFilter>("All");

  const articles = useMemo(() => getBlogArticles(locale), [locale]);

  const filteredPosts = useMemo(() => {
    if (activeCategory === "All") return articles;
    return articles.filter((p) => p.category === activeCategory);
  }, [activeCategory, articles]);

  const featured = filteredPosts[0] ?? null;
  const rest = filteredPosts.slice(1);

  return (
    <>
      <Head>
        <title>{ui.headTitle}</title>
        <meta name="description" content={ui.description} />
      </Head>

      <SiteHeader />

      <main className="pt-24">
        <section className="bg-gradient-to-b from-white via-background-light to-background-light dark:from-background-dark dark:via-background-dark dark:to-background-dark border-b border-gray-200/70 dark:border-white/10">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
            <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8">
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => (
                  <CategoryPill
                    active={activeCategory === cat}
                    key={cat}
                    label={categoryFilterLabel[cat]}
                    onClick={() => setActiveCategory(cat)}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-background-light dark:bg-background-dark">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12 space-y-8">
            {featured ? (
              <div className="rounded-[2rem] overflow-hidden border border-gray-100 dark:border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.08)] bg-white/70 dark:bg-white/5">
                <div className="relative h-[260px] md:h-[320px]">
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${featured.heroImageUrl}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/30 to-black/85" />
                  <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-end">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1 rounded-full bg-primary text-black text-[11px] font-black px-3 py-1">
                        {ui.featured}
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-white/15 text-white text-[11px] font-bold px-3 py-1 backdrop-blur">
                        {categoryLabels[featured.category]}
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-white/15 text-white text-[11px] font-bold px-3 py-1 backdrop-blur">
                        {featured.readTime}
                      </span>
                    </div>
                    <h2 className="mt-3 text-3xl md:text-4xl font-black text-white tracking-tight max-w-3xl">
                      {featured.title}
                    </h2>
                    <p className="mt-3 text-sm md:text-base text-white/80 max-w-3xl leading-relaxed">
                      {featured.excerpt}
                    </p>
                    <div className="mt-6 flex flex-wrap items-center gap-3">
                      <button
                        className="h-11 px-6 rounded-full bg-primary text-black text-sm font-black flex items-center justify-center hover:brightness-105 transition-all"
                        aria-haspopup="dialog"
                        data-calendly-open="true"
                        type="button"
                      >
                        {ui.freeAssessment}
                      </button>
                      <Link
                        className="h-11 px-6 rounded-full bg-white/15 text-white text-sm font-bold flex items-center justify-center hover:bg-white/20 transition-colors backdrop-blur"
                        href={`/blog/${featured.id}`}
                      >
                        {ui.readMore}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" id="posts">
              {rest.map((post) => (
                <div
                  className="group rounded-[2rem] overflow-hidden border border-gray-100 dark:border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.08)] bg-white/70 dark:bg-white/5 hover:shadow-[0_28px_70px_rgba(0,0,0,0.12)] transition-shadow"
                  key={post.id}
                >
                  <div className="relative h-44">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                      style={{ backgroundImage: `url('${post.heroImageUrl}')` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/70" />
                    <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1 rounded-full bg-white/90 text-black text-[11px] font-black px-3 py-1">
                        {categoryLabels[post.category]}
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-white/20 text-white text-[11px] font-bold px-3 py-1 backdrop-blur">
                        {post.readTime}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col gap-3">
                    <div className="text-xs font-bold text-text-muted dark:text-gray-400">
                      {post.dateLabel}
                    </div>
                    <div className="text-lg font-black text-text-main dark:text-white leading-snug">
                      {post.title}
                    </div>
                    <div className="text-sm text-text-muted dark:text-gray-400 leading-relaxed">
                      {post.excerpt}
                    </div>
                    <div className="pt-2">
                      <Link
                        className="inline-flex items-center gap-2 text-sm font-black text-text-main dark:text-white hover:text-primary transition-colors"
                        href={`/blog/${post.id}`}
                      >
                        {ui.readMore}
                        <span className="material-symbols-outlined text-[18px]">
                          arrow_outward
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-[2rem] bg-black text-white p-7 md:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.18)]">
              <div className="flex items-center justify-between gap-6 flex-wrap">
                <div>
                  <div className="text-xl md:text-2xl font-black">
                    {ui.bottomCtaTitle}
                  </div>
                  <div className="mt-2 text-sm text-white/70 max-w-2xl">
                    {ui.bottomCtaBody}
                  </div>
                </div>
                <button
                  className="h-11 px-6 rounded-full bg-primary text-black text-sm font-black flex items-center justify-center hover:brightness-105 transition-all"
                  aria-haspopup="dialog"
                  data-calendly-open="true"
                  type="button"
                >
                  {ui.freeAssessment}
                </button>
              </div>
            </div>

            {/* SEO: UI'da görünmez anahtar kelimeler */}
            <section aria-hidden="true" className="sr-only">
              <h2>{ui.seoHiddenTitle}</h2>
              <p>{ui.seoKeywords.join(" • ")}</p>
            </section>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
