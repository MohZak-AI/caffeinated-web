"use client";

import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  type MotionValue,
} from "motion/react";
import {
  ScrollPhaseProvider,
  type ScrollPhase,
} from "./use-scroll-phase";

/* ------------------------------------------------------------------ */
/* Phase color anchors. Small plateaus keep each phase distinct rather
   than blending linearly across the whole scroll.                          */
/* ------------------------------------------------------------------ */

type Rgb = [number, number, number];

const CREAM: Rgb = [255, 248, 231]; // #fff8e7 — playful origin
const CHARCOAL: Rgb = [21, 17, 43]; // #15112b — deep-tech transition
const IVORY: Rgb = [247, 244, 238]; // #f7f4ee — elite finality

// scroll progress stops + the channel value at each stop. Plateaus keep each
// phase fully saturated while the user reads it, and confine the morph to the
// hand-off zones: hold cream through the hero, deepen to charcoal as the work
// section enters, hold charcoal across all four case studies, then warm into
// ivory as the elite finale arrives.
const STOPS = [0, 0.2, 0.34, 0.64, 0.8, 1];
const STOP_VALUES: Rgb[] = [
  CREAM,
  CREAM,
  CHARCOAL,
  CHARCOAL,
  IVORY,
  IVORY,
];

// The deep-tech glow/vignette overlay fades in only across the charcoal
// plateau so the luxury-coding atmosphere is exclusive to phase 2.
const GLOW_STOPS = [0.22, 0.36, 0.62, 0.82];
const GLOW_VALUES = [0, 1, 1, 0];

function rgbToHex(r: number, g: number, b: number): string {
  const to = (n: number) =>
    Math.max(0, Math.min(255, Math.round(n)))
      .toString(16)
      .padStart(2, "0");
  return `#${to(r)}${to(g)}${to(b)}`;
}

function phaseForProgress(p: number): ScrollPhase {
  if (p < 0.34) return "playful";
  if (p < 0.8) return "tech";
  return "elite";
}

/* ------------------------------------------------------------------ */
/* Orchestrator                                                          */
/* ------------------------------------------------------------------ */

export function ScrollPhaseOrchestrator({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  // One derived motion value for the whole background hex string, composed
  // from the three interpolated channels. Updated per-frame by Motion without
  // re-rendering React.
  const r = useTransform(
    scrollYProgress,
    STOPS,
    STOP_VALUES.map((c) => c[0]),
  );
  const g = useTransform(
    scrollYProgress,
    STOPS,
    STOP_VALUES.map((c) => c[1]),
  );
  const b = useTransform(
    scrollYProgress,
    STOPS,
    STOP_VALUES.map((c) => c[2]),
  );
  const bg = useTransform(
    [r, g, b] as unknown as MotionValue<number>[],
    ([rr, gg, bb]) => rgbToHex(rr as number, gg as number, bb as number),
  );

  // Deep-tech atmosphere opacity — radial glows + vignette + noise that only
  // exist while the charcoal plateau is on screen.
  const glowOpacity = useTransform(scrollYProgress, GLOW_STOPS, GLOW_VALUES);

  // The discrete phase, re-derived only at boundaries — keeps context
  // consumers from re-rendering per scroll frame.
  const [phase, setPhase] = useState<ScrollPhase>("playful");
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const next = phaseForProgress(latest);
    if (next !== phase) setPhase(next);
  });

  // Mount gate: the motion-driven layers are client-only (they depend on
  // matchMedia via useReducedMotion), so we render them after hydration to
  // avoid a server/client markup mismatch.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Mirror the active phase onto <html data-phase> for CSS hooks.
  useEffect(() => {
    document.documentElement.setAttribute("data-phase", phase);
  }, [phase]);

  const contextValue = useMemo(() => phase, [phase]);

  return (
    <ScrollPhaseProvider value={contextValue}>
      {/*
        Fixed full-bleed backdrop. Two layers:
        • a static .scroll-phase-backdrop that paints the cream fallback and is
          frozen to cream under reduced motion (see globals.css);
        • a motion-driven twin that animates the background per scroll. It is
          rendered only when motion is allowed, so the freeze is automatic.
        The data-bg attribute mirrors the live hex for observability/tests.
      */}
      <div className="scroll-phase-backdrop" aria-hidden="true" />

      {mounted && !reduceMotion && (
        <>
          <motion.div
            aria-hidden="true"
            data-testid="scroll-phase-backdrop"
            className="scroll-phase-backdrop motion-backdrop"
            style={{ background: bg }}
          />
          {/* Deep-tech luxury atmosphere — only visible across phase 2. */}
          <motion.div
            aria-hidden="true"
            data-testid="scroll-phase-glow"
            className="scroll-phase-glow"
            style={{ opacity: glowOpacity }}
          />
        </>
      )}

      {children}
    </ScrollPhaseProvider>
  );
}
