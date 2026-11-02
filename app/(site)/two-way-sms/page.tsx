import type { Metadata } from "next";
import { SolutionTemplate } from "@/components/templates/SolutionTemplate";

export const metadata: Metadata = {
  title: "Two-way SMS",
  description: "Let customers respond directly to your messages with two-way SMS.",
};

export default function Page() {
  return (
    <SolutionTemplate slug="two-way-sms" />
  );
}
