"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

/**
 * The parchment sheet. Content stays visible at all times (its inner blocks do
 * their own on-scroll reveal); the "magic" here is a one-shot gilded gleam that
 * travels down the sheet the first time it enters view — the unrolling shimmer
 * that sells the modern → medieval switch. Fail-safe: if the sweep never runs,
 * nothing is hidden.
 */
export function MagicSheet({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div className={className}>
      {children}

      {/* One-shot gilded gleam sweeping down the unrolling parchment */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 z-40 h-1/4"
        style={{
          background:
            "linear-gradient(180deg, transparent, rgba(201,168,106,0.32), rgba(255,255,255,0.5), rgba(201,168,106,0.32), transparent)",
          mixBlendMode: "soft-light",
        }}
        initial={{ y: "-130%", opacity: 0 }}
        whileInView={{ y: "430%", opacity: [0, 1, 1, 0] }}
        viewport={{ once: true, amount: 0.12 }}
        transition={{ duration: 1.7, ease: "easeInOut", delay: 0.15 }}
      />
    </div>
  );
}

/**
 * A wooden dowel that pops into place as the scroll unfurls — the top roller
 * drops down, the bottom roller rises up, both with a soft spring overshoot.
 */
export function MagicDowel({
  position,
  className,
}: {
  position: "top" | "bottom";
  className?: string;
}) {
  const reduce = useReducedMotion();
  const cls = `scroll-roller ${className ?? ""}`;

  if (reduce) {
    return <div className={cls} aria-hidden="true" />;
  }

  const from = position === "top" ? -16 : 16;

  return (
    <motion.div
      aria-hidden="true"
      className={cls}
      initial={{ opacity: 0, y: from, scaleX: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scaleX: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 18,
        delay: position === "top" ? 0.05 : 0.2,
      }}
    />
  );
}

const SPARKLES = [
  { left: "8%", top: "26%", size: 12, delay: 0 },
  { left: "33%", top: "12%", size: 9, delay: 0.6 },
  { left: "61%", top: "30%", size: 14, delay: 1.1 },
  { left: "88%", top: "16%", size: 10, delay: 0.35 },
  { left: "74%", top: "52%", size: 8, delay: 1.5 },
];

/**
 * A scatter of gold twinkles drifting over the top of the scroll — a gentle,
 * looping shimmer that keeps the "magic switch" alive after the unfurl.
 */
export function Sparkles() {
  const reduce = useReducedMotion();
  if (reduce) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 z-[5] h-[420px]"
    >
      {SPARKLES.map((s, i) => (
        <motion.span
          key={i}
          className="absolute font-medieval-display text-[#c9a86a]"
          style={{ left: s.left, top: s.top, fontSize: s.size }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: [0, 1, 0], scale: [0.6, 1.15, 0.6] }}
          transition={{
            duration: 2.6,
            ease: "easeInOut",
            repeat: Infinity,
            delay: s.delay,
            repeatDelay: 1.4,
          }}
        >
          ✦
        </motion.span>
      ))}
    </div>
  );
}
