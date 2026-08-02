import api from "./api";

// Get all my bookings (flights + hotels combined)
export const getAllMyBookings = async () => {
  const [flightRes, hotelRes] = await Promise.allSettled([
    api.get("/bookings/my"),
    api.get("/hotel-bookings/my"),
  ]);

  const flightBookings =
    flightRes.status === "fulfilled"
      ? flightRes.value.data.bookings || []
      : [];

  const hotelBookings =
    hotelRes.status === "fulfilled"
      ? hotelRes.value.data.bookings || []
      : [];

  return {
    flightBookings,
    hotelBookings,
  };
};