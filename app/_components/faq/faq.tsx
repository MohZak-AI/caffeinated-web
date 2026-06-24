import { landingContent } from "@/app/_content/landing";
import { SectionReveal } from "../scroll/section-reveal";

export function Faq() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-headline"
      className="relative w-full overflow-hidden px-4 py-20 text-cw-ink sm:px-6 sm:py-28 lg:px-8 lg:py-32 xl:px-12"
    >
      <div className="relative mx-auto max-w-3xl">
        <SectionReveal y={24}>
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-cw-orange">
            Before you ask
          </p>
          <h2
            id="faq-headline"
            className="mt-4 text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-[0.95] tracking-[-0.04em] text-balance"
          >
            Straight answers, no jargon.
          </h2>
        </SectionReveal>

        <SectionReveal y={20} delay={0.05}>
          <div className="mt-10 border-t border-cw-ink/12">
            {landingContent.faq.map((item) => (
              <details key={item.q} className="cw-faq group border-b border-cw-ink/12">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-lg font-semibold tracking-[-0.01em] text-cw-ink sm:text-xl">
                  {item.q}
                  <span className="cw-faq-icon grid size-8 shrink-0 place-items-center rounded-full border border-cw-ink/15 text-cw-ink/70 transition-transform duration-200 group-open:rotate-45" aria-hidden="true">
                    <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </summary>
                <p className="max-w-2xl pb-6 pr-12 text-base leading-relaxed text-cw-ink/68">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </SectionReveal>

        <SectionReveal y={16} delay={0.1}>
          <p className="mt-10 text-center text-sm text-cw-ink/60">
            Still wondering something?{" "}
            <a href="#contact" className="font-semibold text-cw-orange underline-offset-4 hover:underline">
              Ask us on a free call
            </a>
          </p>
        </SectionReveal>
      </div>
    </section>
  );
}
