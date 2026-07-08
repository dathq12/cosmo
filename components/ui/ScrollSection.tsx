"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

type ScrollSectionProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  snap?: boolean;
};

export function ScrollSection({
  children,
  className,
  id,
  snap = true
}: ScrollSectionProps) {
  const ref = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 0.5, 1], reduceMotion ? [0, 0, 0] : [64, 0, -48]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.18, 0.82, 1],
    reduceMotion ? [1, 1, 1, 1] : [0.4, 1, 1, 0.6]
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    reduceMotion ? [1, 1, 1] : [0.985, 1, 0.992]
  );

  return (
    <section
      ref={ref}
      id={id}
      data-snap-section={snap ? "true" : "false"}
      className={`scroll-section ${className ?? ""}`.trim()}
    >
      <motion.div
        className="scroll-section__inner"
        style={{ y, opacity, scale }}
      >
        {children}
      </motion.div>
    </section>
  );
}
