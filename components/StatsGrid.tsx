"use client";

import { useEffect, useRef, useState } from "react";

import { metrics } from "@/data/site-data";
import { useLanguage } from "@/components/ui/LanguageProvider";

function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        const startedAt = performance.now();
        const duration = 1100;

        const tick = (now: number) => {
          const progress = Math.min((now - startedAt) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplay(Math.round(value * eased));
          if (progress < 1) requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
        observer.disconnect();
      },
      { threshold: 0.35 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

export function StatsGrid() {
  const { t } = useLanguage();

  return (
    <div className="stats-grid">
      {metrics.map((metric) => (
        <div className="stat-card" key={metric.label.jp}>
          <div className="stat-card__value">
            <CountUp value={metric.value} suffix={metric.suffix} />
          </div>
          <p>{t(metric.label)}</p>
        </div>
      ))}
    </div>
  );
}
