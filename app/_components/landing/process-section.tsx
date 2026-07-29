import { landingContent } from "@/app/_content/landing";

export function ProcessSection() {
  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="cw-page-ground relative w-full px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40 xl:px-12"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1fr] lg:items-end">
          <p className="max-w-sm font-mono text-xs font-semibold uppercase leading-relaxed tracking-[0.2em] text-cw-orange">
            {landingContent.process.label}
          </p>
          <h2
            id="process-heading"
            className="max-w-5xl text-[clamp(2.75rem,6vw,6rem)] font-semibold leading-[0.92] tracking-[-0.052em] text-cw-ink text-balance"
          >
            {landingContent.process.title}
          </h2>
        </div>

        <ol className="mt-14 grid grid-flow-dense border-y border-cw-ink/14 lg:grid-cols-3">
          {landingContent.process.steps.map((step) => (
            <li
              key={step.id}
              className="group grid min-w-0 grid-rows-[auto_auto_1fr] border-b border-cw-ink/14 py-8 last:border-b-0 lg:border-b-0 lg:border-r lg:px-8 lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0"
            >
              <span className="font-mono text-xs font-semibold text-cw-orange">
                {step.number}
              </span>
              <h3 className="mt-8 max-w-sm text-3xl font-semibold leading-[1.03] tracking-[-0.035em] text-cw-ink">
                {step.title}
              </h3>
              <p className="mt-6 max-w-md text-base leading-[1.75] text-cw-ink/66">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
