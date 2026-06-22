"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import toast from "react-hot-toast";
import { submitContact } from "@/lib/api";

const contactInfo = [
  { icon: Mail, label: "Email Us", value: "hello@counselorscafe.com", href: "mailto:hello@counselorscafe.com" },
  { icon: Phone, label: "Call Us", value: "+91 98765 43210", href: "tel:+919876543210" },
  { icon: MapPin, label: "Office", value: "New Delhi, India", href: "#" },
  { icon: Clock, label: "Response Time", value: "Within 24 hours", href: "#" },
];

const subjects = ["Career Counselling Enquiry", "Study Abroad Guidance", "Partnership / B2B", "Counselor Registration", "Technical Issue", "Other"];

export default function ContactClient() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.subject || !form.message) {
      toast.error("Please fill all required fields");
      return;
    }
    setLoading(true);
    try {
      await submitContact(form);
      toast.success("Message sent! We'll get back to you within 24 hours. 🎉");
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch {
      toast.error("Something went wrong. Please try again or email us directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <div className="bg-gray-950 py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-20" />
        <div className="container-custom relative text-center">
          <span className="inline-flex items-center gap-2 bg-orange-500/15 border border-orange-500/30 text-orange-300 text-xs font-semibold px-3 py-1.5 rounded-full uppercase tracking-widest mb-4">
            Get In Touch
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-white">We'd love to <span className="gradient-text">hear from you</span></h1>
          <p className="text-gray-400 mt-3 max-w-lg mx-auto">Have a question, feedback, or want to partner with us? Drop us a message and our team will respond promptly.</p>
        </div>
      </div>

      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="flex flex-col gap-4">
              {contactInfo.map(({ icon: Icon, label, value, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="bg-white border border-gray-100 rounded-2xl p-5 flex items-center gap-4 shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center flex-shrink-0">
                    <Icon size={20} className="text-orange-500" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs">{label}</p>
                    <p className="text-gray-900 font-semibold text-sm mt-0.5">{value}</p>
                  </div>
                </motion.a>
              ))}

              <div className="bg-orange-gradient rounded-2xl p-6 mt-2">
                <h3 className="text-white font-bold text-lg mb-2">Quick Session?</h3>
                <p className="text-orange-100 text-sm mb-4">Skip the form — book a session directly with a counselor today.</p>
                <a href="/counselors" className="block bg-white text-orange-600 font-semibold text-sm px-4 py-2.5 rounded-xl text-center hover:shadow-md transition-shadow">
                  Browse Counselors →
                </a>
              </div>
            </div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-card p-8"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-6">Send us a message</h2>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1.5 block">Full Name *</label>
                    <input 
                      name="name" 
                      value={form.name} 
                      onChange={handleChange} 
                      placeholder="Your full name" 
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1.5 block">Email *</label>
                    <input 
                      name="email" 
                      type="email" 
                      value={form.email} 
                      onChange={handleChange} 
                      placeholder="your@email.com" 
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1.5 block">Phone</label>
                    <input 
                      name="phone" 
                      value={form.phone} 
                      onChange={handleChange} 
                      placeholder="+91 XXXXX XXXXX" 
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1.5 block">Subject *</label>
                    <select 
                      name="subject" 
                      value={form.subject} 
                      onChange={handleChange} 
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                    >
                      <option value="">Select a subject</option>
                      {subjects.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1.5 block">Message *</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Tell us how we can help you..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors disabled:opacity-60 disabled:cursor-not-allowed mt-2"
                >
                  {loading ? (
                    <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Sending...</>
                  ) : (
                    <><Send size={16} />Send Message</>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}