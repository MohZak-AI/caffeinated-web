/**
 * Independent acceptance contract for the user-approved landing-page copy.
 * Keep this separate from app/_content so a production regression cannot
 * make its own copy test pass.
 */
export const landingContract = {
  hero: {
    badge: "Grab a cup. Let's talk.",
    headline:
      "Honestly? If you don't have a website, you're losing customers to someone who does.",
    subheadline:
      "Most customers check Google, ask ChatGPT, and scroll social media before they ever pick up the phone. If you aren't visible, you're invisible. A basic map pin isn't enough to build trust-your website is where that final decision happens. I built Caffeinated Web to make having a professional, high-performing site effortless.",
    cta: "Book a 15-Min Chat",
    microcopy: "Just a quick coffee chat to see if we're a fit.",
  },
  story: [
    "You've probably got about 3 seconds before a visitor leaves your site.",
    "If it's slow, confusing, or looks like it was built in 2012...",
    "They're gone before you even get a chance to sell.",
    "We fix that. Clear words, sharp design, zero technical stress.",
  ],
  work: {
    title:
      "Don't just take my word for it. Here's what we've been brewing recently.",
    subheading: "(Click any preview to test out the live site)",
    projects: [
      {
        id: "ironhaus",
        name: "Ironhaus Gym",
        href: "https://gym-landing-example.wasmer.app/",
        note: "They had a clunky booking page that was losing them members every week. We built them a dark, high-energy site that makes signing up effortless.",
      },
      {
        id: "fika-no-9",
        name: "Fika No. 9",
        href: "https://cafe-landing-example.wasmer.app/",
        note: "A cozy, clean site designed to showcase their menu, tell their story, and get people walking through the door.",
      },
    ],
  },
  faq: {
    title: "I know what you're probably thinking...",
    faq: [
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
    ],
  },
  booking: {
    title: "Let’s talk about your website",
    closeLabel: "Close",
    schedulingUrl:
      "https://calendly.com/zakizakariawwzz/?hide_gdpr_banner=1&background_color=f3e7c8&text_color=2c2014&primary_color=a6332a",
    externalLinkLabel: "Open the calendar →",
  },
  finalCta: {
    headline: "All it takes is 15 minutes.",
    subheadline:
      "No long presentations or high-pressure tactics. Pick a time on our calendar, tell us what you need, and we'll send a plan and price the same day.",
    email: "contact@caffienatedweb.com",
    emailLabel: "Or email us at contact@caffienatedweb.com",
    button: "Pick a 15-Min Coffee Slot",
  },
} as const;
