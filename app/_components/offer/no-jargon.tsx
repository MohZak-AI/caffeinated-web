import { landingContent } from "@/app/_content/landing";
import { Tabs } from "@/app/_components/ui/tabs";
import { SectionReveal } from "@/app/_components/scroll/section-reveal";

export function NoJargon() {
  const { noJargon } = landingContent;

  return (
    <section
      id="no-jargon"
      data-testid="no-jargon-section"
      aria-labelledby="no-jargon-headline"
      className="relative w-full overflow-hidden px-4 py-20 text-cw-ink sm:px-6 sm:py-28 lg:px-8 lg:py-32 xl:px-12"
    >
      <div className="relative mx-auto max-w-7xl">
        <SectionReveal y={24}>
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-cw-orange">
            {noJargon.eyebrow}
          </p>
          <h2
            id="no-jargon-headline"
            className="mt-4 max-w-3xl text-[clamp(2rem,5vw,4rem)] font-semibold leading-[0.98] tracking-[-0.035em] text-balance break-words"
          >
            {noJargon.headline}
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-cw-ink/68">
            {noJargon.body}
          </p>

          <div className="mt-12">
            <Tabs
              items={noJargon.tabs}
              ariaLabel="No jargon service paths"
            />
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
