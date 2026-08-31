"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: Direction;
  distance?: number;
  duration?: number;
}

const OFFSETS: Record<Direction, { x?: number; y?: number }> = {
  up: { y: 30 },
  down: { y: -30 },
  left: { x: 30 },
  right: { x: -30 },
};

export default function Reveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  distance,
  duration = 0.9,
}: RevealProps) {
  const prefersReducedMotion = useReducedMotion();

  const base = OFFSETS[direction];
  const offset = {
    x: base.x ? Math.sign(base.x) * (distance ?? Math.abs(base.x)) : 0,
    y: base.y ? Math.sign(base.y) * (distance ?? Math.abs(base.y)) : 0,
  };

  return (
    <motion.div
      className={className}
      initial={prefersReducedMotion ? false : { opacity: 0, ...offset }}
      whileInView={
        prefersReducedMotion ? { opacity: 1, x: 0, y: 0 } : undefined
      }
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      viewport={{ once: true, amount: 0.15 }}
    >
      {children}
    </motion.div>
  );
}
