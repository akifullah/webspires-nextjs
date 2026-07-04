import Script from "next/script";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import { getSettings } from "@/lib/settings";
import { socialList } from "@/lib/settingsSchema";

export default async function SiteLayout({ children }) {
  const settings = await getSettings();

  const sameAs = socialList(settings).map((s) => s.href);
  const logoAbs = "https://webspires.co.uk/images/webspires-logo-icon.png";
  const address = {
    "@type": "PostalAddress",
    streetAddress: settings.addressStreet,
    addressLocality: settings.addressLocality,
    postalCode: settings.addressPostalCode,
    addressCountry: settings.addressCountry,
  };

  /* ── JSON-LD Structured Data (fed by site settings) ─────── */
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Webspires Limited",
    url: "https://webspires.co.uk",
    logo: logoAbs,
    image: logoAbs,
    description:
      "UK's leading web design and digital marketing agency delivering high-performance websites, SEO, Google Ads, Meta Ads and social media services.",
    address,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: settings.phone,
      email: settings.email,
      contactType: "customer support",
      availableLanguage: ["English"],
    },
    sameAs,
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
    name: settings.siteName || "Webspires",
    url: "https://webspires.co.uk",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://webspires.co.uk/?s={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://webspires.co.uk/#localbusiness",
    name: "Webspires Limited",
    image: logoAbs,
    url: "https://webspires.co.uk",
    telephone: settings.phone,
    email: settings.email,
    priceRange: "££",
    address,
    areaServed: "GB",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    sameAs,
  };

  return (
    <>
      {/* Inline JSON-LD safe in body, crawlers read it fine */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webSiteSchema).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema).replace(/</g, "\\u003c"),
        }}
      />

      {/* Skip-to-content for keyboard / screen-reader users */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <Header settings={settings} />
      <main id="main-content" className="flex flex-col flex-1">
        {children}
      </main>
      <Footer settings={settings} />

      {/* Smartlook session recording (EU region) — public site only, not admin.
          NOTE: id must NOT be "smartlook" — an element id becomes window[id],
          which would shadow the snippet's `window.smartlook` guard and stop the
          recorder from ever loading. */}
      <Script id="smartlook-loader" strategy="afterInteractive">
        {`
          window.smartlook||(function(d) {
            var o=smartlook=function(){ o.api.push(arguments)},h=d.getElementsByTagName('head')[0];
            var c=d.createElement('script');o.api=new Array();c.async=true;c.type='text/javascript';
            c.charset='utf-8';c.src='https://web-sdk.smartlook.com/recorder.js';h.appendChild(c);
            })(document);
            smartlook('init', 'd9766f213289b0be8e8908cd87828726993964ef', { region: 'eu' });
        `}
      </Script>
    </>
  );
}
