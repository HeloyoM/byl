const express = require('express');
const router = express.Router();
const { googleAuth } = require('../controllers/authController');
const { editProfile } = require('../controllers/authController');

// Google authentication route
router.post('/google', googleAuth);

router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ error: 'Logout failed' });
        }
        res.status(200).json({ message: 'Logged out' });
    });
});

router.put('/profile', editProfile);

module.exports = router;
