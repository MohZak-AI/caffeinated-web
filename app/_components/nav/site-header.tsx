import Image from "next/image";
import { landingContent } from "@/app/_content/landing";
import { BookingDiscoveryDialog } from "../hero/booking-discovery-dialog";

const navigation = [
  { label: "Work", href: "#work" },
  { label: "FAQ", href: "#faq" },
] as const;

export function SiteHeader() {
  return (
    <header className="relative z-50 w-full border-b border-[color-mix(in_srgb,var(--text-primary)_10%,transparent)] bg-[var(--bg-primary)]">
      <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 xl:px-12">
        <a
          href="#top"
          aria-label={`${landingContent.brand.name}, back to top`}
          className="flex min-h-11 items-center gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus)]"
        >
          <Image
            src="/caffeinated-web-logo.webp"
            alt=""
            width={38}
            height={48}
            priority
            className="cw-pixel-logo h-10 w-auto"
          />
          <span className="text-sm font-semibold tracking-[-0.02em] text-[var(--text-primary)] sm:text-base">
            {landingContent.brand.name}
          </span>
        </a>

        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-7 md:flex"
        >
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-secondary)] transition-colors duration-200 hover:text-[var(--text-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus)]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="[&>button]:min-h-11 [&>button]:px-4 sm:[&>button]:px-5">
          <BookingDiscoveryDialog variant="nav" label="Book a chat" />
        </div>
      </div>
    </header>
  );
}
