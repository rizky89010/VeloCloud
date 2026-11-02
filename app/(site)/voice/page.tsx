import type { Metadata } from "next";
import { SolutionTemplate } from "@/components/templates/SolutionTemplate";
import { VoicePlans } from "@/components/sections/VoicePlans";

export const metadata: Metadata = {
  title: "Voice",
  description: "Wholesale voice termination with 300+ direct routes, tailored plans and fraud prevention.",
};

export default function Page() {
  return (
    <SolutionTemplate slug="voice">
      <VoicePlans />
    </SolutionTemplate>
  );
}
