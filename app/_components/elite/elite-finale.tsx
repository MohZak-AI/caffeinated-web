import { landingContent } from "@/app/_content/landing";
import { BookingDiscoveryDialog } from "../hero/booking-discovery-dialog";
import { SectionReveal } from "../scroll/section-reveal";

export function EliteFinale() {
  const { elite, pricing } = landingContent;

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
              className="max-w-4xl text-[clamp(3rem,8vw,7.5rem)] font-semibold leading-[0.88] tracking-[-0.06em] text-balance"
            >
              {elite.closingHeadline}
            </h2>
            <div className="cw-liquid--dark rounded-2xl border border-white/15 p-6">
              <p className="text-lg leading-relaxed text-cw-cream/70">
                {elite.closingBody}
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <BookingDiscoveryDialog variant="elite" label={pricing.ctaLabel} />
                <a
                  href={`mailto:${landingContent.booking.fallbackEmail}?subject=Project%20inquiry`}
                  className="inline-flex h-11 items-center justify-center rounded-xl border border-white/20 cw-liquid--dark px-5 font-mono text-sm font-medium text-cw-cream transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110"
                >
                  Email the studio
                </a>
              </div>
            </div>
          </div>
        </SectionReveal>

        <dl className="mt-12 grid border-y border-white/12 lg:grid-cols-3">
          {elite.ribbon.map((item) => (
            <div
              key={item.label}
              className="border-b border-white/12 py-6 lg:border-b-0 lg:border-r lg:px-6 lg:first:pl-0 lg:last:border-r-0"
            >
              <dt className="font-mono text-xs uppercase tracking-[0.16em] text-cw-cream/42">
                {item.label}
              </dt>
              <dd className="mt-2 text-2xl font-semibold text-cw-orange">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
