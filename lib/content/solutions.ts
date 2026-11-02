import type { Locale } from "@/lib/dictionaries";

// Page copy is taken from velocloudid.com (EN) and the client brief; the ID text is our translation.

export type Illustration = "voice" | "sms" | "firewall" | "globe" | "omnichannel" | "sla";

type Localized<T> = Record<Locale, T>;

type SolutionCopy = {
  menuDesc: string;
  tagline: string;
  intro: string;
  highlightsTitle: string;
  highlights: { title: string; desc: string }[];
  listTitle?: string;
  list?: string[];
  cta: string;
};

export type Solution = {
  slug: string;
  href: string;
  title: string;
  /** Hero animation and palette shift for this page. */
  scene: "card" | "sphere" | "a2p" | "network" | "shield" | "dialog" | "globe";
  tint: number;
  illustration: Illustration;
  copy: Localized<SolutionCopy>;
};

export const solutions: Solution[] = [
  {
    slug: "voice",
    href: "/voice",
    title: "Voice",
    scene: "card",
    tint: 0,
    illustration: "voice",
    copy: {
      en: {
        menuDesc: "Wholesale voice termination",
        tagline: "Flexible, affordable and high-quality global voice termination at the lowest price.",
        intro:
          "In the voice business for the last 30 years, we bring you trusted, flexible, high quality and unsurpassed value for money wholesale voice termination. Through our 300+ direct routes, tailored plans and leading edge fraud prevention features, we empower simply better wholesale voice, globally.",
        highlightsTitle: "Our differentiators",
        highlights: [
          { title: "Cost efficiency", desc: "Unparalleled cost efficiency expertise, so you get the most value out of your VELOCLOUD interconnect." },
          { title: "Flexibility", desc: "Multiple plans built to suit your specific needs. We can deliver a tailored voice solution in a matter of days." },
          { title: "Experience", desc: "We leverage relationships built over the past 30 years to get you the best prices and quality for every route." },
          { title: "Global reach", desc: "Interconnect with our global network of carriers. 300+ direct routes give you instant voice and SMS coverage worldwide." },
          { title: "Retail traffic", desc: "VELOCLOUD generates billions of international retail minutes each year through its retail and enterprise brands." },
          { title: "Fraud prevention", desc: "State-of-the-art anti-fraud tools keep your voice traffic protected." },
        ],
        cta: "Ready to improve your voice termination?",
      },
      id: {
        menuDesc: "Wholesale voice termination",
        tagline: "Terminasi suara global yang fleksibel, terjangkau, dan berkualitas tinggi dengan harga terbaik.",
        intro:
          "Berpengalaman lebih dari 30 tahun di bisnis voice, kami menghadirkan wholesale voice termination yang tepercaya, fleksibel, berkualitas tinggi, dan bernilai terbaik. Lewat 300+ direct routes, paket yang dapat disesuaikan, dan fitur pencegahan fraud mutakhir, kami menghadirkan wholesale voice yang lebih baik secara global.",
        highlightsTitle: "Keunggulan kami",
        highlights: [
          { title: "Efisiensi biaya", desc: "Keahlian efisiensi biaya yang tak tertandingi, agar interkoneksi VELOCLOUD Anda memberi nilai maksimal." },
          { title: "Fleksibilitas", desc: "Beragam paket sesuai kebutuhan Anda. Solusi voice khusus dapat kami siapkan dalam hitungan hari." },
          { title: "Pengalaman", desc: "Relasi yang kami bangun selama 30 tahun memberi Anda harga dan kualitas terbaik untuk setiap rute." },
          { title: "Jangkauan global", desc: "Terhubung ke jaringan carrier global kami. 300+ direct routes memberi cakupan voice dan SMS di seluruh dunia." },
          { title: "Retail traffic", desc: "VELOCLOUD menghasilkan miliaran menit retail internasional setiap tahun melalui berbagai brand retail dan enterprise." },
          { title: "Pencegahan fraud", desc: "Perangkat anti-fraud mutakhir menjaga trafik voice Anda tetap aman." },
        ],
        cta: "Siap meningkatkan voice termination Anda?",
      },
    },
  },
  {
    slug: "a2p-messaging",
    href: "/a2p-messaging",
    title: "A2P Messaging",
    scene: "a2p",
    tint: 0.12,
    illustration: "sms",
    copy: {
      en: {
        menuDesc: "OTP, alerts & notifications",
        tagline: "A2P messaging platform that delivers secure, high-volume SMS for transactional alerts, OTPs, promotions, and notifications.",
        intro: "Reach customers on any mobile network with carrier-grade delivery, compliance built in, and real-time visibility into every message.",
        highlightsTitle: "Key benefits",
        highlights: [
          { title: "High deliverability", desc: "Global coverage with high delivery rates." },
          { title: "Secure & compliant", desc: "Messaging that keeps your traffic secure and compliant." },
          { title: "Real-time analytics", desc: "Live analytics and delivery reports for every campaign." },
          { title: "Scalable", desc: "Scale to millions of messages." },
        ],
        listTitle: "Use cases",
        list: ["One-time passwords (OTP)", "Transaction & fraud alerts", "Promotions & marketing", "Appointment & shipping notifications"],
        cta: "Get started with A2P",
      },
      id: {
        menuDesc: "OTP, alert & notifikasi",
        tagline: "Platform A2P messaging yang mengirim SMS bervolume tinggi secara aman untuk alert transaksi, OTP, promosi, dan notifikasi.",
        intro: "Jangkau pelanggan di jaringan seluler mana pun dengan pengiriman kelas carrier, kepatuhan bawaan, dan visibilitas real-time atas setiap pesan.",
        highlightsTitle: "Manfaat utama",
        highlights: [
          { title: "Tingkat terkirim tinggi", desc: "Cakupan global dengan tingkat pengiriman tinggi." },
          { title: "Aman & patuh regulasi", desc: "Pengiriman pesan yang aman dan sesuai regulasi." },
          { title: "Analitik real-time", desc: "Analitik dan laporan pengiriman langsung untuk setiap kampanye." },
          { title: "Mudah diskalakan", desc: "Siap untuk jutaan pesan." },
        ],
        listTitle: "Contoh penggunaan",
        list: ["One-time password (OTP)", "Alert transaksi & fraud", "Promosi & marketing", "Notifikasi janji temu & pengiriman"],
        cta: "Mulai dengan A2P",
      },
    },
  },
  {
    slug: "enterprise-sms",
    href: "/enterprise-sms",
    title: "Enterprise SMS",
    scene: "network",
    tint: 0.05,
    illustration: "globe",
    copy: {
      en: {
        menuDesc: "Carrier-grade SMS for large organizations",
        tagline: "Carrier-grade infrastructure, global operator coverage, and intelligent routing to power mission-critical communications.",
        intro: "Enterprise SMS gives large organizations the infrastructure and reach of a global carrier, so critical messages arrive on time, everywhere.",
        highlightsTitle: "Built for mission-critical messaging",
        highlights: [
          { title: "Carrier-grade", desc: "Infrastructure built and operated to carrier standards." },
          { title: "Global reach", desc: "Coverage across 1,000+ operators worldwide." },
          { title: "Intelligent routing", desc: "Traffic is routed for the best balance of delivery and quality." },
        ],
        cta: "Talk to us about Enterprise SMS",
      },
      id: {
        menuDesc: "SMS kelas carrier untuk perusahaan besar",
        tagline: "Infrastruktur kelas carrier, cakupan operator global, dan routing cerdas untuk komunikasi yang krusial.",
        intro: "Enterprise SMS memberi perusahaan besar infrastruktur dan jangkauan carrier global, sehingga pesan penting tiba tepat waktu di mana pun.",
        highlightsTitle: "Dibangun untuk pesan yang krusial",
        highlights: [
          { title: "Kelas carrier", desc: "Infrastruktur yang dibangun dan dioperasikan dengan standar carrier." },
          { title: "Jangkauan global", desc: "Cakupan ke 1.000+ operator di seluruh dunia." },
          { title: "Routing cerdas", desc: "Trafik dirutekan untuk keseimbangan terbaik antara keterkiriman dan kualitas." },
        ],
        cta: "Diskusikan Enterprise SMS dengan kami",
      },
    },
  },
  {
    slug: "sms-firewall",
    href: "/sms-firewall",
    title: "SMS Firewall",
    scene: "shield",
    tint: 0.3,
    illustration: "firewall",
    copy: {
      en: {
        menuDesc: "Protect MNO messaging revenue",
        tagline: "Real-time control over every message on your network.",
        intro:
          "SMS Firewall gives MNOs real-time control over every message on their network, classifying traffic, blocking bypass routes, and ensuring commercial SMS terminates over the channels that generate revenue.",
        highlightsTitle: "What it does",
        highlights: [
          { title: "Classify traffic", desc: "Every message is inspected and classified in real time." },
          { title: "Block bypass routes", desc: "Traffic that tries to bypass your commercial channels is blocked." },
          { title: "Protect revenues", desc: "Commercial SMS terminates over the channels that generate revenue." },
        ],
        cta: "Protect your network",
      },
      id: {
        menuDesc: "Lindungi pendapatan SMS operator",
        tagline: "Kendali real-time atas setiap pesan di jaringan Anda.",
        intro:
          "SMS Firewall memberi operator seluler kendali real-time atas setiap pesan di jaringannya: mengklasifikasikan trafik, memblokir rute bypass, dan memastikan SMS komersial terminasi lewat kanal yang menghasilkan pendapatan.",
        highlightsTitle: "Fungsinya",
        highlights: [
          { title: "Klasifikasi trafik", desc: "Setiap pesan diperiksa dan diklasifikasikan secara real-time." },
          { title: "Blokir rute bypass", desc: "Trafik yang mencoba melewati kanal komersial Anda diblokir." },
          { title: "Lindungi pendapatan", desc: "SMS komersial terminasi lewat kanal yang menghasilkan pendapatan." },
        ],
        cta: "Lindungi jaringan Anda",
      },
    },
  },
  {
    slug: "two-way-sms",
    href: "/two-way-sms",
    title: "Two-way SMS",
    scene: "dialog",
    tint: 0.2,
    illustration: "sms",
    copy: {
      en: {
        menuDesc: "Let customers reply to your messages",
        tagline: "Enable seamless interactions by allowing customers to respond directly to your messages.",
        intro: "With two-way SMS, customers can reply to your messages with their queries or concerns, turning notifications into conversations.",
        highlightsTitle: "Why two-way SMS",
        highlights: [
          { title: "Direct replies", desc: "Customers answer in the same thread, no app needed." },
          { title: "Confirmations", desc: "Collect YES/NO confirmations for appointments and deliveries." },
          { title: "Support at scale", desc: "Route customer queries to your team or systems." },
        ],
        cta: "Enable two-way messaging",
      },
      id: {
        menuDesc: "Pelanggan bisa membalas pesan Anda",
        tagline: "Interaksi tanpa hambatan: pelanggan dapat membalas pesan Anda secara langsung.",
        intro: "Dengan two-way SMS, pelanggan dapat membalas pesan Anda dengan pertanyaan atau keluhan, mengubah notifikasi menjadi percakapan.",
        highlightsTitle: "Mengapa two-way SMS",
        highlights: [
          { title: "Balasan langsung", desc: "Pelanggan menjawab di percakapan yang sama, tanpa perlu aplikasi." },
          { title: "Konfirmasi", desc: "Kumpulkan konfirmasi YA/TIDAK untuk janji temu dan pengiriman." },
          { title: "Layanan berskala", desc: "Teruskan pertanyaan pelanggan ke tim atau sistem Anda." },
        ],
        cta: "Aktifkan two-way messaging",
      },
    },
  },
  {
    slug: "managed-services",
    href: "/managed-services",
    title: "Managed Communication Services",
    scene: "sphere",
    tint: 0.08,
    illustration: "omnichannel",
    copy: {
      en: {
        menuDesc: "24/7 NOC, call center BPO & outsourcing",
        tagline: "Outsourcing your telecom operations shouldn't mean losing control. It should mean gaining a smarter, leaner way to scale.",
        intro:
          "We become an extension of your team, delivering operational excellence without the overhead. Keep full visibility and control while benefiting from our scale and expertise, including 24/7 omnichannel call center operations across voice, WhatsApp, and AI Virtual Agents.",
        highlightsTitle: "What we offer",
        highlights: [
          { title: "Traffic management", desc: "Full management of your voice and SMS traffic." },
          { title: "24/7 NOC", desc: "Round-the-clock network operations and expert support." },
          { title: "Fraud & routing", desc: "Fraud management and route optimization." },
          { title: "Reporting & SLA", desc: "Reporting, analytics and SLA management." },
          { title: "Seamless integration", desc: "Integrates with your existing systems." },
          { title: "Call Center BPO", desc: "Dedicated agents and omnichannel contact center operations, 24/7." },
        ],
        cta: "Talk to our team",
      },
      id: {
        menuDesc: "NOC 24/7, call center BPO & outsourcing",
        tagline: "Outsourcing operasional telekomunikasi bukan berarti kehilangan kendali, melainkan cara yang lebih cerdas dan ramping untuk bertumbuh.",
        intro:
          "Kami menjadi perpanjangan tim Anda, menghadirkan keunggulan operasional tanpa beban overhead. Tetap pegang visibilitas dan kendali penuh sambil memanfaatkan skala dan keahlian kami, termasuk operasional call center omnichannel 24/7 lewat voice, WhatsApp, dan AI Virtual Agent.",
        highlightsTitle: "Layanan kami",
        highlights: [
          { title: "Manajemen trafik", desc: "Pengelolaan penuh trafik voice dan SMS Anda." },
          { title: "NOC 24/7", desc: "Operasional jaringan dan dukungan ahli sepanjang waktu." },
          { title: "Fraud & routing", desc: "Manajemen fraud dan optimasi rute." },
          { title: "Pelaporan & SLA", desc: "Pelaporan, analitik, dan manajemen SLA." },
          { title: "Integrasi mulus", desc: "Terintegrasi dengan sistem yang sudah Anda miliki." },
          { title: "Call Center BPO", desc: "Agen khusus dan operasional contact center omnichannel 24/7." },
        ],
        cta: "Bicara dengan tim kami",
      },
    },
  },
  {
    slug: "dids",
    href: "/dids",
    title: "DIDs",
    scene: "globe",
    tint: 0,
    illustration: "globe",
    copy: {
      en: {
        menuDesc: "Local, mobile & toll-free numbers",
        tagline: "Access to a whole range of direct DIDs, local and toll-free numbers globally.",
        intro: "Numbers available in 190+ countries: local, mobile, toll-free and national.",
        highlightsTitle: "Number types",
        highlights: [
          { title: "Local", desc: "Local numbers for a presence in each market." },
          { title: "Mobile", desc: "Mobile numbers where available." },
          { title: "Toll-free", desc: "Free-to-call numbers for your customers." },
          { title: "National", desc: "National numbers for country-wide reach." },
        ],
        cta: "Request numbers",
      },
      id: {
        menuDesc: "Nomor lokal, mobile & toll-free",
        tagline: "Akses ke beragam nomor DID langsung, lokal, dan toll-free di seluruh dunia.",
        intro: "Nomor tersedia di 190+ negara: lokal, mobile, toll-free, dan nasional.",
        highlightsTitle: "Jenis nomor",
        highlights: [
          { title: "Lokal", desc: "Nomor lokal untuk hadir di setiap pasar." },
          { title: "Mobile", desc: "Nomor mobile jika tersedia." },
          { title: "Toll-free", desc: "Nomor bebas pulsa untuk pelanggan Anda." },
          { title: "Nasional", desc: "Nomor nasional untuk jangkauan seluruh negara." },
        ],
        cta: "Minta nomor",
      },
    },
  },
];

export const voicePlans: Localized<{
  title: string;
  subtitle: string;
  popular: string;
  plans: { name: string; desc: string; features: string[] }[];
  custom: { name: string; desc: string };
  cliTitle: string;
  cliNote: string;
  cliHead: [string, string, string, string];
}> = {
  en: {
    title: "Tailored plans that meet your evolving requirements",
    subtitle: "Our voice solutions can be delivered seamlessly within a matter of days. Three wholesale voice plans to suit your business needs.",
    popular: "Popular",
    plans: [
      {
        name: "Platinum",
        desc: "Highest QoS at the most competitive market rates",
        features: ["QoS parameters are pro-actively managed", "CLI and signaling features are fully supported", "All routes terminate via stable, high-quality providers"],
      },
      {
        name: "Gold",
        desc: "Uncompromising voice termination quality with advanced features",
        features: ["Tier 1 direct interconnects", "Daily testing via Ascade and iTest", "24/7 pro-actively managed QoS parameters", "Supports DTMF"],
      },
      {
        name: "Instant",
        desc: "QoS routing with aggressive market-based pricing",
        features: ["Pro-active management of QoS parameters", "LCR system takes advantage of spot market opportunities", "Combination of A-Z routes with QoS"],
      },
    ],
    custom: {
      name: "Custom Solution",
      desc: "If your business requires routing options that are not covered by our other plans, we can develop a solution tailor-made for your organization.",
    },
    cliTitle: "VELOCLOUD Platinum CLI routes",
    cliNote: "Direct CLI Route: MNO/LNO directs first in Platinum routing, taking more than 90% of traffic. Full CLI route list available upon request for Platinum customers.",
    cliHead: ["Country", "VELOCLOUD Location", "Direct CLI", "CLI Certified"],
  },
  id: {
    title: "Paket yang menyesuaikan kebutuhan Anda",
    subtitle: "Solusi voice kami dapat dijalankan dalam hitungan hari. Tiga paket wholesale voice sesuai kebutuhan bisnis Anda.",
    popular: "Populer",
    plans: [
      {
        name: "Platinum",
        desc: "QoS tertinggi dengan tarif pasar paling kompetitif",
        features: ["Parameter QoS dikelola secara proaktif", "Fitur CLI dan signaling didukung penuh", "Semua rute terminasi lewat provider yang stabil dan berkualitas"],
      },
      {
        name: "Gold",
        desc: "Kualitas terminasi tanpa kompromi dengan fitur lanjutan",
        features: ["Interkoneksi langsung Tier 1", "Pengujian harian via Ascade dan iTest", "Parameter QoS dikelola proaktif 24/7", "Mendukung DTMF"],
      },
      {
        name: "Instant",
        desc: "Routing QoS dengan harga agresif berbasis pasar",
        features: ["Pengelolaan proaktif parameter QoS", "Sistem LCR memanfaatkan peluang spot market", "Kombinasi rute A-Z dengan QoS"],
      },
    ],
    custom: {
      name: "Custom Solution",
      desc: "Jika bisnis Anda membutuhkan opsi routing di luar paket kami, kami dapat menyusun solusi khusus untuk organisasi Anda.",
    },
    cliTitle: "VELOCLOUD Platinum CLI routes",
    cliNote: "Direct CLI Route: rute langsung MNO/LNO diprioritaskan di routing Platinum dan menangani lebih dari 90% trafik. Daftar lengkap tersedia atas permintaan untuk pelanggan Platinum.",
    cliHead: ["Negara", "Lokasi VELOCLOUD", "Direct CLI", "CLI Certified"],
  },
};

export const cliRoutes: [string, string, boolean, boolean][] = [
  ["Afghanistan", "Afghanistan Cellular-MTN", true, true],
  ["Albania", "Albania Cellular-Vodafone", true, true],
  ["Argentina", "Argentina Cellular-Claro", true, true],
  ["Australia", "Australia Cellular-Telstra", false, true],
  ["Brazil", "Brazil Cellular", true, true],
  ["Canada", "Canada", true, true],
  ["China", "China Cellular", false, true],
  ["India", "India Cellular", true, true],
  ["UK", "United Kingdom", true, true],
  ["USA", "United States", true, true],
];

export function getSolution(slug: string) {
  const solution = solutions.find((s) => s.slug === slug);
  if (!solution) throw new Error(`Unknown solution: ${slug}`);
  return solution;
}
