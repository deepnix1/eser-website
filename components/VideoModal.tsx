import { useEffect, useMemo, useRef, useState } from "react";

type VideoModalProps = {
  open: boolean;
  onClose: () => void;
  restoreFocusTo?: HTMLElement | null;
  src?: string | null;
  title?: string;
  subtitle?: string;
  poster?: string;
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
  const nodes = Array.from(container.querySelectorAll<HTMLElement>(selectors.join(",")));
  return nodes.filter((el) => {
    const style = window.getComputedStyle(el);
    return style.visibility !== "hidden" && style.display !== "none";
  });
}

export default function VideoModal({
  open,
  onClose,
  restoreFocusTo,
  src,
  title = "Video",
  subtitle,
  poster,
}: VideoModalProps) {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const normalizedSrc = useMemo(() => (src ?? "").trim(), [src]);

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

    setIsReady(false);
    setError(null);

    if (!normalizedSrc) {
      setError("Video bağlantısı henüz ayarlanmadı.");
      return;
    }
  }, [open, normalizedSrc]);

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

  useEffect(() => {
    if (!open) return;
    const video = videoRef.current;
    if (!video) return;

    const onCanPlay = () => setIsReady(true);
    const onError = () => {
      setError("Video yüklenemedi. Lütfen daha sonra tekrar deneyin.");
    };

    video.addEventListener("canplay", onCanPlay);
    video.addEventListener("error", onError);
    return () => {
      video.removeEventListener("canplay", onCanPlay);
      video.removeEventListener("error", onError);
    };
  }, [open, normalizedSrc]);

  useEffect(() => {
    if (!open) return;
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    const playPromise = video.play();
    if (playPromise && typeof (playPromise as any).catch === "function") {
      (playPromise as any).catch(() => {});
    }
    return () => {
      try {
        video.pause();
      } catch {}
      try {
        video.removeAttribute("src");
        video.load();
      } catch {}
    };
  }, [open, normalizedSrc]);

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
        aria-hidden="true"
        className="absolute inset-0 bg-black/60 backdrop-blur-[2px] motion-reduce:transition-none transition-opacity duration-200"
      />

      <div
        aria-label={title}
        aria-modal="true"
        className="relative w-full max-w-4xl rounded-[2rem] bg-white dark:bg-[#323226] border border-gray-100 dark:border-white/10 shadow-[0_35px_120px_rgba(0,0,0,0.45)] overflow-hidden motion-reduce:transition-none transition-transform duration-200 motion-safe:animate-[modalIn_200ms_ease-out]"
        ref={dialogRef}
        role="dialog"
      >
        <div className="flex items-center justify-between gap-4 px-6 sm:px-8 py-5 border-b border-gray-100 dark:border-white/10 bg-white/80 dark:bg-[#323226]/90 backdrop-blur">
          <div className="min-w-0">
            <div className="text-sm font-black tracking-tight text-text-main dark:text-white truncate">
              {title}
            </div>
            {subtitle ? (
              <div className="text-xs text-text-muted dark:text-gray-400 truncate">
                {subtitle}
              </div>
            ) : null}
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

        <div className="relative h-[78vh] max-h-[78vh] sm:h-[76vh] sm:max-h-[76vh] bg-black">
          <video
            className="absolute inset-0 h-full w-full"
            controls
            playsInline
            preload="metadata"
            poster={poster}
            ref={videoRef}
            src={normalizedSrc || undefined}
          />

          {!error && !isReady ? (
            <div className="absolute inset-0 flex items-center justify-center bg-black/55 backdrop-blur-[1px]">
              <div className="flex flex-col items-center gap-3">
                <div className="size-10 rounded-full border-2 border-white/20 border-t-primary animate-spin motion-reduce:animate-none" />
                <div className="text-sm font-bold text-white">Video yükleniyor…</div>
              </div>
            </div>
          ) : null}

          {error ? (
            <div className="absolute inset-0 flex items-center justify-center bg-black/70 backdrop-blur-[1px] px-6">
              <div className="max-w-md text-center">
                <div className="text-lg font-black text-white">Video açılamadı</div>
                <div className="mt-2 text-sm text-white/80">{error}</div>
                <button
                  className="mt-6 h-11 px-6 rounded-full bg-primary text-black text-sm font-black hover:brightness-105 transition-all"
                  onClick={onClose}
                  type="button"
                >
                  Kapat
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
