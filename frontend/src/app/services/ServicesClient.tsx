"use client";
import { ArrowRight, Sparkles, Compass, BookOpen, Plane, FileText, Target, Briefcase, GraduationCap } from "lucide-react";
import Link from "next/link";

const services = [
  {
    id: "career",
    icon: Compass,
    title: "Career Counselling",
    desc: "Find your perfect career path with expert guidance and psychometric assessments.",
    features: ["Psychometric tests", "Strengths mapping", "Career roadmap"],
  },
  {
    id: "stream",
    icon: BookOpen,
    title: "Stream Selection",
    desc: "Choose the right stream after Class 10 with data-backed analysis.",
    features: ["Aptitude profiling", "Stream comparison", "Future scope"],
  },
  {
    id: "abroad",
    icon: Plane,
    title: "Study Abroad",
    desc: "Complete guidance for studying abroad - from university selection to visa.",
    features: ["University shortlisting", "SOP assistance", "Visa guidance"],
  },
  {
    id: "college",
    icon: GraduationCap,
    title: "College Selection",
    desc: "Find the perfect college matching your profile and career goals.",
    features: ["College shortlisting", "Cut-off analysis", "Placement review"],
  },
  {
    id: "exam",
    icon: Target,
    title: "Exam Guidance",
    desc: "Strategic preparation for competitive exams like JEE, NEET, CUET, UPSC.",
    features: ["Exam strategy", "Time management", "Mock analysis"],
  },
  {
    id: "resume",
    icon: FileText,
    title: "Resume & Interview",
    desc: "ATS-friendly resume, LinkedIn makeover, and mock interview sessions.",
    features: ["Resume writing", "Mock interviews", "Salary negotiation"],
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-black pt-20">
      {/* Hero */}
      <div className="py-16 px-4 text-center border-b border-white/5">
        <div className="container mx-auto max-w-3xl">
          <span className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
            <Sparkles size={12} />
            Expert Guidance
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-white">
            Your Career,{" "}
            <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
              Our Expertise
            </span>
          </h1>
          <p className="text-gray-400 mt-4 text-sm md:text-base">
            One-on-one sessions with verified experts. Personalized guidance for your unique career journey.
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {services.map((service) => (
            <div
              key={service.id}
              className="group bg-black/40 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-yellow-500/40 hover:-translate-y-1 transition-all duration-300 p-6"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center mb-4 shadow-lg shadow-yellow-500/20">
                <service.icon size={24} className="text-black" />
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                {service.desc}
              </p>

              {/* Features */}
              <div className="space-y-1.5 mb-5">
                {service.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2 text-xs text-gray-500">
                    <span className="text-yellow-500">✦</span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              {/* Button */}
              <Link
                href="/counselors"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold text-sm hover:shadow-lg hover:shadow-yellow-500/25 transition-all duration-300"
              >
                Book a Session <ArrowRight size={14} />
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      {/* <div className="container mx-auto px-4 pb-16">
        <div className="bg-gradient-to-r from-yellow-500/10 to-yellow-600/5 rounded-3xl p-8 text-center border border-yellow-500/20 max-w-3xl mx-auto">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
            Need help choosing?
          </h2>
          <p className="text-gray-400 text-sm mb-5">
            Talk to our experts and get personalized recommendations
          </p>
          <Link
            href="/counselors"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold hover:shadow-lg hover:shadow-yellow-500/25 transition-all duration-300 text-sm"
          >
            Find a Counselor <ArrowRight size={16} />
          </Link>
        </div>
      </div> */}
    </div>
  );
}