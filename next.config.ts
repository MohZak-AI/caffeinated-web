import type { NextConfig } from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://caffeinatedweb.com";
const apex = SITE_URL.replace(/^https?:\/\//, "").replace(/\/$/, "");

const nextConfig: NextConfig = {
  // Self-contained build for Node hosts like Hostinger (produces .next/standalone
  // with its own server.js and a pruned node_modules).
  output: "standalone",
  poweredByHeader: false,

  // Canonicalize www -> apex so all link equity lands on one host.
  // The host itself must still serve the apex domain (configure DNS + host).
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: `www.${apex}` }],
        destination: `${SITE_URL}/:path*`,
        permanent: true,
      },
    ];
  },

  // Security + HSTS headers. HSTS only takes effect once the site is on HTTPS,
  // which the host (e.g. Vercel) provides automatically with http -> https.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
