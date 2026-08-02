import api from "./api";

// Request a refund
export const requestRefund = async (refundData) => {
  const res = await api.post("/refunds", refundData);
  return res.data;
};

// Get my refunds
export const getMyRefunds = async () => {
  const res = await api.get("/refunds/my");
  return res.data;
};

// Get refund by ID
export const getRefundById = async (refundId) => {
  const res = await api.get(`/refunds/${refundId}`);
  return res.data;
};