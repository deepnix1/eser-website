import { useEffect, useMemo, useRef, useState } from "react";

type CalendlyModalProps = {
  open: boolean;
  url: string;
  onClose: () => void;
  restoreFocusTo?: HTMLElement | null;
};

let calendlyScriptPromise: Promise<void> | null = null;

function loadCalendlyScriptOnce(): Promise<void> {
  if (typeof document === "undefined") return Promise.resolve();
  if (calendlyScriptPromise) return calendlyScriptPromise;

  const existing = document.querySelector<HTMLScriptElement>(
    'script[data-calendly-widget="true"]',
  );
  if (existing && (existing as any).__loaded) {
    calendlyScriptPromise = Promise.resolve();
    return calendlyScriptPromise;
  }

  calendlyScriptPromise = new Promise<void>((resolve, reject) => {
    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener(
        "error",
        () => reject(new Error("Calendly script failed to load")),
        { once: true },
      );
      return;
    }

    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    script.defer = true;
    script.dataset.calendlyWidget = "true";
    script.addEventListener("load", () => {
      (script as any).__loaded = true;
      resolve();
    });
    script.addEventListener("error", () => {
      reject(new Error("Calendly script failed to load"));
    });
    document.head.appendChild(script);
  });

  return calendlyScriptPromise;
}

function getFocusableElements(container: HTMLElement) {
  const selectors = [
    'a[href]:not([tabindex="-1"])',
    'button:not([disabled]):not([tabindex="-1"])',
    'textarea:not([disabled]):not([tabindex="-1"])',
    'input:not([disabled]):not([tabindex="-1"])',
    'select:not([disabled]):not([tabindex="-1"])',
    '[tabindex]:not([tabindex="-1"])',
  ];
  const nodes = Array.from(container.querySelectorAll<HTMLElement>(
    selectors.join(","),
  ));
  return nodes.filter((el) => {
    const style = window.getComputedStyle(el);
    return style.visibility !== "hidden" && style.display !== "none";
  });
}

export default function CalendlyModal({
  open,
  url,
  onClose,
  restoreFocusTo,
}: CalendlyModalProps) {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const embedRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const normalizedUrl = useMemo(() => url.trim(), [url]);

  useEffect(() => {
    if (!open) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") return;
      const dialog = dialogRef.current;
      if (!dialog) return;
      const focusables = getFocusableElements(dialog);
      if (!focusables.length) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (event.shiftKey) {
        if (!active || active === first) {
          event.preventDefault();
          last.focus();
        }
        return;
      }

      if (active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown, true);
    return () => document.removeEventListener("keydown", onKeyDown, true);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    setIsLoading(true);
    setIsReady(false);
    setError(null);

    const embed = embedRef.current;
    if (!embed) return;
    embed.innerHTML = "";

    if (!normalizedUrl) {
      setIsLoading(false);
      setError("Calendly URL is not configured.");
      return;
    }

    let observer: MutationObserver | null = null;
    let cancelled = false;

    loadCalendlyScriptOnce()
      .then(() => {
        if (cancelled) return;

        const Calendly = (window as any).Calendly as
          | { initInlineWidget: (opts: { url: string; parentElement: Element }) => void }
          | undefined;

        if (!Calendly?.initInlineWidget) {
          throw new Error("Calendly widget API not available");
        }

        Calendly.initInlineWidget({ url: normalizedUrl, parentElement: embed });

        observer = new MutationObserver(() => {
          if (!embed.querySelector("iframe")) return;
          setIsReady(true);
          setIsLoading(false);
          observer?.disconnect();
          observer = null;
        });
        observer.observe(embed, { childList: true, subtree: true });

        window.setTimeout(() => {
          if (embed.querySelector("iframe")) {
            setIsReady(true);
            setIsLoading(false);
            observer?.disconnect();
            observer = null;
          }
        }, 1500);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setIsLoading(false);
        setError(err instanceof Error ? err.message : "Calendly failed to load");
      });

    return () => {
      cancelled = true;
      observer?.disconnect();
      observer = null;
      embed.innerHTML = "";
      setIsLoading(false);
      setIsReady(false);
    };
  }, [open, normalizedUrl]);

  useEffect(() => {
    if (!open) return;
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const focusTarget = closeButtonRef.current;
    if (!focusTarget) return;

    if (prefersReducedMotion) {
      focusTarget.focus();
      return;
    }

    const id = window.setTimeout(() => focusTarget.focus(), 120);
    return () => window.clearTimeout(id);
  }, [open]);

  useEffect(() => {
    if (open) return;
    if (!restoreFocusTo) return;
    try {
      restoreFocusTo.focus();
    } catch {}
  }, [open, restoreFocusTo]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center px-4 py-6"
      onMouseDown={(event) => {
        const dialog = dialogRef.current;
        if (dialog && dialog.contains(event.target as Node)) return;
        onClose();
      }}
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-[2px] motion-reduce:transition-none transition-opacity duration-200"
        aria-hidden="true"
      />

      <div
        aria-label="Book an appointment"
        aria-modal="true"
        className="relative w-full max-w-5xl rounded-[2rem] bg-white dark:bg-[#323226] border border-gray-100 dark:border-white/10 shadow-[0_35px_120px_rgba(0,0,0,0.45)] overflow-hidden motion-reduce:transition-none transition-transform duration-200 motion-safe:animate-[modalIn_200ms_ease-out]"
        ref={dialogRef}
        role="dialog"
      >
        <div className="flex items-center justify-between gap-4 px-6 sm:px-8 py-5 border-b border-gray-100 dark:border-white/10 bg-white/80 dark:bg-[#323226]/90 backdrop-blur">
          <div className="min-w-0">
            <div className="text-sm font-black tracking-tight text-text-main dark:text-white">
              Book Now
            </div>
            <div className="text-xs text-text-muted dark:text-gray-400 truncate">
              Schedule your free consultation
            </div>
          </div>
          <button
            aria-label="Close modal"
            className="inline-flex items-center justify-center size-10 rounded-full bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 transition-colors"
            onClick={onClose}
            ref={closeButtonRef}
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="relative h-[78vh] max-h-[78vh] sm:h-[76vh] sm:max-h-[76vh]">
          <div
            className="absolute inset-0"
            ref={embedRef}
            style={{ minWidth: "320px", height: "100%" }}
          />

          {isLoading || !isReady ? (
            <div className="absolute inset-0 flex items-center justify-center bg-white/65 dark:bg-[#323226]/65 backdrop-blur-sm">
              <div className="flex flex-col items-center gap-3">
                <div className="size-10 rounded-full border-2 border-black/10 dark:border-white/15 border-t-black dark:border-t-primary animate-spin motion-reduce:animate-none" />
                <div className="text-sm font-bold text-text-main dark:text-white">
                  Loading scheduler…
                </div>
                <div className="text-xs text-text-muted dark:text-gray-400">
                  This may take a moment.
                </div>
              </div>
            </div>
          ) : null}

          {error ? (
            <div className="absolute inset-0 flex items-center justify-center bg-white/80 dark:bg-[#323226]/80 backdrop-blur-sm px-6">
              <div className="max-w-md text-center">
                <div className="text-lg font-black text-text-main dark:text-white">
                  Unable to load Calendly
                </div>
                <div className="mt-2 text-sm text-text-muted dark:text-gray-400">
                  {error}
                </div>
                <button
                  className="mt-6 h-11 px-6 rounded-full bg-primary text-black text-sm font-black hover:brightness-105 transition-all"
                  onClick={onClose}
                  type="button"
                >
                  Close
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <style jsx global>{`
        @keyframes modalIn {
          from {
            opacity: 0;
            transform: translateY(10px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          @keyframes modalIn {
            from {
              opacity: 1;
              transform: none;
            }
            to {
              opacity: 1;
              transform: none;
            }
          }
        }
      `}</style>
    </div>
  );
}
