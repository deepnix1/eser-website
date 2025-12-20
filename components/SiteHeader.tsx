import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

import LotusAbroadLogo from "./LotusAbroadLogo";

const LABELS = {
  tr: {
    home: "Ana Sayfa",
    programs: "Programlar",
    countries: "Ülkeler",
    blog: "Blog",
    about: "Hakkımızda",
    contact: "İletişim",
    cta: "Ücretsiz Görüşme",
  },
  en: {
    home: "Home",
    programs: "Programs",
    countries: "Countries",
    blog: "Blog",
    about: "About",
    contact: "Contact",
    cta: "Free Consultation",
  },
  "en-GB": {
    home: "Home",
    programs: "Programs",
    countries: "Countries",
    blog: "Blog",
    about: "About",
    contact: "Contact",
    cta: "Free Consultation",
  },
} as const;

const LOCALE_MENU = [
  { label: "TR", locale: "tr", flag: "🇹🇷", aria: "Türkçe" },
  { label: "EN", locale: "en", flag: "🇺🇸", aria: "English" },
  { label: "GB", locale: "en-GB", flag: "🇬🇧", aria: "English (UK)" },
] as const;

type SupportedLocale = (typeof LOCALE_MENU)[number]["locale"];

function FlagDot({ emoji, ariaLabel }: { emoji: string; ariaLabel: string }) {
  return (
    <span
      aria-label={ariaLabel}
      className="inline-flex size-6 items-center justify-center rounded-full bg-white dark:bg-white/10 ring-1 ring-black/10 dark:ring-white/10 overflow-hidden text-[14px] leading-none"
      role="img"
    >
      {emoji}
    </span>
  );
}

export default function SiteHeader() {
  const router = useRouter();
  const currentLocale = (router.locale ?? "tr") as SupportedLocale;
  const labels = LABELS[currentLocale] ?? LABELS.tr;

  const activeLocaleItem = useMemo(
    () => LOCALE_MENU.find((item) => item.locale === currentLocale) ?? LOCALE_MENU[0],
    [currentLocale],
  );

  const [languageOpen, setLanguageOpen] = useState(false);
  const languageButtonRef = useRef<HTMLButtonElement | null>(null);
  const languageMenuRef = useRef<HTMLDivElement | null>(null);

  const toggleTheme = useCallback(() => {
    if (typeof document === "undefined") return;
    document.documentElement.classList.toggle("dark");
  }, []);

  const closeLanguage = useCallback(() => setLanguageOpen(false), []);

  useEffect(() => {
    if (!languageOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      closeLanguage();
      languageButtonRef.current?.focus();
    };

    const onPointerDown = (event: MouseEvent | PointerEvent) => {
      const target = event.target as Node | null;
      if (!target) return;
      if (languageButtonRef.current?.contains(target)) return;
      if (languageMenuRef.current?.contains(target)) return;
      closeLanguage();
    };

    document.addEventListener("keydown", onKeyDown, true);
    document.addEventListener("pointerdown", onPointerDown, true);
    return () => {
      document.removeEventListener("keydown", onKeyDown, true);
      document.removeEventListener("pointerdown", onPointerDown, true);
    };
  }, [closeLanguage, languageOpen]);

  const onSelectLocale = useCallback(
    async (nextLocale: SupportedLocale) => {
      closeLanguage();
      if (typeof document !== "undefined") {
        document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; max-age=31536000; samesite=lax`;
      }
      await router.push(router.asPath, router.asPath, { locale: nextLocale });
    },
    [closeLanguage, router],
  );

  const languageAriaLabel = useMemo(() => {
    const active =
      LOCALE_MENU.find((item) => item.locale === currentLocale)?.label ?? "TR";
    return `Dil seçimi (aktif: ${active})`;
  }, [currentLocale]);

  return (
    <nav className="fixed top-0 w-full z-50 transition-all duration-300 backdrop-blur-md bg-white/80 dark:bg-background-dark/80 border-b border-gray-100 dark:border-gray-800">
      <div className="max-w-[1440px] 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-24 gap-4">
          <div className="shrink-0">
            <LotusAbroadLogo size="lg" />
          </div>

          <nav
            aria-label="Primary"
            className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <div className="flex items-center gap-6 lg:gap-8 whitespace-nowrap">
              <Link className="text-sm font-medium hover:text-primary transition-colors" href="/">
                {labels.home}
              </Link>
              <Link
                className="text-sm font-medium hover:text-primary transition-colors"
                href="/programs"
              >
                {labels.programs}
              </Link>
              <Link
                className="text-sm font-medium hover:text-primary transition-colors"
                href="/#destinations"
              >
                {labels.countries}
              </Link>
              <Link className="text-sm font-medium hover:text-primary transition-colors" href="/blog">
                {labels.blog}
              </Link>
              <Link className="text-sm font-medium hover:text-primary transition-colors" href="/about">
                {labels.about}
              </Link>
              <Link
                className="text-sm font-medium hover:text-primary transition-colors"
                href="/contact"
              >
                {labels.contact}
              </Link>
            </div>
          </nav>

          <div className="relative flex items-center gap-3 shrink-0">
            <div className="relative hidden sm:block">
              <button
                aria-expanded={languageOpen}
                aria-haspopup="menu"
                aria-label={languageAriaLabel}
                className="inline-flex items-center gap-2 h-9 px-2.5 rounded-full bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                onClick={() => setLanguageOpen((prev) => !prev)}
                ref={languageButtonRef}
                type="button"
              >
                <FlagDot emoji={activeLocaleItem.flag} ariaLabel={activeLocaleItem.aria} />
                <span className="text-[11px] font-black tracking-wider text-text-main dark:text-white">
                  {activeLocaleItem.label}
                </span>
                <span className="material-symbols-outlined text-[18px] text-gray-500 dark:text-gray-300">
                  expand_more
                </span>
              </button>

              {languageOpen ? (
                <div
                  className="absolute right-0 mt-2 w-36 rounded-2xl bg-white/95 dark:bg-[#2b2a18]/95 border border-gray-200/70 dark:border-white/10 shadow-[0_16px_45px_rgba(0,0,0,0.16)] backdrop-blur-md p-1"
                  ref={languageMenuRef}
                  role="menu"
                >
                  {LOCALE_MENU.map((item) => {
                    const active = item.locale === currentLocale;
                    return (
                      <button
                        key={item.locale}
                        aria-checked={active}
                        className={[
                          "w-full flex items-center justify-between gap-3 px-2 py-2 rounded-xl text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
                          active
                            ? "bg-primary/15 text-text-main dark:text-white ring-1 ring-primary/20"
                            : "text-text-main dark:text-white hover:bg-gray-100/80 dark:hover:bg-white/10",
                        ].join(" ")}
                        onClick={() => onSelectLocale(item.locale)}
                        role="menuitemradio"
                        type="button"
                      >
                        <span className="flex items-center gap-2.5">
                          <FlagDot emoji={item.flag} ariaLabel={item.aria} />
                          <span className="tracking-wide">{item.label}</span>
                        </span>
                        <span
                          aria-hidden="true"
                          className={[
                            "material-symbols-outlined text-[18px]",
                            active ? "opacity-100 text-primary" : "opacity-0",
                          ].join(" ")}
                        >
                          check
                        </span>
                      </button>
                    );
                  })}
                </div>
              ) : null}
            </div>

            <button
              aria-label="Tema değiştir"
              className="flex items-center justify-center size-10 rounded-full bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
              onClick={toggleTheme}
              type="button"
            >
              <span className="material-symbols-outlined text-sm">dark_mode</span>
            </button>

            <button
              className="hidden sm:flex h-10 px-6 items-center justify-center rounded-full bg-primary text-black text-sm font-bold tracking-wide hover:brightness-105 transition-all"
              aria-haspopup="dialog"
              data-calendly-open="true"
              type="button"
            >
              {labels.cta}
            </button>

            <button
              aria-label="Menü"
              className="md:hidden flex items-center justify-center size-10 rounded-full bg-gray-100 dark:bg-white/10"
              type="button"
            >
              <span className="material-symbols-outlined">menu</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

