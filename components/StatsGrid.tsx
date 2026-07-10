"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { animate, motion, useInView, useReducedMotion } from "framer-motion";

import { dataMetrics } from "@/data/site-data";
import { useLanguage } from "@/components/ui/LanguageProvider";

type MetricIconName =
  | "accounting"
  | "briefcase"
  | "crown"
  | "desk"
  | "heart"
  | "home"
  | "idea"
  | "instructor"
  | "location"
  | "medal"
  | "pin"
  | "presentation"
  | "runner"
  | "star";

function formatNumber(value: number, decimals: number) {
  return value.toLocaleString("en-US", {
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals
  });
}

function CountUp({
  value,
  suffix = "",
  decimals = 0
}: {
  value: number;
  suffix?: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    if (reduceMotion) {
      setDisplay(value);
      return;
    }

    const controls = animate(0, value, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: setDisplay
    });

    return () => controls.stop();
  }, [isInView, reduceMotion, value]);

  return (
    <span ref={ref}>
      {formatNumber(display, decimals)}
      {suffix}
    </span>
  );
}

type GenderItem = (typeof dataMetrics)["gender"]["items"][number];

function GenderChart({ women, men }: { women: GenderItem; men: GenderItem }) {
  const { t } = useLanguage();
  const chartRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(chartRef, { once: true, amount: 0.4 });
  const reduceMotion = useReducedMotion();
  const [menValue, setMenValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    if (reduceMotion) {
      setMenValue(men.value);
      return;
    }

    const controls = animate(0, men.value, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: setMenValue
    });

    return () => controls.stop();
  }, [isInView, reduceMotion, men.value]);

  const womenValue = Math.max(0, 100 - menValue);

  return (
    <div className="data-gender">
      <div
        ref={chartRef}
        aria-hidden="true"
        className="data-gender__chart"
        style={{ "--men": `${menValue}%` } as CSSProperties}
      >
        <span />
      </div>
      <div className="data-gender__legend">
        <div>
          <span>{t(women.label)}</span>
          <strong>{formatNumber(womenValue, 1)}%</strong>
        </div>
        <div>
          <span>{t(men.label)}</span>
          <strong className="is-cool">{formatNumber(menValue, 1)}%</strong>
        </div>
      </div>
    </div>
  );
}

function GrowthChart() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.4 });
  const reduceMotion = useReducedMotion();

  return (
    <div className="data-growth-chart" aria-hidden="true" ref={containerRef}>
      <motion.svg
        viewBox="0 0 280 130"
        preserveAspectRatio="xMidYMax meet"
        style={{ transformOrigin: "bottom" }}
        initial={reduceMotion ? { scaleY: 1, opacity: 1 } : { scaleY: 0.32, opacity: 0 }}
        animate={isInView ? { scaleY: 1, opacity: 1 } : undefined}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <path
          className="data-growth-chart__wave data-growth-chart__wave--sage"
          d="M18 128C36 106 62 92 92 94C120 96 140 88 154 74C168 58 184 60 200 74C216 88 230 84 242 62C254 42 262 30 266 24V128H18Z"
        />
        <path
          className="data-growth-chart__wave data-growth-chart__wave--teal"
          d="M18 128C42 118 66 108 96 106C124 104 144 92 158 68C170 48 184 38 198 42C212 46 220 62 234 66C248 70 258 44 266 30V128H18Z"
        />
        <path
          className="data-growth-chart__wave data-growth-chart__wave--amber"
          d="M122 128C138 118 150 94 162 62C174 28 186 10 198 14C210 18 216 56 228 64C240 72 246 32 256 14C262 6 265 18 266 28V128H122Z"
        />
      </motion.svg>
    </div>
  );
}

function MetricIcon({ name }: { name: MetricIconName }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: 1.9
  };

  if (name === "runner") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path {...common} d="M18 5.5a2.5 2.5 0 1 0-5 0 2.5 2.5 0 0 0 5 0Z" />
        <path {...common} d="m13 10 5 3 3.5-2" />
        <path {...common} d="m16 13-3 5-4 1.5" />
        <path {...common} d="m18 14 2 5 4 4" />
      </svg>
    );
  }

  if (name === "presentation") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path {...common} d="M6 7h20v13H6z" />
        <path {...common} d="M11 25h10" />
        <path {...common} d="M16 20v5" />
        <path {...common} d="M11 16v-4" />
        <path {...common} d="M16 16v-7" />
        <path {...common} d="M21 16v-5" />
      </svg>
    );
  }

  if (name === "instructor") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path {...common} d="M16 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
        <path {...common} d="M9 25c1-5 3.2-8 7-8s6 3 7 8" />
        <path {...common} d="M7 12 5 21" />
        <path {...common} d="m25 12 2 9" />
      </svg>
    );
  }

  if (name === "pin" || name === "location") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path {...common} d="M16 4c-4.1 0-7 3-7 7 0 5.5 7 14 7 14s7-8.5 7-14c0-4-2.9-7-7-7Z" />
        <path {...common} d="M16 13.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
      </svg>
    );
  }

  if (name === "desk") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path {...common} d="M8 14h16v10H8z" />
        <path {...common} d="M11 14v-3a5 5 0 0 1 10 0v3" />
        <path {...common} d="M12 24v3" />
        <path {...common} d="M20 24v3" />
      </svg>
    );
  }

  if (name === "idea") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path {...common} d="M11 17a7 7 0 1 1 10 0c-1.6 1.4-2.1 2.7-2.2 4h-5.6c-.1-1.3-.6-2.6-2.2-4Z" />
        <path {...common} d="M13 25h6" />
        <path {...common} d="M14 28h4" />
      </svg>
    );
  }

  if (name === "accounting") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path {...common} d="M8 9h16v16H8z" />
        <path {...common} d="M11 13h10" />
        <path {...common} d="M11 17h4" />
        <path {...common} d="M19 17h2" />
        <path {...common} d="M11 21h4" />
        <path {...common} d="M19 21h2" />
      </svg>
    );
  }

  if (name === "briefcase") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path {...common} d="M6 11h20v14H6z" />
        <path {...common} d="M12 11V8h8v3" />
        <path {...common} d="M6 16h20" />
      </svg>
    );
  }

  if (name === "home") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path {...common} d="m6 15 10-9 10 9" />
        <path {...common} d="M9 14v12h14V14" />
        <path {...common} d="M13 26v-7h6v7" />
      </svg>
    );
  }

  if (name === "crown") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path {...common} d="m7 13 5 5 4-8 4 8 5-5-2 11H9z" />
      </svg>
    );
  }

  if (name === "heart") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path {...common} d="M16 26S6 20.5 6 12.5C6 8.8 8.4 7 11 7c2 0 3.7 1.2 5 3 1.3-1.8 3-3 5-3 2.6 0 5 1.8 5 5.5C26 20.5 16 26 16 26Z" />
      </svg>
    );
  }

  if (name === "star") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path {...common} d="m16 5 3.4 7 7.6 1.1-5.5 5.3 1.3 7.6-6.8-3.6L9.2 26l1.3-7.6L5 13.1 12.6 12z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path {...common} d="M16 4a6 6 0 0 1 6 6v3a6 6 0 0 1-12 0v-3a6 6 0 0 1 6-6Z" />
      <path {...common} d="M11 19 9.5 26.5l6.5-3.6 6.5 3.6L21 19" />
      <path {...common} d="M12 11h8" />
    </svg>
  );
}

export function StatsGrid() {
  const { t } = useLanguage();
  const women = dataMetrics.gender.items[0];
  const men = dataMetrics.gender.items[1];

  return (
    <div className="data-dashboard">
      <article className="data-card data-card--growth">
        <div>
          <h3>{t(dataMetrics.growth.label)}</h3>
          <div className="data-card__value data-card__value--large">
            <CountUp value={dataMetrics.growth.value} decimals={1} suffix={dataMetrics.growth.suffix} />
          </div>
          <p>{t(dataMetrics.growth.note)}</p>
        </div>
        <GrowthChart />
      </article>

      <article className="data-card data-card--gender">
        <h3>{t(dataMetrics.gender.label)}</h3>
        <GenderChart women={women} men={men} />
      </article>

      <article className="data-card data-card--rate data-card--marriage">
        <h3>{t(dataMetrics.marriage.label)}</h3>
        <div className="data-card__value">
          <CountUp value={dataMetrics.marriage.value} decimals={1} suffix={dataMetrics.marriage.suffix} />
        </div>
        {/* <div className="data-people-illustration" aria-hidden="true">
          <span />
          <span />
          <i />
        </div> */}
      </article>

      <article className="data-card data-card--rate data-card--parental">
        <h3>{t(dataMetrics.parentalLeave.label)}</h3>
        <div className="data-card__value">
          <CountUp
            value={dataMetrics.parentalLeave.value}
            suffix={dataMetrics.parentalLeave.suffix}
          />
        </div>
        {/* <div className="data-family-illustration" aria-hidden="true">
          <span />
          <span />
          <i />
        </div> */}
      </article>

      <article className="data-card data-card--benefits">
        <h3>{t(dataMetrics.benefits.label)}</h3>
        <div className="data-benefits">
          {dataMetrics.benefits.items.map((item) => (
            <div className="data-benefit" key={item.label.jp}>
              <span className="data-benefit__icon">
                <MetricIcon name={item.icon} />
              </span>
              <span>{t(item.label)}</span>
            </div>
          ))}
        </div>
      </article>

      <article className="data-card data-card--roles">
        <div className="data-role-bars">
          <h3>{t(dataMetrics.roles.label)}</h3>
          {dataMetrics.roles.items.map((item) => (
            <div
              className={`data-role-stat${item.value === 63 ? " data-role-stat--primary" : ""}`}
              key={item.label.jp}
            >
              <span>{t(item.label)}</span>
              <strong>
                <CountUp value={item.value} decimals={item.value % 1 === 0 ? 0 : 1} suffix="%" />
              </strong>
            </div>
          ))}
        </div>
      </article>

      <article className="data-card data-card--awards">
        <div className="data-awards__intro">
          <span className="data-awards__trophy">
            <MetricIcon name="medal" />
          </span>
          <div>
            <h3>{t(dataMetrics.awards.label)}</h3>
            <p>{t(dataMetrics.awards.body)}</p>
          </div>
        </div>
        <div className="data-awards__items">
          {dataMetrics.awards.items.map((item) => (
            <div className="data-award" key={item.label.jp}>
              <span>
                <MetricIcon name={item.icon} />
              </span>
              <strong>{t(item.label)}</strong>
            </div>
          ))}
        </div>
      </article>
    </div>
  );
}
