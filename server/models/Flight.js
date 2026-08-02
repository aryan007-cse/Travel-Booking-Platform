const mongoose = require("mongoose");

const flightSchema = new mongoose.Schema(
  {
    flightNumber: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },

    airline: {
      type: String,
      required: true,
      trim: true,
    },

    from: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    to: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    departureDate: {
      type: Date,
      required: true,
      index: true,
    },

    departureTime: {
      type: String,
      required: true,
    },

    arrivalTime: {
      type: String,
      required: true,
    },

    duration: {
      type: Number,
      required: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    availableSeats: {
      type: Number,
      required: true,
      min: 0,
    },
    bookedSeats: [
  {
    type: String,
    uppercase: true,
  },
],

    aircraft: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["On Time", "Delayed", "Cancelled"],
      default: "On Time",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Flight", flightSchema);