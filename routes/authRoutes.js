// routes/authRoutes.js

const express = require('express');
const router = express.Router();
const { googleAuth } = require('../controllers/authController');

// Google authentication route
router.post('/google', googleAuth);

module.exports = router;
