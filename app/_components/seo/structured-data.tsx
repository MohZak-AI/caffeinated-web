import { landingContent } from "@/app/_content/landing";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://caffienatedweb.com";

export function StructuredData() {
  const { brand, faqSection } = landingContent;

  const service = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: brand.name,
    description:
      "Fast, clear website design for small businesses, with copy, design, code, launch, and ongoing care handled.",
    url: siteUrl,
    email: landingContent.booking.fallbackEmail,
    image: `${siteUrl}/caffeinated-web-logo.webp`,
    logo: `${siteUrl}/caffeinated-web-logo.webp`,
    priceRange: "$199+",
    areaServed: "Worldwide",
    serviceType: ["Website Design", "Website Redesign", "Web Development"],
    makesOffer: [
      {
        "@type": "Offer",
        name: "Website setup from $199",
        description:
          "Copy, design, and development for a custom, mobile-friendly website. Setup starts at $199, followed by an exact $10 monthly care plan.",
        price: "199",
        priceCurrency: "USD",
        priceSpecification: {
          "@type": "PriceSpecification",
          price: "199",
          priceCurrency: "USD",
          valueAddedTaxIncluded: false,
        },
        availability: "https://schema.org/InStock",
        url: `${siteUrl}/#pricing`,
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqSection.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(service) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
