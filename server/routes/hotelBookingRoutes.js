const express = require("express");

const router = express.Router();

const {
  createHotelBooking,
  getMyHotelBookings,
  getHotelBooking,
  cancelHotelBooking,
} = require("../controllers/hotelBookingController");

const { protect } = require("../middlerware/authMiddleware");

// Create Booking
router.post("/", protect, createHotelBooking);

// My Bookings
router.get("/", protect, getMyHotelBookings);

// Booking Details
router.get("/:id", protect, getHotelBooking);

// Cancel Booking
router.patch("/:id/cancel", protect, cancelHotelBooking);

module.exports = router;