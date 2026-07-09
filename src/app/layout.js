import { Geist, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import GoogleTagManager from "@/components/analytics/GoogleTagManager";
import GoogleTagManagerNoScript from "@/components/analytics/GoogleTagManagerNoScript";
import { generateSEO } from "@/lib/seo";
import { getSettings } from "@/lib/settings";

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
// Async so the social-share / preview image (and site name) can be driven by
// the admin Settings page. Falls back to the built-in defaults on any error.
export async function generateMetadata() {
  let siteName = "Webspires";
  let previewImage = "/images/webspires-logo-icon.png";
  let favicon = "/favicon.ico";
  try {
    const settings = await getSettings();
    siteName = settings.siteName || siteName;
    previewImage = settings.ogImage || previewImage;
    favicon = settings.favicon || favicon;
  } catch {
    // keep defaults
  }

  // Neutral, brand-level defaults only. Page-specific claims (e.g. web design)
  // live on their own pages so they never leak site-wide via OG inheritance.
  const title = `${siteName} | Digital Marketing & Web Design Agency UK`;
  const description =
    "Webspires is a UK digital marketing and web design agency. We build high-performance websites and run SEO, Google Ads, Meta Ads, and social media that grow your business.";

  return {
    ...generateSEO({ path: "/" }),

    title: {
      default: title,
      template: `%s | ${siteName}`,
    },
    description,

    alternates: {
      canonical: "https://webspires.co.uk/",
      languages: { "en-GB": "https://webspires.co.uk/" },
    },

    openGraph: {
      type: "website",
      locale: "en_GB",
      url: "https://webspires.co.uk/",
      siteName,
      title,
      description,
      images: [
        {
          url: previewImage,
          width: 1200,
          height: 630,
          alt: siteName,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [previewImage],
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
      icon: favicon,
      shortcut: favicon,
      apple: previewImage,
    },
  };
}

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
        {/* GTM <noscript> — must be the first thing inside <body> */}
        <GoogleTagManagerNoScript />

        {/* GTM loader + SPA pageview tracking (afterInteractive) */}
        <GoogleTagManager />

        {children}
      </body>
    </html>
  );
}
