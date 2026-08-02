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

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/flights", flightRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/hotel-bookings", hotelBookingRoutes);
app.use("/api/refunds", refundRoutes);

app.get("/", (req, res) => {
  res.send("Travel Booking API is running...");
});



mongoose
  .connect(process.env.MONGO_URI, {
   
  })
  .then(() => {
    console.log("✅ MongoDB Connected");

    app.listen(process.env.PORT || 5000, () => {
      console.log(`🚀 Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err.message);
    process.exit(1);
  });