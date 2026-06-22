"use client";
import { motion } from "framer-motion";
import { Star, Clock, Languages, CheckCircle, ChevronRight, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface Counselor {
  _id: string;
  name: string;
  title: string;
  expertise: string[];
  experience: number;
  rating: number;
  reviews: number;
  languages: string[];
  image: string;
  available: boolean;
  sessionsCompleted: number;
}

export default function CounselorCard({ c, index = 0 }: { c: Counselor; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      viewport={{ once: true }}
      className="bg-black/40 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-yellow-500/40 hover:-translate-y-1 transition-all duration-300 overflow-hidden group"
    >
      <div className="p-5">
        <div className="flex items-start gap-4">
          {/* Small Profile Image */}
          <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-yellow-500/50 group-hover:border-yellow-400 transition-all duration-300 flex-shrink-0">
            {c.image ? (
              <Image
                src={c.image}
                alt={c.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center">
                <User size={24} className="text-black" />
              </div>
            )}
            {c.available && (
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-black" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-white text-base truncate group-hover:text-yellow-400 transition-colors">
              {c.name}
            </h3>
            <p className="text-gray-400 text-xs mt-0.5 leading-snug">{c.title}</p>
            <div className="flex items-center gap-1 mt-1.5">
              <Star size={13} className="text-yellow-500 fill-yellow-500" />
              <span className="text-white font-semibold text-sm">{c.rating}</span>
              <span className="text-gray-500 text-xs">({c.reviews} reviews)</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-2 mt-4">
          <div className="bg-white/5 border border-white/10 rounded-xl p-2 text-center">
            <p className="text-yellow-500 font-bold text-sm">{c.experience}+ yrs</p>
            <p className="text-gray-500 text-[11px] mt-0.5">Experience</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-2 text-center">
            <p className="text-yellow-500 font-bold text-sm">{c.sessionsCompleted}+</p>
            <p className="text-gray-500 text-[11px] mt-0.5">Sessions</p>
          </div>
        </div>

        {/* Expertise tags */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {c.expertise.slice(0, 3).map((tag) => (
            <span key={tag} className="bg-yellow-500/10 text-yellow-400 text-[11px] font-medium px-2.5 py-1 rounded-lg border border-yellow-500/20">
              {tag}
            </span>
          ))}
        </div>

        {/* Languages */}
        <div className="flex items-center gap-1.5 mt-3 text-gray-500 text-xs">
          <Languages size={12} className="text-yellow-500" />
          <span className="text-gray-400">{c.languages.join(", ")}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-white/10 p-4">
        <Link
          href={`/counselors/${c._id}`}
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-semibold text-sm px-4 py-2.5 rounded-xl transition-all duration-300 shadow-lg shadow-yellow-500/25 hover:shadow-yellow-500/40"
        >
          Book Session
          <ChevronRight size={15} />
        </Link>
      </div>
    </motion.div>
  );
}