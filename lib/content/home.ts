import type { Locale } from "@/lib/dictionaries";

// Sections mirrored from the velocloudid.com homepage.

export const whyUs: Record<Locale, { eyebrow: string; title: string; body: string }> = {
  en: {
    eyebrow: "Why choose us",
    title: "Accessible & affordable communication for all",
    body: "VELOCLOUD is one of the largest global carriers that can deliver the lowest price voice and messaging solutions at the best quality day in, day out.",
  },
  id: {
    eyebrow: "Mengapa kami",
    title: "Komunikasi yang mudah diakses dan terjangkau untuk semua",
    body: "VELOCLOUD adalah salah satu carrier global terbesar yang menghadirkan solusi voice dan messaging dengan harga terbaik dan kualitas terbaik, setiap hari.",
  },
};

export const industries: { copy: Record<Locale, { title: string; desc: string }> }[] = [
  {
    copy: {
      en: { title: "Financial Services", desc: "Secure OTP delivery, fraud alerts, and transaction notifications with tier-1 routing." },
      id: { title: "Layanan Keuangan", desc: "Pengiriman OTP yang aman, alert fraud, dan notifikasi transaksi dengan routing tier-1." },
    },
  },
  {
    copy: {
      en: { title: "Retail & E-Commerce", desc: "Order confirmations, shipping updates, and promotional campaigns at scale." },
      id: { title: "Retail & E-Commerce", desc: "Konfirmasi pesanan, update pengiriman, dan kampanye promosi dalam skala besar." },
    },
  },
  {
    copy: {
      en: { title: "Healthcare", desc: "HIPAA-compliant appointment reminders, test results, and patient communications." },
      id: { title: "Kesehatan", desc: "Pengingat janji temu, hasil tes, dan komunikasi pasien yang sesuai HIPAA." },
    },
  },
  {
    copy: {
      en: { title: "Travel & Hospitality", desc: "Booking confirmations, flight updates, and real-time travel alerts." },
      id: { title: "Travel & Hospitality", desc: "Konfirmasi booking, update penerbangan, dan alert perjalanan real-time." },
    },
  },
  {
    copy: {
      en: { title: "Technology & SaaS", desc: "User verification, password resets, and product notifications for global platforms." },
      id: { title: "Teknologi & SaaS", desc: "Verifikasi pengguna, reset password, dan notifikasi produk untuk platform global." },
    },
  },
  {
    copy: {
      en: { title: "Logistics & Delivery", desc: "Driver notifications, proof of delivery confirmations, and last-mile update alerts." },
      id: { title: "Logistik & Pengiriman", desc: "Notifikasi pengemudi, konfirmasi bukti pengiriman, dan alert update last-mile." },
    },
  },
];

// Testimonials are quoted verbatim from velocloudid.com, so they stay in English.
export const testimonials = [
  {
    quote:
      "The flexibility shown by VELOCLOUD in their operations gives Airtel the ability to scale and grow with the comfort that it will always receive the full support from a trusted partner.",
    name: "Vivek Manglik",
    role: "Head – Global voice business",
    company: "Airtel",
  },
  {
    quote: "We have worked with VELOCLOUD for years and always we see in VELOCLOUD our best strategic ally to reach our objectives.",
    name: "Andrés Proaño",
    role: "Chief Financial Officer",
    company: "BTS",
  },
  {
    quote: "VELOCLOUD has been a superb partner for NTT Com over the years by always being honest and thoughtful.",
    name: "Shunichi Yoshinaga",
    role: "Director Service Creation",
    company: "NTT Communications",
  },
  {
    quote:
      "For many years, Etisalat has benefitted from the great quality provided by VELOCLOUD's product set, underpinned by its strong professional support and account teams.",
    name: "Ali Amiri",
    role: "Group Chief Carrier & Wholesale Officer",
    company: "Etisalat",
  },
];
