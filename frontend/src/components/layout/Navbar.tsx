"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Smartphone } from "lucide-react";
import AppModal from "@/components/ui/AppModal";
import Image from "next/image";
import LogoImage from "@/components/ui/thecounselorscafelogo.png";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/counselors", label: "Counselors" },
  { href: "/services", label: "Services" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/download-app", label: "Get App" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [appModal, setAppModal] = useState(false);
  const [mounted, setMounted] = useState(false);

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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-black/90 backdrop-blur-xl border-b border-yellow-500/30 shadow-2xl shadow-yellow-500/10"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            
            {/* Logo */}
            <Link href="/" className="flex items-center justify-center">
              <div className="relative w-40 h-40 md:w-48 md:h-48">
                <Image
                  src={LogoImage}
                  alt="CounselorsCafe"
                  width={192}
                  height={192}
                  className="object-contain"
                  priority
                />
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 relative group text-gray-300 hover:text-yellow-400"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-yellow-500 to-yellow-600 group-hover:w-full group-hover:left-0 transition-all duration-300 rounded-full" />
                </Link>
              ))}
            </div>

            {/* Right Side (ONLY Download App now) */}
            <div className="hidden lg:flex items-center gap-3">
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

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-all duration-300"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-black/95 backdrop-blur-xl border-t border-yellow-500/30 shadow-2xl overflow-hidden"
            >
              <div className="px-4 py-4 flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="block px-4 py-3 rounded-xl text-gray-300 font-medium hover:bg-yellow-500/10 hover:text-yellow-400 transition-all duration-300"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}

                {/* Only Download App button */}
                <div className="border-t border-yellow-500/30 mt-2 pt-3">
                  <button
                    onClick={() => { setAppModal(true); setMobileOpen(false); }}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-yellow-500/30 text-yellow-400 font-medium hover:bg-yellow-500/10 transition-all duration-300"
                  >
                    <Smartphone size={16} />
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