"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { fetchTestimonials } from "@/lib/api";
import Link from "next/link";

const fallback = [
  { _id: "1", name: "Sneha Gupta", role: "Class 12 Student, Delhi", review: "I was completely confused between PCM and PCB. After one session with Dr. Priya, I had complete clarity. She didn't just give me an answer — she helped me understand myself better. Now I'm confidently preparing for Psychology honours at DU!", rating: 5, counselor: "Dr. Priya Sharma" },
  { _id: "2", name: "Aryan Malhotra", role: "Engineering Student, Pune", review: "I used to think studying abroad was only for rich kids. Rahul sir changed that mindset completely. He helped me find scholarships I never knew existed. I'm now at University of Toronto on a 60% scholarship!", rating: 5, counselor: "Rahul Mehta" },
  { _id: "3", name: "Priyanka Singh", role: "MBA Fresher, Mumbai", review: "Got placed at a top MNC within 3 weeks of working with Anjali ma'am. She completely revamped my resume and the mock interviews were incredible. Totally worth every rupee!", rating: 5, counselor: "Anjali Verma" },
  { _id: "4", name: "Rohit Joshi", role: "JEE Aspirant, Kota", review: "Vikram sir is a legend. He helped me not just with branch selection but also with managing pressure during JEE prep. Got CSE at NIT Trichy — a dream come true!", rating: 5, counselor: "Vikram Nair" },
  { _id: "5", name: "Tanvi Patel", role: "Class 10 Student, Ahmedabad", review: "Nobody in my family understood why I wanted to take Arts. Meera ma'am helped me present my case and showed my parents the real scope of Law and Psychology. Best decision of my life!", rating: 5, counselor: "Meera Pillai" },
  { _id: "6", name: "Dev Sharma", role: "Commerce Student, Jaipur", review: "Arjun sir helped me understand the difference between CA, CMA, and MBA — I had been Googling for months with no clarity. One session and I had my full plan ready!", rating: 5, counselor: "Arjun Kapoor" },
];

const colors = ["bg-orange-500", "bg-amber-500", "bg-red-400", "bg-yellow-500", "bg-orange-600", "bg-amber-600"];

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<any[]>(fallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials()
      .then((res) => { if (res?.data?.length) setTestimonials(res.data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const avg = (testimonials.reduce((a, t) => a + (t.rating || 5), 0) / testimonials.length).toFixed(1);

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <div className="bg-gray-950 py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-20" />
        <div className="container-custom relative text-center">
          <span className="inline-flex items-center gap-2 bg-orange-500/15 border border-orange-500/30 text-orange-300 text-xs font-semibold px-3 py-1.5 rounded-full uppercase tracking-widest mb-4">
            Student Reviews
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-white">Real students, <span className="gradient-text">real results</span></h1>
          <p className="text-gray-400 mt-3 max-w-xl mx-auto">Don't take our word for it. Here's what thousands of students and parents say about their experience.</p>
          {/* Rating summary */}
          <div className="inline-flex items-center gap-4 bg-white/10 border border-white/15 backdrop-blur-md rounded-2xl px-6 py-3 mt-8">
            <div className="text-center">
              <p className="text-3xl font-bold text-white">{avg}</p>
              <div className="flex gap-0.5 mt-1 justify-center">
                {[...Array(5)].map((_, i) => <Star key={i} size={12} className="text-orange-400" fill="currentColor" />)}
              </div>
            </div>
            <div className="w-px h-10 bg-white/20" />
            <div className="text-left">
              <p className="text-white font-semibold">{testimonials.length}+ Reviews</p>
              <p className="text-gray-400 text-xs">From verified sessions</p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials grid */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[...Array(6)].map((_, i) => <div key={i} className="bg-white rounded-2xl h-48 animate-pulse border border-gray-100" />)}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {testimonials.map((t, i) => (
                <motion.div
                  key={t._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  viewport={{ once: true }}
                  className="bg-white border border-gray-100 rounded-2xl p-6 shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-300"
                >
                  <Quote size={24} className="text-orange-200 mb-3" fill="currentColor" />
                  <p className="text-gray-600 text-sm leading-relaxed mb-5">"{t.review}"</p>
                  <div className="flex items-center gap-3 border-t border-gray-50 pt-4">
                    <div className={`w-10 h-10 rounded-xl ${colors[i % colors.length]} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                      {t.name[0]}
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-900 font-semibold text-sm">{t.name}</p>
                      <p className="text-gray-400 text-xs">{t.role}</p>
                    </div>
                    <div className="flex gap-0.5">
                      {[...Array(t.rating || 5)].map((_, j) => <Star key={j} size={11} className="text-orange-400" fill="currentColor" />)}
                    </div>
                  </div>
                  {t.counselor && (
                    <p className="text-xs text-gray-400 mt-2.5 pt-2.5 border-t border-gray-50">
                      Counselor: <span className="text-orange-500 font-medium">{t.counselor}</span>
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold text-gray-900">Ready to write <span className="gradient-text">your own story?</span></h2>
          <p className="text-gray-500 mt-3 mb-8">Join thousands of students who found clarity. Book your first session today.</p>
          <Link href="/counselors" className="btn-primary inline-flex items-center gap-2">
            Book a Session →
          </Link>
        </div>
      </section>
    </div>
  );
}
