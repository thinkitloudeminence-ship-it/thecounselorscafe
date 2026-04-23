import axios from "axios";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error?.response?.data || error.message);
    return Promise.reject(error);
  }
);

// ==================== COUNSELORS ====================
export const fetchCounselors = async (params?: Record<string, string>) => {
  try {
    const res = await api.get("/counselors", { params });
    return res.data?.data || res.data || [];
  } catch (error) {
    return [];
  }
};

export const fetchCounselor = async (id: string) => {
  try {
    const res = await api.get(`/counselors/${id}`);
    return res.data?.data || res.data || null;
  } catch (error) {
    return null;
  }
};

// ==================== BLOGS ====================
export const fetchBlogs = async (params?: Record<string, string>) => {
  try {
    const res = await api.get("/blogs", { params });
    // Backend returns { success, data, pagination }
    // blog/page.tsx expects { data: [...] }
    return res.data;
  } catch (error) {
    return null;
  }
};

export const fetchBlog = async (slug: string) => {
  try {
    const res = await api.get(`/blogs/${slug}`);
    // Returns { success, data: blog, related: [...] }
    return res.data;
  } catch (error) {
    return null;
  }
};

// ==================== TESTIMONIALS ====================
export const fetchTestimonials = async () => {
  try {
    const res = await api.get("/testimonials");
    return res.data?.data || res.data || [];
  } catch (error) {
    return [];
  }
};

// ==================== CONTACT ====================
export const submitContact = async (payload: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}) => {
  try {
    const res = await api.post("/contact", payload);
    return res.data;
  } catch (error) {
    throw error;
  }
};


// Add these to your existing api.ts file (after the existing imports)

// ==================== ADMIN BLOGS CRUD ====================
// Get admin token from localStorage (or your auth context)
const getAdminToken = () => {
  const token = localStorage.getItem('adminToken');
  if (!token) throw new Error('No admin token found');
  return token;
};

// Create admin API instance with auth header
const adminApi = () => {
  const token = getAdminToken();
  return axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  });
};

// Get all blogs (admin - includes drafts)
export const getAdminBlogs = async (params?: Record<string, any>) => {
  try {
    const response = await adminApi().get('/admin/blogs', { params });
    return response.data;
  } catch (error) {
    console.error('Get admin blogs error:', error);
    throw error;
  }
};

// Get single blog by ID (admin)
export const getBlogById = async (id: string) => {
  try {
    const response = await adminApi().get(`/admin/blogs/${id}`);
    return response.data;
  } catch (error) {
    console.error('Get blog by ID error:', error);
    throw error;
  }
};

// Create new blog
export const createBlog = async (blogData: any) => {
  try {
    const response = await adminApi().post('/admin/blogs', blogData);
    return response.data;
  } catch (error) {
    console.error('Create blog error:', error);
    throw error;
  }
};

// Update blog
export const updateBlog = async (id: string, blogData: any) => {
  try {
    const response = await adminApi().put(`/admin/blogs/${id}`, blogData);
    return response.data;
  } catch (error) {
    console.error('Update blog error:', error);
    throw error;
  }
};

// Delete blog
export const deleteBlog = async (id: string) => {
  try {
    const response = await adminApi().delete(`/admin/blogs/${id}`);
    return response.data;
  } catch (error) {
    console.error('Delete blog error:', error);
    throw error;
  }
};

// Update blog status (draft/published/archived)
export const updateBlogStatus = async (id: string, status: string) => {
  try {
    const response = await adminApi().patch(`/admin/blogs/${id}/status`, { status });
    return response.data;
  } catch (error) {
    console.error('Update blog status error:', error);
    throw error;
  }
};

// Toggle featured status
export const toggleBlogFeatured = async (id: string) => {
  try {
    const response = await adminApi().patch(`/admin/blogs/${id}/featured`);
    return response.data;
  } catch (error) {
    console.error('Toggle featured error:', error);
    throw error;
  }
};

// Get dashboard stats
export const getDashboardStats = async () => {
  try {
    const response = await adminApi().get('/admin/stats');
    return response.data;
  } catch (error) {
    console.error('Get dashboard stats error:', error);
    throw error;
  }
};