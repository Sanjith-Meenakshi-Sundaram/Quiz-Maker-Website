import axios from "axios";

const API = axios.create({
  baseURL: "https://quiz-maker-website.onrender.com/api",
});

// Function to register a new user (Signup)
export const signupUser = async (userData) => {
  try {
    const response = await API.post("/auth/signup", userData);
    return response.data; // Returns success message
  } catch (error) {
    throw error.response?.data?.message || "Signup failed. Please try again.";
  }
};

// Function to login
export const loginUser = async (userData) => {
  try {
    const response = await API.post("/auth/login", userData);
    return response.data; // Returns token & userId if successful
  } catch (error) {
    throw error.response?.data?.message || "Login failed. Please check your credentials.";
  }
};
