"use client";

import Image from "next/image";
import Link from "next/link";

import type { Company } from "@/data/site-data";
import { interviews, jobs, uiText } from "@/data/site-data";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { useLanguage } from "@/components/ui/LanguageProvider";
import { Reveal } from "@/components/ui/Reveal";
import { ScrollSection } from "@/components/ui/ScrollSection";
import { SectionIntro } from "@/components/ui/SectionIntro";

export function CompanyPageTemplate({ company }: { company: Company }) {
  const companyJobs = jobs.filter((job) => job.company === company.slug);
  const companyInterviews = interviews.filter(
    (interview) => interview.company === company.slug
  );
  const { t } = useLanguage();

  return (
    <main>
      <section className="company-hero">
        <div className="container company-hero__grid">
          <Reveal>
            <p className="eyebrow">{company.englishTag}</p>
            <h1>{company.name}</h1>
            <h2>{t(company.tagline)}</h2>
            <p>{t(company.summary)}</p>
            <div className="hero-actions">
              <ButtonLink href="/jobs">{t(uiText.common.jobs)}</ButtonLink>
              <ButtonLink href="/" variant="secondary">
                {t(uiText.common.backToTop)}
              </ButtonLink>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="company-hero__media">
            <Image src={company.image} alt={company.name} fill sizes="(max-width: 900px) 100vw, 50vw" />
          </Reveal>
        </div>
      </section>

      <ScrollSection className="section">
        <div className="container company-detail-grid">
          <Reveal>
            <SectionIntro label="MISSION" title={t(company.missionTitle)} body={t(company.missionBody)} />
          </Reveal>
          <Reveal delay={0.1} className="detail-card">
            <h3>{t(uiText.companyPage.workStyle)}</h3>
            <ul>
              {company.workStyle.map((item, index) => (
                <li key={`${company.slug}-work-${index}`}>{t(item)}</li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.15} className="detail-card">
            <h3>{t(uiText.companyPage.culture)}</h3>
            <ul>
              {company.culture.map((item, index) => (
                <li key={`${company.slug}-culture-${index}`}>{t(item)}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </ScrollSection>

      <ScrollSection className="section section--warm">
        <div className="container">
          <SectionIntro
            label="PEOPLE"
            title={t(uiText.companyPage.peopleTitle)}
            body={t(uiText.companyPage.peopleBody)}
          />
          <div className="interview-grid">
            {companyInterviews.map((interview, index) => (
              <Reveal key={interview.name} delay={index * 0.08} className="interview-card">
                <div className="interview-card__image">
                  <Image
                    src={interview.image}
                    alt={interview.name}
                    fill
                    sizes="(max-width: 900px) 100vw, 33vw"
                  />
                </div>
                <div className="interview-card__content">
                  <p className="interview-card__meta">
                    {t(interview.role)} / {t(interview.year)}
                  </p>
                  <h3>{interview.name}</h3>
                  <p>“{t(interview.quote)}”</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </ScrollSection>

      <ScrollSection className="section">
        <div className="container">
          <SectionIntro
            label="OPEN POSITIONS"
            title={t(uiText.companyPage.positionsTitle)}
            body={t(uiText.companyPage.positionsBody)}
          />
          <div className="job-list">
            {companyJobs.map((job) => (
              <article key={job.id} className="job-card">
                <div className="job-card__meta">
                  <span style={{ color: company.accent }}>{company.name}</span>
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
              </article>
            ))}
          </div>
          <div className="section-cta">
            <Link href="/jobs">{t(uiText.common.listPage)}</Link>
          </div>
        </div>
      </ScrollSection>
    </main>
  );
}
