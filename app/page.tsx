import { SiteHeader } from "./_components/nav/site-header";
import { AgencyHero } from "./_components/hero/agency-hero";
import { KeywordMarquee } from "./_components/marquee/keyword-marquee";
import { EliteFinale } from "./_components/elite/elite-finale";
import { AgencyFooter } from "./_components/elite/agency-footer";
import { ScrollPhaseOrchestrator } from "./_components/scroll/scroll-phase-orchestrator";
import { StructuredData } from "./_components/seo/structured-data";
import { DidYouKnow } from "./_components/offer/did-you-know";
import { Faq } from "./_components/faq/faq";

export default function Home() {
  return (
    <main className="relative flex flex-1 flex-col">
      <StructuredData />
      <ScrollPhaseOrchestrator>
        <SiteHeader />
        <AgencyHero />
        <KeywordMarquee />
        <DidYouKnow />
        <Faq />
        <EliteFinale />
        <AgencyFooter />
      </ScrollPhaseOrchestrator>
    </main>
  );
}
