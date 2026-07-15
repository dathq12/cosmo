"use client";

import Image from "next/image";

import { CompanyFit } from "@/components/CompanyFit";
import { CompanyGroupShowcase } from "@/components/CompanyGroupShowcase";
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
import { JobFilter } from "@/components/JobFilter";

const ceoMessage = {
  title: {
    jp: "新しい価値を生み出す仲間へ",
    en: "To Those Who Create New Value With Us"
  },
  paragraphs: [
    {
      jp: "かつて、美容ビジネスの基本は「問題」や「悩み」を探すことでした。業界に参入したばかりで競争力がなかった私たちは、だからこそ「問題解決」という従来の常識を捨てることの重要さに気付くことができました。むしろ、「ワクワクする未来」だけに目を向けて、これまでにない新しい価値をお客様に提供しようと、心をひとつにした。この大きな転換が、現在の私たちの原点となりました。",
      en: "The basics of the beauty business used to be about finding \"problems\" and \"worries.\" As newcomers with little competitive strength, that was exactly what let us realize how important it was to let go of the conventional wisdom of \"problem solving.\" Instead, we united around a single idea: focus only on an exciting future, and offer our customers a kind of value that didn't exist before. That shift became the starting point we still stand on today."
    },
    {
      jp: "私たちの主力商品「ホリスティックキュアスタイリングシリーズ」は現在国内美容業界が注目している「健康」や「内面美」にいち早く目を向けた象徴的なヒット商品です。",
      en: "Our flagship product, the \"Holistic Cure Styling Series,\" is a symbolic hit that anticipated the \"health\" and \"inner beauty\" now drawing attention across Japan's beauty industry."
    },
    {
      jp: "徹底的な未来志向こそが、業界に新たな風を呼び込む原動力だと、私たちは確信しています。",
      en: "We are convinced that a thoroughly future-oriented mindset is the driving force that brings fresh momentum to this industry."
    }
  ],
  company: { jp: "株式会社コスモホールディングス", en: "Cosmo Holdings Co., Ltd." },
  role: { jp: "代表取締役", en: "President & CEO" },
  name: { jp: "貝塚 弘幸", en: "Hiroyuki Kaizuka" }
};

const workEnv = {
  title: {
    jp: "心地よく働き、\n自分らしく成長する。",
    en: "Work comfortably.\nGrow in your own way."
  },
  body: {
    jp: "一人ひとりが安心して挑戦を続けられるように。COSMOでは、働く場所・制度・チームのすべてから、成長を支える環境を整えています。",
    en: "So that everyone can keep challenging themselves with peace of mind, COSMO shapes every part of the workplace — spaces, systems, and teams — to support growth."
  },
  sideLabel: "A PLACE TO GROW",
  cta: {
    jp: "働く環境・制度を詳しく見る",
    en: "See our workplace & benefits in detail"
  },
  watermark: "ENVIRONMENT"
};

const workEnvItems = [
  {
    id: "connect",
    index: "01",
    label: { jp: "つながる", en: "Connect" },
    title: { jp: "相談しやすく、\n支え合えるチーム", en: "A team that talks openly\nand supports each other" },
    body: {
      jp: "部署や役職を越えて声をかけ合い、困ったときに自然と支え合える関係を大切にしています。",
      en: "We value relationships that cross departments and titles, where people naturally look out for one another when something's hard."
    }
  },
  {
    id: "grow",
    index: "02",
    label: { jp: "成長する", en: "Grow" },
    title: { jp: "挑戦を後押しする\n育成制度", en: "Training that backs\nyour challenges" },
    body: {
      jp: "研修や日々の実践を通じて、一人ひとりの目標に合わせた成長をサポートします。",
      en: "Through training and everyday practice, we support growth tailored to each person's own goals."
    }
  },
  {
    id: "sustain",
    index: "03",
    label: { jp: "続けられる", en: "Sustain" },
    title: { jp: "ライフステージに\n寄り添う制度", en: "Systems that adapt\nto your life stage" },
    body: {
      jp: "仕事と暮らしの変化に向き合い、長く安心して働ける制度と環境を整えています。",
      en: "We keep pace with changes in work and life, building systems and an environment people can stay with for the long run."
    }
  }
];

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
          <video src="/assets/kv-video.mp4" autoPlay muted loop style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute' }} />
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

        {/* <ScrollSection className="section section--flow section--flow-company section--network" id="company">
          <div className="container company-network">
            <Reveal direction="down" className="company-network__heading">
              <p className="eyebrow">COSMO GROUP</p>
              <h2>{t(homeText.companyTitle)}</h2>
              <p>{t(homeText.companyLead)}</p>
              <span aria-hidden="true" className="company-network__heading-line" />
            </Reveal>
            <CompanyNetworkDiagram /> */}
            {/* Delay kept in sync with CompanyNetworkDiagram's hub/line/node
                reveal sequence (finishes ~1.78s) so the caption only shows
                once every item inside .company-network__map has appeared. */}
            {/* <Reveal delay={1.85} direction="up" className="company-network__caption">
              <p>{t(homeText.companyBody)}</p>
            </Reveal>
          </div>
        </ScrollSection> */}

        <ScrollSection className="section section--dark" id="group-network">
          <div className="container">
            <CompanyGroupShowcase />
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



        {/* <ScrollSection className="section section--flow section--flow-people" id="people">
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
        </ScrollSection> */}

        <ScrollSection className="section section--flow section--flow-people" id="people">
          <div className="container message-card">
            <Reveal direction="down" className="message-card__heading">
              <p className="eyebrow">MESSAGE</p>
              <h2>{t(ceoMessage.title)}</h2>
            </Reveal>
            <Reveal className="message-card__media" direction="left">
              <Image
                src="/assets/top_ceophoto.jpg"
                alt={t(ceoMessage.name)}
                fill
                sizes="(max-width: 1080px) 100vw, 420px"
              />
            </Reveal>
            <Reveal delay={0.1} className="message-card__content" direction="right">
              {ceoMessage.paragraphs.map((paragraph) => (
                <p key={paragraph.jp}>{t(paragraph)}</p>
              ))}
              <p className="message-card__signature">
                {t(ceoMessage.company)}
                <br />
                {t(ceoMessage.role)} {t(ceoMessage.name)}
              </p>
            </Reveal>
          </div>
        </ScrollSection>

        {/* <ScrollSection className="section section--flow section--flow-data section--data" id="data">
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
        </ScrollSection> */}

        <ScrollSection className="section section--flow section--flow-data" id="data">
          <div className="container work-env">
            <div className="work-env__top">
              <Reveal direction="down" className="work-env__intro">
                <p className="eyebrow">WORK ENVIRONMENT</p>
                <h2>{t(workEnv.title)}</h2>
                <p>{t(workEnv.body)}</p>
                <a href="#" className="work-env__side" aria-hidden="true">
                  {workEnv.sideLabel}
                </a>
              </Reveal>
              <Reveal direction="right" delay={0.1} className="work-env__banner">
                <Image
                  src="/assets/environment.png"
                  alt={t(workEnv.title)}
                  fill
                  sizes="(max-width: 1080px) 100vw, 68vw"
                />
              </Reveal>
            </div>

            <div className="work-env__grid">
              {workEnvItems.map((item, index) => (
                <Reveal
                  key={item.id}
                  delay={index * 0.08}
                  direction="up"
                  className="work-env__item"
                >
                  <div className="work-env__item-head">
                    <span className="work-env__item-index">{item.index}</span>
                    <span className="work-env__item-label">{t(item.label)}</span>
                  </div>
                  <div className="work-env__item-top">
                  <div className="work-env__item-icon" aria-hidden="true">
                    {item.id === "connect" && (
                      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="11" r="2.8" stroke="currentColor" strokeWidth="1.8" />
                        <circle cx="28" cy="11" r="2.8" stroke="currentColor" strokeWidth="1.8" />
                        <path
                          d="M8 33V23c0-4.5 2-7.5 5-8.9 2-1 4.4-2.4 7-5.1"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M32 33V23c0-4.5-2-7.5-5-8.9-2-1-4.4-2.4-7-5.1"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M16 2.5 17.5 6M20 1.5V5.2M24 2.5 22.5 6"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                        />
                      </svg>
                    )}
                    {item.id === "grow" && (
                      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M6 9c5-2.6 10-2.6 14 0v23c-4-2.6-9-2.6-14 0V9Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M34 9c-5-2.6-10-2.6-14 0v23c4-2.6 9-2.6 14 0V9Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M22.5 14.5h6M22.5 19h6M22.5 23.5h4"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                        />
                        <path
                          d="M27 5.5 33 3l2.5 2.5L33 11.5l-6 2.5-2.5-2.5L27 5.5Z"
                          stroke="currentColor"
                          strokeWidth="1.7"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                    {item.id === "sustain" && (
                      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M20 20 13.5 13c-2-2-1.4-5 1-6.2 2-1 4.3-.3 5.5 1.6 1.2-1.9 3.5-2.6 5.5-1.6 2.4 1.2 3 4.2 1 6.2L20 20Z"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M4.5 30c6 3 10.5 3.4 15.5 2.3 4.5-1 8-2.8 10.6-5.6.9-1 .8-2.3-.2-3.1-.9-.7-2.2-.6-3.1.2l-4 3.6"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M15.5 25.5c2.2.9 5 1.1 7.6.5 1.3-.3 2.5-.8 2.5-.8"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                        />
                      </svg>
                    )}
                  </div>
                  <h3>{t(item.title)}</h3>
                  </div>
                  <p>{t(item.body)}</p>
                </Reveal>
              ))}
            </div>

            <Reveal direction="up" delay={0.3} className="work-env__cta">
              <a href="#none" className="button button--secondary" aria-hidden="false">
                <span>{t(workEnv.cta)}</span>
                <span aria-hidden="true" className="button__arrow">
                  →
                </span>
              </a>
            </Reveal>

            <Reveal direction="up" delay={0.36} className="work-env__watermark">
              {workEnv.watermark}
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

        <ScrollSection className="section">
          <div className="container">
            <Reveal direction="down">
              <SectionIntro
                label="JOB LIST"
                title={t(uiText.jobsPage.introTitle)}
                body={t(uiText.jobsPage.introBody)}
              />
            </Reveal>
            <JobFilter animated />
          </div>
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
