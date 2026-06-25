import { legalBySlug, legalContent, type LegalPolicy } from "@/app/_content/legal";
import { landingContent } from "@/app/_content/landing";

/**
 * Renders a single policy as accessible prose: intro paragraph, then numbered
 * sections with their paragraphs and optional bullet lists. Shared by every
 * /legal/<slug> page so the markup is consistent and the content lives in one
 * place (app/_content/legal.ts).
 */
export function PolicyView({ slug }: { slug: LegalPolicy["slug"] }) {
  const policy = legalBySlug(slug);
  if (!policy) return null;

  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <p className="font-mono text-xs uppercase tracking-wider text-accent">
        {landingContent.brand.name} / legal
      </p>
      <h1 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
        {policy.title}
      </h1>
      <p className="mt-2 text-sm text-base-content/60">
        Last updated: {legalContent.brand.lastUpdated}
      </p>
      <p className="mt-6 text-lg leading-relaxed text-base-content/80">
        {policy.intro}
      </p>

      <div className="mt-10 space-y-10">
        {policy.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
              {section.heading}
            </h2>
            {section.paragraphs?.map((para, i) => (
              <p
                key={i}
                className="mt-3 leading-relaxed text-base-content/80"
              >
                {para}
              </p>
            ))}
            {section.list?.length ? (
              <ul className="mt-4 list-disc space-y-2 pl-6 text-base-content/80 marker:text-accent">
                {section.list.map((item, i) => (
                  <li key={i} className="leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}
      </div>

      <hr className="my-12 border-base-content/10" />
      <p className="text-sm leading-relaxed text-base-content/70">
        Questions about this policy? Email{" "}
        <a
          href={`mailto:${legalContent.brand.contactEmail}`}
          className="font-medium text-accent underline-offset-2 hover:underline"
        >
          {legalContent.brand.contactEmail}
        </a>
        .
      </p>
    </article>
  );
}
