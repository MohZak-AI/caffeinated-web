import { landingContent } from "@/app/_content/landing";

export function PricingFaq() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="cw-espresso-surface relative w-full border-t border-[color-mix(in_srgb,var(--text-primary)_10%,transparent)] px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40 xl:px-12"
    >
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.76fr_1fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <span className="cw-pixel-steam" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <h2
            id="faq-heading"
            className="mt-8 text-[clamp(2.8rem,5.8vw,5.8rem)] font-semibold leading-[0.94] tracking-[-0.052em] text-[var(--text-primary)] text-balance"
          >
            {landingContent.faqSection.title}
          </h2>
        </div>

        <div className="border-t border-[color-mix(in_srgb,var(--text-primary)_15%,transparent)]">
          {landingContent.faqSection.items.map((item, index) => (
            <details
              key={item.question}
              open={index === 0}
              className="group border-b border-[color-mix(in_srgb,var(--text-primary)_15%,transparent)] py-7"
            >
              <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-6 text-xl font-semibold leading-snug tracking-[-0.02em] text-[var(--text-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus)] sm:text-2xl [&::-webkit-details-marker]:hidden">
                <span>{item.question}</span>
                <span
                  className="font-mono text-2xl font-normal text-[var(--accent)] transition-transform duration-200 group-open:rotate-45 motion-reduce:transform-none"
                  aria-hidden="true"
                >
                  +
                </span>
              </summary>
              <p className="max-w-2xl pb-2 pt-5 text-lg leading-[1.75] text-[var(--text-secondary)]">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
