const { body, validationResult } = require("express-validator");

exports.validateFlight = [
  body("flightNumber").notEmpty().withMessage("Flight number is required"),

  body("airline").notEmpty().withMessage("Airline is required"),

  body("from").notEmpty().withMessage("Origin is required"),

  body("to").notEmpty().withMessage("Destination is required"),

  body("price")
    .isFloat({ min: 1 })
    .withMessage("Price must be greater than 0"),

  body("availableSeats")
    .isInt({ min: 0 })
    .withMessage("Available seats cannot be negative"),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    next();
  },
];