import Image from "next/image";
import { landingContent } from "@/app/_content/landing";

/**
 * Professional sticky top menu. Translucent, blurred, hairline border — the
 * modern-SaaS header treatment. Holds the canonical #pricing / #contact
 * section anchors for the page (Contact doubles as the menu's CTA pill).
 */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-cw-ink/10 bg-cw-cream/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 xl:px-12">
        <a href="#" className="flex items-center gap-2.5 text-cw-ink">
          <span className="flex overflow-hidden rounded-lg bg-black">
            <Image
              src="/caffeinated-web.gif"
              alt={`${landingContent.brand.name} logo`}
              width={64}
              height={36}
              unoptimized
              priority
            />
          </span>
          <span className="text-[15px] font-semibold tracking-tight">
            {landingContent.brand.name}
          </span>
        </a>

        <nav aria-label="Primary" className="flex items-center gap-5 sm:gap-7">
          <a
            href="#pricing"
            className="text-sm font-medium text-cw-ink/70 transition-colors hover:text-cw-ink"
          >
            Pricing
          </a>
          <a
            href="#contact"
            className="inline-flex h-9 items-center justify-center rounded-full bg-cw-ink px-4 text-sm font-medium text-cw-cream transition-colors duration-200 hover:bg-cw-ink/85"
          >
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}
