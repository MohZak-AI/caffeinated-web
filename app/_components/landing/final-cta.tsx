"use client";

import { landingContent } from "@/app/_content/landing";
import { BookingDiscoveryDialog } from "../hero/booking-discovery-dialog";

export function FinalCta() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="cw-espresso-primary cw-final-cta relative isolate w-full overflow-hidden px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-44 xl:px-12"
    >
      <div className="cw-espresso-grid cw-espresso-grid--cta" aria-hidden="true" />
      <div className="relative z-10 mx-auto max-w-7xl">
        <h2
          id="contact-heading"
          className="max-w-6xl text-[clamp(3.25rem,8vw,7.4rem)] font-semibold leading-[0.9] tracking-[-0.06em] text-[var(--text-primary)] text-balance"
        >
          {landingContent.finalCta.headline}
        </h2>

        <div className="mt-12 grid gap-10 border-t border-[color-mix(in_srgb,var(--text-primary)_15%,transparent)] pt-9 lg:grid-cols-[1fr_auto] lg:items-end">
          <p className="max-w-3xl text-lg leading-[1.72] text-[var(--text-secondary)] sm:text-xl">
            {landingContent.finalCta.body}
          </p>
          <div className="flex flex-col items-start gap-5 lg:items-stretch">
            <BookingDiscoveryDialog
              variant="elite"
              label={landingContent.finalCta.button}
            />
            <a
              href={`mailto:${landingContent.finalCta.email}?subject=Website%20project`}
              className="text-sm leading-relaxed text-[var(--text-secondary)] underline decoration-[color-mix(in_srgb,var(--accent)_55%,transparent)] underline-offset-4 hover:text-[var(--text-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus)]"
            >
              {landingContent.finalCta.emailLabel}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
