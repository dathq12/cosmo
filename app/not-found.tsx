"use client";

import Link from "next/link";

import { uiText } from "@/data/site-data";
import { useLanguage } from "@/components/ui/LanguageProvider";

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <main className="not-found">
      <h1>{t(uiText.notFound.title)}</h1>
      <p>{t(uiText.notFound.body)}</p>
      <Link href="/">{t(uiText.common.backToTop)}</Link>
    </main>
  );
}
