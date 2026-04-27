import axios from "axios";

/**
 * Get Base URL - Works for both local and production
 * Supports:
 * 1. REACT_APP_API_URL=http://localhost:5000/api (with /api)
 * 2. REACT_APP_API_URL=http://localhost:5000 (without /api)
 * 3. REACT_APP_API_URL=https://thecounselorscafe.onrender.com/api (with /api)
 * 4. REACT_APP_API_URL=https://thecounselorscafe.onrender.com (without /api)
 * 5. No env variable -> defaults to localhost:5000/api
 */
const getBaseURL = () => {
  const envUrl = process.env.REACT_APP_API_URL;
  
  // Default for local development
  if (!envUrl) {
    return "http://localhost:5000/api";
  }
  
  // Remove trailing slash if present
  let cleanUrl = envUrl.replace(/\/$/, "");
  
  // If URL already ends with /api, use as is
  if (cleanUrl.endsWith("/api")) {
    return cleanUrl;
  }
  
  // Add /api at the end
  return `${cleanUrl}/api`;
};

export const api = axios.create({
  baseURL: getBaseURL(),
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});

// Debug log - shows which API URL is being used (remove in production if needed)
console.log("🔗 API Base URL:", getBaseURL());

// Attach JWT token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("cc_admin_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 globally - redirect to login
api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("cc_admin_token");
      localStorage.removeItem("cc_admin_user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// ==================== AUTH API ====================
export const adminLogin = (email, password) =>
  api.post("/auth/login", { email, password });

export const getMe = () => api.get("/auth/me");

export const changePassword = (data) =>
  api.post("/auth/change-password", data);

// ==================== DASHBOARD API ====================
export const getDashboardStats = () => api.get("/admin/stats");

// ==================== BLOGS API ====================
export const getAdminBlogs = (params) =>
  api.get("/admin/blogs", { params });

export const getAdminBlog = (id) => api.get(`/admin/blogs/${id}`);

export const createBlog = (data) => api.post("/admin/blogs", data);

export const updateBlog = (id, data) => api.put(`/admin/blogs/${id}`, data);

export const deleteBlog = (id) => api.delete(`/admin/blogs/${id}`);

export const updateBlogStatus = (id, status) =>
  api.patch(`/admin/blogs/${id}/status`, { status });

export const toggleBlogFeatured = (id) =>
  api.patch(`/admin/blogs/${id}/featured`);

// ==================== CONTACTS API ====================
export const getContacts = (params) =>
  api.get("/admin/contacts", { params });

export const updateContactStatus = (id, status, adminNote) =>
  api.patch(`/admin/contacts/${id}/status`, { status, adminNote });

// ==================== USERS API ====================
export const getAdminUsers = () => api.get("/admin/users");

export const createAdminUser = (data) => api.post("/admin/users", data);

export const deleteAdminUser = (id) => api.delete(`/admin/users/${id}`);

// ==================== UPLOAD API ====================
export const uploadBlogImage = (formData) =>
  api.post("/upload/blog-image", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });