import type { Metadata } from "next";
import {
  Cinzel,
  Cinzel_Decorative,
  EB_Garamond,
  Fraunces,
  Geist_Mono,
  Playfair_Display,
  Press_Start_2P,
} from "next/font/google";
import { SiteCursor } from "./_components/cursor/site-cursor";
import { CookieConsent } from "./_components/consent/cookie-consent";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-primary",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const pressStart = Press_Start_2P({
  variable: "--font-pixel",
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
});

// Medieval / illuminated-manuscript voice for the "Did you know?" section.
const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

const cinzelDecorative = Cinzel_Decorative({
  variable: "--font-cinzel-deco",
  subsets: ["latin"],
  display: "swap",
  weight: ["700", "900"],
});

const ebGaramond = EB_Garamond({
  variable: "--font-garamond",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});


const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://caffienatedweb.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Affordable Website Design & Redesign from $199 | caffienatedweb",
    template: "%s | caffienatedweb",
  },
  description:
    "Affordable custom website design and redesign for small businesses. Build or redesign from $199 one time, plus low monthly hosting, domain and maintenance.",
  applicationName: "caffienatedweb",
  keywords: [
    "affordable website design",
    "cheap website developer",
    "custom website for small business",
    "website redesign services",
    "website from scratch",
    "low cost website builder",
    "website for $199",
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
    title: "Affordable Website Design & Redesign from $199 | caffienatedweb",
    description:
      "Affordable custom website design and redesign for small businesses. Build or redesign from $199 one time, plus low monthly hosting, domain and maintenance.",
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
    title: "Affordable Website Design & Redesign from $199 | caffienatedweb",
    description:
      "Affordable custom website design and redesign for small businesses. Build or redesign from $199 one time, plus low monthly hosting, domain and maintenance.",
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
      className={`${fraunces.variable} ${geistMono.variable} ${playfair.variable} ${pressStart.variable} ${cinzel.variable} ${cinzelDecorative.variable} ${ebGaramond.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[--cw-cream] text-[--cw-ink]">
        <SiteCursor />
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
