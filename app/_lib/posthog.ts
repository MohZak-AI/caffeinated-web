import posthog from "posthog-js";
import type { Properties } from "posthog-js";

const CONSENT_KEY = "cw_cookie_consent";

export type CookieConsent = "necessary" | "analytics";

export function getStoredConsent(): CookieConsent | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(CONSENT_KEY);
  if (raw === "analytics" || raw === "necessary") return raw;
  return null;
}

export function setStoredConsent(consent: CookieConsent) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(CONSENT_KEY, consent);
  window.dispatchEvent(
    new CustomEvent("cookie-consent-change", { detail: consent })
  );
}

export function analyticsAllowed(): boolean {
  return getStoredConsent() === "analytics";
}

let initialized = false;

export function initAnalytics() {
  if (initialized) return;
  if (!analyticsAllowed()) return;

  const token = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
  const host = process.env.NEXT_PUBLIC_POSTHOG_HOST;
  if (!token || !host) return;

  posthog.init(token, {
    api_host: host,
    ui_host: "https://us.posthog.com",
    defaults: "2026-01-30",
    capture_exceptions: true,
    debug: process.env.NODE_ENV === "development",
  });

  initialized = true;
}

export function capture(event: string, properties?: Properties) {
  if (!initialized) return;
  posthog.capture(event, properties);
}

export function resetAnalytics() {
  if (!initialized) return;
  posthog.reset();
  initialized = false;
}
