import Image from "next/image";
import { landingContent } from "@/app/_content/landing";

/**
 * Footer — continues the code-console ending: dark surface, monospace, a faint
 * terminal prompt. Self-contained dark background so it pairs with the finale.
 */
export function AgencyFooter() {
  return (
    <footer className="w-full bg-[#0d0f12] px-4 py-14 font-mono text-[#8b949e] sm:px-6 lg:px-8 xl:px-12">
      <div className="mx-auto max-w-3xl border-t border-white/10 pt-10">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <Image
                src="/caffeinated-web.gif"
                alt={`${landingContent.brand.name} logo`}
                width={80}
                height={45}
                unoptimized
                className="rounded-md"
              />
              <p className="flex items-center gap-2 text-[15px] font-semibold text-white">
                <span className="text-[#16d8c2]">$</span>
                {landingContent.brand.name}
              </p>
            </div>
            <p className="mt-3 text-sm text-[#6e7681]">
              {landingContent.brand.tagline}
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:items-end">
            <nav
              aria-label="Footer"
              className="flex gap-4 text-sm text-[#c9d1d9]"
            >
              <a href="#pricing" className="hover:text-white">
                Pricing
              </a>
              <a href="#contact" className="hover:text-white">
                Book a call
              </a>
            </nav>
            <a
              href={`mailto:${landingContent.booking.fallbackEmail}`}
              className="mt-1 text-sm text-[#16d8c2] hover:underline"
            >
              {landingContent.booking.fallbackEmail}
            </a>
          </div>
        </div>

        <p className="mt-10 text-xs text-[#6e7681]">
          <span className="text-[#16d8c2]">{"//"}</span> ©{" "}
          {new Date().getFullYear()} {landingContent.brand.name}. all rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
