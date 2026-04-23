import type { Metadata } from "next";
import BlogClient from "./BlogClient";

export const metadata: Metadata = {
  title: "Career Guidance Blog | Expert Articles on Careers, Exams & Study Abroad",
  description: "Read expert articles on stream selection, career paths, study abroad, CUET, JEE, NEET, MBA & more. Written by verified career counselors at The Counselors Cafe.",
  keywords: [
    "career guidance blog India",
    "CUET 2026 guide",
    "study abroad tips India",
    "stream selection after 10th",
    "JEE preparation strategy",
    "career options after 12th",
    "MBA vs job India",
    "career counselling articles",
    "student career blog India",
  ],
  alternates: {
    canonical: "https://thecounselorscafe.com/blog",
  },
  openGraph: {
    title: "Career Guidance Blog | The Counselors Cafe",
    description: "Expert articles on CUET, JEE, study abroad, stream selection & career planning — written by verified counselors.",
    url: "https://thecounselorscafe.com/blog",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
};

export default function BlogPage() {
  return <BlogClient />;
}