import React, { useCallback } from "react";

import LotusAbroadLogo from "./LotusAbroadLogo";

export default function SiteHeader() {
  const toggleTheme = useCallback(() => {
    if (typeof document === "undefined") return;
    document.documentElement.classList.toggle("dark");
  }, []);

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
              <a className="text-sm font-medium hover:text-primary transition-colors" href="/">
                Ana Sayfa
              </a>
              <a className="text-sm font-medium hover:text-primary transition-colors" href="/programs">
                Programlar
              </a>
              <a
                className="text-sm font-medium hover:text-primary transition-colors"
                href="/#destinations"
              >
                Ülkeler
              </a>
              <a className="text-sm font-medium hover:text-primary transition-colors" href="/blog">
                Blog
              </a>
              <a className="text-sm font-medium hover:text-primary transition-colors" href="/about">
                Hakkımızda
              </a>
              <a className="text-sm font-medium hover:text-primary transition-colors" href="/contact">
                İletişim
              </a>
            </div>
          </nav>

          <div className="flex items-center gap-3 shrink-0">
            <button
              className="hidden sm:flex items-center justify-center size-10 rounded-full bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 transition-colors"
              type="button"
            >
              <span className="material-symbols-outlined text-sm">translate</span>
            </button>

            <button
              className="flex items-center justify-center size-10 rounded-full bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 transition-colors"
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
              Ücretsiz Görüşme
            </button>

            <button
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

