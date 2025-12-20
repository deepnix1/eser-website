import Head from "next/head";
import { useMemo, useState } from "react";

import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import {
  BLOG_ARTICLES,
  CATEGORY_LABELS_TR,
  type BlogCategory,
} from "../lib/blogData";

type BlogCategoryFilter = BlogCategory | "All";

const CATEGORIES: BlogCategoryFilter[] = [
  "All",
  "Guides",
  "Visa",
  "Scholarships",
  "Student Life",
];

const CATEGORY_FILTER_LABEL_TR: Record<BlogCategoryFilter, string> = {
  All: "Tümü",
  Guides: CATEGORY_LABELS_TR.Guides,
  Visa: CATEGORY_LABELS_TR.Visa,
  Scholarships: CATEGORY_LABELS_TR.Scholarships,
  "Student Life": CATEGORY_LABELS_TR["Student Life"],
};

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
  const [activeCategory, setActiveCategory] = useState<BlogCategoryFilter>("All");

  const filteredPosts = useMemo(() => {
    if (activeCategory === "All") return BLOG_ARTICLES;
    return BLOG_ARTICLES.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const featured = filteredPosts[0] ?? null;
  const rest = filteredPosts.slice(1);

  return (
    <>
      <Head>
        <title>Blog | Lotus Abroad</title>
        <meta
          name="description"
          content="Yurtdışı eğitim ve vize süreçleri için rehberler: net adımlar, gerçekçi takvimler ve güçlü başvuru önerileri."
        />
      </Head>

      <SiteHeader />

      <main className="pt-24">
        <section className="bg-gradient-to-b from-white via-background-light to-background-light dark:from-background-dark dark:via-background-dark dark:to-background-dark border-b border-gray-200/70 dark:border-white/10">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
            <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8">
              <div>
                <h1 className="text-4xl md:text-5xl font-black tracking-tight text-text-main dark:text-white">
                  Blog
                </h1>
                <p className="mt-4 text-sm md:text-base text-text-muted dark:text-gray-400 max-w-2xl leading-relaxed">
                  Yurtdışı eğitim ve vize süreçleri için rehberler: net adımlar,
                  gerçekçi takvimler ve güçlü başvuru önerileri.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => (
                  <CategoryPill
                    active={activeCategory === cat}
                    key={cat}
                    label={CATEGORY_FILTER_LABEL_TR[cat]}
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
                        Öne Çıkan
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-white/15 text-white text-[11px] font-bold px-3 py-1 backdrop-blur">
                        {CATEGORY_LABELS_TR[featured.category]}
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
                        Ücretsiz Değerlendirme Al
                      </button>
                      <a
                        className="h-11 px-6 rounded-full bg-white/15 text-white text-sm font-bold flex items-center justify-center hover:bg-white/20 transition-colors backdrop-blur"
                        href={`/blog/${featured.id}`}
                      >
                        Devamını Oku
                      </a>
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
                        {CATEGORY_LABELS_TR[post.category]}
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
                      <a
                        className="inline-flex items-center gap-2 text-sm font-black text-text-main dark:text-white hover:text-primary transition-colors"
                        href={`/blog/${post.id}`}
                      >
                        Devamını Oku
                        <span className="material-symbols-outlined text-[18px]">
                          arrow_outward
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-[2rem] bg-black text-white p-7 md:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.18)]">
              <div className="flex items-center justify-between gap-6 flex-wrap">
                <div>
                  <div className="text-xl md:text-2xl font-black">
                    En doğru rotayı seçmekte zorlanıyor musunuz?
                  </div>
                  <div className="mt-2 text-sm text-white/70 max-w-2xl">
                    Hedef ülkenizi, programınızı ve zaman planınızı paylaşın. Lotus
                    Abroad size net bir plan ve kontrol listesi hazırlasın.
                  </div>
                </div>
                <button
                  className="h-11 px-6 rounded-full bg-primary text-black text-sm font-black flex items-center justify-center hover:brightness-105 transition-all"
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
      </main>

      <SiteFooter />
    </>
  );
}
