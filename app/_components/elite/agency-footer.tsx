import Image from "next/image";
import { landingContent } from "@/app/_content/landing";

/**
 * Footer — continues the code-console ending: dark surface, monospace, a faint
 * terminal prompt. Self-contained dark background so it pairs with the finale.
 */
export function AgencyFooter() {
  return (
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
              <a href="#pricing" className="link link-hover hover:text-neutral-content">
                Pricing
              </a>
              <a href="#contact" className="link link-hover hover:text-neutral-content">
                Book a call
              </a>
            </div>
            <a
              href={`mailto:${landingContent.booking.fallbackEmail}`}
              className="link link-hover mt-1 text-sm text-accent"
            >
              {landingContent.booking.fallbackEmail}
            </a>
          </nav>
        </div>

        <p className="mt-10 text-xs text-neutral-content/50">
          <span className="text-accent">{"//"}</span> ©{" "}
          {new Date().getFullYear()} {landingContent.brand.name}. all rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
