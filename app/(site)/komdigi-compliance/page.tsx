import type { Metadata } from "next";
import { CompliancePage } from "@/components/templates/CompliancePage";

export const metadata: Metadata = {
  title: "Komdigi Compliance",
  description: "IVR to agent response within 30 seconds and 3-month data retention for Indonesian contact center operations.",
};

export default function Page() {
  return <CompliancePage />;
}
