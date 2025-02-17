// controllers/authController.js

const { OAuth2Client } = require('google-auth-library');
const User = require('../models/User');

// Initialize Google OAuth client
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Function to verify token and get user details
async function verifyToken(token) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID, // Specify the Google Client ID
  });
  const payload = ticket.getPayload();
  return payload;
}

// Google Auth Route
const googleAuth = async (req, res) => {
  try {
    const { token } = req.body;
    const userData = await verifyToken(token);

    let user = await User.findOne({ email: userData.email });

    if (!user) {
      user = new User({
        email: userData.email,
        name: userData.name,
        phone: '',
      });
      await user.save();
    }

    // Save user session
    req.session.user = user;

    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ error: 'Invalid Google token' });
  }
};

const editProfile = async (req, res) => {
  try {
    const { phone, email } = req.body;
    const userId = req.session.user._id;

    let user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    user.phone = phone || user.phone;
    user.email = email || user.email;
    await user.save();

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: "Error updating profile" });
  }
};


module.exports = { googleAuth, editProfile };
