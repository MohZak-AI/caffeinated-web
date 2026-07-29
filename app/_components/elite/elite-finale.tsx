"use client";

import { motion } from "motion/react";
import { capture } from "@/app/_lib/posthog";
import { landingContent } from "@/app/_content/landing";
import { BookingDiscoveryDialog } from "../hero/booking-discovery-dialog";
import { SectionReveal, Stagger, StaggerItem } from "../scroll/section-reveal";
import { useMotionAllowed } from "../motion/use-motion-allowed";

export function EliteFinale() {
  const { elite, pricing } = landingContent;
  const motionAllowed = useMotionAllowed();

  const ctaCardBody = (
    <div className="card-body gap-0 p-6">
      <p className="text-lg leading-relaxed text-cw-ink/70">
        {elite.closingBody}
      </p>
      <div className="card-actions mt-7 flex-col gap-3 sm:flex-row">
        <div className="[&>button]:btn [&>button]:btn-primary [&>button]:h-11 [&>button]:border-0">
          <BookingDiscoveryDialog variant="elite" label={pricing.ctaLabel} />
        </div>
        <a
          href={`mailto:${landingContent.booking.fallbackEmail}?subject=Project%20inquiry`}
          className="btn btn-outline h-11 border-cw-ink/25 font-mono text-sm font-medium text-cw-ink hover:border-cw-ink hover:bg-cw-ink hover:text-cw-cream"
          onClick={() => capture("email_contact_clicked", { source: "finale_section", email: landingContent.booking.fallbackEmail })}
        >
          Email the studio
        </a>
      </div>
    </div>
  );

  return (
    <section
      id="contact"
      aria-labelledby="elite-headline"
      className="relative w-full overflow-hidden bg-cw-cream px-4 py-24 text-cw-ink sm:px-6 lg:px-8 lg:py-32 xl:px-12"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-35 saturate-125"
          style={{ backgroundImage: "url('/caffinated-web.gif')" }}
        />
        <div className="absolute inset-0 bg-cw-cream/72 backdrop-blur-[1px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_32%,rgba(255,248,231,0.88),transparent_38%),linear-gradient(90deg,rgba(255,248,231,0.92),rgba(255,248,231,0.62)_48%,rgba(255,248,231,0.78))]" />
        <div className="absolute inset-x-0 top-0 h-[30rem] bg-[linear-gradient(to_bottom,var(--cw-cream)_0%,rgba(255,248,231,0.98)_58%,rgba(255,248,231,0)_100%)]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <SectionReveal y={24}>
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-cw-orange">
            Start the build
          </p>
          <div className="mt-5 grid gap-8 lg:grid-cols-[1fr_0.72fr] lg:items-end">
            <h2
              id="elite-headline"
              className="max-w-4xl text-[clamp(2.25rem,8vw,6rem)] font-semibold leading-[0.92] tracking-[-0.055em] text-balance break-words"
            >
              {elite.closingHeadline}
            </h2>
            {motionAllowed ? (
              <motion.div
                className="card cw-liquid border border-cw-ink/15 bg-cw-cream/70 text-cw-ink shadow-2xl"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
              >
                {ctaCardBody}
              </motion.div>
            ) : (
              <div className="card cw-liquid border border-cw-ink/15 bg-cw-cream/70 text-cw-ink shadow-2xl">
                {ctaCardBody}
              </div>
            )}
          </div>
        </SectionReveal>

        <Stagger
          as="dl"
          className="stats stats-vertical mt-12 w-full overflow-hidden border border-cw-ink/12 bg-cw-cream/85 text-cw-ink shadow-2xl lg:stats-horizontal"
        >
          {elite.ribbon.map((item) => (
            <StaggerItem
              as="div"
              key={item.label}
              className="stat border-b border-cw-ink/12 lg:border-b-0 lg:border-r lg:last:border-r-0"
            >
              <dt className="stat-title">
                <span className="badge badge-outline border-cw-ink/25 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-cw-ink/55">
                  {item.label}
                </span>
              </dt>
              <dd className="stat-value mt-2 text-2xl font-semibold text-cw-orange">
                {item.value}
              </dd>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
