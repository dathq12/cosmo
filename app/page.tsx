"use client";

import Image from "next/image";

import { CompanyFit } from "@/components/CompanyFit";
import { CompanyNetworkDiagram } from "@/components/CompanyNetworkDiagram";
import { FaqAccordion } from "@/components/FaqAccordion";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HeroVisual } from "@/components/HeroVisual";
import { StatsGrid } from "@/components/StatsGrid";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { HeroParallaxText } from "@/components/ui/HeroParallaxText";
import { useLanguage } from "@/components/ui/LanguageProvider";
import { Reveal } from "@/components/ui/Reveal";
import { ScrollSection } from "@/components/ui/ScrollSection";
import { SectionIntro } from "@/components/ui/SectionIntro";
import {
  companies,
  culturePillars,
  homeText,
  interviews,
  jobs,
  storySteps,
  uiText
} from "@/data/site-data";

const recruitTypeCards = [
  {
    id: "career",
    image: "/assets/recruit-job-card-1.png",
    title: { jp: "キャリア採用", en: "Career Recruitment" },
    body: {
      jp: "I-neキャリア採用の募集職種をご紹介します。",
      en: "Explore the open positions in I-ne's career recruitment."
    },
    cta: {
      jp: "キャリア採用募集要項はこちら",
      en: "View career recruitment details"
    }
  },
  {
    id: "new-grad",
    image: "/assets/recruit-job-card-2.png",
    title: { jp: "新卒採用", en: "New Graduate Recruitment" },
    body: {
      jp: "I-ne新卒採用の募集職種をご紹介します。",
      en: "Explore the open positions in I-ne's new graduate recruitment."
    },
    cta: {
      jp: "新卒採用募集要項はこちら",
      en: "View new graduate recruitment details"
    }
  }
];

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <>
      <Header />
      <main>
        <section className="hero">
          <video src="/assets/hero-kv.mp4" autoPlay muted loop style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute' }} />
          {/* <HeroVisual /> */}
          {/* <div className="hero__overlay" /> */}
          <div className="hero__box">
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
              {/* <Reveal delay={0.12} className="hero__aside">
                <div className="hero-card">
                  <span>FIND YOUR PLACE</span>
                  <p>{t(homeText.heroCard)}</p>
                </div>
                <div className="scroll-indicator">SCROLL</div>
              </Reveal> */}
            </div>
          </div>
        </section>

        <ScrollSection className="section section--flow section--flow-about" id="about">
          <div className="container about-layout">
            <div className="about-layout__content">
              <Reveal direction="down">
                <SectionIntro
                  label="ABOUT US"
                  title={t(homeText.aboutTitle)}
                  body={t(homeText.aboutBody)}
                />
              </Reveal>
              {/* <div className="pillar-grid">
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
              </div> */}
            </div>
            <Reveal direction="left" className="about-layout__media">
              <Image
                src="/assets/about-team-meeting.png"
                alt="Cosmo Group team meeting"
                fill
                sizes="(max-width: 900px) 100vw, 42vw"
              />
            </Reveal>
          </div>
        </ScrollSection>

        <ScrollSection className="section section--flow section--flow-company section--network" id="company">
          <div className="container company-network">
            <Reveal direction="down" className="company-network__heading">
              <p className="eyebrow">COSMO GROUP</p>
              <h2>{t(homeText.companyTitle)}</h2>
              <p>{t(homeText.companyLead)}</p>
              <span aria-hidden="true" className="company-network__heading-line" />
            </Reveal>
            <CompanyNetworkDiagram />
            {/* Delay kept in sync with CompanyNetworkDiagram's hub/line/node
                reveal sequence (finishes ~1.78s) so the caption only shows
                once every item inside .company-network__map has appeared. */}
            <Reveal delay={1.85} direction="up" className="company-network__caption">
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



        <ScrollSection className="section section--flow section--flow-people" id="people">
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

        <ScrollSection className="section section--flow section--flow-data section--data" id="data">
          <div className="container">
            <Reveal direction="down">
              <div className="data-heading">
                <p className="data-heading__label">DATA</p>
                <h2>数字で見るCOSMO</h2>
                <p>働く環境やチームの特徴を、数字でわかりやすくご紹介します。</p>
              </div>
            </Reveal>
            <Reveal delay={0.08} direction="up">
              <StatsGrid />
            </Reveal>
          </div>
        </ScrollSection>

        <ScrollSection className="section section--flow section--flow-culture" id="culture">
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
{/* 
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
        </ScrollSection> */}

        {/* <ScrollSection className="section section--warm">
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
        </ScrollSection> */}

        <ScrollSection className="section section--dark" id="recruit">
          <Reveal className="container recruit-panel" direction="down">
            <div className="recruit-banner">
              <div>
                <p className="eyebrow">RECRUIT</p>
                <h2>{t(homeText.recruitTitle)}</h2>
                <p>{t(homeText.recruitBody)}</p>
              </div>
              <div className="hero-actions">
                <ButtonLink href="/jobs">{t(uiText.common.jobs)}</ButtonLink>
              </div>
            </div>

            <div className="recruit-featured-jobs">
              {recruitTypeCards.map((card, index) => (
                <Reveal
                  key={card.id}
                  delay={index * 0.08}
                  direction="up"
                  className="recruit-job-card"
                >
                  <div className="recruit-job-card__media">
                    <Image
                      src={card.image}
                      alt={t(card.title)}
                      fill
                      sizes="(max-width: 900px) 100vw, 48vw"
                    />
                  </div>
                  <div className="recruit-job-card__body">
                    <h3>{t(card.title)}</h3>
                    <p>{t(card.body)}</p>
                    <div className="recruit-job-card__cta">
                      <span className="recruit-job-card__cta-icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M5 12h14M13 6l6 6-6 6"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      <span className="recruit-job-card__cta-text">
                        {t(card.cta)}
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect
                            x="3"
                            y="8"
                            width="12"
                            height="12"
                            rx="1.5"
                            stroke="currentColor"
                            strokeWidth="1.6"
                          />
                          <rect
                            x="9"
                            y="4"
                            width="12"
                            height="12"
                            rx="1.5"
                            stroke="currentColor"
                            strokeWidth="1.6"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Reveal>
              ))}
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
