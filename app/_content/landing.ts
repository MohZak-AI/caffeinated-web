import { legacyLandingContent } from "./landing-legacy";

const faqItems = [
  {
    question: "Is this going to cost me a fortune?",
    answer:
      "Nope. Setup starts at a flat $199. After that, it's just $10/month — covers your hosting, domain, security, and updates, plus a free site edit every 6 months. No hidden agency surprises.",
  },
  {
    question: "Do I have to do any technical setup myself?",
    answer:
      "Zero. We handle the code, the domain, and the hosting. You tell us about your business, and we do the rest.",
  },
  {
    question: "How fast can we get this live?",
    answer:
      "Days, not months. Once we have a 15-minute chat, we'll send a clear plan and start building immediately.",
  },
] as const;

export const landingContent = {
  brand: {
    name: "caffienatedweb",
    tagline: "A clear website, built over one honest conversation.",
    announcement: "Websites for founders, shops, cafés, and local teams.",
  },
  hero: {
    badge: "Grab a cup. Let's talk.",
    headline:
      "Honestly? If you don't have a website, you're losing customers to someone who does.",
    subheadline:
      "Most customers check Google, ask ChatGPT, and scroll social media before they ever pick up the phone. If you aren't visible, you're invisible. A basic map pin isn't enough to build trust-your website is where that final decision happens. I built Caffeinated Web to make having a professional, high-performing site effortless.",
    ctaPrimary: "Book a 15-Min Chat",
    microcopy: "Just a quick coffee chat to see if we're a fit.",
  },
  booking: {
    title: "Let’s talk about your website",
    description:
      "Pick a time that works. Tell us what you need, and we'll give you a clear next step.",
    ctaLabel: "Book a 15-Min Chat",
    defaultSchedulingUrl:
      "https://calendly.com/zakizakariawwzz/?hide_gdpr_banner=1&background_color=f3e7c8&text_color=2c2014&primary_color=a6332a",
    fallbackEmail: "contact@caffienatedweb.com",
    placeholderHeadline: "Prefer email?",
    placeholderBody:
      "Send us a short note about the project. We'll reply with a simple next step.",
    schedulerFallbackTitle: "Calendar not showing?",
    schedulerFallbackLink: "Open the calendar →",
    closeLabel: "Close",
  },
  story: {
    lines: [
      "You've probably got about 3 seconds before a visitor leaves your site.",
      "If it's slow, confusing, or looks like it was built in 2012...",
      "They're gone before you even get a chance to sell.",
      "We fix that. Clear words, sharp design, zero technical stress.",
    ],
  },
  work: {
    title:
      "Don't just take my word for it. Here's what we've been brewing recently.",
    subheading: "(Click any preview to test out the live site)",
    linkLabel: "Open live site",
    projects: [
      {
        id: "ironhaus",
        name: "Ironhaus Gym",
        href: "https://gym-landing-example.wasmer.app/",
        screenshot: "/example-gym.png",
        note: "They had a clunky booking page that was losing them members every week. We built them a dark, high-energy site that makes signing up effortless.",
      },
      {
        id: "fika-no-9",
        name: "Fika No. 9",
        href: "https://cafe-landing-example.wasmer.app/",
        screenshot: "/example-cafe.png",
        note: "A cozy, clean site designed to showcase their menu, tell their story, and get people walking through the door.",
      },
    ],
  },
  faqSection: {
    title: "I know what you're probably thinking...",
    items: faqItems,
  },
  finalCta: {
    headline: "All it takes is 15 minutes.",
    body: "No long presentations or high-pressure tactics. Pick a time on our calendar, tell us what you need, and we'll send a plan and price the same day.",
    button: "Pick a 15-Min Coffee Slot",
    email: "contact@caffienatedweb.com",
    emailLabel: "Or email us at contact@caffienatedweb.com",
  },
  process: {
    label: "How this works",
    title: "Working together is pretty simple.",
    steps: [
      {
        id: "goals",
        number: "01",
        title: "We chat about your goals",
        body: "Grab 15 minutes on our calendar. You tell us what you do, who you sell to, and what you hate about your current setup. No hard sales push.",
      },
      {
        id: "build",
        number: "02",
        title: "We build the whole thing",
        body: "We write the copy, design the layout, and code the site in days, not months. You get a live preview link to review everything before we launch.",
      },
      {
        id: "care",
        number: "03",
        title: "We keep it running behind the scenes",
        body: "Once live, we handle your hosting, domain renewals, security, and updates. Need a text change in three months? Just shoot us a message.",
      },
    ],
  },
  pricing: {
    label: "FAQ",
    title: "I know what you're probably thinking...",
    support: "Clear terms before you commit.",
    startingPrice: "$199",
    startingCallout: "$199 setup",
    cta: "Book a 15-Min Chat",
    summary:
      "Setup starts at a flat $199, followed by an exact $10/month care plan.",
    carePlan:
      "$10/month covers hosting, domain, security, updates, and a free site edit every 6 months.",
    faq: faqItems,
    eyebrow: "Clear pricing",
    headline: "Setup starts at $199, then it's $10/month.",
    body: "We confirm the complete scope and price before you commit.",
    price: "$199",
    priceNote: "one-time setup · from",
    includes: ["Copy", "Design", "Code", "Launch"],
    monthly: {
      price: "$10",
      note: "per month",
      includes: ["Hosting", "Domain", "Security", "Updates"],
    },
    ctaLabel: "Book a 15-Min Chat",
  },
  ...legacyLandingContent,
} as const;

export type LandingContent = typeof landingContent;
