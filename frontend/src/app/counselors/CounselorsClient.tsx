"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, MapPin, ArrowRight, Search, Sparkles, Users, Clock, MessageCircle, Calendar } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import EnquiryModal from "../../components/ui/EnquiryModal"; // adjust the import path to match your project structure

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default function CounselorsClient() {
  const [counselors, setCounselors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedExpertise, setSelectedExpertise] = useState("");

  // Enquiry modal state
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);
  const [selectedCounselor, setSelectedCounselor] = useState<any>(null);

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
      <div className="min-h-screen bg-white pt-20 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-3 border-amber-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500 text-sm">Loading counselors...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="bg-white py-12 px-4 border-b border-gray-200">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Find Your Perfect <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">Career Counselor</span>
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-10">
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, expertise, or specialty..."
              className="w-full bg-white border border-gray-300 rounded-xl py-3.5 pl-12 pr-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-amber-500 transition-colors shadow-sm"
            />
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-gray-900 text-xl font-semibold mb-2">No counselors found</h3>
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
                className="bg-white rounded-2xl border border-gray-200 hover:border-amber-400 hover:-translate-y-1 transition-all duration-300 overflow-hidden shadow-lg hover:shadow-xl group"
              >
                <div className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-amber-500/50 flex-shrink-0">
                      {counselor.image ? (
                        <Image
                          src={counselor.image}
                          alt={counselor.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
                          <span className="text-white font-bold text-2xl">
                            {counselor.name?.charAt(0) || "C"}
                          </span>
                        </div>
                      )}
                      {counselor.available && (
                        <span className="absolute bottom-1 right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-900 text-lg leading-tight group-hover:text-amber-600 transition-colors">
                        {counselor.name}
                      </h3>
                      <p className="text-amber-500 text-xs font-medium mt-0.5">{counselor.title}</p>

                      <div className="flex items-center gap-2 mt-2">
                        <span className="flex items-center gap-0.5">
                          <Star size={12} className="text-amber-500 fill-amber-500" />
                          <span className="text-gray-900 text-xs font-bold">{counselor.rating}</span>
                          <span className="text-gray-400 text-xs">({counselor.reviews})</span>
                        </span>
                        <span className="w-1 h-1 bg-gray-300 rounded-full" />
                        <span className="text-gray-500 text-xs">{counselor.experience}+ yrs</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {counselor.expertise?.slice(0, 3).map((exp: string) => (
                      <span key={exp} className="bg-amber-50 text-amber-600 text-xs px-2 py-1 rounded-full border border-amber-200">
                        {exp}
                      </span>
                    ))}
                    {counselor.expertise?.length > 3 && (
                      <span className="text-gray-400 text-xs px-2 py-1">+{counselor.expertise.length - 3}</span>
                    )}
                  </div>

                  {(counselor.pricePerSession || counselor.pricePerMinute || counselor.pricePerChat) && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {counselor.pricePerSession && (
                        <span className="text-amber-600 text-[10px] font-semibold bg-amber-50 px-2 py-0.5 rounded flex items-center gap-0.5 border border-amber-200">
                          <Calendar size={10} /> ₹{counselor.pricePerSession}/session
                        </span>
                      )}
                      {counselor.pricePerMinute && (
                        <span className="text-amber-600 text-[10px] font-semibold bg-amber-50 px-2 py-0.5 rounded flex items-center gap-0.5 border border-amber-200">
                          <Clock size={10} /> ₹{counselor.pricePerMinute}/min
                        </span>
                      )}
                      {counselor.pricePerChat && (
                        <span className="text-amber-600 text-[10px] font-semibold bg-amber-50 px-2 py-0.5 rounded flex items-center gap-0.5 border border-amber-200">
                          <MessageCircle size={10} /> ₹{counselor.pricePerChat}/chat
                        </span>
                      )}
                    </div>
                  )}

                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-200">
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Users size={12} className="text-amber-500" />
                        {counselor.sessionsCompleted}+
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={12} className="text-amber-500" />
                        {counselor.location?.split(",")[0]}
                      </span>
                    </div>
                    <Link
                      href={`/counselors/${counselor.slug || counselor._id}`}
                      className="flex items-center gap-1 text-amber-500 text-xs font-semibold hover:gap-2 transition-all"
                    >
                      View Profile <ArrowRight size={12} />
                    </Link>
                  </div>

                  {/* Connect Now button */}
                  <button
                    onClick={() => {
                      setSelectedCounselor(counselor);
                      setShowEnquiryModal(true);
                    }}
                    className="w-full mt-2 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold text-sm hover:shadow-lg hover:shadow-amber-500/25 transition-all duration-300"
                  >
                    Connect Now
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Enquiry Modal */}
      <EnquiryModal
        isOpen={showEnquiryModal}
        onClose={() => {
          setShowEnquiryModal(false);
          setSelectedCounselor(null);
        }}
        defaultSubject={`Connect with ${selectedCounselor?.name || 'Counselor'}`}
        defaultMessage={`I would like to connect with ${selectedCounselor?.name || 'a counselor'} for career guidance.`}
      />
    </div>
  );
}