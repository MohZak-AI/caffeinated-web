import { SiteHeader } from "./_components/nav/site-header";
import { AgencyHero } from "./_components/hero/agency-hero";
import { EliteFinale } from "./_components/elite/elite-finale";
import { AgencyFooter } from "./_components/elite/agency-footer";
import { ScrollPhaseOrchestrator } from "./_components/scroll/scroll-phase-orchestrator";
import { DidYouKnow } from "./_components/offer/did-you-know";

export default function Home() {
  return (
    <main className="relative flex flex-1 flex-col">
      <ScrollPhaseOrchestrator>
        <SiteHeader />
        <AgencyHero />
        <DidYouKnow />
        <EliteFinale />
        <AgencyFooter />
      </ScrollPhaseOrchestrator>
    </main>
  );
}
