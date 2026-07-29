---
name: caffienatedweb
description: A one-to-one website pitch served in a dark espresso room.
colors:
  bg-primary: "#120D0A"
  bg-surface: "#1E1611"
  text-primary: "#F5EBE0"
  text-secondary: "#C4B5A5"
  accent: "#D49B54"
typography:
  display: "Satoshi, Avenir Next, Helvetica Neue, sans-serif"
  body: "Satoshi, Avenir Next, Helvetica Neue, sans-serif"
  utility: "Geist Mono, ui-monospace, monospace"
pixelGrid: "4px"
---

# Caffienated Web Design System

## 1. Creative direction

**North star: an honest website conversation over coffee.**

The page should feel like one capable builder has pulled up a chair: dark,
warm, direct, and easy to trust. Deep espresso is the room, steamed cream is
the voice, and amber crema marks the next action. Pixel art belongs to the
brand’s mug, beans, steam, and story bubbles only; the interface itself stays
clean and contemporary.

The decision path is: immediate problem and trust in the hero, a four-beat
scroll conversation, tangible work, direct pricing answers, then one simple
invitation to talk.

## 2. Design tokens

### Color

- `--bg-primary: #120D0A` — Deep Espresso, the default page ground.
- `--bg-surface: #1E1611` — Dark Mocha, used by Recent Work and FAQ.
- `--text-primary: #F5EBE0` — Steamed Cream, primary text.
- `--text-secondary: #C4B5A5` — Latte Gray, supporting text.
- `--accent: #D49B54` — Warm Amber Crema, primary actions and pixel accents.
- Focus ring: `#F2A65A`, visible against both espresso and mocha.

Every primary CTA is amber with Deep Espresso text. Light text is never used
on amber. Borders use low-alpha Steamed Cream rather than new hard-coded hues.

### Typography

- Display and body: Satoshi with a system geometric fallback stack.
- Utility labels: Geist Mono.
- Hero: `clamp(2.9rem, 5.2vw, 5.8rem)`, 0.94 line height, wide measure.
- Section title: `clamp(2.5rem, 5vw, 5rem)`, 0.96 line height.
- Story: `clamp(2.6rem, 6.6vw, 6.25rem)`, centered and text-balanced.
- Body: 1–1.25rem, 1.65–1.75 line height, no overlong line measure.

Typography is never pixelated. Sentence case and contractions keep the page
spoken rather than corporate.

### Spacing and geometry

- Mobile page gutter: 1rem; tablet: 1.5rem; desktop: 2–3rem.
- Major section padding: 6rem mobile, 9–11rem desktop.
- Desktop content width: 80rem; hero heading may extend to 86rem.
- Pixel accents use a single 4px base grid. Bubble sizes are 8px, 12px, 16px.
- Panels and controls are square or lightly cut; pills are reserved for the
  conversational badge only.

## 3. Component primitives

### Primary action

Amber surface, espresso label, minimum 48px touch height, 2px focus outline.
Hover may move up 2px on fine pointers; reduced motion removes translation.

### Navigation

A quiet espresso header with a pixel-rendered mug, small wordmark, Work and
FAQ anchors, and one amber booking action. Mobile retains the brand and CTA.

### Hero

Editorial split: the exact pitch occupies the left/wide column and the studio
image sits in a restrained mocha frame on the right. The badge, one CTA, and
one sentence of assurance are the only supporting elements. Price never leads.

### Pixel accent

All decorative pixels snap to the 4px grid. The mug uses
`image-rendering: pixelated`; bean dividers and story bubbles use 4px-aligned
dimensions and positions. Pixel styling never leaks into text or controls.

### Recent-work card

Two complete external-link cards form a dense 2 × 1 desktop grid and one
column on mobile. Each card contains a real screenshot, title, exact supplied
note, and clear live-site affordance. Hover affects only the interactive card
and image.

### FAQ disclosure

Three native `details` rows sit on Dark Mocha. Questions are large and direct;
the first answer opens by default so the exact `$199` and `$10/month` terms are
immediately available.

### Booking dialog

An opaque mocha dialog preserves a direct external calendar link and email
fallback even if the embedded scheduler is unavailable. Opening, Escape close,
and focus restoration remain keyboard-operable.

## 4. Story motion contract

The story owns the only continuous page animation.

- Desktop/no-reduced-motion: a 300vh section contains a sticky, 100dvh stage.
- One GSAP ScrollTrigger timeline is the single progress source for both text
  and color. `scrub: true` preserves 1:1 manual control.
- Frame colors are centered inside each quarter of the story. The stage
  interpolates through:
  - `#120D0A / #F5EBE0`
  - `#241509 / #E8C99B`
  - `#2E1A0F / #F2A65A`
  - `#1E1611 / #D49B54`
- Sentences crossfade and move only with opacity and transform. No masks,
  layout animation, turbulence, blur, or continuous decorative loop.
- At 25%, 50%, and 75%, the same eight DOM bubbles are reset and replayed.
  They are 8/12/16px, rise 20–40px, fade within 0.4–0.6s, and never allocate
  new nodes while scrolling.
- Mobile: no sticky stage, scrub, or bubbles. The four sentences stack and
  receive a short one-shot entry fade.
- Reduced motion: no pin, scrub, fade, or bubbles. All sentences are readable
  immediately in normal document flow.

## 5. Responsive behavior

- At 767px and below, hero, work, CTA, and footer collapse to one column.
- Story switches to its stacked fallback before mobile scroll-jacking can
  occur.
- Header secondary anchors hide before they crowd the booking action.
- Work previews retain their aspect ratio and load before capture.
- At 200% zoom there is no horizontal page overflow or clipped action.

## 6. Accessibility constraints

- WCAG AA contrast is mandatory. Amber CTA contrast is verified using espresso
  text, not cream.
- Logical DOM order matches the visual reading order.
- Story meaning never depends on color or bubbles.
- Work examples are real links; FAQ rows are native disclosures; booking
  triggers are real buttons.
- Focus indicators remain visible on both primary and surface backgrounds.
- Motion media queries are functional requirements, not decorative options.
- Touch targets are at least 44px.

## 7. Do / do not

### Do

- Keep the exact supplied public copy.
- Use `--bg-surface` for Recent Work and FAQ.
- Let generous type and whitespace carry the tone.
- Keep `caffienatedweb.com` and `contact@caffienatedweb.com` spelled exactly.

### Do not

- Do not use vague monthly-pricing language.
- Do not add process, testimonials, statistics, marquees, or extra sections.
- Do not pixelate typography, buttons, or layout.
- Do not animate outside the story except purposeful hover/focus feedback and
  the mobile one-shot story fade.
- Do not introduce hard-cut story colors or new bubble nodes during scroll.

## 8. Accepted debt

- Satoshi is served through Fontshare’s CSS API rather than bundled locally;
  the system stack preserves legibility if that request is unavailable.
- The supplied Ironhaus outcome language is owner-provided marketing copy and
  is presented exactly as requested; no additional metrics are invented.
