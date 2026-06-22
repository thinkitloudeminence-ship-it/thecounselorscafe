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
    default: "counselors cafe | India's #1 Career Counselling Platform",
    template: "%s | counselors cafe",
  },
  description: "India's most trusted career counselling platform. Get expert 1-on-1 guidance for stream selection, study abroad, CUET, JEE, NEET, MBA, resume prep & career planning. 8,500+ students guided. Book a session today.",
  keywords: [
    "career counselling India",
    "career counselor online",
    "stream selection after 10th",
    "stream selection after 12th",
    "study abroad guidance India",
    "CUET counselling",
    "JEE guidance counsellor",
    "NEET career guidance",
    "MBA counselling India",
    "resume building India",
    "interview preparation",
    "career guidance for students",
    "online career counselor",
    "career counselling Bhopal",
    "best career counsellor India",
    "psychometric test India",
    "career after 10th class",
    "career after 12th class",
    "thecounselorscafe",
    "counselors cafe",
  ],
  authors: [{ name: "counselors cafe", url: "https://counselorscafe.com" }],
  creator: "counselors cafe",
  publisher: "counselors cafe",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://counselorscafe.com",
    siteName: "counselors cafe",
    title: "counselors cafe | India's #1 Career Counselling Platform",
    description: "Get expert career guidance from verified counselors. Stream selection, study abroad, CUET, JEE, resume prep & more. 8,500+ students guided.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "counselors cafe - Career Counselling Platform India",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "counselors cafe | Career Counselling Platform",
    description: "Expert career guidance for Indian students. Stream selection, study abroad, CUET, JEE & more. Book a session today!",
    images: ["/og-image.jpg"],
    creator: "@counselorscafe",
    site: "@counselorscafe",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "CC3U2Ynj4CajtpTWcj4KM-nPfF_hP5GhvtRzH5vffUU",
  },
   alternates: {
    canonical: "https://counselorscafe.com",
    languages: {
      'en-IN': 'https://counselorscafe.com',
    },
  },
  category: "education",
  classification: "Career Counselling, Education, Student Guidance",
};

export const viewport: Viewport = {
  themeColor: "#EAB308",
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
        <link rel="manifest" href="/manifest.json" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-NJSNB7CS');`
          }}
        />
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-E79YGEBVTK" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-E79YGEBVTK');`
          }}
        />
      </head>
      <body className="font-body antialiased" suppressHydrationWarning>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NJSNB7CS"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
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