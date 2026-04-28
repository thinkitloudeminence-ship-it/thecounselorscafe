"use client";
import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Search, MapPin, Star, Award, Users, ChevronRight } from "lucide-react";
import AppModal from "@/components/ui/AppModal";

export default function HeroSection() {
  const [appModal, setAppModal] = useState(false);
  const [searchLocation, setSearchLocation] = useState("");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [autoScroll, setAutoScroll] = useState(true);
  const [currentHeadingIndex, setCurrentHeadingIndex] = useState(0);

  const heroRef = useRef(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Rotating headings
  const rotatingHeadings = [
    "Career Counselling",
    "Study Abroad Guidance",
    "Mental Health Support",
    "Relationship Counselling"
  ];

  // Rotate headings every 3.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeadingIndex((prev) => (prev + 1) % rotatingHeadings.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  // Different counselors with unique names and images
  const counselors = [
    {
      id: 1,
      name: "Dr. Priya Sharma",
      tag: "Career Expert",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop",
      rating: 4.9,
    },
    {
      id: 2,
      name: "Prof. Amit Kumar",
      tag: "Study Abroad",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop",
      rating: 4.8,
    },
    {
      id: 3,
      name: "Dr. Sneha Reddy",
      tag: "Mental Health",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop",
      rating: 4.9,
    },
    {
      id: 4,
      name: "Rahul Verma",
      tag: "Career Switch",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
      rating: 4.7,
    },
    {
      id: 5,
      name: "Dr. Anjali Mehta",
      tag: "Relationship Expert",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop",
      rating: 4.9,
    },
    {
      id: 6,
      name: "Vikram Singh",
      tag: "Life Coach",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
      rating: 4.8,
    },
    {
      id: 7,
      name: "Dr. Neha Gupta",
      tag: "Exam Stress",
      image: "https://images.unsplash.com/photo-1598550874175-4d0ef436c909?w=200&h=200&fit=crop",
      rating: 4.9,
    },
    {
      id: 8,
      name: "Arjun Nair",
      tag: "Parenting Coach",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop",
      rating: 4.7,
    },
  ];

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

  return (
    <>
      <section
        ref={heroRef}
        className="relative min-h-screen bg-black overflow-hidden py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24"
      >
        {/* Animated Background Glow - Hidden on mobile */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute top-20 left-1/3 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-yellow-500/20 rounded-full blur-[80px] sm:blur-[100px] md:blur-[120px] z-0 hidden sm:block"
          style={{ x: mousePosition.x * 0.02, y: mousePosition.y * 0.02 }}
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12 lg:py-16 relative z-10">
          {/* Main Banner Box */}
          <div className="relative max-w-5xl mx-auto overflow-hidden rounded-xl sm:rounded-2xl md:rounded-3xl shadow-2xl">
            {/* Box Background Image */}
            <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20 z-10" />
              <Image
                src="/arpanamam.jpeg"
                alt="Background"
                fill
                className="object-cover object-center"
                priority
              />
            </div>

            {/* Box Content */}
            <div className="relative z-20 p-5 sm:p-6 md:p-8 lg:p-10 xl:p-12">
              <div className="flex flex-col items-center justify-center text-center">
                
                {/* Headings */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="w-full"
                >
                  <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight drop-shadow-lg">
                    Clear Confusions with{" "}
                    <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
                      World's Best Counselors
                    </span>
                  </h1>

                  {/* Rotating Heading */}
                  <div className="mt-4 sm:mt-5 md:mt-6 h-12 sm:h-14 md:h-16 lg:h-20">
                    <motion.div
                      key={currentHeadingIndex}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -30 }}
                      transition={{ duration: 0.5 }}
                      className="inline-block"
                    >
                      <span className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent drop-shadow-lg">
                        {rotatingHeadings[currentHeadingIndex]}
                      </span>
                    </motion.div>
                  </div>

                  {/* Stats - Responsive grid on mobile */}
                  <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mt-4 sm:mt-5 md:mt-6">
                    <div className="flex items-center gap-1.5 sm:gap-2 bg-black/40 backdrop-blur-sm rounded-full px-2 py-1 sm:px-3 sm:py-1.5 md:px-4">
                      <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-white text-xs sm:text-sm md:text-base">4.9 Rating</span>
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2 bg-black/40 backdrop-blur-sm rounded-full px-2 py-1 sm:px-3 sm:py-1.5 md:px-4">
                      <Users className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500" />
                      <span className="text-white text-xs sm:text-sm md:text-base">10K+ Sessions</span>
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2 bg-black/40 backdrop-blur-sm rounded-full px-2 py-1 sm:px-3 sm:py-1.5 md:px-4">
                      <Award className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500" />
                      <span className="text-white text-xs sm:text-sm md:text-base">Top 1% Experts</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => setAppModal(true)}
                    className="mt-5 sm:mt-6 md:mt-7 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-4 sm:px-5 md:px-6 lg:px-8 py-2 sm:py-2.5 md:py-3 rounded-full font-semibold hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300 text-xs sm:text-sm md:text-base inline-flex items-center gap-1.5 sm:gap-2 group shadow-lg"
                  >
                    Talk to Expert 
                    <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Search Bar - Fully Responsive */}
          <div className="mt-6 sm:mt-8 md:mt-10 lg:mt-12 max-w-xl sm:max-w-2xl md:max-w-3xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-2 bg-gray-900/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-1 border border-gray-700">
              <div className="flex-1 flex items-center gap-2 px-3 sm:px-4 md:px-5 py-2 sm:py-3 md:py-4">
                <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-500 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Search location (e.g., Delhi, Mumbai)"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="bg-transparent text-white placeholder-gray-400 outline-none flex-1 text-xs sm:text-sm md:text-base w-full"
                />
              </div>
              <button className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-lg sm:rounded-xl text-xs sm:text-sm md:text-base font-semibold hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300 inline-flex items-center justify-center gap-1.5 sm:gap-2">
                <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                Search
              </button>
            </div>
          </div>

          {/* Categories - Responsive Grid  */}
          <div className="mt-6 sm:mt-8 md:mt-10 lg:mt-12 max-w-7xl mx-auto">
            <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-1.5 sm:gap-2 md:gap-3">
              {categories.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 bg-gray-800/60 backdrop-blur-sm text-white text-[10px] xs:text-xs sm:text-sm text-center rounded-full border border-gray-700 hover:bg-yellow-500 hover:text-black hover:border-yellow-500 transition-all duration-300 cursor-pointer truncate"
                >
                  {item}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Counselors Slider - Fully Responsive */}
          <div className="mt-8 sm:mt-10 md:mt-12 lg:mt-16 xl:mt-20">
            <div className="flex flex-col sm:flex-row items-center justify-between mb-4 sm:mb-6 gap-2 sm:gap-3">
              <h2 className="text-white text-base sm:text-lg md:text-xl font-semibold text-center sm:text-left">
                Top Rated Counselors
              </h2>
              <button 
                onClick={() => setAutoScroll(!autoScroll)}
                className="text-yellow-500 text-[10px] xs:text-xs sm:text-sm hover:text-yellow-400 transition px-2 py-1 sm:px-3 rounded-full border border-yellow-500/30 hover:border-yellow-500"
              >
                {autoScroll ? "⏸ Pause" : "▶ Auto-scroll"}
              </button>
            </div>

            <div className="relative overflow-x-hidden">
              {/* Gradient masks - smaller on mobile */}
              <div className="absolute left-0 top-0 bottom-0 w-8 xs:w-12 sm:w-16 md:w-20 bg-gradient-to-r from-black via-black/50 to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-8 xs:w-12 sm:w-16 md:w-20 bg-gradient-to-l from-black via-black/50 to-transparent z-10 pointer-events-none" />

              <motion.div
                ref={sliderRef}
                className="flex gap-2 xs:gap-3 sm:gap-4 md:gap-5 w-max cursor-grab active:cursor-grabbing"
                animate={autoScroll ? { x: ["0%", "-50%"] } : {}}
                transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
                onMouseEnter={() => setAutoScroll(false)}
                onMouseLeave={() => setAutoScroll(true)}
              >
                {[...counselors, ...counselors].map((c, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="w-32 xs:w-36 sm:w-40 md:w-44 lg:w-48 xl:w-52 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg sm:rounded-xl p-2 sm:p-3 md:p-4 text-center border border-gray-600 hover:border-yellow-500 transition-all duration-300 cursor-pointer shadow-xl"
                  >
                    <div className="relative w-10 h-10 xs:w-12 xs:h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto">
                      <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full blur-md opacity-60" />
                      <Image
                        src={c.image}
                        alt={c.name}
                        width={64}
                        height={64}
                        className="rounded-full object-cover relative z-10 border-2 border-yellow-500 w-full h-full"
                      />
                      <div className="absolute -bottom-0.5 -right-0.5 xs:-bottom-1 xs:-right-1 bg-green-500 rounded-full w-2 h-2 xs:w-2.5 xs:h-2.5 border border-black z-20" />
                    </div>
                    <h3 className="text-white mt-1.5 xs:mt-2 text-[10px] xs:text-xs sm:text-sm font-semibold truncate">
                      {c.name}
                    </h3>
                    <p className="text-yellow-500 text-[8px] xs:text-[10px] sm:text-xs mt-0.5">{c.tag}</p>
                    <div className="flex items-center justify-center gap-0.5 xs:gap-1 mt-1 xs:mt-1.5">
                      <Star className="w-2 h-2 xs:w-2.5 xs:h-2.5 text-yellow-500 fill-yellow-500" />
                      <span className="text-white text-[8px] xs:text-[10px] sm:text-xs font-medium">{c.rating}</span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator - Hidden on mobile */}
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 hidden sm:block z-20">
          <div className="w-4 h-7 sm:w-5 sm:h-8 border-2 border-gray-600 rounded-full flex justify-center">
            <div className="w-0.5 h-1 sm:w-1 sm:h-1.5 bg-yellow-500 rounded-full mt-1 sm:mt-1.5 animate-bounce" />
          </div>
        </div>
      </section>

      <AppModal isOpen={appModal} onClose={() => setAppModal(false)} />
    </>
  );
}