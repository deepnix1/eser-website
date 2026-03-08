export const WHATSAPP_NUMBER_E164 =
  process.env.NEXT_PUBLIC_WHATSAPP_E164?.trim() || "905325975638";

const DEFAULT_TEXT_BY_LOCALE: Record<string, string> = {
  tr: "Merhaba! Ucretsiz degerlendirme icin bilgi almak istiyorum.",
  en: "Hi! I'd like to get info for a free assessment.",
  de: "Hallo! Ich moechte Informationen fuer eine kostenlose Einschaetzung erhalten.",
};

export function getDefaultWhatsAppText(locale?: string): string {
  if (!locale) return DEFAULT_TEXT_BY_LOCALE.tr;
  return DEFAULT_TEXT_BY_LOCALE[locale] ?? DEFAULT_TEXT_BY_LOCALE.tr;
}

export function buildWhatsAppUrl({
  text,
  locale,
}: {
  text?: string;
  locale?: string;
}): string {
  const finalText = text ?? getDefaultWhatsAppText(locale);
  return `https://wa.me/${WHATSAPP_NUMBER_E164}?text=${encodeURIComponent(finalText)}`;
}
