import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Toaster } from "react-hot-toast";
import PerformanceOptimizer from "@/components/PerformanceOptimizer";
import JsonLd from "@/app/seo/JsonLd";

export const metadata: Metadata = {
  metadataBase: new URL('https://counselorscafe.com'),
  title: {
    default: "CounselorsCafe | India's Most Trusted Career Counselling Platform",
    template: "%s | CounselorsCafe",
  },
  description: "Get expert career guidance from verified counselors. Stream selection, study abroad, CUET, JEE, NEET, resume prep & more. Book a session today. 50,000+ students helped.",
  keywords: [
    "career counselling India",   
    "CUET guidance",
    "study abroad",
    "stream selection class 10 12",
    "career counselor",
    "JEE guidance",
    "NEET guidance",
    "MBA counselling",
    "resume building",
    "interview preparation",
    "psychometric test",
  ],
  authors: [{ name: "CounselorsCafe", url: "https://counselorscafe.com" }],
  creator: "CounselorsCafe",
  publisher: "CounselorsCafe",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://counselorscafe.com",
    siteName: "CounselorsCafe",
    title: "CounselorsCafe | Career Counselling for Indian Students",
    description: "Get expert career guidance from verified counselors. Stream selection, abroad education, resume prep & more.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "CounselorsCafe - Career Counselling Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CounselorsCafe | Career Counselling Platform",
    description: "Get expert career guidance from verified counselors. Book a session today!",
    images: ["/og-image.jpg"],
    creator: "@counselorscafe",
    site: "@counselorscafe",
  },
  robots: {
    index: true,   // ❌ index OFF
    follow: true,  // ❌ links follow OFF
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
  alternates: {
    canonical: "https://counselorscafe.com",
  },
  category: "education",
};

export const viewport: Viewport = {
  themeColor: "#EAB308",  // ✅ Already hai, duplicate mat karo
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* ✅ BAS YEH EK LINE ADD KARO */}
        <link rel="manifest" href="/manifest.json" />
        
        {/* Existing preconnect links */}
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className="font-body antialiased" suppressHydrationWarning>
        <JsonLd />
        <PerformanceOptimizer />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#1A1A1A",
              color: "#fff",
              borderRadius: "12px",
              border: "1px solid rgba(234,179,8,0.3)",
            },
            success: { iconTheme: { primary: "#EAB308", secondary: "#fff" } },
          }}
        />
      </body>
    </html>
  );
}