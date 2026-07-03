const Counselor = require('../models/Counselor');
const { sendSuccess, sendError, sendPaginated, getPagination } = require('../utils/response');

// ─── Get All Counselors ──────────────────────────────────────────────────────

const getCounselors = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, search, isActive } = req.query;
    const filter = {};
    
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { title: { $regex: search, $options: 'i' } },
        { expertise: { $regex: search, $options: 'i' } },
      ];
    }
    
    if (isActive !== undefined) {
      filter.isActive = isActive === 'true';
    }

    const total = await Counselor.countDocuments(filter);
    const { pagination, skip } = getPagination(page, limit, total);

    const counselors = await Counselor.find(filter)
      .sort({ order: 1, createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    return sendPaginated(res, 'Counselors fetched', counselors, pagination);
  } catch (err) {
    next(err);
  }
};

// ─── Get Single Counselor ────────────────────────────────────────────────────

const getCounselorById = async (req, res, next) => {
  try {
    const counselor = await Counselor.findById(req.params.id);
    if (!counselor) {
      return sendError(res, 'Counselor not found', 404);
    }
    return sendSuccess(res, 'Counselor fetched', counselor);
  } catch (err) {
    next(err);
  }
};

// ─── Create Counselor ────────────────────────────────────────────────────────

const createCounselor = async (req, res, next) => {
  try {
    const { 
      name, title, expertise, experience, rating, reviews, image,
      available, sessionsCompleted, location, email, phone, bio,
      languages, pricePerSession, isActive, isFeatured, order
    } = req.body;

    if (!name || !title) {
      return sendError(res, 'Name and title are required', 400);
    }

    const counselor = await Counselor.create({
      name,
      title,
      expertise: expertise || [],
      experience: experience || 0,
      rating: rating || 0,
      reviews: reviews || 0,
      image: image || '',
      available: available !== undefined ? available : true,
      sessionsCompleted: sessionsCompleted || 0,
      location: location || '',
      email: email || '',
      phone: phone || '',
      bio: bio || '',
      languages: languages || ['English'],
      pricePerSession: pricePerSession || 499,
      isActive: isActive !== undefined ? isActive : true,
      isFeatured: isFeatured || false,
      order: order || 0,
    });

    return sendSuccess(res, 'Counselor created successfully', counselor, 201);
  } catch (err) {
    next(err);
  }
};

// ─── Update Counselor ────────────────────────────────────────────────────────

const updateCounselor = async (req, res, next) => {
  try {
    const allowedFields = [
      'name', 'title', 'expertise', 'experience', 'rating', 'reviews',
      'image', 'available', 'sessionsCompleted', 'location', 'email',
      'phone', 'bio', 'languages', 'pricePerSession', 'isActive',
      'isFeatured', 'order'
    ];
    
    const updates = {};
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    const counselor = await Counselor.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );

    if (!counselor) {
      return sendError(res, 'Counselor not found', 404);
    }

    return sendSuccess(res, 'Counselor updated successfully', counselor);
  } catch (err) {
    next(err);
  }
};

// ─── Delete Counselor ────────────────────────────────────────────────────────

const deleteCounselor = async (req, res, next) => {
  try {
    const counselor = await Counselor.findByIdAndDelete(req.params.id);
    if (!counselor) {
      return sendError(res, 'Counselor not found', 404);
    }
    return sendSuccess(res, 'Counselor deleted successfully');
  } catch (err) {
    next(err);
  }
};

// ─── Toggle Counselor Active Status ─────────────────────────────────────────

const toggleCounselorStatus = async (req, res, next) => {
  try {
    const counselor = await Counselor.findById(req.params.id);
    if (!counselor) {
      return sendError(res, 'Counselor not found', 404);
    }
    
    counselor.isActive = !counselor.isActive;
    await counselor.save();
    
    return sendSuccess(res, `Counselor ${counselor.isActive ? 'activated' : 'deactivated'}`, counselor);
  } catch (err) {
    next(err);
  }
};

// ─── Toggle Featured ─────────────────────────────────────────────────────────

const toggleFeatured = async (req, res, next) => {
  try {
    const counselor = await Counselor.findById(req.params.id);
    if (!counselor) {
      return sendError(res, 'Counselor not found', 404);
    }
    
    counselor.isFeatured = !counselor.isFeatured;
    await counselor.save();
    
    return sendSuccess(res, `Counselor ${counselor.isFeatured ? 'featured' : 'unfeatured'}`, counselor);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getCounselors,
  getCounselorById,
  createCounselor,
  updateCounselor,
  deleteCounselor,
  toggleCounselorStatus,
  toggleFeatured,
};