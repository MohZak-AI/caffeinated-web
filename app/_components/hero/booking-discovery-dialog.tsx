"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
} from "react";
import { capture } from "@/app/_lib/posthog";
import { landingContent } from "@/app/_content/landing";

type BookingDiscoveryDialogProps = {
  readonly variant?: "playful" | "nav" | "pricing" | "elite";
  readonly label?: string;
};

const TRIGGER_CLASSES = {
  playful:
    "inline-flex min-h-12 items-center justify-center bg-[var(--accent)] px-7 text-[15px] font-semibold text-[var(--bg-primary)] shadow-lg transition-transform duration-200 hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus)] motion-reduce:transform-none",
  nav: "inline-flex min-h-11 items-center justify-center bg-[var(--accent)] px-5 text-sm font-semibold text-[var(--bg-primary)] transition-[filter] duration-200 hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus)]",
  pricing:
    "inline-flex min-h-12 items-center justify-center bg-[var(--accent)] px-7 text-[15px] font-semibold text-[var(--bg-primary)] shadow-lg transition-transform duration-200 hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus)] motion-reduce:transform-none",
  elite:
    "inline-flex min-h-12 items-center justify-center bg-[var(--accent)] px-7 text-[15px] font-semibold text-[var(--bg-primary)] shadow-lg transition-transform duration-200 hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus)] motion-reduce:transform-none",
} as const;

function resolveSchedulingUrl(value: string | undefined) {
  const fallback = landingContent.booking.defaultSchedulingUrl;

  try {
    const url = new URL(value ?? fallback);
    const isCalendlyHost =
      url.hostname === "calendly.com" || url.hostname.endsWith(".calendly.com");

    return url.protocol === "https:" && isCalendlyHost
      ? url.toString()
      : fallback;
  } catch {
    return fallback;
  }
}

export function BookingDiscoveryDialog({
  variant = "playful",
  label,
}: BookingDiscoveryDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const titleId = useId();
  const descriptionId = useId();
  const schedulingUrl = resolveSchedulingUrl(
    process.env.NEXT_PUBLIC_CALENDLY_URL,
  );

  const closeDialog = useCallback(() => {
    const dialog = dialogRef.current;
    if (dialog?.open) dialog.close();
    previousFocusRef.current?.focus();
    capture("booking_dialog_closed", { variant });
  }, [variant]);

  const openDialog = () => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    previousFocusRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    if (!dialog.open) dialog.showModal();
    closeButtonRef.current?.focus();
    capture("booking_dialog_opened", {
      variant,
      label: label ?? landingContent.hero.ctaPrimary,
    });
  };

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleCancel = (event: Event) => {
      event.preventDefault();
      closeDialog();
    };

    dialog.addEventListener("cancel", handleCancel);
    return () => dialog.removeEventListener("cancel", handleCancel);
  }, [closeDialog]);

  return (
    <>
      <button
        type="button"
        onClick={openDialog}
        data-testid="booking-trigger"
        data-cta="primary"
        data-variant={variant}
        data-booking-ready="true"
        className={TRIGGER_CLASSES[variant]}
      >
        {label ?? landingContent.hero.ctaPrimary}
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        className="m-auto max-h-[calc(100dvh-2rem)] w-[min(92vw,42rem)] overflow-y-auto border-0 bg-transparent p-0 text-[var(--text-primary)] backdrop:bg-black/70"
      >
        <div className="relative overflow-hidden border border-[color-mix(in_srgb,var(--text-primary)_15%,transparent)] bg-[var(--bg-surface)] p-6 sm:p-8">
          <button
            ref={closeButtonRef}
            type="button"
            onClick={closeDialog}
            className="absolute right-3 top-3 z-10 inline-flex size-11 items-center justify-center border border-[color-mix(in_srgb,var(--text-primary)_15%,transparent)] bg-[var(--bg-primary)] text-2xl leading-none text-[var(--text-primary)] transition-colors duration-200 hover:border-[var(--accent)] hover:text-[var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus)]"
            aria-label={landingContent.booking.closeLabel}
          >
            ×
          </button>

          <p className="text-sm font-semibold text-[var(--accent)]">
            No hard sales push
          </p>
          <h2
            id={titleId}
            className="mt-4 max-w-lg pr-12 text-4xl font-semibold leading-[0.96] tracking-[-0.04em] text-[var(--text-primary)]"
          >
            {landingContent.booking.title}
          </h2>
          <p
            id={descriptionId}
            className="mt-4 max-w-xl text-base leading-[1.7] text-[var(--text-secondary)]"
          >
            {landingContent.booking.description}
          </p>

          <div className="mt-6 border border-[color-mix(in_srgb,var(--text-primary)_15%,transparent)] bg-[var(--bg-primary)]">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[color-mix(in_srgb,var(--text-primary)_12%,transparent)] px-4 py-3">
              <p className="text-sm font-semibold text-[var(--text-primary)]">
                {landingContent.booking.schedulerFallbackTitle}
              </p>
              <a
                href={schedulingUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="booking-external-link"
                className="inline-flex min-h-11 items-center justify-center bg-[var(--accent)] px-4 text-sm font-semibold text-[var(--bg-primary)] transition-[filter] duration-200 hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus)]"
              >
                {landingContent.booking.schedulerFallbackLink}
              </a>
            </div>
            <iframe
              src={schedulingUrl}
              title={landingContent.booking.title}
              data-testid="booking-scheduler"
              className="h-[16rem] w-full bg-[#f3e7c8] sm:h-[25rem]"
              loading="lazy"
              sandbox="allow-forms allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts allow-top-navigation-by-user-activation"
            />
          </div>

          <div className="mt-5 border-t border-[color-mix(in_srgb,var(--text-primary)_12%,transparent)] pt-5">
            <h3 className="text-lg font-semibold text-[var(--text-primary)]">
              {landingContent.booking.placeholderHeadline}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
              {landingContent.booking.placeholderBody}
            </p>
            <a
              href={`mailto:${landingContent.booking.fallbackEmail}?subject=Website%20project`}
              className="mt-4 inline-flex min-h-11 items-center justify-center border border-[color-mix(in_srgb,var(--text-primary)_20%,transparent)] px-5 font-mono text-xs font-semibold uppercase tracking-[0.1em] text-[var(--text-primary)] transition-colors duration-200 hover:border-[var(--accent)] hover:text-[var(--accent)]"
              onClick={() =>
                capture("booking_email_fallback_clicked", {
                  email: landingContent.booking.fallbackEmail,
                })
              }
            >
              {landingContent.booking.fallbackEmail}
            </a>
          </div>
        </div>
      </dialog>
    </>
  );
}
