"use client";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Star, Award, Users, ChevronRight, MessageCircle, Phone, Video, CheckCircle, Sparkles, Clock, ChevronLeft, Shield, Lock, Zap } from "lucide-react";
import AppModal from "@/components/ui/AppModal";
import Link from "next/link";
import useEmblaCarousel from 'embla-carousel-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default function HeroSection() {
  const [appModal, setAppModal] = useState(false);
  const [counselors, setCounselors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showContactModal, setShowContactModal] = useState(false);
  const [selectedCounselor, setSelectedCounselor] = useState<any>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: true,
    dragFree: false,
    slidesToScroll: 1,
    breakpoints: {
      '(min-width: 640px)': { slidesToScroll: 2 },
      '(min-width: 768px)': { slidesToScroll: 2 },
      '(min-width: 1024px)': { slidesToScroll: 3 },
      '(min-width: 1280px)': { slidesToScroll: 4 },
    }
  });

  const heroRef = useRef(null);

  // Auto-slide effect
  useEffect(() => {
    if (!emblaApi) return;
    const autoplay = setInterval(() => {
      emblaApi.scrollNext();
    }, 3000);
    return () => clearInterval(autoplay);
  }, [emblaApi]);

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
            .slice(0, 12);
          setCounselors(sorted);
        }
      } catch (error) {
        console.error('Error fetching counselors:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCounselors();
  }, []);

  const handleContactClick = (counselor: any, type: string) => {
    setSelectedCounselor(counselor);
    setShowContactModal(true);
  };

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-3 border-amber-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500 text-sm">Loading counselors...</p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section ref={heroRef} className="min-h-screen bg-white pt-20 overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-amber-500/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-amber-500/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/4" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              
              {/* Left Content */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* Trusted Badge with 24x7 */}
                <div className="flex flex-wrap items-center gap-2 mb-5">
                  
                  <div className="inline-flex items-center gap-1.5 bg-green-50 border border-green-200 rounded-full px-3 py-1.5">
                    <Clock size={12} className="text-green-600" />
                    <span className="text-green-700 text-xs font-medium">24×7 Available</span>
                  </div>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  One Conversation <br />
                  <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                    Can Change Your
                  </span> <br />
                  Career Direction.
                </h1>

                {/* Trust & Security Badges */}
                <div className="flex flex-wrap items-center gap-4 mt-4">
                  <div className="flex items-center gap-1.5 text-gray-600 text-xs font-medium">
                    <Shield size={14} className="text-amber-500" />
                    <span>100% Verified Experts</span>
                  </div>
                  <div className="w-px h-4 bg-gray-300" />
                  <div className="flex items-center gap-1.5 text-gray-600 text-xs font-medium">
                    <Lock size={14} className="text-amber-500" />
                    <span>Private & Confidential</span>
                  </div>
                  <div className="w-px h-4 bg-gray-300" />
                  <div className="flex items-center gap-1.5 text-gray-600 text-xs font-medium">
                    <Zap size={14} className="text-amber-500" />
                    <span>Instant Chat in Minutes</span>
                  </div>
                </div>

                {/* Stats Row */}
                <div className="flex flex-wrap items-center gap-6 mt-5">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                    <div>
                      <p className="text-gray-900 font-bold text-sm">4.9 Rating</p>
                      <p className="text-gray-500 text-xs">2,400+ Reviews</p>
                    </div>
                  </div>
                  <div className="w-px h-8 bg-gray-200" />
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-amber-500" />
                    <div>
                      <p className="text-gray-900 font-bold text-sm">Verified Experts</p>
                      <p className="text-gray-500 text-xs">Background Checked</p>
                    </div>
                  </div>
                  <div className="w-px h-8 bg-gray-200" />
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-amber-500" />
                    <div>
                      <p className="text-gray-900 font-bold text-sm">⭐ Rated by</p>
                      <p className="text-gray-500 text-xs">Thousands</p>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 text-sm sm:text-base mt-5 max-w-lg leading-relaxed">
                  Connect instantly with verified experts across career, relationships, mental wellness, finance, parenting, legal, business, health, and more—24×7 via chat, audio, or video.
                </p>

                <div className="flex flex-wrap gap-3 mt-6">
                  <Link
                    href="/counselors"
                    className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-6 sm:px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-amber-500/30 transition-all duration-300 text-sm inline-flex items-center gap-2"
                  >
                     Find Your Expert <ChevronRight size={16} />
                  </Link>
                  <button 
                    onClick={() => setAppModal(true)}
                    className="border-2 border-gray-300 text-gray-700 px-6 sm:px-8 py-3 rounded-full font-semibold hover:bg-gray-50 hover:border-amber-400 transition-all duration-300 text-sm inline-flex items-center gap-2"
                  >
                    Talk Now <ChevronRight size={16} />
                  </button>
                </div>

                <div className="mt-6 flex items-center gap-3">
                  <span className="text-gray-500 text-xs font-medium">CONNECT VIA</span>
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1.5 bg-gray-100 border border-gray-200 rounded-full px-3 py-1.5">
                      <MessageCircle size={14} className="text-amber-500" />
                      <span className="text-gray-700 text-xs font-medium">Chat</span>
                    </span>
                    <span className="flex items-center gap-1.5 bg-gray-100 border border-gray-200 rounded-full px-3 py-1.5">
                      <Phone size={14} className="text-amber-500" />
                      <span className="text-gray-700 text-xs font-medium">Audio</span>
                    </span>
                    <span className="flex items-center gap-1.5 bg-gray-100 border border-gray-200 rounded-full px-3 py-1.5">
                      <Video size={14} className="text-amber-500" />
                      <span className="text-gray-700 text-xs font-medium">Video</span>
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Right - Image */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-amber-500/10">
                  <Image
                    src="/arpanamam.jpeg"
                    alt="Career Counseling"
                    width={600}
                    height={450}
                    className="w-full h-auto object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-transparent" />
                  
                  <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl p-3 border border-amber-200 shadow-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 flex items-center justify-center">
                          <Sparkles className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <p className="text-gray-900 text-xs font-semibold">Live Counseling</p>
                          <p className="text-gray-500 text-[10px]">24/7 Available</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-green-600 text-xs font-medium">Online</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* ─── COUNSELORS SLIDER ────────────────────────────────────── */}
            <div className="mt-12 relative">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                  Top Rated Counselors
                </h2>
                <div className="flex gap-2">
                  <button
                    onClick={scrollPrev}
                    className="p-2 rounded-full bg-gray-100 hover:bg-amber-100 text-gray-700 hover:text-amber-600 transition-colors border border-gray-200"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={scrollNext}
                    className="p-2 rounded-full bg-gray-100 hover:bg-amber-100 text-gray-700 hover:text-amber-600 transition-colors border border-gray-200"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>

              {counselors.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-gray-500 text-sm">No counselors available</p>
                </div>
              ) : (
                <div className="overflow-hidden" ref={emblaRef}>
                  <div className="flex gap-5">
                    {counselors.map((c, i) => (
                      <motion.div
                        key={c._id || i}
                        className="flex-[0_0_50%] sm:flex-[0_0_50%] md:flex-[0_0_33.33%] lg:flex-[0_0_25%] min-w-0"
                      >
                        <div className="bg-white rounded-2xl p-5 text-center border border-gray-200 hover:border-amber-400 hover:shadow-xl transition-all duration-300 h-full">
                          <Link href={`/counselors/${c._id}`}>
                            <div className="relative w-20 h-20 mx-auto">
                              <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full blur-md opacity-30" />
                              {c.image ? (
                                <Image
                                  src={c.image}
                                  alt={c.name}
                                  width={80}
                                  height={80}
                                  className="rounded-full object-cover relative z-10 border-2 border-amber-400 w-20 h-20"
                                />
                              ) : (
                                <div className="rounded-full relative z-10 border-2 border-amber-400 w-20 h-20 bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center">
                                  <span className="text-white font-bold text-2xl">
                                    {c.name?.charAt(0) || "C"}
                                  </span>
                                </div>
                              )}
                              {c.available && (
                                <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full w-4 h-4 border-2 border-white z-20" />
                              )}
                            </div>
                            <h3 className="text-gray-900 mt-3 text-base sm:text-lg font-semibold truncate">
                              {c.name}
                            </h3>
                            <p className="text-amber-500 text-sm sm:text-base mt-1 truncate">
                              {c.title || "Counselor"}
                            </p>
                            <div className="flex items-center justify-center gap-1 mt-2">
                              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                              <span className="text-gray-900 text-sm font-medium">
                                {c.rating || 0}
                              </span>
                              <span className="text-gray-400 text-sm">
                                ({c.reviews || 0})
                              </span>
                            </div>
                          </Link>

                          <div className="mt-4 pt-3 border-t border-gray-200">
                            <div className="flex flex-col gap-3">
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleContactClick(c, 'chat');
                                }}
                                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 flex items-center justify-between px-4 shadow-md hover:shadow-lg"
                              >
                                <div className="flex items-center gap-2.5">
                                  <MessageCircle size={18} />
                                  <span className="text-sm font-medium">Chat</span>
                                </div>
                                <div className="flex flex-col items-end">
                                  <span className="text-sm font-bold bg-white/25 px-3 py-0.5 rounded-full">
                                    ₹{c.pricePerChat || 49}
                                  </span>
                                  <span className="text-[10px] text-white/80 font-medium">per chat</span>
                                </div>
                              </button>

                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleContactClick(c, 'call');
                                }}
                                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 flex items-center justify-between px-4 shadow-md hover:shadow-lg"
                              >
                                <div className="flex items-center gap-2.5">
                                  <Phone size={18} />
                                  <span className="text-sm font-medium">Call</span>
                                </div>
                                <div className="flex flex-col items-end">
                                  <span className="text-sm font-bold bg-white/25 px-3 py-0.5 rounded-full">
                                    ₹{c.pricePerMinute || 99}
                                  </span>
                                  <span className="text-[10px] text-white/80 font-medium">per minute</span>
                                </div>
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Stats */}
            <div className="mt-12 max-w-4xl mx-auto">
              <div className="grid grid-cols-3 gap-4 bg-gray-50 rounded-2xl p-6 border border-gray-200">
                <div className="text-center">
                  <p className="text-amber-500 text-2xl sm:text-3xl font-bold">10K+</p>
                  <p className="text-gray-500 text-xs sm:text-sm">STUDENTS GUIDED</p>
                </div>
                <div className="text-center border-l border-r border-gray-200">
                  <p className="text-amber-500 text-2xl sm:text-3xl font-bold">500+</p>
                  <p className="text-gray-500 text-xs sm:text-sm">EXPERT COUNSELORS</p>
                </div>
                <div className="text-center">
                  <p className="text-amber-500 text-2xl sm:text-3xl font-bold">4.9★</p>
                  <p className="text-gray-500 text-xs sm:text-sm">AVG RATING</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── DOWNLOAD APP MODAL ────────────────────────────────────── */}
      {showContactModal && selectedCounselor && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-200"
          >
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center mx-auto mb-3">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Connect with {selectedCounselor.name}
              </h3>
              <p className="text-gray-600 text-sm mt-2">
                Download the app to start chatting instantly
              </p>
              <div className="mt-4 p-3 bg-gray-50 rounded-xl border border-gray-200">
                <p className="text-amber-600 text-sm font-medium flex items-center justify-center gap-2">
                  <MessageCircle size={14} className="text-amber-500" />
                  ₹{selectedCounselor.pricePerChat || 49}/chat
                </p>
                <p className="text-gray-500 text-xs mt-1 flex items-center justify-center gap-2">
                  <Phone size={12} className="text-amber-500" />
                  ₹{selectedCounselor.pricePerMinute || 99}/min • {selectedCounselor.experience || 0}+ years exp
                </p>
              </div>
              <button
                onClick={() => setShowContactModal(false)}
                className="mt-6 w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25"
              >
                <MessageCircle size={18} />
                Open in App
              </button>
              <p className="text-gray-500 text-xs mt-3">
                Available on iOS & Android
              </p>
              <button
                onClick={() => setShowContactModal(false)}
                className="mt-2 text-gray-500 text-sm hover:text-gray-700 transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}

      <AppModal isOpen={appModal} onClose={() => setAppModal(false)} />
    </>
  );
}