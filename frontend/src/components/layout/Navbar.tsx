"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Smartphone } from "lucide-react";
import AppModal from "@/components/ui/AppModal";
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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-black/95 backdrop-blur-xl shadow-xl border-b border-yellow-500/20"
            : "bg-black/85 backdrop-blur-md border-b border-white/10"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex items-center justify-between h-16 sm:h-[72px]">

            {/* ================= LOGO ================= */}

            <Link
              href="/"
              className="flex items-center flex-shrink-0"
            >
              <div className="relative w-[150px] h-[48px] sm:w-[170px] sm:h-[56px] md:w-[200px] md:h-[64px] lg:w-[230px] lg:h-[72px]">
                <Image
                  src={LogoImage}
                  alt="The Counselors Cafe"
                  fill
                  priority
                  sizes="(max-width:768px) 150px, 230px"
                  className="object-contain object-left"
                />
              </div>
            </Link>

            {/* ================= DESKTOP MENU ================= */}

            <div className="hidden lg:flex items-center gap-2">

              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative px-4 py-2 rounded-lg text-[15px] font-medium text-gray-300 hover:text-yellow-400 transition-all duration-300 group"
                >
                  {item.label}

                  <span className="absolute bottom-0 left-1/2 h-[2px] w-0 bg-yellow-500 rounded-full transition-all duration-300 group-hover:left-0 group-hover:w-full" />
                </Link>
              ))}

            </div>

            {/* ================= RIGHT BUTTON ================= */}

            <div className="hidden lg:flex items-center">

              <button
                onClick={() => setAppModal(true)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold hover:scale-105 transition-all duration-300 shadow-lg"
              >
                <Smartphone size={18} />
                Download App
              </button>

            </div>

            {/* ================= MOBILE BUTTON ================= */}

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden flex items-center justify-center w-11 h-11 rounded-xl bg-white/10 border border-white/20 hover:bg-white/20 transition-all"
            >
              {mobileOpen ? (
                <X className="text-white" size={22} />
              ) : (
                <Menu className="text-white" size={22} />
              )}
            </button>

          </div>
        </div>

                {/* ================= MOBILE MENU ================= */}

        {mobileOpen && (
          <div className="lg:hidden border-t border-yellow-500/20 bg-black/95 backdrop-blur-xl animate-in slide-in-from-top duration-300">

            <div className="px-4 py-5 space-y-2">

              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block w-full rounded-xl px-4 py-3 text-base font-medium text-gray-300 hover:bg-yellow-500/10 hover:text-yellow-400 transition-all duration-300"
                >
                  {item.label}
                </Link>
              ))}

              <div className="pt-3 border-t border-white/10">

                <button
                  onClick={() => {
                    setAppModal(true);
                    setMobileOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-yellow-500 to-yellow-600 py-3 text-black font-semibold shadow-lg hover:scale-[1.02] active:scale-100 transition-all duration-300"
                >
                  <Smartphone size={18} />
                  Download App
                </button>

              </div>

            </div>

          </div>
        )}
      </nav>

      {/* Spacer so content doesn't hide behind navbar */}
      <div className="h-16 sm:h-[72px]" />

      <AppModal
        isOpen={appModal}
        onClose={() => setAppModal(false)}
      />
    </>
  );
}