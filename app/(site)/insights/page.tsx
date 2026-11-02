import type { Metadata } from "next";
import { InsightsPage } from "@/components/templates/InsightsPage";

export const metadata: Metadata = {
  title: "Insights & News",
  description: "VELOCLOUD announcements and industry analysis.",
};

export default function Page() {
  return <InsightsPage />;
}
