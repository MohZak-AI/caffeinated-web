export const landingContent = {
  brand: {
    name: "caffeinatedweb",
    tagline: "Fast, flexible websites — launched from $99",
  },
  hero: {
    headline: "CREATING FANCY & FAST WEBSITES",
    subheadline:
      "Fast to launch, easy to change, and friendly on the budget — your website live in days, starting at just $99 with domain and hosting included.",
    ctaPrimary: "Start a project",
    ctaSecondary: "See pricing",
    highlights: ["Fast delivery", "Very flexible", "From $99 — domain + hosting included"],
  },
  booking: {
    title: "Book a Discovery Call",
    description:
      "Pick a 30-minute slot. We'll learn what you need, then send a simple plan and price — usually the same day.",
    ctaLabel: "Book a call",
    // Calendly scheduler embedded in the booking dialog. Override per-env with
    // NEXT_PUBLIC_CALENDLY_URL.
    defaultSchedulingUrl:
      "https://calendly.com/zakizakariawwzz/30min?text_color=0069ff&primary_color=1a1a1a",
    fallbackEmail: "hello@caffeinatedweb.com",
    placeholderHeadline: "Prefer email?",
    placeholderBody:
      "Use the live calendar above, or send us a note and we'll book a time within one business day.",
    closeLabel: "Close",
  },
  services: [
    {
      id: "startup-acceleration",
      label: "STARTUP ACCELERATION",
      description: "Launch fast, iterate faster.",
    },
    {
      id: "custom-coding",
      label: "CUSTOM CODING",
      description: "React, Node.js, and everything in between.",
    },
    {
      id: "scalable-solutions",
      label: "SCALABLE SOLUTIONS",
      description: "Grow without breaking a sweat.",
    },
  ],
  heroCodeSnippets: {
    reactComponent: `import { motion } from "motion/react";

export function ConversionHero({ headline, cta }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h1>{headline}</h1>
      <button>{cta}</button>
    </motion.section>
  );
}`,
    nodeServer: `import express from "express";
import { z } from "zod";

const Lead = z.object({
  name: z.string().min(2),
  email: z.string().email(),
});

const app = express();
app.use(express.json());

app.post("/api/discovery", (req, res) => {
  const lead = Lead.parse(req.body);
  return res.json({ booked: true, lead });
});

app.listen(3000);`,
  },
  // Phase 2 — "Did you know?" + the $99 offer.
  didYouKnow: {
    eyebrow: "Did you know?",
    headline: "No website means missed customers — every single day.",
    body: "Most people look you up online before they ever reach out. Without a site, you're invisible at the exact moment someone is ready to buy.",
    facts: [
      {
        stat: "75%",
        text: "of people judge a business's credibility by its website.",
      },
      {
        stat: "8 in 10",
        text: "customers research online before they buy — no site, no shortlist.",
      },
      {
        stat: "Seconds",
        text: "is all it takes for a visitor to leave when there's nothing to find.",
      },
    ],
  },
  valueProps: [
    {
      title: "Fast delivery",
      text: "Your site goes live in days — we move quickly and keep you in the loop the whole way.",
    },
    {
      title: "Very flexible",
      text: "Need a change? Just ask. We adapt to your business, not the other way around.",
    },
    {
      title: "All-inclusive",
      text: "Domain, hosting, and the build are bundled into one simple starting price.",
    },
  ],
  pricing: {
    eyebrow: "Simple pricing",
    headline: "Get online from just $99.",
    body: "One honest starting price — domain and hosting included. Fast to launch, and easy to change whenever your business does.",
    price: "$99",
    priceNote: "starting price · domain + hosting included",
    includes: [
      "Custom, mobile-friendly website",
      "Domain name + hosting included",
      "Live in days, not months",
      "Flexible — change anything, anytime",
    ],
    ctaLabel: "Book a call",
  },
  // Phase 3 — booking finale (ChatGPT-style console).
  elite: {
    closingHeadline: "Let's build something that lasts.",
    closingBody:
      "Tell us what you need and we'll send a simple plan and price — usually the same day. No jargon, no obligation.",
    assurance: "From $99 — domain + hosting included.",
    ribbon: [
      { value: "$99", label: "to launch" },
      { value: "Days", label: "to go live" },
      { value: "Domain + hosting", label: "included" },
    ],
  },
  illustration: {
    title: "caffeinatedweb team crafting websites",
    description:
      "A whimsical cartoon office where diverse developers and designers collaborate among floating holographic screens, glowing React and Node.js code, UI mockups, energy data streams, gears, and a rocket ship.",
  },
  codeMotifs: {
    react: "<Hero />",
    node: "app.listen()",
  },
} as const;

export type LandingContent = typeof landingContent;
