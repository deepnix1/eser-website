import Link from "next/link";
import React from "react";

import LotusAbroadLogo from "./LotusAbroadLogo";

const SOCIAL_LINKS = {
  instagram: "#",
  facebook: "#",
  x: "#",
} as const;

export default function SiteFooter() {
  return (
    <footer className="bg-background-light dark:bg-background-dark pt-14 pb-8 border-t border-gray-200 dark:border-white/5">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3 md:items-center">
          <div className="flex justify-center md:justify-start">
            <LotusAbroadLogo size="xl" />
          </div>

          <nav aria-label="Footer links" className="flex justify-center">
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-text-muted dark:text-gray-400">
              <Link className="hover:text-primary transition-colors" href="/privacy-policy">
                Gizlilik Politikası
              </Link>
              <Link className="hover:text-primary transition-colors" href="/terms-of-service">
                Kullanım Şartları
              </Link>
              <Link className="hover:text-primary transition-colors" href="/cookie-policy">
                Çerez Politikası
              </Link>
            </div>
          </nav>

          <div className="flex justify-center md:justify-end gap-4">
            <a
              className="w-10 h-10 rounded-full bg-white dark:bg-white/5 flex items-center justify-center text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-white/10 hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
              href={SOCIAL_LINKS.instagram}
              aria-label="Instagram"
              target="_blank"
              rel="noreferrer"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm9 2h-9A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm5.6-2.4a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2Z"
                />
              </svg>
            </a>

            <a
              className="w-10 h-10 rounded-full bg-white dark:bg-white/5 flex items-center justify-center text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-white/10 hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
              href={SOCIAL_LINKS.facebook}
              aria-label="Facebook"
              target="_blank"
              rel="noreferrer"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M13.5 22v-8h2.7l.5-3h-3.2V9.1c0-.9.4-1.6 1.7-1.6h1.6V5a22 22 0 0 0-2.4-.1c-2.6 0-4.3 1.6-4.3 4.4V11H7v3h3.1v8H13.5Z"
                />
              </svg>
            </a>

            <a
              className="w-10 h-10 rounded-full bg-white dark:bg-white/5 flex items-center justify-center text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-white/10 hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
              href={SOCIAL_LINKS.x}
              aria-label="X"
              target="_blank"
              rel="noreferrer"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M18.3 2H21l-6.5 7.4L22 22h-6.2l-4.8-6.6L5.2 22H2.5l7-8L2 2h6.3l4.4 6.1L18.3 2Zm-1.1 18h1.5L6.7 3.9H5.1L17.2 20Z"
                />
              </svg>
            </a>
          </div>
        </div>

        <div className="text-center mt-10 text-xs text-text-muted dark:text-gray-600">
          © {new Date().getFullYear()} Lotus Abroad. Tüm hakları saklıdır.
        </div>
      </div>
    </footer>
  );
}
