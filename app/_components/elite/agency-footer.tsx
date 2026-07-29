import Link from "next/link";
import { landingContent } from "@/app/_content/landing";
import { legalPolicies } from "@/app/_content/legal";

export function AgencyFooter() {
  return (
    <footer className="w-full border-t border-[color-mix(in_srgb,var(--text-primary)_10%,transparent)] bg-[var(--bg-primary)] px-4 py-10 text-[var(--text-primary)] sm:px-6 lg:px-8 xl:px-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <a
            href="#top"
            className="text-lg font-semibold tracking-[-0.025em] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus)]"
          >
            {landingContent.brand.name}
          </a>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-[var(--text-secondary)]">
            {landingContent.brand.tagline}
          </p>
        </div>

        <nav
          aria-label="Footer navigation"
          className="flex flex-wrap gap-x-5 gap-y-3 text-sm font-semibold text-[var(--text-secondary)]"
        >
          <a href="#work" className="hover:text-[var(--text-primary)]">
            Work
          </a>
          <a href="#faq" className="hover:text-[var(--text-primary)]">
            FAQ
          </a>
          <Link href="/legal" className="hover:text-[var(--text-primary)]">
            Legal
          </Link>
        </nav>
      </div>

      <div className="mx-auto mt-8 flex max-w-7xl flex-col gap-4 border-t border-[color-mix(in_srgb,var(--text-primary)_10%,transparent)] pt-6 text-xs text-[color-mix(in_srgb,var(--text-secondary)_72%,transparent)] sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {landingContent.brand.name}
        </p>
        <div className="flex flex-wrap gap-4">
          {legalPolicies.map((policy) => (
            <Link
              key={policy.slug}
              href={`/legal/${policy.slug}`}
              className="hover:text-[var(--text-primary)]"
            >
              {policy.title}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
