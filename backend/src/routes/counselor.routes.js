const express = require("express");
const router = express.Router();
const Counselor = require("../models/Counselor"); // You need to create this model

// Get all counselors
router.get("/", async (req, res) => {
  try {
    const counselors = await Counselor.find({ isActive: true }).sort({ rating: -1 });
    res.json({ success: true, data: counselors });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get single counselor by ID
router.get("/:id", async (req, res) => {
  try {
    const counselor = await Counselor.findById(req.params.id);
    if (!counselor) {
      return res.status(404).json({ success: false, message: "Counselor not found" });
    }
    res.json({ success: true, data: counselor });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;