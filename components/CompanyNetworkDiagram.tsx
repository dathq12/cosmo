"use client";

import { useEffect, useId, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

import { groupNetwork } from "@/data/site-data";
import { useLanguage } from "@/components/ui/LanguageProvider";

function NetworkLineIcon({ name }: { name: string }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: 1.8
  };

  if (name === "holding") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path {...common} d="M10 40h28" />
        <path {...common} d="M16 40V16l8-4 8 4v24" />
        <path {...common} d="M8 40V24l8-4" />
        <path {...common} d="M40 40V24l-8-4" />
        <path {...common} d="M22 40V28h4v12" />
        <path {...common} d="M21 18v5" />
        <path {...common} d="M27 18v5" />
      </svg>
    );
  }

  if (name === "cosmo") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path {...common} d="m24 8 15 8-15 8-15-8 15-8Z" />
        <path {...common} d="M9 16v16l15 8 15-8V16" />
        <path {...common} d="M24 24v16" />
        <path {...common} d="m16 12 15 8" />
      </svg>
    );
  }

  if (name === "holistic-cubes") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path {...common} d="M19 10h10" />
        <path {...common} d="M18 14h12v22a6 6 0 0 1-12 0V14Z" />
        <path {...common} d="M21 22h6" />
        <path {...common} d="M21 30h6" />
        <path {...common} d="M24 7v3" />
      </svg>
    );
  }

  if (name === "reiso") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path {...common} d="M20 8h8" />
        <path {...common} d="M21 8v12L12 36a4 4 0 0 0 3.5 6h17a4 4 0 0 0 3.5-6l-9-16V8" />
        <path {...common} d="M17 32h14" />
        <path {...common} d="M20 36c2.4-2 5.6-2 8 0" />
        <path {...common} d="M34 15h4" />
        <path {...common} d="M36 13v4" />
      </svg>
    );
  }

  if (name === "group-related") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path {...common} d="M24 21a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z" />
        <path {...common} d="M13 38c1.4-7 5.2-11 11-11s9.6 4 11 11" />
        <path {...common} d="M11 23a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z" />
        <path {...common} d="M4 37c.8-5.4 3.6-8.6 8.2-9" />
        <path {...common} d="M37 23a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z" />
        <path {...common} d="M35.8 28c4.6.4 7.4 3.6 8.2 9" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path {...common} d="m12 29 12-12 12 12" />
      <path {...common} d="m16 33 8-8 8 8" />
      <path {...common} d="m20 37 4-4 4 4" />
    </svg>
  );
}

const LINKS = [
  { x1: 620, y1: 340, x2: 202, y2: 154 },
  { x1: 620, y1: 340, x2: 202, y2: 428 },
  { x1: 620, y1: 340, x2: 1038, y2: 154 },
  { x1: 620, y1: 340, x2: 1038, y2: 428 },
  { x1: 620, y1: 340, x2: 620, y2: 605 }
];

const LINE_DURATION = 0.5;
const LINE_STAGGER = 0.1;
// Matches the CSS transition duration on .company-network__center /
// .company-network__map::before so the hub finishes fading in before
// the connecting lines and nodes start.
const HUB_REVEAL_DURATION = 0.6;
const LINE_START_DELAY = HUB_REVEAL_DURATION + 0.05;
const NODE_DURATION = 0.45;
const EASE = [0.22, 1, 0.36, 1] as const;

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1081px)");
    setIsDesktop(mql.matches);
    const onChange = () => setIsDesktop(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return isDesktop;
}

export function CompanyNetworkDiagram() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.65 });
  const reduceMotion = useReducedMotion();
  const isDesktop = useIsDesktop();
  const maskIdBase = useId();
  const lineRevealed = isInView || reduceMotion;

  return (
    <div
      className={`company-network__map${lineRevealed ? " is-revealed" : ""}`}
      ref={containerRef}
    >
      <svg
        aria-hidden="true"
        className="company-network__links"
        preserveAspectRatio="none"
        viewBox="0 0 1240 680"
      >
        <defs>
          {LINKS.map((line, index) => (
            <mask
              key={index}
              id={`${maskIdBase}-line-${index}`}
              maskUnits="userSpaceOnUse"
              x={-40}
              y={-40}
              width={1320}
              height={760}
            >
              <motion.line
                x1={line.x1}
                y1={line.y1}
                x2={line.x2}
                y2={line.y2}
                stroke="#fff"
                strokeWidth={24}
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: lineRevealed ? 1 : 0 }}
                transition={{
                  duration: reduceMotion ? 0 : LINE_DURATION,
                  delay: reduceMotion ? 0 : LINE_START_DELAY + index * LINE_STAGGER,
                  ease: EASE
                }}
              />
            </mask>
          ))}
        </defs>
        {LINKS.map((line, index) => (
          <line
            key={index}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            mask={`url(#${maskIdBase}-line-${index})`}
          />
        ))}
      </svg>

      <div className="company-network__center">
        <span className="company-network__orbit" aria-hidden="true" />
        <div className="company-network__icon company-network__icon--center">
          <NetworkLineIcon name="holding" />
        </div>
        <h3>{t(groupNetwork.center.name)}</h3>
        <p>{t(groupNetwork.center.body)}</p>
      </div>

      {groupNetwork.nodes.map((node, index) => {
        const hiddenState = { opacity: 0, y: isDesktop ? 0 : 32, scale: isDesktop ? 0.8 : 1 };
        const visibleState = { opacity: 1, y: 0, scale: 1 };

        return (
          <motion.div
            key={node.id}
            className={`company-network__node company-network__node--${node.position}`}
            initial={reduceMotion ? false : hiddenState}
            animate={reduceMotion ? undefined : isInView ? visibleState : hiddenState}
            transition={{
              duration: isDesktop ? NODE_DURATION : 0.55,
              delay: isDesktop
                ? LINE_START_DELAY + index * LINE_STAGGER + LINE_DURATION * 0.55
                : index * 0.12,
              ease: EASE
            }}
          >
            <div className="company-network__icon">
              <NetworkLineIcon name={node.id} />
            </div>
            <div>
              <h3>{t(node.name)}</h3>
              <p>{t(node.body)}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
