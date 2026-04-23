import type { Metadata } from "next";
import CounselorDetailClient from "../CounselorsClient";

export async function generateMetadata(
  { params }: { params: { id: string } }
): Promise<Metadata> {
  const { id } = params;
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
    const res = await fetch(`${apiUrl}/counselors/${id}`, {
      next: { revalidate: 3600 },
    });
    
    if (!res.ok) throw new Error("Counselor not found");
    const data = await res.json();
    const c = data.data || data;

    const title = `${c.name} — ${c.title || "Career Counselor"}`;
    const description = `Book a session with ${c.name}, a verified career counselor at The Counselors Cafe with ${c.experience}+ years of experience in ${(c.expertise || []).slice(0, 3).join(", ")}. ${c.rating}★ rating from ${c.reviews}+ reviews.`;

    return {
      title: `${title} | The Counselors Cafe`,
      description,
      keywords: [
        c.name,
        ...(c.expertise || []),
        "career counselor",
        "book career counselling",
        "the counselors cafe",
      ],
      alternates: {
        canonical: `https://thecounselorscafe.com/counselors/${id}`,
      },
      openGraph: {
        title: `${title} | The Counselors Cafe`,
        description,
        url: `https://thecounselorscafe.com/counselors/${id}`,
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
      title: "Career Counselor Profile | The Counselors Cafe",
      description: "Book a 1-on-1 session with a verified career counselor at The Counselors Cafe.",
      alternates: {
        canonical: `https://thecounselorscafe.com/counselors/${id}`,
      },
    };
  }
}

export default function CounselorDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  return <CounselorDetailClient id={id} />;
}