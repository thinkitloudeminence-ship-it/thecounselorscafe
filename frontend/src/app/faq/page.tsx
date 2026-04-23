"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

const faqs = [
  {
    category: "General",
    items: [
      { q: "What is TheCounselorsCafe?", a: "TheCounselorsCafe is India's premium career counselling platform that connects students and professionals with verified expert counselors for personalized, one-on-one career guidance. We cover stream selection, career counselling, study abroad, resume prep, and more." },
      { q: "Who is TheCounselorsCafe for?", a: "We serve Class 9-12 students choosing streams/careers, graduates/postgraduates planning next steps, working professionals considering career switches, and parents seeking guidance for their children." },
      { q: "Are your counselors verified?", a: "Absolutely. Every counselor on our platform goes through a rigorous vetting process including credential verification, background checks, a demo session evaluation, and peer review before they can take sessions." },
    ],
  },
  {
    category: "Sessions & Booking",
    items: [
      { q: "How do I book a session?", a: "Browse counselors on our Counselors page, filter by expertise and budget, choose a time slot, and pay online. You'll receive a confirmation email with the session link immediately." },
      { q: "What happens in a session?", a: "Sessions are 45-60 minute private one-on-one video/audio calls. The counselor will review your pre-session questionnaire, assess your profile, and provide personalized guidance, a career roadmap, and an action plan." },
      { q: "Can I switch my counselor?", a: "Yes. If you feel your counselor isn't the right fit after the first session, contact us and we'll assign a new counselor or offer a full refund — no questions asked." },
      { q: "Are sessions available in Hindi?", a: "Yes! Most of our counselors are fluent in Hindi and many other regional languages. You can filter counselors by language when booking." },
    ],
  },
  {
    category: "Pricing & Payments",
    items: [
      { q: "How much does a session cost?", a: "Sessions start from  and vary by counselor experience and expertise. You can see exact pricing on each counselor's profile before booking." },
      { q: "What payment methods do you accept?", a: "We accept UPI, credit/debit cards, net banking, and popular wallets. All payments are processed securely through Razorpay." },
      { q: "Do you offer refunds?", a: "Yes. If you're not satisfied with your session, contact us within 24 hours for a full refund. We also offer free rescheduling with 4+ hours notice." },
    ],
  },
  {
    category: "For Schools & Institutions",
    items: [
      { q: "Do you offer bulk/school packages?", a: "Yes! We have special packages for schools, coaching institutes, and colleges. Contact us at hello@thecounselorscafe.com or fill the contact form for a custom quote." },
      { q: "Can counselors come to our school?", a: "We currently offer online sessions only, but we're launching offline session capabilities in 2025. Subscribe to our newsletter to be notified." },
    ],
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`border rounded-xl overflow-hidden transition-all duration-200 ${open ? "border-orange-200 shadow-orange-sm" : "border-gray-100"}`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left gap-4 bg-white hover:bg-orange-50/50 transition-colors"
      >
        <span className={`font-medium text-sm md:text-base ${open ? "text-orange-600" : "text-gray-900"}`}>{q}</span>
        <ChevronDown size={18} className={`text-gray-400 flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180 text-orange-500" : ""}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-0 text-gray-600 text-sm leading-relaxed bg-white border-t border-orange-100">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const categories = ["All", ...faqs.map((f) => f.category)];

  const filtered = activeCategory === "All" ? faqs : faqs.filter((f) => f.category === activeCategory);

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <div className="bg-gray-950 py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-20" />
        <div className="container-custom relative text-center">
          <span className="inline-flex items-center gap-2 bg-orange-500/15 border border-orange-500/30 text-orange-300 text-xs font-semibold px-3 py-1.5 rounded-full uppercase tracking-widest mb-4">
            FAQ
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-white">Frequently Asked <span className="gradient-text">Questions</span></h1>
          <p className="text-gray-400 mt-3 max-w-lg mx-auto">Everything you need to know about TheCounselorsCafe. Can't find your answer? Just <Link href="/contact" className="text-orange-400 hover:underline">contact us</Link>.</p>
        </div>
      </div>

      <section className="section-padding bg-gray-50">
        <div className="container-custom max-w-3xl">
          {/* Category tabs */}
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-sm font-medium px-4 py-2 rounded-full border transition-all ${activeCategory === cat ? "bg-orange-500 text-white border-orange-500" : "bg-white text-gray-600 border-gray-200 hover:border-orange-300"}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-8">
            {filtered.map((section) => (
              <div key={section.category}>
                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-5 h-5 bg-orange-500 rounded-full" />
                  {section.category}
                </h2>
                <div className="flex flex-col gap-3">
                  {section.items.map((item) => <FAQItem key={item.q} {...item} />)}
                </div>
              </div>
            ))}
          </div>

          {/* Still have questions */}
          <div className="mt-12 bg-orange-gradient rounded-3xl p-8 text-center">
            <p className="text-2xl font-bold text-white mb-2">Still have questions?</p>
            <p className="text-orange-100 text-sm mb-5">Our team typically responds within 2 hours on weekdays.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/contact" className="bg-white text-orange-600 font-semibold px-6 py-3 rounded-xl hover:shadow-md transition-shadow">
                Send Us a Message
              </Link>
              <Link href="/counselors" className="bg-white/15 border border-white/30 text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/25 transition-colors">
                Book a Session
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
