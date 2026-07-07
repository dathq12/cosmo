"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

const strips = [
  {
    src: "/assets/hero-lab-talk.png",
    alt: "Cosmo engineer explaining a product",
    className: "hero-visual__strip-card hero-visual__strip-card--tall"
  },
  {
    src: "/assets/hero-salon-demo.png",
    alt: "Cosmo presentation in a salon",
    className: "hero-visual__strip-card"
  },
  {
    src: "/assets/hero-design-review.png",
    alt: "Cosmo product design review",
    className: "hero-visual__strip-card"
  },
  {
    src: "/assets/hero-meeting-circle.png",
    alt: "Cosmo team meeting",
    className: "hero-visual__strip-card"
  }
];

export function HeroVisual() {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 22,
    mass: 0.2
  });

  const baseY = useTransform(smoothProgress, [0, 1], reduceMotion ? [0, 0] : [0, 84]);
  const baseScale = useTransform(smoothProgress, [0, 1], reduceMotion ? [1, 1] : [1.02, 1.12]);
  const baseRotate = useTransform(smoothProgress, [0, 1], reduceMotion ? [0, 0] : [-1.2, 2.8]);

  const ambientY = useTransform(smoothProgress, [0, 1], reduceMotion ? [0, 0] : [0, -96]);
  const ambientScale = useTransform(smoothProgress, [0, 1], reduceMotion ? [1, 1] : [1.12, 1.02]);
  const ambientRotate = useTransform(smoothProgress, [0, 1], reduceMotion ? [0, 0] : [4, -5]);

  const featureY = useTransform(smoothProgress, [0, 1], reduceMotion ? [0, 0] : [0, -120]);
  const featureX = useTransform(smoothProgress, [0, 1], reduceMotion ? [0, 0] : [0, -36]);
  const featureRotate = useTransform(smoothProgress, [0, 1], reduceMotion ? [0, 0] : [-7, 5]);
  const featureScale = useTransform(smoothProgress, [0, 1], reduceMotion ? [1, 1] : [1.02, 0.95]);

  const topY = useTransform(smoothProgress, [0, 1], reduceMotion ? [0, 0] : [0, -76]);
  const topX = useTransform(smoothProgress, [0, 1], reduceMotion ? [0, 0] : [0, 58]);
  const topRotate = useTransform(smoothProgress, [0, 1], reduceMotion ? [0, 0] : [7, -4]);

  const bottomY = useTransform(smoothProgress, [0, 1], reduceMotion ? [0, 0] : [0, -36]);
  const bottomX = useTransform(smoothProgress, [0, 1], reduceMotion ? [0, 0] : [0, -72]);
  const bottomRotate = useTransform(smoothProgress, [0, 1], reduceMotion ? [0, 0] : [-9, 6]);

  const sideY = useTransform(smoothProgress, [0, 1], reduceMotion ? [0, 0] : [0, -144]);
  const sideRotate = useTransform(smoothProgress, [0, 1], reduceMotion ? [0, 0] : [12, -10]);

  const stripY = useTransform(smoothProgress, [0, 1], reduceMotion ? [0, 0] : [0, -58]);
  const stripRotate = useTransform(smoothProgress, [0, 1], reduceMotion ? [0, 0] : [-2, 3]);

  return (
    <div ref={ref} className="hero__backdrop hero-visual" aria-hidden="true">
      <motion.div
        className="hero-visual__ambient"
        style={{ y: ambientY, scale: ambientScale, rotate: ambientRotate }}
      >
        <Image
          src="/assets/hero-master-collage.png"
          alt=""
          fill
          priority
          sizes="100vw"
        />
      </motion.div>

      <motion.div
        className="hero-visual__base"
        style={{ y: baseY, scale: baseScale, rotate: baseRotate }}
      >
        <Image src="/assets/hero-open-office.png" alt="" fill priority sizes="100vw" />
      </motion.div>

      <div className="hero-visual__wash hero-visual__wash--left" />
      <div className="hero-visual__wash hero-visual__wash--right" />
      <div className="hero-visual__glow hero-visual__glow--one" />
      <div className="hero-visual__glow hero-visual__glow--two" />

      <div className="hero-visual__stage">
        <motion.div
          className="hero-visual__panel hero-visual__panel--feature"
          style={{ y: featureY, x: featureX, rotate: featureRotate, scale: featureScale }}
        >
          <Image
            src="/assets/hero-office-lead.png"
            alt=""
            fill
            priority
            sizes="(max-width: 720px) 72vw, 26vw"
          />
        </motion.div>

        <motion.div
          className="hero-visual__panel hero-visual__panel--top"
          style={{ y: topY, x: topX, rotate: topRotate }}
        >
          <Image
            src="/assets/hero-team-product.png"
            alt=""
            fill
            priority
            sizes="(max-width: 720px) 62vw, 28vw"
          />
        </motion.div>

        <motion.div
          className="hero-visual__panel hero-visual__panel--bottom"
          style={{ y: bottomY, x: bottomX, rotate: bottomRotate }}
        >
          <Image
            src="/assets/hero-client-consult.png"
            alt=""
            fill
            sizes="(max-width: 720px) 54vw, 21vw"
          />
        </motion.div>

        <motion.div
          className="hero-visual__panel hero-visual__panel--side"
          style={{ y: sideY, rotate: sideRotate }}
        >
          <Image
            src="/assets/hero-engineer-assembly.png"
            alt=""
            fill
            sizes="(max-width: 720px) 40vw, 16vw"
          />
        </motion.div>

        <motion.div className="hero-visual__strip" style={{ y: stripY, rotate: stripRotate }}>
          {strips.map((strip) => (
            <div key={strip.src} className={strip.className}>
              <Image src={strip.src} alt={strip.alt} fill sizes="160px" />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
