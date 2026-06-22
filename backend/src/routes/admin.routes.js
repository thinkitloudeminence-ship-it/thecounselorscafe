const express = require("express");
const Blog = require("../models/Blog.model");
const Contact = require("../models/Contact.model");
const Admin = require("../models/Admin.model");
const { protect, requireSuperAdmin } = require("../middleware/auth.middleware");

const router = express.Router();

router.use(protect);

// ─── DASHBOARD STATS ─────────────────────────────────────────────────────────
router.get("/stats", async (req, res) => {
  try {
    const [
      totalBlogs,
      publishedBlogs,
      draftBlogs,
      totalContacts,
      newContacts,
      totalViews,
      recentBlogs,
    ] = await Promise.all([
      Blog.countDocuments(),
      Blog.countDocuments({ status: "published" }),
      Blog.countDocuments({ status: "draft" }),
      Contact.countDocuments(),
      Contact.countDocuments({ status: "new" }),
      Blog.aggregate([{ $group: { _id: null, total: { $sum: "$views" } } }]),
      Blog.find()
        .select("title slug status views publishedAt createdAt")
        .sort({ createdAt: -1 })
        .limit(5),
    ]);

    res.json({
      success: true,
      data: {
        blogs: { total: totalBlogs, published: publishedBlogs, draft: draftBlogs },
        contacts: { total: totalContacts, new: newContacts },
        totalViews: totalViews[0]?.total || 0,
        recentBlogs,
      },
    });
  } catch (error) {
    console.error("Stats error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ─── BLOG MANAGEMENT ─────────────────────────────────────────────────────────

// GET /api/admin/blogs
router.get("/blogs", async (req, res) => {
  try {
    const { status, category, search, page = 1, limit = 20 } = req.query;
    const query = {};

    if (status && status !== "all") query.status = status;
    if (category && category !== "All") query.category = category;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { "author.name": { $regex: search, $options: "i" } },
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);
    const total = await Blog.countDocuments(query);

    // ✅ No populate — avoids CmsAdmin ref mismatch
    const blogs = await Blog.find(query)
      .select("-__v")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    res.json({
      success: true,
      data: blogs,
      pagination: {
        page: Number(page),
        total,
        pages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error) {
    console.error("Get blogs error:", error);
    res.status(500).json({ success: false, message: error.message || "Server error" });
  }
});

// GET /api/admin/blogs/:id
router.get("/blogs/:id", async (req, res) => {
  try {
    // ✅ No populate
    const blog = await Blog.findById(req.params.id).select("-__v");
    if (!blog) return res.status(404).json({ success: false, message: "Blog not found" });
    res.json({ success: true, data: blog });
  } catch (error) {
    console.error("Get blog error:", error);
    res.status(500).json({ success: false, message: error.message || "Server error" });
  }
});

// POST /api/admin/blogs
router.post("/blogs", async (req, res) => {
  try {
    const {
      title, excerpt, content, category, tags, author,
      image, seo, status, isFeatured,
    } = req.body;

    if (!title || !excerpt || !content || !category || !author?.name) {
      return res.status(400).json({
        success: false,
        message: "title, excerpt, content, category, and author.name are required",
      });
    }

    const blog = await Blog.create({
      title,
      excerpt,
      content,
      category,
      tags: tags || [],
      author: author || { name: req.admin.name },
      image: image || {},
      seo: seo || {},
      status: status || "draft",
      isFeatured: isFeatured || false,
      createdBy: req.admin._id,
    });

    res.status(201).json({ success: true, message: "Blog created successfully", data: blog });
  } catch (error) {
    console.error("Create blog error:", error);
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: "A blog with this title already exists" });
    }
    res.status(500).json({ success: false, message: error.message || "Server error" });
  }
});

// PUT /api/admin/blogs/:id
router.put("/blogs/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ success: false, message: "Blog not found" });

    const updatableFields = [
      "title", "excerpt", "content", "category", "tags",
      "author", "image", "seo", "status", "isFeatured",
    ];

    updatableFields.forEach((field) => {
      if (req.body[field] !== undefined) blog[field] = req.body[field];
    });

    blog.updatedBy = req.admin._id;
    await blog.save();

    res.json({ success: true, message: "Blog updated successfully", data: blog });
  } catch (error) {
    console.error("Update blog error:", error);
    res.status(500).json({ success: false, message: error.message || "Server error" });
  }
});

// PATCH /api/admin/blogs/:id/status
router.patch("/blogs/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    if (!["draft", "published", "archived"].includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status" });
    }

    const update = {
      status,
      updatedBy: req.admin._id,
    };
    if (status === "published") {
      update.publishedAt = new Date();
    }

    const blog = await Blog.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!blog) return res.status(404).json({ success: false, message: "Blog not found" });

    res.json({ success: true, message: `Blog ${status}`, data: blog });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// PATCH /api/admin/blogs/:id/featured
router.patch("/blogs/:id/featured", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ success: false, message: "Blog not found" });
    blog.isFeatured = !blog.isFeatured;
    await blog.save();
    res.json({
      success: true,
      message: `Blog ${blog.isFeatured ? "featured" : "unfeatured"}`,
      data: blog,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// DELETE /api/admin/blogs/:id
router.delete("/blogs/:id", async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ success: false, message: "Blog not found" });
    res.json({ success: true, message: "Blog deleted permanently" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ─── CONTACT MANAGEMENT ──────────────────────────────────────────────────────

router.get("/contacts", async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const query = status && status !== "all" ? { status } : {};

    const total = await Contact.countDocuments(query);
    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    res.json({
      success: true,
      data: contacts,
      pagination: { total, page: Number(page) },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.patch("/contacts/:id/status", async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status, adminNote: req.body.adminNote || "" },
      { new: true }
    );
    res.json({ success: true, data: contact });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ─── ADMIN USER MANAGEMENT ───────────────────────────────────────────────────

router.get("/users", requireSuperAdmin, async (req, res) => {
  try {
    const users = await Admin.find().sort({ createdAt: -1 });
    res.json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.post("/users", requireSuperAdmin, async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const exists = await Admin.findOne({ email });
    if (exists) {
      return res.status(400).json({ success: false, message: "Email already registered" });
    }
    const admin = await Admin.create({ name, email, password, role: role || "editor" });
    res.status(201).json({ success: true, message: "Admin created", data: admin });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.delete("/users/:id", requireSuperAdmin, async (req, res) => {
  try {
    if (req.params.id === req.admin._id.toString()) {
      return res.status(400).json({
        success: false,
        message: "Cannot delete your own account",
      });
    }
    await Admin.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Admin deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;