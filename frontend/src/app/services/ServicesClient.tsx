"use client";
import { useState } from "react";
import { ArrowRight, Sparkles, Compass, BookOpen, Plane, FileText, Target, Briefcase, GraduationCap, X } from "lucide-react";
import Link from "next/link";
import { submitContact } from "@/lib/api";
import toast from "react-hot-toast";

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
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleServiceClick = (serviceId: string, serviceTitle: string) => {
    setSelectedService(serviceId);
    setFormData((prev) => ({
      ...prev,
      subject: `Enquiry for ${serviceTitle}`,
      message: `I would like to know more about ${serviceTitle} service.`,
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await submitContact(formData);
      toast.success("Your enquiry has been sent! We'll get back to you soon.");
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      setSelectedService(null);
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
              className="group bg-white rounded-2xl border border-gray-200 hover:border-amber-400 hover:-translate-y-1 transition-all duration-300 p-6 shadow-lg hover:shadow-xl cursor-pointer"
              onClick={() => handleServiceClick(service.id, service.title)}
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
                {service.features.map((feature) => (
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
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-200 relative max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X size={20} className="text-gray-500" />
            </button>

            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Get in Touch</h3>
              <p className="text-gray-500 text-sm mt-1">
                Fill in your details and we'll get back to you within 24 hours.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all"
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject *</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all"
                  placeholder="What is this about?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all resize-none"
                  placeholder="Tell us what you need help with..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold hover:shadow-lg hover:shadow-amber-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </div>
                ) : (
                  "Send Enquiry"
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}