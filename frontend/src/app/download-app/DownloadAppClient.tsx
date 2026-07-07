"use client";
import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Apple, Smartphone, Star, Users, Award, CheckCircle, ArrowRight, Sparkles, TrendingUp, Clock, Shield, Globe, PlayCircle, Calendar, MessageCircle, Phone, Video, Key, Download } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function AppPage() {
  const [activeUserType, setActiveUserType] = useState<"student" | "counselor">("student");
  const [phoneStep, setPhoneStep] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.98]);

  // Auto-play phone animation
  useEffect(() => {
    const interval = setInterval(() => {
      setPhoneStep((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const studentSteps = [
    { icon: Smartphone, title: "Download App", desc: "Get the app from App Store or Play Store" },
    { icon: Users, title: "Sign Up as Student", desc: "Create your profile in under 2 minutes" },
    { icon: TrendingUp, title: "Choose Career Area", desc: "Select your interest or career domain" },
    { icon: Calendar, title: "Book Session", desc: "Pick a counselor and schedule your session" },
    { icon: Award, title: "Get Guidance", desc: "Receive personalized career roadmap" },
  ];

  const counselorSteps = [
    { icon: Award, title: "Register as Counselor", desc: "Sign up and create your professional profile" },
    { icon: Shield, title: "Submit Profile", desc: "Share your credentials and expertise areas" },
    { icon: CheckCircle, title: "Get Verified", desc: "We verify your qualifications within 24h" },
    { icon: Users, title: "Start Receiving Students", desc: "Get matched with students seeking your expertise" },
    { icon: TrendingUp, title: "Earn & Grow", desc: "Build your reputation and increase earnings" },
  ];

  // Phone animation steps
  const phoneSteps = [
    {
      title: "Download App",
      icon: Download,
      color: "from-blue-500 to-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-200",
      text: "text-blue-600",
      desc: "Download from App Store or Google Play",
      show: "📱 Downloading...",
    },
    {
      title: "Verify with OTP",
      icon: Key,
      color: "from-amber-500 to-amber-600",
      bg: "bg-amber-50",
      border: "border-amber-200",
      text: "text-amber-600",
      desc: "Enter OTP sent to your phone",
      show: "🔑 Enter OTP: 123456",
    },
    {
      title: "Chat with Counselor",
      icon: MessageCircle,
      color: "from-green-500 to-green-600",
      bg: "bg-green-50",
      border: "border-green-200",
      text: "text-green-600",
      desc: "Start your career guidance session",
      show: "💬 Connecting to counselor...",
    },
  ];

  // Map icons to components
  const iconMap: Record<string, any> = {
    Download,
    Key,
    MessageCircle,
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-white">
      {/* Animated Gradient Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/5 via-transparent to-transparent" />
        <div className="absolute top-1/4 -left-1/4 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] bg-amber-600/5 rounded-full blur-[120px] animate-pulse-slow animation-delay-2000" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-[1.1] mb-6">
                Start Your{" "}
                <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                  Career Journey
                </span>
                <br />
                with Our App
              </h1>

              <p className="text-gray-500 text-lg leading-relaxed mb-8 max-w-lg">
                Get personalized career guidance, connect with expert counselors, and make informed decisions about your future — all from the palm of your hand.
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-3 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all duration-300"
                >
                  <Smartphone size={20} />
                  Download for Students
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-3 px-6 py-3 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 hover:border-amber-400 transition-all duration-300"
                >
                  <Users size={20} />
                  Join as Counselor
                </motion.button>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Users size={16} className="text-amber-500" />
                  <span className="text-gray-900 text-sm font-medium">50,000+</span>
                  <span className="text-gray-500 text-sm">Students</span>
                </div>
                <div className="w-px h-6 bg-gray-300" />
                <div className="flex items-center gap-2">
                  <Star size={16} className="text-amber-500 fill-amber-500" />
                  <span className="text-gray-900 text-sm font-medium">4.9</span>
                  <span className="text-gray-500 text-sm">Rating</span>
                </div>
                <div className="w-px h-6 bg-gray-300" />
                <div className="flex items-center gap-2">
                  <Award size={16} className="text-amber-500" />
                  <span className="text-gray-900 text-sm font-medium">200+</span>
                  <span className="text-gray-500 text-sm">Counselors</span>
                </div>
              </div>
            </motion.div>

            {/* Right Side - Interactive Phone Animation */}
            <motion.div
              initial={{ opacity: 0, x: 50, rotateY: 15 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
              className="relative"
            >
              <div className="relative w-full max-w-sm mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-amber-600/20 rounded-3xl blur-2xl" />
                <div className="relative bg-white rounded-3xl p-4 border border-gray-200 shadow-2xl">
                  {/* Phone Frame */}
                  <div className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-200">
                    {/* Phone Header */}
                    <div className="p-4 border-b border-gray-200 bg-white">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 flex items-center justify-center">
                          <span className="text-white font-bold text-xs">C</span>
                        </div>
                        <div className="flex-1">
                          <div className="h-2 w-24 bg-gray-300 rounded-full" />
                          <div className="h-1.5 w-16 bg-gray-200 rounded-full mt-1" />
                        </div>
                        {/* Status dots */}
                        <div className="flex gap-1">
                          <div className="w-2 h-2 rounded-full bg-green-500" />
                          <div className="w-2 h-2 rounded-full bg-green-500" />
                          <div className="w-2 h-2 rounded-full bg-green-500" />
                        </div>
                      </div>
                    </div>

                    {/* Phone Body - Animated Content */}
                    <div className="p-4 min-h-[320px] bg-gradient-to-b from-gray-50 to-white">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={phoneStep}
                          initial={{ opacity: 0, y: 20, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -20, scale: 0.95 }}
                          transition={{ duration: 0.5 }}
                          className="space-y-4"
                        >
                          {/* Step Indicator */}
                          <div className="flex justify-center gap-2 mb-4">
                            {phoneSteps.map((_, idx) => (
                              <button
                                key={idx}
                                onClick={() => setPhoneStep(idx)}
                                className={`h-1.5 rounded-full transition-all duration-300 ${
                                  phoneStep === idx ? "w-8 bg-amber-500" : "w-4 bg-gray-300"
                                }`}
                              />
                            ))}
                          </div>

                          {/* Icon - FIXED */}
                          <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${phoneSteps[phoneStep].color} flex items-center justify-center mx-auto shadow-lg`}>
                            {(() => {
                              const IconComponent = phoneSteps[phoneStep].icon;
                              return <IconComponent size={32} className="text-white" />;
                            })()}
                          </div>

                          {/* Title */}
                          <h3 className={`text-xl font-bold text-center ${phoneSteps[phoneStep].text}`}>
                            {phoneSteps[phoneStep].title}
                          </h3>

                          {/* Description */}
                          <p className="text-gray-500 text-center text-sm">
                            {phoneSteps[phoneStep].desc}
                          </p>

                          {/* Animated Showcase */}
                          <div className={`${phoneSteps[phoneStep].bg} border ${phoneSteps[phoneStep].border} rounded-xl p-4 text-center`}>
                            <motion.div
                              animate={{ scale: [1, 1.05, 1] }}
                              transition={{ duration: 2, repeat: Infinity }}
                              className="flex items-center justify-center gap-2"
                            >
                              <span className="text-2xl">{phoneSteps[phoneStep].show}</span>
                            </motion.div>
                          </div>

                          {/* Progress Bar */}
                          <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                            <motion.div
                              className="h-full bg-gradient-to-r from-amber-500 to-amber-600 rounded-full"
                              initial={{ width: "0%" }}
                              animate={{ width: `${((phoneStep + 1) / phoneSteps.length) * 100}%` }}
                              transition={{ duration: 0.5 }}
                            />
                          </div>
                          <p className="text-center text-xs text-gray-400">
                            Step {phoneStep + 1} of {phoneSteps.length}
                          </p>

                          {/* Auto-play indicator */}
                          <div className="flex justify-center gap-1 mt-2">
                            {[0, 1, 2].map((idx) => (
                              <div
                                key={idx}
                                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                                  phoneStep === idx ? "bg-amber-500" : "bg-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    {/* Phone Bottom */}
                    <div className="p-3 border-t border-gray-200 bg-white flex justify-center">
                      <div className="w-16 h-1 bg-gray-300 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* App Download Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Download The App
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Available on both iOS and Android. Get started in minutes.
            </p>
          </motion.div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-16">
            <motion.a
              whileHover={{ scale: 1.05, y: -5 }}
              href="#"
              className="flex items-center gap-4 px-8 py-4 rounded-xl bg-white border border-gray-200 hover:border-amber-400 shadow-md hover:shadow-xl transition-all duration-300"
            >
              <Apple size={32} className="text-gray-800" />
              <div>
                <p className="text-gray-500 text-xs">Download on</p>
                <p className="text-gray-900 font-semibold text-lg">App Store</p>
              </div>
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.05, y: -5 }}
              href="#"
              className="flex items-center gap-4 px-8 py-4 rounded-xl bg-white border border-gray-200 hover:border-amber-400 shadow-md hover:shadow-xl transition-all duration-300"
            >
              <PlayCircle size={32} className="text-gray-800" />
              <div>
                <p className="text-gray-500 text-xs">Get it on</p>
                <p className="text-gray-900 font-semibold text-lg">Google Play</p>
              </div>
            </motion.a>
          </div>

          {/* Trust Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-8"
          >
            <div className="flex items-center gap-2">
              <Shield size={16} className="text-amber-500" />
              <span className="text-gray-600 text-sm">Secure & Private</span>
            </div>
            <div className="w-px h-4 bg-gray-300 hidden sm:block" />
            <div className="flex items-center gap-2">
              <Globe size={16} className="text-amber-500" />
              <span className="text-gray-600 text-sm">Available Worldwide</span>
            </div>
            <div className="w-px h-4 bg-gray-300 hidden sm:block" />
            <div className="flex items-center gap-2">
              <CheckCircle size={16} className="text-amber-500" />
              <span className="text-gray-600 text-sm">Free to Download</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works - Student Flow with Right Side Animation */}
      <section className="py-20 border-t border-gray-200">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works for{" "}
              <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                Students
              </span>
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Get personalized career guidance in 5 simple steps
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left - Steps */}
            <div className="relative">
              <div className="absolute left-[28px] top-12 bottom-12 w-px bg-gradient-to-b from-amber-500/30 via-amber-500/30 to-transparent hidden md:block" />
              
              <div className="space-y-8">
                {studentSteps.map((step, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="flex gap-6 relative"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
                        <step.icon size={24} className="text-white" />
                      </div>
                    </div>
                    <div className="flex-1 pb-8">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                      <p className="text-gray-500">{step.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right - Mini Phone Animation */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="sticky top-32"
            >
              <div className="relative w-full max-w-xs mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-amber-600/20 rounded-3xl blur-2xl" />
                <div className="relative bg-white rounded-3xl p-3 border border-gray-200 shadow-2xl">
                  <div className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-200">
                    {/* Phone Header */}
                    <div className="p-3 border-b border-gray-200 bg-white">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 flex items-center justify-center">
                            <span className="text-white font-bold text-[10px]">C</span>
                          </div>
                          <span className="text-xs text-gray-600 font-medium">CounselorsCafe</span>
                        </div>
                        <div className="flex gap-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                          <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                          <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                        </div>
                      </div>
                    </div>

                    {/* Phone Body */}
                    <div className="p-4 min-h-[240px] bg-gradient-to-b from-gray-50 to-white">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={phoneStep}
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -15 }}
                          transition={{ duration: 0.4 }}
                          className="text-center space-y-3"
                        >
                          <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${phoneSteps[phoneStep].color} flex items-center justify-center mx-auto shadow-lg`}>
                            {(() => {
                              const IconComponent = phoneSteps[phoneStep].icon;
                              return <IconComponent size={24} className="text-white" />;
                            })()}
                          </div>
                          <h4 className={`font-bold text-sm ${phoneSteps[phoneStep].text}`}>
                            {phoneSteps[phoneStep].title}
                          </h4>
                          <p className="text-gray-500 text-xs">{phoneSteps[phoneStep].desc}</p>
                          <div className={`${phoneSteps[phoneStep].bg} border ${phoneSteps[phoneStep].border} rounded-lg p-2 text-xs font-medium`}>
                            {phoneSteps[phoneStep].show}
                          </div>
                          <div className="flex justify-center gap-1">
                            {[0, 1, 2].map((idx) => (
                              <div
                                key={idx}
                                className={`h-1 rounded-full transition-all duration-300 ${
                                  phoneStep === idx ? "w-4 bg-amber-500" : "w-2 bg-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works - Counselor Flow */}
      <section className="py-20 border-t border-gray-200">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works for{" "}
              <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                Counselors
              </span>
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Join our platform and grow your practice
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {counselorSteps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl p-6 border border-gray-200 hover:border-amber-400 transition-all duration-300 shadow-lg hover:shadow-xl text-center group"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-amber-500/20 group-hover:scale-110 transition-transform">
                  <step.icon size={24} className="text-white" />
                </div>
                <div className="text-amber-500 text-sm font-bold mb-2">Step {idx + 1}</div>
                <h3 className="text-gray-900 font-semibold text-base mb-2">{step.title}</h3>
                <p className="text-gray-500 text-xs">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Feature Section */}
      <section className="py-20 border-t border-gray-200">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Choose Your{" "}
              <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                Experience
              </span>
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Whether you're seeking guidance or offering expertise, we've got you covered
            </p>
          </motion.div>

          <div className="max-w-2xl mx-auto">
            <div className="flex justify-center mb-8">
              <div className="inline-flex p-1 rounded-full bg-gray-100 border border-gray-200">
                <button
                  onClick={() => setActiveUserType("student")}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeUserType === "student"
                      ? "bg-amber-500 text-white"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  For Students
                </button>
                <button
                  onClick={() => setActiveUserType("counselor")}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeUserType === "counselor"
                      ? "bg-amber-500 text-white"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  For Counselors
                </button>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeUserType}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="bg-amber-50 rounded-2xl p-8 border border-amber-200"
              >
                {activeUserType === "student" ? (
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-amber-200 flex items-center justify-center">
                        <Users size={24} className="text-amber-600" />
                      </div>
                      <div>
                        <h3 className="text-gray-900 font-bold text-lg">Personalized Matching</h3>
                        <p className="text-gray-600 text-sm">Get matched with the perfect counselor for your needs</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-amber-200 flex items-center justify-center">
                        <Star size={24} className="text-amber-600" />
                      </div>
                      <div>
                        <h3 className="text-gray-900 font-bold text-lg">Verified Experts</h3>
                        <p className="text-gray-600 text-sm">All counselors are thoroughly vetted</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-amber-200 flex items-center justify-center">
                        <Calendar size={24} className="text-amber-600" />
                      </div>
                      <div>
                        <h3 className="text-gray-900 font-bold text-lg">Flexible Scheduling</h3>
                        <p className="text-gray-600 text-sm">Book sessions at your convenience</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-amber-200 flex items-center justify-center">
                        <TrendingUp size={24} className="text-amber-600" />
                      </div>
                      <div>
                        <h3 className="text-gray-900 font-bold text-lg">Grow Your Practice</h3>
                        <p className="text-gray-600 text-sm">Reach students across the country</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-amber-200 flex items-center justify-center">
                        <Shield size={24} className="text-amber-600" />
                      </div>
                      <div>
                        <h3 className="text-gray-900 font-bold text-lg">Verified Credentials</h3>
                        <p className="text-gray-600 text-sm">Build trust with verified badges</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-amber-200 flex items-center justify-center">
                        <Award size={24} className="text-amber-600" />
                      </div>
                      <div>
                        <h3 className="text-gray-900 font-bold text-lg">Earn & Grow</h3>
                        <p className="text-gray-600 text-sm">Competitive earnings and growth opportunities</p>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 border-t border-gray-200">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden bg-amber-50 rounded-3xl p-12 text-center border border-amber-200"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-transparent to-amber-600/5" />
            
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Download the App and{" "}
              <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                Get Started Today
              </span>
            </h2>
            <p className="text-gray-500 mb-8 max-w-xl mx-auto">
              Join thousands of students and counselors already using our platform
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all duration-300"
              >
                <Smartphone size={20} />
                Download App
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-3 px-8 py-4 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 hover:border-amber-400 transition-all duration-300"
              >
                Explore Counselors
                <ArrowRight size={18} />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.1); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}