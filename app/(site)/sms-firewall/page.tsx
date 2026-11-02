import type { Metadata } from "next";
import { SolutionTemplate } from "@/components/templates/SolutionTemplate";

export const metadata: Metadata = {
  title: "SMS Firewall",
  description: "Real-time control over every message on your network. Classify traffic, block bypass routes and protect revenues.",
};

export default function Page() {
  return (
    <SolutionTemplate slug="sms-firewall" />
  );
}
