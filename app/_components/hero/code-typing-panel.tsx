"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

interface CodeTypingPanelProps {
  title: string;
  language: "react" | "node";
  code: string;
  accent: string;
  startDelay?: number;
  "data-testid"?: string;
}

export function CodeTypingPanel({
  title,
  language,
  code,
  accent,
  startDelay = 0,
  "data-testid": testId,
}: CodeTypingPanelProps) {
  const reduceMotion = useReducedMotion();
  const [displayed, setDisplayed] = useState("");
  const [showCaret, setShowCaret] = useState(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;

    if (reduceMotion) {
      const reducedTimer = setTimeout(() => {
        setDisplayed(code);
        setShowCaret(false);
      }, 0);
      return () => clearTimeout(reducedTimer);
    }

    let index = 0;
    const caretTimer = setTimeout(() => {
      setDisplayed("");
      setShowCaret(true);
    }, 0);

    const typingTimer = setTimeout(() => {
      interval = setInterval(() => {
        index += 1;
        setDisplayed(code.slice(0, index));
        if (index >= code.length) {
          if (interval) clearInterval(interval);
          setShowCaret(false);
        }
      }, 10);
    }, startDelay);

    return () => {
      clearTimeout(caretTimer);
      clearTimeout(typingTimer);
      if (interval) clearInterval(interval);
    };
  }, [code, reduceMotion, startDelay]);

  return (
    <div
      data-testid={testId}
      data-language={language}
      className="rounded-2xl border-[3px] border-cw-line p-4 shadow-[4px_4px_0_#24194a]"
      style={{ backgroundColor: "#15112b" }}
    >
      <div className="mb-3 flex items-center justify-between">
        <span
          className="rounded-full px-3 py-1 font-display text-xs font-bold uppercase tracking-wider text-white"
          style={{ backgroundColor: accent }}
        >
          {title}
        </span>
        <div className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-cw-pink" />
          <span className="size-2.5 rounded-full bg-cw-sun" />
          <span className="size-2.5 rounded-full bg-cw-teal" />
        </div>
      </div>
      <pre className="relative overflow-hidden font-mono text-xs leading-relaxed text-cw-electric">
        {/* Reserves the panel's final height so it never grows while typing,
            which would otherwise push the hero headline down (layout shift). */}
        <code aria-hidden="true" className="invisible block">
          {code}
        </code>
        <code className="absolute inset-0 block" aria-live="polite">
          {displayed}
          {showCaret && (
            <span className="ml-0.5 inline-block w-2 animate-pulse bg-cw-electric">
              &nbsp;
            </span>
          )}
        </code>
      </pre>
    </div>
  );
}
