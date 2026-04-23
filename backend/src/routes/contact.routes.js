const express = require("express");
const Contact = require("../models/Contact.model");

const router = express.Router();

// POST /api/contact
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, message: "name, email, subject, and message are required" });
    }

    const contact = await Contact.create({ name, email, phone, subject, message });
    res.status(201).json({ success: true, message: "Message sent successfully! We'll get back to you soon.", data: contact });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
