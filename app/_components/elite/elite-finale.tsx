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
      <p className="text-lg leading-relaxed text-cw-cream/70">
        {elite.closingBody}
      </p>
      <div className="card-actions mt-7 flex-col gap-3 sm:flex-row">
        <div className="[&>button]:btn [&>button]:btn-primary [&>button]:h-11 [&>button]:rounded-full [&>button]:border-0">
          <BookingDiscoveryDialog variant="elite" label={pricing.ctaLabel} />
        </div>
        <a
          href={`mailto:${landingContent.booking.fallbackEmail}?subject=Project%20inquiry`}
          className="btn btn-outline h-11 rounded-full border-white/25 font-mono text-sm font-medium text-cw-cream hover:border-cw-cream hover:bg-cw-cream hover:text-cw-ink"
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
      className="relative w-full overflow-hidden bg-cw-ink px-4 py-24 text-cw-cream sm:px-6 lg:px-8 lg:py-32 xl:px-12"
    >
      <div className="pointer-events-none absolute inset-0 opacity-20" aria-hidden="true">
        <div className="absolute -left-24 top-10 size-72 rounded-full border-[34px] border-cw-orange" />
        <div className="absolute -right-20 bottom-10 size-96 rounded-full border-[38px] border-cw-teal" />
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
                className="card cw-liquid--dark border border-white/15 bg-neutral/70 text-neutral-content shadow-2xl"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
              >
                {ctaCardBody}
              </motion.div>
            ) : (
              <div className="card cw-liquid--dark border border-white/15 bg-neutral/70 text-neutral-content shadow-2xl">
                {ctaCardBody}
              </div>
            )}
          </div>
        </SectionReveal>

        <Stagger
          as="dl"
          className="stats stats-vertical mt-12 w-full overflow-hidden border border-white/12 bg-neutral/85 text-neutral-content shadow-2xl lg:stats-horizontal"
        >
          {elite.ribbon.map((item) => (
            <StaggerItem
              as="div"
              key={item.label}
              className="stat border-b border-white/12 lg:border-b-0 lg:border-r lg:last:border-r-0"
            >
              <dt className="stat-title">
                <span className="badge badge-outline border-cw-cream/25 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-cw-cream/55">
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
