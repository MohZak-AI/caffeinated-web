"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
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

const CREAM: Rgb = [255, 248, 231];
const IVORY: Rgb = [247, 244, 238];

const STOPS = [0, 0.2, 0.42, 0.64, 0.8, 1];
const STOP_VALUES: Rgb[] = [
  CREAM,
  CREAM,
  CREAM,
  CREAM,
  IVORY,
  IVORY,
];

function rgbToHex(r: number, g: number, b: number): string {
  const to = (n: number) =>
    Math.max(0, Math.min(255, Math.round(n)))
      .toString(16)
      .padStart(2, "0");
  return `#${to(r)}${to(g)}${to(b)}`;
}

function phaseForProgress(p: number): ScrollPhase {
  if (p < 0.42) return "playful";
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

  // The discrete phase, re-derived only at boundaries — keeps context
  // consumers from re-rendering per scroll frame.
  const [phase, setPhase] = useState<ScrollPhase>("playful");
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const next = phaseForProgress(latest);
    if (next !== phase) setPhase(next);
  });

  // Mount gate: the motion-driven layers are client-only (they depend on
  // matchMedia via useReducedMotion), so we render them after hydration to
  // avoid a server/client markup mismatch. useSyncExternalStore guarantees
  // the same initial state on the server and avoids setState-in-effect.
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

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
        </>
      )}

      <CoffeePageBackground />
      {children}
    </ScrollPhaseProvider>
  );
}

function CoffeePageBackground() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 1200"
      preserveAspectRatio="none"
      className="pointer-events-none fixed inset-0 -z-[9] h-screen w-screen opacity-45"
      fill="none"
    >
      <path
        d="M120 980 C220 760 82 660 190 430"
        stroke="var(--cw-orange)"
        strokeWidth="5"
        strokeLinecap="round"
        strokeDasharray="14 22"
        opacity="0.14"
      />
      <path
        d="M505 1020 C620 770 470 665 585 390"
        stroke="var(--cw-teal)"
        strokeWidth="5"
        strokeLinecap="round"
        strokeDasharray="14 22"
        opacity="0.13"
      />
      <path
        d="M1010 995 C1145 745 970 640 1110 360"
        stroke="var(--cw-purple)"
        strokeWidth="5"
        strokeLinecap="round"
        strokeDasharray="14 22"
        opacity="0.1"
      />
      <circle
        cx="86"
        cy="955"
        r="130"
        stroke="var(--cw-orange)"
        strokeWidth="36"
        opacity="0.08"
      />
      <circle
        cx="1310"
        cy="245"
        r="170"
        stroke="var(--cw-teal)"
        strokeWidth="38"
        opacity="0.07"
      />
      <path
        d="M-40 140 C170 92 330 170 520 124 S900 70 1160 122 S1500 105 1540 84"
        stroke="var(--cw-orange)"
        strokeWidth="2"
        opacity="0.15"
      />
      <path
        d="M-40 172 C170 124 330 202 520 156 S900 102 1160 154 S1500 137 1540 116"
        stroke="var(--cw-orange)"
        strokeWidth="2"
        opacity="0.1"
      />
    </svg>
  );
}
