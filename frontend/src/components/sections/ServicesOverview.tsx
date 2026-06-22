"use client";
import Link from "next/link";
import { ArrowRight, Compass, BookOpen, Plane, FileText, TrendingUp, Briefcase, Globe, Users, Sparkles, Rocket, Zap, Target, UserCircle, Heart, Crown, Award, Brain, Coffee, Camera } from "lucide-react";

const services = [
  {
    icon: Compass,
    title: "Career Counselling",
    desc: "One-on-one sessions to map your strengths, interests, and ideal career path based on psychometric assessment.",
    href: "/services#career",
  },
  {
    icon: BookOpen,
    title: "Stream Selection",
    desc: "Science, Commerce, or Arts? Make a data-backed decision after Class 10 that aligns with your future goals.",
    href: "/services#stream",
  },
  {
    icon: Plane,
    title: "Study Abroad",
    desc: "USA, UK, Canada, Australia — end-to-end guidance from university shortlisting to visa filing and scholarship applications.",
    href: "/services#abroad",
  },
  {
    icon: FileText,
    title: "Resume & Interview Prep",
    desc: "ATS-optimized resumes, LinkedIn profile building, and mock interviews to help freshers and experienced professionals land offers.",
    href: "/services#resume",
  },
  {
    icon: UserCircle,
    title: "Career Consultants",
    desc: "Connect with industry experts who provide personalized guidance, mentorship, and insider insights for your dream career.",
    href: "/services#consultants",
  },
  {
    icon: Heart,
    title: "Life Coach",
    desc: "Holistic development focusing on mindset, confidence building, work-life balance, and overcoming personal challenges.",
    href: "/services#lifecoach",
  },
  {
    icon: Camera,
    title: "Image Consultants",
    desc: "Professional grooming, personal branding, style makeover, and corporate etiquette to boost your confidence and presence.",
    href: "/services#image",
  },
];

const additionalServices = [
  { icon: TrendingUp, name: "Skill Development" },
  { icon: Briefcase, name: "Internship Guidance" },
  { icon: Globe, name: "Visa Assistance" },
  { icon: Users, name: "Group Mentorship" },
  { icon: Rocket, name: "Startup Guidance" },
  { icon: Target, name: "Goal Setting" },
  { icon: Crown, name: "Leadership Coaching" },
  { icon: Brain, name: "Mental Wellness" },
];

export default function ServicesOverview() {
  return (
    <section className="py-16 md:py-24 bg-black relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-yellow-500/10 via-purple-500/10 to-yellow-500/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent" />
        <div className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-500/30 to-transparent" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-4 backdrop-blur-sm">
            <Sparkles size={14} className="text-yellow-500" />
            <span className="text-yellow-400 text-xs font-semibold tracking-wider">✦ TRANSFORMATIVE SERVICES ✦</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            <span>Every</span>{" "}
            <span>career</span>{" "}
            <span>question,</span>
            <br />
            <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
              answered
            </span>
          </h2>

          <div className="w-32 h-1 bg-gradient-to-r from-yellow-500 via-yellow-400 to-transparent mx-auto mb-4 rounded-full" />

          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            From choosing the right stream to landing your dream job abroad — our experts cover every milestone of your career journey.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((s) => (
            <div key={s.title} className="perspective-1000">
              <Link href={s.href} className="block relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition duration-500" />

                <div className="relative bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-yellow-500/50 transition-all duration-500 h-full overflow-hidden">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center mb-5 shadow-lg shadow-yellow-500/20 relative overflow-hidden">
                    <s.icon size={32} className="text-black relative z-10" strokeWidth={1.5} />
                  </div>

                  <h3 className="text-white font-bold text-xl mb-3 transition-all duration-300 group-hover:text-yellow-400">
                    {s.title}
                    <div className="h-0.5 bg-gradient-to-r from-yellow-500 to-transparent mt-1 w-0 group-hover:w-full transition-all duration-300" />
                  </h3>

                  <p className="text-gray-400 text-sm leading-relaxed mb-4">
                    {s.desc}
                  </p>

                  <span className="inline-flex items-center gap-2 text-yellow-500 text-sm font-semibold group-hover:text-yellow-400 transition-all duration-300">
                    <span>Discover more</span>
                    <ArrowRight size={14} />
                  </span>

                  <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                    <div className="absolute top-0 right-0 w-8 h-8 bg-yellow-500/20 -translate-y-1/2 translate-x-1/2 rotate-45" />
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-gray-900/40 to-black/40 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-yellow-500/40 transition-all duration-500">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center">
                <Zap size={24} className="text-yellow-500" />
              </div>
              <div>
                <h4 className="text-white font-bold text-lg">Exclusive Add-ons</h4>
                <p className="text-gray-500 text-sm">Tailored solutions for your success</p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3">
              {additionalServices.map((service) => (
                <div
                  key={service.name}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:border-yellow-500/50 hover:bg-yellow-500/20 transition-all duration-300 cursor-pointer group"
                >
                  <service.icon size={14} className="text-yellow-500 group-hover:text-yellow-400" />
                  <span className="text-gray-300 text-sm font-medium group-hover:text-yellow-400 transition-colors">
                    {service.name}
                  </span>
                </div>
              ))}
            </div>

            <Link 
              href="/services" 
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold text-sm hover:shadow-2xl hover:shadow-yellow-500/40 transition-all duration-300"
            >
              <span>Explore All Services</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        <div className="absolute -top-20 left-10 w-32 h-32 bg-gradient-to-r from-yellow-500/20 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 right-10 w-40 h-40 bg-gradient-to-l from-yellow-500/15 to-transparent rounded-full blur-3xl pointer-events-none" />
      </div>
    </section>
  );
}