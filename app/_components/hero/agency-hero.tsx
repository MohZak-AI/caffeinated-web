import Image from "next/image";
import { landingContent } from "@/app/_content/landing";
import { BookingDiscoveryDialog } from "./booking-discovery-dialog";

export function AgencyHero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="cw-espresso-primary cw-hero relative isolate flex min-h-[calc(100dvh-5rem)] w-full items-center overflow-hidden px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28 xl:px-12"
    >
      <div className="cw-espresso-grid" aria-hidden="true" />
      <div className="relative z-10 mx-auto w-full max-w-[86rem]">
        <p className="cw-conversation-badge">{landingContent.hero.badge}</p>

        <h1
          id="hero-heading"
          className="mt-7 max-w-[86rem] text-[clamp(2.65rem,5.2vw,5.8rem)] font-semibold leading-[0.94] tracking-[-0.052em] text-[var(--text-primary)] text-balance"
        >
          {landingContent.hero.headline}
        </h1>

        <div className="mt-12 grid items-end gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(23rem,0.58fr)] lg:gap-20">
          <div className="max-w-3xl">
            <p className="text-lg leading-[1.72] text-[var(--text-secondary)] sm:text-xl">
              {landingContent.hero.subheadline}
            </p>
            <div className="mt-8">
              <BookingDiscoveryDialog
                label={landingContent.hero.ctaPrimary}
              />
            </div>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-[color-mix(in_srgb,var(--text-secondary)_78%,transparent)]">
              {landingContent.hero.microcopy}
            </p>
          </div>

          <figure className="cw-hero-art relative mx-auto w-full max-w-xl">
            <div className="relative border border-[color-mix(in_srgb,var(--text-primary)_14%,transparent)] bg-[var(--bg-surface)] p-3 sm:p-5">
              <Image
                src="/caffinated-web.gif"
                alt="Pixel coffee cup flying a Caffienated Web flag"
                width={640}
                height={360}
                priority
                unoptimized
                sizes="(max-width: 1023px) min(100vw - 2rem, 36rem), 36vw"
                className="h-auto w-full object-contain [image-rendering:pixelated]"
              />
            </div>
          </figure>
        </div>
      </div>
    </section>
  );
}
