const Booking = require("../models/Booking");
const Flight = require("../models/Flight");

// ==================================================
// Create Booking
// ==================================================
exports.createBooking = async (req, res) => {
  try {
    const { flightId, passengers } = req.body;

    const flight = await Flight.findById(flightId);

    if (!flight) {
      return res.status(404).json({
        success: false,
        message: "Flight not found",
      });
    }

    if (!flight.bookedSeats) {
      flight.bookedSeats = [];
    }

    if (flight.availableSeats < passengers.length) {
      return res.status(400).json({
        success: false,
        message: "Not enough seats available",
      });
    }

    for (const passenger of passengers) {
      if (flight.bookedSeats.includes(passenger.seatNumber)) {
        return res.status(400).json({
          success: false,
          message: `Seat ${passenger.seatNumber} is already booked`,
        });
      }
    }

    passengers.forEach((p) => {
      flight.bookedSeats.push(p.seatNumber);
    });

    flight.availableSeats -= passengers.length;

    await flight.save();

    const booking = await Booking.create({
      user: null,
      flight: flight._id,
      passengers,
      totalPassengers: passengers.length,
      totalAmount: passengers.length * flight.price,
      bookingStatus: "Confirmed",
      paymentStatus: "Pending",
    });

    res.status(201).json({
      success: true,
      message: "Flight booked successfully",
      booking,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ==================================================
// Get My Bookings
// ==================================================
exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      user: req.user.id,
    })
      .populate("flight")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: bookings.length,
      bookings,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ==================================================
// Get Booking By ID
// ==================================================
exports.getBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("flight")
      .populate("user", "name email");

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    res.status(200).json({
      success: true,
      booking,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ==================================================
// Update Payment Status
// ==================================================
exports.updatePaymentStatus = async (req, res) => {
  try {
    const { paymentStatus } = req.body;

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    booking.paymentStatus = paymentStatus || "Paid";

    await booking.save();

    res.status(200).json({
      success: true,
      message: "Payment updated successfully",
      booking,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ==================================================
// Cancel Booking
// ==================================================
exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    if (booking.bookingStatus === "Cancelled") {
      return res.status(400).json({
        success: false,
        message: "Booking already cancelled",
      });
    }

    const flight = await Flight.findById(booking.flight);

    booking.passengers.forEach((p) => {
      flight.bookedSeats = flight.bookedSeats.filter(
        (seat) => seat !== p.seatNumber
      );
    });

    flight.availableSeats += booking.totalPassengers;

    await flight.save();

    booking.bookingStatus = "Cancelled";

    await booking.save();

    res.status(200).json({
      success: true,
      message: "Booking cancelled successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};