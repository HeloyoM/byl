const express = require("express");
const router = express.Router();
const userController = require('../controllers/userController')

// Example route to verify user authentication
router.post("/login", (req, res) => {
  // Authentication logic here (e.g., Google Auth integration)
  res.send("User login");
});

// router.get('/user/profile', /*authenticate,*/ userController.getProfile);

// router.put('/user/profile', /*authenticate,*/ userController.updateProfile);

module.exports = router;