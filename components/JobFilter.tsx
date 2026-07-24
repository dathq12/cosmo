"use client";

import { useMemo, useState } from "react";

import { areas, companies, jobs, uiText } from "@/data/site-data";
import { useLanguage } from "@/components/ui/LanguageProvider";
import { Reveal } from "@/components/ui/Reveal";

export function JobFilter({ animated = false }: { animated?: boolean }) {
  const [company, setCompany] = useState("all");
  const [area, setArea] = useState("all");
  const { t } = useLanguage();

  const filtered = useMemo(() => {
    return jobs.filter((job) => {
      const matchesCompany = company === "all" || job.company === company;
      const matchesArea = area === "all" || job.locations.some((location) => location.jp === area);
      return matchesCompany && matchesArea;
    });
  }, [company, area]);

  return (
    <div className="jobs-filter">
      <p className="eyebrow jobs-filter__label">COMPANY</p>

      <div className="jobs-filter__chips" style={{ marginBottom: "0" }}>
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
      <p className="eyebrow jobs-filter__label">AREA/エリア</p>
      <div className="jobs-filter__chips jobs-filter__chips--area">
        <button
          className={area === "all" ? "is-active" : ""}
          onClick={() => setArea("all")}
          type="button"
        >
          {t(uiText.common.all)}
        </button>
        {areas.map((item) => (
          <button
            key={item.jp}
            className={area === item.jp ? "is-active" : ""}
            onClick={() => setArea(item.jp)}
            type="button"
          >
            {t(item)}
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
                <span>{job.locations.map((location) => t(location)).join(" / ")}</span>
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
