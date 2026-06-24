import { landingContent } from "@/app/_content/landing";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://caffeinatedweb.com";

/**
 * JSON-LD structured data for the homepage: a ProfessionalService with a
 * concrete $199 Offer, plus a FAQPage covering the same Q&A rendered on the
 * page (eligible for FAQ rich results). Kept honest: no fabricated address,
 * phone, reviews, or stats.
 */
export function StructuredData() {
  const { brand, faq } = landingContent;

  const service = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: brand.name,
    description:
      "Affordable custom website design and redesign for small businesses, from a one time setup starting at $199, plus low monthly hosting, domain and maintenance.",
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
        name: "Website one time setup from $199",
        description:
          "Build from zero or redesign your current site into a custom, mobile friendly website. One time fee starting at $199.",
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
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
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
