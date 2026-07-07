"use client";

import { useState } from "react";

import { faqs } from "@/data/site-data";
import { useLanguage } from "@/components/ui/LanguageProvider";

export function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0);
  const { t } = useLanguage();

  return (
    <div className="faq-list">
      {faqs.map((faq, index) => {
        const isOpen = open === index;
        return (
          <div className={`faq-item ${isOpen ? "faq-item--open" : ""}`} key={t(faq.question)}>
            <button type="button" onClick={() => setOpen(isOpen ? null : index)}>
              <span>{t(faq.question)}</span>
              <span aria-hidden="true">{isOpen ? "−" : "+"}</span>
            </button>
            <div className="faq-item__body">
              <p>{t(faq.answer)}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
