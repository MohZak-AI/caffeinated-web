"use client";

import { useEffect, useRef } from "react";

export function SiteCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const labelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ring || !label) return;

    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!finePointer) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let pointerX = window.innerWidth / 2;
    let pointerY = window.innerHeight / 2;
    let ringX = pointerX;
    let ringY = pointerY;
    let frame = 0;

    const moveCursor = (x: number, y: number) => {
      dot.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      label.style.transform = `translate3d(${x}px, ${y}px, 0) translate(18px, 14px)`;
    };

    const onMove = (event: MouseEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      moveCursor(pointerX, pointerY);

      const target = event.target;
      const hovered = target instanceof Element
        ? target.closest("a, button, input, textarea, select, [data-cursor='hover']")
        : null;

      ring.classList.toggle("is-hover", hovered !== null);
      label.classList.toggle("is-hover", hovered !== null);
      label.textContent = hovered?.getAttribute("data-cursor-label") ?? "open";

      if (reducedMotion) {
        ring.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0) translate(-50%, -50%)`;
      }
    };

    const loop = () => {
      ringX += (pointerX - ringX) * 0.18;
      ringY += (pointerY - ringY) * 0.18;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      frame = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    if (!reducedMotion) frame = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        data-testid="site-cursor-ring"
        className="cw-site-cursor cw-site-cursor__ring"
        aria-hidden="true"
      />
      <div
        ref={dotRef}
        data-testid="site-cursor-dot"
        className="cw-site-cursor cw-site-cursor__dot"
        aria-hidden="true"
      />
      <div
        ref={labelRef}
        data-testid="site-cursor-label"
        className="cw-site-cursor cw-site-cursor__label"
        aria-hidden="true"
      >
        brew
      </div>
    </>
  );
}
