import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Us | counselors cafe — Our Story & Mission",
  description: "Learn about counselors cafe — India's most trusted career counselling platform. Founded in 2020 to end career confusion for Indian students. Meet our team of verified expert counselors.",
  keywords: [
    "about cd ",
    "career counselling platform India",
    "career guidance mission",
    "verified career counselors India",
    "counselors cafe story",
    "best career counselling platform",
  ],
 alternates: {
    canonical: "https://counselorscafe.com/about",  // ✅ ADD THIS
  },
  openGraph: {
    title: "About counselors cafe | Our Mission to End Career Confusion",
    description: "Founded in 2020, we've helped 8,500+ students find career clarity. Meet our team of 120+ verified expert counselors across India.",
    url: "https://counselorscafe.com/about",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
};

export default function AboutPage() {
  return <AboutClient />;
}