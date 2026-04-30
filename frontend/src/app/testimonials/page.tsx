import type { Metadata } from "next";
import TestimonialsClient from "./TestimonialsClient";

export const metadata: Metadata = {
  title: "Student Reviews & Testimonials | counselors cafe",
  description: "Read real success stories from 8,500+ students who got career clarity with counselors cafe. Verified reviews from students across India — stream selection, study abroad, JEE, CUET, MBA & resume counselling.",
  keywords: [
    "counselors cafe reviews",
    "career counselling testimonials India",
    "student success stories career",
    "career counsellor reviews India",
    "counselors cafe student feedback",
    "best career counselling reviews",
    "career guidance success stories",
  ],
  alternates: {
    canonical: "https://counselorscafe.com/testimonials",  // ✅ ADD THIS
  },
  openGraph: {
    title: "Real Student Reviews | counselors cafe",
    description: "8,500+ students found career clarity. Read verified reviews from students guided by our expert counselors.",
    url: "https://counselorscafe.com/testimonials",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
};

export default function TestimonialsPage() {
  return <TestimonialsClient />;
}