"use client";
import { CheckCircle, Heart, Lightbulb, Target, Users, Sparkles, Award, Calendar, Star, Rocket, Globe, Quote, MessageCircle, Users2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const values = [
  { icon: Heart, title: "Student First", desc: "Every decision we make is centered around what's best for the student — not what's easiest or most profitable." },
  { icon: Lightbulb, title: "Clarity Over Confusion", desc: "We believe career confusion is a solvable problem. Our job is to replace overwhelm with a clear, confident plan." },
  { icon: Target, title: "Personalized Approach", desc: "No cookie-cutter advice. Every student gets guidance tailored to their unique strengths, interests, and goals." },
  { icon: Users, title: "Verified Expertise", desc: "Every counselor on our platform is vetted for credentials, experience, and communication quality before onboarding." },
];

const team = [
  { name: "Kavita Sharma", role: "Founder & CEO", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop" },
  { name: "Nikhil Verma", role: "Head of Counselling", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop" },
  { name: "Pooja Nair", role: "Technology Lead", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop" },
  { name: "Sameer Khan", role: "Growth & Marketing", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black pt-20">
      {/* Hero */}
      <div className="bg-black py-20 px-4 relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-yellow-500/15 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-yellow-600/10 rounded-full blur-[100px]" />
        </div>
        <div className="container mx-auto px-4 relative text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-xs font-semibold px-3 py-1.5 rounded-full uppercase tracking-widest mb-6">
            <Sparkles size={12} />
            Our Story
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
            We're on a mission to <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">end career confusion</span> in India
          </h1>
          <p className="text-gray-400 mt-6 text-lg leading-relaxed">
            TheCounselorsCafe was born from a simple observation: millions of Indian students make life-defining career decisions with zero guidance. We're here to change that.
          </p>
        </div>
      </div>

      {/* Story */}
      <section className="py-16 md:py-20 bg-black border-t border-white/5">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs font-semibold mb-4">
                <Sparkles size={12} />
                Our Story
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                From a <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">broken system</span> to a better one
              </h2>
              <div className="space-y-4 text-gray-400 leading-relaxed">
                <p>
                  In 2020, our founder Kavita Sharma — herself a career counselor with 10+ years of experience — realized that career guidance in India was either too expensive, too generic, or simply inaccessible.
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
                  <div key={stat.label} className="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-4 text-center group hover:bg-yellow-500/20 transition-all duration-300">
                    <stat.icon size={24} className="text-yellow-500 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                    <p className="text-2xl font-bold text-yellow-500">{stat.val}</p>
                    <p className="text-gray-400 text-sm mt-0.5">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Counselor Image with Animation */}
            <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 rounded-3xl p-6 border border-yellow-500/20 group">
              <div className="relative overflow-hidden rounded-2xl mb-6">
                <Image
                  src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&h=400&fit=crop"
                  alt="Career Counselor with Student"
                  width={500}
                  height={300}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                
                {/* Floating Animation Badge */}
                <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md rounded-full px-3 py-1.5 flex items-center gap-2">
                  <MessageCircle size={14} className="text-yellow-500" />
                  <span className="text-white text-xs font-medium">1-on-1 Session</span>
                </div>
                
                <div className="absolute top-4 right-4 bg-yellow-500/90 rounded-full px-3 py-1.5 flex items-center gap-1">
                  <Users2 size={12} className="text-black" />
                  <span className="text-black text-xs font-bold">50K+ Students</span>
                </div>
              </div>
              
              <Quote size={32} className="text-yellow-500 mb-4" />
              <p className="text-white text-lg font-medium leading-relaxed mb-5">
                "Every career journey starts with a conversation. We're here to make sure that conversation leads to clarity, not confusion."
              </p>
              
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div>
                  <p className="text-white font-semibold">Kavita Sharma</p>
                  <p className="text-yellow-500 text-sm">Founder & Career Counselor</p>
                </div>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
              </div>
              
              {/* Animated Stats */}
              <div className="grid grid-cols-2 gap-3 mt-5 pt-4 border-t border-white/10">
                <div className="text-center">
                  <p className="text-yellow-500 text-xl font-bold">8+</p>
                  <p className="text-gray-500 text-xs">Years Experience</p>
                </div>
                <div className="text-center">
                  <p className="text-yellow-500 text-xl font-bold">5000+</p>
                  <p className="text-gray-500 text-xs">Students Guided</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 md:py-20 bg-black border-t border-white/5">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-black/40 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-yellow-500/40 transition-all duration-300 group">
              <div className="w-14 h-14 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Rocket size={28} className="text-yellow-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Our Mission</h3>
              <p className="text-gray-400 leading-relaxed">
                To make quality career counselling accessible, affordable, and actionable for every Indian student — connecting them with verified experts who provide personalized, life-changing guidance.
              </p>
            </div>
            <div className="bg-black/40 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-yellow-500/40 transition-all duration-300 group">
              <div className="w-14 h-14 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Globe size={28} className="text-yellow-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Our Vision</h3>
              <p className="text-gray-400 leading-relaxed">
                A future where no Indian student has to make a career decision alone — where expert guidance is as accessible as a phone call, and every young person can pursue a career they love.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-20 bg-black border-t border-white/5">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs font-semibold mb-4">
              <Sparkles size={12} />
              What We Stand For
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Our core <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">values</span></h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-yellow-500/40 transition-all duration-300 group">
                <div className="w-12 h-12 bg-yellow-500/10 border border-yellow-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon size={22} className="text-yellow-500" />
                </div>
                <h3 className="font-bold text-white mb-2">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 md:py-20 bg-black border-t border-white/5">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs font-semibold mb-4">
              <Sparkles size={12} />
              The Team
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Meet the <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">people behind</span> the platform</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {team.map((m) => (
              <div key={m.name} className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-yellow-500/40 hover:-translate-y-1 transition-all duration-300 text-center group">
                <div className="relative w-20 h-20 mx-auto mb-3">
                  <Image
                    src={m.image}
                    alt={m.name}
                    fill
                    className="rounded-2xl object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-yellow-500/20 to-transparent" />
                </div>
                <p className="font-bold text-white text-sm mt-2">{m.name}</p>
                <p className="text-yellow-500 text-xs mt-1">{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-black border-t border-white/5">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Ready to start your <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">journey?</span></h2>
          <p className="text-gray-400 mt-4 mb-8 max-w-md mx-auto">Join 50,000+ students who've found career clarity with TheCounselorsCafe.</p>
          <Link href="/counselors" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold hover:shadow-lg hover:shadow-yellow-500/25 transition-all duration-300">
            Talk to a Counselor →
          </Link>
        </div>
      </section>
    </div>
  );
}