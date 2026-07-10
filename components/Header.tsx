"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { navItems, uiText } from "@/data/site-data";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { CosmoLogo } from "@/components/ui/CosmoLogo";
import { useLanguage } from "@/components/ui/LanguageProvider";
import { LanguageToggle } from "@/components/ui/LanguageToggle";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const colorSwapTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const TOP_THRESHOLD = 32;
    const DELTA_THRESHOLD = 4;
    const HIDE_TRANSITION_MS = 460;

    lastScrollY.current = window.scrollY;
    setScrolled(window.scrollY > TOP_THRESHOLD);

    const clearColorSwap = () => {
      if (colorSwapTimer.current) {
        clearTimeout(colorSwapTimer.current);
        colorSwapTimer.current = null;
      }
    };

    const onScroll = () => {
      if (ticking.current) {
        return;
      }

      ticking.current = true;
      window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const scrollDelta = currentScrollY - lastScrollY.current;
        const pastTop = currentScrollY > TOP_THRESHOLD;

        if (!pastTop) {
          clearColorSwap();
          setHidden(false);
          setScrolled(false);
        } else if (scrollDelta > DELTA_THRESHOLD) {
          // Hide first; swap to the scrolled background only once it's fully
          // off-screen so the color change is never seen mid-slide.
          setHidden(true);
          clearColorSwap();
          colorSwapTimer.current = setTimeout(() => setScrolled(true), HIDE_TRANSITION_MS);
        } else if (scrollDelta < -DELTA_THRESHOLD) {
          // Reveal with the scrolled background already applied so nothing
          // visibly recolors while it slides back into view.
          clearColorSwap();
          setScrolled(true);
          setHidden(false);
        }

        lastScrollY.current = currentScrollY;
        ticking.current = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearColorSwap();
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`site-header  ${scrolled ? "site-header--scrolled" : ""} ${
          hidden && !open ? "site-header--hidden" : ""
        }`}
      >
        <Link href="/" className={`site-header__brand ${open ? "logo--black" : ""}`}>
          <CosmoLogo compact />
        </Link>
        <nav className="site-header__nav" aria-label="Primary">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              {t(item.label)}
            </Link>
          ))}
        </nav>
        <div className="site-header__actions">
          <LanguageToggle />
          <ButtonLink href="/jobs">{t(uiText.common.entry)}</ButtonLink>
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
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
                {t(item.label)}
              </Link>
            ))}
            <Link href="/jobs" onClick={() => setOpen(false)}>
              {t(uiText.common.jobsList)}
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
}
