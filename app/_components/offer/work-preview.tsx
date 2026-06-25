"use client";

import Image from "next/image";
import { capture } from "@/app/_lib/posthog";
import { landingContent } from "@/app/_content/landing";

export function WorkPreview({
  window: windowContent,
}: {
  window: (typeof landingContent)["examples"]["windows"][number];
}) {
  return (
    <a
      href={windowContent.href}
      target="_blank"
      rel="noopener noreferrer"
      data-testid={`example-browser-window-${windowContent.id}`}
      data-cursor="hover"
      data-cursor-label="visit"
      className="mockup-browser card group block max-w-full overflow-hidden rounded-[26px] border border-cw-ink/18 bg-neutral text-neutral-content shadow-[0_34px_90px_rgba(21,17,43,0.18)] transition-transform duration-500 ease-out hover:-translate-y-1"
      onClick={() => capture("work_sample_clicked", { sample_id: windowContent.id, brand_name: windowContent.brandName, url: windowContent.href })}
    >
      <BrowserBar url={windowContent.urlBar} />

      <div className="relative aspect-[16/10] overflow-hidden bg-cw-ink">
        <Image
          src={windowContent.screenshot}
          alt={`${windowContent.brandName} preview`}
          fill
          unoptimized
          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-cw-ink/60 via-cw-ink/10 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-cw-orange">
            {windowContent.label}
          </p>
          <h3 className="mt-1 text-2xl font-semibold text-cw-cream sm:text-3xl">
            {windowContent.brandName}
          </h3>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-cw-cream/72">
            {windowContent.description}
          </p>
          <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-cw-orange">
            Visit live site
            <svg
              className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M7 17 17 7" />
              <path d="M7 7h10v10" />
            </svg>
          </span>
        </div>
      </div>
    </a>
  );
}

function BrowserBar({ url }: { url: string }) {
  return (
    <div className="mockup-browser-toolbar flex items-center gap-3 border-b border-white/15 cw-liquid--dark px-4 py-3 before:hidden">
      <span className="flex gap-1.5" aria-hidden="true">
        <span className="badge badge-error size-2.5 min-h-0 min-w-0 rounded-full border-0 p-0" />
        <span className="badge badge-warning size-2.5 min-h-0 min-w-0 rounded-full border-0 p-0" />
        <span className="badge badge-accent size-2.5 min-h-0 min-w-0 rounded-full border-0 p-0" />
      </span>
      <div className="input input-xs h-auto min-h-0 flex-1 rounded-full border-cw-cream/15 bg-cw-cream/6 px-3 py-1 text-center font-mono text-xs text-cw-cream/52">
        {url}
      </div>
    </div>
  );
}
