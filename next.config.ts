import type { NextConfig } from "next";

// Old static-site URLs from velocloudid.com, kept working after the move to Next.js routes.
const legacyPages: Record<string, string> = {
  "/index.html": "/",
  "/voice.html": "/voice",
  "/a2p-messaging.html": "/a2p-messaging",
  "/enterprise-sms.html": "/enterprise-sms",
  "/sms-firewall.html": "/sms-firewall",
  "/two-way-text-messaging.html": "/two-way-sms",
  "/mcs.html": "/managed-services",
  "/dids.html": "/dids",
  "/insights.html": "/insights",
  "/contact-us.html": "/contact",
};

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async redirects() {
    return Object.entries(legacyPages).map(([source, destination]) => ({ source, destination, permanent: true }));
  },
};

export default nextConfig;
