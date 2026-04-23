const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { protect } = require("../middleware/auth.middleware");

const router = express.Router();

// ── Multer local storage (fallback when Cloudinary not configured) ──
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, "../../uploads/blogs");
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `blog-${unique}${path.extname(file.originalname)}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];
  if (allowed.includes(file.mimetype)) cb(null, true);
  else cb(new Error("Only image files are allowed (jpg, png, webp, gif)"), false);
};

const upload = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } }); // 5MB

// POST /api/upload/blog-image
router.post("/blog-image", protect, upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No image provided" });
    }

    // Try Cloudinary if configured
    if (
      process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET
    ) {
      try {
        const cloudinary = require("cloudinary").v2;
        cloudinary.config({
          cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
          api_key: process.env.CLOUDINARY_API_KEY,
          api_secret: process.env.CLOUDINARY_API_SECRET,
        });

        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: "counselors-cafe/blogs",
          transformation: [{ width: 1200, height: 630, crop: "fill", quality: "auto" }],
        });

        // Delete local temp file
        fs.unlinkSync(req.file.path);

        return res.json({
          success: true,
          data: { url: result.secure_url, publicId: result.public_id },
        });
      } catch (cloudErr) {
        console.error("Cloudinary upload failed:", cloudErr.message);
        // Fall through to local storage response
      }
    }

    // Local storage fallback
    const fileUrl = `${req.protocol}://${req.get("host")}/uploads/blogs/${req.file.filename}`;
    res.json({
      success: true,
      data: { url: fileUrl, publicId: req.file.filename },
      note: "Stored locally — configure Cloudinary for production",
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ success: false, message: error.message || "Upload failed" });
  }
});

module.exports = router;
