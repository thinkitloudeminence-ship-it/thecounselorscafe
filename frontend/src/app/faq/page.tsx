import type { Metadata } from "next";
import FAQClient from "./FAQClient";

export const metadata: Metadata = {
  title: "FAQ | Career Counselling Questions Answered | The Counselors Cafe",
  description: "Answers to frequently asked questions about The Counselors Cafe — how sessions work, pricing, booking process, counselor verification, refund policy, and more. Get all your doubts cleared.",
  keywords: [
    "career counselling FAQ",
    "counselors cafe questions",
    "how to book career counselling",
    "career counselling cost India",
    "online counselling session how it works",
    "career counsellor booking process",
    "counselling refund policy",
    "verified counselor FAQ",
  ],
  alternates: {
    canonical: "https://thecounselorscafe.com/faq",
  },
  openGraph: {
    title: "FAQ | The Counselors Cafe — Your Questions Answered",
    description: "Everything you need to know about career counselling sessions, pricing, booking, and our counselor verification process.",
    url: "https://thecounselorscafe.com/faq",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
};

export default function FAQPage() {
  return <FAQClient />;
}