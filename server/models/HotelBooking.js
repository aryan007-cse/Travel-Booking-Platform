const mongoose = require("mongoose");

const hotelBookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    hotel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
      required: true,
    },

    roomType: {
      type: String,
      required: true,
    },

    checkIn: {
      type: Date,
      required: true,
    },

    checkOut: {
      type: Date,
      required: true,
    },

    guests: {
      type: Number,
      required: true,
    },

    roomsBooked: {
      type: Number,
      required: true,
    },

    totalPrice: {
      type: Number,
      required: true,
    },

    bookingStatus: {
      type: String,
      enum: ["Confirmed", "Cancelled"],
      default: "Confirmed",
    },

    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending",
    },
    refundAmount: {
        type: Number,
        default: 0
    },
    cancellationReason: {
        type: String,
        default: ""
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("HotelBooking", hotelBookingSchema);