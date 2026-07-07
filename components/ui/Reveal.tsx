"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
};

const directionalOffsets = {
  up: { x: 0, y: 36 },
  down: { x: 0, y: -36 },
  left: { x: 44, y: 0 },
  right: { x: -44, y: 0 }
};

export function Reveal({
  children,
  delay = 0,
  className,
  direction = "up"
}: RevealProps) {
  const reduceMotion = useReducedMotion();
  const offset = directionalOffsets[direction];

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? { opacity: 1 } : { opacity: 0, x: offset.x, y: offset.y }}
      whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.22 }}
      transition={{
        duration: 0.86,
        delay,
        ease: [0.22, 1, 0.36, 1]
      }}
    >
      {children}
    </motion.div>
  );
}
