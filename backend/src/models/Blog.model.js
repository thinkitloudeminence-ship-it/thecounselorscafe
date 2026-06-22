const mongoose = require("mongoose");
const slugify = require("slugify");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Blog title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      // NO index:true here — unique:true already creates the index
    },
    excerpt: {
      type: String,
      required: [true, "Excerpt is required"],
      maxlength: [500, "Excerpt cannot exceed 500 characters"],
    },
    content: {
      type: String,
      required: [true, "Blog content is required"],
    },
    image: {
      url: { type: String, default: "" },
      publicId: { type: String, default: "" },
      alt: { type: String, default: "" },
    },
    author: {
      name: { type: String, required: true },
      bio: { type: String, default: "" },
      avatar: { type: String, default: "" },
    },
    category: {
      type: String,
      required: true,
      enum: [
        "Career Guidance", "Exam Guidance", "Study Abroad",
        "Stream Selection", "Scholarship", "College Admissions",
        "Skills & Jobs", "Mental Health", "Other",
      ],
      default: "Career Guidance",
    },
    tags: [{ type: String, trim: true }],
    seo: {
      metaTitle: { type: String, default: "" },
      metaDescription: { type: String, default: "" },
      keywords: [{ type: String }],
    },
    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "draft",
    },
    publishedAt: { type: Date, default: null },
    readTime: { type: Number, default: 5 },
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// Auto-generate slug from title
blogSchema.pre("save", async function (next) {
  if (this.isModified("title") || this.isNew) {
    let baseSlug = slugify(this.title, { lower: true, strict: true });
    let slug = baseSlug;
    let count = 1;
    while (await mongoose.models.Blog.findOne({ slug, _id: { $ne: this._id } })) {
      slug = `${baseSlug}-${count++}`;
    }
    this.slug = slug;
  }
  if (this.isModified("content")) {
    const wordCount = this.content.replace(/<[^>]*>/g, "").split(/\s+/).length;
    this.readTime = Math.max(1, Math.ceil(wordCount / 200));
  }
  if (this.isModified("status") && this.status === "published" && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  next();
});

// Only declare extra indexes that unique:true doesn't already create
blogSchema.index({ status: 1, publishedAt: -1 });
blogSchema.index({ category: 1 });
blogSchema.index({ tags: 1 });
blogSchema.index({ title: "text", excerpt: "text", content: "text" });

module.exports = mongoose.model("Blog", blogSchema);
