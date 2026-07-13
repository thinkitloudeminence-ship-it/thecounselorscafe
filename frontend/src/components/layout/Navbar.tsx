"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Smartphone, ChevronDown } from "lucide-react";
import AppModal from "@/components/ui/AppModal";
import Image from "next/image";
import LogoImage from "@/components/ui/thecounselorscafelogo.png";

const categories = [
  { id: "education-career", label: "Education & Career" },
  { id: "relationships-family", label: "Relationships & Family" },
  { id: "mental-wellbeing", label: "Mental & Emotional Well-being" },
  { id: "parenting", label: "Parenting" },
  { id: "legal-documentation", label: "Legal & Documentation" },
  { id: "child-safety", label: "Child Safety & Family Support" },
  { id: "health-lifestyle", label: "Health & Lifestyle" },
];

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/counselors", label: "Find Experts" },
  { href: "/blog", label: "Resources" },
  { href: "/about", label: "About" },
  { href: "/download-app", label: "Get App" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [appModal, setAppModal] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showCategoriesDropdown, setShowCategoriesDropdown] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 w-full max-w-full transition-all duration-500 ${
          scrolled
            ? "bg-black/95 backdrop-blur-xl border-b border-yellow-500/30 shadow-2xl shadow-yellow-500/10"
            : "bg-black/90 backdrop-blur-sm border-b border-yellow-500/10"
        }`}
      >
        <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-18 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center justify-center flex-shrink-0">
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32">
                <Image
                  src={LogoImage}
                  alt="CounselorsCafe"
                  fill
                  className="object-contain"
                  priority
                  sizes="(max-width: 640px) 96px, (max-width: 768px) 112px, 128px"
                />
              </div>
            </Link>

            <div className="flex-1" />

            {/* Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
              className="lg:hidden flex items-center justify-center flex-shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-white/10 border border-white/20 hover:bg-white/20 active:scale-95 transition-all duration-200"
            >
              {mobileOpen ? (
                <X size={22} className="text-white" />
              ) : (
                <Menu size={22} className="text-white" />
              )}
            </button>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {/* 1. Home */}
              <Link
                href="/"
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 relative group text-gray-300 hover:text-yellow-400"
              >
                Home
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-yellow-500 to-yellow-600 group-hover:w-full group-hover:left-0 transition-all duration-300 rounded-full" />
              </Link>

              {/* 2. Find Experts */}
              <Link
                href="/counselors"
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 relative group text-gray-300 hover:text-yellow-400"
              >
                Find Experts
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-yellow-500 to-yellow-600 group-hover:w-full group-hover:left-0 transition-all duration-300 rounded-full" />
              </Link>

              {/* ✅ 3. Categories with Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setShowCategoriesDropdown(true)}
                onMouseLeave={() => setShowCategoriesDropdown(false)}
              >
                <Link
                  href="/services"
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 relative group text-gray-300 hover:text-yellow-400 flex items-center gap-1"
                >
                  Categories
                  <ChevronDown size={14} className={`transition-transform duration-300 ${showCategoriesDropdown ? 'rotate-180' : ''}`} />
                  <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-yellow-500 to-yellow-600 group-hover:w-full group-hover:left-0 transition-all duration-300 rounded-full" />
                </Link>

                {/* Dropdown Menu - 7 Main Categories - 🔥 CATEGORY PAGE PE JAYEGA */}
                <AnimatePresence>
                  {showCategoriesDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-1 w-[280px] bg-black/95 backdrop-blur-xl border border-yellow-500/20 rounded-xl shadow-2xl overflow-hidden"
                    >
                      <div className="py-2">
                        {categories.map((cat) => (
                          <Link
                            key={cat.id}
                            href={`/categories/${cat.id}`}
                            className="flex items-center px-4 py-2.5 text-gray-300 hover:text-yellow-400 hover:bg-yellow-500/10 transition-all duration-200 text-sm"
                            onClick={() => setShowCategoriesDropdown(false)}
                          >
                            {cat.label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* 4. Resources */}
              <Link
                href="/blog"
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 relative group text-gray-300 hover:text-yellow-400"
              >
                Resources
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-yellow-500 to-yellow-600 group-hover:w-full group-hover:left-0 transition-all duration-300 rounded-full" />
              </Link>

              {/* 5. About */}
              <Link
                href="/about"
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 relative group text-gray-300 hover:text-yellow-400"
              >
                About
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-yellow-500 to-yellow-600 group-hover:w-full group-hover:left-0 transition-all duration-300 rounded-full" />
              </Link>

              {/* 6. Get App */}
              <Link
                href="/download-app"
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 relative group text-gray-300 hover:text-yellow-400"
              >
                Get App
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-yellow-500 to-yellow-600 group-hover:w-full group-hover:left-0 transition-all duration-300 rounded-full" />
              </Link>
            </div>

            {/* Desktop Download Button */}
            <div className="hidden lg:flex items-center gap-3 ml-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setAppModal(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10 hover:border-yellow-500 transition-all duration-300 group"
              >
                <Smartphone size={15} className="group-hover:rotate-12 transition-transform" />
                Download App
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="lg:hidden w-full max-w-full bg-black/95 backdrop-blur-xl border-t border-yellow-500/30 shadow-2xl overflow-hidden max-h-[80vh] overflow-y-auto"
            >
              <div className="px-4 py-4 flex flex-col gap-1">
                <Link
                  href="/"
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3.5 rounded-xl text-gray-300 font-medium hover:bg-yellow-500/10 hover:text-yellow-400 transition-all duration-300 text-base"
                >
                  Home
                </Link>

                <Link
                  href="/counselors"
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3.5 rounded-xl text-gray-300 font-medium hover:bg-yellow-500/10 hover:text-yellow-400 transition-all duration-300 text-base"
                >
                  Find Experts
                </Link>

                {/* Mobile Categories - 🔥 CATEGORY PAGE PE JAYEGA */}
                <Link
                  href="/services"
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3.5 rounded-xl text-yellow-400 font-medium hover:bg-yellow-500/10 transition-all duration-300 text-base"
                >
                  All Categories →
                </Link>
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/categories/${cat.id}`}
                    onClick={() => setMobileOpen(false)}
                    className="block px-4 py-2.5 rounded-xl text-gray-300 hover:text-yellow-400 hover:bg-yellow-500/10 transition-all duration-300 text-sm pl-8"
                  >
                    {cat.label}
                  </Link>
                ))}

                <Link
                  href="/blog"
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3.5 rounded-xl text-gray-300 font-medium hover:bg-yellow-500/10 hover:text-yellow-400 transition-all duration-300 text-base"
                >
                  Resources
                </Link>

                <Link
                  href="/about"
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3.5 rounded-xl text-gray-300 font-medium hover:bg-yellow-500/10 hover:text-yellow-400 transition-all duration-300 text-base"
                >
                  About
                </Link>

                <Link
                  href="/download-app"
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3.5 rounded-xl text-gray-300 font-medium hover:bg-yellow-500/10 hover:text-yellow-400 transition-all duration-300 text-base"
                >
                  Get App
                </Link>

                <div className="border-t border-yellow-500/30 mt-2 pt-3">
                  <button
                    onClick={() => {
                      setAppModal(true);
                      setMobileOpen(false);
                    }}
                    className="w-full flex items-center justify-center gap-2 px-4 py-4 rounded-xl bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold hover:shadow-lg hover:shadow-yellow-500/30 transition-all duration-300 text-base"
                  >
                    <Smartphone size={18} />
                    Download App
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <AppModal isOpen={appModal} onClose={() => setAppModal(false)} />
    </>
  );
}