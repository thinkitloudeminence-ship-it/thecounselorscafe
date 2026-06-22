require("dotenv").config();
const mongoose = require("mongoose");
const Admin = require("../models/Admin.model");
const Blog = require("../models/Blog.model");

const sampleBlogs = [
  {
    title: "CUET 2026: Complete Guide for Class 12 Students",
    excerpt: "Everything you need to know about CUET 2026 — exam pattern, registration dates, top universities, and preparation strategy.",
    content: `<h2>What is CUET?</h2>
<p>The Common University Entrance Test (CUET) is a national-level entrance examination conducted by the National Testing Agency (NTA) for admission to undergraduate programs in central universities across India.</p>

<h2>Key Dates for CUET 2026</h2>
<ul>
<li><strong>Application Start:</strong> February 2026</li>
<li><strong>Application Deadline:</strong> March 2026</li>
<li><strong>Exam Date:</strong> May 2026</li>
<li><strong>Result:</strong> June 2026</li>
</ul>

<h2>Exam Pattern</h2>
<p>CUET consists of three sections:</p>
<ol>
<li><strong>Section IA &amp; IB:</strong> Languages (13 languages available)</li>
<li><strong>Section II:</strong> Domain subjects (27 subjects)</li>
<li><strong>Section III:</strong> General Test</li>
</ol>

<h2>Preparation Strategy</h2>
<p>Start with NCERT textbooks for Class 11 and 12. Practice previous year papers and take mock tests regularly. Focus on time management as CUET is highly time-pressured.</p>

<h2>Top Universities Accepting CUET</h2>
<p>Delhi University, JNU, BHU, AMU, Hyderabad University, and over 250+ universities now accept CUET scores for admission.</p>

<blockquote><p>Pro Tip: Students who appeared in CUET report that Section III (General Test) is the most scoring. Focus heavily on Reasoning, Quantitative Aptitude, and Current Affairs.</p></blockquote>`,
    category: "Exam Guidance",
    tags: ["CUET", "DU", "Class 12", "Entrance Exam"],
    author: { name: "Dr. Priya Sharma", bio: "Career counsellor with 10+ years of experience", avatar: "" },
    image: { url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=450&fit=crop", alt: "Students studying" },
    status: "published",
    isFeatured: true,
    seo: {
      metaTitle: "CUET 2026 Complete Guide — Dates, Pattern & Strategy",
      metaDescription: "Complete guide to CUET 2026 for Class 12 students. Exam dates, pattern, top universities, and expert preparation tips.",
    },
  },
  {
    title: "Top 10 Career Options After Class 10 (Beyond Engineering & Medicine)",
    excerpt: "Explore 10 exciting, high-paying career paths that most students and parents don't know about.",
    content: `<h2>Introduction</h2>
<p>The pressure on Class 10 students to choose between Science or Commerce is immense. But in 2026, there are dozens of high-paying, fulfilling careers across all streams.</p>

<h2>1. Data Science &amp; AI</h2>
<p>One of the fastest-growing fields globally. You can pursue B.Sc in Data Science, and companies like Google and Amazon pay ₹12–40 LPA for skilled data scientists.</p>

<h2>2. UX/UI Design</h2>
<p>Design is no longer just art — it's a core business function. After Class 12 (any stream), you can pursue BDes at NID, NIFT, or private design schools.</p>

<h2>3. Law (LLB/BA LLB)</h2>
<p>Legal profession offers stability, prestige, and high earnings. CLAT exam gives access to National Law Universities.</p>

<h2>4. Psychology &amp; Counseling</h2>
<p>Mental health awareness is booming. A career in psychology is in huge demand across schools, hospitals, and corporates.</p>

<h2>5. Architecture</h2>
<p>If you love design + math, architecture combines both. NATA exam for admission. Starting salary ₹4–8 LPA, growing to ₹25+ LPA.</p>

<h2>6. Mass Communication &amp; Journalism</h2>
<p>Digital media is exploding. Content creation, journalism, and PR offer great careers with creativity and impact.</p>

<h2>7. Chartered Accountancy (CA)</h2>
<p>CA is one of India's most respected professional qualifications. Commerce stream recommended but not mandatory.</p>

<h2>8. Hotel Management</h2>
<p>Hospitality industry is a global career. NCHMCT JEE gives access to top hotel management colleges.</p>

<h2>9. Fashion Technology</h2>
<p>India's fashion industry is worth ₹1.5 lakh crore and growing. NIFT, NIDA offer world-class education.</p>

<h2>10. Aviation &amp; Pilot Training</h2>
<p>Commercial pilot training requires Math + Physics in Class 12 but offers salaries of ₹15–80 LPA.</p>

<p><strong>Key message:</strong> Choose based on your strengths and interests, not just what everyone else is doing.</p>`,
    category: "Career Guidance",
    tags: ["Career", "Stream Selection", "Class 10", "Future Careers"],
    author: { name: "Meera Pillai", bio: "Certified Career Counsellor & Educational Psychologist", avatar: "" },
    image: { url: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=450&fit=crop", alt: "Career options" },
    status: "published",
    isFeatured: true,
    seo: {
      metaTitle: "Top 10 Career Options After Class 10 in India 2026",
      metaDescription: "Beyond engineering and medicine — discover 10 high-paying career paths for Class 10 students in India.",
    },
  },
  {
    title: "Study in Canada 2025: Complete Roadmap for Indian Students",
    excerpt: "Step-by-step guide to studying in Canada — from choosing universities to visa process and scholarship opportunities.",
    content: `<h2>Why Canada?</h2>
<p>Canada has become the #1 destination for Indian students, with over 2.2 lakh students enrolled annually. Post-study work permits and immigration pathways make it incredibly attractive.</p>

<h2>Top Universities in Canada</h2>
<ul>
<li>University of Toronto (UofT)</li>
<li>University of British Columbia (UBC)</li>
<li>McGill University</li>
<li>University of Waterloo</li>
<li>McMaster University</li>
</ul>

<h2>Application Timeline</h2>
<p><strong>September 2025 intake:</strong> Apply by December 2024 – February 2025</p>
<p><strong>January 2026 intake:</strong> Apply by June – September 2025</p>

<h2>Documents Required</h2>
<ol>
<li>Academic transcripts (10th, 12th, Degree)</li>
<li>English proficiency (IELTS 6.5+ / TOEFL 90+)</li>
<li>Statement of Purpose (SOP)</li>
<li>Letters of Recommendation (LOR)</li>
<li>Resume/CV</li>
<li>Financial documents (proof of ₹15–20 lakh)</li>
</ol>

<h2>Cost of Studying</h2>
<p><strong>Tuition:</strong> CAD 15,000–35,000/year (₹9–21 lakh)</p>
<p><strong>Living:</strong> CAD 10,000–15,000/year (₹6–9 lakh)</p>

<h2>Scholarships</h2>
<p>Vanier Canada Graduate Scholarships, university-specific merit scholarships, and provincial scholarships are available. Indian students with 85%+ can get 25–100% tuition waivers at many colleges.</p>`,
    category: "Study Abroad",
    tags: ["Canada", "Study Abroad", "Visa", "Scholarship"],
    author: { name: "Rahul Mehta", bio: "International Education Consultant, 200+ successful placements", avatar: "" },
    image: { url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=450&fit=crop", alt: "Canada campus" },
    status: "published",
    isFeatured: false,
    seo: {
      metaTitle: "Study in Canada 2025: Complete Guide for Indian Students",
      metaDescription: "Complete guide to studying in Canada for Indian students — universities, visa, costs, and scholarships.",
    },
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // ✅ CMS admin ka email alag hai — app admin se conflict nahi hoga
    // App admin: admin@counselorscafe.com (collection: admins)
    // CMS admin: cms@counselorscafe.com  (collection: cms_admins)
    const cmsEmail = process.env.CMS_ADMIN_EMAIL || "cms@counselorscafe.com";
    const cmsPass  = process.env.CMS_ADMIN_PASSWORD || "Cms@Admin123";

    let cmsAdmin = await Admin.findOne({ email: cmsEmail });
    if (!cmsAdmin) {
      cmsAdmin = await Admin.create({
        name: "CMS Admin",
        email: cmsEmail,
        password: cmsPass,
        role: "superadmin",
      });
      console.log(`✅ CMS Admin created: ${cmsEmail}`);
    } else {
      console.log(`⚠️  CMS Admin already exists: ${cmsEmail}`);
    }

    // Create sample blogs
    let created = 0;
    for (const blogData of sampleBlogs) {
      const exists = await Blog.findOne({ title: blogData.title });
      if (!exists) {
        await Blog.create({ ...blogData, createdBy: cmsAdmin._id });
        created++;
      }
    }

    console.log(`✅ ${created} sample blogs created`);
    console.log("\n🎉 Seed complete!");
    console.log("─────────────────────────────────────────");
    console.log(`CMS Admin Email   : ${cmsEmail}`);
    console.log(`CMS Admin Password: ${cmsPass}`);
    console.log(`CMS Dashboard     : http://localhost:3001`);
    console.log("─────────────────────────────────────────");
    console.log("\n⚠️  NOTE: App admin (admin@counselorscafe.com) is untouched.");
    console.log("   CMS admins are stored in 'cms_admins' collection separately.\n");
  } catch (err) {
    console.error("❌ Seed error:", err.message);
  } finally {
    await mongoose.disconnect();
  }
}

seed();
