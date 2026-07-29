"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { landingContent } from "@/app/_content/landing";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const STORY_COLORS = [
  { background: "#120D0A", text: "#F5EBE0" },
  { background: "#241509", text: "#E8C99B" },
  { background: "#2E1A0F", text: "#F2A65A" },
  { background: "#1E1611", text: "#D49B54" },
] as const;

const BUBBLE_CONFIG = [
  { left: "17%", size: 8, bottom: "40%" },
  { left: "25%", size: 12, bottom: "34%" },
  { left: "36%", size: 16, bottom: "42%" },
  { left: "46%", size: 8, bottom: "32%" },
  { left: "57%", size: 12, bottom: "38%" },
  { left: "66%", size: 16, bottom: "33%" },
  { left: "76%", size: 8, bottom: "41%" },
  { left: "84%", size: 12, bottom: "35%" },
] as const;

const COLOR_CROSSINGS = [0.25, 0.5, 0.75] as const;

function playBubbleBurst(bubbles: readonly HTMLElement[]) {
  gsap.killTweensOf(bubbles);
  gsap.set(bubbles, { opacity: 0, scale: 0.75, y: 0 });

  const burst = gsap.timeline();
  burst
    .to(bubbles, {
      opacity: 0.9,
      scale: 1,
      y: -8,
      duration: 0.16,
      ease: "power2.out",
      stagger: 0.035,
    })
    .to(
      bubbles,
      {
        opacity: 0,
        y: (index: number) => -(20 + (index % 3) * 10),
        duration: 0.34,
        ease: "power1.in",
        stagger: 0.035,
      },
      0.12,
    );
}

export function PinnedScrollReveal() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const stage = stageRef.current;
      if (!section || !stage) return;

      const beats = Array.from(
        section.querySelectorAll<HTMLElement>(".cw-story-beat"),
      );
      const bubbles = Array.from(
        section.querySelectorAll<HTMLElement>(".cw-story-bubble"),
      );
      const media = gsap.matchMedia();

      media.add(
        "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        () => {
          let previousProgress = 0;
          gsap.set(beats, { opacity: 0, y: 24 });
          gsap.set(beats[0], { opacity: 1, y: 0 });

          const timeline = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "bottom bottom",
              scrub: true,
              onUpdate: (self) => {
                const currentProgress = self.progress;
                const movingForward = currentProgress >= previousProgress;
                const crossing = movingForward
                  ? COLOR_CROSSINGS.find(
                      (value) =>
                        previousProgress < value && currentProgress >= value,
                    )
                  : [...COLOR_CROSSINGS]
                      .reverse()
                      .find(
                        (value) =>
                          previousProgress > value && currentProgress <= value,
                      );

                if (crossing !== undefined) playBubbleBurst(bubbles);
                previousProgress = currentProgress;
              },
            },
          });

          timeline
            .to(
              stage,
              {
                backgroundColor: STORY_COLORS[1].background,
                color: STORY_COLORS[1].text,
                duration: 0.25,
              },
              0.125,
            )
            .to(
              stage,
              {
                backgroundColor: STORY_COLORS[2].background,
                color: STORY_COLORS[2].text,
                duration: 0.25,
              },
              0.375,
            )
            .to(
              stage,
              {
                backgroundColor: STORY_COLORS[3].background,
                color: STORY_COLORS[3].text,
                duration: 0.25,
              },
              0.625,
            )
            .to(
              stage,
              {
                backgroundColor: STORY_COLORS[3].background,
                color: STORY_COLORS[3].text,
                duration: 0.125,
              },
              0.875,
            );

          for (let index = 0; index < beats.length - 1; index += 1) {
            const outgoing = beats[index];
            const incoming = beats[index + 1];
            if (!outgoing || !incoming) continue;
            const exitStart = 0.21 + index * 0.25;
            const enterStart = 0.25 + index * 0.25;

            timeline
              .to(
                outgoing,
                {
                  opacity: 0,
                  y: -24,
                  duration: 0.04,
                },
                exitStart,
              )
              .fromTo(
                incoming,
                { opacity: 0, y: 24 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.04,
                  immediateRender: false,
                },
                enterStart,
              );
          }
        },
      );

      media.add(
        "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
        () => {
          for (const beat of beats) {
            gsap.from(beat, {
              opacity: 0,
              y: 24,
              duration: 0.5,
              ease: "power2.out",
              scrollTrigger: {
                trigger: beat,
                start: "top 88%",
                toggleActions: "play none none none",
              },
            });
          }
        },
      );

      media.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(beats, { opacity: 1, y: 0 });
      });

      return () => {
        gsap.killTweensOf(bubbles);
        media.revert();
      };
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="story"
      aria-label="Why a website's first impression matters"
      className="cw-scroll-story relative w-full"
    >
      <div
        ref={stageRef}
        data-testid="pinned-story"
        className="cw-story-sticky"
      >
        <div className="cw-story-stage">
          {landingContent.story.lines.map((line) => (
            <p key={line} className="cw-story-beat">
              {line}
            </p>
          ))}
        </div>

        <div className="cw-story-bubbles" aria-hidden="true">
          {BUBBLE_CONFIG.map((bubble, index) => (
            <span
              key={`${bubble.left}-${bubble.size}`}
              className="cw-story-bubble"
              data-bubble-index={index}
              style={{
                left: bubble.left,
                bottom: bubble.bottom,
                width: bubble.size,
                height: bubble.size,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
