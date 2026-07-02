import { Geist, JetBrains_Mono } from "next/font/google";
import "./globals.css";
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
  try {
    const settings = await getSettings();
    siteName = settings.siteName || siteName;
    previewImage = settings.ogImage || previewImage;
  } catch {
    // keep defaults
  }

  const title = "Best Web Design Agency UK | Webspires Limited";
  const description =
    "Looking for the best Web Design Agency UK? Webspires builds websites that help your business grow and stand out online. We offer web development, SEO, social media, Google Ads, Meta Ads & more.";

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
      description:
        "Looking for the best Web Design Agency UK? Webspires builds websites that help your business grow and stand out online.",
      images: [
        {
          url: previewImage,
          width: 1200,
          height: 630,
          alt: `${siteName} – Best Web Design Agency UK`,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description:
        "UK's results-driven digital agency. High-performance websites, SEO & paid campaigns that grow your business.",
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
      icon: "/favicon.ico",
      apple: previewImage,
    },
  };
}

/* ── Root Layout ─────────────────────────────────────────── */
export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="ltr" className={`${geistSans.variable} ${jetbrainsMono.variable} h-full`}>
      <body
        className="min-h-full flex flex-col antialiased"
        cz-shortcut-listen="true"
      >
        {children}
      </body>
    </html>
  );
}
