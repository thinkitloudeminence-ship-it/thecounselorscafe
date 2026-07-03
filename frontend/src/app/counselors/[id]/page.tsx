// app/counselors/[id]/page.tsx
import type { Metadata } from "next";
import CounselorDetailClient from "./CounselorDetailClient";
import { fetchCounselor } from "@/lib/api";

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {
  const { id } = await params;
  
  try {
    const counselor = await fetchCounselor(id);
    if (counselor) {
      return {
        title: `${counselor.name} — ${counselor.title} | counselors cafe`,
        description: counselor.bio || `Book a session with ${counselor.name}, a verified career counselor.`,
      };
    }
  } catch (error) {
    console.error('Error fetching counselor for metadata:', error);
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