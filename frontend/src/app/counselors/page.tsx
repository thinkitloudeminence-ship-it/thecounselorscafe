import type { Metadata } from "next";
import CounselorsClient from "./CounselorsClient";

export const metadata: Metadata = {
  title: "Find Career Counselors | 120+ Verified Experts | The Counselors Cafe",
  description: "Browse 120+ verified career counselors on The Counselors Cafe. Filter by expertise — stream selection, study abroad, CUET, JEE, MBA, resume prep & more. Book a 1-on-1 session today. Starts from ₹599.",
  keywords: [
    "career counselors India",
    "verified career counselor",
    "online career counsellor",
    "stream selection expert",
    "study abroad counselor India",
    "CUET counsellor",
    "JEE guidance expert",
    "MBA counsellor India",
    "resume expert India",
    "book career counselling session",
    "best career counselor India",
    "career guidance expert",
  ],
  alternates: {
    canonical: "https://thecounselorscafe.com/counselors",
  },
  openGraph: {
    title: "Find Verified Career Counselors | The Counselors Cafe",
    description: "Browse 120+ verified career counselors. Expert guidance for stream selection, study abroad, CUET, JEE & more. Book now!",
    url: "https://thecounselorscafe.com/counselors",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
};

export default function CounselorsPage() {
  return <CounselorsClient id={""} />;  // ✅ Remove id prop
}