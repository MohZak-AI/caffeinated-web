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
    <div className="border-y border-base-content/10 bg-base-100 py-4 text-base-content">
      <div className="cw-marquee">
        <div className="cw-marquee__track font-mono text-sm font-semibold uppercase tracking-[0.18em]">
          {row.map((item, i) => (
            <span
              key={i}
              className="badge badge-outline rounded-box gap-3 border-base-content/10 bg-base-100/80 px-4 py-3 text-base-content/70 shadow-sm"
            >
              <span className="size-1.5 rounded-full bg-primary" aria-hidden="true" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
