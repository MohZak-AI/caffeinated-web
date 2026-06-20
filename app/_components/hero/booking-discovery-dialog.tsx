"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { landingContent } from "@/app/_content/landing";

interface BookingDiscoveryDialogProps {
  /**
   * "playful" (default) — primary hero CTA (now a clean, professional pill).
   * "nav" — compact pill for the sticky header menu.
   * "pricing" — high-contrast pill for the dark "$99" offer card.
   * "elite" — ChatGPT-style "send" control for the code finale section.
   * The dialog itself is a premium neutral so it reads well over any phase.
   */
  variant?: "playful" | "nav" | "pricing" | "elite";
  /** Overrides the trigger label (defaults to the hero primary CTA). */
  label?: string;
}

export function BookingDiscoveryDialog({
  variant = "playful",
  label,
}: BookingDiscoveryDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const schedulingUrl =
    process.env.NEXT_PUBLIC_CALENDLY_URL ??
    landingContent.booking.defaultSchedulingUrl;

  const openDialog = () => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    previousFocus.current = document.activeElement as HTMLElement;
    if (!dialog.open) {
      dialog.showModal();
    }
    closeButtonRef.current?.focus();
  };

  const closeDialog = () => {
    const dialog = dialogRef.current;
    if (dialog?.open) dialog.close();
    previousFocus.current?.focus();
  };

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleCancel = (e: Event) => {
      e.preventDefault();
      closeDialog();
    };

    dialog.addEventListener("cancel", handleCancel);
    return () => dialog.removeEventListener("cancel", handleCancel);
  });

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickedOutside =
      e.clientX < rect.left ||
      e.clientX > rect.right ||
      e.clientY < rect.top ||
      e.clientY > rect.bottom;
    if (clickedOutside) closeDialog();
  };

  const triggerClassName =
    variant === "elite"
      ? "inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#10a37f] px-5 font-mono text-sm font-medium text-white transition-colors duration-200 hover:bg-[#0e8f6f]"
      : variant === "nav"
        ? "inline-flex h-9 items-center justify-center rounded-full bg-cw-ink px-4 text-sm font-medium text-cw-cream transition-colors duration-200 hover:bg-cw-ink/85"
        : variant === "pricing"
          ? "inline-flex h-12 items-center justify-center rounded-full bg-cw-electric px-8 text-[15px] font-semibold text-cw-ink shadow-[0_8px_24px_rgba(98,243,255,0.25)] transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110"
          : "inline-flex h-12 items-center justify-center rounded-full bg-cw-ink px-7 text-[15px] font-semibold text-cw-cream shadow-[0_1px_2px_rgba(21,17,43,0.18),0_8px_24px_rgba(21,17,43,0.12)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-cw-ink/90";

  return (
    <>
      <button
        type="button"
        onClick={openDialog}
        data-testid="booking-trigger"
        data-variant={variant}
        className={triggerClassName}
      >
        {label ?? landingContent.hero.ctaPrimary}
        {variant === "elite" ? (
          <svg
            viewBox="0 0 24 24"
            className="size-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M7 11l5-5 5 5M12 6v12" />
          </svg>
        ) : null}
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby="booking-title"
        aria-describedby="booking-desc"
        onClick={handleBackdropClick}
        className="m-auto max-w-lg overflow-visible rounded-sm border border-cw-gold/40 bg-cw-ivory p-0 text-cw-ink shadow-[0_40px_80px_-20px_rgba(21,17,43,0.6)] backdrop:bg-cw-ink/50 backdrop:backdrop-blur-sm open:backdrop:opacity-100"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 25,
          }}
          className="relative p-8 sm:p-10"
        >
          <button
            ref={closeButtonRef}
            type="button"
            onClick={closeDialog}
            className="absolute right-4 top-4 inline-flex size-10 items-center justify-center rounded-full border border-cw-gold/40 bg-transparent font-serif text-base text-cw-ink transition-colors duration-200 hover:bg-cw-ink hover:text-cw-ivory"
            aria-label={landingContent.booking.closeLabel}
          >
            ×
          </button>

          <p className="font-mono text-[11px] font-bold uppercase tracking-eyebrow text-cw-gold">
            Discovery
          </p>
          <h2
            id="booking-title"
            className="mt-2 font-serif text-3xl font-medium tracking-luxe text-cw-ink"
          >
            {landingContent.booking.title}
          </h2>
          <p
            id="booking-desc"
            className="mt-4 max-w-md font-serif text-base leading-relaxed text-cw-stone"
          >
            {landingContent.booking.description}
          </p>

          <iframe
            src={schedulingUrl}
            title={landingContent.booking.title}
            data-testid="booking-scheduler"
            className="mt-6 h-96 w-full rounded-sm border border-cw-ink/10 bg-white"
            loading="lazy"
          />
          <div className="mt-4 rounded-sm border border-cw-ink/10 bg-cw-ivory-2 p-5">
            <h3 className="font-serif text-xl font-medium tracking-luxe text-cw-ink">
              {landingContent.booking.placeholderHeadline}
            </h3>
            <p className="mt-2 font-serif text-sm leading-relaxed text-cw-stone">
              {landingContent.booking.placeholderBody}
            </p>
            <a
              href={`mailto:${landingContent.booking.fallbackEmail}?subject=Project%20inquiry`}
              className="mt-4 inline-flex h-12 items-center justify-center rounded-full border border-cw-gold bg-transparent px-6 font-serif text-sm tracking-luxe text-cw-ink transition-colors duration-200 hover:bg-cw-ink hover:text-cw-ivory"
            >
              {landingContent.booking.fallbackEmail}
            </a>
          </div>
        </motion.div>
      </dialog>
    </>
  );
}
