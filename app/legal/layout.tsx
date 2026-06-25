import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { landingContent } from "@/app/_content/landing";
import { legalPolicies, legalContent } from "@/app/_content/legal";

export const metadata: Metadata = {
  title: {
    default: "Legal & Policies",
    template: `%s | ${landingContent.brand.name}`,
  },
  description:
    "Legal information and policies for caffienatedweb, including Terms of Service, Privacy Policy, Refund Policy, and Cookie Policy.",
  robots: { index: true, follow: true },
};

/**
 * Shared shell for every /legal/* page: a slim header with the brand mark and
 * a back-to-home link, a wide prose reading column, then a slim footer. Kept
 * deliberately quiet so the policy text is easy to scan.
 */
export default function LegalLayout({ children }: { children: ReactNode }) {
  const year = new Date().getFullYear();

  return (
    <div className="flex min-h-full flex-col bg-[--cw-cream] text-[--cw-ink]">
      <header className="sticky top-0 z-40 w-full border-b border-base-content/10 bg-base-100/85 backdrop-blur">
        <div className="navbar mx-auto min-h-20 max-w-5xl gap-4 px-4 sm:px-6 lg:px-8">
          <div className="navbar-start">
            <Link
              href="/"
              className="btn btn-ghost h-auto min-h-0 gap-2.5 rounded-box px-2 py-2 normal-case"
            >
              <Image
                src="/caffeinated-web-logo.webp"
                alt={`${landingContent.brand.name} logo`}
                width={40}
                height={50}
                unoptimized
                className="-my-1 h-9 w-auto"
              />
              <span className="flex items-center gap-2 text-xs font-semibold leading-none sm:text-sm">
                {landingContent.brand.name}
                <span className="hidden text-base-content/40 sm:inline">
                  / legal
                </span>
              </span>
            </Link>
          </div>
          <nav
            aria-label="Legal"
            className="navbar-end hidden gap-1 text-sm sm:flex"
          >
            {legalPolicies.map((p) => (
              <Link
                key={p.slug}
                href={`/legal/${p.slug}`}
                className="rounded-box px-2 py-1 font-medium text-base-content/70 hover:bg-base-content/5 hover:text-base-content"
              >
                {p.shortTitle}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main className="flex flex-1 flex-col">{children}</main>

      <footer className="w-full border-t border-base-content/10 bg-base-100/80 px-4 py-10 font-mono text-xs text-base-content/60 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-5xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p>
            <span className="text-accent">{"//"}</span> © {year}{" "}
            {landingContent.brand.name}
          </p>
          <a
            href={`mailto:${legalContent.brand.contactEmail}`}
            className="link link-hover text-accent"
          >
            {legalContent.brand.contactEmail}
          </a>
        </div>
      </footer>
    </div>
  );
}
