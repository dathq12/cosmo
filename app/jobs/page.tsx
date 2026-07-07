"use client";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JobFilter } from "@/components/JobFilter";
import { useLanguage } from "@/components/ui/LanguageProvider";
import { ScrollSection } from "@/components/ui/ScrollSection";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { uiText } from "@/data/site-data";

export default function JobsPage() {
  const { t } = useLanguage();

  return (
    <>
      <Header />
      <main className="subpage-main">
        <section className="subpage-hero">
          <div className="container">
            <p className="eyebrow">RECRUIT</p>
            <h1>{t(uiText.jobsPage.heroTitle)}</h1>
            <p>{t(uiText.jobsPage.heroBody)}</p>
          </div>
        </section>
        <ScrollSection className="section">
          <div className="container">
            <SectionIntro
              label="JOB LIST"
              title={t(uiText.jobsPage.introTitle)}
              body={t(uiText.jobsPage.introBody)}
            />
            <JobFilter />
          </div>
        </ScrollSection>
      </main>
      <Footer />
    </>
  );
}
