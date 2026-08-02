import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layout
import MainLayout from "../layouts/MainLayout";

// Pages
import Home from "../pages/Home";
import Flights from "../pages/Flights";
import FlightDetails from "../pages/FlightDetails";
import Hotels from "../pages/Hotels";
import HotelDetails from "../pages/HotelDetails";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Admin from "../pages/Admin";
import Refund from "../pages/Refund";
import NotFound from "../pages/NotFound";

import PassengerDetails from "../pages/PassengerDetails";
import Payment from "../pages/Payment";
import BookingSuccess from "../pages/BookingSuccess";
import MyBookings from "../pages/MyBookings";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Pages with Navbar + Footer */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />

          <Route path="/flights" element={<Flights />} />
          <Route path="/flights/:id" element={<FlightDetails />} />

          <Route path="/hotels" element={<Hotels />} />
          <Route path="/hotels/:id" element={<HotelDetails />} />

          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/my-bookings" element={<MyBookings />} />

          <Route path="/refund" element={<Refund />} />
        </Route>

        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Booking Flow */}
        <Route
          path="/passenger/:id"
          element={<PassengerDetails />}
        />

        <Route
          path="/payment/:bookingId"
          element={<Payment />}
        />

        <Route
          path="/booking-success/:bookingId"
          element={<BookingSuccess />}
        />

        {/* Admin */}
        <Route path="/admin" element={<Admin />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
}