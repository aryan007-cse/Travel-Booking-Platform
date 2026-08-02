const express = require("express");

const router = express.Router();

const {
  addFlight,
  getFlights,
  getFlight,
  updateFlight,
  deleteFlight,
} = require("../controllers/flightController");

const { protect } = require("../middlerware/authMiddleware");
const { isAdmin } = require("../middlerware/adminMiddleware");

// ===============================
// Public Routes
// ===============================

// Search / Get All Flights
router.get("/", getFlights);

// Get Single Flight
router.get("/:id", getFlight);

// ===============================
// Admin Routes
// ===============================

router.post("/", protect, isAdmin, addFlight);

router.put("/:id", protect, isAdmin, updateFlight);

router.delete("/:id", protect, isAdmin, deleteFlight);

module.exports = router;