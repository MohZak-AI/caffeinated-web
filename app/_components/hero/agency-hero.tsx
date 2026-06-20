import { landingContent } from "@/app/_content/landing";
import { AnimatedAgencyIllustration } from "./animated-agency-illustration";
import { BookingDiscoveryDialog } from "./booking-discovery-dialog";
import { CodeTypingPanel } from "./code-typing-panel";
import { DataStreamLayer } from "./data-stream-layer";
import { ServiceCards } from "./service-card";

export function AgencyHero() {
  return (
    <section className="relative w-full overflow-hidden px-4 pb-16 pt-6 sm:px-6 lg:px-8 lg:pb-24 lg:pt-10 xl:px-12">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Text content */}
        <div className="flex flex-col gap-7 text-center lg:text-left">
          <span className="inline-flex items-center gap-2 self-center text-sm font-medium text-cw-ink/55 lg:self-start">
            <span className="size-1.5 rounded-full bg-cw-teal" aria-hidden="true" />
            Fast, flexible web studio
          </span>

          <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-cw-ink">
            {landingContent.hero.headline}
          </h1>

          <p className="mx-auto max-w-xl text-lg leading-relaxed text-cw-ink/65 lg:mx-0">
            {landingContent.hero.subheadline}
          </p>

          {/* Value-prop highlights */}
          <ul
            className="flex flex-wrap justify-center gap-2 lg:justify-start"
            data-testid="hero-highlights"
          >
            {landingContent.hero.highlights.map((highlight) => (
              <li
                key={highlight}
                className="inline-flex items-center gap-1.5 rounded-full border border-cw-ink/12 bg-white/60 px-3 py-1 text-xs font-medium text-cw-ink/80"
              >
                <span className="size-1.5 rounded-full bg-cw-teal" aria-hidden="true" />
                {highlight}
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <BookingDiscoveryDialog />
            <a
              href="#pricing"
              className="inline-flex h-12 items-center justify-center rounded-full border border-cw-ink/15 bg-white/60 px-6 text-[15px] font-medium text-cw-ink transition-colors duration-200 hover:bg-white"
            >
              {landingContent.hero.ctaSecondary}
            </a>
          </div>

          <ServiceCards />
        </div>

        {/* Illustration + code panels */}
        <div className="relative order-first lg:order-last">
          <div className="relative overflow-hidden rounded-3xl border border-cw-ink/10 bg-white p-4 shadow-[0_1px_2px_rgba(21,17,43,0.06),0_24px_48px_-24px_rgba(21,17,43,0.25)] sm:p-6">
            <DataStreamLayer />
            <div className="relative z-10">
              <AnimatedAgencyIllustration />
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <CodeTypingPanel
                title="React"
                language="react"
                code={landingContent.heroCodeSnippets.reactComponent}
                accent="#29a7ff"
                startDelay={150}
                data-testid="react-code-panel"
              />
              <CodeTypingPanel
                title="Node.js"
                language="node"
                code={landingContent.heroCodeSnippets.nodeServer}
                accent="#16d8c2"
                startDelay={350}
                data-testid="node-code-panel"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
