import api from "./api";

// ==============================
// Hotels
// ==============================

export const getHotels = async (params = {}) => {
  const cleanParams = Object.fromEntries(
    Object.entries(params).filter(
      ([_, v]) => v !== null && v !== undefined && v !== ""
    )
  );

  const res = await api.get("/hotels", {
    params: cleanParams,
  });

  return res.data;
};

export const getHotelById = async (id) => {
  const res = await api.get(`/hotels/${id}`);
  return res.data;
};

// ==============================
// Hotel Bookings
// ==============================

export const bookHotel = async (bookingData) => {
  const res = await api.post("/hotel-bookings", bookingData);
  return res.data;
};

export const getMyHotelBookings = async () => {
  const res = await api.get("/hotel-bookings/my");
  return res.data;
};

export const getHotelBookingById = async (bookingId) => {
  const res = await api.get(`/hotel-bookings/${bookingId}`);
  return res.data;
};

export const cancelHotelBooking = async (bookingId) => {
  const res = await api.patch(
    `/hotel-bookings/${bookingId}/cancel`
  );
  return res.data;
};