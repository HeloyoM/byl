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
    const { token } = req.body; // Get the token from the frontend
    const userData = await verifyToken(token);

    // Check if the user already exists in the DB
    let user = await User.findOne({ email: userData.email });

    if (!user) {
      // If user does not exist, create a new user
      user = new User({
        email: userData.email,
        name: userData.name,
        phone: '', // Placeholder; can be updated later
      });

      await user.save();
    }

    // Respond with the user data
    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ error: 'Invalid Google token' });
  }
};

module.exports = { googleAuth };
