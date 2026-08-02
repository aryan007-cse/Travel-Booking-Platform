const Flight = require("../models/Flight");

// ===============================
// Add Flight
// ===============================
exports.addFlight = async (req, res) => {
  try {
    const { flightNumber } = req.body;

    const existingFlight = await Flight.findOne({ flightNumber });

    if (existingFlight) {
      return res.status(400).json({
        success: false,
        message: "Flight number already exists",
      });
    }

    const flight = await Flight.create(req.body);

    res.status(201).json({
      success: true,
      message: "Flight added successfully",
      flight,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ===============================
// Get All Flights + Search
// ===============================
exports.getFlights = async (req, res) => {
  try {
    const {
      from,
      to,
      date,
      airline,
      minPrice,
      maxPrice,
      status,
      page = 1,
      limit = 10,
      sort,
    } = req.query;

    let query = {};

    // Search
    if (from) {
      query.from = new RegExp(`^${from}$`, "i");
    }

    if (to) {
      query.to = new RegExp(`^${to}$`, "i");
    }

    if (date) {
      const start = new Date(date);
      const end = new Date(date);

      end.setDate(end.getDate() + 1);

      query.departureDate = {
        $gte: start,
        $lt: end,
      };
    }

    // Filters
    if (airline) {
      query.airline = new RegExp(airline, "i");
    }

    if (status) {
      query.status = status;
    }

    if (minPrice || maxPrice) {
      query.price = {};

      if (minPrice) query.price.$gte = Number(minPrice);

      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    let flights = Flight.find(query);

    if (sort) {
      flights = flights.sort(sort);
    } else {
      flights = flights.sort({
        departureDate: 1,
      });
    }

    const totalFlights = await Flight.countDocuments(query);

    flights = await flights
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.status(200).json({
      success: true,
      totalFlights,
      currentPage: Number(page),
      totalPages: Math.ceil(totalFlights / limit),
      flights,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ===============================
// Get Flight By ID
// ===============================
exports.getFlight = async (req, res) => {
  try {
    const flight = await Flight.findById(req.params.id);

    if (!flight) {
      return res.status(404).json({
        success: false,
        message: "Flight not found",
      });
    }

    res.status(200).json({
      success: true,
      flight,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ===============================
// Update Flight
// ===============================
exports.updateFlight = async (req, res) => {
  try {
    const flight = await Flight.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!flight) {
      return res.status(404).json({
        success: false,
        message: "Flight not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Flight updated successfully",
      flight,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ===============================
// Delete Flight
// ===============================
exports.deleteFlight = async (req, res) => {
  try {
    const flight = await Flight.findById(req.params.id);

    if (!flight) {
      return res.status(404).json({
        success: false,
        message: "Flight not found",
      });
    }

    await flight.deleteOne();

    res.status(200).json({
      success: true,
      message: "Flight deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};