"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X, Smartphone, Bell, Star } from "lucide-react";

interface AppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AppModal({ isOpen, onClose }: AppModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="relative bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full text-center z-10"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
            >
              <X size={16} />
            </button>

            <div className="w-20 h-20 bg-orange-gradient rounded-3xl flex items-center justify-center mx-auto mb-5 shadow-orange-md animate-float">
              <Smartphone size={36} className="text-white" />
            </div>

            <div className="inline-flex items-center gap-1.5 bg-orange-50 text-orange-600 text-xs font-semibold px-3 py-1.5 rounded-full mb-4 border border-orange-200">
              <Bell size={12} />
              Coming Soon
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              App is on its way! 🚀
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Our mobile app is under development. Get notified the moment it launches on Android & iOS — and be first in line for{" "}
              <span className="text-orange-600 font-semibold">exclusive early-bird offers</span>.
            </p>

            <div className="flex flex-col gap-2 mb-6">
              {["Free first session for early users", "Offline session recording", "Push notification reminders"].map((feat) => (
                <div key={feat} className="flex items-center gap-2 text-sm text-gray-600">
                  <Star size={14} className="text-orange-500 flex-shrink-0" fill="currentColor" />
                  {feat}
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Enter your email to get notified"
                className="input-field text-sm"
              />
              <button className="btn-primary w-full">
                Notify Me When It's Ready
              </button>
            </div>

            <p className="text-xs text-gray-400 mt-4">No spam. Unsubscribe anytime.</p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
