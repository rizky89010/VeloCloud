import type { Metadata } from "next";
import { SolutionTemplate } from "@/components/templates/SolutionTemplate";

export const metadata: Metadata = {
  title: "Managed Communication Services",
  description: "24/7 NOC, traffic management, fraud control and call center BPO from VELOCLOUD.",
};

export default function Page() {
  return (
    <SolutionTemplate slug="managed-services" />
  );
}
