"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  ArrowRight, Sparkles,
  GraduationCap, Heart, Brain, Baby,
  BriefcaseBusiness, Scale, Activity,
  Shield
} from "lucide-react";

// 7 Main Categories
const categories = [
  {
    id: "education-career",
    icon: GraduationCap,
    title: "Education & Career",
    color: "from-amber-500 to-yellow-600",
    desc: "Expert guidance for career planning, study abroad, exam prep, and academic success.",
    features: [
      "Career Counseling",
      "Stream Selection (7th onwards)",
      "College Admissions",
      "Study Abroad Guidance",
      "Scholarship Guidance",
      "Resume Review",
      "Interview Preparation",
    ],
  },
  {
    id: "relationships-family",
    icon: Heart,
    title: "Relationships & Family",
    color: "from-rose-500 to-pink-500",
    desc: "Build stronger relationships with family, partners, and friends through expert counselling.",
    features: [
      "Relationship Counseling",
      "Marriage Counseling",
      "Premarital Guidance",
      "Parenting Support",
      "Teen Counseling",
      "Family Conflict Resolution",
      "Divorce & Separation Support",
    ],
  },
  {
    id: "mental-wellbeing",
    icon: Brain,
    title: "Mental & Emotional Well-being",
    color: "from-purple-500 to-violet-500",
    desc: "Support for stress, anxiety, depression, and overall mental well-being with professional care.",
    features: [
      "Stress Management",
      "Anxiety Support",
      "Burnout Recovery",
      "Confidence Building",
      "Emotional Wellness",
      "Life Coaching",
      "Mindfulness",
    ],
  },
  {
    id: "parenting",
    icon: Baby,
    title: "Parenting",
    color: "from-emerald-500 to-green-500",
    desc: "Navigate every stage of parenting from infancy to adolescence with trusted expert advice.",
    features: [
      "Learning Difficulties",
      "Child Behaviour",
      "Parenting Coaching",
      "School Readiness",
      "Special Education Guidance",
    ],
  },
  {
    id: "legal-documentation",
    icon: Scale,
    title: "Legal & Documentation",
    color: "from-blue-600 to-indigo-500",
    desc: "Get clarity on legal matters from property and family law to contracts and dispute resolution.",
    features: [
      "Property Matters",
      "Consumer Rights",
      "Employment Law",
      "Family Law",
      "Legal Documentation",
      "Government Schemes",
      "RTI & Public Services",
    ],
  },
  {
    id: "child-safety",
    icon: Shield,
    title: "Child Safety & Family Support",
    color: "from-teal-500 to-cyan-500",
    desc: "Support for child safety, bullying, trauma, and family well-being.",
    features: [
      "Child Abuse Support",
      "Bullying",
      "Emotional Trauma",
      "Parenting Guidance",
      "Child Behaviour Issues",
      "School Stress",
    ],
  },
  {
    id: "health-lifestyle",
    icon: Activity,
    title: "Health & Lifestyle",
    color: "from-orange-500 to-red-500",
    desc: "Holistic wellness, fitness, nutrition, and lifestyle coaching for a better, healthier you.",
    features: [
      "Nutrition",
      "Diet Planning",
      "Fitness Coaching",
      "Women's Health Education",
      "Men's Health Education",
      "Senior Care Guidance",
      "Sleep Improvement",
    ],
  },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

export default function ServicesOverview() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-white relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-yellow-500/5 via-yellow-400/5 to-yellow-500/5 rounded-full blur-[120px]" />
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-500/20 to-transparent" />
        <div className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-500/20 to-transparent" />

        {/* Floating Dots */}
        <div className="absolute top-10 right-20 w-2 h-2 bg-yellow-500/30 rounded-full animate-pulse" />
        <div className="absolute bottom-20 left-10 w-3 h-3 bg-yellow-500/20 rounded-full animate-pulse animation-delay-1000" />
        <div className="absolute top-1/2 left-1/4 w-1.5 h-1.5 bg-yellow-500/25 rounded-full animate-pulse animation-delay-2000" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-50 border border-yellow-200 mb-4">
            <Sparkles size={14} className="text-yellow-500" />
            <span className="text-yellow-600 text-xs font-semibold tracking-wider">✦ EXPERT GUIDANCE ✦</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
              Expert Guidance
            </span>
            <br />
            <span>For Every Stage of Life</span>
          </h2>

          <div className="w-32 h-1 bg-gradient-to-r from-yellow-500 via-yellow-400 to-transparent mx-auto mb-4 rounded-full" />

          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            From career and relationships to health, finance, parenting, legal guidance, and personal growth—we connect you with the right expert, anytime.
          </p>
        </motion.div>

        {/* Categories Grid - Simple Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
        >
          {categories.map((cat) => (
            <motion.div
              key={cat.id}
              variants={itemVariants}
              whileHover={{ y: -6, transition: { type: "spring", stiffness: 300 } }}
              className="group"
            >
              <div className="bg-white border border-gray-200 rounded-2xl p-5 hover:border-amber-400 hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center mb-4 shadow-lg shadow-amber-500/20 flex-shrink-0`}>
                  <cat.icon size={24} className="text-white" strokeWidth={1.5} />
                </div>

                {/* Title */}
                <h3 className="text-gray-900 font-bold text-lg mb-2 group-hover:text-amber-500 transition-colors">
                  {cat.title}
                </h3>

                {/* Description */}
                <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-1">
                  {cat.desc}
                </p>

                {/* Features */}
                <div className="space-y-1.5 mb-5">
                  {cat.features.slice(0, 4).map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-xs text-gray-500">
                      <span className="text-amber-500">✦</span>
                      <span className="line-clamp-1">{feature}</span>
                    </div>
                  ))}
                  {cat.features.length > 4 && (
                    <div className="flex items-center gap-2 text-xs text-amber-500">
                      <span>+{cat.features.length - 4} more</span>
                    </div>
                  )}
                </div>

                {/* Enquire Button */}
                <Link
                  href="/counselors"
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold text-sm hover:shadow-lg hover:shadow-amber-500/25 transition-all duration-300"
                >
                  Enquire Now <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Categories Pills - Quick links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-2 md:gap-3 pt-8 mt-6 border-t border-gray-200"
        >
          <span className="text-gray-400 text-xs font-medium mr-1">Quick Links:</span>
          {categories.map((cat, idx) => (
            <motion.span
              key={cat.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.3 + idx * 0.03 }}
              whileHover={{ scale: 1.05, backgroundColor: "#FEF3C7" }}
              className="px-3 py-1.5 rounded-full bg-gray-50 border border-gray-200 text-gray-600 text-xs font-medium hover:border-yellow-400 transition-all duration-300 cursor-default"
            >
              {cat.title}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}