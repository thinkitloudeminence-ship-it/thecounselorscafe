// "use client";
// import { useState, useRef, useEffect, useCallback } from "react";
// import { motion, useScroll, useTransform } from "framer-motion";
// import Image from "next/image";
// import { X, Search, MapPin, ChevronRight } from "lucide-react";
// import AppModal from "@/components/ui/AppModal";

// export default function HeroSection() {
//   const [appModal, setAppModal] = useState(false);
//   const [selectedCounselor, setSelectedCounselor] = useState(null);
//   const [searchLocation, setSearchLocation] = useState("");
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   const [isHoveringSlider, setIsHoveringSlider] = useState(false);

//   const heroRef = useRef(null);
//   const sliderRef = useRef<HTMLDivElement>(null);

//   const { scrollYProgress } = useScroll({
//     target: heroRef,
//     offset: ["start start", "end start"],
//   });

//   const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

//   useEffect(() => {
//     const handleMouseMove = (e: MouseEvent) => {
//       setMousePosition({ x: e.clientX, y: e.clientY });
//     };
//     window.addEventListener("mousemove", handleMouseMove);
//     return () => window.removeEventListener("mousemove", handleMouseMove);
//   }, []);

//   const counselors = [
//     {
//       name: "Dr. Priya Sharma",
//       tag: "Career Expert",
//       description: "Guides students for career decisions",
//       image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop",
//       rating: 4.9,
//       experience: "10+ years",
//       sessions: 2000,
//     },
//     {
//       name: "Prof. Amit Kumar",
//       tag: "Study Abroad",
//       description: "10+ years experience in abroad education",
//       image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop",
//       rating: 4.8,
//       experience: "12+ years",
//       sessions: 1500,
//     },
//     {
//       name: "Dr. Sneha Reddy",
//       tag: "Relationship Coach",
//       description: "Expert in relationship & marriage counseling",
//       image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop",
//       rating: 4.9,
//       experience: "8+ years",
//       sessions: 1800,
//     },
//     {
//       name: "Rahul Verma",
//       tag: "Career Switch",
//       description: "Helps professionals switch careers",
//       image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
//       rating: 4.7,
//       experience: "7+ years",
//       sessions: 1200,
//     },
//   ];

//   // Double the array for infinite scroll effect
//   const duplicatedCounselors = [...counselors, ...counselors, ...counselors];

//   const categories = [
//     "Career after 10th",
//     "Career after 12th",
//     "Study Abroad",
//     "Relationship Issues",
//     "Stress / Anxiety",
//     "Career Switch",
//     "Exam Stress",
//     "Life Coaching",
//     "Parenting",
//     "Mental Health",
//   ];

//   const handleTalkToExpert = () => {
//     setAppModal(true);
//   };

//   const handleSearch = () => {
//     if (searchLocation.trim()) {
//       console.log("Searching for:", searchLocation);
//       // Implement search logic
//     }
//   };

//   const handleKeyPress = (e: React.KeyboardEvent) => {
//     if (e.key === "Enter") {
//       handleSearch();
//     }
//   };

//   return (
//     <>
//       <section
//         ref={heroRef}
//         className="relative min-h-screen flex items-center bg-black overflow-hidden"
//       >
//         {/* Animated Background Glow */}
//         <motion.div
//           animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
//           transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
//           className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-yellow-500/15 rounded-full blur-[120px]"
//           style={{ x: mousePosition.x * 0.02, y: mousePosition.y * 0.02 }}
//         />
        
//         <motion.div
//           animate={{ scale: [1.2, 1, 1.2], opacity: [0.15, 0.3, 0.15] }}
//           transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
//           className="absolute -bottom-40 right-1/4 w-[400px] h-[400px] bg-yellow-600/10 rounded-full blur-[100px]"
//         />

//         <motion.div
//           style={{ opacity }}
//           className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 relative z-10"
//         >
//           {/* Main Banner Card */}
//           <div className="max-w-6xl mx-auto">
//             <div className="bg-gradient-to-br from-gray-900/80 via-black/80 to-gray-900/80 
//             backdrop-blur-sm rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-10 
//             flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-10 
//             border border-gray-800 shadow-2xl">
              
//               {/* Left Content */}
//               <div className="flex-1 text-center lg:text-left">
//                 <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.6 }}
//                 >
//                   <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
//                     Clear Confusions with{" "}
//                     <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
//                       World's Best Counselors
//                     </span>
//                   </h1>
                  
//                   <p className="text-gray-400 text-sm sm:text-base mt-4 max-w-lg mx-auto lg:mx-0">
//                     Connect with experienced counselors for career, relationships, mental health, and more. Get personalized guidance from experts.
//                   </p>

//                   <motion.button
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     onClick={handleTalkToExpert}
//                     className="mt-6 sm:mt-8 bg-gradient-to-r from-yellow-500 to-yellow-600 
//                     text-black px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold 
//                     hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300 
//                     shadow-lg shadow-yellow-500/20 text-sm sm:text-base inline-flex items-center gap-2"
//                   >
//                     Talk to Expert
//                     <ChevronRight className="w-4 h-4" />
//                   </motion.button>
//                 </motion.div>
//               </div>

//               {/* Right Image */}
//               <motion.div
//                 initial={{ opacity: 0, scale: 0.8 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ duration: 0.6, delay: 0.2 }}
//                 className="flex-shrink-0"
//               >
//                 <div className="relative w-32 h-32 sm:w-40 sm:h-40 lg:w-52 lg:h-52">
//                   <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl blur-xl opacity-30" />
//                   <Image
//                     src="/arpanamam.jpeg"
//                     alt="Counselor"
//                     fill
//                     className="object-cover rounded-xl relative z-10 border-2 border-yellow-500/50"
//                     sizes="(max-width: 640px) 128px, (max-width: 1024px) 160px, 208px"
//                   />
//                   {/* Online Badge */}
//                   <div className="absolute -top-2 -right-2 bg-green-500 rounded-full p-1.5 z-20">
//                     <div className="w-2 h-2 bg-white rounded-full" />
//                   </div>
//                 </div>
//               </motion.div>
//             </div>

//             {/* Search Bar */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: 0.3 }}
//               className="mt-8 sm:mt-10"
//             >
//               <div className="bg-gray-900/80 backdrop-blur-sm rounded-full p-1.5 border border-gray-700 
//               flex flex-col sm:flex-row gap-2 shadow-lg">
//                 <div className="flex-1 flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-0">
//                   <MapPin className="w-4 h-4 text-yellow-500 flex-shrink-0" />
//                   <input
//                     type="text"
//                     placeholder="Search by location (e.g., Delhi, Mumbai, Bangalore)"
//                     value={searchLocation}
//                     onChange={(e) => setSearchLocation(e.target.value)}
//                     onKeyPress={handleKeyPress}
//                     className="bg-transparent text-white placeholder-gray-400 outline-none flex-1 text-sm sm:text-base py-2 sm:py-3"
//                     aria-label="Search location"
//                   />
//                 </div>
//                 <motion.button
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   onClick={handleSearch}
//                   className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-5 sm:px-8 py-2.5 sm:py-3 rounded-full text-sm sm:text-base font-semibold hover:shadow-lg hover:shadow-yellow-500/25 transition-all duration-300 inline-flex items-center justify-center gap-2"
//                 >
//                   <Search className="w-4 h-4" />
//                   Search Counselors
//                 </motion.button>
//               </div>
             
//             </motion.div>

//             {/* Categories */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: 0.4 }}
//               className="mt-10"
//             >
//               <p className="text-gray-400 text-sm text-center mb-4">Popular Categories</p>
//               <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
//                 {categories.map((item, i) => (
//                   <motion.div
//                     key={i}
//                     initial={{ opacity: 0, scale: 0.8 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     transition={{ duration: 0.3, delay: i * 0.02 }}
//                     whileHover={{ scale: 1.05, backgroundColor: "#FFD700", color: "#000" }}
//                     className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-800/80 text-gray-300 text-xs sm:text-sm rounded-full border border-gray-700 hover:border-yellow-500 transition-all duration-300 cursor-pointer"
//                   >
//                     {item}
//                   </motion.div>
//                 ))}
//               </div>
//             </motion.div>

//             {/* Counselors Slider */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: 0.5 }}
//               className="mt-12 sm:mt-16"
//             >
//               <div className="flex items-center justify-between mb-4 sm:mb-6">
//                 <div>
//                   <p className="text-gray-400 text-xs sm:text-sm uppercase tracking-wider">Trusted Experts</p>
//                   <h3 className="text-white text-lg sm:text-xl font-semibold">Meet Our Top Counselors</h3>
//                 </div>
//                 <motion.button
//                   whileHover={{ x: 5 }}
//                   className="text-yellow-500 text-sm sm:text-base font-medium hidden sm:inline-flex items-center gap-1"
//                 >
//                   View All <ChevronRight className="w-4 h-4" />
//                 </motion.button>
//               </div>
              
//               <div 
//                 ref={sliderRef}
//                 className="overflow-hidden"
//                 onMouseEnter={() => setIsHoveringSlider(true)}
//                 onMouseLeave={() => setIsHoveringSlider(false)}
//               >
//                 <motion.div
//                   className="flex gap-3 sm:gap-4 md:gap-5 w-max"
//                   animate={isHoveringSlider ? {} : { x: ["0%", "-50%"] }}
//                   transition={{ 
//                     repeat: Infinity, 
//                     duration: 30, 
//                     ease: "linear",
//                     repeatType: "loop"
//                   }}
//                 >
//                   {duplicatedCounselors.map((c, i) => (
//                     <motion.div
//                       key={i}
//                       whileHover={{ y: -5, scale: 1.02 }}
//                       className="w-40 sm:w-44 md:w-52 bg-gradient-to-br from-gray-900 to-black rounded-xl p-3 sm:p-4 text-center border border-gray-800 hover:border-yellow-500/50 transition-all duration-300 cursor-pointer"
//                     >
//                       <div className="relative inline-block">
//                         <Image
//                           src={c.image}
//                           alt={c.name}
//                           width={60}
//                           height={60}
//                           className="rounded-full mx-auto border-2 border-yellow-500 object-cover"
//                           sizes="60px"
//                         />
//                         <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full w-3 h-3 border-2 border-black" />
//                       </div>
//                       <h3 className="text-white mt-2 text-xs sm:text-sm font-semibold truncate">
//                         {c.name}
//                       </h3>
//                       <p className="text-yellow-500 text-[10px] sm:text-xs mt-0.5">{c.tag}</p>
//                       <div className="flex items-center justify-center gap-1 mt-2">
//                         <span className="text-yellow-500 text-xs">⭐</span>
//                         <span className="text-white text-xs">{c.rating}</span>
//                         <span className="text-gray-500 text-xs">•</span>
//                         <span className="text-gray-400 text-[10px]">{c.sessions}+ sessions</span>
//                       </div>
//                     </motion.div>
//                   ))}
//                 </motion.div>
//               </div>
              
//               {/* Mobile View All Button */}
//               <div className="text-center mt-4 sm:hidden">
//                 <button className="text-yellow-500 text-sm font-medium inline-flex items-center gap-1">
//                   View All Counselors <ChevronRight className="w-3 h-3" />
//                 </button>
//               </div>
//             </motion.div>
//           </div>
//         </motion.div>

//         {/* Scroll Indicator */}
//         <motion.div
//           animate={{ y: [0, 10, 0] }}
//           transition={{ duration: 1.5, repeat: Infinity }}
//           className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden sm:block"
//         >
//           <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center">
//             <div className="w-1 h-2 bg-yellow-500 rounded-full mt-2" />
//           </div>
//         </motion.div>
//       </section>

//       <AppModal isOpen={appModal} onClose={() => setAppModal(false)} />
//     </>
//   );
// }

"use client";
import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { X, Search, MapPin, Star, Award, Users, ChevronRight } from "lucide-react";
import AppModal from "@/components/ui/AppModal";

export default function HeroSection() {
  const [appModal, setAppModal] = useState(false);
  const [selectedCounselor, setSelectedCounselor] = useState(null);
  const [searchLocation, setSearchLocation] = useState("");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [autoScroll, setAutoScroll] = useState(true);

  const heroRef = useRef(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const counselors = [...Array(12)].map((_, i) => ({
    id: i,
    name: "Dr. Priya Sharma",
    tag: "Career Expert",
    description: "Guides students for career decisions",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop",
    rating: 4.9,
    experience: "10+ years",
    sessions: 2000,
  }));

  const categories = [
    "Career after 10th",
    "Career after 12th",
    "Study Abroad",
    "Relationship Issues",
    "Stress / Anxiety",
    "Career Switch",
    "Exam Stress",
    "Life Coaching",
  ];

  return (
    <>
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center bg-black overflow-hidden py-12 md:py-16 lg:py-20"
      >
        {/* Animated Background Glow */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute top-20 left-1/3 w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-yellow-500/20 rounded-full blur-[100px] md:blur-[120px]"
          style={{ x: mousePosition.x * 0.02, y: mousePosition.y * 0.02 }}
        />

        <motion.div
          style={{ opacity }}
          className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16"
        >
          {/* Main Banner */}
          <div className="bg-gradient-to-r from-[#0a0a0a] via-[#111] to-[#1a1a1a] 
            rounded-2xl p-6 sm:p-8 lg:p-10 flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8 
            border border-gray-800 shadow-lg max-w-5xl mx-auto">
            
            {/* Left Content */}
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
                Clear Confusions with{" "}
                <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
                  World's Best Counselors
                </span>
              </h1>

              {/* Stats Row */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 sm:gap-6 mt-4 sm:mt-6">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="text-white text-sm sm:text-base">4.9 Rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-yellow-500" />
                  <span className="text-white text-sm sm:text-base">10K+ Sessions</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-yellow-500" />
                  <span className="text-white text-sm sm:text-base">Top 1% Experts</span>
                </div>
              </div>

              <button 
                onClick={() => setAppModal(true)}
                className="mt-5 sm:mt-6 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-5 sm:px-6 py-2.5 sm:py-3 rounded-full font-semibold hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300 text-sm sm:text-base inline-flex items-center gap-2 group"
              >
                Talk to Expert 
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Right Image */}
              
          </div>

          {/* Search Bar */}
          <div className="mt-8 sm:mt-10 md:mt-12 max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-2 bg-gray-900/80 rounded-2xl p-1 border border-gray-700">
              <div className="flex-1 flex items-center gap-2 px-4 sm:px-5 py-3 sm:py-4">
                <MapPin className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Search location (e.g., Delhi, Mumbai)"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="bg-transparent text-white placeholder-gray-400 outline-none flex-1 text-sm sm:text-base w-full"
                />
              </div>
              <button className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-6 sm:px-8 py-3 rounded-xl text-sm sm:text-base font-semibold hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300 inline-flex items-center justify-center gap-2">
                <Search className="w-4 h-4" />
                Search
              </button>
            </div>
          </div>

          {/* Categories - Responsive Grid */}
          <div className="mt-8 sm:mt-10 md:mt-12 max-w-6xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-2 sm:gap-3">
              {categories.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="px-3 sm:px-4 py-2 bg-gray-800/80 text-white text-xs sm:text-sm text-center rounded-full border border-gray-700 hover:bg-yellow-500 hover:text-black hover:border-yellow-500 transition-all duration-300 cursor-pointer"
                >
                  {item}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Counselors Slider */}
          <div className="mt-12 sm:mt-16 md:mt-20 overflow-hidden">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-white text-lg sm:text-xl font-semibold">
                Top Rated Counselors
              </h2>
              <button 
                onClick={() => setAutoScroll(!autoScroll)}
                className="text-yellow-500 text-xs sm:text-sm hover:text-yellow-400 transition"
              >
                {autoScroll ? "Pause" : "Auto-scroll"}
              </button>
            </div>

            <div className="relative">
              {/* Gradient masks for edges */}
              <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-12 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-12 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

              <motion.div
                ref={sliderRef}
                className="flex gap-3 sm:gap-4 md:gap-5 w-max"
                animate={autoScroll ? { x: ["0%", "-50%"] } : {}}
                transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
                onMouseEnter={() => setAutoScroll(false)}
                onMouseLeave={() => setAutoScroll(true)}
              >
                {[...counselors, ...counselors].map((c, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.05, y: -4 }}
                    className="w-44 sm:w-48 md:w-52 lg:w-56 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-3 sm:p-4 text-center border border-gray-700 hover:border-yellow-500/50 transition-all duration-300 cursor-pointer"
                  >
                    <div className="relative w-14 h-14 sm:w-16 sm:h-16 mx-auto">
                      <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full blur-md opacity-50" />
                      <Image
                        src={c.image}
                        alt={c.name}
                        fill
                        className="rounded-full object-cover relative z-10 border-2 border-yellow-500"
                      />
                    </div>
                    <h3 className="text-white mt-2 text-xs sm:text-sm font-semibold">
                      {c.name}
                    </h3>
                    <p className="text-yellow-500 text-xs mt-1">{c.tag}</p>
                    <div className="flex items-center justify-center gap-1 mt-2">
                      <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                      <span className="text-white text-xs">{c.rating}</span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      <AppModal isOpen={appModal} onClose={() => setAppModal(false)} />
    </>
  );
}