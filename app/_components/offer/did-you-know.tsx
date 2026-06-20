import { landingContent } from "@/app/_content/landing";
import { BookingDiscoveryDialog } from "../hero/booking-discovery-dialog";
import { SectionReveal, Stagger, StaggerItem } from "../scroll/section-reveal";

/**
 * Phase 2 — the "Did you know?" reality check + the $99 offer, on the charcoal
 * scroll state. Editorial, card-free layout: divided stat rows, a numbered
 * value-prop row, and an open price block separated by hairline rules.
 */
export function DidYouKnow() {
  const { didYouKnow, valueProps, pricing } = landingContent;
  // Highlight only the phrase "every single day" — pixely, rainbow, moving.
  const phrase = "every single day";
  const [headBefore, headAfter] = didYouKnow.headline.split(phrase);

  return (
    <section
      id="pricing"
      className="relative w-full px-4 py-24 sm:px-6 lg:px-8 lg:py-32 xl:px-12"
    >
      <div className="cw-tech-blobs" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl">
        {/* Did you know? — left-aligned editorial intro */}
        <SectionReveal className="max-w-3xl">
          <p className="font-mono text-xs font-bold uppercase tracking-eyebrow text-cw-electric">
            {didYouKnow.eyebrow}
          </p>
          <h2 className="mt-4 font-display text-4xl font-bold leading-tight text-white sm:text-5xl">
            {headBefore}
            <span className="cw-rainbow-text cw-wiggle font-pixel text-[0.7em]">
              {phrase}
            </span>
            {headAfter}
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-cw-tech-text/70">
            {didYouKnow.body}
          </p>
        </SectionReveal>

        {/* Facts — divided editorial rows (no cards) */}
        <Stagger className="mt-14 border-t border-white/10" amount={0.1}>
          {didYouKnow.facts.map((fact) => (
            <StaggerItem key={fact.text} className="border-b border-white/10">
              <div className="grid grid-cols-1 gap-1 py-7 sm:grid-cols-[11rem_1fr] sm:items-baseline sm:gap-10">
                <span className="font-display text-4xl font-bold tracking-tight text-cw-electric sm:text-5xl">
                  {fact.stat}
                </span>
                <p className="max-w-2xl text-base leading-relaxed text-cw-tech-text/75 sm:text-lg">
                  {fact.text}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        {/* Value props — numbered editorial columns (no cards) */}
        <Stagger className="mt-16 grid gap-10 sm:grid-cols-3" amount={0.15}>
          {valueProps.map((prop, index) => (
            <StaggerItem key={prop.title}>
              <p className="font-mono text-sm font-bold text-cw-electric">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-3 font-display text-xl font-semibold text-white">
                {prop.title}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-cw-tech-text/70">
                {prop.text}
              </p>
            </StaggerItem>
          ))}
        </Stagger>

        {/* $99 offer — open price block, hairline rule (no card) */}
        <SectionReveal>
          <div
            data-testid="pricing-card"
            className="mt-16 grid gap-10 border-t border-white/10 pt-12 lg:grid-cols-2 lg:items-center"
          >
            <div>
              <p className="font-mono text-xs font-bold uppercase tracking-eyebrow text-cw-electric">
                {pricing.eyebrow}
              </p>
              <h3 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
                {pricing.headline}
              </h3>
              <p className="mt-4 max-w-md text-[15px] leading-relaxed text-cw-tech-text/70">
                {pricing.body}
              </p>

              <span className="mt-8 block font-display text-[5.5rem] font-bold leading-[0.85] text-white sm:text-[7rem]">
                {pricing.price}
              </span>
              <p className="mt-3 text-xs font-medium uppercase tracking-[0.12em] text-cw-tech-text/55">
                {pricing.priceNote}
              </p>

              <div className="mt-8">
                <BookingDiscoveryDialog
                  variant="pricing"
                  label={pricing.ctaLabel}
                />
              </div>
            </div>

            <ul className="flex flex-col gap-4 lg:border-l lg:border-white/10 lg:pl-12">
              {pricing.includes.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-base text-cw-tech-text/85"
                >
                  <span className="mt-0.5 text-cw-electric" aria-hidden="true">
                    <svg
                      viewBox="0 0 24 24"
                      className="size-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
