const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth.middleware'); // ✅ 1 level up
const {
  getCounselors,
  getCounselorById,
  createCounselor,
  updateCounselor,
  deleteCounselor,
  toggleCounselorStatus,
  toggleFeatured,
} = require('../controllers/admin.counselors.controller');

// All routes require admin authentication
router.use(protect);
router.use(authorize('superadmin', 'admin')); // ✅ superadmin ya admin

// GET all counselors
router.get('/', getCounselors);

// GET single counselor
router.get('/:id', getCounselorById);

// POST create counselor
router.post('/', createCounselor);

// PUT update counselor
router.put('/:id', updateCounselor);

// DELETE counselor
router.delete('/:id', deleteCounselor);

// PATCH toggle status
router.patch('/:id/toggle-status', toggleCounselorStatus);

// PATCH toggle featured
router.patch('/:id/toggle-featured', toggleFeatured);

module.exports = router;