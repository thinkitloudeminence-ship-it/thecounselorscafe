require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const compression = require("compression"); // ✅ NEW: gzip/brotli response compression
const rateLimit = require("express-rate-limit");
const path = require("path");

const connectDB = require("./utils/db");

// ── Routes ──────────────────────────────────────────────
const authRoutes = require("./routes/auth.routes");
const blogRoutes = require("./routes/blog.routes");
const adminRoutes = require("./routes/admin.routes");
const contactRoutes = require("./routes/contact.routes");
const uploadRoutes = require("./routes/upload.routes");
const counselorRoutes = require("./routes/counselor.routes");
const adminCounselorRoutes = require("./routes/admin.counselors.routes");

const app = express();
const PORT = process.env.PORT || 5000;

// ── Connect DB ──────────────────────────────────────────
connectDB();

// ✅ FIX: "trust proxy" — Render/Vercel jaise hosting providers reverse-proxy
// ke peeche chalate hain, jo X-Forwarded-For header set karta hai.
// Isse express-rate-limit ka warning/error khatam ho jaata hai aur
// rate-limiter user ka sahi IP identify kar paata hai.
app.set("trust proxy", 1);

// ── Security Middleware ─────────────────────────────────
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));

// ✅ NEW: Compression — response ko gzip karke bhejta hai, payload size
// 60-80% tak chhota ho jaata hai, isse network transfer fast hota hai.
app.use(compression());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: "Too many requests, please try again later.",
});
app.use("/api/", limiter);

// ── Core Middleware ─────────────────────────────────────
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "https://www.counselorscafe.com",
      "https://thecounselorscafe-uzdc.vercel.app",
      /\.vercel\.app$/,
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(morgan(process.env.NODE_ENV === "development" ? "dev" : "combined"));

// ── Static files ───────────────────────────────────────
app.use(
  "/uploads",
  express.static(path.join(__dirname, "../uploads"), {
    // ✅ Uploaded images (counselor photos) ko browser cache mein 1 din rakho
    maxAge: "1d",
    immutable: false,
  })
);

// ── API Routes ─────────────────────────────────────────
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/admin/counselors", adminCounselorRoutes); // ✅ NEW
app.use("/api/contact", contactRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/counselors", counselorRoutes);

// ── Health Check ───────────────────────────────────────
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Counselor's Cafe API is running",
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV,
  });
});

// ── 404 Handler ───────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// ── Error Handler ─────────────────────────────────────
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

app.listen(PORT, () => {
  console.log(`\n🚀 Counselor's Cafe Backend running on http://localhost:${PORT}`);
  console.log(`📁 Environment: ${process.env.NODE_ENV}`);
  console.log(`📊 Admin API: http://localhost:${PORT}/api/admin`);
  console.log(`📝 Blog API: http://localhost:${PORT}/api/blogs\n`);
});

module.exports = app;