import { axiosInstance } from "../../_helpers/axiosInstance";

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
  //Modify Axios Header for Auth requests
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token.access}`;
  const response = await axiosInstance.get("/auth/user/");
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
