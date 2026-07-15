// app/categories/[slug]/CategoryDetailClient.tsx
"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { 
  ArrowLeft, ChevronRight, Sparkles, Users, Clock, Award, 
  CheckCircle, MessageCircle, Phone, Star, Calendar, 
  Shield, Zap, Briefcase, BookOpen, Heart, Brain, 
  Baby, Scale, Activity, GraduationCap, Target, 
  TrendingUp, Coffee, Sun, Moon, Leaf,
  Globe, FileText, GraduationCap as GradCap,
  Rocket, Lightbulb, Quote, UserCheck,
  Handshake, Home, BriefcaseMedical,
  BarChart4, UsersRound, Smile, ThumbsUp, 
  HeartHandshake, ArrowRight, PlayCircle, BookMarked,
  Layers, Sparkle, Trophy, Medal,
  PenTool, Building2,
} from "lucide-react";

// Category-specific data with rich descriptions
const categoryDetails = {
  "education-career": {
    icon: GraduationCap,
    title: "Education & Career",
    description: "Comprehensive guidance for academic success and career growth. Our expert counselors help you navigate every step of your educational journey.",
    longDescription: "From choosing the right stream after 10th to planning your study abroad adventure, we provide end-to-end support for your academic and professional growth. Our verified counselors bring years of industry experience to help you make informed decisions.",
    whyChoose: [
      "10+ Years of Combined Experience",
      "1000+ Students Successfully Guided",
      "Personalized Career Roadmap",
      "Post-Session Follow-up Support",
    ],
    stats: { students: "1000+", counselors: "25+", success: "95%" },
    subCategories: [
      { 
        name: "Career Counseling", 
        desc: "Discover your ideal career path with expert guidance", 
        icon: Target,
        details: "One-on-one sessions to map your strengths, interests, and career goals",
        price: "₹499/session"
      },
      { 
        name: "Subject & Stream Selection", 
        desc: "Choose the right stream after 7th/10th with confidence", 
        icon: BookOpen,
        details: "Data-backed analysis to help you choose between Science, Commerce, or Arts",
        price: "₹399/session"
      },
      { 
        name: "College Admissions", 
        desc: "Get into your dream college with expert admission guidance", 
        icon: GradCap,
        details: "Complete support for college applications, essays, and interviews",
        price: "₹599/session"
      },
      { 
        name: "Study Abroad Guidance", 
        desc: "Complete support for overseas education from start to finish", 
        icon: Globe,
        details: "University selection, application, visa guidance, and scholarship support",
        price: "₹799/session"
      },
      { 
        name: "Scholarship Guidance", 
        desc: "Find and apply for scholarships that match your profile", 
        icon: Award,
        details: "Identify scholarship opportunities and get help with applications",
        price: "₹449/session"
      },
      { 
        name: "Resume Review", 
        desc: "Professional resume optimization for job applications", 
        icon: FileText,
        details: "ATS-friendly resume writing, formatting, and content optimization",
        price: "₹349/session"
      },
      { 
        name: "Interview Preparation", 
        desc: "Crack your dream job interview with mock sessions", 
        icon: MessageCircle,
        details: "Mock interviews, feedback, and confidence-building sessions",
        price: "₹499/session"
      },
      { 
        name: "Career Change", 
        desc: "Transition to a new career with expert guidance", 
        icon: TrendingUp,
        details: "Identify transferable skills and create a career transition plan",
        price: "₹599/session"
      },
      { 
        name: "Skill Development", 
        desc: "Upskill for future opportunities and career growth", 
        icon: Zap,
        details: "Identify in-demand skills and create a learning roadmap",
        price: "₹399/session"
      },
      { 
        name: "Entrepreneurship Mentoring", 
        desc: "Build your own business with expert mentoring", 
        icon: Briefcase,
        details: "Business planning, strategy, and execution guidance from experienced entrepreneurs",
        price: "₹799/session"
      },
    ]
  },
  "relationships-family": {
    icon: Heart,
    title: "Relationships & Family",
    description: "Expert guidance for building stronger, healthier relationships with family, partners, and friends.",
    longDescription: "Relationships are the foundation of a happy life. Our experienced counselors provide compassionate support for couples, families, and individuals facing relationship challenges. We help you communicate better, resolve conflicts, and build deeper connections.",
    whyChoose: [
      "Certified Relationship Experts",
      "Confidential Sessions",
      "Evidence-Based Approaches",
      "Flexible Scheduling",
    ],
    stats: { couples: "500+", satisfaction: "97%", sessions: "2000+" },
    subCategories: [
      { name: "Relationship Counseling", desc: "Strengthen your bond with your partner", icon: Heart, details: "Professional guidance for couples to improve communication and intimacy", price: "₹599/session" },
      { name: "Marriage Counseling", desc: "Build a stronger, happier marriage", icon: Heart, details: "Expert support for married couples facing challenges or seeking growth", price: "₹699/session" },
      { name: "Premarital Guidance", desc: "Start your marriage on a strong foundation", icon: Star, details: "Prepare for marriage with communication and conflict resolution skills", price: "₹499/session" },
      { name: "Parenting Support", desc: "Become a confident and effective parent", icon: Baby, details: "Guidance for parents at every stage of their child's development", price: "₹449/session" },
      { name: "Teen Counseling", desc: "Support and guidance for teenagers", icon: Users, details: "Help teenagers navigate academic, social, and emotional challenges", price: "₹499/session" },
      { name: "Family Conflict Resolution", desc: "Create peaceful and harmonious family dynamics", icon: Shield, details: "Strategies to resolve conflicts and improve family relationships", price: "₹599/session" },
      { name: "Divorce & Separation Support", desc: "Navigate separation with care and compassion", icon: Heart, details: "Emotional support and practical guidance during separation", price: "₹549/session" },
    ]
  },
  "mental-wellbeing": {
    icon: Brain,
    title: "Mental & Emotional Well-being",
    description: "Professional support for stress, anxiety, depression, and overall mental well-being.",
    longDescription: "Mental health is just as important as physical health. Our certified psychologists and therapists provide compassionate care for various mental health concerns. We create a safe, non-judgmental space where you can heal and grow.",
    whyChoose: [
      "Licensed Therapists",
      "Evidence-Based Treatments",
      "Safe & Confidential Space",
      "Holistic Approach",
    ],
    stats: { clients: "800+", recovery: "92%", sessions: "3000+" },
    subCategories: [
      { name: "Stress Management", desc: "Learn effective techniques to manage stress", icon: Activity, details: "Practical strategies to reduce and manage daily stress", price: "₹499/session" },
      { name: "Anxiety Support", desc: "Overcome anxiety with professional guidance", icon: Shield, details: "Evidence-based approaches to manage anxiety and panic", price: "₹599/session" },
      { name: "Burnout Recovery", desc: "Heal and recover from professional burnout", icon: Coffee, details: "Restore balance and energy after workplace burnout", price: "₹549/session" },
      { name: "Confidence Building", desc: "Build lasting self-confidence and self-esteem", icon: Target, details: "Develop a strong sense of self-worth and confidence", price: "₹449/session" },
      { name: "Emotional Wellness", desc: "Achieve emotional balance and resilience", icon: Heart, details: "Develop emotional intelligence and resilience skills", price: "₹499/session" },
      { name: "Life Coaching", desc: "Reach your full potential with expert coaching", icon: Sparkles, details: "Goal-setting and achievement coaching for personal growth", price: "₹599/session" },
      { name: "Mindfulness", desc: "Practice mindful living for better mental health", icon: Sun, details: "Learn mindfulness techniques for daily well-being", price: "₹399/session" },
      { name: "Habit Building", desc: "Create positive habits for lasting change", icon: TrendingUp, details: "Build sustainable habits for personal and professional growth", price: "₹449/session" },
      { name: "Grief Support", desc: "Heal from loss and grief with compassionate care", icon: Moon, details: "Professional support to navigate grief and loss", price: "₹549/session" },
    ]
  },
  "parenting": {
    icon: Baby,
    title: "Parenting",
    description: "Expert advice for navigating every stage of parenting from infancy to adolescence.",
    longDescription: "Parenting is one of life's most rewarding yet challenging journeys. Our parenting coaches and child development experts provide practical strategies and emotional support for parents at every stage. From toddler tantrums to teenage transitions, we've got you covered.",
    whyChoose: [
      "Child Development Experts",
      "Practical Parenting Strategies",
      "Age-Specific Guidance",
      "Positive Discipline Techniques",
    ],
    stats: { parents: "600+", children: "1200+", workshops: "150+" },
    subCategories: [
      { name: "Learning Difficulties", desc: "Support for children with learning challenges", icon: BookOpen, details: "Strategies to support children with learning difficulties", price: "₹499/session" },
      { name: "Child Behaviour", desc: "Understand and guide your child's behavior", icon: Shield, details: "Positive behavior management strategies for parents", price: "₹449/session" },
      { name: "Parenting Coaching", desc: "Become a more confident and effective parent", icon: Star, details: "One-on-one coaching for modern parenting challenges", price: "₹549/session" },
      { name: "School Readiness", desc: "Prepare your child for school success", icon: GradCap, details: "Ensure your child is ready for the school environment", price: "₹399/session" },
      { name: "Special Education Guidance", desc: "Support for children with special needs", icon: Heart, details: "Expert guidance for special education needs", price: "₹599/session" },
    ]
  },
  "legal-documentation": {
    icon: Scale,
    title: "Legal & Documentation",
    description: "Expert legal guidance for property matters, consumer rights, employment law, and more.",
    longDescription: "Navigating legal matters can be overwhelming. Our legal experts provide clear, practical guidance on various legal issues affecting individuals and families. We help you understand your rights and make informed decisions.",
    whyChoose: [
      "Experienced Legal Professionals",
      "Clear & Practical Advice",
      "Documentation Assistance",
      "Cost-Effective Solutions",
    ],
    stats: { clients: "400+", cases: "800+", satisfaction: "94%" },
    subCategories: [
      { name: "Property Matters", desc: "Expert guidance on property legal issues", icon: Shield, details: "Legal advice for property purchase, sale, and disputes", price: "₹699/session" },
      { name: "Consumer Rights", desc: "Know and protect your consumer rights", icon: CheckCircle, details: "Guidance on consumer protection and rights", price: "₹449/session" },
      { name: "Employment Law", desc: "Understand your rights in the workplace", icon: Briefcase, details: "Legal guidance on workplace rights and issues", price: "₹499/session" },
      { name: "Family Law", desc: "Legal guidance for family-related matters", icon: Heart, details: "Support for family law matters including custody and support", price: "₹599/session" },
      { name: "Legal Documentation", desc: "Assistance with legal documents and forms", icon: FileText, details: "Help with legal paperwork and documentation", price: "₹399/session" },
      { name: "Government Schemes", desc: "Information on government schemes and benefits", icon: Users, details: "Guidance on government schemes and eligibility", price: "₹349/session" },
      { name: "RTI & Public Services", desc: "Guidance on RTI and public services", icon: Award, details: "RTI application and public service guidance", price: "₹399/session" },
    ]
  },
  "child-safety": {
    icon: Shield,
    title: "Child Safety & Family Support",
    description: "Comprehensive support for child safety, bullying prevention, trauma recovery, and family well-being.",
    longDescription: "Every child deserves to feel safe and supported. Our child safety experts and family counselors provide specialized support for children and families facing challenges like bullying, trauma, and behavioral issues.",
    whyChoose: [
      "Child Safety Specialists",
      "Trauma-Informed Care",
      "Family-Centered Approach",
      "School Support Services",
    ],
    stats: { children: "500+", families: "300+", success: "96%" },
    subCategories: [
      { name: "Child Abuse Support", desc: "Help and support for child abuse survivors", icon: Shield, details: "Specialized support for child abuse survivors and families", price: "₹599/session" },
      { name: "Bullying", desc: "Prevent and address bullying effectively", icon: Shield, details: "Strategies to prevent and address bullying in schools", price: "₹499/session" },
      { name: "Emotional Trauma", desc: "Heal from emotional trauma with expert care", icon: Heart, details: "Trauma-informed care for emotional healing", price: "₹549/session" },
      { name: "Parenting Guidance", desc: "Support for child safety and protection", icon: Baby, details: "Guidance for parents on child safety and protection", price: "₹449/session" },
      { name: "Child Behaviour Issues", desc: "Address behavioral challenges in children", icon: Activity, details: "Professional guidance for child behavior issues", price: "₹499/session" },
      { name: "School Stress", desc: "Manage and reduce school-related stress", icon: BookOpen, details: "Strategies to help children manage school stress", price: "₹399/session" },
    ]
  },
  "health-lifestyle": {
    icon: Activity,
    title: "Health & Lifestyle",
    description: "Holistic wellness guidance for nutrition, fitness, and a healthier, balanced lifestyle.",
    longDescription: "True wellness is about more than just diet and exercise. Our health and lifestyle coaches help you achieve holistic well-being through personalized nutrition plans, fitness guidance, and lifestyle changes that work for you.",
    whyChoose: [
      "Certified Health Coaches",
      "Personalized Wellness Plans",
      "Sustainable Lifestyle Changes",
      "Mind-Body Connection",
    ],
    stats: { clients: "700+", transformations: "85%", satisfaction: "93%" },
    subCategories: [
      { name: "Nutrition", desc: "Expert nutrition guidance for better health", icon: Leaf, details: "Personalized nutrition plans for your health goals", price: "₹399/session" },
      { name: "Diet Planning", desc: "Personalized diet plans for your goals", icon: Calendar, details: "Custom diet plans tailored to your health needs", price: "₹449/session" },
      { name: "Fitness Coaching", desc: "Achieve your fitness goals with expert coaching", icon: Activity, details: "Personalized fitness coaching and workout plans", price: "₹499/session" },
      { name: "Women's Health Education", desc: "Comprehensive health guidance for women", icon: Heart, details: "Holistic health guidance for women of all ages", price: "₹449/session" },
      { name: "Men's Health Education", desc: "Health and wellness guidance for men", icon: Shield, details: "Comprehensive health guidance for men", price: "₹449/session" },
      { name: "Senior Care Guidance", desc: "Health support and care for seniors", icon: Users, details: "Health and wellness guidance for senior citizens", price: "₹499/session" },
      { name: "Sleep Improvement", desc: "Better sleep for better overall health", icon: Moon, details: "Strategies to improve sleep quality and duration", price: "₹399/session" },
    ]
  }
};

// Fallback image
const getImageSrc = (categoryId: string) => {
  const images: Record<string, string> = {
    "education-career": "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&h=400&fit=crop",
    "relationships-family": "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=1200&h=400&fit=crop",
    "mental-wellbeing": "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&h=400&fit=crop",
    "parenting": "https://images.unsplash.com/photo-1519457431-44ccd64f579b?w=1200&h=400&fit=crop",
    "legal-documentation": "https://images.unsplash.com/photo-1589829546156-2454bb8a25ad?w=1200&h=400&fit=crop",
    "child-safety": "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=1200&h=400&fit=crop",
    "health-lifestyle": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=400&fit=crop",
  };
  return images[categoryId] || images["education-career"];
};

const getBgImage = (categoryId: string) => {
  const images: Record<string, string> = {
    "education-career": "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&h=400&fit=crop",
    "relationships-family": "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=600&h=400&fit=crop",
    "mental-wellbeing": "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=600&h=400&fit=crop",
    "parenting": "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&h=400&fit=crop",
    "legal-documentation": "https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=600&h=400&fit=crop",
    "child-safety": "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&h=400&fit=crop",
    "health-lifestyle": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=400&fit=crop",
  };
  return images[categoryId] || images["education-career"];
};

export default function CategoryDetailClient({ category }: { category: any }) {
  const router = useRouter();
  const detail = categoryDetails[category.id as keyof typeof categoryDetails] || categoryDetails["education-career"];
  const bannerImage = getImageSrc(category.id);
  const bgImage = getBgImage(category.id);

  const categoryOrder = Object.keys(categoryDetails);
  const categoryIndex = categoryOrder.indexOf(category.id);
  const categoryPosition = String((categoryIndex === -1 ? 0 : categoryIndex) + 1).padStart(2, "0");
  const categoryTotal = String(categoryOrder.length).padStart(2, "0");

  // Animation variants - only used on client
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  return (
    <div className="min-h-screen bg-white pt-28">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Back Button - Static */}
        <button
          onClick={() => router.push("/services")}
          className="group inline-flex items-center gap-2 text-gray-500 hover:text-black transition-all duration-300 mb-6 text-sm font-medium bg-gray-50 px-4 py-2 rounded-full shadow-sm hover:shadow-md border border-gray-200"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Categories
        </button>

        {/* Banner Image */}
        <motion.div
          {...fadeInUp}
          className="relative rounded-3xl overflow-hidden mb-8 h-[260px] md:h-[340px] bg-gray-900"
        >
          <Image
            src={bannerImage}
            alt={category.title}
            fill
            className="object-cover"
            onError={(e) => (e.target as HTMLImageElement).style.display = 'none'}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <div className="absolute top-5 left-5 md:top-6 md:left-6 inline-flex items-center gap-2 bg-amber-500 text-black text-[10px] font-semibold uppercase tracking-[0.15em] px-3 py-1.5 rounded-full">
            Category {categoryPosition} / {categoryTotal}
          </div>
          <div className="absolute inset-0 flex items-end md:items-center p-6 md:p-10">
            <div className="flex items-center gap-4 md:gap-6">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-4xl md:text-5xl flex-shrink-0">
                {category.icon}
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight">
                  {category.title}
                </h1>
                <p className="text-white/75 text-sm md:text-base mt-2 max-w-2xl leading-relaxed">
                  {detail.description}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          {...fadeInUp}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 text-gray-400 text-[10px] font-semibold uppercase tracking-[0.2em] mb-3">
            <BarChart4 size={12} className="text-amber-500" />
            By the numbers
          </div>
          <div className="grid grid-cols-3 gap-3 md:gap-4">
            {Object.entries(detail.stats).map(([key, value], idx) => (
              <div
                key={idx}
                className="relative bg-white border border-gray-200 rounded-xl p-3 md:p-4 text-center shadow-sm hover:shadow-md hover:border-amber-300 transition-all overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-amber-500/70" />
                <p className="text-black font-bold text-xl md:text-2xl tracking-tight">
                  {value}
                </p>
                <p className="text-gray-500 text-[10px] md:text-xs uppercase tracking-wide mt-1">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Why Choose Us */}
        <motion.div
          {...fadeInUp}
          transition={{ delay: 0.15 }}
          className="mb-8"
        >
          <div className="text-gray-400 text-[10px] font-semibold uppercase tracking-[0.2em] mb-2">
            The CounselorsCafe Difference
          </div>
          <div className="flex items-center gap-2 mb-4">
            <Rocket size={22} className="text-amber-500" />
            <h2 className="text-xl md:text-2xl font-bold text-black tracking-tight">Why Choose Us</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {detail.whyChoose.map((feature: string, idx: number) => (
              <div
                key={idx}
                className="flex items-center gap-2.5 bg-white border border-gray-200 rounded-xl p-3 hover:border-amber-400 hover:bg-amber-50/40 transition-all"
              >
                <CheckCircle size={16} className="text-amber-500 flex-shrink-0" />
                <span className="text-gray-700 text-xs md:text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Available Services */}
        <motion.div
          {...fadeInUp}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 text-gray-400 text-[10px] font-semibold uppercase tracking-[0.2em] mb-2">
            <Layers size={12} className="text-amber-500" />
            What We Offer
          </div>
          <div className="flex items-center gap-2 mb-6">
            <BookOpen size={22} className="text-black" />
            <h2 className="text-xl md:text-2xl font-bold text-black tracking-tight">Our Services</h2>
            <span className="text-[10px] text-gray-500 bg-gray-100 border border-gray-200 rounded-full px-2 py-0.5 ml-1">
              {String(detail.subCategories.length).padStart(2, "0")} services
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {detail.subCategories.map((sub: any, idx: number) => {
              const IconComponent = sub.icon || Target;
              return (
                <div
                  key={sub.name}
                  className="group block bg-white border border-gray-200 hover:border-amber-400 hover:shadow-lg transition-all duration-300 rounded-xl p-4 md:p-5 relative overflow-hidden h-full"
                >
                  <div className="absolute top-0 left-0 right-0 h-1 bg-amber-500" />
                  
                  <div className="flex flex-col h-full">
                    <div className="flex items-start gap-3 md:gap-4">
                      <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-black flex items-center justify-center flex-shrink-0 shadow-lg">
                        <IconComponent size={20} className="text-amber-500" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="text-gray-900 font-semibold text-base md:text-lg group-hover:text-amber-600 transition-colors">
                            {sub.name}
                          </h3>
                          <span className="text-[10px] font-medium text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full flex-shrink-0">
                            {String(idx + 1).padStart(2, "0")}
                          </span>
                        </div>
                        
                        <p className="text-gray-500 text-sm mt-1 leading-relaxed">
                          {sub.desc}
                        </p>
                        
                        <div className="flex flex-wrap items-center gap-3 mt-3">
                          <span className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-full border border-gray-200">
                            {sub.details}
                          </span>
                          <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-1 rounded-full border border-amber-200">
                            {sub.price}
                          </span>
                        </div>
                        
                        <Link
                          href={`/counselors?category=${encodeURIComponent(category.title)}&sub=${encodeURIComponent(sub.name)}`}
                          className="inline-flex items-center gap-1 mt-3 text-black text-sm font-medium group-hover:text-amber-600 transition-colors"
                        >
                          <span>View Details</span>
                          <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          {...fadeInUp}
          transition={{ delay: 0.25 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 text-gray-400 text-[10px] font-semibold uppercase tracking-[0.2em] mb-2">
            Common Questions
          </div>
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb size={22} className="text-amber-500" />
            <h2 className="text-xl md:text-2xl font-bold text-black tracking-tight">Frequently Asked Questions</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { q: "How do I get started?", a: "Simply browse our services and book a session with a verified expert counselor." },
              { q: "Are the sessions confidential?", a: "Yes, all sessions are 100% private and confidential." },
              { q: "What platforms do you use for sessions?", a: "We offer chat, audio, and video sessions on our platform." },
              { q: "How much does a session cost?", a: "Prices vary by counselor and service. Check individual profiles for details." },
            ].map((faq, idx) => (
              <div
                key={idx}
                className="flex gap-3 bg-white border border-gray-200 rounded-xl p-4 hover:border-amber-400 transition-all"
              >
                <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-black text-amber-500 text-[10px] font-bold flex items-center justify-center">
                  Q{String(idx + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <h4 className="text-gray-900 font-semibold text-sm mb-1">{faq.q}</h4>
                  <p className="text-gray-500 text-sm">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          {...fadeInUp}
          transition={{ delay: 0.3 }}
          className="mt-8 p-6 md:p-8 bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-2xl text-center"
        >
        </motion.div>
      </div>
    </div>
  );
}