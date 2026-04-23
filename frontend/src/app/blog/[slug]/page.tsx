"use client";
import React, { useEffect, useState } from "react";
import { ArrowLeft, Clock, User, Calendar, Tag, Heart, Eye, Share2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { fetchBlog } from "@/lib/api";
import type { Metadata } from "next";

// Dynamic metadata for each blog post
export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
    const res = await fetch(`${apiUrl}/blogs/${params.slug}`, {
      next: { revalidate: 3600 },
    });
    
    if (!res.ok) throw new Error("Blog not found");
    
    const data = await res.json();
    const blog = data.data;
    
    if (!blog) throw new Error("No blog data");

    const title = blog.seo?.metaTitle || blog.title;
    const description = blog.seo?.metaDescription || blog.excerpt;
    const imageUrl = blog.image?.url || "/og-image.jpg";

    return {
      title: `${title} | The Counselors Cafe`,
      description,
      keywords: [
        ...(blog.seo?.keywords || []),
        ...(blog.tags || []),
        blog.category,
        "career counselling",
        "the counselors cafe",
      ],
      authors: [{ name: blog.author?.name || "The Counselors Cafe" }],
      alternates: {
        canonical: `https://thecounselorscafe.com/blog/${params.slug}`,
      },
      openGraph: {
        title: `${title} | The Counselors Cafe`,
        description,
        url: `https://thecounselorscafe.com/blog/${params.slug}`,
        type: "article",
        publishedTime: blog.publishedAt,
        authors: [blog.author?.name],
        tags: blog.tags,
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: blog.image?.alt || title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: `${title} | The Counselors Cafe`,
        description,
        images: [imageUrl],
      },
    };
  } catch {
    // Fallback metadata if blog not found
    const title = params.slug
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
    
    return {
      title: `${title} | The Counselors Cafe Blog`,
      description: "Expert career guidance articles from verified counselors at The Counselors Cafe.",
      alternates: {
        canonical: `https://thecounselorscafe.com/blog/${params.slug}`,
      },
    };
  }
}

function NotFound({ slug }: { slug: string }) {
  const title = slug.replace(/-/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase());
  return (
    <div className="min-h-screen pt-20 bg-black">
      <div className="max-w-3xl mx-auto px-4 md:px-6 py-10">
        <Link href="/blog" className="inline-flex items-center gap-2 text-gray-500 hover:text-yellow-500 transition-colors text-sm mb-8">
          <ArrowLeft size={16} /> Back to Blog
        </Link>
        <span className="inline-block bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 text-xs font-medium px-3 py-1.5 rounded-full mb-4">Career Guidance</span>
        <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4">{title}</h1>
        <div className="prose prose-invert max-w-none">
          <p className="text-gray-400 leading-relaxed text-lg">Article coming soon. Connect the backend CMS to see full content here.</p>
          <div className="mt-8 p-6 bg-yellow-500/5 border border-yellow-500/20 rounded-2xl">
            <h3 className="font-bold text-white text-lg mb-2">Need personalized guidance?</h3>
            <p className="text-gray-400 text-sm mb-4">One session with an expert can change everything.</p>
            <Link href="/counselors" className="inline-flex items-center gap-2 bg-yellow-500 text-black font-bold px-5 py-2.5 rounded-xl hover:bg-yellow-400 transition-colors">Talk to a Counselor →</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BlogDetailPage({ params }: { params: { slug: string } }) {
  const [blog, setBlog] = useState<any>(null);
  const [related, setRelated] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    fetchBlog(params.slug)
      .then((res: any) => { if (res?.data) { setBlog(res.data); setRelated(res.related || []); } })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [params.slug]);

  const handleLike = async () => {
    if (liked) return;
    setLiked(true);
    try { await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/blogs/${params.slug}/like`, { method: "POST" }); } catch {}
  };

  if (loading) return <div className="min-h-screen bg-black pt-20 flex items-center justify-center"><div className="text-gray-500 animate-pulse">Loading…</div></div>;
  if (!blog) return <NotFound slug={params.slug} />;

  return (
    <div className="min-h-screen bg-black pt-20">
      {blog.image?.url && (
        <div className="relative h-[360px] md:h-[460px] w-full overflow-hidden">
          <Image src={blog.image.url} alt={blog.image.alt || blog.title} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 max-w-4xl mx-auto">
            <span className="inline-block bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 text-xs font-semibold px-3 py-1.5 rounded-full mb-3 uppercase tracking-wider">{blog.category}</span>
            <h1 className="text-2xl md:text-4xl font-bold text-white leading-tight max-w-3xl">{blog.title}</h1>
          </div>
        </div>
      )}
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-10">
        <Link href="/blog" className="inline-flex items-center gap-2 text-gray-500 hover:text-yellow-500 transition-colors text-sm mb-6"><ArrowLeft size={16} /> Back to Blog</Link>
        {!blog.image?.url && (
          <>
            <span className="inline-block bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 text-xs font-medium px-3 py-1.5 rounded-full mb-4">{blog.category}</span>
            <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-6">{blog.title}</h1>
          </>
        )}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-500 mb-6 pb-6 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-yellow-500 flex items-center justify-center text-black font-bold text-xs">{blog.author?.name?.[0]?.toUpperCase() || "A"}</div>
            <span className="text-gray-300 font-medium">{blog.author?.name}</span>
          </div>
          <span className="flex items-center gap-1.5"><Clock size={13} className="text-yellow-500" />{blog.readTime} min read</span>
          <span className="flex items-center gap-1.5"><Eye size={13} className="text-yellow-500" />{blog.views} views</span>
          <span className="flex items-center gap-1.5"><Calendar size={13} className="text-yellow-500" />{new Date(blog.publishedAt || blog.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</span>
        </div>
        <p className="text-gray-300 text-lg leading-relaxed mb-8 font-medium">{blog.excerpt}</p>
        {blog.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {blog.tags.map((tag: string) => (
              <span key={tag} className="inline-flex items-center gap-1.5 text-xs text-gray-400 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full"><Tag size={10} className="text-yellow-500" />{tag}</span>
            ))}
          </div>
        )}
        <div className="blog-content" dangerouslySetInnerHTML={{ __html: blog.content }} />
        <div className="flex items-center gap-4 mt-10 pt-8 border-t border-white/10">
          <button onClick={handleLike} className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all text-sm font-semibold ${liked ? "bg-red-500/10 border-red-500/30 text-red-400" : "bg-white/5 border-white/10 text-gray-400 hover:text-yellow-400 hover:border-yellow-500/30"}`}>
            <Heart size={15} className={liked ? "fill-red-400" : ""} />{(blog.likes || 0) + (liked ? 1 : 0)} Likes
          </button>
          <button onClick={() => navigator.clipboard?.writeText(window.location.href)} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 bg-white/5 text-gray-400 hover:text-yellow-400 hover:border-yellow-500/30 transition-all text-sm font-semibold">
            <Share2 size={15} /> Share
          </button>
        </div>
        {blog.author?.bio && (
          <div className="mt-10 p-6 bg-white/5 border border-white/10 rounded-2xl flex gap-4">
            <div className="w-14 h-14 rounded-xl bg-yellow-500 flex items-center justify-center text-black font-bold text-xl flex-shrink-0">{blog.author.name?.[0]?.toUpperCase()}</div>
            <div><div className="font-bold text-white mb-1">{blog.author.name}</div><div className="text-gray-400 text-sm leading-relaxed">{blog.author.bio}</div></div>
          </div>
        )}
        <div className="mt-10 p-6 bg-yellow-500/5 border border-yellow-500/20 rounded-2xl">
          <h3 className="font-bold text-white text-lg mb-2">Need personalized guidance? ☕</h3>
          <p className="text-gray-400 text-sm mb-4">One session with an expert counsellor can be life-changing.</p>
          <Link href="/counselors" className="inline-flex items-center gap-2 bg-yellow-500 text-black font-bold px-5 py-2.5 rounded-xl hover:bg-yellow-400 transition-colors text-sm">Talk to a Counselor →</Link>
        </div>
        {related.length > 0 && (
          <div className="mt-12">
            <h3 className="text-xl font-bold text-white mb-6">Related Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {related.map((r: any) => (
                <Link key={r._id} href={`/blog/${r.slug}`} className="bg-white/5 border border-white/10 hover:border-yellow-500/30 rounded-xl overflow-hidden group transition-all">
                  {r.image?.url && <div className="relative h-36 overflow-hidden"><Image src={r.image.url} alt={r.title} fill className="object-cover group-hover:scale-105 transition-transform" /></div>}
                  <div className="p-4"><div className="font-semibold text-white text-sm leading-snug group-hover:text-yellow-400 transition-colors line-clamp-2">{r.title}</div></div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
      <style>{`
        .blog-content { line-height: 1.85; color: #ccc; }
        .blog-content h1 { font-size: 2em; font-weight: 800; margin: 1.2em 0 0.5em; color: #fff; }
        .blog-content h2 { font-size: 1.5em; font-weight: 700; margin: 1.2em 0 0.5em; color: #f0f0f0; padding-bottom: 0.4em; border-bottom: 1px solid rgba(255,255,255,0.08); }
        .blog-content h3 { font-size: 1.2em; font-weight: 600; margin: 1em 0 0.4em; color: #e0e0e0; }
        .blog-content p { margin-bottom: 1em; }
        .blog-content ul, .blog-content ol { padding-left: 1.5em; margin-bottom: 1em; }
        .blog-content li { margin-bottom: 0.4em; }
        .blog-content blockquote { border-left: 4px solid #f5c518; padding: 0.8em 1.2em; margin: 1.5em 0; background: rgba(245,197,24,0.05); border-radius: 0 8px 8px 0; color: #aaa; font-style: italic; }
        .blog-content code { background: #1e1e2e; color: #f5c518; padding: 2px 6px; border-radius: 4px; font-size: 0.9em; }
        .blog-content pre { background: #1e1e2e; border-radius: 10px; padding: 1.2em; margin: 1.2em 0; overflow-x: auto; }
        .blog-content a { color: #f5c518; text-decoration: underline; }
        .blog-content img { max-width: 100%; border-radius: 10px; margin: 1.5em 0; }
        .blog-content strong { color: #fff; font-weight: 700; }
      `}</style>
    </div>
  );
}