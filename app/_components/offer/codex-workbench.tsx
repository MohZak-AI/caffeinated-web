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
          <h2 className="mt-4 text-[clamp(2rem,6vw,5rem)] font-semibold leading-[0.92] tracking-[-0.055em] text-cw-ink text-balance break-words">
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
    <div className="mt-10 grid gap-4 lg:grid-cols-3">
      {landingContent.valueProps.map((item) => (
        <article
          key={item.title}
          className="card border border-base-content/10 bg-base-100 text-base-content shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
        >
          <div className="card-body gap-3 p-6">
            <div className="badge badge-primary font-mono text-[10px] font-semibold uppercase tracking-[0.16em]">
              Process
            </div>
            <h3 className="card-title text-xl font-semibold tracking-[-0.02em]">
              {item.title}
            </h3>
            <p className="text-sm leading-relaxed text-base-content/65">
              {item.text}
            </p>
          </div>
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
      className="card relative mt-10 overflow-hidden bg-neutral text-neutral-content shadow-2xl"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cw-orange via-cw-sun to-cw-teal"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-28 size-72 rounded-full bg-cw-orange/15 blur-3xl"
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
            <div className="stat-value mt-2 font-mono text-5xl cw-gradient-text sm:text-6xl">
              {pricing.price}
            </div>
            <div className="stat-desc mt-1 text-xs uppercase tracking-[0.14em] text-neutral-content/45">
              {pricing.priceNote}
            </div>
            <ul className="mt-5 grid gap-3">
              {pricing.includes.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-neutral-content/85">
                  <span className="badge badge-accent mt-0.5 size-4 shrink-0 rounded-full p-0 text-[10px] leading-none" aria-hidden="true">
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
                  <span className="badge badge-primary mt-0.5 size-4 shrink-0 rounded-full p-0 text-[10px] leading-none" aria-hidden="true">
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
          <div className="[&_[data-testid=booking-trigger]]:btn [&_[data-testid=booking-trigger]]:btn-accent [&_[data-testid=booking-trigger]]:btn-outline [&_[data-testid=booking-trigger]]:min-h-12 [&_[data-testid=booking-trigger]]:rounded-full [&_[data-testid=booking-trigger]]:px-8 hover:[&_[data-testid=booking-trigger]]:btn-primary">
            <BookingDiscoveryDialog variant="pricing" label={pricing.ctaLabel} />
          </div>
        </div>
      </div>
    </section>
  );
}
