"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { landingContent } from "@/app/_content/landing";
import { BookingDiscoveryDialog } from "./booking-discovery-dialog";
import { AnimatedHeadline } from "./animated-headline";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const TIMING = {
  eyebrow: 0.05,
  headline: 0.15,
  body: 0.45,
  actions: 0.62,
  panel: 0.24,
} as const;

export function AgencyHero() {
  const reduceMotion = useReducedMotion();
  const rise = (delay: number) =>
    reduceMotion
      ? undefined
      : {
          initial: { opacity: 0, y: 18 } as const,
          animate: { opacity: 1, y: 0 } as const,
          transition: { duration: 0.6, ease: EASE_OUT, delay },
        };

  return (
    <section className="relative w-full overflow-hidden px-4 pb-10 pt-8 sm:px-6 lg:px-8 lg:pb-16 lg:pt-14 xl:px-12">
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        <div className="absolute left-1/2 top-8 h-[46rem] w-[46rem] -translate-x-1/2 rounded-full bg-white/45 blur-3xl" />
        <Image
          src="/caffeinated-web-logo.webp"
          alt=""
          width={506}
          height={638}
          unoptimized
          priority
          className="absolute right-[-6rem] top-6 w-[26rem] rotate-6 opacity-[0.07] sm:w-[34rem] lg:right-6 lg:w-[42rem]"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1.12fr_0.88fr] lg:items-end">
          <div>
            <motion.p
              className="inline-flex items-center gap-2 rounded-full border border-white/40 cw-liquid px-3 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-cw-ink/65"
              {...rise(TIMING.eyebrow)}
            >
              <span className="size-2 rounded-full bg-cw-orange" aria-hidden="true" />
              {landingContent.brand.tagline}
            </motion.p>

            <AnimatedHeadline
              text={landingContent.hero.headline}
              startDelay={TIMING.headline}
              className="mt-7 max-w-5xl text-[clamp(3.2rem,9.5vw,8.8rem)] font-semibold leading-[0.88] tracking-[-0.065em] text-cw-ink text-balance"
            />

            <motion.p
              className="mt-7 max-w-2xl text-lg leading-relaxed text-cw-ink/68 sm:text-xl"
              {...rise(TIMING.body)}
            >
              {landingContent.hero.subheadline}
            </motion.p>

            <motion.div
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
              {...rise(TIMING.actions)}
            >
              <BookingDiscoveryDialog />
              <a
                href="#pricing"
                className="inline-flex h-12 items-center justify-center rounded-full border border-white/40 cw-liquid px-6 text-[15px] font-semibold text-cw-ink transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110"
              >
                {landingContent.hero.ctaSecondary}
              </a>
            </motion.div>
            <motion.p
              className="mt-4 font-mono text-xs font-medium uppercase tracking-[0.14em] text-cw-ink/45"
              {...rise(TIMING.actions)}
            >
              {landingContent.hero.assurance}
            </motion.p>
          </div>

          <motion.div
            className="rounded-[34px] border border-white/40 cw-liquid p-5 shadow-[0_28px_80px_rgba(21,17,43,0.12)] sm:p-6"
            {...rise(TIMING.panel)}
          >
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-cw-orange">
                  How we work
                </p>
                <h2 className="mt-2 text-2xl font-semibold leading-tight tracking-[-0.03em] text-cw-ink">
                  Premium agency process. Small business speed.
                </h2>
              </div>
              <CoffeeSeal />
            </div>

            <dl className="mt-7 grid grid-cols-3 overflow-hidden rounded-2xl border border-cw-ink/10 bg-cw-cream/70">
              {[
                { value: "$199", label: "One time" },
                { value: "Low fee", label: "Monthly" },
                { value: "6 months", label: "Free edit" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="border-r border-cw-ink/10 px-3 py-4 last:border-r-0"
                >
                  <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-cw-ink/45">
                    {item.label}
                  </dt>
                  <dd className="mt-1 text-2xl font-semibold text-cw-ink">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>

            <ul
              data-testid="hero-highlights"
              className="mt-5 flex flex-wrap gap-2"
            >
              {landingContent.hero.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="rounded-full border border-white/40 cw-liquid px-3 py-1.5 text-xs font-semibold text-cw-ink/70"
                >
                  {highlight}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <AgencyServiceIndex />
      </div>
    </section>
  );
}

function AgencyServiceIndex() {
  return (
    <div className="mt-12 grid border-y border-cw-ink/12 lg:grid-cols-3">
      {landingContent.services.map((service, index) => (
        <article
          key={service.id}
          className="border-b border-cw-ink/12 py-6 transition-colors duration-200 hover:bg-cw-ink/[0.03] lg:border-b-0 lg:border-r lg:px-6 lg:first:pl-0 lg:last:border-r-0"
        >
          <p className="font-mono text-xs font-semibold text-cw-orange">
            {String(index + 1).padStart(2, "0")}
          </p>
          <h3 className="mt-3 text-xl font-semibold tracking-[-0.02em] text-cw-ink">
            {service.label}
          </h3>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-cw-ink/62">
            {service.description}
          </p>
        </article>
      ))}
    </div>
  );
}

function CoffeeSeal() {
  return (
    <svg
      viewBox="0 0 78 78"
      className="size-16 shrink-0 text-cw-orange"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="39" cy="39" r="36" fill="currentColor" opacity="0.12" />
      <circle cx="39" cy="39" r="27" stroke="currentColor" strokeWidth="2" />
      <path
        d="M50.7 24.8c6.3 6.4 4.7 18.2-2.4 25.3S29.4 58.8 23 52.4s-4.8-18.2 2.3-25.3 19-8.7 25.4-2.3Z"
        fill="currentColor"
      />
      <path
        d="M46.3 27.2c-4.1 5-6.2 9.5-6.2 14.1s-2.1 9-6.3 14"
        stroke="var(--cw-cream)"
        strokeLinecap="round"
        strokeWidth="3"
      />
    </svg>
  );
}
