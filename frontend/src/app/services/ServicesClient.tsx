"use client";
import { ArrowRight, CheckCircle, Sparkles, Compass, BookOpen, Plane, FileText, TrendingUp, Users, Target, Lightbulb, Briefcase, GraduationCap, Globe, Heart, Rocket, Zap, Brain, Code, Palette, Microscope, Calculator, Scale, Building, Music, Camera, Activity } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const services = [
  // Core Counselling Services
  {
    id: "career",
    icon: Compass,
    title: "Career Counselling",
    subtitle: "Find your perfect career path",
    desc: "One-on-one sessions with expert counselors to identify your strengths, interests, and ideal career trajectory using psychometric assessments.",
    features: ["Psychometric assessment (MBTI, Holland Codes)", "Strengths & interest mapping", "Personalized career roadmap", "Industry insights & growth trends", "Follow-up support"],
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop",
    category: "Core",
    popular: true,
  },
  {
    id: "stream",
    icon: BookOpen,
    title: "Stream Selection",
    subtitle: "Science, Commerce, or Arts?",
    desc: "Make the right choice after Class 10 with data-backed analysis of your aptitude, interests, and future career prospects.",
    features: ["Aptitude & interest profiling", "Detailed stream comparison", "Career scope analysis", "Expert counselor session", "Written recommendation report"],
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=400&fit=crop",
    category: "School",
    popular: true,
  },
  {
    id: "subject",
    icon: Brain,
    title: "Subject Selection",
    subtitle: "Choose the right subjects",
    desc: "Expert guidance for selecting optional subjects in Class 11, 12, and college that align with your career goals.",
    features: ["Subject combination analysis", "College requirement mapping", "Career alignment check", "Flexibility assessment", "Future scope evaluation"],
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&h=400&fit=crop",
    category: "School",
    popular: false,
  },
  {
    id: "college",
    icon: GraduationCap,
    title: "College Selection",
    subtitle: "Find your perfect college match",
    desc: "Get expert guidance on selecting the right college based on your academic profile, preferences, and career aspirations.",
    features: ["College shortlisting", "Cut-off analysis", "Campus comparison", "Placement record review", "Alumni network insights"],
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&h=400&fit=crop",
    category: "Higher Education",
    popular: false,
  },
  {
    id: "abroad",
    icon: Plane,
    title: "Study Abroad Guidance",
    subtitle: "Your global education journey",
    desc: "Complete end-to-end guidance for studying abroad - from university selection to visa filing and pre-departure preparation.",
    features: ["Country & university shortlisting", "SOP & LOR assistance", "Scholarship guidance", "Visa documentation", "Pre-departure orientation"],
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=400&fit=crop",
    category: "International",
    popular: true,
  },
  {
    id: "exam",
    icon: Target,
    title: "Competitive Exam Guidance",
    subtitle: "Crack exams with confidence",
    desc: "Strategic planning and expert guidance for JEE, NEET, CUET, CLAT, UPSC, and other competitive exams.",
    features: ["Exam strategy planning", "Time management techniques", "Mock test analysis", "Weakness identification", "Study material recommendations"],
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=400&fit=crop",
    category: "Exams",
    popular: false,
  },
  {
    id: "resume",
    icon: FileText,
    title: "Resume & Interview Prep",
    subtitle: "Land your dream job",
    desc: "ATS-friendly resume writing, LinkedIn optimization, and mock interview sessions to help you crack job interviews.",
    features: ["ATS-optimized resume", "LinkedIn profile makeover", "Mock interview sessions", "Industry-specific questions", "Salary negotiation tips"],
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&h=400&fit=crop",
    category: "Professional",
    popular: false,
  },
  {
    id: "skill",
    icon: TrendingUp,
    title: "Skill Development",
    subtitle: "Build future-ready skills",
    desc: "Identify and develop in-demand skills for your chosen career path with a personalized learning roadmap.",
    features: ["Skill gap analysis", "Personalized learning roadmap", "Resource recommendations", "Progress tracking", "Industry certifications"],
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&h=400&fit=crop",
    category: "Development",
    popular: false,
  },
  {
    id: "engineering",
    icon: Code,
    title: "Engineering Career Guidance",
    subtitle: "Navigate the engineering maze",
    desc: "Specialized guidance for engineering aspirants - branch selection, college choices, and career paths in tech.",
    features: ["Branch selection guidance", "College ranking analysis", "Coding career paths", "Internship opportunities", "Placement preparation"],
    image: "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=600&h=400&fit=crop",
    category: "Professional",
    popular: false,
  },
  {
    id: "medical",
    icon: Heart,
    title: "Medical Career Guidance",
    subtitle: "Your path to healthcare",
    desc: "Expert guidance for medical aspirants - NEET preparation, college selection, and career options in healthcare.",
    features: ["NEET preparation strategy", "Medical college selection", "Specialty guidance", "Career options in healthcare", "Internship planning"],
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d5088f7?w=600&h=400&fit=crop",
    category: "Professional",
    popular: false,
  },
  {
    id: "commerce",
    icon: Calculator,
    title: "Commerce Career Guidance",
    subtitle: "Build your financial future",
    desc: "Guidance for commerce students - CA, CS, CMA, MBA, and other career paths in finance and business.",
    features: ["Professional course guidance", "CA/CS/CMA roadmap", "MBA preparation", "Finance career paths", "Internship opportunities"],
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop",
    category: "Professional",
    popular: false,
  },
  {
    id: "law",
    icon: Scale,
    title: "Law Career Guidance",
    subtitle: "Pursue justice and advocacy",
    desc: "Expert guidance for law aspirants - CLAT preparation, law school selection, and career paths in legal profession.",
    features: ["CLAT preparation strategy", "Law school selection", "Specialization guidance", "Internship planning", "Legal career paths"],
    image: "https://images.unsplash.com/photo-1589391886645-d51941baf7fb?w=600&h=400&fit=crop",
    category: "Professional",
    popular: false,
  },
  {
    id: "arts",
    icon: Palette,
    title: "Arts & Humanities Guidance",
    subtitle: "Create your unique path",
    desc: "Explore diverse career options in arts, humanities, and creative fields with expert guidance.",
    features: ["Career exploration", "Portfolio development", "Creative industry insights", "College selection", "Internship opportunities"],
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&h=400&fit=crop",
    category: "Professional",
    popular: false,
  },
  {
    id: "management",
    icon: Briefcase,
    title: "MBA & Management Guidance",
    subtitle: "Fast-track your corporate career",
    desc: "Comprehensive guidance for MBA aspirants - entrance exam prep, B-school selection, and career planning.",
    features: ["MBA entrance guidance", "B-school selection", "GD/PI preparation", "Specialization advice", "Corporate career planning"],
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
    category: "Professional",
    popular: false,
  },
  {
    id: "entrepreneurship",
    icon: Lightbulb,
    title: "Entrepreneurship Guidance",
    subtitle: "Turn ideas into reality",
    desc: "For aspiring entrepreneurs - guidance on business planning, funding, marketing, and scaling strategies.",
    features: ["Business plan development", "Market research", "Funding guidance", "Legal structure advice", "Growth strategy"],
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=400&fit=crop",
    category: "Special",
    popular: false,
  },
  {
    id: "creative",
    icon: Camera,
    title: "Creative Career Guidance",
    subtitle: "Pursue your creative passion",
    desc: "Guidance for creative fields - design, media, entertainment, photography, and visual arts careers.",
    features: ["Creative career exploration", "Portfolio guidance", "Industry connections", "College selection", "Freelance career tips"],
    image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=600&h=400&fit=crop",
    category: "Creative",
    popular: false,
  },
  {
    id: "research",
    icon: Microscope,
    title: "Research & Academia Guidance",
    subtitle: "Build a career in research",
    desc: "Guidance for students interested in research careers, PhD programs, and academic pathways.",
    features: ["Research career paths", "PhD program selection", "Research proposal writing", "University selection", "Academic networking"],
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&h=400&fit=crop",
    category: "Special",
    popular: false,
  },
  {
    id: "government",
    icon: Building,
    title: "Government Exam Guidance",
    subtitle: "Crack government jobs",
    desc: "Expert guidance for UPSC, SSC, Banking, Railways, and other government job exams.",
    features: ["Exam pattern analysis", "Preparation strategy", "Current affairs guidance", "Mock test series", "Interview preparation"],
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&h=400&fit=crop",
    category: "Exams",
    popular: false,
  },
  {
    id: "mentorship",
    icon: Users,
    title: "Group Mentorship",
    subtitle: "Learn and grow together",
    desc: "Join small group sessions with peers facing similar career questions. Learn from experts and share experiences.",
    features: ["Small group sessions", "Interactive discussions", "Peer learning", "Expert facilitation", "Affordable pricing"],
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&h=400&fit=crop",
    category: "Special",
    popular: false,
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-black pt-20">
      {/* Hero Section */}
      <div className="bg-black py-16 px-4 relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-yellow-500/15 rounded-full blur-[120px] animate-pulse-slow" />
          <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-yellow-600/10 rounded-full blur-[100px] animate-pulse-slow animation-delay-1000" />
        </div>
        <div className="container mx-auto px-4 relative text-center">
          <span className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-xs font-semibold px-3 py-1.5 rounded-full uppercase tracking-widest mb-4">
            <Sparkles size={12} />
            18+ Career Services
          </span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white">
            Expert guidance for{" "}
            <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
              every career milestone
            </span>
          </h1>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Personalized, one-on-one sessions with verified experts — designed around your goals, not generic advice.
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="container mx-auto px-4 md:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <div
              key={s.id}
              id={s.id}
              className="group relative bg-black/40 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-yellow-500/40 transition-all duration-300 overflow-hidden hover:-translate-y-1"
            >
              {/* Popular Badge */}
              {s.popular && (
                <div className="absolute top-4 right-4 z-10">
                  <span className="inline-block bg-gradient-to-r from-yellow-500 to-yellow-600 text-black text-xs font-bold px-2.5 py-1 rounded-full">
                    ⭐ Popular
                  </span>
                </div>
              )}

              {/* Category Tag */}
              <div className="absolute top-4 left-4 z-10">
                <span className="inline-block bg-white/10 backdrop-blur-sm text-gray-300 text-[10px] font-medium px-2 py-0.5 rounded-full border border-white/20">
                  {s.category}
                </span>
              </div>

              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={s.image}
                  alt={s.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center mb-4 shadow-lg shadow-yellow-500/20">
                  <s.icon size={22} className="text-black" />
                </div>

                {/* Title & Subtitle */}
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-yellow-400 transition-colors">
                  {s.title}
                </h3>
                <p className="text-yellow-500 text-sm mb-3">{s.subtitle}</p>
                <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2">
                  {s.desc}
                </p>

                {/* Features Preview */}
                <div className="space-y-1.5 mb-5">
                  {s.features.slice(0, 3).map((f) => (
                    <div key={f} className="flex items-center gap-2 text-xs text-gray-500">
                      <CheckCircle size={12} className="text-yellow-500 flex-shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                  {s.features.length > 3 && (
                    <p className="text-xs text-gray-600 pl-5">+{s.features.length - 3} more benefits</p>
                  )}
                </div>

              
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 md:px-6 py-16">
        <div className="bg-gradient-to-r from-yellow-500/10 to-yellow-600/5 rounded-3xl p-10 text-center border border-yellow-500/20">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Not sure which service is right for you?
          </h2>
          <p className="text-gray-400 mb-6">Talk to our experts and get personalized recommendations</p>
          <Link
            href="/counselors"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold hover:shadow-lg hover:shadow-yellow-500/25 transition-all duration-300"
          >
            Talk to a Counselor <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.1); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}