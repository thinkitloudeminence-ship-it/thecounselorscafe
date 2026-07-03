const mongoose = require('mongoose');

const counselorSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  title: { type: String, required: true, trim: true },
  expertise: { type: [String], required: true, default: [] },
  experience: { type: Number, default: 0 },
  rating: { type: Number, default: 0, min: 0, max: 5 },
  reviews: { type: Number, default: 0 },
  image: { type: String, default: '' },
  available: { type: Boolean, default: true },
  sessionsCompleted: { type: Number, default: 0 },
  location: { type: String, default: '' },
  email: { type: String, trim: true, lowercase: true },
  phone: { type: String, trim: true },
  bio: { type: String, default: '' },
  languages: { type: [String], default: ['English'] },
  pricePerSession: { type: Number, default: 499 },
  isActive: { type: Boolean, default: true },
  isFeatured: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Counselor', counselorSchema);