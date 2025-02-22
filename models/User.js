// models/User.js

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  name: { type: String, required: true },
  password: { type: String, required: false },  // In case you add password authentication later
});

const User = mongoose.model("User", userSchema);

module.exports = User;
