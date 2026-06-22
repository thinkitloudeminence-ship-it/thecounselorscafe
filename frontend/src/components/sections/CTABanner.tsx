"use client";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Smartphone, Sparkles, Rocket, Target, CheckCircle2, Stars, Zap } from "lucide-react";
import AppModal from "@/components/ui/AppModal";

export default function CTABanner() {
  const [appModal, setAppModal] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  return (
    <>
      <section ref={sectionRef} className="py-16 md:py-24 bg-black relative overflow-hidden">
        {/* Animated Background Glows - Yellow */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-500/20 rounded-full blur-[120px]"
          />
          <motion.div
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute top-1/4 right-1/4 w-80 h-80 bg-yellow-600/15 rounded-full blur-[100px]"
          />
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.3, 0.15] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-[120px]"
          />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
            className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-8 md:p-12 lg:p-16 text-center border border-yellow-500/20 shadow-2xl shadow-yellow-500/10"
          >
            {/* Animated Border Glow - Yellow */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-3xl bg-gradient-to-r from-yellow-500/20 via-yellow-600/20 to-yellow-500/20"
              style={{ filter: "blur(40px)" }}
            />
            
            {/* Decorative Floating Elements - Yellow */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-10 left-10 w-20 h-20 bg-yellow-500/10 rounded-full blur-2xl"
            />
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-10 right-10 w-24 h-24 bg-yellow-600/10 rounded-full blur-2xl"
            />
            
            {/* Content */}
            <div className="relative z-10">
              {/* Animated Badge - Yellow */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/20 border border-yellow-500/30 mb-6"
              >
                <Sparkles size={14} className="text-yellow-500" />
                <span className="text-yellow-400 text-xs font-semibold tracking-wide">LIMITED TIME OFFER</span>
                <Sparkles size={14} className="text-yellow-500" />
              </motion.div>

              {/* Main Heading - Yellow Gradient */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight mb-4"
              >
                Ready to{" "}
                <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
                  transform your future?
                </span>
              </motion.h2>

              {/* Slogan */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto mb-6"
              >
                Join 50,000+ students who found their path to success. Your career journey starts with one conversation.
              </motion.p>

              {/* Feature List - Yellow Icons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex flex-wrap justify-center gap-4 mb-8"
              >
                {[
                  { icon: CheckCircle2, text: "Free Consultation" },
                  { icon: Rocket, text: "Fast Results" },
                  { icon: Target, text: "Expert Guidance" },
                  { icon: Stars, text: "100% Satisfaction" }
                ].map((item, i) => (
                  <motion.div
                    key={item.text}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: 0.6 + i * 0.05 }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10"
                  >
                    <item.icon size={12} className="text-yellow-500" />
                    <span className="text-gray-400 text-xs">{item.text}</span>
                  </motion.div>
                ))}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/counselors"
                    className="group flex items-center justify-center gap-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold px-8 py-4 rounded-2xl hover:shadow-2xl hover:shadow-yellow-500/30 transition-all duration-300 text-base"
                  >
                    Start Your Journey
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <button
                    onClick={() => setAppModal(true)}
                    className="group flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold px-8 py-4 rounded-2xl hover:bg-white/20 hover:border-yellow-500/50 transition-all duration-300 text-base"
                  >
                    <Smartphone size={18} />
                    Download App
                    <span className="bg-yellow-500 text-black text-[10px] font-bold px-1.5 py-0.5 rounded-full ml-1">FREE</span>
                  </button>
                </motion.div>
              </motion.div>

              {/* Trust Badge */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.9 }}
                className="mt-8 pt-6 border-t border-white/10"
              >
                <div className="flex flex-wrap items-center justify-center gap-4 text-gray-500 text-xs">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 size={12} className="text-green-500" />
                    No commitment
                  </span>
                  <span className="w-px h-3 bg-white/20 hidden sm:block" />
                  {/* <span className="flex items-center gap-1">
                    <CheckCircle2 size={12} className="text-green-500" />
                    Money-back guarantee
                  </span> */}
                  <span className="w-px h-3 bg-white/20 hidden sm:block" />
                  <span className="flex items-center gap-1">
                    <Zap size={12} className="text-yellow-500" />
                    Same day sessions
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <AppModal isOpen={appModal} onClose={() => setAppModal(false)} />
    </>
  );
}