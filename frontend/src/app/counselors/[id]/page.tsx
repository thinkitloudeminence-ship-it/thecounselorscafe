"use client";
import { useState, useEffect, use } from "react";
import { motion } from "framer-motion";
import { Star, Languages, CheckCircle, ArrowLeft, Sparkles, Award, Users, Mail, Phone, MapPin, Calendar, Clock, GraduationCap} from "lucide-react";
import Link from "next/link";
import { fetchCounselor } from "@/lib/api";
import Image from "next/image";

// Fallback counselor data
const counselorsData: Record<string, any> = {
  "1": {
    _id: "1",
    name: "Dr. Priya Sharma",
    title: "Career & Stream Selection Expert",
    expertise: ["Stream Selection", "Career Counselling", "CUET"],
    experience: 8,
    rating: 4.9,
    reviews: 342,
    languages: ["Hindi", "English"],
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
    available: true,
    sessionsCompleted: 1200,
    email: "priya.sharma@counselorscafe.com",
    location: "New Delhi, India",
    education: "Ph.D. in Psychology, Delhi University",
    bio: "Dr. Priya Sharma has over 8 years of experience in career counselling. She has helped thousands of students choose the right career path. Her expertise includes stream selection, career counselling, and CUET guidance.",
    achievements: ["Best Career Counselor Award 2023", "Published 10+ research papers", "Guest speaker at 50+ schools"]
  },
  "2": {
    _id: "2",
    name: "Rahul Mehta",
    title: "Abroad Education Specialist",
    expertise: ["Study Abroad", "Visa", "University Selection"],
    experience: 6,
    rating: 4.8,
    reviews: 218,
    languages: ["Hindi", "English"],
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop",
    available: true,
    sessionsCompleted: 890,
    email: "rahul.mehta@counselorscafe.com",
    location: "Mumbai, India",
    education: "MBA in International Business, SP Jain",
    bio: "Rahul Mehta specializes in study abroad guidance. He has helped 500+ students get admission in top universities worldwide including USA, Canada, UK, and Australia.",
    achievements: ["Certified Study Abroad Counselor", "Former Education Counselor at British Council"]
  },
  "3": {
    _id: "3",
    name: "Anjali Verma",
    title: "Resume & Interview Coach",
    expertise: ["Resume Building", "Interview Prep"],
    experience: 5,
    rating: 4.7,
    reviews: 187,
    languages: ["Hindi", "English"],
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
    available: true,
    sessionsCompleted: 650,
    email: "anjali.verma@counselorscafe.com",
    location: "Bangalore, India",
    education: "MBA in HR, XLRI",
    bio: "Anjali Verma is an expert resume writer and interview coach. She has helped 1000+ professionals land their dream jobs at top companies like Google, Amazon, and Microsoft.",
    achievements: ["Certified Resume Writer", "LinkedIn Top Voice 2024"]
  },
  "4": {
    _id: "4",
    name: "Vikram Nair",
    title: "Engineering & Tech Career Expert",
    expertise: ["JEE Guidance", "Tech Careers"],
    experience: 10,
    rating: 4.9,
    reviews: 421,
    languages: ["Hindi", "English"],
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    available: true,
    sessionsCompleted: 1800,
    email: "vikram.nair@counselorscafe.com",
    location: "Pune, India",
    education: "B.Tech IIT Bombay, M.Tech Stanford",
    bio: "Vikram Nair is an engineering career expert who has guided 2000+ students towards successful tech careers. He specializes in JEE preparation and tech career guidance.",
    achievements: ["IIT Bombay Alumnus", "Former Google Engineer"]
  },
  "5": {
    _id: "5",
    name: "Meera Pillai",
    title: "Arts & Humanities Specialist",
    expertise: ["Arts Streams", "Law", "Journalism"],
    experience: 7,
    rating: 4.8,
    reviews: 156,
    languages: ["Hindi", "English", "Malayalam"],
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    available: true,
    sessionsCompleted: 780,
    email: "meera.pillai@counselorscafe.com",
    location: "Kochi, India",
    education: "MA in Journalism, Delhi University",
    bio: "Meera Pillai specializes in arts and humanities career guidance. She helps students explore creative career paths in journalism, law, design, and more.",
    achievements: ["Award-winning Journalist", "Career Coach Certification"]
  },
  "6": {
    _id: "6",
    name: "Arjun Kapoor",
    title: "Commerce & Finance Career Expert",
    expertise: ["CA Guidance", "Finance Careers", "MBA Prep"],
    experience: 9,
    rating: 4.9,
    reviews: 293,
    languages: ["Hindi", "English"],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    available: false,
    sessionsCompleted: 1100,
    email: "arjun.kapoor@counselorscafe.com",
    location: "Mumbai, India",
    education: "CA, MBA from IIM Ahmedabad",
    bio: "Arjun Kapoor is a finance career expert who has mentored 1000+ students for CA, CS, and MBA careers. He provides guidance for commerce students and finance professionals.",
    achievements: ["Gold Medalist CA", "IIM Ahmedabad Alumnus"]
  }
};

export default function CounselorDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [counselor, setCounselor] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = counselorsData[id];
    if (data) {
      setCounselor(data);
    } else {
      fetchCounselor(id)
        .then((res) => {
          if (res) setCounselor(res);
          else setCounselor(null);
        })
        .catch(() => setCounselor(null));
    }
    setLoading(false);
  }, [id]);

  if (loading) return (
    <div className="min-h-screen pt-20 flex items-center justify-center bg-black">
      <div className="w-10 h-10 border-3 border-yellow-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (!counselor) return (
    <div className="min-h-screen pt-20 flex flex-col items-center justify-center gap-4 bg-black">
      <p className="text-gray-400">Counselor not found</p>
      <Link href="/counselors" className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold px-6 py-3 rounded-xl">Browse All Counselors</Link>
    </div>
  );

  const initials = counselor.name?.split(" ").map((n: string) => n[0]).join("").slice(0, 2) || "C";

  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="container mx-auto px-4 md:px-6 py-8">
        <Link href="/counselors" className="inline-flex items-center gap-2 text-gray-400 hover:text-yellow-400 transition-colors text-sm mb-6">
          <ArrowLeft size={16} /> Back to Counselors
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main profile - Left Side */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            {/* Profile Header */}
            <div className="bg-black/40 backdrop-blur-sm rounded-3xl border border-white/10 p-6 md:p-8">
              <div className="flex flex-col md:flex-row items-start gap-6">
                {/* Profile Image */}
                <div className="relative w-32 h-32 rounded-full overflow-hidden border-3 border-yellow-500/50 flex-shrink-0">
                  {counselor.image ? (
                    <Image
                      src={counselor.image}
                      alt={counselor.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center">
                      <span className="text-black font-bold text-4xl">{initials}</span>
                    </div>
                  )}
                  {counselor.available && (
                    <span className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-black" />
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h1 className="text-2xl md:text-3xl font-bold text-white">{counselor.name}</h1>
                    {counselor.available ? (
                      <span className="flex items-center gap-1.5 bg-green-500/10 text-green-400 text-xs font-semibold px-3 py-1 rounded-full border border-green-500/30">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" /> Available
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 bg-gray-500/10 text-gray-400 text-xs font-semibold px-3 py-1 rounded-full border border-gray-500/30">
                        <span className="w-1.5 h-1.5 bg-gray-500 rounded-full" /> Busy
                      </span>
                    )}
                  </div>
                  <p className="text-yellow-500 text-sm mt-1 font-medium">{counselor.title}</p>
                  
                  <div className="flex items-center gap-4 mt-3 flex-wrap text-sm">
                    <span className="flex items-center gap-1">
                      <Star size={14} className="text-yellow-500 fill-yellow-500" />
                      <span className="font-bold text-white">{counselor.rating}</span>
                      <span className="text-gray-500">({counselor.reviews} reviews)</span>
                    </span>
                    <span className="w-px h-3 bg-white/20" />
                    <span className="flex items-center gap-1">
                      <Award size={14} className="text-yellow-500" />
                      <span className="text-gray-400">{counselor.experience}+ years exp.</span>
                    </span>
                    <span className="w-px h-3 bg-white/20" />
                    <span className="flex items-center gap-1">
                      <Users size={14} className="text-yellow-500" />
                      <span className="text-gray-400">{counselor.sessionsCompleted}+ sessions</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 mt-3 text-gray-500 text-sm">
                    <Languages size={14} className="text-yellow-500" />
                    <span className="text-gray-400">{counselor.languages?.join(", ") || "English"}</span>
                  </div>
                </div>
              </div>

              {/* Expertise Tags */}
              <div className="mt-6 flex flex-wrap gap-2">
                {counselor.expertise?.map((tag: string) => (
                  <span key={tag} className="bg-yellow-500/10 text-yellow-400 text-xs font-medium px-3 py-1.5 rounded-full border border-yellow-500/20">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* About Section */}
            <div className="bg-black/40 backdrop-blur-sm rounded-3xl border border-white/10 p-6 md:p-8">
              <h2 className="font-bold text-white text-lg mb-3 flex items-center gap-2">
                <Sparkles size={18} className="text-yellow-500" />
                About {counselor.name.split(" ")[0]}
              </h2>
              <p className="text-gray-400 leading-relaxed">{counselor.bio}</p>
            </div>

            {/* Education Section */}
            <div className="bg-black/40 backdrop-blur-sm rounded-3xl border border-white/10 p-6 md:p-8">
              <h2 className="font-bold text-white text-lg mb-3 flex items-center gap-2">
                <GraduationCap size={18} className="text-yellow-500" />
                Education & Qualifications
              </h2>
              <p className="text-gray-400 leading-relaxed">{counselor.education}</p>
            </div>

            {/* Achievements Section */}
            <div className="bg-black/40 backdrop-blur-sm rounded-3xl border border-white/10 p-6 md:p-8">
              <h2 className="font-bold text-white text-lg mb-3 flex items-center gap-2">
                <Award size={18} className="text-yellow-500" />
                Achievements
              </h2>
              <div className="space-y-2">
                {counselor.achievements?.map((achievement: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-2.5 text-sm text-gray-400">
                    <CheckCircle size={14} className="text-yellow-500 flex-shrink-0" />
                    {achievement}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact & Info Sidebar - Right Side */}
          <div className="lg:col-span-1">
            <div className="bg-black/40 backdrop-blur-sm rounded-3xl border border-white/10 p-6 sticky top-24">
              <h2 className="font-bold text-white text-lg mb-4 flex items-center gap-2">
                <Sparkles size={18} className="text-yellow-500" />
                Contact Information
              </h2>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center">
                    <Mail size={14} className="text-yellow-500" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Email</p>
                    <a href={`mailto:${counselor.email}`} className="text-white text-sm hover:text-yellow-400 transition-colors">
                      {counselor.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center">
                    <MapPin size={14} className="text-yellow-500" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Location</p>
                    <p className="text-white text-sm">{counselor.location}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center">
                    <Calendar size={14} className="text-yellow-500" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Experience</p>
                    <p className="text-white text-sm">{counselor.experience}+ years</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center">
                    <Users size={14} className="text-yellow-500" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Students Guided</p>
                    <p className="text-white text-sm">{counselor.sessionsCompleted}+</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-white/10">
                <h3 className="text-white font-semibold text-sm mb-3 flex items-center gap-2">
                  <Clock size={14} className="text-yellow-500" />
                  How to Book?
                </h3>
                <div className="space-y-2 text-sm text-gray-400">
                  <p>📱 Download our app to book sessions with {counselor.name.split(" ")[0]}</p>
                  <p>✅ Check real-time availability</p>
                  <p>💬 Chat directly with counselor</p>
                  <p>🎥 Video session available</p>
                </div>

                <div className="mt-4">
                  <Link
                    href="/download-app"
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold py-3 rounded-xl hover:shadow-lg hover:shadow-yellow-500/25 transition-all duration-300"
                  >
                    Download App to Book Session
                  </Link>
                </div>

                <p className="text-center text-xs text-gray-500 mt-3">
                  🔒 Secure • Verified Counselor • Money-back guarantee
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}