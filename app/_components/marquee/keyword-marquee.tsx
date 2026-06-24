const ITEMS = [
  "Build from zero",
  "Redesign your site",
  "From $199 one time",
  "Hosting and domain",
  "Monthly maintenance",
  "Free edit every 6 months",
  "Live in days",
  "You own the site",
];

export function KeywordMarquee() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div className="border-y border-cw-ink/12 bg-cw-cream py-4">
      <div className="cw-marquee">
        <div className="cw-marquee__track font-mono text-sm font-semibold uppercase tracking-[0.18em] text-cw-ink/70">
          {row.map((item, i) => (
            <span key={i} className="inline-flex items-center gap-3">
              <span className="size-1.5 rounded-full bg-cw-orange" aria-hidden="true" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
