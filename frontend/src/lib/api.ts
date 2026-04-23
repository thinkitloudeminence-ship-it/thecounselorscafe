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
