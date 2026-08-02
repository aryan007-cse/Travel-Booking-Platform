const express = require("express");

const router = express.Router();

const {
  createRefund,
  getRefunds,
  getRefund,
  updateRefundStatus,
} = require("../controllers/refundController");

const { protect } = require("../middlerware/authMiddleware");
const { isAdmin } = require("../middlerware/adminMiddleware");

// User Routes
router.post("/", protect, createRefund);
router.get("/", protect, getRefunds);
router.get("/:id", protect, getRefund);

// Admin Route
router.patch("/:id", protect, isAdmin, updateRefundStatus);

module.exports = router;