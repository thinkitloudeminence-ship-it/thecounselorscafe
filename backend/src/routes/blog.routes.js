const express = require("express");
const Blog = require("../models/Blog.model");

const router = express.Router();

// GET /api/blogs — all published blogs (with search, filter, pagination)
router.get("/", async (req, res) => {
  try {
    const { category, tag, search, page = 1, limit = 12, featured } = req.query;

    const query = { status: "published" };

    if (category && category !== "All") query.category = category;
    if (tag) query.tags = { $in: [tag] };
    if (featured === "true") query.isFeatured = true;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { excerpt: { $regex: search, $options: "i" } },
        { tags: { $in: [new RegExp(search, "i")] } },
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);
    const total = await Blog.countDocuments(query);

    const blogs = await Blog.find(query)
      .select("title slug excerpt category tags author image readTime views likes publishedAt createdAt isFeatured")
      .sort({ publishedAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    res.json({
      success: true,
      data: blogs,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error) {
    console.error("Fetch blogs error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// GET /api/blogs/categories — get all category counts
router.get("/categories", async (req, res) => {
  try {
    const categories = await Blog.aggregate([
      { $match: { status: "published" } },
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);
    res.json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// GET /api/blogs/featured — featured blogs for homepage
router.get("/featured", async (req, res) => {
  try {
    const blogs = await Blog.find({ status: "published", isFeatured: true })
      .select("title slug excerpt category author image readTime publishedAt")
      .sort({ publishedAt: -1 })
      .limit(6);
    res.json({ success: true, data: blogs });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// GET /api/blogs/:slug — single blog by slug (increments views)
router.get("/:slug", async (req, res) => {
  try {
    const blog = await Blog.findOneAndUpdate(
      { slug: req.params.slug, status: "published" },
      { $inc: { views: 1 } },
      { new: true }
    );

    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }

    // Related blogs — same category
    const related = await Blog.find({
      status: "published",
      category: blog.category,
      _id: { $ne: blog._id },
    })
      .select("title slug excerpt image readTime publishedAt")
      .limit(3);

    res.json({ success: true, data: blog, related });
  } catch (error) {
    console.error("Fetch blog error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// POST /api/blogs/:slug/like
router.post("/:slug/like", async (req, res) => {
  try {
    await Blog.findOneAndUpdate({ slug: req.params.slug }, { $inc: { likes: 1 } });
    res.json({ success: true, message: "Liked!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
