"use client";

import { createContext, useContext } from "react";

export type ScrollPhase = "playful" | "tech" | "elite";

const ScrollPhaseContext = createContext<ScrollPhase>("playful");

/**
 * Returns the active scroll phase, updated only at phase boundaries by the
 * orchestrator (not per scroll frame). Use for content that should react to
 * which section the user is in — never for per-pixel styling, which belongs
 * on Motion values.
 */
export function useScrollPhase(): ScrollPhase {
  return useContext(ScrollPhaseContext);
}

export const ScrollPhaseProvider = ScrollPhaseContext.Provider;
