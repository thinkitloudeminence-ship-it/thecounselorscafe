"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Star, Users, Calendar } from "lucide-react";

export default function CounselorDetailClient({ id }: { id: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [counselor, setCounselor] = useState<any>(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    const fetchCounselor = async () => {
      try {
        setLoading(true);
        // ✅ Full URL use karo
        const res = await fetch(`${API_URL}/counselors/${id}`);
        const data = await res.json();

        if (data.success) {
          setCounselor(data.data);
        } else {
          console.error('Counselor not found:', data.message);
          setCounselor(null);
        }
      } catch (error) {
        console.error('Error fetching counselor:', error);
        setCounselor(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCounselor();
    }
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
          className="inline-flex items-center gap-2 text-gray-400 hover:text-amber-400 mb-6 transition-colors"
        >
          ← Back to Counselors
        </button>

        <div className="bg-black/40 backdrop-blur-sm rounded-3xl border border-white/10 p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-amber-500 flex-shrink-0">
              {counselor.image ? (
                <Image
                  src={counselor.image}
                  alt={counselor.name}
                  width={128}
                  height={128}
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center">
                  <span className="text-black font-bold text-4xl">
                    {counselor.name?.charAt(0) || "C"}
                  </span>
                </div>
              )}
            </div>
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold text-white">{counselor.name}</h1>
              <p className="text-amber-500 text-sm mt-1">{counselor.title}</p>

              <div className="flex flex-wrap items-center gap-4 mt-3">
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span className="text-white font-bold">{counselor.rating || 0}</span>
                  <span className="text-gray-500">({counselor.reviews || 0} reviews)</span>
                </span>
                <span className="flex items-center gap-1 text-gray-400">
                  <Users className="w-4 h-4 text-amber-500" />
                  {counselor.sessionsCompleted || 0}+ sessions
                </span>
                <span className="flex items-center gap-1 text-gray-400">
                  <Calendar className="w-4 h-4 text-amber-500" />
                  {counselor.experience || 0}+ years exp.
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

          {counselor.bio && (
            <div className="mt-6">
              <h2 className="font-bold text-white text-lg mb-2">About {counselor.name?.split(" ")[0]}</h2>
              <p className="text-gray-400 leading-relaxed">{counselor.bio}</p>
            </div>
          )}

          {counselor.expertise && counselor.expertise.length > 0 && (
            <div className="mt-6 pt-6 border-t border-white/10">
              <h3 className="text-white font-semibold mb-3">Areas of Expertise</h3>
              <div className="flex flex-wrap gap-2">
                {counselor.expertise.map((exp: string) => (
                  <span key={exp} className="bg-yellow-500/10 text-yellow-400 text-sm px-3 py-1.5 rounded-full border border-yellow-500/20">
                    {exp}
                  </span>
                ))}
              </div>
            </div>
          )}

          {counselor.languages && counselor.languages.length > 0 && (
            <div className="mt-4">
              <h3 className="text-white font-semibold mb-2">Languages</h3>
              <div className="flex flex-wrap gap-2">
                {counselor.languages.map((lang: string) => (
                  <span key={lang} className="bg-white/5 text-gray-300 text-sm px-3 py-1 rounded-full border border-white/10">
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          )}

          {(counselor.email || counselor.location || counselor.pricePerSession) && (
            <div className="mt-6 pt-6 border-t border-white/10">
              <h3 className="text-white font-semibold mb-3">Contact Information</h3>
              <div className="space-y-2">
                {counselor.email && <p className="text-gray-400">📧 {counselor.email}</p>}
                {counselor.location && <p className="text-gray-400">📍 {counselor.location}</p>}
                {counselor.pricePerSession && (
                  <p className="text-gray-400">💰 ₹{counselor.pricePerSession} per session</p>
                )}
                <p className="text-gray-400">⏱ {counselor.experience || 0}+ years experience</p>
              </div>
            </div>
          )}

          <div className="mt-6 pt-6 border-t border-white/10">
            <button
              onClick={() => router.push("/download-app")}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold py-3 rounded-xl hover:shadow-lg hover:shadow-amber-500/25 transition-all duration-300"
            >
              Download App to Book Session
            </button>
            <p className="text-center text-xs text-gray-500 mt-3">🔒 Secure • Verified Counselor</p>
          </div>
        </div>
      </div>
    </div>
  );
}