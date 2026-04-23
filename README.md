# Counselor's Cafe — Complete Full Stack Project

## 📁 Project Structure

```
counselors-cafe-complete/
├── frontend/          → Next.js website (your existing frontend, updated)
├── backend/           → Node.js + Express + MongoDB API
└── admin-dashboard/   → React CMS admin panel
```

---

## 🚀 Quick Start (Run All 3 Together)

### Step 1 — Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env — add your MongoDB URI (see below)
npm run seed        # Creates admin user + 3 sample blogs
npm run dev         # Starts on http://localhost:5000
```

### Step 2 — Admin Dashboard

```bash
cd admin-dashboard
npm install
npm start           # Starts on http://localhost:3001
```

### Step 3 — Frontend (your existing Next.js site)

```bash
cd frontend
npm install
# Add to .env.local:
echo "NEXT_PUBLIC_API_URL=http://localhost:5000/api" >> .env.local
npm run dev         # Starts on http://localhost:3000
```

---

## 🔐 Admin Login

After running `npm run seed` in backend:

| Field    | Value                         |
|----------|-------------------------------|
| URL      | http://localhost:3001         |
| Email    | admin@counselorscafe.com      |
| Password | Admin@123                     |

---

## 🗄️ MongoDB Setup

### Option A — MongoDB Atlas (Recommended for Production)
1. Go to https://cloud.mongodb.com
2. Create free cluster → Connect → Get connection string
3. Paste in `backend/.env`:
   ```
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/counselors-cafe
   ```

### Option B — Local MongoDB
```bash
# Install MongoDB locally, then:
MONGO_URI=mongodb://localhost:27017/counselors-cafe
```

---

## 🖼️ Image Upload (Cloudinary)

Without Cloudinary, images are saved locally to `backend/uploads/blogs/`.

To enable Cloudinary (recommended for production):
1. Create free account at https://cloudinary.com
2. Add to `backend/.env`:
   ```
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

---

## 📡 API Endpoints

### Public (Frontend uses these)
| Method | Endpoint                      | Description                    |
|--------|-------------------------------|--------------------------------|
| GET    | /api/blogs                    | All published blogs            |
| GET    | /api/blogs?category=X         | Filter by category             |
| GET    | /api/blogs?search=keyword     | Search blogs                   |
| GET    | /api/blogs/featured           | Featured blogs for homepage    |
| GET    | /api/blogs/:slug              | Single blog + related posts    |
| POST   | /api/blogs/:slug/like         | Like a blog                    |
| POST   | /api/contact                  | Submit contact form            |
| GET    | /api/health                   | API health check               |

### Admin (Requires JWT token)
| Method | Endpoint                          | Description              |
|--------|-----------------------------------|--------------------------|
| POST   | /api/auth/login                   | Admin login              |
| GET    | /api/auth/me                      | Get current admin        |
| GET    | /api/admin/stats                  | Dashboard stats          |
| GET    | /api/admin/blogs                  | All blogs (any status)   |
| POST   | /api/admin/blogs                  | Create blog              |
| PUT    | /api/admin/blogs/:id              | Update blog              |
| DELETE | /api/admin/blogs/:id              | Delete blog              |
| PATCH  | /api/admin/blogs/:id/status       | Publish/Draft/Archive    |
| PATCH  | /api/admin/blogs/:id/featured     | Toggle featured          |
| GET    | /api/admin/contacts               | All contact messages     |
| PATCH  | /api/admin/contacts/:id/status    | Update contact status    |
| GET    | /api/admin/users                  | Admin users (superadmin) |
| POST   | /api/admin/users                  | Create admin user        |
| POST   | /api/upload/blog-image            | Upload image             |

---

## 🎨 Admin Dashboard Features

| Feature              | Description                                           |
|----------------------|-------------------------------------------------------|
| 📊 Dashboard         | Stats — total blogs, views, drafts, new contacts      |
| ✍️ Blog Editor       | Rich text editor (TipTap) with full toolbar           |
| 🖼️ Featured Image   | Upload or paste URL for cover image                   |
| 🔖 Categories & Tags | Organize posts with category + comma-separated tags   |
| 📤 Publish Controls  | Draft / Publish / Archive with one click              |
| ⭐ Featured Posts    | Toggle featured for homepage display                  |
| 🔍 SEO Panel         | Meta title, description, keywords + live Google preview |
| 👤 Author Info       | Author name, bio, avatar per post                     |
| 📋 Blog List         | Search, filter by status/category, bulk status change |
| 📨 Contact Inbox     | Read messages, reply via email, add internal notes    |
| 👥 User Management   | Create/delete admin users (superadmin only)           |
| ⚙️ Settings          | Change password + API configuration guide             |

---

## 🌐 Blog Categories Available

- Career Guidance
- Exam Guidance
- Study Abroad
- Stream Selection
- Scholarship
- College Admissions
- Skills & Jobs
- Mental Health
- Other

---

## 🔄 How Blog Flow Works

```
Admin Dashboard (localhost:3001)
        ↓  Write & Publish blog
Backend API (localhost:5000)
        ↓  Stores in MongoDB
Frontend Website (localhost:3000)
        ↓  /blog page fetches from API
        ↓  /blog/[slug] shows full article
```

1. Admin writes blog in dashboard with rich text editor
2. Admin clicks "Publish" → saved to MongoDB with `status: published`
3. Frontend `/blog` page fetches from `/api/blogs` → shows cards
4. User clicks blog → `/blog/slug` → fetches full content from `/api/blogs/slug`
5. Views counter increments automatically on each visit

---

## 🚢 Production Deployment

### Backend → Railway / Render / VPS
```bash
# Set environment variables in hosting dashboard:
PORT=5000
MONGO_URI=mongodb+srv://...
JWT_SECRET=your_very_long_random_secret
NODE_ENV=production
CLIENT_URL=https://your-frontend-domain.com
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
```

### Frontend → Vercel
```bash
# In Vercel dashboard, add environment variable:
NEXT_PUBLIC_API_URL=https://your-backend-domain.com/api
```

### Admin Dashboard → Vercel / Netlify
```bash
# Set before build:
REACT_APP_API_URL=https://your-backend-domain.com/api
```

---

## 🛠️ Tech Stack

| Layer          | Technology                                    |
|----------------|-----------------------------------------------|
| Frontend       | Next.js 14, TypeScript, Tailwind CSS          |
| Admin Panel    | React 18, React Router, TipTap Editor         |
| Backend        | Node.js, Express.js                           |
| Database       | MongoDB + Mongoose                            |
| Authentication | JWT (jsonwebtoken)                            |
| Image Upload   | Cloudinary (or local multer fallback)         |
| Security       | Helmet, CORS, Rate Limiting, bcryptjs         |

---

## 📞 Support

Built for Counselor's Cafe — India's premier career guidance platform.
