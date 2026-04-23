import HeroSection from "@/components/sections/HeroSection";
import StatsSection from "@/components/sections/StatsSection";
import HowItWorks from "@/components/sections/HowItWorks";
import FeaturedCounselors from "@/components/sections/FeaturedCounselors";
import ServicesOverview from "@/components/sections/ServicesOverview";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import CTABanner from "@/components/sections/CTABanner";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <ServicesOverview />
      <HowItWorks />
      <FeaturedCounselors />
      <TestimonialsSection />
      <CTABanner />
    </>
  );
}
