"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Clock, User, ArrowRight, Search, Sparkles, BookOpen, GraduationCap, Globe, FileText, TrendingUp, Award, Heart } from "lucide-react";
import { fetchBlogs } from "@/lib/api";

const categoryColors: Record<string, string> = {
  "Exam Guidance": "bg-amber-50 text-amber-600 border-amber-200",
  "Career Guidance": "bg-amber-50 text-amber-600 border-amber-200",
  "Study Abroad": "bg-amber-50 text-amber-600 border-amber-200",
  "Stream Selection": "bg-amber-50 text-amber-600 border-amber-200",
};

const categoryIcons: Record<string, React.ReactNode> = {
  "Exam Guidance": <BookOpen size={14} className="text-amber-500" />,
  "Career Guidance": <GraduationCap size={14} className="text-amber-500" />,
  "Study Abroad": <Globe size={14} className="text-amber-500" />,
  "Stream Selection": <FileText size={14} className="text-amber-500" />,
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
    <div className="min-h-screen bg-white pt-20">
      {/* Header */}
      <div className="bg-white py-16 px-4 relative overflow-hidden border-b border-gray-200">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-amber-600/5 rounded-full blur-[100px]" />
        </div>
        <div className="container mx-auto px-4 relative text-center">
          {/* <span className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-600 text-xs font-semibold px-3 py-1.5 rounded-full uppercase tracking-widest mb-4">
            <Sparkles size={12} />
            Knowledge Hub
          </span> */}
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900">Career Guidance <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">Blog</span></h1>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">Expert articles on stream selection, career paths, study abroad, exams, and more — written by verified counselors.</p>
        </div>
      </div>

      {/* Stats Banner - NEW: Extra content for Google */}
      <div className="bg-amber-50 border-y border-amber-200 py-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="flex items-center justify-center gap-3">
              {/* <BookOpen size={24} className="text-amber-500" /> */}
              {/* <div>
                <p className="text-gray-900 font-bold text-lg">3+ Expert Articles</p>
                <p className="text-gray-500 text-xs">Career Guidance & Tips</p>
              </div> */}
            </div>
            <div className="flex items-center justify-center gap-3">
              {/* <TrendingUp size={24} className="text-amber-500" />
              <div>
                <p className="text-gray-900 font-bold text-lg">Weekly Updates</p>
                <p className="text-gray-500 text-xs">Fresh Content Every Week</p>
              </div> */}
            </div>
            <div className="flex items-center justify-center gap-3">
              {/* <Award size={24} className="text-amber-500" />
              <div>
                <p className="text-gray-900 font-bold text-lg">Verified Counselors</p>
                <p className="text-gray-500 text-xs">Expert-Written Articles</p>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-10">
        {/* Search */}
        {/* <div className="relative max-w-xl mx-auto mb-8">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search articles..."
            className="w-full bg-white border border-gray-300 rounded-xl py-3 pl-10 pr-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-amber-500 transition-colors shadow-sm"
          />
        </div> */}

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-sm font-medium px-4 py-2 rounded-full border transition-all duration-300 flex items-center gap-1.5 ${
                activeCategory === cat 
                  ? "bg-amber-500 text-white border-amber-500" 
                  : "bg-white text-gray-600 border-gray-300 hover:border-amber-400 hover:text-amber-600"
              }`}
            >
              {cat !== "All" && categoryIcons[cat]}
              {cat}
            </button>
          ))}
        </div>

        {/* Info Banner for Users */}
        {/* <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 text-center">
          <p className="text-gray-600 text-sm">
            📚 <strong>3 career guidance articles</strong> available — covering stream selection, after 12th career options, 
            and understanding career counseling. Updated regularly by India's top career experts.
          </p>
        </div> */}

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => <div key={i} className="bg-gray-100 rounded-2xl h-80 animate-pulse border border-gray-200" />)}
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
                  className="bg-white rounded-2xl border border-gray-200 hover:border-amber-400 hover:-translate-y-1 transition-all duration-300 overflow-hidden shadow-lg hover:shadow-xl group"
                >
                  <div className="relative h-48 overflow-hidden bg-gray-100">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={blog.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                        <GraduationCap size={48} className="text-gray-400" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    
                    <div className="absolute bottom-3 left-3 z-10">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border ${categoryColors[blog.category] || "bg-amber-50 text-amber-600 border-amber-200"}`}>
                        {categoryIcons[blog.category]}
                        {blog.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    <h2 className="font-bold text-gray-900 text-base leading-snug mb-2 group-hover:text-amber-600 transition-colors line-clamp-2">
                      {blog.title}
                    </h2>
                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-4">{blog.excerpt}</p>

                    <div className="flex items-center justify-between border-t border-gray-200 pt-3">
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <User size={11} className="text-amber-500" />
                          {getAuthorName(blog.author).split(" ").slice(0, 2).join(" ")}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={11} className="text-amber-500" />
                          {blog.readTime || 5} min read
                        </span>
                      </div>
                      <Link href={`/blog/${blog.slug}`} className="flex items-center gap-1 text-amber-500 text-xs font-semibold hover:gap-2 transition-all group-hover:text-amber-600">
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
            <h3 className="text-gray-900 text-xl font-semibold mb-2">No articles found</h3>
            <p className="text-gray-500">Try adjusting your search or filter</p>
            <button
              onClick={() => { setSearch(""); setActiveCategory("All"); }}
              className="mt-4 text-amber-500 hover:text-amber-600 text-sm"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* CTA Section */}
        {/* <div className="mt-16 text-center">
          <div className="bg-amber-50 rounded-2xl p-8 border border-amber-200">
            <Heart size={32} className="text-amber-500 mx-auto mb-4" />
            <h3 className="text-gray-900 text-xl font-bold mb-2">Need Personalized Career Guidance?</h3>
            <p className="text-gray-500 text-sm mb-6 max-w-md mx-auto">
              Connect with our verified expert counselors for one-on-one personalized career guidance sessions.
            </p>
            <Link
              href="/counselors"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold hover:shadow-lg hover:shadow-amber-500/25 transition-all duration-300"
            >
              Talk to a Counselor <ArrowRight size={16} />
            </Link>
          </div>
        </div> */}
      </div>
    </div>
  );
}