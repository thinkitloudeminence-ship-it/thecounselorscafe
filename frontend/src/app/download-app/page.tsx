"use client";
import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Apple, Smartphone, Star, Users, Award, CheckCircle, ArrowRight, Sparkles, TrendingUp, Clock, Shield, Globe, PlayCircle,  Calendar} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function AppPage() {
  const [activeUserType, setActiveUserType] = useState<"student" | "counselor">("student");
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.98]);

  const studentSteps = [
    { icon: Smartphone, title: "Download App", desc: "Get the app from App Store or Play Store" },
    { icon: Users, title: "Sign Up as Student", desc: "Create your profile in under 2 minutes" },
    { icon: TrendingUp, title: "Choose Career Area", desc: "Select your interest or career domain" },
    { icon: Calendar, title: "Book Session", desc: "Pick a counselor and schedule your session" },
    { icon: Award, title: "Get Guidance", desc: "Receive personalized career roadmap" },
  ];

  const counselorSteps = [
    { icon: Award, title: "Register as Counselor", desc: "Sign up and create your professional profile" },
    { icon: Shield, title: "Submit Profile", desc: "Share your credentials and expertise areas" },
    { icon: CheckCircle, title: "Get Verified", desc: "We verify your qualifications within 24h" },
    { icon: Users, title: "Start Receiving Students", desc: "Get matched with students seeking your expertise" },
    { icon: TrendingUp, title: "Earn & Grow", desc: "Build your reputation and increase earnings" },
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-black">
      {/* Animated Gradient Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-yellow-500/5 via-transparent to-transparent" />
        <div className="absolute top-1/4 -left-1/4 w-[500px] h-[500px] bg-yellow-500/10 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] bg-yellow-600/10 rounded-full blur-[120px] animate-pulse-slow animation-delay-2000" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-6"
              >
                <Sparkles size={14} className="text-yellow-500" />
                <span className="text-yellow-400 text-sm font-medium">Your Career Companion</span>
              </motion.div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6">
                Start Your{" "}
                <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
                  Career Journey
                </span>
                <br />
                with Our App
              </h1>

              <p className="text-gray-400 text-lg leading-relaxed mb-8 max-w-lg">
                Get personalized career guidance, connect with expert counselors, and make informed decisions about your future — all from the palm of your hand.
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-3 px-6 py-3 rounded-xl bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold shadow-lg shadow-yellow-500/25 hover:shadow-yellow-500/40 transition-all duration-300"
                >
                  <Smartphone size={20} />
                  Download for Students
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-3 px-6 py-3 rounded-xl border border-white/20 text-white font-semibold hover:bg-white/5 transition-all duration-300"
                >
                  <Users size={20} />
                  Join as Counselor
                </motion.button>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Users size={16} className="text-yellow-500" />
                  <span className="text-white text-sm font-medium">50,000+</span>
                  <span className="text-gray-500 text-sm">Students</span>
                </div>
                <div className="w-px h-6 bg-white/20" />
                <div className="flex items-center gap-2">
                  <Star size={16} className="text-yellow-500 fill-yellow-500" />
                  <span className="text-white text-sm font-medium">4.9</span>
                  <span className="text-gray-500 text-sm">Rating</span>
                </div>
                <div className="w-px h-6 bg-white/20" />
                <div className="flex items-center gap-2">
                  <Award size={16} className="text-yellow-500" />
                  <span className="text-white text-sm font-medium">200+</span>
                  <span className="text-gray-500 text-sm">Counselors</span>
                </div>
              </div>
            </motion.div>

            {/* Right Side - 3D Phone Mockup */}
            <motion.div
              initial={{ opacity: 0, x: 50, rotateY: 15 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
              className="relative"
            >
              <div className="relative w-full max-w-sm mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 rounded-3xl blur-2xl" />
                <div className="relative bg-black/60 backdrop-blur-xl rounded-3xl p-4 border border-white/10 shadow-2xl">
                  {/* Phone Frame */}
                  <div className="bg-black rounded-2xl overflow-hidden">
                    <div className="p-4 border-b border-white/10">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 flex items-center justify-center">
                          <span className="text-black font-bold text-xs">C</span>
                        </div>
                        <div className="flex-1">
                          <div className="h-2 w-24 bg-white/20 rounded-full" />
                          <div className="h-1.5 w-16 bg-white/10 rounded-full mt-1" />
                        </div>
                      </div>
                    </div>
                    <div className="p-4 space-y-4">
                      {[1, 2, 3].map((i) => (
                        <motion.div
                          key={i}
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
                          className="bg-white/5 rounded-xl p-3 border border-white/10"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center">
                              <Users size={16} className="text-yellow-500" />
                            </div>
                            <div className="flex-1">
                              <div className="h-2 w-32 bg-white/20 rounded-full" />
                              <div className="h-1.5 w-24 bg-white/10 rounded-full mt-1" />
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* App Download Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Download The App
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Available on both iOS and Android. Get started in minutes.
            </p>
          </motion.div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-16">
            <motion.a
              whileHover={{ scale: 1.05, y: -5 }}
              href="#"
              className="flex items-center gap-4 px-8 py-4 rounded-xl bg-white/5 border border-white/10 hover:border-yellow-500/50 transition-all duration-300"
            >
              <Apple size={32} className="text-white" />
              <div>
                <p className="text-gray-400 text-xs">Download on</p>
                <p className="text-white font-semibold text-lg">App Store</p>
              </div>
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.05, y: -5 }}
              href="#"
              className="flex items-center gap-4 px-8 py-4 rounded-xl bg-white/5 border border-white/10 hover:border-yellow-500/50 transition-all duration-300"
            >
              <PlayCircle size={32} className="text-white" />
              <div>
                <p className="text-gray-400 text-xs">Get it on</p>
                <p className="text-white font-semibold text-lg">Google Play</p>
              </div>
            </motion.a>
          </div>

          {/* Trust Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-8"
          >
            <div className="flex items-center gap-2">
              <Shield size={16} className="text-yellow-500" />
              <span className="text-gray-400 text-sm">Secure & Private</span>
            </div>
            <div className="w-px h-4 bg-white/20 hidden sm:block" />
            <div className="flex items-center gap-2">
              <Globe size={16} className="text-yellow-500" />
              <span className="text-gray-400 text-sm">Available Worldwide</span>
            </div>
            <div className="w-px h-4 bg-white/20 hidden sm:block" />
            <div className="flex items-center gap-2">
              <CheckCircle size={16} className="text-yellow-500" />
              <span className="text-gray-400 text-sm">Free to Download</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works - Student Flow */}
      <section className="py-20 border-t border-white/5">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              How It Works for{" "}
              <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
                Students
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Get personalized career guidance in 5 simple steps
            </p>
          </motion.div>

          <div className="relative">
            {/* Connecting Line */}
            <div className="absolute left-[28px] top-12 bottom-12 w-px bg-gradient-to-b from-yellow-500/30 via-yellow-500/30 to-transparent hidden md:block" />
            
            <div className="space-y-8">
              {studentSteps.map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="flex gap-6 relative"
                >
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center shadow-lg shadow-yellow-500/20">
                      <step.icon size={24} className="text-black" />
                    </div>
                  </div>
                  <div className="flex-1 pb-8">
                    <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                    <p className="text-gray-400">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Counselor Flow */}
      <section className="py-20 border-t border-white/5">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              How It Works for{" "}
              <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
                Counselors
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Join our platform and grow your practice
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {counselorSteps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-yellow-500/40 transition-all duration-300 text-center group"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-yellow-500/20 group-hover:scale-110 transition-transform">
                  <step.icon size={24} className="text-black" />
                </div>
                <div className="text-yellow-500 text-sm font-bold mb-2">Step {idx + 1}</div>
                <h3 className="text-white font-semibold text-base mb-2">{step.title}</h3>
                <p className="text-gray-500 text-xs">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Feature Section */}
      <section className="py-20 border-t border-white/5">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Choose Your{" "}
              <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
                Experience
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Whether you're seeking guidance or offering expertise, we've got you covered
            </p>
          </motion.div>

          <div className="max-w-2xl mx-auto">
            {/* Toggle */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex p-1 rounded-full bg-white/5 border border-white/10">
                <button
                  onClick={() => setActiveUserType("student")}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeUserType === "student"
                      ? "bg-yellow-500 text-black"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  For Students
                </button>
                <button
                  onClick={() => setActiveUserType("counselor")}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeUserType === "counselor"
                      ? "bg-yellow-500 text-black"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  For Counselors
                </button>
              </div>
            </div>

            {/* Animated Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeUserType}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 rounded-2xl p-8 border border-yellow-500/20"
              >
                {activeUserType === "student" ? (
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-yellow-500/20 flex items-center justify-center">
                        <Users size={24} className="text-yellow-500" />
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-lg">Personalized Matching</h3>
                        <p className="text-gray-400 text-sm">Get matched with the perfect counselor for your needs</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-yellow-500/20 flex items-center justify-center">
                        <Star size={24} className="text-yellow-500" />
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-lg">Verified Experts</h3>
                        <p className="text-gray-400 text-sm">All counselors are thoroughly vetted</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-yellow-500/20 flex items-center justify-center">
                        <Calendar size={24} className="text-yellow-500" />
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-lg">Flexible Scheduling</h3>
                        <p className="text-gray-400 text-sm">Book sessions at your convenience</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-yellow-500/20 flex items-center justify-center">
                        <TrendingUp size={24} className="text-yellow-500" />
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-lg">Grow Your Practice</h3>
                        <p className="text-gray-400 text-sm">Reach students across the country</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-yellow-500/20 flex items-center justify-center">
                        <Shield size={24} className="text-yellow-500" />
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-lg">Verified Credentials</h3>
                        <p className="text-gray-400 text-sm">Build trust with verified badges</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-yellow-500/20 flex items-center justify-center">
                        <Award size={24} className="text-yellow-500" />
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-lg">Earn & Grow</h3>
                        <p className="text-gray-400 text-sm">Competitive earnings and growth opportunities</p>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 border-t border-white/5">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 rounded-3xl p-12 text-center border border-yellow-500/20"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 via-transparent to-yellow-600/10" />
            
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Download the App and{" "}
              <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
                Get Started Today
              </span>
            </h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              Join thousands of students and counselors already using our platform
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold shadow-lg shadow-yellow-500/25 hover:shadow-yellow-500/40 transition-all duration-300"
              >
                <Smartphone size={20} />
                Download App
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-3 px-8 py-4 rounded-xl border border-white/20 text-white font-semibold hover:bg-white/5 transition-all duration-300"
              >
                Explore Counselors
                <ArrowRight size={18} />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.1); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}