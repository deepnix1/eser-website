import React, { forwardRef } from "react";
import { useRouter } from "next/router";

import type { Program } from "../../lib/programCatalog";
import { normalizeLocale } from "../../lib/i18n";

type ProgramCardProps = {
  program: Program;
  isActive: boolean;
  onSelect: () => void;
  badgeLabels: Record<NonNullable<Program["badge"]>, string>;
  detailsHref?: string;
  detailsLabel?: string;
};

const ProgramCard = forwardRef<HTMLButtonElement, ProgramCardProps>(
  function ProgramCard({ program, isActive, onSelect, badgeLabels, detailsHref, detailsLabel }, ref) {
    const router = useRouter();
    const locale = normalizeLocale(router.locale);

    const openDetails = (event: React.MouseEvent | React.KeyboardEvent) => {
      if (!detailsHref) return;
      event.preventDefault();
      event.stopPropagation();
      void router.push(detailsHref, undefined, { locale });
    };

    return (
      <button
        ref={ref}
        className={[
          "group relative w-full text-left rounded-3xl px-5 py-4 transition-all lotus-glass",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background-light dark:focus-visible:ring-offset-background-dark",
          isActive
            ? "lotus-glow-primary"
            : "hover:-translate-y-0.5 hover:shadow-[0_28px_85px_rgba(0,0,0,0.14),0_0_0_1px_rgba(249,245,6,0.14)]",
          isActive
            ? "before:content-[''] before:absolute before:left-0 before:top-4 before:bottom-4 before:w-1 before:rounded-full before:bg-primary"
            : "before:content-[''] before:absolute before:left-0 before:top-4 before:bottom-4 before:w-1 before:rounded-full before:bg-primary/0 group-hover:before:bg-primary/30 before:transition-colors",
          "after:content-[''] after:absolute after:inset-0 after:opacity-0 after:pointer-events-none after:transition-opacity after:duration-300 motion-reduce:after:transition-none",
          "after:bg-[linear-gradient(100deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.55)_45%,rgba(255,255,255,0)_60%)] after:translate-x-[-140%] group-hover:after:opacity-100 group-hover:after:translate-x-[140%] after:transition-transform after:duration-[1100ms] after:ease-out motion-reduce:after:transition-none",
          "dark:after:bg-[linear-gradient(100deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.18)_45%,rgba(255,255,255,0)_60%)]",
        ].join(" ")}
        onClick={onSelect}
        role="option"
        aria-selected={isActive}
        type="button"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="text-[15px] font-black text-text-main dark:text-white leading-snug">
              {program.title}
            </div>
            <div className="mt-1 text-sm text-text-muted dark:text-gray-400 leading-relaxed">
              {program.tagline}
            </div>

            <div className="mt-3 flex items-center justify-between gap-3">
              {detailsHref && detailsLabel ? (
                <span
                  className="inline-flex items-center gap-1 text-xs font-black text-text-muted dark:text-gray-400 hover:text-text-main dark:hover:text-white transition-colors"
                  role="link"
                  tabIndex={0}
                  onClick={openDetails}
                  onKeyDown={(event) => {
                    if (event.key !== "Enter" && event.key !== " ") return;
                    openDetails(event);
                  }}
                >
                  <span className="underline underline-offset-4 decoration-primary/60">
                    {detailsLabel}
                  </span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </span>
              ) : (
                <span className="text-xs font-black text-text-muted dark:text-gray-400">
                  &nbsp;
                </span>
              )}
              <span
                className={[
                  "material-symbols-outlined text-[18px] transition-transform duration-300 motion-reduce:transition-none",
                  "text-text-muted dark:text-gray-400",
                  isActive ? "translate-x-0" : "group-hover:translate-x-0.5",
                ].join(" ")}
                aria-hidden="true"
              >
                chevron_right
              </span>
            </div>
          </div>

          {program.badge ? (
            <span
              className={[
                "shrink-0 inline-flex items-center rounded-full px-3 py-1.5 text-[11px] font-black",
                program.badge === "Shared"
                  ? "bg-black text-white"
                  : "bg-primary text-black",
              ].join(" ")}
            >
              {badgeLabels[program.badge] ?? program.badge}
            </span>
          ) : null}
        </div>
      </button>
    );
  },
);

export default ProgramCard;
