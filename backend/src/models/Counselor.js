const mongoose = require("mongoose");

const counselorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: String,
  expertise: [String],
  experience: Number,
  rating: Number,
  reviews: Number,
  languages: [String],
  image: String,
  available: { type: Boolean, default: true },
  sessionsCompleted: Number,
  email: String,
  location: String,
  education: String,
  bio: String,
  achievements: [String],
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model("Counselor", counselorSchema);