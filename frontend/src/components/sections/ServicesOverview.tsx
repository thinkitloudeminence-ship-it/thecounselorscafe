"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { 
  ArrowRight, Sparkles, 
  GraduationCap, Heart, Baby, BriefcaseBusiness, 
  Landmark, Scale, Activity,
  Users, Globe, Rocket, Target, Brain, TrendingUp
} from "lucide-react";

const services = [
  {
    icon: GraduationCap,
    title: "Career & Education",
    desc: "Expert guidance for stream selection, career planning, study abroad, exam prep, and academic success.",
    href: "/services#career",
    color: "from-amber-500 to-yellow-600",
  },
  {
    icon: Heart,
    title: "Relationships & Family",
    desc: "Build stronger relationships with family, partners, and friends through expert counselling and guidance.",
    href: "/services#relationships",
    color: "from-rose-500 to-pink-500",
  },
  {
    icon: Baby,
    title: "Parenting & Child Development",
    desc: "Navigate every stage of parenting — from infancy to adolescence — with trusted expert advice.",
    href: "/services#parenting",
    color: "from-emerald-500 to-green-500",
  },
  {
    icon: BriefcaseBusiness,
    title: "Business & Entrepreneurship",
    desc: "Start, grow, or scale your business with expert mentorship, strategy, and operational guidance.",
    href: "/services#business",
    color: "from-violet-500 to-purple-500",
  },
  {
    icon: Landmark,
    title: "Finance & Taxation",
    desc: "Smart financial planning, investment strategies, tax optimization, and wealth management advice.",
    href: "/services#finance",
    color: "from-teal-500 to-emerald-500",
  },
  {
    icon: Scale,
    title: "Legal Guidance",
    desc: "Get clarity on legal matters — from property and family law to contracts and dispute resolution.",
    href: "/services#legal",
    color: "from-blue-600 to-indigo-500",
  },
  {
    icon: Activity,
    title: "Health & Lifestyle",
    desc: "Holistic wellness, mental health, fitness, nutrition, and lifestyle coaching for a better you.",
    href: "/services#health",
    color: "from-orange-500 to-red-500",
  },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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
          className="text-center mb-16"
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

        {/* Services Grid - Centered */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16"
        >
          {services.map((s) => (
            <motion.div
              key={s.title}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { type: "spring", stiffness: 300 } }}
              className="perspective-1000"
            >
              <Link href={s.href} className="block relative group h-full">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition duration-500" />

                <div className="relative bg-white border border-gray-200 rounded-2xl p-6 hover:border-yellow-500/50 transition-all duration-500 h-full overflow-hidden shadow-lg hover:shadow-xl flex flex-col items-center text-center">
                  
                  {/* Icon - Centered */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-5 shadow-lg relative overflow-hidden flex-shrink-0`}>
                    <s.icon size={32} className="text-white relative z-10" strokeWidth={1.5} />
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Title - Centered */}
                  <h3 className="text-gray-900 font-bold text-xl mb-3 transition-all duration-300 group-hover:text-yellow-500">
                    {s.title}
                    <div className="h-0.5 bg-gradient-to-r from-yellow-500 to-transparent mt-1 w-0 group-hover:w-full transition-all duration-300 mx-auto" />
                  </h3>

                  {/* Description - Centered */}
                  <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-1">
                    {s.desc}
                  </p>

                  {/* Discover more - Centered */}
                  <span className="inline-flex items-center gap-2 text-yellow-500 text-sm font-semibold group-hover:text-yellow-600 transition-all duration-300">
                    <span>Discover more</span>
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight size={14} />
                    </motion.span>
                  </span>

                  {/* Decorative corner */}
                  <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                    <div className="absolute top-0 right-0 w-8 h-8 bg-yellow-500/10 -translate-y-1/2 translate-x-1/2 rotate-45" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Categories Pills */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-3 md:gap-4 pt-4 border-t border-gray-200"
        >
          <span className="text-gray-400 text-sm font-medium mr-2">Categories:</span>
          {[
            "Career & Education",
            "Relationships & Family",
            "Parenting & Child Development",
            "Business & Entrepreneurship",
            "Finance & Taxation",
            "Legal Guidance",
            "Health & Lifestyle",
          ].map((category, idx) => (
            <motion.span
              key={category}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.5 + idx * 0.05 }}
              whileHover={{ scale: 1.05, backgroundColor: "#FEF3C7" }}
              className="px-4 py-2 rounded-full bg-gray-50 border border-gray-200 text-gray-600 text-sm font-medium hover:border-yellow-400 transition-all duration-300 cursor-default"
            >
              {category}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}