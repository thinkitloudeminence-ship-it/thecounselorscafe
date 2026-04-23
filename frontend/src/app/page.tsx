import type { Metadata } from "next";
import HeroSection from "@/components/sections/HeroSection";
import StatsSection from "@/components/sections/StatsSection";
import HowItWorks from "@/components/sections/HowItWorks";
import FeaturedCounselors from "@/components/sections/FeaturedCounselors";
import ServicesOverview from "@/components/sections/ServicesOverview";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import CTABanner from "@/components/sections/CTABanner";

export const metadata: Metadata = {
  title: "The Counselors Cafe | India's #1 Career Counselling Platform",
  description: "Get expert 1-on-1 career guidance from verified counselors. Stream selection after 10th & 12th, study abroad, CUET, JEE, NEET, MBA counselling, resume prep & more. 8,500+ students guided across India. Book your session today.",
  keywords: [
    "career counselling India",
    "online career counselor",
    "stream selection counselling",
    "study abroad guidance",
    "CUET preparation counselling",
    "career guidance for students India",
    "best career counsellor",
  ],
  alternates: {
    canonical: "https://thecounselorscafe.com",
  },
  openGraph: {
    title: "The Counselors Cafe | India's #1 Career Counselling Platform",
    description: "Expert 1-on-1 career guidance for Indian students. Stream selection, study abroad, CUET, JEE & more. 8,500+ students helped. Book now!",
    url: "https://thecounselorscafe.com",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
};

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