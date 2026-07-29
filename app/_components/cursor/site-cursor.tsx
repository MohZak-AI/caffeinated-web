"use client";

import { useEffect, useRef } from "react";

export function SiteCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const labelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const label = labelRef.current;
    if (!dot || !label) return;

    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!finePointer) return;

    let pointerX = window.innerWidth / 2;
    let pointerY = window.innerHeight / 2;
    let animationFrame = 0;

    const updateCursor = () => {
      animationFrame = 0;
      dot.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0) translate(-50%, -50%)`;
      label.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0) translate(18px, 14px)`;

      const target = document.elementFromPoint(pointerX, pointerY);
      const hovered = target?.closest(
        "a, button, input, textarea, select, [data-cursor='hover']",
      );

      label.classList.toggle("is-hover", hovered !== null);
      label.textContent = hovered?.getAttribute("data-cursor-label") ?? "open";
    };

    const scheduleCursorUpdate = () => {
      if (!animationFrame) {
        animationFrame = window.requestAnimationFrame(updateCursor);
      }
    };

    const onMove = (event: MouseEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      scheduleCursorUpdate();
    };

    window.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <>
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
