// routes/contact.routes.js - Add duplicate check
const express = require("express");
const Contact = require("../models/Contact.model");

const router = express.Router();

// POST /api/contact - with duplicate check
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !subject || !message || !phone) {
      return res.status(400).json({ 
        success: false, 
        message: "name, email, phone, subject, and message are required" 
      });
    }

    // Check for duplicate phone number (pending enquiries)
    const existingContact = await Contact.findOne({
      phone: phone,
      status: { $in: ["new", "read"] }
    });

    if (existingContact) {
      return res.status(409).json({
        success: false,
        message: "This phone number already has a pending enquiry. We'll contact you shortly!"
      });
    }

    const contact = await Contact.create({ 
      name, 
      email, 
      phone, 
      subject, 
      message 
    });
    
    res.status(201).json({ 
      success: true, 
      message: "Message sent successfully! We'll get back to you soon.", 
      data: contact 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;