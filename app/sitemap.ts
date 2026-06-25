import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://caffienatedweb.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const legalPages = [
    "/legal",
    "/legal/terms",
    "/legal/privacy",
    "/legal/refund",
    "/legal/cookies",
  ];

  return [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...legalPages.map((path) => ({
      url: `${siteUrl}${path}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];
}
