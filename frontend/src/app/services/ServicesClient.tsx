"use client";
import { useState } from "react";
import { ArrowRight, Sparkles, GraduationCap, Heart, Brain, Baby, BriefcaseBusiness, Scale, Activity, Leaf, Compass, FileText, Palette } from "lucide-react";
import Link from "next/link";
import EnquiryModal from "@/components/ui/EnquiryModal";

const services = [
  {
    id: "career",
    icon: GraduationCap,
    title: "Career & Education",
    desc: "Expert guidance for stream selection, career planning, study abroad, exam prep, and academic success.",
    features: ["Stream Selection", "Career Planning", "Study Abroad", "Exam Prep"],
  },
  {
    id: "relationships",
    icon: Heart,
    title: "Relationships & Family",
    desc: "Build stronger relationships with family, partners, and friends through expert counselling and guidance.",
    features: ["Couple Counselling", "Family Therapy", "Conflict Resolution", "Communication Skills"],
  },
  {
    id: "mental-wellness",
    icon: Brain,
    title: "Mental Wellness",
    desc: "Support for anxiety, depression, stress management, and overall mental well-being with professional care.",
    features: ["Anxiety Management", "Depression Support", "Stress Relief", "Mindfulness"],
  },
  {
    id: "parenting",
    icon: Baby,
    title: "Parenting",
    desc: "Navigate every stage of parenting — from infancy to adolescence — with trusted expert advice.",
    features: ["Newborn Care", "Toddler Development", "Teenage Guidance", "Positive Parenting"],
  },
  {
    id: "business-finance",
    icon: BriefcaseBusiness,
    title: "Business & Finance",
    desc: "Start, grow, or scale your business with expert mentorship, strategy, financial planning, and investment advice.",
    features: ["Business Strategy", "Financial Planning", "Investment Advice", "Tax Optimization"],
  },
  {
    id: "legal",
    icon: Scale,
    title: "Legal",
    desc: "Get clarity on legal matters — from property and family law to contracts and dispute resolution.",
    features: ["Property Law", "Family Law", "Contract Review", "Dispute Resolution"],
  },
  {
    id: "health-wellness",
    icon: Activity,
    title: "Health & Wellness",
    desc: "Holistic wellness, fitness, nutrition, and lifestyle coaching for a better, healthier you.",
    features: ["Fitness Coaching", "Nutrition Advice", "Lifestyle Changes", "Holistic Health"],
  },
  {
    id: "life-coaching",
    icon: Leaf,
    title: "Life Coaching",
    desc: "Personal development, goal setting, confidence building, and mindset transformation for a fulfilling life.",
    features: ["Goal Setting", "Confidence Building", "Mindset Shift", "Personal Growth"],
  },
  {
    id: "study-abroad",
    icon: Compass,
    title: "Study Abroad",
    desc: "Complete guidance for studying abroad — from university selection to visa filing and scholarships.",
    features: ["University Selection", "Visa Assistance", "Scholarship Guidance", "SOP Writing"],
  },
  {
    id: "resume-interview",
    icon: FileText,
    title: "Resume & Interview",
    desc: "ATS-optimized resumes, LinkedIn makeover, and mock interview sessions to help you land your dream job.",
    features: ["Resume Writing", "LinkedIn Optimization", "Mock Interviews", "Salary Negotiation"],
  },
  {
    id: "image-personality",
    icon: Palette,
    title: "Image & Personality",
    desc: "Professional grooming, personal branding, style makeover, and corporate etiquette for a confident presence.",
    features: ["Personal Branding", "Style Makeover", "Corporate Etiquette", "Confidence Building"],
  },
];

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const handleServiceClick = (serviceId: string) => {
    setSelectedService(serviceId);
  };

  const selectedServiceTitle =
    services.find((s) => s.id === selectedService)?.title || "";

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero */}
      <div className="py-16 px-4 text-center border-b border-gray-200">
        <div className="container mx-auto max-w-3xl">
          <span className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-600 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
            <Sparkles size={12} />
            Expert Guidance
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900">
            Your Career,{" "}
            <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
              Our Expertise
            </span>
          </h1>
          <p className="text-gray-500 mt-4 text-sm md:text-base">
            One-on-one sessions with verified experts. Personalized guidance for your unique journey.
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {services.map((service) => (
            <div
              key={service.id}
              className="group bg-white rounded-2xl border border-gray-200 hover:border-amber-400 hover:-translate-y-1 transition-all duration-300 p-6 shadow-lg hover:shadow-xl cursor-pointer"
              onClick={() => handleServiceClick(service.id)}
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center mb-4 shadow-lg shadow-amber-500/20">
                <service.icon size={24} className="text-white" />
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-gray-500 text-sm leading-relaxed mb-4">
                {service.desc}
              </p>

              {/* Features */}
              <div className="space-y-1.5 mb-5">
                {service.features.slice(0, 4).map((feature) => (
                  <div key={feature} className="flex items-center gap-2 text-xs text-gray-500">
                    <span className="text-amber-500">✦</span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              {/* Button */}
              <button className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold text-sm hover:shadow-lg hover:shadow-amber-500/25 transition-all duration-300">
                Enquire Now <ArrowRight size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Enquiry Modal */}
      <EnquiryModal
        isOpen={!!selectedService}
        onClose={() => setSelectedService(null)}
        defaultSubject={`Enquiry for ${selectedServiceTitle}`}
        defaultMessage={`I would like to know more about ${selectedServiceTitle} service.`}
      />
    </div>
  );
}



