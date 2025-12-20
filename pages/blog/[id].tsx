import Head from "next/head";
import type { GetStaticPaths, GetStaticProps } from "next";

import SiteFooter from "../../components/SiteFooter";
import SiteHeader from "../../components/SiteHeader";
import { BLOG_ARTICLES, CATEGORY_LABELS_TR, type BlogArticle } from "../../lib/blogData";

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: BLOG_ARTICLES.map((a) => ({ params: { id: a.id } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<{ article: BlogArticle }> = async (ctx) => {
  const id = String(ctx.params?.id ?? "");
  const article = BLOG_ARTICLES.find((a) => a.id === id);
  if (!article) return { notFound: true };
  return { props: { article } };
};

export default function BlogArticlePage({ article }: { article: BlogArticle }) {
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
                    {CATEGORY_LABELS_TR[article.category]}
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
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
