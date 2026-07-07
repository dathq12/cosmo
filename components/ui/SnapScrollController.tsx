"use client";

import { useEffect } from "react";

type SnapScrollControllerProps = {
  selector?: string;
  offset?: number;
  viewportAllowance?: number;
};

export function SnapScrollController({
  selector = "[data-snap-section='true']",
  offset = 104,
  viewportAllowance = 40
}: SnapScrollControllerProps) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const media = window.matchMedia("(min-width: 1024px)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let locked = false;
    let unlockTimer: ReturnType<typeof setTimeout> | null = null;
    let targetTop: number | null = null;

    const unlock = () => {
      locked = false;
      targetTop = null;
      if (unlockTimer) {
        clearTimeout(unlockTimer);
        unlockTimer = null;
      }
    };

    const getSections = () =>
      Array.from(document.querySelectorAll<HTMLElement>(selector)).filter(
        (section) => section.offsetHeight > 0
      );

    const getSectionTops = (sections: HTMLElement[]) =>
      sections.map((section) => Math.max(0, section.offsetTop - offset));

    const getAvailableHeight = () => window.innerHeight - offset - viewportAllowance;

    const getCurrentIndex = (tops: number[]) => {
      const currentY = window.scrollY;
      let index = 0;

      tops.forEach((top, topIndex) => {
        if (top <= currentY + 24) {
          index = topIndex;
        }
      });

      return index;
    };

    const resolveTargetIndex = (sections: HTMLElement[], tops: number[], direction: 1 | -1) => {
      const currentY = window.scrollY;
      const currentIndex = getCurrentIndex(tops);
      const currentTop = tops[currentIndex] ?? 0;
      const deltaFromCurrent = currentY - currentTop;
      const currentSection = sections[currentIndex];
      const availableHeight = getAvailableHeight();
      const isLongSection =
        currentSection.offsetHeight > availableHeight + viewportAllowance;
      const currentSectionBottom = currentSection.offsetTop + currentSection.offsetHeight;
      const bottomReached = currentY + availableHeight >= currentSectionBottom - 40;
      const topReached = currentY <= currentTop + 40;

      if (direction > 0) {
        if (isLongSection && !bottomReached) {
          return currentIndex;
        }
        return Math.min(tops.length - 1, currentIndex + 1);
      }

      if (currentIndex === 0) {
        return 0;
      }

      if (isLongSection && !topReached) {
        return currentIndex;
      }

      return deltaFromCurrent > 64 ? currentIndex : currentIndex - 1;
    };

    const onWheel = (event: WheelEvent) => {
      if (!media.matches || reducedMotion.matches) return;
      if (locked) {
        event.preventDefault();
        return;
      }

      if (Math.abs(event.deltaY) < 16) return;

      const sections = getSections();
      if (sections.length < 2) return;
      const tops = getSectionTops(sections);

      const direction = event.deltaY > 0 ? 1 : -1;
      const nextIndex = resolveTargetIndex(sections, tops, direction);
      const currentIndex = getCurrentIndex(tops);

      if (nextIndex === currentIndex) return;

      event.preventDefault();
      locked = true;

      targetTop = tops[nextIndex];

      window.scrollTo({
        top: targetTop,
        behavior: "smooth"
      });

      unlockTimer = setTimeout(unlock, 1200);
    };

    const onScroll = () => {
      if (!locked || targetTop === null) return;
      if (Math.abs(window.scrollY - targetTop) <= 8) {
        unlock();
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onScroll);
      unlock();
    };
  }, [offset, selector, viewportAllowance]);

  return null;
}
