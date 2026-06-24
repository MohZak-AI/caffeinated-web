import Image from "next/image";
import { landingContent } from "@/app/_content/landing";

/**
 * Professional sticky top menu. Translucent, blurred, hairline border — the
 * modern-SaaS header treatment. Holds the canonical #pricing / #contact
 * section anchors for the page (Contact doubles as the menu's CTA pill).
 */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-base-content/10 bg-base-100/70 text-base-content shadow-sm cw-liquid">
      <div className="navbar mx-auto min-h-20 max-w-7xl gap-4 px-4 sm:min-h-24 sm:px-6 lg:px-8 xl:px-12">
        <div className="navbar-start">
          <a
            href="#"
            className="btn btn-ghost h-auto min-h-0 gap-2.5 rounded-box px-2 py-2 text-base-content normal-case sm:gap-3.5"
          >
            <Image
              src="/caffeinated-web-logo.webp"
              alt={`${landingContent.brand.name} logo`}
              width={48}
              height={60}
              unoptimized
              priority
              className="-my-1 h-10 w-auto sm:h-12"
            />
            <span className="text-xs font-semibold leading-none sm:text-base">
              {landingContent.brand.name}
            </span>
          </a>
        </div>

        <nav
          aria-label="Primary"
          className="navbar-end gap-2 text-sm sm:gap-3 sm:text-base"
        >
          <a
            href="#pricing"
            className="btn btn-ghost rounded-box px-3 font-medium text-base-content/70 hover:text-base-content sm:px-4"
          >
            Pricing
          </a>
          <a
            href="#contact"
            className="btn btn-primary rounded-box px-4 font-medium shadow sm:px-5"
          >
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}
