import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider, useAuth } from "./context/AuthContext";
import "./index.css";

// Pages
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import BlogsListPage from "./pages/BlogsListPage";
import BlogEditorPage from "./pages/BlogEditorPage";
import ContactsPage from "./pages/ContactsPage";
import UsersPage from "./pages/UsersPage";
import SettingsPage from "./pages/SettingsPage";

// Layout
import AdminLayout from "./components/layout/AdminLayout";

function ProtectedRoute({ children }) {
  const { admin, loading } = useAuth();
  if (loading) return <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", color: "#f5c518" }}>Loading...</div>;
  return admin ? children : <Navigate to="/login" replace />;
}

function PublicRoute({ children }) {
  const { admin, loading } = useAuth();
  if (loading) return null;
  return !admin ? children : <Navigate to="/" replace />;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster
          position="top-right"
          toastOptions={{
            style: { background: "#1a1a1a", color: "#f0f0f0", border: "1px solid #2a2a2a" },
            success: { iconTheme: { primary: "#f5c518", secondary: "#0a0a0a" } },
          }}
        />
        <Routes>
          <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
          <Route
            path="/"
            element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}
          >
            <Route index element={<DashboardPage />} />
            <Route path="blogs" element={<BlogsListPage />} />
            <Route path="blogs/new" element={<BlogEditorPage />} />
            <Route path="blogs/edit/:id" element={<BlogEditorPage />} />
            <Route path="contacts" element={<ContactsPage />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
