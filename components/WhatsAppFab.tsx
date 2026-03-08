import React, { useEffect, useMemo, useState } from "react";

import { buildWhatsAppUrl } from "../lib/whatsapp";

const STORAGE_KEY = "lotus_whatsapp_fab_dismissed_until";
const DISMISS_DAYS = 14;

function readDismissedUntil(): number | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage?.getItem(STORAGE_KEY);
    if (!raw) return null;
    const ts = Number(raw);
    if (!Number.isFinite(ts)) return null;
    return ts;
  } catch {
    return null;
  }
}

function writeDismissedUntil(ts: number) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage?.setItem(STORAGE_KEY, String(ts));
  } catch {
    // ignore
  }
}

export default function WhatsAppFab({ locale }: { locale?: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissedUntil = readDismissedUntil();
    if (dismissedUntil && dismissedUntil > Date.now()) {
      setVisible(false);
      return;
    }
    setVisible(true);
  }, []);

  const href = useMemo(() => buildWhatsAppUrl({ locale }), [locale]);

  if (!visible) return null;

  return (
    <div
      className="md:hidden fixed right-4 z-40 flex flex-col items-end gap-2"
      style={{ bottom: "calc(env(safe-area-inset-bottom) + 16px)" }}
    >
      <button
        aria-label="WhatsApp kisayolunu kapat"
        className="inline-flex items-center justify-center size-9 rounded-full bg-white/95 dark:bg-background-dark/95 border border-gray-200/70 dark:border-white/10 shadow-[0_10px_28px_rgba(0,0,0,0.16)] backdrop-blur-md text-text-main dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
        onClick={() => {
          const until = Date.now() + DISMISS_DAYS * 24 * 60 * 60 * 1000;
          writeDismissedUntil(until);
          setVisible(false);
        }}
        type="button"
      >
        <span className="material-symbols-outlined text-[18px]">close</span>
      </button>

      <a
        className="group inline-flex items-center gap-3 rounded-full bg-[#25D366] text-white px-4 py-3 shadow-[0_16px_45px_rgba(37,211,102,0.35)] active:scale-[0.98] transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]/50"
        href={href}
        rel="noopener noreferrer"
        target="_blank"
      >
        <span className="sr-only">WhatsApp ile yaz</span>
        <svg
          aria-hidden="true"
          viewBox="0 0 32 32"
          className="size-6"
          fill="currentColor"
        >
          <path d="M19.11 17.15c-.27-.14-1.6-.79-1.85-.88-.25-.09-.44-.14-.62.14-.18.27-.71.88-.87 1.06-.16.18-.32.21-.59.07-.27-.14-1.15-.42-2.2-1.35-.81-.72-1.36-1.61-1.52-1.88-.16-.27-.02-.41.12-.55.13-.13.27-.32.41-.48.14-.16.18-.27.27-.46.09-.18.05-.34-.02-.48-.07-.14-.62-1.5-.85-2.05-.22-.53-.45-.46-.62-.47h-.53c-.18 0-.48.07-.73.34-.25.27-.96.94-.96 2.3 0 1.36.99 2.68 1.13 2.86.14.18 1.95 2.97 4.72 4.16.66.28 1.18.45 1.58.58.66.21 1.26.18 1.73.11.53-.08 1.6-.65 1.83-1.28.23-.62.23-1.16.16-1.28-.07-.11-.25-.18-.52-.32z" />
          <path d="M26.69 5.31C24.09 2.71 20.63 1.28 16.99 1.28 9.61 1.28 3.61 7.28 3.61 14.66c0 2.36.62 4.65 1.8 6.68L3.5 30.72l9.58-1.87c1.95 1.06 4.14 1.62 6.36 1.62h.01c7.38 0 13.38-6 13.38-13.38 0-3.64-1.42-7.1-4.14-9.78zm-7.25 22.3h-.01c-2.02 0-4-.54-5.73-1.56l-.41-.24-5.69 1.11 1.08-5.54-.27-.43c-1.06-1.68-1.62-3.63-1.62-5.63 0-5.86 4.77-10.63 10.63-10.63 2.84 0 5.49 1.11 7.5 3.12 2.01 2.01 3.12 4.69 3.12 7.53 0 5.86-4.77 10.63-10.6 10.63z" />
        </svg>
        <span className="text-sm font-black tracking-wide">WhatsApp</span>
        <span
          aria-hidden="true"
          className="material-symbols-outlined text-[18px] opacity-80 group-hover:opacity-100 transition-opacity"
        >
          north_east
        </span>
      </a>
    </div>
  );
}

