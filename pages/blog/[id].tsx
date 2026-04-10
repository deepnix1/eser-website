import Head from "next/head";
import type { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";

import SiteFooter from "../../components/SiteFooter";
import SiteHeader from "../../components/SiteHeader";
import {
  BLOG_ARTICLE_IDS,
  getBlogArticleById,
  getBlogArticles,
  getCategoryLabels,
  type BlogArticle,
} from "../../lib/blogData";
import { normalizeLocale } from "../../lib/i18n";

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const locales = ctx.locales ?? [];
  return {
    paths: (locales.length ? locales : [undefined]).flatMap((locale) =>
      BLOG_ARTICLE_IDS.map((id) => ({
        params: { id },
        ...(locale ? { locale } : {}),
      })),
    ),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<{ article: BlogArticle }> = async (ctx) => {
  const id = String(ctx.params?.id ?? "");
  const article = getBlogArticleById(id, ctx.locale);
  if (!article) return { notFound: true };
  return { props: { article } };
};

export default function BlogArticlePage({ article }: { article: BlogArticle }) {
  const router = useRouter();
  const locale = normalizeLocale(router.locale);
  const categoryLabels = getCategoryLabels(locale);
  const relatedArticles = getBlogArticles(locale)
    .filter((item) => item.id !== article.id)
    .filter((item) => item.category === article.category || item.id === "pre-departure-checklist")
    .slice(0, 3);

  return (
    <>
      <Head>
        <title>{article.title} | Lotus Abroad</title>
        <meta name="description" content={article.excerpt} />
      </Head>

      <SiteHeader />

      <main className="min-h-screen bg-background-light dark:bg-background-dark transition-colors duration-300 pt-24 pb-14">
        <section className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[2rem] border border-gray-100 dark:border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.10)]">
            <div className="relative h-[320px] md:h-[420px]">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('${article.heroImageUrl}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/80" />
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/90 text-black text-[11px] font-black px-3 py-1">
                    {categoryLabels[article.category]}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/20 text-white text-[11px] font-bold px-3 py-1 backdrop-blur">
                    {article.readTime}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/20 text-white text-[11px] font-bold px-3 py-1 backdrop-blur">
                    {article.dateLabel}
                  </span>
                </div>
                <h1 className="mt-3 text-3xl md:text-4xl font-black text-white tracking-tight max-w-3xl">
                  {article.title}
                </h1>
                <p className="mt-3 text-sm md:text-base text-white/80 max-w-3xl leading-relaxed">
                  {article.excerpt}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-[2rem] bg-white/70 dark:bg-white/5 border border-gray-100 dark:border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.08)] p-6 md:p-10">
            <div className="space-y-8">
              {article.sections.map((section, idx) => (
                <div className="space-y-4" key={`${article.id}-${idx}`}>
                  {section.heading ? (
                    <h2 className="text-xl md:text-2xl font-black text-text-main dark:text-white">
                      {section.heading}
                    </h2>
                  ) : null}

                  {section.paragraphs?.map((p, pIdx) => (
                    <p
                      className="text-sm md:text-base text-text-muted dark:text-gray-300 leading-relaxed"
                      key={`${article.id}-${idx}-p-${pIdx}`}
                    >
                      {p}
                    </p>
                  ))}

                  {section.bullets?.length ? (
                    <ul className="list-disc pl-5 space-y-2">
                      {section.bullets.map((b, bIdx) => (
                        <li
                          className="text-sm md:text-base text-text-muted dark:text-gray-300 leading-relaxed"
                          key={`${article.id}-${idx}-b-${bIdx}`}
                        >
                          {b}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <section className="rounded-[2rem] bg-white/70 dark:bg-white/5 border border-gray-100 dark:border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.08)] p-6 md:p-8">
              <h2 className="text-xl md:text-2xl font-black text-text-main dark:text-white">
                {locale === "tr" ? "İlgili içerikler" : locale === "de" ? "Verwandte Inhalte" : "Related reads"}
              </h2>
              <div className="mt-5 grid gap-4">
                {relatedArticles.map((item) => (
                  <Link
                    key={item.id}
                    className="rounded-[1.5rem] border border-gray-100 dark:border-white/10 bg-background-light/70 dark:bg-white/5 p-4 hover:border-primary/40 hover:bg-white dark:hover:bg-white/10 transition-colors"
                    href={`/blog/${item.id}`}
                  >
                    <div className="text-xs font-bold text-text-muted dark:text-gray-400">
                      {categoryLabels[item.category]}
                    </div>
                    <div className="mt-2 text-base font-black text-text-main dark:text-white">
                      {item.title}
                    </div>
                    <div className="mt-2 text-sm text-text-muted dark:text-gray-400 leading-relaxed">
                      {item.excerpt}
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            <section className="rounded-[2rem] bg-black text-white p-6 md:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.18)]">
              <h2 className="text-xl md:text-2xl font-black">
                {locale === "tr"
                  ? "Devam etmek için en güçlü adım"
                  : locale === "de"
                    ? "Der stärkste nächste Schritt"
                    : "The strongest next step"}
              </h2>
              <p className="mt-3 text-sm md:text-base text-white/75 leading-relaxed">
                {locale === "tr"
                  ? "Genel içerik yön verir; doğru rota ise hedef ülke, program, bütçe ve profil birlikte değerlendirilince çıkar."
                  : locale === "de"
                    ? "Allgemeine Inhalte helfen bei der Orientierung, aber die richtige Route ergibt sich erst aus Land, Programm, Budget und Profil."
                    : "General content is useful for orientation, but the right route only becomes clear when country, program, budget, and profile are reviewed together."}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  className="h-11 px-6 rounded-full bg-primary text-black text-sm font-black flex items-center justify-center hover:brightness-105 transition-all"
                  href="/programs"
                >
                  {locale === "tr" ? "Programları incele" : locale === "de" ? "Programme ansehen" : "Explore programs"}
                </Link>
                <Link
                  className="h-11 px-6 rounded-full bg-white/15 text-white text-sm font-bold flex items-center justify-center hover:bg-white/20 transition-colors"
                  href="/sss"
                >
                  {locale === "tr" ? "SSS sayfası" : "FAQ"}
                </Link>
              </div>
            </section>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
