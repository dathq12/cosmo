"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import type { ReactNode } from "react";

type HeroParallaxTextProps = {
  children: ReactNode;
  className?: string;
};

export function HeroParallaxText({ children, className }: HeroParallaxTextProps) {
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const smoothY = useSpring(scrollY, {
    stiffness: 120,
    damping: 24,
    mass: 0.2
  });
  const y = useTransform(smoothY, [0, 800], reduceMotion ? [0, 0] : [0, -54]);
  const rotate = useTransform(smoothY, [0, 800], reduceMotion ? [0, 0] : [0, -1.4]);

  return (
    <motion.div className={className} style={{ y, rotate }}>
      {children}
    </motion.div>
  );
}
