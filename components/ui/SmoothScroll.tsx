"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export function SmoothScroll() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = window.matchMedia("(min-width: 1080px)");

    let lenis: Lenis | null = null;
    let frameId: number;

    const start = () => {
      if (lenis || reducedMotion.matches || !desktop.matches) return;

      lenis = new Lenis({
        duration: 0.6,
        easing: (t: number) => 1 - Math.pow(1 - t, 3)
      });

      const raf = (time: number) => {
        lenis?.raf(time);
        frameId = requestAnimationFrame(raf);
      };
      frameId = requestAnimationFrame(raf);
    };

    const stop = () => {
      if (!lenis) return;
      cancelAnimationFrame(frameId);
      lenis.destroy();
      lenis = null;
    };

    const onBreakpointChange = () => (desktop.matches ? start() : stop());

    start();
    desktop.addEventListener("change", onBreakpointChange);

    return () => {
      desktop.removeEventListener("change", onBreakpointChange);
      stop();
    };
  }, []);

  return null;
}
