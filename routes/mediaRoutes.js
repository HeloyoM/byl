// routes/mediaRoutes.js

const express = require("express");
const router = express.Router();
const Media = require("../models/Media");
const cloudinary = require("cloudinary").v2;

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Upload media
router.post("/upload", async (req, res) => {
  try {
    const { type, description, file } = req.body; // You may want to handle file uploads using a middleware (e.g., multer)
    
    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(file, { resource_type: type });

    const newMedia = new Media({
      url: result.secure_url,
      type: type,
      description: description,
      uploadedBy: req.user._id, // Assuming user is authenticated
    });

    await newMedia.save();
    res.status(200).json(newMedia);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete media
router.delete("/delete/:id", async (req, res) => {
  try {
    const media = await Media.findByIdAndDelete(req.params.id);
    if (!media) return res.status(404).json({ error: "Media not found" });

    // Optionally, delete from Cloudinary as well
    await cloudinary.uploader.destroy(media.public_id);
    
    res.status(200).json({ message: "Media deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
