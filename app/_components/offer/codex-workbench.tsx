import { landingContent } from "@/app/_content/landing";
import { BookingDiscoveryDialog } from "../hero/booking-discovery-dialog";
import { WorkPreview } from "./work-preview";

export function CodexWorkbench() {
  const { examples } = landingContent;

  return (
    <div className="relative mx-auto max-w-7xl">
      <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
        <div>
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-cw-orange">
            {examples.eyebrow}
          </p>
          <h2 className="mt-4 text-[clamp(2.75rem,7vw,6.5rem)] font-semibold leading-[0.9] tracking-[-0.06em] text-cw-ink text-balance">
            {examples.headline}
          </h2>
        </div>
        <p className="max-w-xl text-lg leading-relaxed text-cw-ink/66 lg:ml-auto">
          {examples.body}
        </p>
      </div>

      <CapabilityIndex />

      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        {examples.windows.map((windowContent) => (
          <WorkPreview key={windowContent.id} window={windowContent} />
        ))}
      </div>

      <PricingCard />
    </div>
  );
}

function CapabilityIndex() {
  return (
    <div className="mt-10 grid border-y border-cw-ink/12 lg:grid-cols-3">
      {landingContent.valueProps.map((item) => (
        <article
          key={item.title}
          className="border-b border-cw-ink/12 py-6 transition-colors duration-200 hover:bg-cw-ink/[0.03] lg:border-b-0 lg:border-r lg:px-6 lg:first:pl-0 lg:last:border-r-0"
        >
          <h3 className="text-xl font-semibold tracking-[-0.02em] text-cw-ink">
            {item.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-cw-ink/62">
            {item.text}
          </p>
        </article>
      ))}
    </div>
  );
}

function PricingCard() {
  const { pricing } = landingContent;

  return (
    <section
      data-testid="pricing-card"
      className="mt-10 overflow-hidden rounded-[34px] border border-white/15 cw-liquid--dark p-6 text-cw-cream shadow-[0_28px_80px_rgba(21,17,43,0.28)] sm:p-8"
    >
      <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-cw-orange">
        {pricing.eyebrow}
      </p>
      <h3 className="mt-3 max-w-2xl text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
        {pricing.headline}
      </h3>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-cw-cream/70">
        {pricing.body}
      </p>

      <div className="mt-7 grid gap-4 lg:grid-cols-2">
        {/* One time setup */}
        <div className="rounded-2xl border border-white/12 bg-white/[0.04] p-5">
          <div className="flex items-end justify-between gap-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-cw-cream/55">
              One time setup
            </p>
            <p className="font-mono text-4xl font-semibold cw-gradient-text sm:text-5xl">
              {pricing.price}
            </p>
          </div>
          <p className="mt-1 text-xs uppercase tracking-[0.14em] text-cw-cream/45">
            {pricing.priceNote}
          </p>
          <ul className="mt-5 grid gap-3">
            {pricing.includes.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-cw-cream/82">
                <svg viewBox="0 0 24 24" className="mt-0.5 size-4 shrink-0 text-cw-teal" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Monthly care */}
        <div className="rounded-2xl border border-white/12 bg-white/[0.04] p-5">
          <div className="flex items-end justify-between gap-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-cw-cream/55">
              Monthly care
            </p>
            <p className="font-mono text-4xl font-semibold text-cw-teal sm:text-5xl">
              {pricing.monthly.price}
            </p>
          </div>
          <p className="mt-1 text-xs uppercase tracking-[0.14em] text-cw-cream/45">
            {pricing.monthly.note}
          </p>
          <ul className="mt-5 grid gap-3">
            {pricing.monthly.includes.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-cw-cream/82">
                <svg viewBox="0 0 24 24" className="mt-0.5 size-4 shrink-0 text-cw-orange" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 flex flex-col items-center gap-2 border-t border-white/10 pt-6 sm:flex-row sm:justify-between">
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-cw-cream/45">
          Free call · no obligation
        </span>
        <BookingDiscoveryDialog variant="pricing" label={pricing.ctaLabel} />
      </div>
    </section>
  );
}
