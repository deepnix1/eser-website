import React from "react";

type IconPartnerLogo = {
  id: string;
  type: "icon";
  icon: string;
  label: string;
};

type ImagePartnerLogo = {
  id: string;
  type: "image";
  src: string;
  alt: string;
};

export type PartnerLogoProps = IconPartnerLogo | ImagePartnerLogo;

export default function PartnerLogo(props: PartnerLogoProps) {
  const imageHeightClass =
    props.id === "ccusa"
      ? "h-12 md:h-14"
      : props.id === "balliedu" ||
          props.id === "ceb" ||
          props.id === "rheinland" ||
          props.id === "tandem"
        ? "h-9"
        : "h-7";

  return (
    <div
      className="partner-logo flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity"
      data-logo={props.id}
    >
      {props.type === "icon" ? (
        <>
          <span className="material-symbols-outlined text-4xl">{props.icon}</span>
          <span className="text-xl font-bold font-display tracking-tight">
            {props.label}
          </span>
        </>
      ) : (
        <img
          alt={props.alt}
          className={`partner-logo__img ${imageHeightClass} w-auto block object-contain`}
          src={props.src}
        />
      )}
    </div>
  );
}
