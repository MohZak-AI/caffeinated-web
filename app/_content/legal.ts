/** Centralized policy content and public contact details. */
export const legalContent = {
  brand: {
    name: "caffienatedweb",
    legalName: "caffienatedweb",
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://caffienatedweb.com",
    contactEmail: "contact@caffienatedweb.com",
    // Month written out so it never needs regeneration at request time
    // (static export). Bump this string whenever a policy is revised.
    lastUpdated: "June 25, 2026",
  },
} as const;

export type LegalSection = {
  heading: string;
  /** Inline paragraphs. Plain text — no HTML. */
  paragraphs?: string[];
  /** Optional bullet list shown under the section. */
  list?: string[];
};

export type LegalPolicy = {
  slug: "terms" | "privacy" | "refund" | "cookies";
  title: string;
  shortTitle: string;
  description: string;
  intro: string;
  sections: LegalSection[];
};

export const legalPolicies: LegalPolicy[] = [
  {
    slug: "terms",
    title: "Terms of Service",
    shortTitle: "Terms",
    description:
      "The terms and conditions that govern your use of caffienatedweb websites and services.",
    intro:
      "These Terms of Service (the \u201cTerms\u201d) govern your access to and use of the caffienatedweb website, any website we build or redesign for you, and the related hosting, domain, and maintenance services we provide (together, the \u201cServices\u201d). By requesting a quote, booking a call, or otherwise using the Services, you agree to these Terms. If you do not agree, please do not use the Services.",
    sections: [
      {
        heading: "1. Who we are",
        paragraphs: [
          "caffienatedweb (\u201cwe\u201d, \u201cus\u201d, \u201cour\u201d) is a web design studio that builds, redesigns, hosts, and maintains websites for small businesses and individuals. These Terms form a contract between you (\u201cyou\u201d, \u201cclient\u201d) and us.",
          `If you have questions about these Terms, you can contact us at ${legalContent.brand.contactEmail}.`,
        ],
      },
      {
        heading: "2. The Services",
        paragraphs: [
          "We design and build custom, mobile friendly websites from zero, or redesign an existing website you already own. Our setup fee is a one time charge starting at $199, with the final price scoped on a discovery call. After launch, an optional monthly care plan covers your domain, hosting, security, and maintenance, including one free edit every six (6) months.",
          "The scope, timeline, and price of each project are confirmed in writing (usually by email) before work begins. Anything not listed in that written scope may require a separate quote.",
        ],
      },
      {
        heading: "3. Quotes, pricing, and payment",
        paragraphs: [
          "All prices are quoted in US dollars (USD) unless stated otherwise. Prices shown on the website (\u201cfrom $199\u201d) are starting points and not a fixed quote for every project.",
          "A one time setup fee is due as agreed in your written scope. The monthly care plan is billed in advance on a recurring basis until you cancel in writing.",
          "If a payment is more than seven (7) days overdue, we may pause hosting, maintenance, or edits until the balance is settled, while keeping your content and data safe.",
        ],
      },
      {
        heading: "4. Your responsibilities",
        paragraphs: [
          "You agree to give us accurate information, content, and access (logins, branding, images, copy) we reasonably need to do the work, and to respond to our questions in a timely way. Delays on your side may push back delivery dates.",
        ],
        list: [
          "You own, or have the rights to use, all content and assets you give us (text, images, logos, fonts, trademarks).",
          "You are responsible for the accuracy and legality of the content published on your site.",
          "You will not use the Services for anything unlawful, infringing, misleading, abusive, or harmful.",
        ],
      },
      {
        heading: "5. Our responsibilities",
        paragraphs: [
          "We will perform the Services with reasonable skill and care, build your site to be responsive and standards based, and keep your hosting and maintenance running as described in your plan. We are not responsible for outages, slowness, or failures caused by third party providers, your own actions, or events outside our control.",
        ],
      },
      {
        heading: "6. Ownership and licenses",
        paragraphs: [
          "You own your content and the finished website once any amounts due are paid in full. We transfer the site, the domain (where we manage it), and the code to you.",
          "We retain the right to use generic techniques, code patterns, and design frameworks we developed before or during your project in other projects. We may also feature your project in our portfolio or marketing unless you tell us in writing that you would prefer we do not.",
        ],
      },
      {
        heading: "7. Third party services",
        paragraphs: [
          "Your site may rely on third party services such as domain registrars, hosting, payment processors, analytics, and plugins. Those services have their own terms and policies, and we are not responsible for how they handle your data, pricing, availability, or outages.",
        ],
      },
      {
        heading: "8. Limitation of liability",
        paragraphs: [
          "To the fullest extent the law allows, our total liability for any claim related to the Services is limited to the amount you paid us for the Services in the three (3) months before the claim arose.",
          "We are not liable for indirect, incidental, special, or consequential damages, or for lost profits, lost data, or business interruption, even if we knew such damages were possible.",
        ],
      },
      {
        heading: "9. Termination",
        paragraphs: [
          "You can cancel the monthly care plan at any time by emailing us in writing. Cancellation stops future billing but does not refund past fees. We will hand over your site and domain access so you stay in control.",
          "We may stop providing the Services if payments are seriously overdue, if you breach these Terms and do not fix the issue within seven (7) days of our notice, or if continuing would expose us to legal risk.",
        ],
      },
      {
        heading: "10. Changes to these Terms",
        paragraphs: [
          "We may update these Terms from time to time. The \u201cLast updated\u201d date at the top shows when we last revised them. If we make material changes, we will try to let you know by email or a notice on the site. Continued use after changes take effect means you accept the updated Terms.",
        ],
      },
      {
        heading: "11. Contact and governing terms",
        paragraphs: [
          `If you have any questions about these Terms, contact us at ${legalContent.brand.contactEmail}. These Terms are governed by the laws of the jurisdiction where caffienatedweb operates, without regard to conflict of law rules.`,
        ],
      },
    ],
  },
  {
    slug: "privacy",
    title: "Privacy Policy",
    shortTitle: "Privacy",
    description:
      "How caffienatedweb collects, uses, and protects personal information from clients and site visitors.",
    intro:
      "This Privacy Policy explains what information caffienatedweb collects, how we use it, and the choices you have. It applies to our website and to the Services we provide to clients. We try to keep this plain and honest, with no hidden tracking.",
    sections: [
      {
        heading: "1. Information we collect",
        paragraphs: [
          "We only collect information that helps us run the Services and respond to you. We do not buy or sell personal data.",
        ],
        list: [
          "Contact details you give us, like your name, email, phone number, and business name, when you book a call, request a quote, or email us.",
          "Project content and assets you provide, such as text, images, logins, and brand materials, so we can build or redesign your site.",
          "Billing information needed to process payments, handled by our payment processor, not stored in plain text by us.",
          "Basic technical data from site visits, such as browser type, device, and pages viewed, used to keep the site working and secure.",
        ],
      },
      {
        heading: "2. How we use your information",
        list: [
          "To answer your questions, send quotes and plans, and deliver the Services.",
          "To host, maintain, and secure the websites we build for you.",
          "To send you updates about your project, your plan, or changes that affect you.",
          "To improve our site, fix problems, and prevent abuse, fraud, and security issues.",
        ],
      },
      {
        heading: "3. Legal basis (where applicable)",
        paragraphs: [
          "Where privacy laws like the GDPR or similar apply, we process your information because you asked us to (a contract or pre contract steps), because it is in our legitimate business interest, or because the law requires it. We never rely on consent as our main basis, and we do not profile you for advertising.",
        ],
      },
      {
        heading: "4. Cookies and similar technologies",
        paragraphs: [
          "We use only the cookies that are strictly necessary for the site to work and stay secure, plus any analytics cookies that are clearly described and only run with your choice. See our Cookie Policy for the details and your controls.",
        ],
      },
      {
        heading: "5. Sharing information",
        paragraphs: [
          "We share information only when we need to deliver the Services, or when the law requires it. We do not sell your personal information.",
        ],
        list: [
          "Hosting and domain providers that keep your site online.",
          "Payment processors that handle billing.",
          "Tools you ask us to connect to your site, such as email marketing or booking apps.",
          "PostHog, our analytics provider, when analytics cookies are enabled on our own site.",
          "Authorities, where we are legally required to respond.",
        ],
      },
      {
        heading: "6. How long we keep information",
        paragraphs: [
          "We keep your information for as long as we need to deliver the Services and handle any follow up, and then for a reasonable period to meet legal, tax, or record keeping duties. When we no longer need it, we delete it or anonymize it.",
        ],
      },
      {
        heading: "7. Your rights",
        paragraphs: [
          "Depending on where you live, you may have the right to see, correct, delete, or limit how we use your information, to get a copy of it, and to object to some uses. You can also complain to your local data protection authority.",
          `To use any of these rights, email us at ${legalContent.brand.contactEmail}. We respond within a reasonable time, usually within 30 days.`,
        ],
      },
      {
        heading: "8. Security",
        paragraphs: [
          "We use reasonable technical and organizational measures to protect your information, such as access controls, secure hosting, and encryption in transit. No system is perfectly secure, but we treat your data with care and act quickly if we learn of a problem.",
        ],
      },
      {
        heading: "9. International transfers",
        paragraphs: [
          "Because hosting and tools can run from servers in different countries, your information may be processed outside your home country. Where this happens, we use providers that offer suitable safeguards.",
        ],
      },
      {
        heading: "10. Children",
        paragraphs: [
          "Our Services are aimed at businesses and adults. We do not knowingly collect information from children, and we ask that minors do not submit personal details. If you believe a child has given us information, contact us and we will delete it.",
        ],
      },
      {
        heading: "11. Changes to this policy",
        paragraphs: [
          "We may update this Privacy Policy from time to time. The \u201cLast updated\u201d date shows when we last revised it. Material changes will be highlighted by email or a notice on the site. Continued use after changes take effect means you accept the updated policy.",
        ],
      },
    ],
  },
  {
    slug: "refund",
    title: "Refund Policy",
    shortTitle: "Refunds",
    description:
      "When caffienatedweb offers refunds and credits for one time builds and the monthly care plan.",
    intro:
      "We want you to be happy with the work. This Refund Policy explains when refunds and credits are available for the one time setup fee and the monthly care plan, so there are no surprises.",
    sections: [
      {
        heading: "1. Discovery calls and quotes are free",
        paragraphs: [
          "The discovery call and the written plan and quote we send are free and carry no obligation. You are not charged until you confirm a project in writing.",
        ],
      },
      {
        heading: "2. One time setup fee",
        paragraphs: [
          "The one time setup fee is for designing, building, or redesigning your website, and is generally non refundable once work has started, because it pays for the time and effort already spent.",
        ],
        list: [
          "If you cancel in writing before any work has started, you receive a full refund of any setup fee already paid.",
          "If you cancel after work has started but before launch, the part of the work already completed is charged, and any remaining balance is refunded to you.",
          "If the site has launched and been handed over, the setup fee is non refundable, but your monthly care plan can be cancelled going forward at any time.",
        ],
      },
      {
        heading: "3. Monthly care plan",
        paragraphs: [
          "The monthly care plan covers hosting, domain, security, and maintenance and is billed in advance. It is a recurring service, so past months are not refunded.",
        ],
        list: [
          "You can cancel at any time by email, and no further charges will be made.",
          "If you cancel partway through a paid month, the current month stays active until it ends, and we hand over access so your site keeps running.",
          "If we are unable to provide the service for a full month due to a fault on our side, we will credit or refund that month.",
        ],
      },
      {
        heading: "4. Free edits and extra edits",
        paragraphs: [
          "Each plan includes one free edit every six (6) months. Unused free edits do not roll over. Edits outside the free cycle are charged at a small fee quoted before we start them, and that fee is non refundable once the edit is completed.",
        ],
      },
      {
        heading: "5. Third party costs",
        paragraphs: [
          "Costs charged by third parties, such as domain renewals, premium plugins, or external subscriptions, are passed through at cost and are non refundable once the third party has billed them, because we cannot recover those fees on your behalf.",
        ],
      },
      {
        heading: "6. How to request a refund",
        paragraphs: [
          `Email us at ${legalContent.brand.contactEmail} with your name, project, and the reason for the request. We review each request fairly and respond, usually within five (5) business days. Approved refunds are returned to the original payment method within a reasonable time.`,
        ],
      },
      {
        heading: "7. Exceptions",
        paragraphs: [
          "Refunds are not available where a problem results from content, delays, or decisions on your side, from third party services outside our control, or from misuse of the site after handover. Where the law gives you stronger refund rights, those rights override anything here to the extent required.",
        ],
      },
    ],
  },
  {
    slug: "cookies",
    title: "Cookie Policy",
    shortTitle: "Cookies",
    description:
      "The cookies and similar technologies caffienatedweb uses, and how you control them.",
    intro:
      "This Cookie Policy explains the cookies and similar technologies we use on our own website, why we use them, and how you can control them. It sits alongside our Privacy Policy.",
    sections: [
      {
        heading: "1. What cookies are",
        paragraphs: [
          "Cookies are small text files stored on your device when you visit a website. They help the site remember things like your preferences and keep the site working and secure. Cookies are not software and cannot run programs on their own.",
        ],
      },
      {
        heading: "2. The cookies we use",
        paragraphs: [
          "We keep cookies to a minimum and only use what is needed or clearly useful.",
        ],
        list: [
          "Strictly necessary cookies that make the site work, such as remembering your consent choice. These run by default and cannot be turned off in the site.",
          "Optional analytics cookies from PostHog, if enabled, that help us understand which pages are visited so we can improve them. These only run if you choose to allow them.",
        ],
      },
      {
        heading: "3. Third party cookies",
        paragraphs: [
          "Analytics cookies are set by PostHog, our analytics provider. Embedded calendars or maps you choose to interact with may also set their own cookies. Those are governed by the third party\u2019s own policy. Where possible, we load such features only after you interact with them.",
        ],
      },
      {
        heading: "4. Managing cookies",
        paragraphs: [
          "You can control and delete cookies through your browser settings. Blocking strictly necessary cookies may stop parts of the site from working, such as remembering your consent. Optional cookies can be declined at any time without affecting the core site.",
        ],
      },
      {
        heading: "5. Changes to this policy",
        paragraphs: [
          "If we add or change cookies in a meaningful way, we will update this policy and the \u201cLast updated\u201d date, and where the law requires it, we will ask for fresh consent.",
        ],
      },
      {
        heading: "6. Contact",
        paragraphs: [
          `Questions about cookies? Email us at ${legalContent.brand.contactEmail}.`,
        ],
      },
    ],
  },
];

export const legalBySlug = (slug: LegalPolicy["slug"]) =>
  legalPolicies.find((p) => p.slug === slug);
