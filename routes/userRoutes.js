// routes/userRoutes.js

const express = require("express");
const router = express.Router();

// Example route to verify user authentication
router.post("/login", (req, res) => {
  // Authentication logic here (e.g., Google Auth integration)
  res.send("User login");
});

module.exports = router;
