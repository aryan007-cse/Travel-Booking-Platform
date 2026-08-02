const express = require("express");
const router = express.Router();

const {
  register,
  login,
} = require("../controllers/authController");

const { protect } = require("../middlerware/authMiddleware");

// Public Routes
router.post("/register", register);
router.post("/login", login);

// Protected Routes
router.get("/profile", protect, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Profile fetched successfully",
    user: req.user,
  });
});

module.exports = router;