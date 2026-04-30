import type { Metadata } from "next";
import ServicesClient from "./ServicesClient";

export const metadata: Metadata = {
  title: "Career Counselling Services | Stream Selection, Study Abroad & More",
  description: "Explore 18+ expert career counselling services at counselors cafe — stream selection, career guidance, study abroad, CUET/JEE/NEET prep, resume building, MBA counselling, government exams & more. Personalized 1-on-1 sessions.",
  keywords: [
    "career counselling services India",
    "stream selection service",
    "study abroad guidance service",
    "CUET preparation service",
    "JEE guidance service",
    "resume building service India",
    "MBA counselling service",
    "government exam guidance",
    "career guidance service students",
    "interview preparation service",
    "psychometric assessment India",
    "college selection guidance",
  ],
  alternates: {
    canonical: "https://counselorscafe.com/services",  // ✅ YEH LINE ADD KARO
  },
  openGraph: {
    title: "18+ Career Counselling Services | counselors cafe",
    description: "Expert career guidance services — stream selection, study abroad, CUET, JEE, MBA, resume prep & more. Personalized 1-on-1 sessions with verified counselors.",
    url: "https://counselorscafe.com/services",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
};

export default function ServicesPage() {
  return <ServicesClient />;
}