"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { navItems, uiText } from "@/data/site-data";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { CosmoLogo } from "@/components/ui/CosmoLogo";
import { useLanguage } from "@/components/ui/LanguageProvider";
import { LanguageToggle } from "@/components/ui/LanguageToggle";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className={`site-header ${scrolled ? "site-header--scrolled" : ""}`}>
        <Link href="/" className="site-header__brand">
          <CosmoLogo compact />
        </Link>
        <nav className="site-header__nav" aria-label="Primary">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>
              {t(item.label)}
            </a>
          ))}
        </nav>
        <div className="site-header__actions">
          <LanguageToggle />
          <ButtonLink href="#recruit">{t(uiText.common.entry)}</ButtonLink>
        </div>
        <button
          aria-label="Open menu"
          className={`menu-button ${open ? "menu-button--open" : ""}`}
          onClick={() => setOpen((value) => !value)}
          type="button"
        >
          <span />
          <span />
        </button>
      </header>

      <div className={`mobile-menu ${open ? "mobile-menu--open" : ""}`}>
        <div className="mobile-menu__inner">
          <CosmoLogo />
          <LanguageToggle />
          <nav aria-label="Mobile">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
                {t(item.label)}
              </a>
            ))}
            <a href="/jobs" onClick={() => setOpen(false)}>
              {t(uiText.common.jobsList)}
            </a>
          </nav>
        </div>
      </div>
    </>
  );
}
