import type { Metadata } from "next";
import { SolutionTemplate } from "@/components/templates/SolutionTemplate";

export const metadata: Metadata = {
  title: "Enterprise SMS",
  description: "Carrier-grade SMS infrastructure with global operator coverage and intelligent routing.",
};

export default function Page() {
  return (
    <SolutionTemplate slug="enterprise-sms" />
  );
}
