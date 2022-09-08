import { axiosAuthInstance, axiosInstance } from "../../hooks/axiosInstance";
import jwtDecode from "jwt-decode";

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
  //Override default axios header
  const config = {
    headers: {
      Authorization: `Bearer ${token.access}`,
    },
  };
  const response = await axiosAuthInstance.get(`auth/user/`, config);
  if(!response.data){
    localStorage.removeItem("authToken");
  }
  else{
    window.sessionStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

//Logout user
const logout = () => {
  localStorage.removeItem("authToken");
  window.sessionStorage.removeItem("user");
};

const authService = {
  register,
  logout,
  login,
  getUserDetails,
};

export default authService;
