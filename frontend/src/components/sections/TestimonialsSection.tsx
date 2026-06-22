"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useInView, useMotionValue, animate } from "framer-motion";
import { Star, Quote, Sparkles } from "lucide-react";

interface Testimonial {
  _id: string;
  name: string;
  role: string;
  review: string;
  rating: number;
  counselor: string;
  date?: string;
}

const testimonials: Testimonial[] = [
  { 
    _id: "1", 
    name: "Sneha Gupta", 
    role: "Class 12 Student, Delhi", 
    review: "I was completely confused between PCM and PCB. After one session with Dr. Priya, I had complete clarity. She helped me understand myself better. Now I'm confidently preparing for Psychology honours at DU!", 
    rating: 5, 
    counselor: "Dr. Priya Sharma",
    date: "2 weeks ago"
  },
  { 
    _id: "2", 
    name: "Aryan Malhotra", 
    role: "Engineering Student, Pune", 
    review: "Rahul sir changed my mindset completely. He helped me find scholarships I never knew existed and guided me through my SOP. I'm now at University of Toronto on a 60% scholarship!", 
    rating: 5, 
    counselor: "Rahul Mehta",
    date: "1 month ago"
  },
  { 
    _id: "3", 
    name: "Priyanka Singh", 
    role: "MBA Fresher, Mumbai", 
    review: "Got placed at a top MNC within 3 weeks of working with Anjali ma'am. She completely revamped my resume and the mock interviews were incredible. Totally worth every rupee!", 
    rating: 5, 
    counselor: "Anjali Verma",
    date: "3 weeks ago"
  },
  { 
    _id: "4", 
    name: "Rohit Sharma", 
    role: "IIT Aspirant, Kota", 
    review: "The study abroad guidance was exceptional! From university selection to visa interview prep, every step was handled professionally. Highly recommended!", 
    rating: 5, 
    counselor: "Rahul Mehta",
    date: "1 week ago"
  },
  { 
    _id: "5", 
    name: "Neha Kapoor", 
    role: "Working Professional, Bangalore", 
    review: "Career counselling helped me switch from IT to Marketing. Got my dream job within 2 months! The roadmap provided was practical and easy to follow.", 
    rating: 5, 
    counselor: "Dr. Priya Sharma",
    date: "2 months ago"
  },
  { 
    _id: "6", 
    name: "Amit Patel", 
    role: "Engineering Student, Ahmedabad", 
    review: "Best career guidance I ever received! The counselor understood my strengths and suggested the perfect career path. Highly recommend!", 
    rating: 5, 
    counselor: "Dr. Priya Sharma",
    date: "1 week ago"
  },
];

export default function TestimonialsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [duplicatedTestimonials, setDuplicatedTestimonials] = useState(testimonials);
  const [mounted, setMounted] = useState(false);
  const [particles, setParticles] = useState<Array<{id: number; left: string; text: string}>>([]);
  
  useEffect(() => {
    setMounted(true);
    // Triple the testimonials for infinite effect
    setDuplicatedTestimonials([...testimonials, ...testimonials, ...testimonials]);
    
    // Generate particles only on client side
    const generatedParticles = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      text: Math.random() > 0.5 ? "010101" : "101010"
    }));
    setParticles(generatedParticles);
  }, []);

  const x = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!mounted) return;
    
    const controls = animate(x, -2000, {
      duration: 30,
      repeat: Infinity,
      ease: "linear",
      repeatType: "loop"
    });
    
    if (isHovered) {
      controls.stop();
    } else {
      controls.play();
    }
    
    return () => controls.stop();
  }, [isHovered, x, mounted]);

  if (!mounted) {
    return (
      <section className="py-20 bg-black overflow-hidden relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
              Reality Check
            </h2>
          </div>
          <div className="flex gap-6 overflow-hidden">
            {testimonials.slice(0, 3).map((t) => (
              <div key={t._id} className="flex-shrink-0 w-80">
                <div className="bg-black/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center text-black font-bold">
                      {t.name[0]}
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">{t.name}</h4>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm">{t.review.substring(0, 120)}...</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-black overflow-hidden relative">
      {/* Matrix-like background effect - Fixed hydration */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute text-yellow-500 text-xs font-mono"
            animate={{ y: [0, -1000] }}
            transition={{ duration: 10, repeat: Infinity, delay: particle.id * 0.1 }}
            style={{ left: particle.left }}
          >
            {particle.text}
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-4"
          >
            <Sparkles size={14} className="text-yellow-500" />
            <span className="text-yellow-400 text-xs font-semibold tracking-wide">REAL STORIES</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
            <span className="inline-block animate-pulse">✦</span>
            Reality Check
            <span className="inline-block animate-pulse">✦</span>
          </h2>
          <p className="text-gray-500 mt-2">Real stories from real people</p>
          
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.6 }}
            className="w-24 h-0.5 bg-gradient-to-r from-yellow-500 to-transparent mx-auto mt-4"
          />
        </motion.div>

        <div 
          ref={containerRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative overflow-hidden cursor-grab active:cursor-grabbing"
        >
          <motion.div
            style={{ x }}
            className="flex gap-6"
          >
            {duplicatedTestimonials.map((t, idx) => (
              <motion.div
                key={`${t._id}-${idx}`}
                className="flex-shrink-0 w-80 md:w-96"
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
              >
                <div className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-yellow-500/50 transition-all duration-300 h-full group">
                  <div className="flex items-center gap-3 mb-4">
                    <motion.div 
                      className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center text-black font-bold shadow-lg"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      {t.name[0]}
                    </motion.div>
                    <div>
                      <h4 className="text-white font-semibold group-hover:text-yellow-400 transition-colors">
                        {t.name}
                      </h4>
                      <div className="flex gap-0.5 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={12} 
                            className={i < t.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-600'} 
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <Quote size={20} className="text-yellow-500/40 mb-2" />
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {t.review.length > 120 ? `${t.review.substring(0, 120)}...` : t.review}
                  </p>
                  <div className="mt-4 pt-3 border-t border-white/10">
                    <p className="text-yellow-500 text-xs">✨ Guided by {t.counselor}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Gradient masks on edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent pointer-events-none" />
      </div>
    </section>
  );
}