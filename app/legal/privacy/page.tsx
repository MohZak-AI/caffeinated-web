import type { Metadata } from "next";
import { PolicyView } from "../_components/policy-view";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How caffienatedweb collects, uses, and protects personal information from clients and site visitors.",
  alternates: { canonical: "/legal/privacy" },
};

export default function PrivacyPage() {
  return <PolicyView slug="privacy" />;
}
