import React, { useEffect, useMemo, useRef } from "react";

import type { Program } from "../../lib/programCatalog";
import ProgramCard from "./ProgramCard";
import { ProgramCardSkeleton } from "./ProgramSkeleton";

type ProgramListProps = {
  programs: readonly Program[];
  selectedProgramId: string | null;
  onSelectProgram: (programId: string) => void;
  getDetailsHref?: (programId: string) => string;
  detailsLabel?: string;
  variant?: "list" | "grid";
  sticky?: boolean;
  scroll?: boolean;
  ui: {
    listTitle: string;
    listHint: string;
    listAria: string;
    listEmptyTitle: string;
    listEmptyBody: string;
  };
  badgeLabels: Record<NonNullable<Program["badge"]>, string>;
  isLoading?: boolean;
};

export default function ProgramList({
  programs,
  selectedProgramId,
  onSelectProgram,
  getDetailsHref,
  detailsLabel,
  variant = "list",
  sticky = true,
  scroll = true,
  ui,
  badgeLabels,
  isLoading = false,
}: ProgramListProps) {
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const selectedIndex = useMemo(() => {
    if (!selectedProgramId) return 0;
    const idx = programs.findIndex((program) => program.id === selectedProgramId);
    return idx >= 0 ? idx : 0;
  }, [programs, selectedProgramId]);

  useEffect(() => {
    buttonRefs.current = buttonRefs.current.slice(0, programs.length);
  }, [programs.length]);

  const onKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (!programs.length) return;
    const isArrowDown = event.key === "ArrowDown";
    const isArrowUp = event.key === "ArrowUp";
    const isHome = event.key === "Home";
    const isEnd = event.key === "End";
    const isEnter = event.key === "Enter";
    const isSpace = event.key === " ";
    if (!(isArrowDown || isArrowUp || isHome || isEnd || isEnter || isSpace)) return;

    event.preventDefault();

    if (isEnter || isSpace) {
      const currentProgram = programs[selectedIndex];
      if (currentProgram) onSelectProgram(currentProgram.id);
      return;
    }

    let nextIndex = selectedIndex;
    if (isHome) nextIndex = 0;
    if (isEnd) nextIndex = programs.length - 1;
    if (isArrowDown) nextIndex = Math.min(programs.length - 1, selectedIndex + 1);
    if (isArrowUp) nextIndex = Math.max(0, selectedIndex - 1);

    const nextProgram = programs[nextIndex];
    if (!nextProgram) return;
    onSelectProgram(nextProgram.id);
    buttonRefs.current[nextIndex]?.focus();
  };

  return (
    <div className={sticky ? "lg:sticky lg:top-28" : undefined}>
      <div className="flex items-center justify-between">
        <div className="text-base font-black text-text-main dark:text-white">
          {ui.listTitle}
        </div>
        <div className="text-xs font-bold text-text-muted dark:text-gray-400">
          {ui.listHint}
        </div>
      </div>

      <div
        className="mt-4 rounded-[2rem] lotus-glass p-3"
        role="listbox"
        aria-label={ui.listAria}
        tabIndex={0}
        onKeyDown={onKeyDown}
      >
        <div
          className={[
            scroll ? "max-h-[520px] lg:max-h-[calc(100vh-420px)] overflow-auto no-scrollbar pr-1" : "",
            variant === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
              : "space-y-3",
          ].join(" ")}
        >
        {isLoading ? (
          <>
            {Array.from({ length: 5 }).map((_, idx) => (
              <ProgramCardSkeleton key={idx} />
            ))}
          </>
        ) : programs.length ? (
          programs.map((program, index) => (
            <ProgramCard
              key={program.id}
              program={program}
              isActive={program.id === selectedProgramId}
              onSelect={() => onSelectProgram(program.id)}
              badgeLabels={badgeLabels}
              detailsHref={getDetailsHref?.(program.id)}
              detailsLabel={detailsLabel}
              ref={(node) => {
                buttonRefs.current[index] = node;
              }}
            />
          ))
        ) : (
          <div className="rounded-3xl border border-gray-100 dark:border-white/10 bg-white/70 dark:bg-white/5 p-5">
            <div className="text-sm font-black text-text-main dark:text-white">
              {ui.listEmptyTitle}
            </div>
            <div className="mt-1 text-sm text-text-muted dark:text-gray-400">
              {ui.listEmptyBody}
            </div>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}
