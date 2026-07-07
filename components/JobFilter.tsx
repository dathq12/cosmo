"use client";

import { useMemo, useState } from "react";

import { companies, jobs, uiText } from "@/data/site-data";
import { useLanguage } from "@/components/ui/LanguageProvider";

export function JobFilter() {
  const [company, setCompany] = useState("all");
  const { t } = useLanguage();

  const filtered = useMemo(() => {
    if (company === "all") return jobs;
    return jobs.filter((job) => job.company === company);
  }, [company]);

  return (
    <div className="jobs-filter">
      <div className="jobs-filter__chips">
        <button
          className={company === "all" ? "is-active" : ""}
          onClick={() => setCompany("all")}
          type="button"
        >
          {t(uiText.common.all)}
        </button>
        {companies.map((item) => (
          <button
            key={item.slug}
            className={company === item.slug ? "is-active" : ""}
            onClick={() => setCompany(item.slug)}
            style={{ borderColor: item.accent }}
            type="button"
          >
            {item.name}
          </button>
        ))}
      </div>
      <div className="job-list">
        {filtered.map((job) => {
          const companyMeta = companies.find((item) => item.slug === job.company);
          return (
            <article className="job-card" key={job.id}>
              <div className="job-card__meta">
                <span style={{ color: companyMeta?.accent }}>{companyMeta?.name}</span>
                <span>{t(job.location)}</span>
                <span>{t(job.type)}</span>
              </div>
              <h3>{t(job.title)}</h3>
              <p>{t(job.mission)}</p>
              <ul>
                {job.tasks.map((task, index) => (
                  <li key={`${job.id}-${index}`}>{t(task)}</li>
                ))}
              </ul>
              <div className="job-card__fit">{t(job.fit)}</div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
