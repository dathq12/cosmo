"use client";

import { useMemo, useState } from "react";

import { companies, jobs, uiText } from "@/data/site-data";
import { useLanguage } from "@/components/ui/LanguageProvider";
import { Reveal } from "@/components/ui/Reveal";

export function JobFilter({ animated = false }: { animated?: boolean }) {
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
        {filtered.map((job, index) => {
          const companyMeta = companies.find((item) => item.slug === job.company);
          const content = (
            <>
              <div className="job-card__meta">
                <span style={{color: "#3397AB"}}>{companyMeta?.name}</span>
                <span>{t(job.location)}</span>
                <span>{t(job.type)}</span>
              </div>
              <h3>{t(job.title)}</h3>
              <p>{t(job.mission)}</p>
              <ul>
                {job.tasks.map((task, taskIndex) => (
                  <li key={`${job.id}-${taskIndex}`}>{t(task)}</li>
                ))}
              </ul>
              <div className="job-card__fit">{t(job.fit)}</div>
            </>
          );

          if (!animated) {
            return (
              <article className="job-card" key={job.id}>
                {content}
              </article>
            );
          }

          return (
            <Reveal
              key={job.id}
              delay={(index % 2) * 0.08}
              direction={index % 2 === 0 ? "left" : "right"}
              className="job-card"
            >
              {content}
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
