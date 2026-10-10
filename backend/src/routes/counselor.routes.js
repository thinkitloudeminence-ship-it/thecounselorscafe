// const express = require("express");
// const router = express.Router();
// const Counselor = require("../models/Counselor");

// // Fields jo hero section card mein actually dikhti hain — bio/email/phone
// // jaisi heavy fields yahan skip, wo sirf single counselor page pe milengi.
// const LIST_FIELDS =
//   "name title slug expertise experience rating reviews image available " +
//   "pricePerSession pricePerMinute pricePerChat isActive order createdAt";

// // GET all counselors
// router.get("/", async (req, res) => {
//   try {
//     const counselors = await Counselor.find({ isActive: true })
//       .select(LIST_FIELDS)
//       .sort({ rating: -1 })
//       .limit(12)
//       .lean();

//     res.set("Cache-Control", "public, max-age=60, stale-while-revalidate=300");
//     res.json({ success: true, data: counselors });
//   } catch (error) {
//     console.error("Error fetching counselors:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// });

// // ✅ GET single counselor by ID or SLUG - UPDATED
// router.get("/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     let counselor;
    
//     // Check if it's a valid MongoDB ObjectId (24 hex chars)
//     const isValidObjectId = /^[0-9a-fA-F]{24}$/.test(id);
    
//     if (isValidObjectId) {
//       // Try to find by _id
//       counselor = await Counselor.findById(id);
//     } else {
//       // Try to find by slug
//       counselor = await Counselor.findOne({ slug: id });
//     }
    
//     // If still not found, try fallback: search by name (for backward compatibility)
//     if (!counselor) {
//       counselor = await Counselor.findOne({ 
//         name: { $regex: new RegExp(id.replace(/-/g, ' '), 'i') } 
//       });
//     }
    
//     if (!counselor) {
//       return res.status(404).json({ success: false, message: "Counselor not found" });
//     }
    
//     res.json({ success: true, data: counselor });
//   } catch (error) {
//     console.error("Error fetching counselor:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// });

// module.exports = router;



const express = require("express");
const router = express.Router();
const Counselor = require("../models/Counselor");

const LIST_FIELDS =
  "name title slug expertise experience rating reviews image available " +
  "pricePerSession pricePerMinute pricePerChat isActive order createdAt";

// GET all counselors
router.get("/", async (req, res) => {
  try {
    // ✅ CHANGE 1: Sort by order, then rating for a more predictable list
    const counselors = await Counselor.find({ isActive: true })
      .select(LIST_FIELDS)
      .sort({ order: 1, rating: -1 })
      .limit(12)
      .lean();

    // ✅ CHANGE 2: Set cache headers that allow for fresh data
    // "no-store" ensures the browser/Next.js never caches this response.
    // You can use "private, max-age=0, must-revalidate" if you want conditional caching.
    res.set("Cache-Control", "no-store, max-age=0");
    
    // Optional: Add a header to help debug caching
    res.set("X-Cache-Status", "MISS");

    res.json({ success: true, data: counselors });
  } catch (error) {
    console.error("Error fetching counselors:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET single counselor by ID or SLUG
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let counselor;
    
    const isValidObjectId = /^[0-9a-fA-F]{24}$/.test(id);
    
    if (isValidObjectId) {
      counselor = await Counselor.findById(id);
    } else {
      counselor = await Counselor.findOne({ slug: id });
    }
    
    if (!counselor) {
      counselor = await Counselor.findOne({ 
        name: { $regex: new RegExp(id.replace(/-/g, ' '), 'i') } 
      });
    }
    
    if (!counselor) {
      return res.status(404).json({ success: false, message: "Counselor not found" });
    }
    
    // ✅ Also prevent caching for single counselor fetch
    res.set("Cache-Control", "no-store, max-age=0");
    res.json({ success: true, data: counselor });
  } catch (error) {
    console.error("Error fetching counselor:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
