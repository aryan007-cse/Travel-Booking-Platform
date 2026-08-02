const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  roomType: {
    type: String,
    enum: ["Single", "Double", "Deluxe", "Suite"],
    required: true,
  },

  price: {
    type: Number,
    required: true,
    min: 0,
  },

  totalRooms: {
    type: Number,
    required: true,
    min: 1,
  },

  availableRooms: {
    type: Number,
    required: true,
    min: 0,
  },

  capacity: {
    type: Number,
    required: true,
  },
});

const hotelSchema = new mongoose.Schema(
  {
    hotelName: {
      type: String,
      required: true,
      trim: true,
    },

    city: {
      type: String,
      required: true,
      index: true,
    },

    address: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      default: "",
    },

    rating: {
      type: Number,
      default: 4,
      min: 1,
      max: 5,
    },

    amenities: [
      {
        type: String,
      },
    ],

    images: [
      {
        type: String,
      },
    ],

    rooms: [roomSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Hotel", hotelSchema);