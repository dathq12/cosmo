"use client";

import Link from "next/link";

import { companies, uiText } from "@/data/site-data";
import { CosmoLogo } from "@/components/ui/CosmoLogo";
import { useLanguage } from "@/components/ui/LanguageProvider";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <div>
          <CosmoLogo />
        </div>
        <div>
          <p className="site-footer__heading">{t(uiText.footer.companies)}</p>
          <div className="site-footer__links">
            {companies.map((company) => (
              <Link key={company.slug} href={`/companies/${company.slug}`}>
                {company.name}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="site-footer__heading">{t(uiText.footer.recruit)}</p>
          <div className="site-footer__links">
            <Link href="/jobs">{t(uiText.common.jobsList)}</Link>
            <a href="#faq">FAQ</a>
            <a href="#recruit">{t(uiText.common.entry)}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
