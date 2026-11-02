import type { Metadata } from "next";
import { SolutionTemplate } from "@/components/templates/SolutionTemplate";

export const metadata: Metadata = {
  title: "DIDs",
  description: "Local, mobile, toll-free and national numbers in 190+ countries.",
};

export default function Page() {
  return (
    <SolutionTemplate slug="dids" />
  );
}
