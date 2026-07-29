import Image from "next/image";
import { CodexWorkbench } from "./codex-workbench";
import { SectionReveal } from "../scroll/section-reveal";

export function DidYouKnow() {
  return (
    <section
      id="pricing"
      className="relative isolate w-full overflow-hidden px-4 pb-24 pt-8 text-cw-ink sm:px-6 sm:pb-28 sm:pt-10 lg:px-8 lg:pb-36 lg:pt-14"
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute left-1/2 top-1/2 h-[46rem] w-[46rem] -translate-x-1/2 -translate-y-1/2 bg-white/45 blur-3xl" />
        <Image
          src="/caffeinated-web-logo.webp"
          alt=""
          unoptimized
          priority
          fill
          className="object-contain object-center opacity-[0.08]"
        />
      </div>
      <div
        aria-hidden="true"
        className="cw-aurora"
      >
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-1 z-[1] h-24 bg-gradient-to-b from-cw-cream via-cw-cream/70 to-transparent"
      />
      <div className="relative z-10">
        <SectionReveal y={28} amount={0.15}>
          <CodexWorkbench />
        </SectionReveal>
      </div>
    </section>
  );
}
