import type { Metadata } from "next";
import Link from "next/link";
import { legalPolicies, legalContent } from "@/app/_content/legal";
import { landingContent } from "@/app/_content/landing";

export const metadata: Metadata = {
  title: "Legal & Policies",
  description:
    "Index of caffienatedweb legal documents: Terms of Service, Privacy Policy, Refund Policy, and Cookie Policy.",
  alternates: { canonical: "/legal" },
};

export default function LegalIndexPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <p className="font-mono text-xs uppercase tracking-wider text-accent">
        {landingContent.brand.name} / legal
      </p>
      <h1 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
        Legal &amp; policies
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-base-content/80">
        The documents that govern how {landingContent.brand.name} works with
        clients and visitors. They are written in plain language, but they are
        still legal terms, so please read them.
      </p>

      <ul className="mt-10 divide-y divide-base-content/10 border-y border-base-content/10">
        {legalPolicies.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/legal/${p.slug}`}
              className="group flex flex-col gap-1 py-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <span>
                <span className="text-lg font-semibold group-hover:text-accent">
                  {p.title}
                </span>
                <span className="mt-1 block text-sm text-base-content/60">
                  {p.description}
                </span>
              </span>
              <span
                aria-hidden
                className="mt-2 font-mono text-accent sm:mt-0 sm:pl-6"
              >
                {"->"}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <p className="mt-10 text-sm leading-relaxed text-base-content/70">
        Questions about any of these documents? Email{" "}
        <a
          href={`mailto:${legalContent.brand.contactEmail}`}
          className="font-medium text-accent underline-offset-2 hover:underline"
        >
          {legalContent.brand.contactEmail}
        </a>
        .
      </p>
    </div>
  );
}
