import { SiteHeader } from "./_components/nav/site-header";
import { AgencyHero } from "./_components/hero/agency-hero";
import { LiveWork } from "./_components/offer/live-work";
import { AgencyFooter } from "./_components/elite/agency-footer";
import { StructuredData } from "./_components/seo/structured-data";
import { FinalCta } from "./_components/landing/final-cta";
import { PinnedScrollReveal } from "./_components/landing/pinned-scroll-reveal";
import { PricingFaq } from "./_components/landing/pricing-faq";

export default function Home() {
  return (
    <>
      <StructuredData />
      <SiteHeader />
      <main className="relative flex w-full max-w-full flex-1 flex-col overflow-x-clip">
        <AgencyHero />
        <PinnedScrollReveal />
        <LiveWork />
        <PricingFaq />
        <FinalCta />
      </main>
      <AgencyFooter />
    </>
  );
}
