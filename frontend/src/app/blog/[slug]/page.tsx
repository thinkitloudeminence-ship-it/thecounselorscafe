import type { Metadata } from "next";
import BlogDetailClient from "../BlogClient";

export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
    const res = await fetch(`${apiUrl}/blogs/${params.slug}`, {
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
        images: [{ url: imageUrl, width: 1200, height: 630, alt: blog.image?.alt || title }],
      },
      twitter: {
        card: "summary_large_image",
        title: `${title} | The Counselors Cafe`,
        description,
        images: [imageUrl],
      },
    };
  } catch {
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

export default function BlogDetailPage({ params }: { params: { slug: string } }) {
  return <BlogDetailClient slug={params.slug} />;
}