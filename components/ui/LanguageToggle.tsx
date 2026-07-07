"use client";

import { uiText } from "@/data/site-data";
import { useLanguage } from "@/components/ui/LanguageProvider";

export function LanguageToggle() {
  const { lang, setLang, t } = useLanguage();

  return (
    <div className="lang-toggle" aria-label={t(uiText.common.language)}>
      <button
        type="button"
        className={lang === "jp" ? "is-active" : ""}
        onClick={() => setLang("jp")}
      >
        JP
      </button>
      <button
        type="button"
        className={lang === "en" ? "is-active" : ""}
        onClick={() => setLang("en")}
      >
        EN
      </button>
    </div>
  );
}
