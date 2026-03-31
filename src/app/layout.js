import { Geist } from "next/font/google";
import "./globals.css";
import { generateSEO } from "@/lib/seo";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";

/* ── Fonts ────────────────────────────────────────────────────
   Only load Geist Sans (drop Mono — unused on front end).
   display:swap prevents invisible text during font load (CLS/FID).
*/
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

/* ── Page Metadata (SEO) ────────────────────────────────────── */
export const metadata = {
  ...generateSEO({ path: "/" }),

  // Override title with a keyword-rich homepage title
  title: {
    default:
      "Web Development & Digital Marketing Agency in Pakistan | Webspires",
    template: "%s | Webspires",
  },
  description:
    "Webspires is Pakistan's top-rated web development & digital marketing agency. We build high-performance websites, run ROI-driven SEO & paid ad campaigns that grow your revenue.",

  // Viewport — prevent zoom issues on mobile
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },

  // Canonical & language
  alternates: {
    canonical: "https://webspires.com.pk/",
    languages: { "en-PK": "https://webspires.com.pk/" },
  },

  // Open Graph
  openGraph: {
    type: "website",
    locale: "en_PK",
    url: "https://webspires.com.pk/",
    siteName: "Webspires",
    title: "Web Development & Digital Marketing Agency in Pakistan | Webspires",
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

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "Web Development & Digital Marketing Agency in Pakistan | Webspires",
    description:
      "Pakistan's results-driven digital agency. High-performance websites, SEO & paid campaigns that grow your business.",
    images: ["/images/webspires-logo-icon.png"],
    creator: "@webspires",
  },

  // Robots
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

  // Icons / PWA
  icons: {
    icon: "/favicon.ico",
    apple: "/images/webspires-logo-icon.png",
  },

  // Verification (add real codes when available)
  verification: {
    google: "REPLACE_WITH_GOOGLE_SITE_VERIFICATION",
  },
};

/* ── JSON-LD Structured Data ─────────────────────────────────── */
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

/* ── Root Layout ─────────────────────────────────────────────── */
export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${geistSans.variable} h-full`}
    >
      <head>
        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(webSiteSchema),
          }}
        />
        {/* Preconnect to external origins used by fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-full flex flex-col antialiased">
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
