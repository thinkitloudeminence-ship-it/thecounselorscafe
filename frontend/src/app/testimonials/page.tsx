import type { Metadata } from "next";
import TestimonialsClient from "./TestimonialsClient";

export const metadata: Metadata = {
  title: "Student Reviews & Testimonials | The Counselors Cafe",
  description: "Read real success stories from 8,500+ students who got career clarity with The Counselors Cafe. Verified reviews from students across India — stream selection, study abroad, JEE, CUET, MBA & resume counselling.",
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
    canonical: "https://thecounselorscafe.com/testimonials",
  },
  openGraph: {
    title: "Real Student Reviews | The Counselors Cafe",
    description: "8,500+ students found career clarity. Read verified reviews from students guided by our expert counselors.",
    url: "https://thecounselorscafe.com/testimonials",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
};

export default function TestimonialsPage() {
  return <TestimonialsClient />;
}