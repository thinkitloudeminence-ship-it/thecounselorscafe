"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Clock, User, ArrowRight, Search, Sparkles, BookOpen, GraduationCap, Globe, FileText } from "lucide-react";
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

// Helper function to get author name (handles both string and object)
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

export default function BlogPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  const categories = ["All", ...Array.from(new Set(blogs.map((b) => b.category)))];

  useEffect(() => {
    fetchBlogs()
      .then((res) => { 
        if (res?.data?.length) setBlogs(res.data); 
      })
      .catch(() => {})
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

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => <div key={i} className="bg-black/40 rounded-2xl h-80 animate-pulse border border-white/10" />)}
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
                  {/* Image - Only render if valid image URL exists */}
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
                        <BookOpen size={48} className="text-gray-600" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                    
                    {/* Category Badge */}
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
                    <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 mb-4">{blog.excerpt}</p>

                    <div className="flex items-center justify-between border-t border-white/10 pt-3">
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <User size={11} className="text-yellow-500" />
                          {getAuthorName(blog.author).split(" ").slice(0, 2).join(" ")}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={11} className="text-yellow-500" />
                          {blog.readTime} min read
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
      </div>
    </div>
  );
}