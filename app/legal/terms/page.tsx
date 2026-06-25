import type { Metadata } from "next";
import { PolicyView } from "../_components/policy-view";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms and conditions that govern your use of caffienatedweb websites and services.",
  alternates: { canonical: "/legal/terms" },
};

export default function TermsPage() {
  return <PolicyView slug="terms" />;
}
