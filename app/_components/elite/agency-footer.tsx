"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { motion } from "motion/react";
import { capture } from "@/app/_lib/posthog";
import { landingContent } from "@/app/_content/landing";
import { legalPolicies } from "@/app/_content/legal";
import { SectionReveal } from "../scroll/section-reveal";
import { useMotionAllowed } from "../motion/use-motion-allowed";

type FooterLinkMotionProps = {
  readonly children: ReactNode;
  readonly motionAllowed: boolean;
};

function FooterLinkMotion({ children, motionAllowed }: FooterLinkMotionProps) {
  if (motionAllowed) {
    return (
      <motion.span
        className="inline-block"
        whileHover={{ y: -1 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.span>
    );
  }

  return <>{children}</>;
}

export function AgencyFooter() {
  const motionAllowed = useMotionAllowed();

  return (
    <SectionReveal y={20}>
      <footer className="w-full bg-neutral px-4 py-14 font-mono text-neutral-content/62 sm:px-6 lg:px-8 xl:px-12">
        <div className="mx-auto max-w-3xl cw-liquid--dark rounded-2xl border border-neutral-content/12 px-6 py-10 sm:px-10">
          <div className="footer sm:footer-horizontal sm:items-start sm:justify-between">
            <aside>
              <div className="flex items-center gap-3 text-neutral-content">
                <Image
                  src="/caffeinated-web-logo.webp"
                  alt={`${landingContent.brand.name} logo`}
                  width={40}
                  height={50}
                  unoptimized
                />
                <p className="flex items-center gap-2 text-[15px] font-semibold">
                  <span className="text-accent">$</span>
                  {landingContent.brand.name}
                </p>
              </div>
              <p className="mt-3 text-sm text-neutral-content/50">
                {landingContent.brand.tagline}
              </p>
            </aside>

            <nav className="sm:items-end" aria-label="Footer">
              <div className="flex gap-4 text-sm text-neutral-content/82">
                <FooterLinkMotion motionAllowed={motionAllowed}>
                  <a href="#pricing" className="link link-hover hover:text-neutral-content">
                    Pricing
                  </a>
                </FooterLinkMotion>
                <FooterLinkMotion motionAllowed={motionAllowed}>
                  <a href="#contact" className="link link-hover hover:text-neutral-content">
                    Book a call
                  </a>
                </FooterLinkMotion>
                <FooterLinkMotion motionAllowed={motionAllowed}>
                  <Link href="/legal" className="link link-hover hover:text-neutral-content">
                    Legal
                  </Link>
                </FooterLinkMotion>
              </div>
              <FooterLinkMotion motionAllowed={motionAllowed}>
                <a
                  href={`mailto:${landingContent.booking.fallbackEmail}`}
                  className="link link-hover mt-1 text-sm text-accent"
                  onClick={() => capture("footer_email_clicked", { email: landingContent.booking.fallbackEmail })}
                >
                  {landingContent.booking.fallbackEmail}
                </a>
              </FooterLinkMotion>
            </nav>
          </div>

          <nav
            aria-label="Legal"
            className="mt-8 flex flex-wrap gap-x-5 gap-y-2 border-t border-neutral-content/10 pt-5 text-xs text-neutral-content/55"
          >
            <FooterLinkMotion motionAllowed={motionAllowed}>
              <Link href="/legal" className="link link-hover hover:text-neutral-content">
                Legal &amp; policies
              </Link>
            </FooterLinkMotion>
            {legalPolicies.map((p) => (
              <FooterLinkMotion key={p.slug} motionAllowed={motionAllowed}>
                <Link
                  href={`/legal/${p.slug}`}
                  className="link link-hover hover:text-neutral-content"
                >
                  {p.title}
                </Link>
              </FooterLinkMotion>
            ))}
          </nav>

          <p className="mt-10 text-xs text-neutral-content/50">
            <span className="text-accent">{"//"}</span> ©{" "}
            {new Date().getFullYear()} {landingContent.brand.name}. all rights
            reserved.
          </p>
        </div>
      </footer>
    </SectionReveal>
  );
}
