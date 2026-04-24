import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Us | counselors cafe — Get in Touch",
  description: "Contact counselors cafe for career counselling enquiries, school partnerships, or support. Email us at hello@counselorscafe.com or fill our contact form. We respond within 24 hours.",
  keywords: [
    "contact counselors cafe",
    "career counselling enquiry",
    "book career counselling session",
    "counselors cafe support",
    "career guidance contact India",
  ],
  alternates: {
    canonical: "https://counselorscafe.com/contact",
  },
  openGraph: {
    title: "Contact counselors cafe | Career Counselling Enquiries",
    description: "Get in touch with our team for career counselling queries, partnerships, or support. Response within 24 hours.",
    url: "https://counselorscafe.com/contact",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
};

export default function ContactPage() {
  return <ContactClient />;
}