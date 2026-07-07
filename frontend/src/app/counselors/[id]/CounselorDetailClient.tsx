"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Star, Users, Calendar, Phone, MessageCircle, Clock } from "lucide-react";

export default function CounselorDetailClient({ id }: { id: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [counselor, setCounselor] = useState<any>(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    const fetchCounselor = async () => {
      try {
        setLoading(true);
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
      <div className="min-h-screen pt-20 flex items-center justify-center bg-white">
        <div className="w-10 h-10 border-3 border-amber-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!counselor) {
    return (
      <div className="min-h-screen pt-20 flex flex-col items-center justify-center gap-4 bg-white">
        <p className="text-gray-500">Counselor not found</p>
        <button onClick={() => router.push("/counselors")} className="bg-amber-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-amber-600 transition-colors">
          Browse All Counselors
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => router.push("/counselors")}
          className="inline-flex items-center gap-2 text-gray-500 hover:text-amber-500 mb-6 transition-colors"
        >
          ← Back to Counselors
        </button>

        <div className="bg-white rounded-3xl border border-gray-200 p-6 md:p-8 shadow-lg">
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
                <div className="w-full h-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
                  <span className="text-white font-bold text-4xl">
                    {counselor.name?.charAt(0) || "C"}
                  </span>
                </div>
              )}
            </div>
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{counselor.name}</h1>
              <p className="text-amber-500 text-sm mt-1">{counselor.title}</p>

              <div className="flex flex-wrap items-center gap-4 mt-3">
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span className="text-gray-900 font-bold">{counselor.rating || 0}</span>
                  <span className="text-gray-400">({counselor.reviews || 0} reviews)</span>
                </span>
                <span className="flex items-center gap-1 text-gray-500">
                  <Users className="w-4 h-4 text-amber-500" />
                  {counselor.sessionsCompleted || 0}+ sessions
                </span>
                <span className="flex items-center gap-1 text-gray-500">
                  <Calendar className="w-4 h-4 text-amber-500" />
                  {counselor.experience || 0}+ years exp.
                </span>
              </div>

              {counselor.available ? (
                <span className="inline-flex items-center gap-1.5 bg-green-50 text-green-600 text-xs font-semibold px-3 py-1 rounded-full mt-3 border border-green-200">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" /> Available
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-500 text-xs font-semibold px-3 py-1 rounded-full mt-3 border border-gray-200">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full" /> Busy
                </span>
              )}
            </div>
          </div>

          {counselor.bio && (
            <div className="mt-6">
              <h2 className="font-bold text-gray-900 text-lg mb-2">About {counselor.name?.split(" ")[0]}</h2>
              <p className="text-gray-600 leading-relaxed">{counselor.bio}</p>
            </div>
          )}

          {counselor.expertise && counselor.expertise.length > 0 && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-gray-900 font-semibold mb-3">Areas of Expertise</h3>
              <div className="flex flex-wrap gap-2">
                {counselor.expertise.map((exp: string) => (
                  <span key={exp} className="bg-amber-50 text-amber-600 text-sm px-3 py-1.5 rounded-full border border-amber-200">
                    {exp}
                  </span>
                ))}
              </div>
            </div>
          )}

          {counselor.languages && counselor.languages.length > 0 && (
            <div className="mt-4">
              <h3 className="text-gray-900 font-semibold mb-2">Languages</h3>
              <div className="flex flex-wrap gap-2">
                {counselor.languages.map((lang: string) => (
                  <span key={lang} className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full border border-gray-200">
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          )}

          {(counselor.pricePerSession || counselor.pricePerMinute || counselor.pricePerChat) && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-gray-900 font-semibold mb-3">Pricing</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {counselor.pricePerSession && (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-center hover:bg-amber-100 transition-all">
                    <p className="text-gray-500 text-xs flex items-center justify-center gap-1">
                      <Calendar size={14} className="text-amber-500" /> Session
                    </p>
                    <p className="text-amber-600 text-xl font-bold">₹{counselor.pricePerSession}</p>
                  </div>
                )}
                {counselor.pricePerMinute && (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-center hover:bg-amber-100 transition-all">
                    <p className="text-gray-500 text-xs flex items-center justify-center gap-1">
                      <Clock size={14} className="text-amber-500" /> Per Minute
                    </p>
                    <p className="text-amber-600 text-xl font-bold">₹{counselor.pricePerMinute}</p>
                  </div>
                )}
                {counselor.pricePerChat && (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-center hover:bg-amber-100 transition-all">
                    <p className="text-gray-500 text-xs flex items-center justify-center gap-1">
                      <MessageCircle size={14} className="text-amber-500" /> Per Chat
                    </p>
                    <p className="text-amber-600 text-xl font-bold">₹{counselor.pricePerChat}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {(counselor.email || counselor.location) && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-gray-900 font-semibold mb-3">Contact Information</h3>
              <div className="space-y-2">
                {counselor.email && <p className="text-gray-600">📧 {counselor.email}</p>}
                {counselor.location && <p className="text-gray-600">📍 {counselor.location}</p>}
                <p className="text-gray-600">⏱ {counselor.experience || 0}+ years experience</p>
              </div>
            </div>
          )}

          <div className="mt-6 pt-6 border-t border-gray-200">
            <button
              onClick={() => router.push("/download-app")}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold py-3 rounded-xl hover:shadow-lg hover:shadow-amber-500/25 transition-all duration-300"
            >
              Download App to Book Session
            </button>
            <p className="text-center text-xs text-gray-400 mt-3">🔒 Secure • Verified Counselor</p>
          </div>
        </div>
      </div>
    </div>
  );
}