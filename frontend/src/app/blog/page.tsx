"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Clock, User, ArrowRight, Search, Sparkles, BookOpen, GraduationCap, Globe, FileText, TrendingUp, Award, Heart } from "lucide-react";
import { fetchBlogs } from "@/lib/api";

const categoryColors: Record<string, string> = {
  "Exam Guidance": "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  "Career Guidance": "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  "Study Abroad": "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  "Stream Selection": "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
};

const categoryIcons: Record<string, React.ReactNode> = {
  "Exam Guidance": <BookOpen size={14} className="text-yellow-500" />,
  "Career Guidance": <GraduationCap size={14} className="text-yellow-500" />,
  "Study Abroad": <Globe size={14} className="text-yellow-500" />,
  "Stream Selection": <FileText size={14} className="text-yellow-500" />,
};

// Helper function to get author name
const getAuthorName = (author: any): string => {
  if (!author) return "counselors cafe";
  if (typeof author === "string") return author;
  if (author.name) return author.name;
  return "counselors cafe";
};

// Helper function to get valid image URL
const getImageUrl = (image: any): string | null => {
  if (!image) return null;
  if (typeof image === "string" && image.trim() !== "") return image;
  if (image?.url && image.url.trim() !== "") return image.url;
  return null;
};

// Fallback blogs in case API fails
const fallbackBlogs = [
  {
    _id: "1",
    slug: "role-of-parents-in-career-selection",
    title: "The Role of Parents in Career Selection: How to Guide Your Child",
    excerpt: "Learn how parents can guide their children in choosing the right career through support, communication, and smart decision-making strategies.",
    category: "Career Guidance",
    readTime: 5,
    author: { name: "counselors cafe" },
    image: { url: "" },
  },
  {
    _id: "2",
    slug: "what-to-do-after-12th",
    title: "What To Do After 12th? Complete Career Guide for Students",
    excerpt: "Confused about what to do after 12th? Explore the best career options, avoid common mistakes, and learn how to choose the right path with expert guidance.",
    category: "Career Guidance",
    readTime: 5,
    author: { name: "counselors cafe" },
    image: { url: "" },
  },
  {
    _id: "3",
    slug: "how-career-counselors-analyze-strengths-weaknesses",
    title: "How Career Counselors Analyze Your Strengths and Weaknesses",
    excerpt: "Learn how career counselors evaluate your strengths and weaknesses using scientific tools, tests, and expert guidance to help you choose the right career path.",
    category: "Career Guidance",
    readTime: 5,
    author: { name: "counselors cafe" },
    image: { url: "" },
  },
];

export default function BlogPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  const categories = ["All", ...Array.from(new Set(blogs.map((b) => b.category)))];

  useEffect(() => {
    fetchBlogs()
      .then((res) => { 
        if (res?.data?.length) {
          setBlogs(res.data);
        } else {
          setBlogs(fallbackBlogs);
        }
      })
      .catch(() => {
        setBlogs(fallbackBlogs);
      })
      .finally(() => setLoading(false));
  }, []);

  const filtered = blogs.filter((b) => {
    const matchCat = activeCategory === "All" || b.category === activeCategory;
    const matchSearch = !search || b.title.toLowerCase().includes(search.toLowerCase()) || b.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-black pt-20">
      {/* Header */}
      <div className="bg-black py-16 px-4 relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-yellow-500/15 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-yellow-600/10 rounded-full blur-[100px]" />
        </div>
        <div className="container mx-auto px-4 relative text-center">
          <span className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-xs font-semibold px-3 py-1.5 rounded-full uppercase tracking-widest mb-4">
            <Sparkles size={12} />
            Knowledge Hub
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-white">Career Guidance <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">Blog</span></h1>
          <p className="text-gray-400 mt-3 max-w-xl mx-auto">Expert articles on stream selection, career paths, study abroad, exams, and more — written by verified counselors.</p>
        </div>
      </div>

      {/* Stats Banner - NEW: Extra content for Google */}
      <div className="bg-gradient-to-r from-yellow-500/5 to-yellow-600/5 border-y border-yellow-500/20 py-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="flex items-center justify-center gap-3">
              <BookOpen size={24} className="text-yellow-500" />
              <div>
                <p className="text-white font-bold text-lg">3+ Expert Articles</p>
                <p className="text-gray-500 text-xs">Career Guidance & Tips</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3">
              <TrendingUp size={24} className="text-yellow-500" />
              <div>
                <p className="text-white font-bold text-lg">Weekly Updates</p>
                <p className="text-gray-500 text-xs">Fresh Content Every Week</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Award size={24} className="text-yellow-500" />
              <div>
                <p className="text-white font-bold text-lg">Verified Counselors</p>
                <p className="text-gray-500 text-xs">Expert-Written Articles</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-10">
        {/* Search */}
        <div className="relative max-w-xl mx-auto mb-8">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search articles..."
            className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500/50 transition-colors"
          />
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-sm font-medium px-4 py-2 rounded-full border transition-all duration-300 flex items-center gap-1.5 ${
                activeCategory === cat 
                  ? "bg-yellow-500 text-black border-yellow-500" 
                  : "bg-black/40 text-gray-400 border-white/10 hover:border-yellow-500/50 hover:text-yellow-400"
              }`}
            >
              {cat !== "All" && categoryIcons[cat]}
              {cat}
            </button>
          ))}
        </div>

        {/* Info Banner for Users */}
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 mb-8 text-center">
          <p className="text-gray-300 text-sm">
            📚 <strong>3 career guidance articles</strong> available — covering stream selection, after 12th career options, 
            and understanding career counseling. Updated regularly by India's top career experts.
          </p>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => <div key={i} className="bg-black/40 rounded-2xl h-80 animate-pulse border border-white/10" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((blog, i) => {
              const imageUrl = getImageUrl(blog.image);
              return (
                <motion.article
                  key={blog._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  viewport={{ once: true }}
                  className="bg-black/40 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-yellow-500/40 hover:-translate-y-1 transition-all duration-300 overflow-hidden group"
                >
                  <div className="relative h-48 overflow-hidden bg-gray-900">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={blog.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                        <GraduationCap size={48} className="text-gray-600" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                    
                    <div className="absolute bottom-3 left-3 z-10">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border ${categoryColors[blog.category] || "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"}`}>
                        {categoryIcons[blog.category]}
                        {blog.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    <h2 className="font-bold text-white text-base leading-snug mb-2 group-hover:text-yellow-400 transition-colors line-clamp-2">
                      {blog.title}
                    </h2>
                    <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 mb-4">{blog.excerpt}</p>

                    <div className="flex items-center justify-between border-t border-white/10 pt-3">
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <User size={11} className="text-yellow-500" />
                          {getAuthorName(blog.author).split(" ").slice(0, 2).join(" ")}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={11} className="text-yellow-500" />
                          {blog.readTime || 5} min read
                        </span>
                      </div>
                      <Link href={`/blog/${blog.slug}`} className="flex items-center gap-1 text-yellow-500 text-xs font-semibold hover:gap-2 transition-all group-hover:text-yellow-400">
                        Read <ArrowRight size={12} />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        )}

        {/* No Results */}
        {filtered.length === 0 && !loading && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-white text-xl font-semibold mb-2">No articles found</h3>
            <p className="text-gray-500">Try adjusting your search or filter</p>
            <button
              onClick={() => { setSearch(""); setActiveCategory("All"); }}
              className="mt-4 text-yellow-500 hover:text-yellow-400 text-sm"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-yellow-500/10 to-yellow-600/5 rounded-2xl p-8 border border-yellow-500/20">
            <Heart size={32} className="text-yellow-500 mx-auto mb-4" />
            <h3 className="text-white text-xl font-bold mb-2">Need Personalized Career Guidance?</h3>
            <p className="text-gray-400 text-sm mb-6 max-w-md mx-auto">
              Connect with our verified expert counselors for one-on-one personalized career guidance sessions.
            </p>
            <Link
              href="/counselors"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold hover:shadow-lg hover:shadow-yellow-500/25 transition-all duration-300"
            >
              Talk to a Counselor <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}