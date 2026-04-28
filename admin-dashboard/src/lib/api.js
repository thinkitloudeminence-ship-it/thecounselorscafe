import axios from "axios";

const getBaseURL = () => {
  // Production - use relative URL
  if (typeof window !== 'undefined' && window.location.hostname !== 'localhost') {
    return '/api';
  }
  // Local development
  return 'http://localhost:5000/api';
};

export const api = axios.create({
  baseURL: getBaseURL(),
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});

console.log("🔗 API Base URL:", getBaseURL());

// Attach JWT token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("cc_admin_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401
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