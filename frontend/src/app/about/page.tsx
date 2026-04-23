import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Us | The Counselors Cafe — Our Story & Mission",
  description: "Learn about The Counselors Cafe — India's most trusted career counselling platform. Founded in 2020 to end career confusion for Indian students. Meet our team of verified expert counselors.",
  keywords: [
    "about the counselors cafe",
    "career counselling platform India",
    "career guidance mission",
    "verified career counselors India",
    "counselors cafe story",
    "best career counselling platform",
  ],
  alternates: {
    canonical: "https://thecounselorscafe.com/about",
  },
  openGraph: {
    title: "About The Counselors Cafe | Our Mission to End Career Confusion",
    description: "Founded in 2020, we've helped 8,500+ students find career clarity. Meet our team of 120+ verified expert counselors across India.",
    url: "https://thecounselorscafe.com/about",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
};

export default function AboutPage() {
  return <AboutClient />;
}