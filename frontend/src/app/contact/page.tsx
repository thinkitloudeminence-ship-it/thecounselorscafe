import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Us | The Counselors Cafe — Get in Touch",
  description: "Contact The Counselors Cafe for career counselling enquiries, school partnerships, or support. Email us at hello@thecounselorscafe.com or fill our contact form. We respond within 24 hours.",
  keywords: [
    "contact counselors cafe",
    "career counselling enquiry",
    "book career counselling session",
    "counselors cafe support",
    "career guidance contact India",
  ],
  alternates: {
    canonical: "https://thecounselorscafe.com/contact",
  },
  openGraph: {
    title: "Contact The Counselors Cafe | Career Counselling Enquiries",
    description: "Get in touch with our team for career counselling queries, partnerships, or support. Response within 24 hours.",
    url: "https://thecounselorscafe.com/contact",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
};

export default function ContactPage() {
  return <ContactClient />;
}