import React from "react";

export function ProgramCardSkeleton() {
  return (
    <div className="rounded-3xl border border-gray-100 dark:border-white/10 bg-white/70 dark:bg-white/5 px-4 py-4 animate-pulse">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="h-4 w-3/4 rounded-lg bg-black/10 dark:bg-white/10" />
          <div className="mt-2 h-3 w-full rounded-lg bg-black/10 dark:bg-white/10" />
          <div className="mt-2 h-3 w-4/5 rounded-lg bg-black/10 dark:bg-white/10" />
        </div>
        <div className="h-6 w-14 rounded-full bg-black/10 dark:bg-white/10" />
      </div>
      <div className="mt-3 h-[2px] w-full rounded-full bg-black/10 dark:bg-white/10" />
    </div>
  );
}

export function ProgramDetailsSkeleton() {
  return (
    <div className="rounded-[2rem] border border-gray-100 dark:border-white/10 bg-white/70 dark:bg-white/5 shadow-[0_25px_60px_rgba(0,0,0,0.08)] p-6 md:p-7 animate-pulse">
      <div className="h-6 w-2/3 rounded-xl bg-black/10 dark:bg-white/10" />
      <div className="mt-3 h-4 w-full rounded-xl bg-black/10 dark:bg-white/10" />
      <div className="mt-2 h-4 w-5/6 rounded-xl bg-black/10 dark:bg-white/10" />

      <div className="mt-6 grid gap-4">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div
            className="rounded-3xl border border-gray-100 dark:border-white/10 bg-white dark:bg-white/5 p-5"
            key={idx}
          >
            <div className="h-4 w-1/3 rounded-lg bg-black/10 dark:bg-white/10" />
            <div className="mt-3 h-3 w-full rounded-lg bg-black/10 dark:bg-white/10" />
            <div className="mt-2 h-3 w-4/5 rounded-lg bg-black/10 dark:bg-white/10" />
          </div>
        ))}
      </div>
    </div>
  );
}

