import type { Metadata } from "next";
import { PolicyView } from "../_components/policy-view";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "The cookies and similar technologies caffienatedweb uses, and how you control them.",
  alternates: { canonical: "/legal/cookies" },
};

export default function CookiesPage() {
  return <PolicyView slug="cookies" />;
}
