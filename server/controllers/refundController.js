const Refund = require("../models/Refund");

// Create Refund
exports.createRefund = async (req, res) => {
  try {
    const {
      bookingType,
      bookingId,
      amount,
      cancellationReason,
    } = req.body;

    const refund = await Refund.create({
      bookingType,
      bookingId,
      user: req.user.id,
      amount,
      cancellationReason,
      refundStatus: "Pending",
    });

    res.status(201).json({
      success: true,
      message: "Refund request created successfully",
      refund,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};

// Get My Refunds
exports.getRefunds = async (req, res) => {
  try {

    const refunds = await Refund.find({
      user: req.user.id,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: refunds.length,
      refunds,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};

// Get Refund By ID
exports.getRefund = async (req, res) => {

  try {

    const refund = await Refund.findById(req.params.id);

    if (!refund) {

      return res.status(404).json({
        success: false,
        message: "Refund not found",
      });

    }

    res.status(200).json({
      success: true,
      refund,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }

};

// Update Refund Status (Admin)
exports.updateRefundStatus = async (req, res) => {

  try {

    const refund = await Refund.findById(req.params.id);

    if (!refund) {

      return res.status(404).json({
        success: false,
        message: "Refund not found",
      });

    }

    refund.refundStatus = req.body.refundStatus;

    await refund.save();

    res.status(200).json({
      success: true,
      message: "Refund status updated successfully",
      refund,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }

};