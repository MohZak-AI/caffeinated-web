# caffeinatedweb — Design System

> Forward-thinking website studio. Fast, flexible, affordable — playful craft, serious speed.

## Brand Positioning

- **Name:** caffeinatedweb
- **Domain:** Website development studio
- **Personality:** Energetic, whimsical, technically excellent, human
- **Promise:** Fast, flexible websites — live in days, starting at $99 with domain + hosting included
- **Mood:** Celebratory collaboration between creative ideas and technical execution
- **Honesty rule:** Only claim what's real. No invented studio locations, client
  case studies, or vanity stats — the page leads with the offer (fast / flexible
  / $99), not fabricated global metrics.

## Visual Style

**Family:** Playful kids + Bouncy 3D hybrid.

- **Why Playful kids?** The brief asks for cartoon characters, bright saturated colors, decorative flourishes, and a fun/fancy atmosphere. Those are the core Playful kids signals.
- **Why Bouncy 3D refinement?** caffeinatedweb is an agency, not a toy store. We keep the rounded, bouncy, gradient-rich language but add polished spacing, soft layered shadows, and a clean modern tech backdrop so it feels professional.

## Color Tokens

| Token | Hex | Usage |
|-------|-----|-------|
| `--cw-cream` | `#fff8e7` | Page background, warm canvas |
| `--cw-ink` | `#15112b` | Primary text, strong outlines |
| `--cw-teal` | `#16d8c2` | Primary accent, energy streams, highlights |
| `--cw-purple` | `#7c3cff` | Secondary accent, holographic screens |
| `--cw-violet` | `#b86cff` | Glows, gradients, flourishes |
| `--cw-orange` | `#ff8a2a` | CTA emphasis, rocket flames, warmth |
| `--cw-sun` | `#ffd84d` | Stars, badges, optimistic pops |
| `--cw-blue` | `#29a7ff` | Code screens, UI mockups, React motif |
| `--cw-electric` | `#62f3ff` | Data stream cores, electric edges |
| `--cw-pink` | `#ff5ebc` | Decorative flourishes, playful highlights |
| `--cw-card` | `#ffffffcc` | Glassy cards (80% opacity white) |
| `--cw-line` | `#24194a` | Cartoon outlines, dividers |

## Typography — a sans→mono journey

The page deliberately shifts type as you scroll: a clean professional sans at
the top that gradually gives way to monospace by the code-console finale.

- **Display + Body:** `Geist` via `next/font/google` (`--font-geist`, mapped to
  both `--font-sans` and `--font-display`). Modern, professional, neutral —
  the Fredoka/Nunito "cartoon" pairing was retired.
- **Mono / code:** `Geist_Mono` (`--font-mono`) — used for the deep-tech code
  panels and, fully, for the Phase 3 ChatGPT-style console + footer.
- **Serif:** `Playfair_Display` (`--font-serif`) — retained for the booking
  dialog interior only.

### Scale

| Element | Size | Weight | Notes |
|---------|------|--------|-------|
| H1 hero | `clamp(2.5rem, 6vw, 4.5rem)` | 600 | Geist, tracking -0.03em, solid ink |
| H2 | `clamp(2rem, 4vw, 3rem)` | 600 | Geist |
| Body | `1.125rem` / 1.6 | 400 | Geist |
| Label | `0.75rem` | 500 | uppercase, letter-spacing 0.14em |
| Code / finale | `0.8–0.9rem` | 400–600 | Geist Mono |

## Spacing & Layout

- **Scale:** 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 px
- **Max content width:** `1280px`
- **Section padding:** `96px` vertical desktop, `48px` mobile
- **Gutters:** `24px` desktop, `16px` mobile
- **Grid:** Mobile single column; desktop two-column hero (text left, illustration right)

## Shape & Depth

- **Radii:** `24px` cards, `40px` hero panels, `999px` pills/buttons
- **Outlines:** `3px solid var(--cw-line)` for playful cartoon definition
- **Shadows:**
  - Hard offset shadow: `6px 6px 0 var(--cw-line)`
  - Soft glow: `0 0 40px rgba(124, 60, 255, 0.25)`
  - Card shadow: `0 12px 32px rgba(21, 17, 43, 0.12)`
- **Phase 1 (playful):** no generic glassmorphism — use opaque cream or semi-transparent white cards with defined cartoon edges.
- **Phase 2 (deep-tech):** glassmorphism is the house style here — see the `.cw-glass` layered material below.

## Animation Language

- **GPU-only properties:** `transform`, `opacity`, `filter`
- **Never animate:** `width`, `height`, `top`, `left`, `margin`, `padding`
- **Easing:**
  - Bouncy overshoot: `cubic-bezier(0.34, 1.56, 0.64, 1)`
  - Smooth float: `ease-in-out`
- **Durations:**
  - Micro interactions: `200ms`
  - Floating loops: `3s - 6s`
  - Page entrance: `600ms`
- **Motifs:**
  - Floating holographic screens bob gently
  - Data streams pulse and flow along SVG paths
  - Gears rotate continuously
  - Rocket bobs and occasionally emits tiny sparks
  - Service icons scale on hover with overshoot
- **Reduced motion:** All continuous loops pause when `prefers-reduced-motion: reduce` is active. Static, polished state remains.

## Accessibility

- Hero SVG must have `<title>` and `<desc>` linked via `aria-labelledby`.
- Decorative particles and flourishes use `aria-hidden="true"`.
- Body text must maintain at least `4.5:1` contrast against its background.
- Focus-visible ring uses `--cw-electric` at `3px` offset.
- No emoji icons — use SVG or Phosphor icons only.
- Respect `prefers-reduced-motion` in both CSS and Motion `useReducedMotion`.

## Fancy-Tech Micro-Interactions

- **Booking CTA:** Primary "Start a project" button opens a discovery-call dialog immediately. Dialog uses bouncy entrance (scale 0.95 → 1, opacity 0 → 1) with overshoot easing.
- **Buttons:** Bouncy hover — `scale(1.05)` with `cubic-bezier(0.34, 1.56, 0.64, 1)`, active press `scale(0.98)`. Hard shadow grows on hover.
- **Cards:** Lift on hover `translateY(-6px)` with shadow expansion. Reveal panels use `opacity` + `translateY` only.
- **Code typing:** Code panels type character-by-character with a blinking caret. Under reduced motion, full code is shown instantly with caret hidden.
- **Data streams:** SVG paths animate `strokeDashoffset` in a continuous loop. Reduced motion shows static glowing paths.
- **Scroll-reactive characters:** Character groups subtly rotate/translate based on scroll progress via `useScroll`/`useTransform`. No scroll-jacking; effect is decorative.
- **Page transitions:** `app/template.tsx` wraps route content with a reduced-motion-aware fade/slide entrance. Single-page site uses this as page-load polish.

## Booking System

- Trigger: "Start a project" button opens a modal `<dialog>`.
- Configurable Calendly URL via `NEXT_PUBLIC_CALENDLY_URL`.
- Without URL: render branded placeholder with email fallback.
- Lazy-load iframe only after dialog opens.
- Close via close button, Escape, or backdrop click.
- Focus moves to dialog heading on open; restore focus on close.

## Cinematic Scroll System

The page moves through three phases on a single global scroll progress value
(`useScroll` in `scroll-phase-orchestrator.tsx`). No scroll-jacking.

- **Background morph:** RGB channels interpolate across plateaus
  (`STOPS = [0, 0.2, 0.34, 0.64, 0.8, 1]`) so each phase holds a solid color
  while the user reads it; morphs are confined to the hand-off zones.
- **Deep-tech atmosphere:** a `.scroll-phase-glow` layer (radial brand glows +
  vignette + fine SVG grain) fades in only across the charcoal plateau via a
  Motion-driven `opacity`.
- **Hydration:** motion-driven fixed layers render only after mount
  (`mounted` gate) so SSR markup matches the client.
- **Reveals:** `SectionReveal` (one-shot fade + lift on first in-view) and
  `Stagger`/`StaggerItem` (cascading children) in `section-reveal.tsx`. Both
  short-circuit to the final static state under reduced motion.
- **Parallax:** `parallax.tsx` maps a block's own in-view progress to `y` only
  (never `x`, to avoid horizontal overflow). Static under reduced motion.
- **Sticky scene:** glass cards reveal in a stagger over the charcoal plateau;
  the offer card sits beside the value props.

## Glass material (`.cw-glass`)

Layered glass for phase 2: a soft white gradient over the glass tint, a
gradient hairline edge + specular sheen via `::before`, an inner top highlight,
and `backdrop-filter: blur(16px) saturate(150%)`. Ambient `.cw-tech-blobs`
(blurred, slow-drifting gradient orbs) sit behind the offer grid, clipped to
their own box so blur never causes overflow.

## Phase 2 — "Did you know?" + the $99 offer

`offer/did-you-know.tsx` (`section#pricing`) replaces the old case-study gallery.
It's an honest pitch on the charcoal scroll state, no invented clients or stats:

- **Did you know?** — eyebrow + headline + body on the cost of having no website,
  then three `.cw-glass` "fact" cards (big electric stat + supporting line).
- **Value props** — Fast delivery / Very flexible / All-inclusive, as a checked
  list, revealed with `Stagger`.
- **Offer card** (`pricing-card`): the `$99` starting price, the
  domain-+-hosting note, an inclusive line-item list, and the booking CTA
  (`pricing` variant — a high-contrast white pill that reads on the dark glass).
- Content lives in `landing.ts` under `didYouKnow`, `valueProps`, `pricing`.

## Site header (professional menu)

`site-header.tsx` is a sticky, translucent, blurred top bar (modern-SaaS
treatment): brand mark on the left, a `Pricing` text link (`#pricing`), and a
`Contact` CTA pill (`#contact`) on the right. The hero's secondary CTA also
points at `#pricing`; E2E selects anchors with `.first()`, and the section ids
themselves (`#pricing`, `#contact`) stay unique.

## Hero (professional)

The "playful origin" is now restrained and professional: a quiet eyebrow
("Fast, flexible web studio" — no location claim), a clean Geist headline (solid
ink, tight tracking — no rainbow strokes/hard shadows), value-prop highlight
pills (`hero-highlights`: fast / flexible / from $99), a near-black primary CTA
+ ghost "See pricing" secondary, and a soft-shadowed illustration frame. The
colorful illustration + code panels are kept as the brand asset. Service cards
are hairline-bordered, tinted-icon tiles.

## Phase 3 — ChatGPT-style code console

Phase 3 is the closing CTA, reimagined as a dark "cody" chat console (the prior
luxury, retro-arcade, and Apple treatments were all retired). It is the tail of
the sans→mono type journey.

- **Surface:** self-contained dark background (`#0d0f12` / panel `#15181c`) so
  it holds up regardless of scroll position or reduced motion. Fully `Geist
  Mono`.
- **Console:** window chrome (traffic-light dots + session label), a user turn
  + an assistant turn with the closing copy, a syntax-highlighted `<pre>` code
  block, and the `$99 · days · domain + hosting` ribbon as terminal-style output.
- **Composer:** a faux "Message caffeinatedweb…" input bar whose green
  ChatGPT-style send control is the booking trigger (`elite` variant). The
  caption reads the honest `elite.assurance` line.
- **Footer:** continues the console — dark, monospace, a `$` prompt wordmark,
  `Pricing` / `Book a call` links, teal email, and a `//`-commented copyright.
- **Motion:** only the reduced-motion-safe `SectionReveal` fade-up.

## Performance

- Keep `page.tsx` and `layout.tsx` as Server Components.
- Only interactive islands (booking, code panels, scroll/transition wrappers) are `"use client"`.
- No external raster images; all visuals are SVG/CSS.
- No 3D libraries or scroll-jacking.
- Bundle only the Motion code needed for animations.
- Build output should remain small and fast.