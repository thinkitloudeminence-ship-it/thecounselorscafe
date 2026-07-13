"use client";
import { useState, useEffect } from "react";
import { ArrowRight, Sparkles, GraduationCap, Heart, Brain, Baby, BriefcaseBusiness, Scale, Activity, Shield } from "lucide-react";
import Link from "next/link";
import EnquiryModal from "@/components/ui/EnquiryModal";

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
      "Habit Building",
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

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 300);
      }
    }
  }, []);

  const handleServiceClick = (categoryId: string) => {
    setSelectedService(categoryId);
  };

  const selectedServiceTitle =
    categories.find((c) => c.id === selectedService)?.title || "";

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
            <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
              Expert Guidance
            </span>
            <br />
            <span>For Every Stage of Life</span>
          </h1>
          <p className="text-gray-500 mt-4 text-sm md:text-base">
            From career and relationships to health, finance, parenting, legal guidance, and personal growth—we connect you with the right expert, anytime.
          </p>
        </div>
      </div>

      {/* Services Grid - Cards Layout (Pehle Jaisa) */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {categories.map((category) => (
            <div
              key={category.id}
              id={category.id}
              className="group bg-white rounded-2xl border border-gray-200 hover:border-amber-400 hover:-translate-y-1 transition-all duration-300 p-6 shadow-lg hover:shadow-xl cursor-pointer scroll-mt-24"
              onClick={() => handleServiceClick(category.id)}
            >
              {/* Icon */}
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 shadow-lg shadow-amber-500/20`}>
                <category.icon size={24} className="text-white" />
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors">
                {category.title}
              </h3>

              {/* Description */}
              <p className="text-gray-500 text-sm leading-relaxed mb-4">
                {category.desc}
              </p>

              {/* Features */}
              <div className="space-y-1.5 mb-5">
                {category.features.slice(0, 5).map((feature) => (
                  <div key={feature} className="flex items-center gap-2 text-xs text-gray-500">
                    <span className="text-amber-500">✦</span>
                    <span className="line-clamp-1">{feature}</span>
                  </div>
                ))}
                {category.features.length > 5 && (
                  <div className="flex items-center gap-2 text-xs text-amber-500">
                    <span>+{category.features.length - 5} more</span>
                  </div>
                )}
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
        defaultMessage={`I would like to know more about ${selectedServiceTitle} services.`}
      />
    </div>
  );
}