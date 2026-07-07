"use client";

import Link from "next/link";
import { useState } from "react";

import { companies, uiText } from "@/data/site-data";
import { useLanguage } from "@/components/ui/LanguageProvider";

export function CompanyFit() {
  const [active, setActive] = useState(companies[0].slug);
  const current = companies.find((company) => company.slug === active) ?? companies[0];
  const { t } = useLanguage();

  return (
    <div className="fit-panel">
      <div className="fit-tabs" role="tablist" aria-label={t(uiText.fit.aria)}>
        {companies.map((company) => (
          <button
            key={company.slug}
            type="button"
            className={active === company.slug ? "is-active" : ""}
            style={{ borderColor: company.accent }}
            onClick={() => setActive(company.slug)}
          >
            <span>{company.name}</span>
            <small>{t(company.fit)}</small>
          </button>
        ))}
      </div>
      <div className="fit-detail" style={{ borderColor: current.accent }}>
        <p className="eyebrow">{t(uiText.fit.bestFit)}</p>
        <h3>{t(current.tagline)}</h3>
        <p>{t(current.summary)}</p>
        <ul>
          {current.workStyle.map((item, index) => (
            <li key={`${current.slug}-${index}`}>{t(item)}</li>
          ))}
        </ul>
        <Link href={`/companies/${current.slug}`}>{t(uiText.common.viewCompanyPage)}</Link>
      </div>
    </div>
  );
}
