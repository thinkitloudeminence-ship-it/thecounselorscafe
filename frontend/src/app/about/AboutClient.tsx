"use client";
import { Heart, Lightbulb, Target, Users, Sparkles, Award, Calendar, Star, Rocket, Globe, Quote, MessageCircle, Users2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const values = [
  { icon: Heart, title: "Student First", desc: "Every decision we make is centered around what's best for the student — not what's easiest or most profitable." },
  { icon: Lightbulb, title: "Clarity Over Confusion", desc: "We believe career confusion is a solvable problem. Our job is to replace overwhelm with a clear, confident plan." },
  { icon: Target, title: "Personalized Approach", desc: "No cookie-cutter advice. Every student gets guidance tailored to their unique strengths, interests, and goals." },
  { icon: Users, title: "Verified Expertise", desc: "Every counselor on our platform is vetted for credentials, experience, and communication quality before onboarding." },
];

const team = [
  { name: "Savin Jain", role: "Founder & CEO", image: "https://cdn.phototourl.com/free/2026-07-04-9ac63293-dbc6-4f96-927d-29a2d2dec396.jpg" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero */}
      <div className="bg-white py-20 px-4 relative overflow-hidden border-b border-gray-200">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-amber-600/5 rounded-full blur-[100px]" />
        </div>
        <div className="container mx-auto px-4 relative text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-600 text-xs font-semibold px-3 py-1.5 rounded-full uppercase tracking-widest mb-6">
            <Sparkles size={12} />
            Our Story
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
            We're on a mission to <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">end career confusion</span> in India
          </h1>
          <p className="text-gray-500 mt-6 text-lg leading-relaxed">
            TheCounselorsCafe was born from a simple observation: millions of Indian students make life-defining career decisions with zero guidance. We're here to change that.
          </p>
        </div>
      </div>

      {/* Story */}
      <section className="py-16 md:py-20 bg-white border-t border-gray-200">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-600 text-xs font-semibold mb-4">
                <Sparkles size={12} />
                Our Story
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                From a <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">broken system</span> to a better one
              </h2>
              <div className="space-y-4 text-gray-500 leading-relaxed">
                <p>
                  In 2020, our founder Savin Jain — a Career Counselor with 10+ years of experience — realized that career guidance in India was either too expensive, too generic, or simply inaccessible.
                </p>
                <p>
                  Students in Tier-2 and Tier-3 cities had no access to quality counselors. Parents gave advice based on outdated information. Schools had one overworked counselor for 2,000 students.
                </p>
                <p>
                  TheCounselorsCafe was created to democratize career guidance — making expert, personalized advice accessible to every Indian student, regardless of city or budget.
                </p>
              </div>
              <div className="mt-8 grid grid-cols-2 gap-4">
                {[
                  { icon: Calendar, val: "2020", label: "Founded" },
                  { icon: Users, val: "50K+", label: "Students Helped" },
                  { icon: Award, val: "200+", label: "Expert Counselors" },
                  { icon: Star, val: "4.9★", label: "Average Rating" }
                ].map((stat) => (
                  <div key={stat.label} className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-center group hover:bg-amber-100 transition-all duration-300">
                    <stat.icon size={24} className="text-amber-500 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                    <p className="text-2xl font-bold text-amber-600">{stat.val}</p>
                    <p className="text-gray-500 text-sm mt-0.5">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Image Card */}
            <div className="bg-amber-50 rounded-3xl p-6 border border-amber-200 group">
              <div className="relative overflow-hidden rounded-2xl mb-6 bg-gray-100" style={{ height: '300px' }}>
                <Image
                  src="https://cdn.phototourl.com/free/2026-07-04-0abc2ae5-d367-4d29-8e93-351fac4df44f.jpg"
                  alt="Career Counselor with Student"
                  fill
                  className="object-contain group-hover:scale-105 transition-transform duration-700"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                
                <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md rounded-full px-3 py-1.5 flex items-center gap-2">
                  <MessageCircle size={14} className="text-amber-500" />
                  <span className="text-white text-xs font-medium">1-on-1 Session</span>
                </div>
                
                <div className="absolute top-4 right-4 bg-amber-500 rounded-full px-3 py-1.5 flex items-center gap-1">
                  <Users2 size={12} className="text-white" />
                  <span className="text-white text-xs font-bold">50K+ Students</span>
                </div>
              </div>
              
              <Quote size={32} className="text-amber-500 mb-4" />
              <p className="text-gray-800 text-lg font-medium leading-relaxed mb-5">
                "Every career journey starts with a conversation. We're here to make sure that conversation leads to clarity, not confusion."
              </p>
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div>
                  <p className="text-gray-900 font-semibold">Savin Jain</p>
                  <p className="text-amber-500 text-sm">Founder & Career Counselor</p>
                </div>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="text-amber-500 fill-amber-500" />
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mt-5 pt-4 border-t border-gray-200">
                <div className="text-center">
                  <p className="text-amber-500 text-xl font-bold">10+</p>
                  <p className="text-gray-500 text-xs">Years Experience</p>
                </div>
                <div className="text-center">
                  <p className="text-amber-500 text-xl font-bold">5000+</p>
                  <p className="text-gray-500 text-xs">Students Guided</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 md:py-20 bg-white border-t border-gray-200">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-3xl p-8 border border-gray-200 hover:border-amber-400 transition-all duration-300 shadow-lg hover:shadow-xl group">
              <div className="w-14 h-14 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Rocket size={28} className="text-amber-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Our Mission</h3>
              <p className="text-gray-500 leading-relaxed">
                To make quality career counselling accessible, affordable, and actionable for every Indian student — connecting them with verified experts who provide personalized, life-changing guidance.
              </p>
            </div>
            <div className="bg-white rounded-3xl p-8 border border-gray-200 hover:border-amber-400 transition-all duration-300 shadow-lg hover:shadow-xl group">
              <div className="w-14 h-14 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Globe size={28} className="text-amber-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Our Vision</h3>
              <p className="text-gray-500 leading-relaxed">
                A future where no Indian student has to make a career decision alone — where expert guidance is as accessible as a phone call, and every young person can pursue a career they love.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-20 bg-white border-t border-gray-200">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-600 text-xs font-semibold mb-4">
              <Sparkles size={12} />
              What We Stand For
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Our core <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">values</span></h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-amber-400 transition-all duration-300 shadow-lg hover:shadow-xl group">
                <div className="w-12 h-12 bg-amber-50 border border-amber-200 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon size={22} className="text-amber-500" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 md:py-20 bg-white border-t border-gray-200">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-600 text-xs font-semibold mb-4">
              <Sparkles size={12} />
              The Team
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Meet the <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">people behind</span> the platform</h2>
          </div>
          <div className="flex justify-center">
            {team.map((m) => (
              <div key={m.name} className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-amber-400 hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl text-center group max-w-[200px]">
                <div className="relative w-32 h-32 mx-auto mb-3">
                  <Image
                    src={m.image}
                    alt={m.name}
                    fill
                    className="rounded-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 rounded-full ring-2 ring-amber-500/30 group-hover:ring-amber-500 transition-all" />
                </div>
                <p className="font-bold text-gray-900 text-sm mt-2">{m.name}</p>
                <p className="text-amber-500 text-xs mt-1">{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}