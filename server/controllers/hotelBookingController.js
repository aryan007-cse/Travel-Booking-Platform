const HotelBooking = require("../models/HotelBooking");
const Hotel = require("../models/Hotel");

// Create Hotel Booking
exports.createHotelBooking = async (req, res) => {
  try {
    const {
      hotelId,
      roomType,
      checkIn,
      checkOut,
      guests,
      roomsBooked,
    } = req.body;

    const hotel = await Hotel.findById(hotelId);

    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: "Hotel not found",
      });
    }

    const room = hotel.rooms.find(
      (r) => r.roomType === roomType
    );

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room type not found",
      });
    }

    if (room.availableRooms < roomsBooked) {
      return res.status(400).json({
        success: false,
        message: `Only ${room.availableRooms} rooms available`,
      });
    }

    const inDate = new Date(checkIn);
    const outDate = new Date(checkOut);

    if (outDate <= inDate) {
      return res.status(400).json({
        success: false,
        message: "Check-out must be after check-in",
      });
    }

    const nights = Math.ceil(
      (outDate - inDate) / (1000 * 60 * 60 * 24)
    );

    const totalPrice =
      room.price * nights * roomsBooked;

    room.availableRooms -= roomsBooked;

    await hotel.save();

    const booking = await HotelBooking.create({
      user: req.user.id,
      hotel: hotel._id,
      roomType,
      checkIn,
      checkOut,
      guests,
      roomsBooked,
      totalPrice,
      bookingStatus: "Confirmed",
      paymentStatus: "Pending",
    });

    res.status(201).json({
      success: true,
      message: "Hotel booked successfully",
      booking,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};

// My Hotel Bookings
exports.getMyHotelBookings = async (req, res) => {

  try {

    const bookings = await HotelBooking.find({
      user: req.user.id,
    })
      .populate("hotel")
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

// Get Booking By ID
exports.getHotelBooking = async (req, res) => {

  try {

    const booking = await HotelBooking.findById(req.params.id)
      .populate("hotel")
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

// Cancel Hotel Booking
exports.cancelHotelBooking = async (req, res) => {

  try {

    const booking = await HotelBooking.findById(req.params.id);

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

    const hotel = await Hotel.findById(booking.hotel);

    const room = hotel.rooms.find(
      (r) => r.roomType === booking.roomType
    );

    room.availableRooms += booking.roomsBooked;

    await hotel.save();

    booking.bookingStatus = "Cancelled";

    await booking.save();

    res.status(200).json({
      success: true,
      message: "Hotel booking cancelled successfully",
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }

};