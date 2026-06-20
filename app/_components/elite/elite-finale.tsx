import { landingContent } from "@/app/_content/landing";
import { BookingDiscoveryDialog } from "../hero/booking-discovery-dialog";
import { SectionReveal } from "../scroll/section-reveal";

/**
 * Phase 3 — the closing CTA, reimagined as a ChatGPT-style code console.
 * Dark, fully monospace (the tail end of the page-long sans→mono type
 * journey), with a chat thread, a syntax-highlighted code block, and a
 * composer whose "send" control opens the booking dialog. Self-contained dark
 * background so it holds up in any scroll / reduced-motion state.
 */
export function EliteFinale() {
  const { elite, brand } = landingContent;

  return (
    <section
      id="contact"
      aria-labelledby="elite-headline"
      className="relative w-full bg-[#0d0f12] px-4 py-28 font-mono text-[#e6edf3] sm:px-6 lg:px-8 lg:py-36 xl:px-12"
    >
      <div className="mx-auto max-w-3xl">
        <SectionReveal y={24}>
          <p className="text-sm text-[#16d8c2]">{"// let's-build"}</p>
          <h2
            id="elite-headline"
            className="mt-3 text-[clamp(26px,4.4vw,40px)] font-semibold leading-[1.15] tracking-tight text-white"
          >
            {elite.closingHeadline}
          </h2>
        </SectionReveal>

        {/* Chat console */}
        <SectionReveal y={24} delay={0.08}>
          <div className="mt-10 overflow-hidden rounded-2xl border border-white/10 bg-[#15181c] shadow-[0_30px_80px_-40px_rgba(0,0,0,0.8)]">
            {/* window chrome */}
            <div className="flex items-center gap-2 border-b border-white/10 bg-[#0f1216] px-4 py-3">
              <span className="flex gap-1.5" aria-hidden="true">
                <span className="size-3 rounded-full bg-[#ff5f56]" />
                <span className="size-3 rounded-full bg-[#ffbd2e]" />
                <span className="size-3 rounded-full bg-[#27c93f]" />
              </span>
              <span className="ml-2 text-xs text-[#8b949e]">
                {brand.name} — discovery session
              </span>
              <span className="ml-auto hidden text-xs text-[#8b949e] sm:inline">
                gpt · build-mode
              </span>
            </div>

            {/* thread */}
            <div className="flex flex-col gap-5 p-5 sm:p-6">
              {/* user turn */}
              <div className="flex justify-end">
                <p className="max-w-[80%] rounded-2xl rounded-br-sm bg-[#2a2d31] px-4 py-2.5 text-sm text-white">
                  How do we get started with caffeinatedweb?
                </p>
              </div>

              {/* assistant turn */}
              <div className="flex gap-3">
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-[#10a37f] text-xs font-semibold text-white">
                  c
                </span>
                <div className="min-w-0 flex-1 space-y-3 text-sm leading-relaxed text-[#c9d1d9]">
                  <p>{elite.closingBody}</p>

                  {/* code block */}
                  <pre className="overflow-x-auto rounded-lg border border-white/10 bg-[#0d0f12] p-4 text-[13px] leading-relaxed">
                    <code>
                      <span className="text-[#ff7b72]">const</span>{" "}
                      <span className="text-[#79c0ff]">project</span>{" "}
                      <span className="text-[#8b949e]">=</span>{" "}
                      <span className="text-[#ff7b72]">await</span>{" "}
                      <span className="text-[#d2a8ff]">caffeinatedweb</span>
                      <span className="text-[#8b949e]">.</span>
                      <span className="text-[#d2a8ff]">start</span>
                      <span className="text-[#8b949e]">{"({"}</span>
                      {"\n"}
                      {"  "}
                      <span className="text-[#79c0ff]">scope</span>
                      <span className="text-[#8b949e]">:</span>{" "}
                      <span className="text-[#a5d6ff]">{'"discovery-call"'}</span>
                      <span className="text-[#8b949e]">,</span>
                      {"\n"}
                      {"  "}
                      <span className="text-[#79c0ff]">duration</span>
                      <span className="text-[#8b949e]">:</span>{" "}
                      <span className="text-[#a5d6ff]">{'"30 min"'}</span>
                      <span className="text-[#8b949e]">,</span>
                      {"\n"}
                      <span className="text-[#8b949e]">{"});"}</span>
                      {"\n"}
                      <span className="text-[#8b949e]">
                        {"// → clear next-step plan within 1 business day"}
                      </span>
                    </code>
                  </pre>

                  {/* outcomes as terminal output */}
                  <p className="flex flex-wrap gap-x-2 gap-y-1 text-xs text-[#8b949e]">
                    {elite.ribbon.map((item, index) => (
                      <span key={item.label}>
                        <span className="text-[#16d8c2]">{item.value}</span>{" "}
                        {item.label.toLowerCase()}
                        {index < elite.ribbon.length - 1 ? (
                          <span className="ml-2 text-white/20">·</span>
                        ) : null}
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            </div>

            {/* composer */}
            <div className="border-t border-white/10 bg-[#0f1216] p-4">
              <div className="flex items-center gap-3 rounded-xl border border-white/15 bg-[#15181c] py-2 pl-4 pr-2">
                <span className="flex-1 truncate text-sm text-[#6e7681]">
                  Message caffeinatedweb…
                </span>
                <BookingDiscoveryDialog variant="elite" />
              </div>
              <p className="mt-3 text-center text-xs text-[#6e7681]">
                {elite.assurance}
              </p>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
