import type { Metadata } from "next";
import { SolutionTemplate } from "@/components/templates/SolutionTemplate";

export const metadata: Metadata = {
  title: "A2P Messaging",
  description: "Secure, high-volume A2P SMS for OTPs, transactional alerts, promotions, and notifications.",
};

export default function Page() {
  return (
    <SolutionTemplate slug="a2p-messaging" />
  );
}
