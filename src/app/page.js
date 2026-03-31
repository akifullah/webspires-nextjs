import Hero from "@/components/sections/Hero";
import ServicesGrid from "@/components/sections/ServicesGrid";
import StatsStrip from "@/components/sections/StatsStrip";
import WhyWebspires from "@/components/sections/WhyWebspires";
import HowItWorks from "@/components/sections/HowItWorks";
import Testimonials from "@/components/sections/Testimonials";
import ContactCTA from "@/components/sections/ContactCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesGrid />
      <StatsStrip />
      <WhyWebspires />
      <HowItWorks />
      <Testimonials />
      <ContactCTA />
    </>
  );
}
