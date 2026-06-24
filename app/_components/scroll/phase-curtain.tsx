"use client";

import { useRef, useSyncExternalStore } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

/**
 * A themed seam between two scroll phases. Both variants are scroll-tied so the
 * "transition" is a parallax hand-off rather than a flat gradient. Each renders
 * a static fallback under reduced motion.
 *
 *  • unfurl   — a navy board with a hand-drawn scalloped crest that rises to
 *               swallow the cream hero as it scrolls away, edged with a gilded
 *               hairline that cues the parchment about to unfurl below it.
 *  • coderain — a band of single-accent monospace glyphs cascading downward,
 *               resolving into the dark terminal finale.
 *
 * Both are decorative (aria-hidden) and pinned with `inset-x-0` + `overflow`
 * clipping so they never introduce horizontal scroll.
 */
export function PhaseCurtain({
  variant,
  className = "",
}: {
  variant: "unfurl" | "coderain";
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  // Hydration-safe mount gate: always render the motion-capable markup during
  // SSR and the first client render so server/client trees match. After mount,
  // reduced-motion preferences switch to the static fallback.
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const showStatic = mounted && reduceMotion;

  // Track this seam's own progress through the viewport so the hand-off feels
  // anchored to scroll position, not a one-shot fade.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  if (showStatic) {
    return (
      <div
        ref={ref}
        aria-hidden="true"
        className={`phase-curtain phase-curtain--${variant} phase-curtain--static ${className}`}
      />
    );
  }

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`phase-curtain phase-curtain--${variant} ${className}`}
    >
      {variant === "unfurl" ? (
        <UnfurlCurtain progress={scrollYProgress} />
      ) : (
        <CodeRainCurtain progress={scrollYProgress} />
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Hero → Pricing : the parchment unfurl                              */
/* ------------------------------------------------------------------ */

function UnfurlCurtain({ progress }: { progress: ReturnType<typeof useScroll>["scrollYProgress"] }) {
  // The crest (the "unrolling" gold hairline) rises and brightens as the hero
  // scrolls away. The gradient fill behind it is fixed so the cream→navy
  // color hand-off stays perfectly smooth — only the decorative crest moves.
  const crestY = useTransform(progress, [0, 0.5, 1], [10, 0, -8]);
  const crestOpacity = useTransform(progress, [0, 0.45, 0.85], [0, 1, 0.6]);

  return (
    <>
      {/* Fixed gradient: transparent (cream shows through) → the board's exact
          navy so the seam is invisible. This replaces the original flat fade. */}
      <div className="phase-curtain__board" />
      {/* Decorative gilded wave crest riding the transition edge. */}
      <motion.svg
        className="phase-curtain__crest"
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        style={{ y: crestY, opacity: crestOpacity }}
      >
        <path
          d="M0,30 C120,6 240,54 360,30 C480,6 600,54 720,30 C840,6 960,54 1080,30 C1200,6 1320,54 1440,30"
          fill="none"
          stroke="var(--cw-gold-soft)"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M0,38 C120,14 240,62 360,38 C480,14 600,62 720,38 C840,14 960,62 1080,38 C1200,14 1320,62 1440,38"
          fill="none"
          stroke="var(--cw-gold-soft)"
          strokeWidth="1"
          opacity="0.45"
          vectorEffect="non-scaling-stroke"
        />
      </motion.svg>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Pricing → Finale : the code-rain                                   */
/* ------------------------------------------------------------------ */

// A fixed, hand-picked glyph grid. Deterministic (seeded purely from the
// column/row index) so it SSR-matches and stays tasteful — single accent,
// low density — rather than a maximalist matrix. No Math.random here: that
// would diverge between server and client and force a hydration re-render.
const GLYPHS = "01{}<>/$;".split("");
const COLUMNS = 28;
const ROWS = 6;

function CodeRainCurtain({
  progress,
}: {
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  // The rain only "falls" while the seam is crossing the viewport.
  const opacity = useTransform(progress, [0, 0.4, 0.6, 1], [0, 0.85, 0.85, 0]);

  const columns = Array.from({ length: COLUMNS }, (_, i) => ({
    glyphs: Array.from({ length: ROWS }, (_, j) => {
      // Index-only hash → stable across server/client renders.
      const seed = (i * 13 + j * 7 + i * j * 3) % GLYPHS.length;
      return GLYPHS[seed];
    }).join(""),
    delay: (i % 7) * 0.12,
    duration: 1.6 + (i % 5) * 0.18,
  }));

  return (
    <motion.div className="phase-curtain__rain" style={{ opacity }}>
      {columns.map((col, i) => (
        <motion.span
          key={i}
          className="phase-curtain__rain-col"
          initial={{ y: "-110%" }}
          animate={{ y: "110%" }}
          transition={{
            duration: col.duration,
            delay: col.delay,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {col.glyphs}
        </motion.span>
      ))}
    </motion.div>
  );
}
