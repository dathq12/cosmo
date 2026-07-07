"use client";

import Image from "next/image";

import { useLanguage } from "@/components/ui/LanguageProvider";

type CosmoLogoProps = {
  compact?: boolean;
};

export function CosmoLogo({ compact = false }: CosmoLogoProps) {
  const { lang } = useLanguage();

  return (
    <div className="cosmo-logo" aria-label="Cosmo Group Recruiting">
      <div className="cosmo-logo__mark">
        <Image
          src="/assets/cosmo-logo.png"
          alt="Cosmo Group"
          width={compact ? 80 : 118}
          height={compact ? 23 : 34}
          className="cosmo-logo__image"
          priority={compact}
        />
      </div>
      {!compact && (
        <div className="cosmo-logo__subtitle">
          {lang === "jp"
            ? "美容の未来を、支える側からつくる。"
            : "Build the future of beauty from the side that supports it."}
        </div>
      )}
    </div>
  );
}
