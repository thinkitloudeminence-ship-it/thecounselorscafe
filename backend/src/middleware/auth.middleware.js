const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin.model");

// ─── Protect Middleware ────────────────────────────────────
const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "Not authorized — no token" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const admin = await Admin.findById(decoded.id);
    if (!admin || !admin.isActive) {
      return res.status(401).json({ success: false, message: "Admin account not found or deactivated" });
    }

    req.admin = admin;
    req.userRole = admin.role;
    req.user = admin;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Token invalid or expired" });
  }
};

// ─── Role-based Authorization ─────────────────────────────
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.admin?.role)) {
      return res.status(403).json({
        success: false,
        message: `Role '${req.admin?.role}' is not authorized to access this route`
      });
    }
    next();
  };
};

// ─── Super Admin Only ──────────────────────────────────────
const requireSuperAdmin = (req, res, next) => {
  if (req.admin?.role !== "superadmin") {
    return res.status(403).json({ success: false, message: "Superadmin access required" });
  }
  next();
};

module.exports = { protect, authorize, requireSuperAdmin };