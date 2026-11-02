import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { LanguageProvider } from "@/lib/i18n";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "VELOCLOUD Indonesia | Simply Better Communication",
    template: "%s | VELOCLOUD Indonesia",
  },
  description:
    "Voice termination, global DIDs, A2P messaging, and managed communication services for enterprises in Indonesia. Komdigi-compliant, ISO 27001 & GDPR.",
  metadataBase: new URL("https://velocloudid.com"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${jakarta.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
