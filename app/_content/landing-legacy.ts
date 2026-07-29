/**
 * Compatibility content for components that no longer render on the current
 * landing page. Keep it separate from the public page contract so new copy
 * work has one focused source of truth.
 */
export const legacyLandingContent = {
  services: [
    {
      id: "conversation",
      label: "CHAT",
      description: "Your goals, customers, and current setup.",
    },
    {
      id: "website-build",
      label: "BUILD",
      description: "The words, layout, code, and live preview.",
    },
    {
      id: "website-care",
      label: "CARE",
      description: "Hosting, renewals, security, and updates.",
    },
  ],
  examples: {
    eyebrow: "Recent work",
    headline: "Recent sites fresh out of the studio",
    body: "Two live examples you can open and explore.",
    windows: [
      {
        id: "gym-landing",
        label: "Gym",
        urlBar: "gym-landing-example.wasmer.app",
        brandName: "Ironhaus Gym",
        category: "Performance studio",
        href: "https://gym-landing-example.wasmer.app/",
        screenshot: "/example-gym.png",
        description:
          "A high-energy page that makes programmes and sign-up paths easy to find.",
        quote: "Portfolio example",
        authorName: "Caffienated Web",
        authorRole: "Studio note",
      },
      {
        id: "cafe-landing",
        label: "Café",
        urlBar: "cafe-landing-example.wasmer.app",
        brandName: "Fika No. 9",
        category: "Neighbourhood café",
        href: "https://cafe-landing-example.wasmer.app/",
        screenshot: "/example-cafe.png",
        description:
          "A warm editorial site built around the menu and the in-store experience.",
        quote: "Portfolio example",
        authorName: "Caffienated Web",
        authorRole: "Studio note",
      },
    ],
  },
  valueProps: [
    {
      title: "01 / We chat",
      text: "You explain the business once. We turn it into a practical build plan.",
    },
    {
      title: "02 / We build",
      text: "We handle the copy, design, and code, then send a live preview.",
    },
    {
      title: "03 / We care",
      text: "We can keep the domain, hosting, security, and updates handled.",
    },
  ],
  faq: [
    {
      q: "How much is this actually going to cost me?",
      a: "Setup starts at a flat $199. After that, a low monthly fee covers your hosting, domain, security, and maintenance—plus a free site update every 6 months. We give you a clear, fixed quote on our call so you’re never surprised.",
    },
    {
      q: "Do I have to handle any tech stuff?",
      a: "Zero. We set up the domain, host the site, connect your forms, and make sure it loads lightning-fast on mobile devices.",
    },
    {
      q: "What if I need changes after we launch?",
      a: "You get a free edit session built into your plan every 6 months. Need something changed sooner? Shoot us a message and we’ll tweak it for a small fee.",
    },
  ],
  noJargon: {
    eyebrow: "Two ways in",
    headline: "Start fresh or fix what you have.",
    body: "Either way, you’ll get a clear plan before we touch the site.",
    tabs: [
      {
        id: "build-from-zero",
        label: "Build from zero",
        title: "Start with the idea. Leave with a live site.",
        body: "We handle the words, structure, design, code, domain, and launch.",
        bullets: ["Copy and structure", "Custom design", "Build and launch"],
      },
      {
        id: "redesign",
        label: "Redesign",
        title: "Keep the useful parts. Fix the rest.",
        body: "We simplify the message, rebuild the key sections, and make mobile feel intentional.",
        bullets: ["Message review", "Custom redesign", "Mobile-first relaunch"],
      },
    ],
  },
  howWeWork: {
    eyebrow: "How it works",
    headline: "One conversation. One clear build.",
    stats: [
      { value: "$199", label: "setup from" },
      { value: "15 min", label: "first chat" },
      { value: "6 months", label: "included edit" },
    ],
    highlights: [
      "Clear fixed quote",
      "Copy, design, and code",
      "Optional ongoing care",
    ],
  },
  elite: {
    closingHeadline: "Got a project in mind? Let’s brew it.",
    closingBody:
      "Drop us a line or pick a time. We’ll look at the idea and send a simple plan the same day.",
    assurance: "Setup starts at $199. You’ll get a fixed quote first.",
    ribbon: [
      { value: "$199", label: "setup from" },
      { value: "15 min", label: "first chat" },
      { value: "6 months", label: "included edit" },
    ],
  },
} as const;
