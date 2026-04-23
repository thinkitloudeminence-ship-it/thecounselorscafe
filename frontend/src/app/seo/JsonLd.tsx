"use client";
import { useEffect, useState } from "react";

export default function JsonLd() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "CounselorsCafe",
    url: "https://counselorscafe.com",
    logo: "https://counselorscafe.com/logo.png",
    sameAs: [
      "https://instagram.com/counselorscafe",
      "https://youtube.com/@counselorscafe",
      "https://twitter.com/counselorscafe",
      "https://linkedin.com/company/counselorscafe",
    ],
    description: "India's most trusted career counselling platform connecting students with verified expert counselors.",
    email: "hello@counselorscafe.com",
    telephone: "+919876543210",
    address: {
      "@type": "PostalAddress",
      addressLocality: "New Delhi",
      addressCountry: "IN",
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: "https://counselorscafe.com",
    name: "CounselorsCafe",
    description: "Career counselling platform for Indian students",
    potentialAction: {
      "@type": "SearchAction",
      "target": "https://counselorscafe.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "CounselorsCafe",
    image: "https://counselorscafe.com/logo.png",
    "@id": "https://counselorscafe.com",
    url: "https://counselorscafe.com",
    telephone: "+919876543210",
    priceRange: "₹",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Connaught Place",
      addressLocality: "New Delhi",
      postalCode: "110001",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 28.6139,
      longitude: 77.2090,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "20:00",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        suppressHydrationWarning
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        suppressHydrationWarning
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        suppressHydrationWarning
      />
    </>
  );
}