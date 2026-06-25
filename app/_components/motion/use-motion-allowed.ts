"use client";

import { useReducedMotion } from "motion/react";
import { useSyncExternalStore } from "react";

export function useMotionAllowed(): boolean {
  const reducedMotion = useReducedMotion();
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  return mounted && !reducedMotion;
}
