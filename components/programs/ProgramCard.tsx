import React, { forwardRef } from "react";

import type { Program } from "../../lib/programCatalog";

type ProgramCardProps = {
  program: Program;
  isActive: boolean;
  onSelect: () => void;
  badgeLabels: Record<NonNullable<Program["badge"]>, string>;
};

const ProgramCard = forwardRef<HTMLButtonElement, ProgramCardProps>(
  function ProgramCard({ program, isActive, onSelect, badgeLabels }, ref) {
    return (
      <button
        ref={ref}
        className={[
          "group w-full text-left rounded-3xl border px-4 py-4 transition-all",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background-light dark:focus-visible:ring-offset-background-dark",
          isActive
            ? "bg-[#e9e8df] dark:bg-white/10 border-black/10 dark:border-white/10 shadow-[0_18px_40px_rgba(0,0,0,0.06)]"
            : "bg-white/70 dark:bg-white/5 border-gray-100 dark:border-white/10 hover:bg-white hover:dark:bg-white/10 hover:-translate-y-0.5 hover:shadow-[0_20px_55px_rgba(0,0,0,0.10)]",
        ].join(" ")}
        onClick={onSelect}
        role="option"
        aria-selected={isActive}
        type="button"
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-base font-black text-text-main dark:text-white leading-snug">
              {program.title}
            </div>
            <div className="mt-1 text-sm text-text-muted dark:text-gray-400 leading-relaxed">
              {program.tagline}
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

        <div
          className={[
            "mt-3 h-[2px] w-full rounded-full bg-black/5 dark:bg-white/10 overflow-hidden",
          ].join(" ")}
          aria-hidden="true"
        >
          <div
            className={[
              "h-full w-0 bg-primary transition-all duration-300 ease-out",
              "group-hover:w-full",
              isActive ? "w-full" : "",
            ].join(" ")}
          />
        </div>
      </button>
    );
  },
);

export default ProgramCard;
