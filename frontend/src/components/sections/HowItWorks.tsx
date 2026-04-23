"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { UserPlus, Calendar, MessageCircle, CheckCircle, Sparkles, ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: UserPlus,
    title: "Choose Your Expert",
    desc: "Browse verified counselors filtered by expertise, language, ratings, and price. Read bios and reviews to find your perfect match.",
    color: "from-yellow-500 to-yellow-600",
    delay: 0,
  },
  {
    number: "02",
    icon: Calendar,
    title: "Book a Session",
    desc: "Pick a convenient time slot and book instantly. Pay securely online. Receive a confirmation and pre-session questionnaire.",
    color: "from-yellow-500 to-yellow-600",
    delay: 0.2,
  },
  {
    number: "03",
    icon: MessageCircle,
    title: "Get Clear Guidance",
    desc: "Join a private 1-on-1 video or chat session. Get a personalized career roadmap, action plan, and resources — tailored just for you.",
    color: "from-yellow-500 to-yellow-600",
    delay: 0.4,
  },
];

export default function HowItWorks() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-black relative overflow-hidden">
      {/* Animated Background - Yellow */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-40 left-1/4 w-80 h-80 bg-yellow-500/15 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -bottom-40 right-1/4 w-80 h-80 bg-yellow-600/10 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-yellow-500/10 rounded-full blur-[120px]"
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-4"
          >
            <Sparkles size={14} className="text-yellow-500" />
            <span className="text-yellow-400 text-xs font-semibold tracking-wide">SIMPLE PROCESS</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
          >
            3 steps to{" "}
            <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
              career clarity
            </span>
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-24 h-1 bg-gradient-to-r from-yellow-500 to-transparent mx-auto"
          />
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 relative">
          {/* Connector Lines - Desktop */}
          <div className="hidden md:block absolute top-32 left-[calc(16.66%+2rem)] right-[calc(16.66%+2rem)] z-0">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1, delay: 0.5 }}
              className="w-full h-0.5 bg-gradient-to-r from-yellow-500/20 via-yellow-500 to-yellow-500/20 origin-left"
            />
            {/* Animated Dot on Line - Yellow */}
            <motion.div
              initial={{ left: "0%" }}
              animate={isInView ? { left: "100%" } : {}}
              transition={{ duration: 2, delay: 0.8, repeat: Infinity }}
              className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-yellow-500 rounded-full shadow-lg shadow-yellow-500/50"
            />
          </div>

          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: step.delay, type: "spring", stiffness: 100 }}
              className="relative z-10"
            >
              <div className="flex flex-col items-center text-center group">
                {/* Step Number Badge */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="relative mb-6"
                >
                  <div className="absolute -inset-2 bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative w-28 h-28 rounded-2xl bg-gradient-to-br from-black to-gray-900 border-2 border-yellow-500/30 flex flex-col items-center justify-center shadow-2xl group-hover:border-yellow-500 group-hover:shadow-yellow-500/20 transition-all duration-300">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 rounded-2xl border border-yellow-500/20"
                    />
                    <step.icon size={32} className="text-yellow-500 mb-1" />
                    <span className="text-yellow-500 text-xs font-bold">{step.number}</span>
                  </div>
                  
                  {/* Step Counter Circle - Yellow */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: step.delay + 0.2 }}
                    className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 flex items-center justify-center shadow-lg"
                  >
                    <span className="text-black text-xs font-bold">{i + 1}</span>
                  </motion.div>
                </motion.div>

                {/* Title */}
                <motion.h3
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.3, delay: step.delay + 0.1 }}
                  className="text-white font-bold text-xl mb-3 group-hover:text-yellow-400 transition-colors duration-300"
                >
                  {step.title}
                </motion.h3>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.3, delay: step.delay + 0.2 }}
                  className="text-gray-400 text-sm leading-relaxed max-w-xs"
                >
                  {step.desc}
                </motion.p>

                {/* Step Indicator Line (Mobile) */}
                {i < steps.length - 1 && (
                  <div className="md:hidden w-px h-8 bg-gradient-to-b from-yellow-500/50 to-transparent my-4" />
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <a
              href="/counselors"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold text-sm hover:shadow-lg hover:shadow-yellow-500/25 transition-all duration-300"
            >
              Start Your Journey Now
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
          
          {/* <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.8 }}
            className="text-gray-500 text-xs mt-4"
          >
            <CheckCircle size={12} className="inline text-yellow-500 mr-1" />
            No commitment required • 100% secure • Money-back guarantee
          </motion.p> */}
        </motion.div>
      </div>
    </section>
  );
}