const mongoose = require("mongoose");

const refundSchema = new mongoose.Schema(
  {
    bookingType: {
      type: String,
      enum: ["Flight", "Hotel"],
      required: true,
    },

    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    cancellationReason: {
      type: String,
      required: true,
    },

    refundStatus: {
      type: String,
      enum: ["Pending", "Processed", "Completed"],
      default: "Pending",
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Refund", refundSchema);