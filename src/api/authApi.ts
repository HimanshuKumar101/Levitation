
import axios from "axios";

const API_URL = "http://localhost:4000/api/auth";

// Register API
export const registerUser = async (userData: {
  name: string;
  email: string;
  password: string;
}) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

// Login API
export const loginUser = async (loginData: {
  email: string;
  password: string;
}) => {
  const response = await axios.post(`${API_URL}/login`, loginData);

  // Assuming your API returns { user: {...}, token: "..." }
  return {
    user: response.data.user, // Adjust based on your API's response structure
    token: response.data.token,
  };
};
