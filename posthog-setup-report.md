<wizard-report>
# PostHog post-wizard report

The wizard has completed a full PostHog integration for the caffienatedweb agency landing page. PostHog is initialized client-side via `instrumentation-client.ts` (Next.js 15.3+ convention), pointing directly to the PostHog host since the project uses `output: "export"` (static site — reverse-proxy rewrites are unavailable). Ten events are tracked across six components, covering the complete visitor journey from navigation through booking-dialog conversion.

| Event | Description | File |
|---|---|---|
| `booking_dialog_opened` | User opens the booking/discovery dialog from any CTA button | `app/_components/hero/booking-discovery-dialog.tsx` |
| `booking_dialog_closed` | User explicitly closes the booking dialog | `app/_components/hero/booking-discovery-dialog.tsx` |
| `booking_email_fallback_clicked` | User clicks the fallback email link inside the booking dialog | `app/_components/hero/booking-discovery-dialog.tsx` |
| `work_sample_clicked` | User clicks a portfolio work sample to visit the live site | `app/_components/offer/work-preview.tsx` |
| `faq_item_expanded` | User expands an FAQ accordion item to read the answer | `app/_components/faq/faq.tsx` |
| `email_contact_clicked` | User clicks the studio email contact link in the finale section | `app/_components/elite/elite-finale.tsx` |
| `footer_email_clicked` | User clicks the email address link in the site footer | `app/_components/elite/agency-footer.tsx` |
| `hero_pricing_clicked` | User clicks the secondary "See pricing" CTA in the hero | `app/_components/hero/agency-hero.tsx` |
| `nav_pricing_clicked` | User clicks the Pricing link in the top navigation header | `app/_components/nav/site-header.tsx` |
| `nav_contact_clicked` | User clicks the Contact button in the top navigation header | `app/_components/nav/site-header.tsx` |

## Next steps

We've built a dashboard and five insights to monitor visitor behavior and landing page performance:

- [Analytics basics (wizard) — Dashboard](https://us.posthog.com/project/486122/dashboard/1761354)
- [Booking Dialog Opens (30 days)](https://us.posthog.com/project/486122/insights/VneEFjYk)
- [CTA Performance Over Time](https://us.posthog.com/project/486122/insights/7J1aK7Ls)
- [Booking Dialog Opens by CTA Variant](https://us.posthog.com/project/486122/insights/3OeseuzU)
- [Portfolio Work Sample Clicks](https://us.posthog.com/project/486122/insights/uKhryFx3)
- [FAQ Engagement](https://us.posthog.com/project/486122/insights/z787ySBu)

## Verify before merging

- [ ] Run a full production build (`npm run build`) and fix any lint or type errors introduced by the generated code.
- [ ] Run the test suite — call sites that were rewritten or instrumented may need updated mocks or fixtures.
- [ ] Add `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` and `NEXT_PUBLIC_POSTHOG_HOST` to `.env.example` and any bootstrap scripts so collaborators know what to set.
- [ ] Wire source-map upload (`posthog-cli sourcemap` or your bundler's upload step) into CI so production stack traces de-minify.

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
