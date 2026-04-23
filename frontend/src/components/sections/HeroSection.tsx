"use client";
import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { X, Search, MapPin } from "lucide-react";
import AppModal from "@/components/ui/AppModal";

interface Counselor {
  name: string;
  tag: string;
  description: string;
  image: string;
  available: boolean;
  rating: number;
  experience: string;
  sessions: number;
}

const counselors: Counselor[] = [
  {
    name: "Dr. Priya Sharma",
    tag: "Stream Selection",
    description: "Helps students choose the right stream after 10th & 12th.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop",
    available: true,
    rating: 4.9,
    experience: "12+ years",
    sessions: 2450,
  },
  {
    name: "Rahul Mehta",
    tag: "Study Abroad",
    description: "Guides students for universities, SOP & visa process.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop",
    available: true,
    rating: 4.8,
    experience: "10+ years",
    sessions: 1890,
  },
  {
    name: "Anjali Verma",
    tag: "Resume Prep",
    description: "Builds ATS-friendly resumes & interview strategies.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop",
    available: true,
    rating: 4.9,
    experience: "8+ years",
    sessions: 2100,
  },
  {
    name: "Vikram Singh",
    tag: "Career Coach",
    description: "Expert guidance for career transitions and growth.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
    available: true,
    rating: 5.0,
    experience: "15+ years",
    sessions: 3200,
  },
];

export default function HeroSection() {
  const [appModal, setAppModal] = useState(false);
  const [selectedCounselor, setSelectedCounselor] = useState<Counselor | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [searchLocation, setSearchLocation] = useState("");

  const heroRef = useRef<HTMLElement>(null);

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

  const allCounselors = [...counselors, ...counselors];

  return (
    <>
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden bg-black">
        {/* Background Glow */}
        <div className="absolute inset-0">
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute top-20 left-1/4 w-96 h-96 bg-yellow-500/30 rounded-full blur-[120px]"
            style={{ x: mousePosition.x * 0.02, y: mousePosition.y * 0.02 }}
          />
        </div>

        <motion.div style={{ opacity }} className="container mx-auto px-4 pt-32 pb-20 text-center">
          {/* Heading */}
          <h1 className="text-6xl font-bold text-white">
            Clear Confusions with <span className="text-yellow-500">World's Best Counselors</span>
          </h1>

          {/* Search Bar - Image style */}
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
              <button className="bg-yellow-500 hover:bg-yellow-400 text-black font-medium px-6 py-2 rounded-full transition text-sm">
                <Search className="w-4 h-4 inline mr-1" />
                Search
              </button>
            </div>
          </div>

          {/* Categories - Original wali */}
          <div className="mt-10 flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {[
              "Career after 10th",
              "Career after 12th",
              "Study Abroad",
              "Relationship Issues",
              "Marriage Problems",
              "Stress / Anxiety",
              "Parenting Teenagers",
              "Job Change / Career Shift",
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

          {/* Slider - Cards ki size kam krdi */}
          <div className="mt-24 overflow-hidden">
            <motion.div
              className="flex gap-5 w-max"
              animate={isHovering ? {} : { x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              {allCounselors.map((c, i) => (
                <div
                  key={i}
                  className="w-64 bg-gray-900 rounded-xl p-4 text-center border border-gray-800 hover:border-yellow-500 transition"
                >
                  <Image
                    src={c.image}
                    alt={c.name}
                    width={70}
                    height={70}
                    className="rounded-full mx-auto border-2 border-yellow-500"
                  />

                  <h3 className="text-white mt-3 text-md font-semibold truncate">{c.name}</h3>
                  <p className="text-yellow-500 text-xs">{c.tag}</p>

                  <p className="text-gray-400 text-xs mt-2 line-clamp-2">{c.description}</p>

                  <div className="flex justify-between mt-3 text-xs text-gray-300">
                    <span>⭐ {c.rating}</span>
                    <span>🕒 {c.experience}</span>
                    <span>👥 {c.sessions}</span>
                  </div>

                  <button
                    onClick={() => setSelectedCounselor(c)}
                    className="mt-3 w-full bg-yellow-500 text-black py-1.5 rounded-lg text-sm font-medium hover:bg-yellow-400 transition"
                  >
                    View Details
                  </button>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Modal */}
      {selectedCounselor && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4" onClick={() => setSelectedCounselor(null)}>
          <div className="bg-gray-900 rounded-2xl max-w-md w-full p-6 relative border border-gray-800" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelectedCounselor(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="text-center">
              <Image
                src={selectedCounselor.image}
                alt={selectedCounselor.name}
                width={80}
                height={80}
                className="rounded-full mx-auto border-2 border-yellow-500"
              />
              <h3 className="text-white text-xl font-bold mt-4">{selectedCounselor.name}</h3>
              <p className="text-yellow-500 text-sm mt-1">{selectedCounselor.tag}</p>
              <div className="flex justify-center gap-4 mt-3 text-sm text-gray-400">
                <span>⭐ {selectedCounselor.rating}</span>
                <span>🎓 {selectedCounselor.experience}</span>
                <span>👥 {selectedCounselor.sessions} sessions</span>
              </div>
              <p className="text-gray-300 mt-4 text-sm">{selectedCounselor.description}</p>
              <button className="mt-6 w-full bg-yellow-500 text-black py-2 rounded-xl font-semibold hover:bg-yellow-400 transition">
                Book a Session
              </button>
            </div>
          </div>
        </div>
      )}

      <AppModal isOpen={appModal} onClose={() => setAppModal(false)} />
    </>
  );
}