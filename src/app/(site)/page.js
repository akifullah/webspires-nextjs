import { siteConfig } from "@/config/site";
import Hero from "@/components/sections/Hero";
import ResultsSnapshot from "@/components/sections/ResultsSnapshot";
import ProblemPain from "@/components/sections/ProblemPain";
import ServicesGrid from "@/components/sections/ServicesGrid";
import WhatYouGet from "@/components/sections/WhatYouGet";
import GrowthMethod from "@/components/sections/GrowthMethod";
import Portfolio from "@/components/sections/Portfolio";
import HowItWorks from "@/components/sections/HowItWorks";
import IndustrySolutions from "@/components/sections/IndustrySolutions";
import ReportingTransparency from "@/components/sections/ReportingTransparency";
import WhyWebspires from "@/components/sections/WhyWebspires";
import TeamTools from "@/components/sections/TeamTools";
import Testimonials from "@/components/sections/Testimonials";
import UkServiceArea from "@/components/sections/UkServiceArea";
import FaqHome from "@/components/sections/FaqHome";
import ContactCTA from "@/components/sections/ContactCTA";
import { getContentItems } from "@/lib/content";

export const revalidate = false;

const title =
  "Digital Marketing Agency UK | SEO, Ads & Web | Webspires";
const description =
  "UK digital marketing agency. SEO, GEO, Google Ads and web design that get you found in Google and AI search. Transparent pricing, no lock-in.";

export const metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: `${siteConfig.url}/` },
  openGraph: {
    type: "website",
    url: `${siteConfig.url}/`,
    siteName: siteConfig.name,
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    creator: siteConfig.twitter,
  },
};

export default async function Home() {
  const homeFaqs = await getContentItems("homeFaqs");
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: homeFaqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqLd).replace(/</g, "\\u003c"),
        }}
      />

      {/* 2 Hero (3 trust/review bar is built into Hero) */}
      <Hero />
      {/* 4 Results snapshot */}
      <ResultsSnapshot />
      {/* 5 Problem / pain */}
      <ProblemPain />
      {/* 6 Services overview */}
      <ServicesGrid />
      {/* 7 What you get with us */}
      <WhatYouGet />
      {/* 8 Digital Growth Audit Framework */}
      <GrowthMethod />
      {/* 9 Portfolio / case studies */}
      <Portfolio />
      {/* 10 Process */}
      <HowItWorks />
      {/* 11 Industries we serve */}
      <IndustrySolutions />
      {/* 12 Reporting & dashboards */}
      <ReportingTransparency />
      {/* 13 About / why / team & tools */}
      <WhyWebspires />
      <TeamTools />
      {/* 14 Testimonials */}
      <Testimonials />
      {/* 15 UK service area */}
      <UkServiceArea />
      {/* 16 FAQ */}
      <FaqHome faqs={homeFaqs} />
      {/* 18 Final CTA / free audit */}
      <ContactCTA />
    </>
  );
}
