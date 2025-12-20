import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import CalendlyModal from "../components/CalendlyModal";

const CALENDLY_EVENT_URL = process.env.NEXT_PUBLIC_CALENDLY_EVENT_URL ?? "";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.lotusabroad.net";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [calendlyOpen, setCalendlyOpen] = useState(false);
  const lastTriggerRef = useRef<HTMLElement | null>(null);

  const canonicalPath = (router.asPath ?? "/").split("#")[0].split("?")[0] || "/";
  const locale = router.locale ?? "tr";
  const defaultLocale = router.defaultLocale ?? "tr";
  const locales = router.locales ?? ["tr", "en", "de"];
  const canonicalUrl =
    SITE_URL +
    (locale === defaultLocale ? "" : `/${locale}`) +
    (canonicalPath.startsWith("/") ? canonicalPath : `/${canonicalPath}`);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const trigger = target?.closest<HTMLElement>('[data-calendly-open="true"]');
      if (!trigger) return;

      event.preventDefault();
      lastTriggerRef.current = trigger;
      setCalendlyOpen(true);
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return (
    <>
      <Head>
        <link rel="canonical" href={canonicalUrl} />
        {locales.map((altLocale) => {
          const href =
            SITE_URL +
            (altLocale === defaultLocale ? "" : `/${altLocale}`) +
            (canonicalPath.startsWith("/") ? canonicalPath : `/${canonicalPath}`);
          return (
            <link
              key={`alt-${altLocale}`}
              rel="alternate"
              hrefLang={altLocale}
              href={href}
            />
          );
        })}
        <link
          rel="alternate"
          hrefLang="x-default"
          href={SITE_URL + (canonicalPath.startsWith("/") ? canonicalPath : `/${canonicalPath}`)}
        />
        <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />
        <meta property="og:site_name" content="Lotus Abroad" />
        <meta property="og:url" content={canonicalUrl} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <Component {...pageProps} />
      <CalendlyModal
        onClose={() => setCalendlyOpen(false)}
        open={calendlyOpen}
        restoreFocusTo={lastTriggerRef.current}
        url={CALENDLY_EVENT_URL}
      />
      <Analytics />
    </>
  );
}
