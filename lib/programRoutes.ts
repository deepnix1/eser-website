import type { CountryId } from "./programCatalog";

export const COUNTRY_SLUG: Record<CountryId, string> = {
  Germany: "germany",
  USA: "usa",
  Netherlands: "netherlands",
  "United Kingdom": "united-kingdom",
  Canada: "canada",
  Ireland: "ireland",
  Malta: "malta",
};

export const SLUG_TO_COUNTRY = Object.fromEntries(
  Object.entries(COUNTRY_SLUG).map(([key, value]) => [value, key]),
) as Record<string, CountryId>;

export function getProgramDetailPath(countryId: CountryId, programId: string) {
  return `/program-detail/${COUNTRY_SLUG[countryId]}/${programId}`;
}

