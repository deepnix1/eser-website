import React, { useMemo } from "react";

import type { CountryId } from "../../lib/programCatalog";
import {
  CITY_SCHOOL_RECOMMENDATIONS,
  type CitySchoolRecommendation,
} from "../../lib/citySchoolRecommendations";

function RecommendationCard({ item }: { item: CitySchoolRecommendation }) {
  return (
    <div
      className={[
        "group relative overflow-hidden rounded-3xl bg-white/70 dark:bg-white/5 p-5",
        "ring-1 ring-black/5 dark:ring-white/10",
        "transition-all duration-300 ease-out will-change-transform",
        "hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(0,0,0,0.14)] hover:ring-black/10 dark:hover:ring-white/15",
      ].join(" ")}
    >
      <div
        aria-hidden="true"
        className={[
          "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300",
          "bg-[radial-gradient(circle_at_top,rgba(249,245,6,0.22),transparent_60%)]",
          "group-hover:opacity-100",
        ].join(" ")}
      />

      <div className="relative flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-text-muted dark:text-gray-300">
              location_city
            </span>
            <div className="text-lg font-black text-text-main dark:text-white truncate">
              {item.city}
            </div>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {item.highlights.slice(0, 3).map((highlight) => (
              <span
                key={highlight}
                className="inline-flex items-center rounded-full bg-[#e9e8df] dark:bg-white/10 text-xs font-bold text-text-main dark:text-white px-3 py-1"
              >
                {highlight}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="relative mt-4 rounded-2xl bg-white/60 dark:bg-white/0 ring-1 ring-black/5 dark:ring-white/10 p-4">
        <div className="flex items-center gap-2 text-base font-black text-text-main dark:text-white">
          <span className="material-symbols-outlined text-[18px] text-text-muted dark:text-gray-300">
            school
          </span>
          Okul Önerileri
        </div>
        <ul className="mt-3 space-y-2 text-base text-text-muted dark:text-gray-400">
          {item.schools.slice(0, 4).map((school) => (
            <li className="flex items-start gap-2" key={school}>
              <span className="material-symbols-outlined text-[18px] text-primary shrink-0">
                arrow_right
              </span>
              <span className="leading-snug">{school}</span>
            </li>
          ))}
        </ul>
        {item.note ? (
          <div className="mt-3 text-sm text-text-muted dark:text-gray-400">
            {item.note}
          </div>
        ) : null}
      </div>

      <div
        className="relative mt-4 h-[2px] w-full rounded-full bg-black/5 dark:bg-white/10 overflow-hidden"
        aria-hidden="true"
      >
        <div className="h-full w-0 bg-primary transition-all duration-300 ease-out group-hover:w-full" />
      </div>
    </div>
  );
}

export default function CitySchoolRecommendations({
  countryId,
  countryLabel,
}: {
  countryId: CountryId;
  countryLabel: string;
}) {
  const items = useMemo(
    () => CITY_SCHOOL_RECOMMENDATIONS[countryId] ?? [],
    [countryId],
  );

  if (!items.length) return null;

  return (
    <section className="rounded-[2rem] bg-white/60 dark:bg-white/5 shadow-[0_25px_60px_rgba(0,0,0,0.06)] ring-1 ring-black/5 dark:ring-white/10 p-6 md:p-7">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-xl md:text-2xl font-black text-text-main dark:text-white">
            Şehir / Okul Önerileri
          </div>
          <div className="mt-1 text-base text-text-muted dark:text-gray-400">
            {countryLabel} için popüler şehirler ve örnek okul seçenekleri.
          </div>
        </div>
        <span className="inline-flex items-center rounded-full bg-primary text-black text-[11px] font-black px-3 py-1">
          Öneriler
        </span>
      </div>

      <div className="mt-5 grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {items.slice(0, 6).map((item) => (
          <RecommendationCard key={`${countryId}-${item.city}`} item={item} />
        ))}
      </div>

      <div className="mt-4 text-sm text-text-muted dark:text-gray-400">
        Not: Okul örnekleri bilgilendirme amaçlıdır; program uygunluğu ve kontenjan
        dönemlere göre değişebilir.
      </div>
    </section>
  );
}
