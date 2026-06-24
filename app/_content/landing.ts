export const landingContent = {
  brand: {
    name: "caffeinatedweb",
    tagline: "Websites built or redesigned from $199, plus a low monthly care plan",
  },
  hero: {
    headline: "AGENCY GRADE WEBSITES, BUILT OR REDESIGNED FROM $199.",
    subheadline:
      "An affordable website studio for founders, cafes, shops, and local teams. We build from zero or redesign what you already have, then keep it running with hosting, domain, and maintenance for a low monthly fee.",
    ctaPrimary: "Start your build",
    ctaSecondary: "See the pricing",
    assurance: "Free 30 minute call \u00b7 same day plan \u00b7 no obligation",
    highlights: [
      "One time setup from $199",
      "Hosting, domain and maintenance",
      "Free edit every 6 months",
    ],
  },
  booking: {
    title: "Book a Discovery Call",
    description:
      "Pick a 30 minute slot. We learn what you need, then send a simple plan and price, usually the same day.",
    ctaLabel: "Book a call",
    defaultSchedulingUrl:
      "https://calendly.com/zakizakariawwzz/30min?hide_gdpr_banner=1&background_color=f3e7c8&text_color=2c2014&primary_color=a6332a",
    fallbackEmail: "hello@caffeinatedweb.com",
    placeholderHeadline: "Prefer email?",
    placeholderBody:
      "Use the live calendar above, or send us a note and we book a time within one business day.",
    closeLabel: "Close",
  },
  services: [
    {
      id: "startup-acceleration",
      label: "STRATEGY",
      description: "Your offer, message, structure, and launch path.",
    },
    {
      id: "custom-coding",
      label: "DESIGN",
      description: "Warm, premium pages with real agency clarity.",
    },
    {
      id: "scalable-solutions",
      label: "BUILD",
      description: "Responsive code, hosting, domain, and handoff.",
    },
  ],
  examples: {
    eyebrow: "Studio model",
    headline: "The agency process, compressed for businesses that need momentum.",
    body: "The biggest shops lead with clarity: what they make, how they think, and the work. We keep that discipline, then brew it into a smaller, faster package.",
    windows: [
      {
        id: "coffee-shop",
        type: "ecommerce",
        label: "Shopify style store",
        urlBar: "roastandroute.store",
        brandName: "Roast & Route",
        nav: ["Shop", "Subscriptions", "About", "Cart"],
        heroHeadline: "Coffee worth checking out for.",
        heroSubheadline: "A dark, product led storefront for subscriptions, bundles, and repeat orders.",
        heroCta: "Shop now",
        heroProduct: {
          name: "Starter trio",
          tagline: "Three small batch roasts in one clean checkout flow.",
          price: "$44",
          origin: "Ethiopia & Colombia",
          roast: "Medium",
          notes: ["Caramel", "Citrus", "Clean finish"],
          cta: "Add to cart",
        },
        products: [
          {
            id: "dark-roast",
            name: "Midnight Roast",
            price: "$20",
            badge: "Best seller",
            origin: "Sumatra",
            roast: "Dark",
            notes: ["Chocolate", "Smoky", "Bold"],
          },
          {
            id: "light-roast",
            name: "Morning Light",
            price: "$19",
            badge: null,
            origin: "Kenya",
            roast: "Light",
            notes: ["Floral", "Berry", "Crisp"],
          },
          {
            id: "decaf",
            name: "Slow Down Decaf",
            price: "$19",
            badge: "Smooth",
            origin: "Mexico",
            roast: "Medium",
            notes: ["Nutty", "Mellow", "No jitters"],
          },
        ],
        trust: [
          { label: "Small batch", text: "Roasted in limited runs" },
          { label: "Ships free", text: "On orders over $35" },
          { label: "Fresh", text: "Roasted to order" },
        ],
      },
      {
        id: "service-landing",
        type: "landing",
        label: "Gym v3 landing",
        urlBar: "ironmethod.fit",
        brandName: "Iron Method",
        nav: ["Programs", "Coaches", "Pricing", "Join"],
        heroHeadline: "Strength, engineered.",
        heroSubheadline: "A performance studio landing page with bold type, program blocks, and a sharp join path.",
        heroCta: "Start your trial",
        highlights: [
          { title: "Hypertrophy", text: "Structured blocks and logged progression." },
          { title: "Strength", text: "Coach led lifting cycles with clear targets." },
          { title: "Conditioning", text: "Engine sessions built for output." },
        ],
        stats: [
          { value: "12K+", label: "Members trained" },
          { value: "47", label: "Expert coaches" },
          { value: "24/7", label: "Floor access" },
        ],
      },
    ],
  },
  valueProps: [
    {
      title: "01 / Shape the offer",
      text: "We turn what you sell into a clear page structure, headline system, and conversion path.",
    },
    {
      title: "02 / Design the proof",
      text: "We shape your site like a real agency case: strong sections, visual hierarchy, and polished details.",
    },
    {
      title: "03 / Ship the site",
      text: "We build, connect the domain, host it, and keep edits simple after launch.",
    },
  ],
  pricing: {
    eyebrow: "Affordable websites",
    headline: "A real website from $199, then a low monthly care plan.",
    body: "We build or redesign your site for a one time fee starting at $199. Then a low monthly fee covers your domain, hosting, and maintenance, with a free update every 6 months.",
    price: "$199",
    priceNote: "one time setup \u00b7 from",
    includes: [
      "Build from zero or redesign your current site",
      "Custom, mobile friendly website",
      "Live in days, not months",
      "You own the site and the content",
    ],
    monthly: {
      price: "Low fee",
      note: "monthly \u00b7 hosting \u00b7 domain \u00b7 maintenance",
      includes: [
        "Domain renewal and hosting",
        "Security and maintenance",
        "Free edit every 6 months",
        "Small fee for edits outside the cycle",
      ],
    },
    ctaLabel: "Book a call",
  },
  faq: [
    {
      q: "Do you build affordable websites for small businesses?",
      a: "Yes. We design and build custom websites for small businesses from $199 one time, with hosting, domain, and maintenance on a low monthly fee. No agency sized budget required.",
    },
    {
      q: "How fast can my site go live?",
      a: "Most builds go live in days, not months. After a 30 minute call we send a simple plan and price, usually the same day.",
    },
    {
      q: "What do I get for $199?",
      a: "$199 is the starting price for a one time setup. We build from zero or redesign your current site into a custom, mobile friendly website. We scope the real cost on the call so there are no surprises.",
    },
    {
      q: "What does the monthly care plan cover?",
      a: "Your domain, hosting, security, and ongoing maintenance, plus one free edit every 6 months. It keeps the site fast, safe, and up to date.",
    },
    {
      q: "Can I change things after launch?",
      a: "Yes. Subscribed members get a free update every 6 months to edit the site at no charge. Want changes outside that window? You pay a small fee.",
    },
    {
      q: "Do I own the site?",
      a: "Yes. Your domain, your hosting, your content. We build it and hand it over.",
    },
    {
      q: "Who is this for?",
      a: "Founders, cafes, shops, and local teams that want sharp design and clean code without agency sized timelines or budgets.",
    },
    {
      q: "What if I'm not ready to buy?",
      a: "The discovery call is free and there is no obligation. We just send a plan and price you can think over.",
    },
  ],
  elite: {
    closingHeadline: "Bring us the idea. We brew the website.",
    closingBody:
      "Tell us what you need and we send a simple plan and price, usually the same day. No jargon, no obligation.",
    assurance: "From $199 one time, then a low monthly care plan.",
    ribbon: [
      { value: "$199", label: "one time setup" },
      { value: "6 months", label: "free update" },
      { value: "Low fee", label: "monthly care" },
    ],
  },
} as const;

export type LandingContent = typeof landingContent;
