const express = require("express");
const router = express.Router();
const Counselor = require("../models/Counselor");

// GET all counselors
router.get("/", async (req, res) => {
  try {
    const counselors = await Counselor.find({ isActive: true }).sort({ rating: -1 });
    res.json({ success: true, data: counselors });
  } catch (error) {
    console.error("Error fetching counselors:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// ✅ GET single counselor by ID or SLUG - UPDATED
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let counselor;
    
    // Check if it's a valid MongoDB ObjectId (24 hex chars)
    const isValidObjectId = /^[0-9a-fA-F]{24}$/.test(id);
    
    if (isValidObjectId) {
      // Try to find by _id
      counselor = await Counselor.findById(id);
    } else {
      // Try to find by slug
      counselor = await Counselor.findOne({ slug: id });
    }
    
    // If still not found, try fallback: search by name (for backward compatibility)
    if (!counselor) {
      counselor = await Counselor.findOne({ 
        name: { $regex: new RegExp(id.replace(/-/g, ' '), 'i') } 
      });
    }
    
    if (!counselor) {
      return res.status(404).json({ success: false, message: "Counselor not found" });
    }
    
    res.json({ success: true, data: counselor });
  } catch (error) {
    console.error("Error fetching counselor:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;