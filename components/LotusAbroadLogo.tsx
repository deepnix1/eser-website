import React from "react";

type LotusAbroadLogoProps = {
  className?: string;
  variant?: "home" | "subpage";
  size?: "sm" | "md" | "lg" | "xl";
};

export default function LotusAbroadLogo({
  className,
  variant = "home",
  size = "md",
}: LotusAbroadLogoProps) {
  const isHome = variant === "home";
  const textClassName =
    variant === "subpage"
      ? "text-lg font-bold tracking-tight text-text-main dark:text-white"
      : "text-xl font-bold tracking-tight text-text-main dark:text-white";

  const iconSizeClassName = (() => {
    if (variant === "subpage") return "h-10 w-[150px]";
    if (size === "sm") return "h-[44px] w-[220px] sm:h-[48px] sm:w-[240px] lg:h-[52px] lg:w-[300px]";
    if (size === "lg")
      return "h-[76px] w-[min(360px,78vw)] sm:h-[80px] sm:w-[min(420px,52vw)] lg:h-[84px] lg:w-[min(460px,34vw)]";
    if (size === "xl") return "h-[64px] w-[320px] sm:h-[72px] sm:w-[420px] lg:h-[96px] lg:w-[640px]";
    return "h-[52px] w-[240px] sm:h-[56px] sm:w-[260px] lg:h-[68px] lg:w-[420px]";
  })();

  return (
    <div
      className={[
        "lotus-logo group relative inline-flex items-center rounded-full select-none",
        variant === "home" ? "lotus-logo--home" : "lotus-logo--subpage",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <span
        aria-hidden="true"
        className={[
          "pointer-events-none absolute rounded-full opacity-0 transition-all duration-300",
          isHome
            ? "-inset-1 bg-primary/5 scale-95 group-hover:opacity-30 group-hover:scale-100"
            : "-inset-y-2 -inset-x-3 bg-primary/8 scale-x-90 group-hover:opacity-60 group-hover:scale-x-100",
        ].join(" ")}
      />
      <div className={["relative", iconSizeClassName].join(" ")}>
        <span aria-hidden="true" className="lotus-logo__glow" />
        <div
          className={[
            "relative h-full w-full rounded-xl overflow-hidden bg-transparent",
            isHome ? "shadow-none ring-0" : "shadow-sm ring-1 ring-black/10 dark:ring-white/10",
          ].join(" ")}
        >
          <img
            alt="Lotus Abroad"
            className="lotus-logo__mark h-full w-full object-contain transition-transform duration-500 ease-out group-hover:scale-[1.02]"
            decoding="async"
            draggable={false}
            loading="eager"
            src="/landing_page_logo.svg"
          />
        </div>
      </div>
      {variant === "subpage" ? (
        <span
          className={[
            "relative ml-3 transition-all duration-300 ease-out group-hover:tracking-wide",
            textClassName,
          ].join(" ")}
        >
          Lotus Abroad
        </span>
      ) : null}
    </div>
  );
}
