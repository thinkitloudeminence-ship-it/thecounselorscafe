"use client";
import { useState, useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { GraduationCap, Star, Users, Briefcase, Sparkles } from "lucide-react";

const stats = [
  { 
    value: 8500, 
    suffix: "+", 
    label: "Students Guided", 
    icon: GraduationCap, 
    color: "from-yellow-500 to-yellow-600",
    isSlowCounter: true
  },
  { 
    value: 98, 
    suffix: "%", 
    label: "Satisfaction Rate", 
    icon: Star, 
    color: "from-yellow-500 to-yellow-600",
    isSlowCounter: false
  },
  { 
    value: 120, 
    suffix: "+", 
    label: "Expert Counselors", 
    icon: Users, 
    color: "from-yellow-500 to-yellow-600",
    isSlowCounter: false
  },
  { 
    value: 25, 
    suffix: "+", 
    label: "Career Domains", 
    icon: Briefcase, 
    color: "from-yellow-500 to-yellow-600",
    isSlowCounter: false
  },
];

function Counter({ target, suffix, isSlowCounter }: { target: number; suffix: string; isSlowCounter: boolean }) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const hasStartedRef = useRef(false);

  useEffect(() => {
    if (!inView || hasStartedRef.current) return;
    hasStartedRef.current = true;

    if (isSlowCounter) {
      let current = 0;
      const interval = setInterval(() => {
        if (current < target) {
          current += 1;
          setCount(current);
        } else {
          clearInterval(interval);
        }
      }, 100);
      return () => clearInterval(interval);
    } else {
      let start = 0;
      const duration = 2000;
      const increment = target / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [inView, target, isSlowCounter]);

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      const kValue = (num / 1000).toFixed(1);
      return kValue.endsWith('.0') ? kValue.slice(0, -2) + 'K' : kValue + 'K';
    }
    return num.toString();
  };

  return (
    <span ref={ref} className="text-white">
      {isSlowCounter ? formatNumber(count) : count}
      {suffix}
    </span>
  );
}

export default function StatsSection() {
  return (
    <section className="py-8 bg-black relative overflow-hidden">
      {/* Static Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-yellow-500/10 rounded-full blur-[100px]" />
        <div className="absolute top-20 right-20 w-64 h-64 bg-yellow-500/10 rounded-full blur-[80px]" />
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-yellow-600/10 rounded-full blur-[80px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-3">
            <Sparkles size={12} className="text-yellow-500" />
            <span className="text-yellow-400 text-xs font-semibold tracking-wide">OUR IMPACT</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Trusted by{" "}
            <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
              Students & Parents
            </span>
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-yellow-500 to-transparent mx-auto mt-2" />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {stats.map((s) => (
            <div key={s.label} className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-500/50 to-yellow-600/50 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
              
              <div className="relative bg-black/40 backdrop-blur-sm rounded-xl p-4 text-center border border-white/10 hover:border-yellow-500/50 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-yellow-500/10">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br ${s.color} mb-3 shadow-lg shadow-yellow-500/20`}>
                  <s.icon size={22} className="text-black" strokeWidth={1.5} />
                </div>
                
                <div className="text-2xl md:text-3xl lg:text-4xl font-extrabold bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
                  <Counter target={s.value} suffix={s.suffix} isSlowCounter={s.isSlowCounter} />
                </div>
                
                <p className="text-gray-400 text-xs md:text-sm mt-2 font-medium group-hover:text-yellow-400 transition-colors duration-300">
                  {s.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Decorative Line */}
        <div className="w-24 h-0.5 bg-gradient-to-r from-yellow-500 to-yellow-300 rounded-full mx-auto mt-8" />
      </div>
    </section>
  );
}