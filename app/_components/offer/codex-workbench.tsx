import { landingContent } from "@/app/_content/landing";
import { BookingDiscoveryDialog } from "../hero/booking-discovery-dialog";

export function CodexWorkbench() {
  return (
    <div className="relative mx-auto flex max-w-3xl flex-col gap-10 lg:gap-12">
      <PricingCard />
    </div>
  );
}

function PricingCard() {
  const { pricing } = landingContent;

  return (
    <section
      data-testid="pricing-card"
      className="card relative overflow-hidden bg-neutral text-neutral-content shadow-2xl"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cw-orange via-cw-sun to-cw-teal"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-28 size-72 bg-cw-orange/15 blur-3xl"
      />

      <div className="card-body relative p-6 sm:p-8">
        <div className="badge badge-primary font-mono text-xs font-semibold uppercase tracking-[0.18em]">
          {pricing.eyebrow}
        </div>
        <h3 className="card-title mt-1 max-w-2xl text-[clamp(1.75rem,4.2vw,3rem)] font-semibold leading-[0.98] tracking-[-0.035em] text-balance">
          {pricing.headline}
        </h3>
        <p className="max-w-2xl text-sm leading-relaxed text-neutral-content/75 sm:text-base">
          {pricing.body}
        </p>

        <div className="divider my-2 before:bg-neutral-content/15 after:bg-neutral-content/15" />

        <div className="stats stats-vertical bg-neutral text-neutral-content shadow-none lg:stats-horizontal">
          <div className="stat px-0 py-0 lg:pr-8">
            <div className="stat-title font-mono text-[11px] uppercase tracking-[0.16em] text-neutral-content/55">
              One time setup
            </div>
            <div className="stat-value mt-2 font-mono text-5xl text-cw-orange sm:text-6xl">
              {pricing.price}
            </div>
            <div className="stat-desc mt-1 text-xs uppercase tracking-[0.14em] text-neutral-content/45">
              {pricing.priceNote}
            </div>
            <ul className="mt-5 grid gap-3">
              {pricing.includes.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-neutral-content/85">
                  <span className="badge badge-accent mt-0.5 size-4 shrink-0 p-0 text-[10px] leading-none" aria-hidden="true">
                    <svg viewBox="0 0 24 24" className="size-3" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="stat border-t border-neutral-content/15 px-0 pb-0 pt-8 lg:border-l lg:border-t-0 lg:py-0 lg:pl-8">
            <div className="stat-title font-mono text-[11px] uppercase tracking-[0.16em] text-neutral-content/55">
              Monthly care
            </div>
            <div className="stat-value mt-2 font-mono text-4xl text-accent sm:text-5xl">
              {pricing.monthly.price}
            </div>
            <div className="stat-desc mt-1 text-xs uppercase tracking-[0.14em] text-neutral-content/45">
              {pricing.monthly.note}
            </div>
            <ul className="mt-5 grid gap-3">
              {pricing.monthly.includes.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-neutral-content/85">
                  <span className="badge badge-primary mt-0.5 size-4 shrink-0 p-0 text-[10px] leading-none" aria-hidden="true">
                    <svg viewBox="0 0 24 24" className="size-3" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="divider my-1 before:bg-neutral-content/15 after:bg-neutral-content/15" />

        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
          <span className="badge badge-outline border-neutral-content/25 font-mono text-[11px] uppercase tracking-[0.14em] text-neutral-content/60">
            Free call · no obligation
          </span>
          <div className="[&_[data-testid=booking-trigger]]:btn [&_[data-testid=booking-trigger]]:btn-accent [&_[data-testid=booking-trigger]]:btn-outline [&_[data-testid=booking-trigger]]:min-h-12 [&_[data-testid=booking-trigger]]:px-8 hover:[&_[data-testid=booking-trigger]]:btn-primary">
            <BookingDiscoveryDialog variant="pricing" label={pricing.ctaLabel} />
          </div>
        </div>
      </div>
    </section>
  );
}
