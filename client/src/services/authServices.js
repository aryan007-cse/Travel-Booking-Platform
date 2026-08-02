import api from "./api";

// Register
export const registerUser = async (userData) => {
  const response = await api.post("/auth/register", userData);
  return response.data;
};

// Login
export const loginUser = async (credentials) => {
  const response = await api.post("/auth/login", credentials);

  const { token, user } = response.data;

  // Save to localStorage
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));

  return response.data;
};

// Logout
export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

// Get current user from localStorage
export const getCurrentUser = () => {
  try {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
};

// Get token
export const getToken = () => {
  return localStorage.getItem("token");
};

// Check if logged in
export const isLoggedIn = () => {
  return !!localStorage.getItem("token");
};