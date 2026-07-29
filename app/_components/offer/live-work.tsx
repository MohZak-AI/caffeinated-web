import Image from "next/image";
import { landingContent } from "@/app/_content/landing";

export function LiveWork() {
  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="cw-espresso-surface relative w-full px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40 xl:px-12"
    >
      <div className="mx-auto max-w-7xl">
        <div className="max-w-5xl">
          <span className="cw-pixel-beans" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <h2
            id="work-heading"
            className="mt-7 text-[clamp(2.65rem,5.6vw,5.6rem)] font-semibold leading-[0.94] tracking-[-0.05em] text-[var(--text-primary)] text-balance"
          >
            {landingContent.work.title}
          </h2>
          <p className="mt-5 text-sm text-[var(--text-secondary)]">
            {landingContent.work.subheading}
          </p>
        </div>

        <div className="mt-14 grid grid-flow-dense gap-6 md:grid-cols-2">
          {landingContent.work.projects.map((project) => (
            <a
              key={project.id}
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              data-testid={`work-link-${project.id}`}
              data-cursor="hover"
              data-cursor-label="visit"
              className="group flex min-w-0 flex-col border border-[color-mix(in_srgb,var(--text-primary)_14%,transparent)] bg-[var(--bg-primary)] transition-transform duration-300 hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus)] motion-reduce:transform-none"
            >
              <div className="relative aspect-[16/10] overflow-hidden border-b border-[color-mix(in_srgb,var(--text-primary)_12%,transparent)] bg-[var(--bg-primary)]">
                <Image
                  src={project.screenshot}
                  alt={`${project.name} website preview`}
                  fill
                  sizes="(max-width: 767px) 100vw, 50vw"
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transform-none"
                />
              </div>
              <div className="flex flex-1 flex-col p-6 sm:p-8">
                <h3 className="text-3xl font-semibold tracking-[-0.035em] text-[var(--text-primary)]">
                  {project.name}
                </h3>
                <p className="mt-5 text-base leading-[1.72] text-[var(--text-secondary)]">
                  {project.note}
                </p>
                <span className="mt-8 inline-flex items-center gap-3 border-t border-[color-mix(in_srgb,var(--text-primary)_12%,transparent)] pt-5 font-mono text-xs font-semibold uppercase tracking-[0.12em] text-[var(--accent)]">
                  {landingContent.work.linkLabel}
                  <span aria-hidden="true">↗</span>
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
