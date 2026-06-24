"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { landingContent } from "@/app/_content/landing";

interface BookingDiscoveryDialogProps {
  variant?: "playful" | "nav" | "pricing" | "elite" | "medieval";
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
    variant === "medieval"
      ? "inline-flex h-12 items-center justify-center rounded-sm border-2 border-[#9a7b34] bg-[#2c2014] px-8 font-medieval text-[13px] font-semibold uppercase tracking-[0.16em] text-[#f0e6cf] shadow-[0_8px_22px_-10px_rgba(44,32,20,0.8)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#3a2c1c]"
      : variant === "elite"
      ? "inline-flex h-11 items-center justify-center gap-2 rounded-full bg-cw-orange px-5 text-sm font-semibold text-cw-ink shadow-[0_10px_28px_rgba(255,138,42,0.2)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-cw-sun"
      : variant === "nav"
        ? "inline-flex h-9 items-center justify-center rounded-full bg-cw-ink px-4 text-sm font-medium text-cw-cream transition-colors duration-200 hover:bg-cw-ink/85"
        : variant === "pricing"
          ? "inline-flex h-12 items-center justify-center rounded-full bg-cw-orange px-8 text-[15px] font-semibold text-cw-ink shadow-[0_8px_24px_rgba(255,138,42,0.25)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-cw-sun"
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
        className="m-auto w-[92vw] max-w-lg overflow-visible border-0 bg-transparent p-0 text-[#2c2014] backdrop:bg-[#0d0f12]/60 backdrop:backdrop-blur-sm open:backdrop:opacity-100"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 25,
          }}
          className="relative drop-shadow-[0_40px_80px_rgba(0,0,0,0.6)]"
        >
          {/* Top dowel */}
          <div
            className="scroll-roller relative z-10 mx-2 mb-[-7px]"
            aria-hidden="true"
          />

          {/* Parchment sheet */}
          <div className="parchment scroll-sheet relative overflow-hidden rounded-[3px] border-2 border-[#a6332a]/55 p-6 sm:p-8">
            <button
              ref={closeButtonRef}
              type="button"
              onClick={closeDialog}
              className="absolute right-3 top-3 z-10 inline-flex size-9 items-center justify-center rounded-full border border-[#9a7b34]/60 bg-[rgba(247,240,219,0.7)] font-medieval text-base text-[#6d2020] transition-colors duration-200 hover:bg-[#a6332a] hover:text-[#f3e7c8]"
              aria-label={landingContent.booking.closeLabel}
            >
              ×
            </button>

            <p className="font-medieval text-[11px] font-semibold uppercase tracking-[0.3em] text-[#9a7b34]">
              Discovery
            </p>
            <h2
              id="booking-title"
              className="mt-2 font-medieval text-3xl font-bold text-[#a6332a]"
            >
              {landingContent.booking.title}
            </h2>
            <p
              id="booking-desc"
              className="mt-3 max-w-md font-manuscript text-lg leading-relaxed text-[#3a2c1c]"
            >
              {landingContent.booking.description}
            </p>

            <iframe
              src={schedulingUrl}
              title={landingContent.booking.title}
              data-testid="booking-scheduler"
              className="mt-5 h-96 w-full rounded-[3px] border border-[#9a7b34]/60 bg-[#f3e7c8]"
              loading="lazy"
            />
            <div className="mt-4 rounded-[3px] border border-[#9a7b34]/50 bg-[rgba(247,240,219,0.6)] p-5">
              <h3 className="font-medieval text-lg font-bold text-[#2c2014]">
                {landingContent.booking.placeholderHeadline}
              </h3>
              <p className="mt-2 font-manuscript text-base leading-relaxed text-[#3a2c1c]">
                {landingContent.booking.placeholderBody}
              </p>
              <a
                href={`mailto:${landingContent.booking.fallbackEmail}?subject=Project%20inquiry`}
                className="mt-4 inline-flex h-11 items-center justify-center rounded-sm border-2 border-[#9a7b34] bg-transparent px-6 font-medieval text-xs font-semibold uppercase tracking-[0.14em] text-[#2c2014] transition-colors duration-200 hover:bg-[#2c2014] hover:text-[#f3e7c8]"
              >
                {landingContent.booking.fallbackEmail}
              </a>
            </div>
          </div>

          {/* Bottom dowel */}
          <div
            className="scroll-roller relative z-10 mx-2 mt-[-7px]"
            aria-hidden="true"
          />
        </motion.div>
      </dialog>
    </>
  );
}
