"use client";

import { useCallback, useSyncExternalStore } from "react";
import {
  getStoredConsent,
  initAnalytics,
  setStoredConsent,
  type CookieConsent,
} from "@/app/_lib/posthog";

function subscribe(callback: () => void) {
  window.addEventListener("cookie-consent-change", callback);
  return () => window.removeEventListener("cookie-consent-change", callback);
}

function getSnapshot(): CookieConsent | null {
  return getStoredConsent();
}

function getServerSnapshot(): CookieConsent | null {
  return null;
}

export function useCookieConsent() {
  const consent = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  const setConsent = useCallback((value: CookieConsent) => {
    setStoredConsent(value);
    if (value === "analytics") {
      initAnalytics();
    }
  }, []);

  return {
    consent,
    setConsent,
    analyticsAllowed: consent === "analytics",
  };
}
