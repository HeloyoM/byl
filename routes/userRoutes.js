const express = require("express");
const router = express.Router();
const userController = require('../controllers/userController')

// Example route to verify user authentication
router.post("/login", (req, res) => {
  // Authentication logic here (e.g., Google Auth integration)
  res.send("User login");
});

router.get("/profile", async (req, res) => {

      const id = req.userId

        userController.getProfile(id)
})

module.exports = router;