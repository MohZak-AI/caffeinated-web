import type { Metadata } from "next";
import Script from "next/script";
import { Geist_Mono } from "next/font/google";
import { SiteCursor } from "./_components/cursor/site-cursor";
import { CookieConsent } from "./_components/consent/cookie-consent";
import "./globals.css";
import "./espresso.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const fallbackSiteUrl = "https://caffienatedweb.com";
const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? fallbackSiteUrl;
const siteUrl = URL.canParse(configuredSiteUrl)
  ? configuredSiteUrl
  : fallbackSiteUrl;
const reactDiagnosticsEnabled =
  process.env.NODE_ENV === "development" &&
  process.env.NEXT_PUBLIC_ENABLE_REACT_DIAGNOSTICS === "true";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Custom Websites for Small Businesses | caffienatedweb",
    template: "%s | caffienatedweb",
  },
  description:
    "Fast, clear websites for founders, shops, cafés, and local teams, with the technical work handled.",
  applicationName: "caffienatedweb",
  keywords: [
    "affordable website design",
    "cheap website developer",
    "custom website for small business",
    "website redesign services",
    "website from scratch",
    "low cost website builder",
    "website from $199",
    "website hosting and domain",
    "website maintenance",
    "freelance web designer",
  ],
  authors: [{ name: "caffienatedweb" }],
  creator: "caffienatedweb",
  publisher: "caffienatedweb",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "caffienatedweb",
    title: "A website customers can find and trust | caffienatedweb",
    description:
      "Clear websites for founders, shops, cafés, and local teams, without the technical stress.",
    images: [
      {
        url: "/caffeinated-web-logo.webp",
        width: 506,
        height: 638,
        alt: "caffienatedweb logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "A website customers can find and trust | caffienatedweb",
    description:
      "Clear websites for founders, shops, cafés, and local teams, without the technical stress.",
    images: ["/caffeinated-web-logo.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "technology",
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=satoshi@300,400,500,600,700&display=swap"
        />
        {reactDiagnosticsEnabled && (
          <Script
            src="https://unpkg.com/react-scan/dist/auto.global.js"
            crossOrigin="anonymous"
            strategy="lazyOnload"
          />
        )}

        {reactDiagnosticsEnabled && (
          <Script
            src="//unpkg.com/react-grab/dist/index.global.js"
            crossOrigin="anonymous"
            strategy="lazyOnload"
          />
        )}
      </head>
      <body className="min-h-full flex flex-col bg-[var(--bg-primary)] text-[var(--text-primary)]">
        <SiteCursor />
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
