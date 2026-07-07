"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode
} from "react";

import type { Lang, LocalizedText } from "@/data/site-data";

type LanguageContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (text: LocalizedText) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("jp");

  useEffect(() => {
    const saved = window.localStorage.getItem("cosmo-lang");
    if (saved === "jp" || saved === "en") {
      setLang(saved);
      document.documentElement.lang = saved === "jp" ? "ja" : "en";
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("cosmo-lang", lang);
    document.documentElement.lang = lang === "jp" ? "ja" : "en";
  }, [lang]);

  const value = useMemo(
    () => ({
      lang,
      setLang,
      t: (text: LocalizedText) => text[lang]
    }),
    [lang]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }

  return context;
}
