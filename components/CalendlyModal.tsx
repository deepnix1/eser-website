import { useEffect, useMemo, useRef, useState } from "react";

type CalendlyModalProps = {
  open: boolean;
  url: string;
  onClose: () => void;
  restoreFocusTo?: HTMLElement | null;
};



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
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const normalizedUrl = useMemo(() => url.trim(), [url]);
  const embedUrl = useMemo(() => {
    if (!normalizedUrl) return "";
    const hasQuery = normalizedUrl.includes("?");
    return (
      normalizedUrl +
      (hasQuery ? "&" : "?") +
      "embed_domain=lotusabroad.net&embed_type=Inline&hide_gdpr_banner=1"
    );
  }, [normalizedUrl]);

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

    const iframe = iframeRef.current;
    if (!iframe) return;

    if (!embedUrl) {
      setIsLoading(false);
      setError("Calendly URL is not configured.");
      return;
    }

    let cancelled = false;
    const fallbackId = window.setTimeout(() => {
      if (cancelled) return;
      setIsLoading(false);
      setError("Calendly failed to load");
    }, 12000);

    iframe.src = embedUrl;

    return () => {
      cancelled = true;
      window.clearTimeout(fallbackId);
      iframe.removeAttribute("src");
      setIsLoading(false);
      setIsReady(false);
    };
  }, [open, embedUrl]);

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
          <iframe
            className="absolute inset-0 h-full w-full"
            ref={iframeRef}
            title="Calendly scheduling"
            onLoad={() => {
              setIsReady(true);
              setIsLoading(false);
            }}
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
