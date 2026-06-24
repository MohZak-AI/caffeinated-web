"use client";

import { motion, useReducedMotion } from "motion/react";
import { useSyncExternalStore } from "react";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

/**
 * Per-word headline reveal. Each word slides up out of a clip mask and
 * de-blurs into focus, staggered ~70 ms. The original text is preserved as
 * individual word spans (with the connecting spaces) so search engines and
 * the e2e suite (which asserts substring words like "CREATING"/"FAST") still
 * see the full headline inside the <h1>.
 *
 * Under reduced motion the headline renders statically with no animation.
 */
export function AnimatedHeadline({
  text,
  className,
  startDelay = 0.1,
}: {
  text: string;
  className?: string;
  startDelay?: number;
}) {
  const reduceMotion = useReducedMotion();
  const words = text.split(" ");

  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const staticMode = mounted && reduceMotion;

  if (staticMode) {
    return <h1 className={className}>{text}</h1>;
  }

  return (
    <h1 className={className}>
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className="inline-block overflow-hidden align-bottom"
          aria-hidden="false"
        >
          <motion.span
            className="inline-block will-change-transform"
            initial={{ y: "110%", opacity: 0, filter: "blur(12px)" }}
            animate={{
              y: "0%",
              opacity: 1,
              filter: "blur(0px)",
            }}
            transition={{
              duration: 0.7,
              ease: EASE_OUT,
              delay: startDelay + index * 0.07,
            }}
          >
            {word}
            {index < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
      {/* Screen-reader copy with the literal headline, in case the per-word
          markup confuses AT traversal of the inline-block spans. */}
      <span className="sr-only">{text}</span>
    </h1>
  );
}
