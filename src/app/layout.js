import { Geist } from "next/font/google";
import "./globals.css";
import { generateSEO } from "@/lib/seo";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";

/* ── Fonts ─────────────────────────────────────────────── */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
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
    default:
      "Best Web Design Agency UK | Webspires Limited",
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
    title:
      "Best Web Design Agency UK | Webspires Limited",
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
    title:
      "Best Web Design Agency UK | Webspires Limited",
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

/* ── JSON-LD Structured Data ────────────────────────────── */
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Webspires Limited",
  url: "https://webspires.co.uk",
  logo: "https://webspires.co.uk/images/webspires-logo-icon.png",
  image: "https://webspires.co.uk/images/webspires-logo-icon.png",
  description:
    "UK's leading web design and digital marketing agency delivering high-performance websites, SEO, Google Ads, Meta Ads and social media services.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "39A Manchester Rd",
    addressLocality: "Bolton",
    postalCode: "BL3 2NZ",
    addressCountry: "GB",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+44-161-524-1569",
    contactType: "customer support",
    availableLanguage: ["English"],
  },
  sameAs: [
    "https://facebook.com/webspires",
    "https://instagram.com/webspires",
    "https://linkedin.com/company/webspires",
    "https://twitter.com/webspires",
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5",
    bestRating: "5",
    worstRating: "1",
    reviewCount: "45",
  },
};

const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Webspires",
  url: "https://webspires.co.uk",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://webspires.co.uk/?s={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

/* ── Root Layout ─────────────────────────────────────────── */
export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${geistSans.variable} h-full`}
    >
      {/*
        Do NOT add a manual <head> tag here.
        Next.js App Router manages <head> automatically via the metadata export.
        JSON-LD scripts are injected via dangerouslySetInnerHTML on the body instead,
        or via a server component rendered inside <body>.
      */}
      <body className="min-h-full flex flex-col antialiased">
        {/* Inline JSON-LD — safe in body, crawlers read it fine */}
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(webSiteSchema),
          }}
        />

        {/* Skip-to-content for keyboard / screen-reader users */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        <Header />
        <main id="main-content" className="flex flex-col flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
