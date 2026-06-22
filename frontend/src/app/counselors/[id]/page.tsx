import type { Metadata } from "next";
import CounselorDetailClient from "./CounselorDetailClient";

// Fallback data for metadata
const fallbackCounselors: Record<string, any> = {
  "1": { name: "Dr. Priya Sharma", title: "Career & Stream Selection Expert", experience: 8, rating: 4.9, reviews: 342 },
  "2": { name: "Rahul Mehta", title: "Abroad Education Specialist", experience: 6, rating: 4.8, reviews: 218 },
  "3": { name: "Anjali Verma", title: "Resume & Interview Coach", experience: 5, rating: 4.7, reviews: 187 },
  "4": { name: "Vikram Nair", title: "Engineering & Tech Career Expert", experience: 10, rating: 4.9, reviews: 421 },
  "5": { name: "Meera Pillai", title: "Arts & Humanities Specialist", experience: 7, rating: 4.8, reviews: 156 },
  "6": { name: "Arjun Kapoor", title: "Commerce & Finance Career Expert", experience: 9, rating: 4.9, reviews: 293 },
};

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {
  const { id } = await params;
  const c = fallbackCounselors[id];
  
  if (c) {
    return {
      title: `${c.name} — ${c.title} | counselors cafe`,
      description: `Book a session with ${c.name}, a verified career counselor with ${c.experience}+ years of experience. ${c.rating}★ rating from ${c.reviews}+ reviews.`,
    };
  }
  
  return {
    title: "Career Counselor Profile | counselors cafe",
    description: "Book a 1-on-1 session with a verified career counselor.",
  };
}

export default async function CounselorDetailPage({ 
  params 
}: { 
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  return <CounselorDetailClient id={id} />;
}