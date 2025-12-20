export type AppLocale = "tr" | "en" | "de";

export function normalizeLocale(input: string | undefined | null): AppLocale {
  if (input === "en" || input === "de" || input === "tr") return input;
  return "tr";
}

