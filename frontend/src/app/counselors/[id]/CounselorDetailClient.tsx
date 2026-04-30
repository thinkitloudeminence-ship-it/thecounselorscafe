"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Star, Users, Mail, MapPin, Calendar, Clock } from "lucide-react";

const fallbackCounselors: Record<string, any> = {
  "1": { _id: "1", name: "Dr. Priya Sharma", title: "Career & Stream Selection Expert", experience: 8, rating: 4.9, reviews: 342, image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop", available: true, sessionsCompleted: 1200, email: "priya.sharma@counselorscafe.com", location: "New Delhi, India", bio: "Dr. Priya Sharma has over 8 years of experience in career counselling." },
  "2": { _id: "2", name: "Rahul Mehta", title: "Abroad Education Specialist", experience: 6, rating: 4.8, reviews: 218, image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop", available: true, sessionsCompleted: 890, email: "rahul.mehta@counselorscafe.com", location: "Mumbai, India", bio: "Rahul Mehta specializes in study abroad guidance." },
  "3": { _id: "3", name: "Anjali Verma", title: "Resume & Interview Coach", experience: 5, rating: 4.7, reviews: 187, image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop", available: true, sessionsCompleted: 650, email: "anjali.verma@counselorscafe.com", location: "Bangalore, India", bio: "Anjali Verma is an expert resume writer and interview coach." },
  "4": { _id: "4", name: "Vikram Nair", title: "Engineering & Tech Career Expert", experience: 10, rating: 4.9, reviews: 421, image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop", available: true, sessionsCompleted: 1800, email: "vikram.nair@counselorscafe.com", location: "Pune, India", bio: "Vikram Nair is an engineering career expert." },
  "5": { _id: "5", name: "Meera Pillai", title: "Arts & Humanities Specialist", experience: 7, rating: 4.8, reviews: 156, image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop", available: true, sessionsCompleted: 780, email: "meera.pillai@counselorscafe.com", location: "Kochi, India", bio: "Meera Pillai specializes in arts and humanities." },
  "6": { _id: "6", name: "Arjun Kapoor", title: "Commerce & Finance Career Expert", experience: 9, rating: 4.9, reviews: 293, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop", available: false, sessionsCompleted: 1100, email: "arjun.kapoor@counselorscafe.com", location: "Mumbai, India", bio: "Arjun Kapoor is a finance career expert." },
};

export default function CounselorDetailClient({ id }: { id: string }) {
  const router = useRouter();
  const [counselor, setCounselor] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (fallbackCounselors[id]) {
      setCounselor(fallbackCounselors[id]);
    } else {
      setCounselor(fallbackCounselors["1"]);
    }
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-black">
        <div className="w-10 h-10 border-3 border-amber-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!counselor) {
    return (
      <div className="min-h-screen pt-20 flex flex-col items-center justify-center gap-4 bg-black">
        <p className="text-gray-400">Counselor not found</p>
        <button onClick={() => router.push("/counselors")} className="bg-amber-500 text-black px-6 py-3 rounded-xl">
          Browse All Counselors
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="container mx-auto px-4 py-8">
        <button 
          onClick={() => router.push("/counselors")}
          className="inline-flex items-center gap-2 text-gray-400 hover:text-amber-400 mb-6 transition-colors cursor-pointer bg-transparent border-0"
        >
          ← Back to Counselors
        </button>

        <div className="bg-black/40 backdrop-blur-sm rounded-3xl border border-white/10 p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-amber-500 flex-shrink-0">
              <Image src={counselor.image} alt={counselor.name} width={128} height={128} className="object-cover" />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold text-white">{counselor.name}</h1>
              <p className="text-amber-500 text-sm mt-1">{counselor.title}</p>
              <div className="flex flex-wrap items-center gap-4 mt-3">
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span className="text-white font-bold">{counselor.rating}</span>
                  <span className="text-gray-500">({counselor.reviews} reviews)</span>
                </span>
                <span className="flex items-center gap-1 text-gray-400">
                  <Users className="w-4 h-4 text-amber-500" />
                  {counselor.sessionsCompleted}+ sessions
                </span>
                <span className="flex items-center gap-1 text-gray-400">
                  <Calendar className="w-4 h-4 text-amber-500" />
                  {counselor.experience}+ years exp.
                </span>
              </div>
              {counselor.available ? (
                <span className="inline-flex items-center gap-1.5 bg-green-500/10 text-green-400 text-xs font-semibold px-3 py-1 rounded-full mt-3">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" /> Available
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 bg-gray-500/10 text-gray-400 text-xs font-semibold px-3 py-1 rounded-full mt-3">
                  <span className="w-1.5 h-1.5 bg-gray-500 rounded-full" /> Busy
                </span>
              )}
            </div>
          </div>

          <div className="mt-6">
            <h2 className="font-bold text-white text-lg mb-2">About {counselor.name.split(" ")[0]}</h2>
          <p className="text-gray-400 leading-relaxed">{counselor.bio}</p>
          </div>

          <div className="mt-6 pt-6 border-t border-white/10">
            <h3 className="text-white font-semibold mb-3">Contact Information</h3>
            <div className="space-y-2">
              <p className="text-gray-400">📧 {counselor.email}</p>
              <p className="text-gray-400">📍 {counselor.location}</p>
              <p className="text-gray-400">⏱ {counselor.experience}+ years experience</p>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-white/10">
            <h3 className="text-white font-semibold text-sm mb-3">How to Book?</h3>
            <div className="space-y-1 text-sm text-gray-400">
              <p>📱 Download our app to book sessions with {counselor.name.split(" ")[0]}</p>
              <p>✅ Check real-time availability</p>
              <p>💬 Chat directly with counselor</p>
              <p>🎥 Video session available</p>
            </div>
            <div className="mt-4">
              <button
                onClick={() => router.push("/download-app")}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold py-3 rounded-xl hover:shadow-lg hover:shadow-amber-500/25 transition-all duration-300"
              >
                Download App to Book Session
              </button>
            </div>
            <p className="text-center text-xs text-gray-500 mt-3">🔒 Secure • Verified Counselor</p>
          </div>
        </div>
      </div>
    </div>
  );
}