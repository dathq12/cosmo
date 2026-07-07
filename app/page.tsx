"use client";

import Image from "next/image";

import { CompanyFit } from "@/components/CompanyFit";
import { FaqAccordion } from "@/components/FaqAccordion";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HeroVisual } from "@/components/HeroVisual";
import { StatsGrid } from "@/components/StatsGrid";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { HeroParallaxText } from "@/components/ui/HeroParallaxText";
import { useLanguage } from "@/components/ui/LanguageProvider";
import { Reveal } from "@/components/ui/Reveal";
import { SnapScrollController } from "@/components/ui/SnapScrollController";
import { ScrollSection } from "@/components/ui/ScrollSection";
import { SectionIntro } from "@/components/ui/SectionIntro";
import {
  companies,
  culturePillars,
  groupNetwork,
  homeText,
  interviews,
  jobs,
  storySteps,
  uiText
} from "@/data/site-data";

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <>
      <Header />
      <main>
        <SnapScrollController />
        <section className="hero" data-snap-section="true">
          <HeroVisual />
          <div className="hero__overlay" />
          <div className="container hero__content">
            <HeroParallaxText>
              <p className="eyebrow eyebrow--light">{t(homeText.heroEyebrow)}</p>
              <h1>
                {t(homeText.heroTitle)
                  .split("\n")
                  .map((line) => (
                    <span key={line}>
                      {line}
                      <br />
                    </span>
                  ))}
              </h1>
              <p className="hero__lead">{t(homeText.heroLead)}</p>
              <div className="hero-actions">
                <ButtonLink href="#recruit">{t(uiText.common.jobs)}</ButtonLink>
                <ButtonLink href="#company" variant="secondary">
                  {t(homeText.heroSecondary)}
                </ButtonLink>
              </div>
            </HeroParallaxText>
            <Reveal delay={0.12} className="hero__aside">
              <div className="hero-card">
                <span>FIND YOUR PLACE</span>
                <p>{t(homeText.heroCard)}</p>
              </div>
              <div className="scroll-indicator">SCROLL</div>
            </Reveal>
          </div>
        </section>

        <ScrollSection className="section" id="about">
          <div className="container">
            <Reveal direction="down">
              <SectionIntro
                label="ABOUT US"
                title={t(homeText.aboutTitle)}
                body={t(homeText.aboutBody)}
              />
            </Reveal>
            <div className="pillar-grid">
              {homeText.pillars.map((pillar, index) => (
                <Reveal
                  key={pillar.title}
                  delay={index * 0.08}
                  direction={index % 2 === 0 ? "left" : "right"}
                  className="pillar-card"
                >
                  <h3>{pillar.title}</h3>
                  <p>{t(pillar.body)}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </ScrollSection>

        <ScrollSection className="section section--dark section--network" id="company">
          <div className="container company-network">
            <Reveal direction="down" className="company-network__heading">
              <p className="eyebrow">COSMO GROUP</p>
              <h2>{t(homeText.companyTitle)}</h2>
              <p>{t(homeText.companyLead)}</p>
              <span aria-hidden="true" className="company-network__heading-line" />
            </Reveal>
            <Reveal delay={0.08} direction="up" className="company-network__map">
              <svg
                aria-hidden="true"
                className="company-network__links"
                preserveAspectRatio="none"
                viewBox="0 0 1240 680"
              >
                <line x1="620" x2="202" y1="340" y2="154" />
                <line x1="620" x2="202" y1="340" y2="428" />
                <line x1="620" x2="1038" y1="340" y2="154" />
                <line x1="620" x2="1038" y1="340" y2="428" />
                <line x1="620" x2="620" y1="340" y2="584" />
              </svg>
              <div className="company-network__center">
                <div className="company-network__icon company-network__icon--center">
                  <Image
                    src={groupNetwork.center.icon}
                    alt=""
                    width={144}
                    height={144}
                    sizes="144px"
                  />
                </div>
                <h3>{t(groupNetwork.center.name)}</h3>
                <p>{t(groupNetwork.center.body)}</p>
              </div>
              {groupNetwork.nodes.map((node) => (
                <div
                  key={node.id}
                  className={`company-network__node company-network__node--${node.position}`}
                >
                  <div className="company-network__icon">
                    <Image src={node.icon} alt="" width={96} height={96} sizes="96px" />
                  </div>
                  <div>
                    <h3>{t(node.name)}</h3>
                    <p>{t(node.body)}</p>
                  </div>
                </div>
              ))}
            </Reveal>
            <Reveal delay={0.16} direction="up" className="company-network__caption">
              <p>{t(homeText.companyBody)}</p>
            </Reveal>
          </div>
        </ScrollSection>
{/* 
        <ScrollSection className="section">
          <div className="container">
            <Reveal direction="right">
              <SectionIntro
                label="FIT"
                title={t(homeText.fitTitle)}
                body={t(homeText.fitBody)}
              />
            </Reveal>
            <Reveal delay={0.06} direction="up">
              <CompanyFit />
            </Reveal>
          </div>
        </ScrollSection>*/}



        <ScrollSection className="section" id="people">
          <div className="container">
            <Reveal direction="left">
              <SectionIntro
                label="PEOPLE"
                title={t(homeText.peopleTitle)}
                body={t(homeText.peopleBody)}
              />
            </Reveal>
            <div className="interview-grid">
              {interviews.map((interview, index) => (
                <Reveal
                  key={interview.name}
                  delay={index * 0.08}
                  direction={index === 1 ? "down" : index % 2 === 0 ? "left" : "right"}
                  className="interview-card"
                >
                  <div className="interview-card__image">
                    <Image
                      src={interview.image}
                      alt={interview.name}
                      fill
                      sizes="(max-width: 900px) 100vw, 33vw"
                    />
                  </div>
                  <div className="interview-card__content">
                    <p className="interview-card__meta">{t(interview.role)}</p>
                    <h3>{interview.name}</h3>
                    <p>“{t(interview.quote)}”</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </ScrollSection>

        <ScrollSection className="section section--warm" id="culture">
          <div className="container">
            <Reveal direction="right">
              <SectionIntro
                label="CULTURE"
                title={t(homeText.cultureTitle)}
                body={t(homeText.cultureBody)}
              />
            </Reveal>
            <div className="culture-grid">
              {culturePillars.map((pillar, index) => (
                <Reveal
                  key={pillar.title}
                  delay={index * 0.08}
                  direction={index < 2 ? "up" : "down"}
                  className="culture-card"
                >
                  <span>{pillar.title}</span>
                  <h3>{pillar.title}</h3>
                  <p>{t(pillar.body)}</p>
                </Reveal>
              ))}
            </div>
            <Reveal className="wide-image-card" direction="up">
              <Image
                src="/assets/office-space.png"
                alt="Cosmo Group workplace"
                fill
                sizes="100vw"
              />
              <div className="wide-image-card__copy">{t(homeText.cultureImage)}</div>
            </Reveal>
          </div>
        </ScrollSection>

        <ScrollSection className="section section--dark" id="data">
          <div className="container">
            <Reveal direction="down">
              <SectionIntro
                label="DATA"
                title={t(homeText.dataTitle)}
                body={t(homeText.dataBody)}
              />
            </Reveal>
            <Reveal delay={0.08} direction="up">
              <StatsGrid />
            </Reveal>
          </div>
        </ScrollSection>
{/* 
        <ScrollSection className="section section--warm" id="work">
          <div className="container">
            <Reveal direction="down">
              <SectionIntro
                label="WORK"
                title={t(homeText.workTitle)}
                body={t(homeText.workBody)}
              />
            </Reveal>
            <div className="job-list">
              {jobs.map((job, index) => {
                const company = companies.find((item) => item.slug === job.company);
                return (
                  <Reveal
                    key={job.id}
                    delay={index * 0.06}
                    direction={index % 2 === 0 ? "left" : "right"}
                    className="job-card"
                  >
                    <div className="job-card__meta">
                      <span style={{ color: company?.accent }}>{company?.name}</span>
                      <span>{t(job.location)}</span>
                      <span>{t(job.type)}</span>
                    </div>
                    <h3>{t(job.title)}</h3>
                    <p>{t(job.mission)}</p>
                    <ul>
                      {job.tasks.map((task, taskIndex) => (
                        <li key={`${job.id}-task-${taskIndex}`}>{t(task)}</li>
                      ))}
                    </ul>
                    <div className="job-card__fit">{t(job.fit)}</div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </ScrollSection>  */}

        <ScrollSection className="section">
          <div className="container story-grid">
            <Reveal>
              <SectionIntro
                label="STORY"
                title={t(homeText.storyTitle)}
                body={t(homeText.storyBody)}
              />
            </Reveal>
            <div className="story-steps">
              {storySteps.map((step, index) => (
                <Reveal
                  key={step.jp}
                  delay={index * 0.08}
                  direction={index % 2 === 0 ? "left" : "right"}
                  className="story-step"
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{t(step)}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </ScrollSection>

        <ScrollSection className="section section--warm">
          <div className="container message-card">
            <Reveal className="message-card__media" direction="left">
              <Image
                src="/assets/team-meeting.png"
                alt="Cosmo Group message"
                fill
                sizes="(max-width: 900px) 100vw, 48vw"
              />
            </Reveal>
            <Reveal delay={0.1} className="message-card__content" direction="right">
              <p className="eyebrow">MESSAGE</p>
              <h2>{t(homeText.messageTitle)}</h2>
              <p>{t(homeText.messageBody)}</p>
              <p className="message-card__signature">Recruiting Team / COSMO GROUP</p>
            </Reveal>
          </div>
        </ScrollSection>

        <ScrollSection className="section section--dark" id="recruit">
          <Reveal className="container recruit-banner" direction="down">
            <div>
              <p className="eyebrow">RECRUIT</p>
              <h2>{t(homeText.recruitTitle)}</h2>
              <p>{t(homeText.recruitBody)}</p>
            </div>
            <div className="hero-actions">
              <ButtonLink href="/jobs">{t(uiText.common.jobs)}</ButtonLink>
              <ButtonLink href="#faq" variant="secondary">
                {t(uiText.common.faq)}
              </ButtonLink>
            </div>
          </Reveal>
        </ScrollSection>

        <ScrollSection className="section" id="faq">
          <div className="container">
            <Reveal direction="left">
              <SectionIntro
                label="FAQ"
                title={t(homeText.faqTitle)}
                body={t(homeText.faqBody)}
              />
            </Reveal>
            <Reveal delay={0.06} direction="up">
              <FaqAccordion />
            </Reveal>
          </div>
        </ScrollSection>
      </main>
      <Footer />
    </>
  );
}
