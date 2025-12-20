import React from "react";

import type { Program } from "../../lib/programCatalog";

type ProgramDetailsProps = {
  countryLabel: string;
  program: Program | null;
  ui: {
    detailsEmptyTitle: string;
    detailsEmptyBody: string;
    section: {
      overview: string;
      whoFor: string;
      advantages: string;
      duration: string;
      workRights: string;
      steps: string;
      docs: string;
      fees: string;
    };
    badges: Record<NonNullable<Program["badge"]>, string>;
    workRightsFallback: string;
    eligibilityTitle: (countryLabel: string, programShortTitle: string) => string;
    eligibilityBody: string;
    eligibilityCta: string;
  };
};

function SectionCard({
  title,
  icon,
  children,
}: {
  title: string;
  icon: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-3xl border border-gray-100 dark:border-white/10 bg-white dark:bg-white/5 p-5">
      <div className="flex items-center gap-2">
        <span className="material-symbols-outlined text-[18px] text-text-muted dark:text-gray-300">
          {icon}
        </span>
        <h3 className="text-base font-black text-text-main dark:text-white">
          {title}
        </h3>
      </div>
      <div className="mt-3 text-base text-text-muted dark:text-gray-400 leading-relaxed">
        {children}
      </div>
    </section>
  );
}

function ClampedText({
  children,
  lines = 2,
  title,
}: {
  children: React.ReactNode;
  lines?: number;
  title?: string;
}) {
  return (
    <div
      className="overflow-hidden"
      style={{
        display: "-webkit-box",
        WebkitBoxOrient: "vertical",
        WebkitLineClamp: lines,
      }}
      title={title}
    >
      {children}
    </div>
  );
}

function getProgramShortTitle(title: string) {
  const cleaned = title.trim();
  const parenIndex = cleaned.indexOf(" (");
  if (parenIndex > 0) return cleaned.slice(0, parenIndex);
  return cleaned;
}

export default function ProgramDetails({
  countryLabel,
  program,
  ui,
}: ProgramDetailsProps) {
  if (!program) {
    return (
      <div className="rounded-[2rem] border border-gray-100 dark:border-white/10 bg-white/70 dark:bg-white/5 shadow-[0_25px_60px_rgba(0,0,0,0.08)] p-6 md:p-7">
        <div className="text-lg md:text-xl font-black text-text-main dark:text-white">
          {ui.detailsEmptyTitle}
        </div>
        <div className="mt-2 text-sm text-text-muted dark:text-gray-400">
          {ui.detailsEmptyBody}
        </div>
      </div>
    );
  }

  const details = program.details;
  const shortTitle = getProgramShortTitle(program.title);
  const eligibilityHeadline = ui.eligibilityTitle(countryLabel, shortTitle);

  return (
    <div className="rounded-[2rem] border border-gray-100 dark:border-white/10 bg-white/70 dark:bg-white/5 shadow-[0_25px_60px_rgba(0,0,0,0.08)] overflow-hidden">
      <div className="p-6 md:p-7 border-b border-gray-100 dark:border-white/10 bg-gradient-to-b from-white/90 via-white/60 to-white/40 dark:from-white/10 dark:via-white/5 dark:to-transparent">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-primary text-black text-[11px] font-black px-3 py-1">
            {countryLabel}
          </span>
          {program.badge ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-black text-white text-[11px] font-black px-3 py-1">
              {ui.badges[program.badge] ?? program.badge}
            </span>
          ) : null}
        </div>

        <h2 className="mt-3 text-3xl md:text-4xl font-black text-text-main dark:text-white tracking-tight">
          {program.title}
        </h2>
        <p className="mt-2 text-base text-text-muted dark:text-gray-400 max-w-3xl leading-relaxed">
          {program.tagline}
        </p>
      </div>

      <div className="p-6 md:p-7 grid gap-4">
        <SectionCard icon="info" title={ui.section.overview}>
          {details.overview}
        </SectionCard>

        <SectionCard icon="group" title={ui.section.whoFor}>
          <ul className="space-y-2">
            {details.whoFor.map((item) => (
              <li className="flex gap-2" key={item}>
                <span className="material-symbols-outlined text-[18px] text-primary">
                  check_circle
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard icon="stars" title={ui.section.advantages}>
          <ul className="space-y-2">
            {details.keyAdvantages.map((item) => (
              <li className="flex gap-2" key={item}>
                <span className="material-symbols-outlined text-[18px] text-primary">
                  bolt
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </SectionCard>

        <div className="grid md:grid-cols-2 gap-4">
          <SectionCard icon="calendar_month" title={ui.section.duration}>
            <ClampedText title={details.duration}>{details.duration}</ClampedText>
          </SectionCard>
          <SectionCard icon="work" title={ui.section.workRights}>
            <ClampedText title={details.workRights ?? undefined}>
              {details.workRights ?? ui.workRightsFallback}
            </ClampedText>
          </SectionCard>
        </div>

        <SectionCard icon="format_list_numbered" title={ui.section.steps}>
          <ol className="space-y-2 list-decimal list-inside">
            {details.applicationSteps.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </SectionCard>

        <SectionCard icon="description" title={ui.section.docs}>
          <ul className="space-y-2">
            {details.requiredDocuments.map((item) => (
              <li className="flex gap-2" key={item}>
                <span className="material-symbols-outlined text-[18px] text-text-muted dark:text-gray-300">
                  arrow_right
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard icon="payments" title={ui.section.fees}>
          {details.feesAndVisa}
          {details.notes ? (
            <div className="mt-3 text-xs text-text-muted dark:text-gray-400">
              {details.notes}
            </div>
          ) : null}
        </SectionCard>

        <div className="rounded-3xl bg-black text-white p-5 md:p-6 shadow-[0_18px_45px_rgba(0,0,0,0.18)]">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="min-w-0">
              <div className="text-base md:text-lg font-black leading-snug">
                {eligibilityHeadline}
              </div>
              <div className="mt-1 text-sm text-white/70 leading-relaxed">
                {ui.eligibilityBody}
              </div>
            </div>
            <button
              className="h-10 px-5 rounded-full bg-primary text-black text-sm font-black flex items-center justify-center hover:brightness-105 transition-all whitespace-nowrap"
              aria-haspopup="dialog"
              data-calendly-open="true"
              type="button"
            >
              {ui.eligibilityCta}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
