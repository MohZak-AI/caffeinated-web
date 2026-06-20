"use client";

import type { ReactNode } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export function ScrollReactiveCharacter({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const { scrollYProgress } = useScroll();

  const y = useTransform(scrollYProgress, [0, 1], [20, -20]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-3, 3]);

  return (
    <motion.div
      style={{ y, rotate }}
      transition={{ type: "spring", stiffness: 60, damping: 20 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
