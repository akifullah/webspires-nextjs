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
      "Web Development & Digital Marketing Agency in Pakistan | Webspires",
    template: "%s | Webspires",
  },
  description:
    "Webspires is Pakistan's top-rated web development & digital marketing agency. We build high-performance websites, run ROI-driven SEO & paid ad campaigns that grow your revenue.",

  alternates: {
    canonical: "https://webspires.com.pk/",
    languages: { "en-PK": "https://webspires.com.pk/" },
  },

  openGraph: {
    type: "website",
    locale: "en_PK",
    url: "https://webspires.com.pk/",
    siteName: "Webspires",
    title:
      "Web Development & Digital Marketing Agency in Pakistan | Webspires",
    description:
      "Webspires is Pakistan's top-rated web development & digital marketing agency. We build high-performance websites, run ROI-driven SEO & paid ad campaigns.",
    images: [
      {
        url: "/images/webspires-logo-icon.png",
        width: 1200,
        height: 630,
        alt: "Webspires – Web Development & Digital Marketing Agency Pakistan",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title:
      "Web Development & Digital Marketing Agency in Pakistan | Webspires",
    description:
      "Pakistan's results-driven digital agency. High-performance websites, SEO & paid campaigns that grow your business.",
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
  name: "Webspires",
  url: "https://webspires.com.pk",
  logo: "https://webspires.com.pk/images/webspires-logo-icon.png",
  image: "https://webspires.com.pk/images/webspires-logo-icon.png",
  description:
    "Pakistan's top-rated web development and digital marketing agency delivering high-performance websites, SEO and paid ad services.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lahore",
    addressRegion: "Punjab",
    addressCountry: "PK",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+92-300-0000000",
    contactType: "customer support",
    availableLanguage: ["English", "Urdu"],
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
    reviewCount: "80",
  },
};

const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Webspires",
  url: "https://webspires.com.pk",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://webspires.com.pk/?s={search_term_string}",
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
