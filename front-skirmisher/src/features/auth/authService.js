import { axiosInstance } from "../../_helpers/axiosInstance";
import axios from "axios";
// import { useAxios } from "../../_helpers/useAxios";

// Register user
const register = async (userData) => {
  const response = await axiosInstance.post("/auth/register/", userData);

  // if (response.data) {
  //   localStorage.setItem("user", JSON.stringify(response.data));
  // }
  console.log(response.data)
  //TODO: Store auth token in local storage
  console.log("response", response);

  return response.data;
};
// Login user
const login = async (userData) => {
  const response = await axiosInstance.post("/auth/login/", userData);
  console.log(response);
  if (response.data) {
    localStorage.setItem("authToken", JSON.stringify(response.data));
  }

  return response.data;
};

//Get user info
const getUserDetails = async (token) => {
  //Get user info by token ~ Initial Auth Token
  let parsedToken = JSON.parse(token);
  const config = {
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
      Authorization: `Bearer ${parsedToken.access}`,
      "Content-Type": "application/json",
    },
  };
  const response = await axios.get("/auth/user/", config);

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
