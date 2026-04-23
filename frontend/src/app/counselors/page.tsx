"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, X, Sparkles } from "lucide-react";
import CounselorCard from "@/components/ui/CounselorCard";
import { fetchCounselors } from "@/lib/api";

const expertiseOptions = ["All", "Stream Selection", "Career Counselling", "Study Abroad", "Resume Building", "Interview Prep", "JEE Guidance", "CUET Guidance", "MBA Prep"];
const sortOptions = [
  { value: "", label: "Recommended" },
  { value: "rating", label: "Highest Rated" },
  { value: "experience", label: "Most Experienced" },
];

const fallback = [
  { _id: "1", name: "Dr. Priya Sharma", title: "Career & Stream Selection Expert", expertise: ["Stream Selection", "Career Counselling", "CUET"], experience: 8, rating: 4.9, reviews: 342, languages: ["Hindi", "English"], image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop", available: true, sessionsCompleted: 1200 },
  { _id: "2", name: "Rahul Mehta", title: "Abroad Education Specialist", expertise: ["Study Abroad", "Visa", "University Selection"], experience: 6, rating: 4.8, reviews: 218, languages: ["Hindi", "English"], image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop", available: true, sessionsCompleted: 890 },
  { _id: "3", name: "Anjali Verma", title: "Resume & Interview Coach", expertise: ["Resume Building", "Interview Prep"], experience: 5, rating: 4.7, reviews: 187, languages: ["Hindi", "English"], image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop", available: true, sessionsCompleted: 650 },
  { _id: "4", name: "Vikram Nair", title: "Engineering & Tech Career Expert", expertise: ["JEE Guidance", "Tech Careers"], experience: 10, rating: 4.9, reviews: 421, languages: ["Hindi", "English"], image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop", available: true, sessionsCompleted: 1800 },
  { _id: "5", name: "Meera Pillai", title: "Arts & Humanities Specialist", expertise: ["Arts Streams", "Law", "Journalism"], experience: 7, rating: 4.8, reviews: 156, languages: ["Hindi", "English"], image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop", available: true, sessionsCompleted: 780 },
  { _id: "6", name: "Arjun Kapoor", title: "Commerce & Finance Career Expert", expertise: ["CA Guidance", "Finance Careers", "MBA Prep"], experience: 9, rating: 4.9, reviews: 293, languages: ["Hindi", "English"], image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop", available: false, sessionsCompleted: 1100 },
];

export default function CounselorsPage() {
  const [counselors, setCounselors] = useState<any[]>(fallback);
  const [search, setSearch] = useState("");
  const [expertise, setExpertise] = useState("All");
  const [sort, setSort] = useState("");
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setLoading(true);
    const params: Record<string, string> = {};
    if (expertise !== "All") params.expertise = expertise;
    if (sort) params.sort = sort;

    fetchCounselors(params)
      .then((res) => { if (res?.data?.length) setCounselors(res.data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [expertise, sort]);

  const filtered = counselors.filter((c) =>
    search ? c.name.toLowerCase().includes(search.toLowerCase()) || c.title.toLowerCase().includes(search.toLowerCase()) : true
  );

  return (
    <div className="min-h-screen bg-black pt-20">
      {/* Header - Black with Yellow Accents */}
      <div className="bg-black py-14 px-4 relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-yellow-500/15 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-yellow-600/10 rounded-full blur-[100px]" />
        </div>
        <div className="container mx-auto px-4 relative text-center">
          <span className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-xs font-semibold px-3 py-1.5 rounded-full uppercase tracking-widest mb-4">
            <Sparkles size={12} />
            Expert Network
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-white">Find Your <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">Perfect Counselor</span></h1>
          <p className="text-gray-400 mt-3 max-w-xl mx-auto">All our counselors are verified experts with 5+ years of experience. Filter by expertise and language.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-8">
        {/* Search + Filter bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search counselors by name or expertise..."
              className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500/50 transition-colors"
            />
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-white sm:w-52 focus:outline-none focus:border-yellow-500/50 transition-colors"
          >
            {sortOptions.map((o) => <option key={o.value} value={o.value} className="bg-black">{o.label}</option>)}
          </select>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-3 rounded-xl border border-white/10 bg-black/40 text-white font-medium hover:border-yellow-500/50 hover:bg-yellow-500/10 transition-all duration-300"
          >
            <SlidersHorizontal size={16} className="text-yellow-500" /> Filters
          </button>
        </div>

        {/* Advanced filters */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-5 mb-6"
          >
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <label className="text-sm font-medium text-gray-300 mb-2 block">Expertise</label>
                <div className="flex flex-wrap gap-2">
                  {expertiseOptions.map((e) => (
                    <button
                      key={e}
                      onClick={() => setExpertise(e)}
                      className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-all duration-300 ${
                        expertise === e 
                          ? "bg-yellow-500 text-black border-yellow-500" 
                          : "bg-black/40 text-gray-400 border-white/10 hover:border-yellow-500/50 hover:text-yellow-400"
                      }`}
                    >
                      {e}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Results count */}
        <p className="text-gray-500 text-sm mb-5">
          Showing <span className="font-semibold text-yellow-500">{filtered.length}</span> counselors
        </p>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-black/40 rounded-2xl h-72 animate-pulse border border-white/10" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-4xl mb-3">🔍</p>
            <p className="text-gray-400 font-medium">No counselors found</p>
            <button onClick={() => { setSearch(""); setExpertise("All"); }} className="mt-3 text-yellow-500 text-sm hover:text-yellow-400 transition-colors">
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((c, i) => <CounselorCard key={c._id} c={c} index={i} />)}
          </div>
        )}
      </div>
    </div>
  );
}