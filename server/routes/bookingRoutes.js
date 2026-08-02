const express = require("express");

const router = express.Router();

const {
  createBooking,
  getMyBookings,
  getBooking,
  updatePaymentStatus,
  cancelBooking,
} = require("../controllers/bookingController");

// Authentication disabled temporarily for demo

router.post("/", createBooking);

router.get("/", getMyBookings);

router.get("/:id", getBooking);

router.patch("/:id/payment", updatePaymentStatus);

router.patch("/:id/cancel", cancelBooking);

module.exports = router;