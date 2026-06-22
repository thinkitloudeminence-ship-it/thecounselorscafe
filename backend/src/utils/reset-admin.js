/**
 * CMS ADMIN PASSWORD RESET SCRIPT
 * Run: node src/utils/reset-admin.js
 *
 * Sirf CMS admin (cms_admins collection) ko reset karta hai.
 * App ka admin (admins collection) TOUCH NAHI HOTA.
 */

require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const CMS_EMAIL    = process.env.CMS_ADMIN_EMAIL    || "cms@counselorscafe.com";
const CMS_PASSWORD = process.env.CMS_ADMIN_PASSWORD || "Cms@Admin123";

async function resetCmsAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");
    console.log("📁 Working on collection: cms_admins (NOT touching app admins)\n");

    const hashedPassword = await bcrypt.hash(CMS_PASSWORD, 12);

    // upsert — create if not exists, update if exists
    const result = await mongoose.connection.db
      .collection("cms_admins")
      .findOneAndUpdate(
        { email: CMS_EMAIL },
        {
          $set: {
            name: "CMS Admin",
            email: CMS_EMAIL,
            password: hashedPassword,
            role: "superadmin",
            isActive: true,
            updatedAt: new Date(),
          },
          $setOnInsert: { createdAt: new Date(), lastLogin: null },
        },
        { returnDocument: "after", upsert: true }
      );

    console.log("✅ CMS Admin password reset successfully!");
    console.log("─────────────────────────────────────────");
    console.log(`CMS Email   : ${CMS_EMAIL}`);
    console.log(`CMS Password: ${CMS_PASSWORD}`);
    console.log(`Dashboard   : http://localhost:3001`);
    console.log("─────────────────────────────────────────");
    console.log("\n⚠️  App admin (admins collection) was NOT modified.");
    console.log("🚀 Restart backend then login at http://localhost:3001\n");
  } catch (err) {
    console.error("❌ Error:", err.message);
  } finally {
    await mongoose.disconnect();
  }
}

resetCmsAdmin();
