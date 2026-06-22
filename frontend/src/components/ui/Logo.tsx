"use client";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { Compass, Sparkles, Star } from "lucide-react";

export default function Logo() {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [25, -25]), { damping: 15, stiffness: 120 });
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-25, 25]), { damping: 15, stiffness: 120 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      mouseX.set(e.clientX - centerX);
      mouseY.set(e.clientY - centerY);
    };

    if (isHovered) window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isHovered]);

  return (
    <Link
      href="/"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="block"
    >
      <motion.div
        ref={containerRef}
        className="flex items-center gap-3"
        style={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
        }}
      >
        {/* ===== ICON SYSTEM ===== */}
        <div className="relative w-14 h-14 flex items-center justify-center">

          {/* Core Glow */}
          <motion.div
            animate={{
              scale: isHovered ? [1, 1.3, 1] : 1,
              opacity: isHovered ? [0.4, 0.9, 0.4] : 0.3,
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute w-20 h-20 bg-yellow-500/30 blur-2xl rounded-full"
          />

          {/* Orbit Ring 1 */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            className="absolute w-20 h-20 border border-yellow-500/30 rounded-full"
          />

          {/* Orbit Ring 2 */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            className="absolute w-16 h-16 border-2 border-yellow-500/40 rounded-full"
          />

          {/* Orbit Particle */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            className="absolute"
          >
            <div className="w-2 h-2 bg-yellow-400 rounded-full translate-x-8" />
          </motion.div>

          {/* MAIN CORE */}
          <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 flex items-center justify-center shadow-2xl">

            {/* Shine Sweep */}
            <motion.div
              animate={{
                x: isHovered ? ["-150%", "200%"] : "-150%",
              }}
              transition={{ duration: 1.2, repeat: isHovered ? Infinity : 0 }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
            />

            {/* Compass Icon */}
            <motion.div
              animate={{
                rotate: isHovered ? [0, 15, -15, 5, 0] : 0,
                scale: isHovered ? [1, 1.1, 1] : 1,
              }}
              transition={{ duration: 0.6 }}
            >
              <Compass size={26} className="text-black" />
            </motion.div>

            {/* Spark Accent */}
            <motion.div
              animate={{
                scale: isHovered ? [0.8, 1.4, 0.8] : 1,
                opacity: isHovered ? [0.5, 1, 0.5] : 0.6,
              }}
              transition={{ duration: 1.2, repeat: Infinity }}
              className="absolute top-1 right-1"
            >
              <Sparkles size={10} className="text-black" />
            </motion.div>
          </div>
        </div>

        {/* ===== TEXT ===== */}
        <div className="flex flex-col leading-none">
          <span className="text-xl font-black tracking-tight bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
            COUNSELORS
          </span>
          <span className="text-lg font-black bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent -mt-1">
            CAFE
          </span>

          <div className="flex items-center gap-1 mt-1">
            <Star size={8} className="text-yellow-500 fill-yellow-500" />
            <span className="text-[8px] text-gray-500 uppercase tracking-wider">
              Career Guidance Platform
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}