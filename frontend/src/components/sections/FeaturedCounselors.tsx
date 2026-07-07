"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, Star, Users, Award, Clock, ChevronLeft, ChevronRight } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

interface Counselor {
  _id: string;
  name: string;
  title: string;
  expertise: string[];
  experience: number;
  rating: number;
  reviews: number;
  pricePerSession: number;
  pricePerMinute?: number;
  pricePerChat?: number;
  languages: string[];
  image: string;
  available: boolean;
  sessionsCompleted: number;
  isActive: boolean;
  slug?: string;
}

function CounselorCardComponent({ counselor }: { counselor: Counselor }) {
  return (
    <Link href={`/counselors/${counselor.slug || counselor._id}`} className="group relative block h-full">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-500" />
      
      <div className="relative bg-white border border-gray-200 rounded-2xl p-5 hover:border-yellow-500/50 transition-all duration-300 h-full shadow-lg hover:shadow-xl">
        {counselor.available && (
          <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 rounded-full bg-green-50 border border-green-200">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            <span className="text-green-600 text-[10px] font-medium">Available</span>
          </div>
        )}

        <div className="flex items-start gap-4 mb-4">
          <div className="relative">
            {counselor.image ? (
              <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-yellow-500/50">
                <Image
                  src={counselor.image}
                  alt={counselor.name}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center shadow-lg shadow-yellow-500/25">
                <span className="text-white font-bold text-2xl">{counselor.name?.[0] || "C"}</span>
              </div>
            )}
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-yellow-500 border-2 border-white flex items-center justify-center">
              <Star size={10} className="text-white fill-white" />
            </div>
          </div>

          <div className="flex-1">
            <h3 className="text-gray-900 font-bold text-base leading-tight mb-1 group-hover:text-yellow-500 transition-colors">
              {counselor.name}
            </h3>
            <p className="text-yellow-500 text-xs mb-2 line-clamp-1">{counselor.title}</p>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} className={i < Math.floor(counselor.rating || 0) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"} />
                ))}
              </div>
              <span className="text-gray-700 text-xs">{counselor.rating || 0}</span>
              <span className="text-gray-400 text-xs">({counselor.reviews || 0})</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {(counselor.expertise || []).slice(0, 3).map((exp) => (
            <span key={exp} className="px-2 py-0.5 rounded-full bg-gray-100 border border-gray-200 text-gray-600 text-[10px] font-medium hover:border-yellow-500/50 hover:text-yellow-500 hover:bg-yellow-50 transition-colors">
              {exp}
            </span>
          ))}
        </div>

        {(counselor.pricePerSession || counselor.pricePerMinute || counselor.pricePerChat) && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {counselor.pricePerSession && (
              <span className="text-yellow-600 text-[10px] font-semibold bg-yellow-50 px-2 py-0.5 rounded flex items-center gap-0.5 border border-yellow-200">
                ₹{counselor.pricePerSession}/session
              </span>
            )}
            {counselor.pricePerMinute && (
              <span className="text-yellow-600 text-[10px] font-semibold bg-yellow-50 px-2 py-0.5 rounded flex items-center gap-0.5 border border-yellow-200">
                ₹{counselor.pricePerMinute}/min
              </span>
            )}
            {counselor.pricePerChat && (
              <span className="text-yellow-600 text-[10px] font-semibold bg-yellow-50 px-2 py-0.5 rounded flex items-center gap-0.5 border border-yellow-200">
                ₹{counselor.pricePerChat}/chat
              </span>
            )}
          </div>
        )}

        <div className="grid grid-cols-2 gap-3 mb-4 p-3 rounded-xl bg-gray-50 border border-gray-200">
          <div className="flex items-center gap-2">
            <Award size={12} className="text-yellow-500" />
            <div>
              <p className="text-gray-900 text-xs font-semibold">{counselor.experience || 0}+ years</p>
              <p className="text-gray-500 text-[10px]">Experience</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Users size={12} className="text-yellow-500" />
            <div>
              <p className="text-gray-900 text-xs font-semibold">{counselor.sessionsCompleted || 0}+</p>
              <p className="text-gray-500 text-[10px]">Sessions</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1">
            <Clock size={10} className="text-gray-400" />
            <div className="flex gap-1">
              {(counselor.languages || ['English']).slice(0, 2).map(lang => (
                <span key={lang} className="text-gray-500 text-[10px]">{lang}</span>
              ))}
            </div>
          </div>
          <div className="text-right">
            <span className="text-yellow-500 font-bold text-sm">₹{counselor.pricePerSession || 499}</span>
            <span className="text-gray-400 text-[10px]"> / session</span>
          </div>
        </div>

        <div className="w-full py-2.5 rounded-xl bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-semibold text-sm hover:shadow-lg hover:shadow-yellow-500/25 transition-all duration-300 text-center">
          View Profile
        </div>
      </div>
    </Link>
  );
}

export default function FeaturedCounselors() {
  const [counselors, setCounselors] = useState<Counselor[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    const fetchCounselors = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/counselors`);
        const data = await res.json();
        
        if (data.success) {
          const sorted = data.data
            .filter((c: any) => c.isActive !== false)
            .sort((a: any, b: any) => (b.rating || 0) - (a.rating || 0))
            .slice(0, 6);
          setCounselors(sorted);
        } else {
          console.error('Failed to fetch counselors:', data.message);
        }
      } catch (error) {
        console.error('Error fetching counselors:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCounselors();
  }, []);

  const getVisibleCount = (): number => {
    if (typeof window === 'undefined') return 3;
    if (window.innerWidth < 640) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  };

  useEffect(() => {
    const handleResize = () => {
      setVisibleCount(getVisibleCount());
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, counselors.length - visibleCount);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1 > maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 < 0 ? maxIndex : prev - 1));
  };

  if (loading) {
    return (
      <section className="py-16 md:py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-50 border border-yellow-200 mb-3">
                <Sparkles size={12} className="text-yellow-500" />
                <span className="text-yellow-600 text-xs font-semibold">TOP RATED</span>
              </div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
                Meet our{" "}
                <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
                  expert counselors
                </span>
              </h2>
              <div className="w-20 h-0.5 bg-gradient-to-r from-yellow-500 to-transparent mt-2" />
            </div>
          </div>
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 border-3 border-yellow-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-gray-500 text-sm">Loading counselors...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (counselors.length === 0) {
    return (
      <section className="py-16 md:py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-50 border border-yellow-200 mb-3">
                <Sparkles size={12} className="text-yellow-500" />
                <span className="text-yellow-600 text-xs font-semibold">TOP RATED</span>
              </div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
                Meet our{" "}
                <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
                  expert counselors
                </span>
              </h2>
              <div className="w-20 h-0.5 bg-gradient-to-r from-yellow-500 to-transparent mt-2" />
            </div>
          </div>
          <div className="text-center py-10">
            <p className="text-gray-500 text-sm">No counselors available</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-1/4 w-80 h-80 bg-yellow-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-yellow-600/5 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-50 border border-yellow-200 mb-3">
              <Sparkles size={12} className="text-yellow-500" />
              <span className="text-yellow-600 text-xs font-semibold">TOP RATED</span>
            </div>
            
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
              Meet our{" "}
              <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
                expert counselors
              </span>
            </h2>
            
            <div className="w-20 h-0.5 bg-gradient-to-r from-yellow-500 to-transparent mt-2" />
          </div>
          
          <Link href="/counselors" className="group flex items-center gap-2 text-yellow-500 font-semibold hover:text-yellow-600 transition-all text-sm">
            View all counselors 
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {counselors.length > visibleCount && (
          <div className="hidden md:flex items-center justify-end gap-2 mb-6">
            <button onClick={prevSlide} className="w-8 h-8 rounded-full bg-gray-100 border border-gray-200 hover:bg-yellow-50 hover:border-yellow-500/50 transition-all duration-300 flex items-center justify-center">
              <ChevronLeft size={16} className="text-gray-700" />
            </button>
            <button onClick={nextSlide} className="w-8 h-8 rounded-full bg-gray-100 border border-gray-200 hover:bg-yellow-50 hover:border-yellow-500/50 transition-all duration-300 flex items-center justify-center">
              <ChevronRight size={16} className="text-gray-700" />
            </button>
          </div>
        )}

        <div className="overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-out gap-5" 
            style={{ transform: `translateX(-${currentIndex * (100 / visibleCount)}%)` }}
          >
            {counselors.map((counselor) => (
              <div 
                key={counselor._id} 
                className="flex-shrink-0" 
                style={{ width: `calc(${100 / visibleCount}% - 16px)` }}
              >
                <CounselorCardComponent counselor={counselor} />
              </div>
            ))}
          </div>
        </div>

        {counselors.length > visibleCount && (
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: Math.min(maxIndex + 1, 5) }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1 rounded-full transition-all duration-300 ${
                  currentIndex === idx ? "w-6 bg-yellow-500" : "w-1.5 bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}