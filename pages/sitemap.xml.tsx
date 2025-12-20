import type { GetServerSideProps } from "next";

import { BLOG_ARTICLE_IDS } from "../lib/blogData";

const DEFAULT_LOCALE = "tr";
const LOCALES = ["tr", "en", "de"] as const;

type ChangeFreq =
  | "always"
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "never";

function getBaseUrl(req: Parameters<GetServerSideProps>[0]["req"]) {
  const host = req.headers["x-forwarded-host"] ?? req.headers.host;
  const proto = req.headers["x-forwarded-proto"] ?? "https";
  const hostValue = Array.isArray(host) ? host[0] : host;
  const protoValue = Array.isArray(proto) ? proto[0] : proto;
  if (!hostValue) return "https://www.lotusabroad.net";
  return `${protoValue}://${hostValue}`;
}

function withLocalePath(locale: string, path: string) {
  const safePath = path === "/" ? "" : path;
  if (locale === DEFAULT_LOCALE) return `${safePath || "/"}`;
  return `/${locale}${safePath || "/"}`;
}

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function buildUrlEntry(opts: {
  baseUrl: string;
  locale: string;
  path: string;
  lastmod: string;
  changefreq: ChangeFreq;
  priority: number;
}) {
  const { baseUrl, locale, path, lastmod, changefreq, priority } = opts;
  const loc = `${baseUrl}${withLocalePath(locale, path)}`;

  const alternates = LOCALES.map((altLocale) => {
    const href = `${baseUrl}${withLocalePath(altLocale, path)}`;
    return `    <xhtml:link rel="alternate" hreflang="${altLocale}" href="${escapeXml(
      href,
    )}" />`;
  }).join("\n");

  const xDefault = `${baseUrl}${withLocalePath(DEFAULT_LOCALE, path)}`;

  return [
    "  <url>",
    `    <loc>${escapeXml(loc)}</loc>`,
    `    <lastmod>${lastmod}</lastmod>`,
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority.toFixed(1)}</priority>`,
    alternates,
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(
      xDefault,
    )}" />`,
    "  </url>",
  ].join("\n");
}

function buildSitemapXml(baseUrl: string) {
  const now = new Date().toISOString();

  const staticPages: Array<{
    path: string;
    changefreq: ChangeFreq;
    priority: number;
  }> = [
    { path: "/", changefreq: "weekly", priority: 1.0 },
    { path: "/programs", changefreq: "weekly", priority: 0.9 },
    { path: "/contact", changefreq: "monthly", priority: 0.8 },
    { path: "/blog", changefreq: "weekly", priority: 0.8 },
    { path: "/about", changefreq: "monthly", priority: 0.7 },
    { path: "/program-detail", changefreq: "monthly", priority: 0.4 },
    { path: "/privacy-policy", changefreq: "yearly", priority: 0.3 },
    { path: "/terms-of-service", changefreq: "yearly", priority: 0.3 },
    { path: "/cookie-policy", changefreq: "yearly", priority: 0.3 },
  ];

  const blogPages = BLOG_ARTICLE_IDS.map((id) => ({
    path: `/blog/${id}`,
    changefreq: "monthly" as const,
    priority: 0.6,
  }));

  const allPages = [...staticPages, ...blogPages];

  const entries = allPages
    .flatMap((page) =>
      LOCALES.map((locale) =>
        buildUrlEntry({
          baseUrl,
          locale,
          path: page.path,
          lastmod: now,
          changefreq: page.changefreq,
          priority: page.priority,
        }),
      ),
    )
    .join("\n");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    entries,
    "</urlset>",
    "",
  ].join("\n");
}

export const getServerSideProps: GetServerSideProps = async ({ res, req }) => {
  const baseUrl = getBaseUrl(req);
  const xml = buildSitemapXml(baseUrl);
  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader("Cache-Control", "public, s-maxage=86400, stale-while-revalidate=604800");
  res.write(xml);
  res.end();
  return { props: {} };
};

export default function SitemapXml() {
  return null;
}

