const express = require("express");
const router = express.Router();

const {
  addHotel,
  getHotels,
  getHotel,
  updateHotel,
  deleteHotel,
} = require("../controllers/hotelController");

const { protect } = require("../middlerware/authMiddleware");
const { isAdmin } = require("../middlerware/adminMiddleware");

// Public Routes
router.get("/", getHotels);
router.get("/:id", getHotel);

// Admin Routes
router.post("/", protect, isAdmin, addHotel);
router.put("/:id", protect, isAdmin, updateHotel);
router.delete("/:id", protect, isAdmin, deleteHotel);

module.exports = router;