import type { Metadata } from "next";
import { ContactPage } from "@/components/templates/ContactPage";

export const metadata: Metadata = {
  title: "Contact",
  description: "Reach the VELOCLOUD team 24/7 about voice, messaging, DIDs or managed services.",
};

export default function Page() {
  return <ContactPage />;
}
