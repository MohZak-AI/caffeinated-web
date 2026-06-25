import type { Metadata } from "next";
import { PolicyView } from "../_components/policy-view";

export const metadata: Metadata = {
  title: "Refund Policy",
  description:
    "When caffienatedweb offers refunds and credits for one time builds and the monthly care plan.",
  alternates: { canonical: "/legal/refund" },
};

export default function RefundPage() {
  return <PolicyView slug="refund" />;
}
