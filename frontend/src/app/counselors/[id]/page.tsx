import type { Metadata } from "next";
import CounselorDetailClient from "../CounselorsClient";

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> }  // ✅ Promise type
): Promise<Metadata> {
  const { id } = await params;  // ✅ await params
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
    const res = await fetch(`${apiUrl}/counselors/${id}`, {
      next: { revalidate: 3600 },
    });
    
    if (!res.ok) throw new Error("Counselor not found");
    const data = await res.json();
    const c = data.data || data;

    const title = `${c.name} — ${c.title || "Career Counselor"}`;
    const description = `Book a session with ${c.name}, a verified career counselor at counselors cafe with ${c.experience}+ years of experience in ${(c.expertise || []).slice(0, 3).join(", ")}. ${c.rating}★ rating from ${c.reviews}+ reviews.`;

    return {
      title: `${title} | counselors cafe`,
      description,
      keywords: [
        c.name,
        ...(c.expertise || []),
        "career counselor",
        "book career counselling",
        "counselors cafe",
      ],
      alternates: {
        canonical: `https://counselorscafe.com/counselors/${id}`,
      },
      openGraph: {
        title: `${title} | counselors cafe`,
        description,
        url: `https://counselorscafe.com/counselors/${id}`,
        images: [
          {
            url: c.image || "/og-image.jpg",
            width: 800,
            height: 600,
            alt: c.name,
          },
        ],
      },
    };
  } catch {
    return {
      title: "Career Counselor Profile | counselors cafe",
      description: "Book a 1-on-1 session with a verified career counselor at counselors cafe.",
      alternates: {
        canonical: `https://counselorscafe.com/counselors/${id}`,
      },
    };
  }
}

export default async function CounselorDetailPage({ 
  params 
}: { 
  params: Promise<{ id: string }>  // ✅ Promise type
}) {
  const { id } = await params;  // ✅ await params
  return <CounselorDetailClient id={id} />;
}