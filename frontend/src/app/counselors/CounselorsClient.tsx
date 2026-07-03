"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, MapPin, ArrowRight, Search, Sparkles, Users } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const expertiseList = [
  "Stream Selection",
  "Career Counselling",
  "Study Abroad",
  "CUET Guidance",
  "JEE Guidance",
  "MBA Prep",
  "Resume Building",
  "Interview Prep",
  "CA Guidance",
  "Tech Careers",
];

export default function CounselorsClient() {
  const [counselors, setCounselors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedExpertise, setSelectedExpertise] = useState("");

  useEffect(() => {
    const fetchCounselors = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/counselors`);
        const data = await res.json();

        if (data.success) {
          setCounselors(data.data || []);
        } else {
          console.error('Failed to fetch counselors:', data.message);
          setCounselors([]);
        }
      } catch (error) {
        console.error('Error fetching counselors:', error);
        setCounselors([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCounselors();
  }, []);

  const filtered = counselors.filter((c) => {
    const matchSearch = !search ||
      c.name?.toLowerCase().includes(search.toLowerCase()) ||
      c.title?.toLowerCase().includes(search.toLowerCase()) ||
      c.expertise?.some((e: string) => e.toLowerCase().includes(search.toLowerCase()));
    const matchExpertise = !selectedExpertise || c.expertise?.includes(selectedExpertise);
    return matchSearch && matchExpertise;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-black pt-20 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-3 border-yellow-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-400 text-sm">Loading counselors...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="bg-black py-12 px-4 border-b border-white/5">
        <div className="container mx-auto px-4 text-center">
          <span className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-xs font-semibold px-3 py-1.5 rounded-full uppercase tracking-widest mb-4">
            <Sparkles size={12} />
            Expert Guidance
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Find Your Perfect <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">Career Counselor</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            120+ verified career experts ready to guide you — stream selection, study abroad, CUET, JEE, resume, and more.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-10">
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, expertise, or specialty..."
              className="w-full bg-black/40 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500/50 transition-colors"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 justify-center mb-10">
          <button
            onClick={() => setSelectedExpertise("")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${!selectedExpertise
                ? "bg-yellow-500 text-black"
                : "bg-black/40 text-gray-400 border border-white/10 hover:border-yellow-500/50"
              }`}
          >
            All
          </button>
          {expertiseList.map((exp) => (
            <button
              key={exp}
              onClick={() => setSelectedExpertise(exp)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedExpertise === exp
                  ? "bg-yellow-500 text-black"
                  : "bg-black/40 text-gray-400 border border-white/10 hover:border-yellow-500/50"
                }`}
            >
              {exp}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-white text-xl font-semibold mb-2">No counselors found</h3>
            <p className="text-gray-500">Try adjusting your search or filter</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((counselor, index) => (
              <motion.div
                key={counselor._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-black/40 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-yellow-500/40 hover:-translate-y-1 transition-all duration-300 overflow-hidden group"
              >
                <div className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-yellow-500/50 flex-shrink-0">
                      {counselor.image ? (
                        <Image
                          src={counselor.image}
                          alt={counselor.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center">
                          <span className="text-black font-bold text-2xl">
                            {counselor.name?.charAt(0) || "C"}
                          </span>
                        </div>
                      )}
                      {counselor.available && (
                        <span className="absolute bottom-1 right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-black" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-white text-lg leading-tight group-hover:text-yellow-400 transition-colors">
                        {counselor.name}
                      </h3>
                      <p className="text-yellow-500 text-xs font-medium mt-0.5">{counselor.title}</p>

                      <div className="flex items-center gap-2 mt-2">
                        <span className="flex items-center gap-0.5">
                          <Star size={12} className="text-yellow-500 fill-yellow-500" />
                          <span className="text-white text-xs font-bold">{counselor.rating}</span>
                          <span className="text-gray-500 text-xs">({counselor.reviews})</span>
                        </span>
                        <span className="w-1 h-1 bg-gray-500 rounded-full" />
                        <span className="text-gray-400 text-xs">{counselor.experience}+ yrs</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {counselor.expertise?.slice(0, 3).map((exp: string) => (
                      <span key={exp} className="bg-yellow-500/10 text-yellow-400 text-xs px-2 py-1 rounded-full">
                        {exp}
                      </span>
                    ))}
                    {counselor.expertise?.length > 3 && (
                      <span className="text-gray-500 text-xs px-2 py-1">+{counselor.expertise.length - 3}</span>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/10">
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Users size={12} className="text-yellow-500" />
                        {counselor.sessionsCompleted}+
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={12} className="text-yellow-500" />
                        {counselor.location?.split(",")[0]}
                      </span>
                      {counselor.pricePerSession && (
                        <span className="flex items-center gap-1 text-yellow-500 font-semibold">
                          ₹{counselor.pricePerSession}
                        </span>
                      )}
                    </div>
                    <Link
                      href={`/counselors/${counselor._id}`}
                      className="flex items-center gap-1 text-yellow-500 text-xs font-semibold hover:gap-2 transition-all"
                    >
                      View Profile <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}