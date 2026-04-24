import type { Metadata } from "next";
import BlogDetailClient from "./BlogClient";

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }  // ✅ Promise type
): Promise<Metadata> {
  const { slug } = await params;  // ✅ await params
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
    const res = await fetch(`${apiUrl}/blogs/${slug}`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) throw new Error("Not found");
    const data = await res.json();
    const blog = data.data;
    if (!blog) throw new Error("No data");

    const title = blog.seo?.metaTitle || blog.title;
    const description = blog.seo?.metaDescription || blog.excerpt;
    const imageUrl = blog.image?.url || "/og-image.jpg";

    return {
      title: `${title} | counselors cafe`,
      description,
      keywords: [
        ...(blog.seo?.keywords || []),
        ...(blog.tags || []),
        blog.category,
        "career counselling",
        "counselors cafe",
      ],
      authors: [{ name: blog.author?.name || "counselors cafe" }],
      alternates: {
        canonical: `https://counselorscafe.com/blog/${slug}`,
      },
      openGraph: {
        title: `${title} | counselors cafe`,
        description,
        url: `https://counselorscafe.com/blog/${slug}`,
        type: "article",
        publishedTime: blog.publishedAt,
        authors: [blog.author?.name],
        tags: blog.tags,
        images: [{ url: imageUrl, width: 1200, height: 630, alt: blog.image?.alt || title }],
      },
      twitter: {
        card: "summary_large_image",
        title: `${title} | counselors cafe`,
        description,
        images: [imageUrl],
      },
    };
  } catch {
    const title = slug
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
    return {
      title: `${title} | counselors cafe Blog`,
      description: "Expert career guidance articles from verified counselors at counselors cafe.",
      alternates: {
        canonical: `https://counselorscafe.com/blog/${slug}`,
      },
    };
  }
}

export default async function BlogDetailPage({ 
  params 
}: { 
  params: Promise<{ slug: string }>  // ✅ Promise type
}) {
  const { slug } = await params;  // ✅ await params
  return <BlogDetailClient slug={slug} />;
}