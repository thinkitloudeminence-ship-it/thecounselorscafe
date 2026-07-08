// components/ui/EnquiryModal.tsx
"use client";
import { useState } from "react";
import { X, MessageCircle, Phone, Mail, User, Send } from "lucide-react";
import { submitContact } from "@/lib/api";
import toast from "react-hot-toast";

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultSubject?: string;
  defaultMessage?: string;
}

export default function EnquiryModal({ 
  isOpen, 
  onClose, 
  defaultSubject = "", 
  defaultMessage = "" 
}: EnquiryModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: defaultSubject,
    message: defaultMessage,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate phone - check if already exists in DB (handled by backend)
    setLoading(true);
    try {
      const response = await submitContact(formData);
      toast.success(response.message || "Your enquiry has been sent! We'll get back to you soon.");
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      onClose();
    } catch (error: any) {
      // Check if error is duplicate phone
      if (error.response?.data?.message?.includes("phone")) {
        toast.error("This phone number already has a pending enquiry. We'll contact you shortly!");
      } else {
        toast.error(error.response?.data?.message || "Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-200 relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
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
            <div className="relative">
              <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all"
                placeholder="Enter your full name"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
            <div className="relative">
              <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
            <div className="relative">
              <Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all"
                placeholder="Enter your phone number"
              />
            </div>
            <p className="text-xs text-gray-400 mt-1">We'll only use this to contact you about your enquiry</p>
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
            className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold hover:shadow-lg hover:shadow-amber-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Sending...
              </div>
            ) : (
              <>
                <Send size={18} />
                Send Enquiry
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}