const Hotel = require("../models/Hotel");

// Add Hotel
exports.addHotel = async (req, res) => {
  try {
    const hotel = await Hotel.create(req.body);

    res.status(201).json({
      success: true,
      message: "Hotel added successfully",
      hotel,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Get All Hotels
// Get All Hotels with Search, Filter, Sort & Pagination
exports.getHotels = async (req, res) => {
  try {
    const {
      city,
      hotelName,
      rating,
      roomType,
      minPrice,
      maxPrice,
      amenity,
      page = 1,
      limit = 10,
      sort,
    } = req.query;

    let query = {};

    // Search by city
    if (city) {
      query.city = new RegExp(city, "i");
    }

    // Search by hotel name
    if (hotelName) {
      query.hotelName = new RegExp(hotelName, "i");
    }

    // Rating filter
    if (rating) {
      query.rating = { $gte: Number(rating) };
    }

    // Room type filter
    if (roomType) {
      query["rooms.roomType"] = roomType;
    }

    // Amenity filter
    if (amenity) {
      query.amenities = {
        $in: [new RegExp(amenity, "i")],
      };
    }

    // Price filter
    if (minPrice || maxPrice) {
      query["rooms.price"] = {};

      if (minPrice) {
        query["rooms.price"].$gte = Number(minPrice);
      }

      if (maxPrice) {
        query["rooms.price"].$lte = Number(maxPrice);
      }
    }

    let hotels = Hotel.find(query);

    // Sorting
    if (sort) {
      hotels = hotels.sort(sort);
    } else {
      hotels = hotels.sort({ rating: -1 });
    }

    const totalHotels = await Hotel.countDocuments(query);

    hotels = await hotels
      .skip((page - 1) * Number(limit))
      .limit(Number(limit));

    res.status(200).json({
      success: true,
      totalHotels,
      currentPage: Number(page),
      totalPages: Math.ceil(totalHotels / Number(limit)),
      hotels,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Get Hotel By ID
exports.getHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);

    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: "Hotel not found",
      });
    }

    res.json({
      success: true,
      hotel,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Update Hotel
exports.updateHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: "Hotel not found",
      });
    }

    res.json({
      success: true,
      message: "Hotel updated successfully",
      hotel,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Delete Hotel
exports.deleteHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);

    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: "Hotel not found",
      });
    }

    await hotel.deleteOne();

    res.json({
      success: true,
      message: "Hotel deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};