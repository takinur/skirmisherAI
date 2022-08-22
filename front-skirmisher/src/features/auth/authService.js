import { axiosInstance } from "../../_helpers/axiosInstance";

// Register user
const register = async (userData) => {
  // const response = await axios.post("/user/register", userData, config);
  const response = await axiosInstance.post("/user/register", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};
// Login user
const login = async (userData) => {
  const customUser = {
    username: "takinur",
    password: "root",
  };

  const response = await axiosInstance.post("/auth/login/", customUser);

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
    access : 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjYxMTkwODQ5LCJpYXQiOjE2NjExOTA1NDksImp0aSI6Ijg5NjZjYTg3NzBkZDQ5ZmNhNWJiYzc1MmI4YWM1OTE1IiwidXNlcl9pZCI6MSwidXNlcm5hbWUiOiJ0YWtpbnVyIn0.BcFQc__BPwUuMb_qwE6KK6nG03mWM7C1QRSjU-P8_EE'
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
