"use client";

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

/**
 * Vertical parallax for a block, driven by its own position in the viewport.
 * Only `y` is animated (never `x`) so it can never introduce horizontal
 * overflow. Under reduced motion the element is rendered statically.
 */
export function Parallax({
  children,
  className,
  from = 48,
  to = -48,
}: {
  children: ReactNode;
  className?: string;
  /** y offset (px) when the element first enters from the bottom. */
  from?: number;
  /** y offset (px) when the element exits toward the top. */
  to?: number;
}) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [from, to]);

  if (reduceMotion) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div ref={ref} className={className} style={{ y }}>
      {children}
    </motion.div>
  );
}
