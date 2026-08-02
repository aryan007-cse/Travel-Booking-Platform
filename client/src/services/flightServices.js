import api from "./api";

// ==============================
// Flights
// ==============================

export const getFlights = async (params = {}) => {
  // Remove empty params
  const cleanParams = Object.fromEntries(
    Object.entries(params).filter(
      ([_, v]) => v !== null && v !== undefined && v !== ""
    )
  );

  const response = await api.get("/flights", {
    params: cleanParams,
  });

  return response.data;
};

export const getFlightById = async (id) => {
  const response = await api.get(`/flights/${id}`);
  return response.data;
};

// ==============================
// Flight Bookings
// ==============================

export const bookFlight = async (bookingData) => {
  const response = await api.post("/bookings", bookingData);
  return response.data;
};

export const getMyFlightBookings = async () => {
  const response = await api.get("/bookings/my");
  return response.data;
};

export const getBookingById = async (bookingId) => {
  const response = await api.get(`/bookings/${bookingId}`);
  return response.data;
};

export const updatePaymentStatus = async (bookingId) => {
  const response = await api.patch(
    `/bookings/${bookingId}/payment`,
    {
      paymentStatus: "Paid",
    }
  );
  return response.data;
};

export const cancelFlightBooking = async (bookingId) => {
  const response = await api.patch(
    `/bookings/${bookingId}/cancel`
  );
  return response.data;
};