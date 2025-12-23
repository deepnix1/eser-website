import type { AppProps } from "next/app";
import "../styles/globals.css";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import CalendlyModal from "../components/CalendlyModal";
import { getDeviceTypeFromWidth } from "../lib/device";

const CALENDLY_EVENT_URL = process.env.NEXT_PUBLIC_CALENDLY_EVENT_URL ?? "";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.lotusabroad.net";

function isLayoutDebugEnabled(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const params = new URLSearchParams(window.location.search);
    const paramEnabled =
      params.get("debug") === "1" ||
      params.get("lotus_debug") === "1" ||
      params.get("layout_debug") === "1";
    const storedEnabled = window.localStorage?.getItem("lotus_debug") === "1";
    return Boolean(paramEnabled || storedEnabled);
  } catch {
    return false;
  }
}

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [calendlyOpen, setCalendlyOpen] = useState(false);
  const lastTriggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let timeoutId: number | null = null;
    const debugEnabled = isLayoutDebugEnabled();

    const apply = () => {
      const device = getDeviceTypeFromWidth(window.innerWidth);
      document.documentElement.dataset.device = device;
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);

      if (debugEnabled) {
        try {
          const mm640 = window.matchMedia("(min-width: 640px)").matches;
          const mm768 = window.matchMedia("(min-width: 768px)").matches;
          const mm1024 = window.matchMedia("(min-width: 1024px)").matches;
          const mdHiddenEl = document.querySelector<HTMLElement>(".md\\:hidden");
          const mdFlexEl = document.querySelector<HTMLElement>(".md\\:flex");
          const mdHiddenDisplay = mdHiddenEl ? window.getComputedStyle(mdHiddenEl).display : null;
          const mdFlexDisplay = mdFlexEl ? window.getComputedStyle(mdFlexEl).display : null;
          const cssLinks = Array.from(
            document.querySelectorAll<HTMLLinkElement>('link[rel="stylesheet"][href]'),
          ).map((el) => el.href);

          console.groupCollapsed("[LotusAbroad] layout debug");
          console.info("viewport", {
            innerWidth: window.innerWidth,
            innerHeight: window.innerHeight,
            outerWidth: window.outerWidth,
            outerHeight: window.outerHeight,
            clientWidth: document.documentElement.clientWidth,
            clientHeight: document.documentElement.clientHeight,
            visualViewportWidth: window.visualViewport?.width ?? null,
            visualViewportHeight: window.visualViewport?.height ?? null,
            visualViewportScale: (window.visualViewport as any)?.scale ?? null,
            devicePixelRatio: window.devicePixelRatio,
            screenWidth: window.screen?.width ?? null,
            screenHeight: window.screen?.height ?? null,
            screenAvailWidth: (window.screen as any)?.availWidth ?? null,
            screenAvailHeight: (window.screen as any)?.availHeight ?? null,
            datasetDevice: document.documentElement.dataset.device,
            computedDevice: device,
          });
          console.info("breakpoints", { mm640, mm768, mm1024 });
          console.info("computed displays", { mdHiddenDisplay, mdFlexDisplay });
          console.info("stylesheets", cssLinks);
          console.info("meta viewport", document.querySelector('meta[name="viewport"]')?.getAttribute("content"));
          console.info("ua", navigator.userAgent);
          console.groupEnd();
        } catch (err) {
          console.warn("[LotusAbroad] layout debug failed", err);
        }
      }
    };

    const onResize = () => {
      if (timeoutId) window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        apply();
        timeoutId = null;
      }, 120);
    };

    apply();
    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("orientationchange", onResize, { passive: true });

    if (debugEnabled) {
      const onError = (event: ErrorEvent) => {
        console.error("[LotusAbroad] window error", event.message, event.error);
      };
      const onUnhandledRejection = (event: PromiseRejectionEvent) => {
        console.error("[LotusAbroad] unhandledrejection", event.reason);
      };
      window.addEventListener("error", onError);
      window.addEventListener("unhandledrejection", onUnhandledRejection);
      return () => {
        if (timeoutId) window.clearTimeout(timeoutId);
        window.removeEventListener("resize", onResize);
        window.removeEventListener("orientationchange", onResize);
        window.removeEventListener("error", onError);
        window.removeEventListener("unhandledrejection", onUnhandledRejection);
      };
    }

    return () => {
      if (timeoutId) window.clearTimeout(timeoutId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
    };
  }, []);

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
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
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
