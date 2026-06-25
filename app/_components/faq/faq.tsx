"use client";

import { capture } from "@/app/_lib/posthog";
import { landingContent } from "@/app/_content/landing";
import { motion } from "motion/react";
import { SectionReveal, Stagger, StaggerItem } from "../scroll/section-reveal";
import { useMotionAllowed } from "../motion/use-motion-allowed";

export function Faq() {
  const motionAllowed = useMotionAllowed();

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
            className="mt-4 text-[clamp(2rem,5vw,4rem)] font-semibold leading-[0.98] tracking-[-0.035em] text-balance break-words"
          >
            Straight answers, no jargon.
          </h2>
        </SectionReveal>

        <Stagger className="mt-10 grid gap-3">
          {landingContent.faq.map((item) => (
            <StaggerItem key={item.q}>
              {motionAllowed ? (
                <motion.details
                  className="collapse collapse-plus border border-base-300 bg-base-100/70 text-base-content shadow-sm transition-colors duration-200 open:border-primary/45 open:bg-base-100"
                  whileHover={{ y: -2, transition: { duration: 0.2 } }}
                  whileTap={{ scale: 0.995 }}
                  onToggle={(e) => {
                    if ((e.currentTarget as HTMLDetailsElement).open) {
                      capture("faq_item_expanded", { question: item.q });
                    }
                  }}
                >
                  <summary className="collapse-title cursor-pointer text-lg font-semibold tracking-[-0.01em] text-cw-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:text-xl">
                    {item.q}
                  </summary>
                  <div className="collapse-content text-base leading-relaxed text-cw-ink/68">
                    <p className="max-w-2xl pb-2">{item.a}</p>
                  </div>
                </motion.details>
              ) : (
                <details
                  className="collapse collapse-plus border border-base-300 bg-base-100/70 text-base-content shadow-sm transition-colors duration-200 open:border-primary/45 open:bg-base-100"
                  onToggle={(e) => {
                    if (e.currentTarget.open) {
                      capture("faq_item_expanded", { question: item.q });
                    }
                  }}
                >
                  <summary className="collapse-title cursor-pointer text-lg font-semibold tracking-[-0.01em] text-cw-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:text-xl">
                    {item.q}
                  </summary>
                  <div className="collapse-content text-base leading-relaxed text-cw-ink/68">
                    <p className="max-w-2xl pb-2">{item.a}</p>
                  </div>
                </details>
              )}
            </StaggerItem>
          ))}
        </Stagger>

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
