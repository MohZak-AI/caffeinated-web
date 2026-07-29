"use client";

import { useCallback, useMemo, useRef, useState } from "react";

/**
 * Tabs — lightweight, accessible client island.
 *
 * Full ARIA tab semantics + roving tabindex + arrow-key/Home/End navigation.
 * No external dependency; styled with caffienatedweb tokens (sharp rectangles,
 * radius 0, mono labels, cw-liquid active surface).
 */

export type TabItem = {
  id: string;
  label: string;
  title: string;
  body: string;
  bullets?: readonly string[];
};

export type TabsProps = {
  items: readonly TabItem[];
  defaultValue?: string;
  ariaLabel?: string;
  className?: string;
};

const TAB_CLASSES = [
  "relative inline-flex items-center justify-center",
  "px-4 py-2",
  "font-mono text-[11px] font-semibold uppercase tracking-[0.18em]",
  "transition-colors duration-200 motion-reduce:transition-none",
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cw-electric",
].join(" ");

const TAB_ACTIVE = "cw-liquid text-cw-ink";
const TAB_INACTIVE =
  "bg-transparent text-cw-ink/55 hover:text-cw-ink motion-reduce:hover:text-cw-ink/55";

export function Tabs({
  items,
  defaultValue,
  ariaLabel,
  className,
}: TabsProps) {
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const firstId = items[0]?.id;
  const initial = defaultValue ?? firstId ?? "";
  const [selected, setSelected] = useState<string>(initial);

  const selectedIndex = useMemo(
    () => Math.max(0, items.findIndex((item) => item.id === selected)),
    [items, selected],
  );

  const selectTab = useCallback((index: number) => {
    const clamped = ((index % items.length) + items.length) % items.length;
    const item = items[clamped];
    if (item) {
      setSelected(item.id);
    }
  }, [items]);

  const focusTab = useCallback(
    (index: number) => {
      const clamped = ((index % items.length) + items.length) % items.length;
      const node = tabRefs.current[clamped];
      if (node) {
        node.focus();
      }
      selectTab(clamped);
    },
    [items, selectTab],
  );

  const activeItem = items[selectedIndex];

  const onTabKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
      const count = items.length;
      if (count === 0) return;

      switch (event.key) {
        case "ArrowRight":
          event.preventDefault();
          focusTab(index + 1);
          break;
        case "ArrowLeft":
          event.preventDefault();
          focusTab(index - 1);
          break;
        case "Home":
          event.preventDefault();
          focusTab(0);
          break;
        case "End":
          event.preventDefault();
          focusTab(count - 1);
          break;
        case "Enter":
        case " ":
        case "Spacebar":
          event.preventDefault();
          focusTab(index);
          break;
        default:
          break;
      }
    },
    [focusTab, items.length],
  );

  return (
    <div data-testid="no-jargon-tabs" className={className}>
      <div
        role="tablist"
        aria-label={ariaLabel}
        aria-orientation="horizontal"
        className="inline-flex border border-cw-ink/10 bg-cw-cream/70 p-1"
      >
        {items.map((item, index) => {
          const isActive = item.id === selected;
          return (
            <button
              key={item.id}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              type="button"
              role="tab"
              id={`tab-${item.id}`}
              aria-controls={`panel-${item.id}`}
              aria-selected={isActive}
              tabIndex={isActive ? 0 : -1}
              onClick={() => selectTab(index)}
              onKeyDown={(event) => onTabKeyDown(event, index)}
              className={`${TAB_CLASSES} ${isActive ? TAB_ACTIVE : TAB_INACTIVE}`}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {activeItem ? (
        <div
          role="tabpanel"
          id={`panel-${activeItem.id}`}
          aria-labelledby={`tab-${activeItem.id}`}
          tabIndex={0}
          className="mt-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cw-electric"
        >
          <h3 className="text-xl font-semibold tracking-[-0.02em] text-cw-ink">
            {activeItem.title}
          </h3>
          <p className="mt-3 text-base leading-relaxed text-cw-ink/68">
            {activeItem.body}
          </p>

          {activeItem.bullets && activeItem.bullets.length > 0 ? (
            <ul className="mt-5 space-y-2">
              {activeItem.bullets.map((bullet) => (
                <li
                  key={bullet}
                  className="flex items-start gap-2 text-base leading-relaxed text-cw-ink/68"
                >
                  <span
                    aria-hidden="true"
                    className="mt-[0.45em] inline-block h-[7px] w-[7px] shrink-0 bg-cw-orange"
                  />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}