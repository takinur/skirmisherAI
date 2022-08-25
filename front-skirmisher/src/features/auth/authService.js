import axios from "axios";
import { axiosInstance } from "../../_helpers/axiosInstance";
import  { useAxios } from "../../_helpers/useAxios";

// Register user
const register = async (userData) => {
  const response = await axiosInstance.post("/auth/register/", userData);

  if (response.data) {
    localStorage.setItem("authToken", JSON.stringify(response.data));
  }

  return response.data;
};
// Login user
const login = async (userData) => {
  const response = await axiosInstance.post("/auth/login/", userData);
  if (response.data) {
    localStorage.setItem("authToken", JSON.stringify(response.data));
  }

  return response.data;
};

//Get user info
const getUserDetails = async (token) => {
  //INITIAL Axios Request with token
  const config = {
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
      Authorization: `Bearer ${token.access}`,
      "Content-Type": "application/json",
    },
  };
  const response = await axios.get("/auth/user/", config);
  console.log("response", response);
  if(!response.data){
    localStorage.removeItem("authToken");
  }
  return response.data;
};

//Logout user
const logout = () => {
  localStorage.removeItem("authToken");
  //TODO:Redirect to Home Page
};

const authService = {
  register,
  logout,
  login,
  getUserDetails,
};

export default authService;
