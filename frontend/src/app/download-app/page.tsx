import type { Metadata } from "next";
import DownloadAppClient from "./DownloadAppClient";

export const metadata: Metadata = {
  title: "Download counselors cafe App | Career Guidance on Your Phone",
  description: "Download counselors cafe mobile app for iOS & Android. Get personalized career guidance, book sessions with expert counselors, and manage your career journey on the go. Free to download.",
  keywords: [
    "counselors cafe app download",
    "career counselling app India",
    "career guidance app android iOS",
    "download counselors cafe",
    "career counsellor app",
    "student career app India",
    "online counselling app India",
  ],
    alternates: {
    canonical: "https://counselorscafe.com/download-app",  // ✅ ADD THIS
  },

  openGraph: {
    title: "Download counselors cafe App | Career Guidance on Your Phone",
    description: "Book expert career counsellors, track your progress, and get personalized guidance — all from your phone. Free to download.",
    url: "https://counselorscafe.com/download-app",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
};

export default function DownloadAppPage() {
  return <DownloadAppClient />;
}