"use client";
import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Search, MapPin, Star, Award, Users, ChevronRight } from "lucide-react";
import AppModal from "@/components/ui/AppModal";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default function HeroSection() {
  const [appModal, setAppModal] = useState(false);
  const [searchLocation, setSearchLocation] = useState("");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentHeadingIndex, setCurrentHeadingIndex] = useState(0);
  const [counselors, setCounselors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  // ─── Fetch Real Counselors ─────────────────────────────────────────
  useEffect(() => {
    const fetchCounselors = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/counselors`);
        const data = await res.json();
        
        if (data.success) {
          // Top 8 counselors with highest rating
          const sorted = data.data
            .filter((c: any) => c.isActive !== false)
            .sort((a: any, b: any) => (b.rating || 0) - (a.rating || 0))
            .slice(0, 8);
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

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const rotatingHeadings = [
    "Career Counselling",
    "Study Abroad Guidance",
    "Mental Health Support",
    "Relationship Counselling"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeadingIndex((prev) => (prev + 1) % rotatingHeadings.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  // ─── Default categories ────────────────────────────────────────────
  const categories = [
    "Career after 10th",
    "Career after 12th",
    "Study Abroad",
    "Relationship Issues",
    "Stress / Anxiety",
    "Career Switch",
    "Exam Stress",
    "Life Coaching",
  ];

  // ─── Color Config ──────────────────────────────────────────────────
  const selectedColor = {
    sectionBg: "#0a192f",
    primary: "from-amber-400 to-amber-600",
    accent: "amber-500",
    glow: "amber-500/20",
    bgMask: "[#0a192f]",
    text: "text-amber-500",
    fill: "fill-amber-500",
    from: "from-amber-400",
    to: "to-amber-600",
    border: "border-amber-500",
    borderHover: "hover:border-amber-500",
    bgHover: "hover:bg-amber-500",
    textHover: "hover:text-black",
  };

  // ─── Loading State ─────────────────────────────────────────────────
  if (loading) {
    return (
      <section
        ref={heroRef}
        className="relative min-h-screen overflow-hidden py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24"
        style={{ backgroundColor: selectedColor.sectionBg }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12 lg:py-16 relative z-10">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 border-3 border-amber-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-gray-400 text-sm">Loading counselors...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section
        ref={heroRef}
        className="relative min-h-screen overflow-hidden py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24"
        style={{ backgroundColor: selectedColor.sectionBg }}
      >
        {/* Animated Background Glow */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute top-20 left-1/3 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-amber-500/20 rounded-full blur-[80px] sm:blur-[100px] md:blur-[120px] z-0 hidden sm:block"
          style={{ x: mousePosition.x * 0.02, y: mousePosition.y * 0.02 }}
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12 lg:py-16 relative z-10">
          {/* Main Banner Box */}
          <div className="relative max-w-6xl mx-auto overflow-hidden rounded-xl sm:rounded-2xl md:rounded-3xl shadow-2xl">
            <div className="absolute inset-0 z-0">
              <Image
                src="/arpanamam.jpeg"
                alt="Background"
                fill
                className="object-cover object-center"
                priority
              />
            </div>

            <div className="relative z-20 p-5 sm:p-6 md:p-8 lg:p-10 xl:p-12 bg-gradient-to-r from-black/70 via-black/50 to-transparent">
              <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8 lg:gap-12">
                
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="flex-1 text-center lg:text-left"
                >
                  <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight drop-shadow-lg">
                    Clear Confusions with{" "}
                    <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                      World's Best Counselors
                    </span>
                  </h1>

                  <div className="mt-4 sm:mt-5 md:mt-6 h-12 sm:h-14 md:h-16 lg:h-20">
                    <motion.div
                      key={currentHeadingIndex}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -30 }}
                      transition={{ duration: 0.5 }}
                      className="inline-block lg:inline-block"
                    >
                      <span className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent drop-shadow-lg">
                        {rotatingHeadings[currentHeadingIndex]}
                      </span>
                    </motion.div>
                  </div>

                  <div className="flex flex-wrap justify-center lg:justify-start gap-2 sm:gap-3 md:gap-4 mt-4 sm:mt-5 md:mt-6">
                    <div className="flex items-center gap-1.5 sm:gap-2 bg-black/40 backdrop-blur-sm rounded-full px-2 py-1 sm:px-3 sm:py-1.5 md:px-4">
                      <Star className="w-3 h-3 sm:w-4 sm:h-4 text-amber-500 fill-amber-500" />
                      <span className="text-white text-xs sm:text-sm md:text-base">4.9 Rating</span>
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2 bg-black/40 backdrop-blur-sm rounded-full px-2 py-1 sm:px-3 sm:py-1.5 md:px-4">
                      <Users className="w-3 h-3 sm:w-4 sm:h-4 text-amber-500" />
                      <span className="text-white text-xs sm:text-sm md:text-base">10K+ Sessions</span>
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2 bg-black/40 backdrop-blur-sm rounded-full px-2 py-1 sm:px-3 sm:py-1.5 md:px-4">
                      <Award className="w-3 h-3 sm:w-4 sm:h-4 text-amber-500" />
                      <span className="text-white text-xs sm:text-sm md:text-base">Top 1% Experts</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => setAppModal(true)}
                    className="mt-5 sm:mt-6 md:mt-7 bg-gradient-to-r from-amber-400 to-amber-600 text-black px-4 sm:px-5 md:px-6 lg:px-8 py-2 sm:py-2.5 md:py-3 rounded-full font-semibold hover:from-opacity-80 hover:to-opacity-80 transition-all duration-300 text-xs sm:text-sm md:text-base inline-flex items-center gap-1.5 sm:gap-2 group shadow-lg"
                  >
                    Talk to Expert 
                    <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </motion.div>

                <div className="flex-1 hidden lg:block" />
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mt-6 sm:mt-8 md:mt-10 lg:mt-12 max-w-xl sm:max-w-2xl md:max-w-3xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-2 bg-gray-900/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-1 border border-gray-700">
              <div className="flex-1 flex items-center gap-2 px-3 sm:px-4 md:px-5 py-2 sm:py-3 md:py-4">
                <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Search location (e.g., Delhi, Mumbai)"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="bg-transparent text-white placeholder-gray-400 outline-none flex-1 text-xs sm:text-sm md:text-base w-full"
                />
              </div>
              <button className="bg-gradient-to-r from-amber-400 to-amber-600 text-black px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-lg sm:rounded-xl text-xs sm:text-sm md:text-base font-semibold transition-all duration-300 inline-flex items-center justify-center gap-1.5 sm:gap-2">
                <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                Search
              </button>
            </div>
          </div>

          {/* Categories */}
          <div className="mt-6 sm:mt-8 md:mt-10 lg:mt-12 max-w-7xl mx-auto">
            <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-1.5 sm:gap-2 md:gap-3">
              {categories.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 bg-gray-800/60 backdrop-blur-sm text-white text-[10px] xs:text-xs sm:text-sm text-center rounded-full border border-gray-700 hover:bg-amber-500 hover:text-black hover:border-amber-500 transition-all duration-300 cursor-pointer truncate"
                >
                  {item}
                </motion.div>
              ))}
            </div>
          </div>

          {/* ─── COUNSELORS SLIDER (NO REPEAT) ────────────────────── */}
          <div className="mt-8 sm:mt-10 md:mt-12 lg:mt-16 xl:mt-20">
            <div className="flex flex-col sm:flex-row items-center justify-between mb-4 sm:mb-6 gap-2 sm:gap-3">
              <h2 className="text-white text-base sm:text-lg md:text-xl font-semibold text-center sm:text-left">
                Top Rated Counselors
              </h2>
            </div>

            {counselors.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-gray-400 text-sm">No counselors available</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-5">
                {counselors.map((c, i) => (
                  <motion.div
                    key={c._id || i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg sm:rounded-xl p-2 sm:p-3 md:p-4 text-center border border-gray-600 hover:border-amber-500 transition-all duration-300 cursor-pointer shadow-xl"
                  >
                    <Link href={`/counselors/${c.slug || c._id}`}>
                      <div className="relative w-10 h-10 xs:w-12 xs:h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto">
                        <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full blur-md opacity-60" />
                        {c.image ? (
                          <Image
                            src={c.image}
                            alt={c.name}
                            width={64}
                            height={64}
                            className="rounded-full object-cover relative z-10 border-2 border-amber-500 w-full h-full"
                          />
                        ) : (
                          <div className="rounded-full object-cover relative z-10 border-2 border-amber-500 w-full h-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
                            <span className="text-black font-bold text-xl">
                              {c.name?.charAt(0) || "C"}
                            </span>
                          </div>
                        )}
                        {c.available && (
                          <div className="absolute -bottom-0.5 -right-0.5 xs:-bottom-1 xs:-right-1 bg-green-500 rounded-full w-2 h-2 xs:w-2.5 xs:h-2.5 border border-black z-20" />
                        )}
                      </div>
                      <h3 className="text-white mt-1.5 xs:mt-2 text-[10px] xs:text-xs sm:text-sm font-semibold truncate">
                        {c.name}
                      </h3>
                      <p className="text-amber-500 text-[8px] xs:text-[10px] sm:text-xs mt-0.5 truncate">
                        {c.title || "Counselor"}
                      </p>
                      <div className="flex items-center justify-center gap-0.5 xs:gap-1 mt-1 xs:mt-1.5">
                        <Star className="w-2 h-2 xs:w-2.5 xs:h-2.5 text-amber-500 fill-amber-500" />
                        <span className="text-white text-[8px] xs:text-[10px] sm:text-xs font-medium">
                          {c.rating || 0}
                        </span>
                        <span className="text-gray-500 text-[8px] xs:text-[10px] sm:text-xs">
                          ({c.reviews || 0})
                        </span>
                      </div>
                      {c.pricePerSession && (
                        <div className="mt-1 text-[8px] xs:text-[10px] sm:text-xs text-amber-400 font-semibold">
                          ₹{c.pricePerSession}/session
                        </div>
                      )}
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 hidden sm:block z-20">
          <div className="w-4 h-7 sm:w-5 sm:h-8 border-2 border-gray-600 rounded-full flex justify-center">
            <div className="w-0.5 h-1 sm:w-1 sm:h-1.5 text-amber-500 rounded-full mt-1 sm:mt-1.5 animate-bounce" />
          </div>
        </div>
      </section>

      <AppModal isOpen={appModal} onClose={() => setAppModal(false)} />
    </>
  );
}