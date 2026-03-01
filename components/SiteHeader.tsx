import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

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
    theme: "Tema değiştir",
    lang: "Dil seçimi",
    menu: "Menü",
  },
  en: {
    home: "Home",
    programs: "Programs",
    countries: "Countries",
    blog: "Blog",
    about: "About",
    contact: "Contact",
    cta: "Free Consultation",
    theme: "Toggle theme",
    lang: "Language",
    menu: "Menu",
  },
  de: {
    home: "Startseite",
    programs: "Programme",
    countries: "Länder",
    blog: "Blog",
    about: "Über uns",
    contact: "Kontakt",
    cta: "Kostenlose Beratung",
    theme: "Theme wechseln",
    lang: "Sprache",
    menu: "Menü",
  },
} as const;

const LOCALE_MENU = [
  { label: "TR", locale: "tr" },
  { label: "EN", locale: "en" },
  { label: "DE", locale: "de" },
] as const;

type SupportedLocale = (typeof LOCALE_MENU)[number]["locale"];

export default function SiteHeader() {
  const router = useRouter();
  const currentLocale = (router.locale ?? "tr") as SupportedLocale;
  const labels = (LABELS as any)[currentLocale] ?? LABELS.tr;

  const [mounted, setMounted] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const languageButtonRef = useRef<HTMLButtonElement | null>(null);
  const languageMenuRef = useRef<HTMLDivElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);

  const toggleTheme = useCallback(() => {
    if (typeof document === "undefined") return;
    document.documentElement.classList.toggle("dark");
  }, []);

  const closeLanguage = useCallback(() => setLanguageOpen(false), []);
  const closeMobileMenu = useCallback(() => setMobileMenuOpen(false), []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      closeMobileMenu();
    };

    const onPointerDown = (event: MouseEvent | PointerEvent) => {
      const target = event.target as Node | null;
      if (!target) return;
      if (mobileMenuRef.current?.contains(target)) return;
      closeMobileMenu();
    };

    document.addEventListener("keydown", onKeyDown, true);
    document.addEventListener("pointerdown", onPointerDown, true);
    return () => {
      document.removeEventListener("keydown", onKeyDown, true);
      document.removeEventListener("pointerdown", onPointerDown, true);
    };
  }, [closeMobileMenu, mobileMenuOpen]);

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
    return `${labels.lang} (aktif: ${active})`;
  }, [currentLocale, labels.lang]);

  const mobileNavLinks = useMemo(() => {
    return [
      { href: "/", label: labels.home },
      { href: "/programs", label: labels.programs },
      { href: "/#destinations", label: labels.countries },
      { href: "/blog", label: labels.blog },
      { href: "/about", label: labels.about },
      { href: "/contact", label: labels.contact },
    ] as const;
  }, [labels]);

  return (
    <>
      <nav className="fixed top-0 w-full z-50 transition-all duration-300 backdrop-blur-md bg-white/80 dark:bg-background-dark/80 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-[1440px] 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-24 gap-4">
            <div className="shrink-0">
              <Link
                aria-label={labels.home}
                className="inline-flex rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                href="/"
              >
                <span className="sm:hidden">
                  <LotusAbroadLogo size="sm" />
                </span>
                <span className="hidden sm:inline md:hidden">
                  <LotusAbroadLogo size="md" />
                </span>
                <span className="hidden md:inline">
                  <LotusAbroadLogo size="lg" />
                </span>
              </Link>
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

            <div className="relative flex items-center gap-2 sm:gap-3 shrink-0">
              <div className="relative">
                <button
                  aria-expanded={languageOpen}
                  aria-haspopup="menu"
                  aria-label={languageAriaLabel}
                  className="hidden sm:flex items-center justify-center size-10 rounded-full bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                  onClick={() => setLanguageOpen((prev) => !prev)}
                  ref={languageButtonRef}
                  type="button"
                >
                  <span className="material-symbols-outlined text-sm">translate</span>
                </button>

                {languageOpen ? (
                  <div
                    className="absolute right-0 mt-2 w-28 rounded-xl bg-white/95 dark:bg-[#2b2a18]/95 border border-gray-200/70 dark:border-white/10 shadow-[0_16px_45px_rgba(0,0,0,0.16)] backdrop-blur-md p-1"
                    ref={languageMenuRef}
                    role="menu"
                  >
                    {LOCALE_MENU.map((item) => {
                      const active = item.locale === currentLocale;
                      return (
                        <button
                          key={item.locale}
                          className={[
                            "w-full flex items-center justify-between gap-2 px-2.5 py-2 rounded-lg text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
                            active
                              ? "bg-primary/15 text-text-main dark:text-white ring-1 ring-primary/20"
                              : "text-text-main dark:text-white hover:bg-gray-100/80 dark:hover:bg-white/10",
                          ].join(" ")}
                          onClick={() => onSelectLocale(item.locale)}
                          role="menuitemradio"
                          aria-checked={active}
                          type="button"
                        >
                          <span className="tracking-wide">{item.label}</span>
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
                aria-label={labels.theme}
                className="flex items-center justify-center size-10 rounded-full bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                onClick={toggleTheme}
                type="button"
              >
                <span className="material-symbols-outlined text-sm">dark_mode</span>
              </button>

              <button
                aria-label={labels.cta}
                className="md:hidden flex items-center justify-center size-10 rounded-full bg-primary text-black hover:brightness-105 transition-all shadow-[0_10px_30px_rgba(249,245,6,0.22)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                aria-haspopup="dialog"
                data-calendly-open="true"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">event</span>
              </button>

              <button
                className="hidden md:flex h-10 px-6 items-center justify-center rounded-full bg-primary text-black text-sm font-bold tracking-wide hover:brightness-105 transition-all"
                aria-haspopup="dialog"
                data-calendly-open="true"
                type="button"
              >
                {labels.cta}
              </button>

              <button
                aria-label={labels.menu}
                aria-expanded={mobileMenuOpen}
                aria-haspopup="dialog"
                className="md:hidden flex items-center justify-center size-10 rounded-full bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                onClick={() => setMobileMenuOpen(true)}
                type="button"
              >
                <span className="material-symbols-outlined">menu</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {mounted ? (
        <MobileMenuPortal
          open={mobileMenuOpen}
          labels={labels}
          links={mobileNavLinks}
          currentLocale={currentLocale}
          onClose={closeMobileMenu}
          onSelectLocale={onSelectLocale}
          onToggleTheme={toggleTheme}
          menuRef={mobileMenuRef}
        />
      ) : null}
    </>
  );
}

function MobileMenuPortal({
  open,
  labels,
  links,
  currentLocale,
  onClose,
  onSelectLocale,
  onToggleTheme,
  menuRef,
}: {
  open: boolean;
  labels: (typeof LABELS)[keyof typeof LABELS];
  links: ReadonlyArray<{ href: string; label: string }>;
  currentLocale: SupportedLocale;
  onClose: () => void;
  onSelectLocale: (locale: SupportedLocale) => void;
  onToggleTheme: () => void;
  menuRef: React.RefObject<HTMLDivElement | null>;
}) {
  if (!open) return null;
  if (typeof document === "undefined") return null;

  return createPortal(
    <div className="md:hidden fixed inset-0 z-[9998]" role="dialog" aria-modal="true" aria-label={labels.menu}>
      <div aria-hidden="true" className="absolute inset-0 bg-black/70" />

      <div
        ref={menuRef}
        className="absolute inset-0 bg-white dark:bg-background-dark shadow-[0_24px_90px_rgba(0,0,0,0.32)]"
      >
        <div className="sticky top-0 z-10 h-24 px-4 sm:px-6 flex items-center justify-between border-b border-gray-100 dark:border-white/10 bg-white dark:bg-background-dark">
          <div className="text-sm font-black text-text-main dark:text-white">{labels.menu}</div>
          <button
            aria-label="Close menu"
            className="inline-flex items-center justify-center size-10 rounded-full bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
            onClick={onClose}
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="px-4 sm:px-6 py-5 overflow-y-auto" style={{ maxHeight: "calc(100vh - 96px)" }}>
          <div className="space-y-1">
            {links.map((item) => (
              <Link
                key={item.href}
                className="flex items-center justify-between rounded-xl px-4 py-3 text-base font-bold text-text-main dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                href={item.href}
                onClick={onClose}
              >
                <span>{item.label}</span>
                <span className="material-symbols-outlined text-[18px] text-text-muted dark:text-gray-400">
                  chevron_right
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-gray-100 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-4">
            <div className="text-xs font-black uppercase tracking-widest text-text-muted dark:text-gray-400">
              {labels.lang}
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {LOCALE_MENU.map((item) => {
                const active = item.locale === currentLocale;
                return (
                  <button
                    key={item.locale}
                    className={[
                      "h-10 rounded-xl text-sm font-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
                      active
                        ? "bg-primary text-black"
                        : "bg-white dark:bg-white/10 text-text-main dark:text-white hover:bg-gray-100 dark:hover:bg-white/20",
                    ].join(" ")}
                    onClick={() => onSelectLocale(item.locale)}
                    type="button"
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>

            <div className="mt-4 flex items-center justify-between gap-3">
              <div className="text-xs font-black uppercase tracking-widest text-text-muted dark:text-gray-400">
                {labels.theme}
              </div>
              <button
                className="inline-flex items-center justify-center h-10 px-4 rounded-xl bg-white dark:bg-white/10 hover:bg-gray-100 dark:hover:bg-white/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                onClick={onToggleTheme}
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">dark_mode</span>
              </button>
            </div>
          </div>

          <button
            className="mt-6 w-full h-12 rounded-2xl bg-primary text-black font-black tracking-wide hover:brightness-105 transition-all shadow-[0_16px_45px_rgba(249,245,6,0.20)]"
            aria-haspopup="dialog"
            data-calendly-open="true"
            onClick={onClose}
            type="button"
          >
            {labels.cta}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
