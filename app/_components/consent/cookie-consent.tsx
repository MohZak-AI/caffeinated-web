"use client";

import Link from "next/link";
import { useCookieConsent } from "./use-cookie-consent";

export function CookieConsent() {
  const { consent, setConsent } = useCookieConsent();

  if (consent !== null) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="fixed bottom-4 left-4 right-4 z-[100] mx-auto max-w-2xl border border-cw-ink/15 bg-base-100/95 p-4 text-base-content shadow-[10px_14px_38px_rgba(21,17,43,0.16)] backdrop-blur-md sm:bottom-6 sm:left-6 sm:right-6 sm:p-5"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm leading-relaxed">
          <p>
            We use strictly necessary cookies to keep the site working, and
            optional analytics cookies to understand how visitors use the site.
          </p>
          <p className="mt-1 text-xs text-base-content/65">
            Read more in our{" "}
            <Link
              href="/legal/cookies"
              className="link link-primary underline-offset-2"
            >
              Cookie Policy
            </Link>
            .
          </p>
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-2">
          <button
            type="button"
            className="btn btn-sm btn-ghost"
            onClick={() => setConsent("necessary")}
          >
            Necessary only
          </button>
          <button
            type="button"
            className="btn btn-sm btn-primary"
            onClick={() => setConsent("analytics")}
          >
            Accept analytics
          </button>
        </div>
      </div>
    </div>
  );
}
