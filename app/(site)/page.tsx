import { Hero } from "@/components/sections/Hero";
import { OperatorStrip } from "@/components/sections/OperatorStrip";
import { Metrics } from "@/components/sections/Metrics";
import { BentoServices } from "@/components/sections/BentoServices";
import { Industries, LatestNews, Testimonials } from "@/components/sections/HomeExtras";

export default function Home() {
  return (
    <>
      <Hero />
      <OperatorStrip />
      <Metrics />
      <BentoServices />
      <Industries />
      <Testimonials />
      <LatestNews />
    </>
  );
}
