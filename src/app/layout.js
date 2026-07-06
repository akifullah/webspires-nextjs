import { Geist, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { generateSEO } from "@/lib/seo";

/* ── Fonts ─────────────────────────────────────────────── */
// Geist stays as the fallback for display/body until the self-hosted
// Clash Display + Satoshi files land in public/fonts/ (see README there).
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

// Mono / "signal" face carries queries, entities, citations, eyebrows.
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});

/* ── Viewport (must be a SEPARATE export in Next.js App Router) ── */
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

/* ── Page Metadata ──────────────────────────────────────── */
export const metadata = {
  ...generateSEO({ path: "/" }),

  title: {
    default: "Best Web Design Agency UK | Webspires Limited",
    template: "%s | Webspires",
  },
  description:
    "Looking for the best Web Design Agency UK? Webspires builds websites that help your business grow and stand out online. We offer web development, SEO, social media, Google Ads, Meta Ads & more.",

  alternates: {
    canonical: "https://webspires.co.uk/",
    languages: { "en-GB": "https://webspires.co.uk/" },
  },

  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://webspires.co.uk/",
    siteName: "Webspires",
    title: "Best Web Design Agency UK | Webspires Limited",
    description:
      "Looking for the best Web Design Agency UK? Webspires builds websites that help your business grow and stand out online.",
    images: [
      {
        url: "/images/webspires-logo-icon.png",
        width: 1200,
        height: 630,
        alt: "Webspires – Best Web Design Agency UK",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Best Web Design Agency UK | Webspires Limited",
    description:
      "UK's results-driven digital agency. High-performance websites, SEO & paid campaigns that grow your business.",
    images: ["/images/webspires-logo-icon.png"],
    creator: "@webspires",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/images/webspires-logo-icon.png",
  },
};

/* ── Root Layout ─────────────────────────────────────────── */
export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="ltr" className={`${geistSans.variable} ${jetbrainsMono.variable} h-full`}>
      <head>
        {/* Preload the primary self-hosted weights to cut CLS / first-paint swap */}
        <link rel="preload" href="/fonts/satoshi-400.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/clash-600.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body
        className="min-h-full flex flex-col antialiased"
        cz-shortcut-listen="true"
      >
        {children}
      </body>
    </html>
  );
}
