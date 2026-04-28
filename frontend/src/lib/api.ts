import axios from "axios";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

console.log("🔗 API Base URL:", API_URL);

export const api = axios.create({
  baseURL: API_URL,
  timeout: 30000, // Increased timeout
  headers: { "Content-Type": "application/json" },
});

// Add request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    console.log(`📤 ${config.method?.toUpperCase()} ${config.url}`, config.data);
    return config;
  },
  (error) => {
    console.error("Request Error:", error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log(`📥 ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error("API Error:", {
      message: error?.response?.data?.message || error.message,
      status: error?.response?.status,
      url: error?.config?.url,
      data: error?.response?.data
    });
    return Promise.reject(error);
  }
);

// ==================== COUNSELORS ====================
export const fetchCounselors = async (params?: Record<string, string>) => {
  try {
    const res = await api.get("/counselors", { params });
    return res.data?.data || res.data || [];
  } catch (error) {
    console.error("Fetch counselors error:", error);
    return [];
  }
};

export const fetchCounselor = async (id: string) => {
  try {
    const res = await api.get(`/counselors/${id}`);
    return res.data?.data || res.data || null;
  } catch (error) {
    console.error("Fetch counselor error:", error);
    return null;
  }
};

// ==================== BLOGS ====================
export const fetchBlogs = async (params?: Record<string, string>) => {
  try {
    const res = await api.get("/blogs", { params });
    console.log("Blogs response:", res.data);
    // Backend returns { success, data, pagination }
    return res.data;
  } catch (error) {
    console.error("Fetch blogs error:", error);
    // Return empty data structure on error
    return { success: false, data: [], pagination: { total: 0, page: 1, pages: 1 } };
  }
};

export const fetchBlog = async (slug: string) => {
  try {
    const res = await api.get(`/blogs/${slug}`);
    console.log("Blog response:", res.data);
    return res.data;
  } catch (error) {
    console.error("Fetch blog error:", error);
    return null;
  }
};

// ==================== TESTIMONIALS ====================
export const fetchTestimonials = async () => {
  try {
    const res = await api.get("/testimonials");
    return res.data?.data || res.data || [];
  } catch (error) {
    console.error("Fetch testimonials error:", error);
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
    console.error("Submit contact error:", error);
    throw error;
  }
};

// ==================== ADMIN BLOGS CRUD ====================
// Get admin token from localStorage
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
    timeout: 30000,
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  });
};

// Get single blog by ID (admin)
export const getAdminBlog = async (id: string) => {
  try {
    const response = await adminApi().get(`/admin/blogs/${id}`);
    return response.data;
  } catch (error) {
    console.error('Get admin blog error:', error);
    throw error;
  }
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

// Upload blog image
export const uploadBlogImage = async (formData: FormData) => {
  try {
    const token = getAdminToken();
    const response = await axios.post(`${API_URL}/upload/blog-image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      },
      timeout: 60000,
    });
    return response.data;
  } catch (error) {
    console.error('Upload image error:', error);
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