import { axiosInstance } from "../../_helpers/axiosInstance";

// Register user
const register = async (userData) => {
  const response = await axiosInstance.post("/user/register", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

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
  // configure authorization header with user's token
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  // const { data } = await axios.get(`/api/user/profile`, config);
  // const response = await axiosInstance.post("/auth/login/", customUser);
  const data = {
    access : 'REDACTED.JWT.TOKEN'
  }
  return data;
  // return response.data;
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
