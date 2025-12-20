import type { AppProps } from "next/app";
import { useEffect, useRef, useState } from "react";
import CalendlyModal from "../components/CalendlyModal";

const CALENDLY_EVENT_URL = process.env.NEXT_PUBLIC_CALENDLY_EVENT_URL ?? "";

export default function App({ Component, pageProps }: AppProps) {
  const [calendlyOpen, setCalendlyOpen] = useState(false);
  const lastTriggerRef = useRef<HTMLElement | null>(null);

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
      <Component {...pageProps} />
      <CalendlyModal
        onClose={() => setCalendlyOpen(false)}
        open={calendlyOpen}
        restoreFocusTo={lastTriggerRef.current}
        url={CALENDLY_EVENT_URL}
      />
    </>
  );
}
