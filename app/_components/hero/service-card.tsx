import { landingContent } from "@/app/_content/landing";

function RocketIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2.5c-3.5 0-6.5 3-7.5 7 1-.5 2-.8 3-.8.5 0 1 0 1.5.2L12 2.5zm2 0l3 6.4c.5-.1 1-.2 1.5-.2 1 0 2 .3 3 .8-1-4-4-7-7.5-7zM12 12c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4zm-7 4c0-1.5.5-2.8 1.3-3.8L3 9l4.2 3.3C6.5 13.2 6 14.5 5 16zm14 0c-1-1.5-1.5-2.8-2.2-3.7L21 9l-3.3 3.2c.8 1 1.3 2.3 1.3 3.8z" />
    </svg>
  );
}

function RobotIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M4 14h16v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-5zm13-2V7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v5h10z" />
      <circle cx="9" cy="10" r="1.5" />
      <circle cx="15" cy="10" r="1.5" />
      <rect x="10" y="2" width="4" height="3" rx="1" />
      <path d="M2 14h20v2H2z" />
    </svg>
  );
}

function ChartIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <rect x="3" y="12" width="4" height="9" rx="1" />
      <rect x="10" y="7" width="4" height="14" rx="1" />
      <rect x="17" y="2" width="4" height="19" rx="1" />
    </svg>
  );
}

const iconMap = {
  "startup-acceleration": RocketIcon,
  "custom-coding": RobotIcon,
  "scalable-solutions": ChartIcon,
};

const colorMap: Record<string, string> = {
  "startup-acceleration": "text-cw-teal",
  "custom-coding": "text-cw-purple",
  "scalable-solutions": "text-cw-orange",
};

export function ServiceCards() {
  return (
    <ul className="grid gap-x-8 gap-y-6 border-t border-cw-ink/10 pt-6 sm:grid-cols-3">
      {landingContent.services.map((service) => {
        const Icon = iconMap[service.id as keyof typeof iconMap];
        return (
          <li
            key={service.id}
            data-testid={`service-icon-${service.id}`}
            className="flex flex-col gap-3 text-left"
          >
            <Icon className={`size-7 ${colorMap[service.id] ?? "text-cw-ink"}`} />
            <div>
              <h3 className="text-[13px] font-semibold uppercase tracking-[0.08em] text-cw-ink">
                {service.label}
              </h3>
              <p className="mt-1 text-sm leading-snug text-cw-ink/60">
                {service.description}
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
