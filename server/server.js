const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const flightRoutes = require("./routes/flightRoutes");
const hotelRoutes = require("./routes/hotelRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const hotelBookingRoutes = require("./routes/hotelBookingRoutes");
const refundRoutes = require("./routes/refundRoutes");

dotenv.config();

const app = express();

/* ===========================
   CORS Configuration
=========================== */

const allowedOrigins = [
  "http://localhost:5173",
  "https://travelproject-a42f3.web.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests without origin (Postman, mobile apps, etc.)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("CORS not allowed"));
    },
    credentials: true,
  })
);

/* ===========================
   Middleware
=========================== */

app.use(express.json());

/* ===========================
   Routes
=========================== */

app.get("/", (req, res) => {
  res.send("Travel Booking API is running...");
});

app.use("/api/auth", authRoutes);
app.use("/api/flights", flightRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/hotel-bookings", hotelBookingRoutes);
app.use("/api/refunds", refundRoutes);

/* ===========================
   Database Connection
=========================== */

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err.message);
    process.exit(1);
  });