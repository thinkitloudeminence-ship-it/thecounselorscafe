// app/sitemap.ts
import { MetadataRoute } from 'next'
import { fetchAllBlogs, fetchCounselors } from '@/lib/api'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.counselorscafe.com'
  
  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/counselors`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/download-app`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]

  // 🔥 FETCH BLOGS DYNAMICALLY
  let blogRoutes: MetadataRoute.Sitemap = []
  try {
    const response = await fetchAllBlogs()
    const blogs = response?.data || []
    
    blogRoutes = blogs.map((blog: any) => ({
      url: `${baseUrl}/blog/${blog.slug}`,
      lastModified: new Date(blog.updatedAt || blog.createdAt || Date.now()),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))
  } catch (error) {
    console.error('Error fetching blogs for sitemap:', error)
  }

  // 🔥 FETCH COUNSELORS DYNAMICALLY
  let counselorRoutes: MetadataRoute.Sitemap = []
  try {
    // fetchCounselors already returns array of counselors
    const counselors = await fetchCounselors()
    const activeCounselors = counselors?.filter((c: any) => c.isActive !== false) || []
    
    counselorRoutes = activeCounselors.map((counselor: any) => ({
      url: `${baseUrl}/counselors/${counselor.slug || counselor._id}`,
      lastModified: new Date(counselor.updatedAt || counselor.createdAt || Date.now()),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))
  } catch (error) {
    console.error('Error fetching counselors for sitemap:', error)
  }

  return [...staticRoutes, ...blogRoutes, ...counselorRoutes]
}