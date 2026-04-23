"use client";
import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { X, Search, MapPin } from "lucide-react";
import AppModal from "@/components/ui/AppModal";

export default function HeroSection() {
  const [appModal, setAppModal] = useState(false);
  const [selectedCounselor, setSelectedCounselor] = useState(null);
  const [isHovering, setIsHovering] = useState(false);
  const [searchLocation, setSearchLocation] = useState("");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  useEffect(() => {
    const handleMouseMove = (e: { clientX: any; clientY: any; }) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const counselors = [...Array(8)].map((_, i) => ({
    name: "Dr. Priya Sharma",
    tag: "Career Expert",
    description: "Guides students for career decisions",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop",
    rating: 4.9,
    experience: "10+ years",
    sessions: 2000,
  }));

  return (
    <>
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center bg-black overflow-hidden"
      >
        {/* Glow */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute top-20 left-1/3 w-96 h-96 bg-yellow-500/20 rounded-full blur-[120px]"
          style={{ x: mousePosition.x * 0.02, y: mousePosition.y * 0.02 }}
        />

        <motion.div
          style={{ opacity }}
          className="container mx-auto px-4 py-16"
        >
          {/* 🔥 COMPACT BANNER */}
          <div className="bg-gradient-to-r from-[#0a0a0a] via-[#111] to-[#1a1a1a] 
          rounded-2xl px-8 py-8 flex flex-col lg:flex-row items-center justify-between gap-6 
          border border-gray-800 shadow-lg max-w-5xl mx-auto">

            {/* LEFT TEXT */}
            <div className="flex-1 text-left">
              <h1 className="text-3xl lg:text-5xl font-bold text-white leading-tight">
                Clear Confusions with <br />
                <span className="text-yellow-500">
                  World's Best Counselors
                </span>
              </h1>

              <button className="mt-5 bg-yellow-500 text-black px-5 py-2.5 rounded-full font-semibold hover:bg-yellow-400 transition text-sm">
                Talk to Expert →
              </button>
            </div>

            {/* RIGHT IMAGE */}
            <div className="flex-shrink-0">
              <div className="relative w-44 h-44 lg:w-52 lg:h-52">
                <Image
                  src="/arpanamam.jpeg"
                  alt="Counselor"
                  fill
                  className="object-cover rounded-xl"
                />
              </div>
            </div>
          </div>

          {/* SEARCH */}
          <div className="mt-10 max-w-2xl mx-auto">
            <div className="flex gap-2 bg-gray-900/80 rounded-full p-1 border border-gray-700">
              <div className="flex-1 flex items-center gap-2 pl-5">
                <MapPin className="w-4 h-4 text-yellow-500" />
                <input
                  type="text"
                  placeholder="Search Location (e.g. Delhi, Mumbai)"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="bg-transparent text-white placeholder-gray-400 outline-none flex-1 text-sm"
                />
              </div>
              <button className="bg-yellow-500 text-black px-6 py-2 rounded-full text-sm">
                <Search className="w-4 h-4 inline mr-1" />
                Search
              </button>
            </div>
          </div>

          {/* ✅ CATEGORIES BACK */}
          <div className="mt-8 flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {[
              "Career after 10th",
              "Career after 12th",
              "Study Abroad",
              "Relationship Issues",
              "Stress / Anxiety",
              "Career Switch",
              "Exam Stress",
              "Life Coaching",
            ].map((item, i) => (
              <div
                key={i}
                className="px-4 py-2 bg-gray-800 text-white text-sm rounded-full border border-gray-700 hover:bg-yellow-500 hover:text-black transition cursor-pointer"
              >
                {item}
              </div>
            ))}
          </div>

          {/* SLIDER */}
          <div className="mt-16 overflow-hidden">
            <motion.div
              className="flex gap-5 w-max"
              animate={isHovering ? {} : { x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              {counselors.map((c, i) => (
                <div
                  key={i}
                  className="w-56 bg-gray-900 rounded-xl p-4 text-center border border-gray-800"
                >
                  <Image
                    src={c.image}
                    alt={c.name}
                    width={60}
                    height={60}
                    className="rounded-full mx-auto border-2 border-yellow-500"
                  />
                  <h3 className="text-white mt-2 text-sm font-semibold">
                    {c.name}
                  </h3>
                  <p className="text-yellow-500 text-xs">{c.tag}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </section>

      <AppModal isOpen={appModal} onClose={() => setAppModal(false)} />
    </>
  );
}