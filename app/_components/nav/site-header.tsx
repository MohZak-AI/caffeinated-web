import Image from "next/image";
import { landingContent } from "@/app/_content/landing";

/**
 * Professional sticky top menu. Translucent, blurred, hairline border — the
 * modern-SaaS header treatment. Holds the canonical #pricing / #contact
 * section anchors for the page (Contact doubles as the menu's CTA pill).
 */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-cw-ink/10 cw-liquid">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:h-24 sm:px-6 lg:px-8 xl:px-12">
        <a href="#" className="flex items-center gap-2.5 text-cw-ink sm:gap-3.5">
          <Image
            src="/caffeinated-web-logo.webp"
            alt={`${landingContent.brand.name} logo`}
            width={48}
            height={60}
            unoptimized
            priority
            className="-my-1 h-10 w-auto sm:h-12"
          />
          <span className="font-pixel text-[9px] leading-none text-cw-ink sm:text-base">
            {landingContent.brand.name}
          </span>
        </a>

        <nav
          aria-label="Primary"
          className="flex items-center gap-3 text-sm sm:gap-7 sm:text-base"
        >
          <a
            href="#pricing"
            className="font-medium text-cw-ink/70 transition-colors hover:text-cw-ink"
          >
            Pricing
          </a>
          <a
            href="#contact"
            className="inline-flex h-10 items-center justify-center rounded-full bg-cw-ink px-4 font-medium text-cw-cream transition-colors duration-200 hover:bg-cw-ink/85 sm:h-11 sm:px-5"
          >
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}
