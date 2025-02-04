// models/Media.js

const mongoose = require("mongoose");

const mediaSchema = new mongoose.Schema({
  url: { type: String, required: true },
  type: { type: String, required: true },  // "image" or "video"
  description: { type: String },  // Optional description for each media item
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },  // Link to user
  dateUploaded: { type: Date, default: Date.now },
});

const Media = mongoose.model("Media", mediaSchema);

module.exports = Media;
