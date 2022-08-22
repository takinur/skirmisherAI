import { axiosInstance } from "../../_helpers/axiosInstance";

// import { IAuthContext } from '../types'


// Register user
const register = async (userData: any) => {
  // const response = await axios.post("/user/register", userData, config);
  const response = await axiosInstance.post("/user/register", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};
// Login user
const login = async (userData: any) => {
  const customUser = {
    username: "takinur",
    password: "root",
  };

  const response = await axiosInstance.post("/auth/login/", customUser);

  if (response.data) {
    // console.log(jwtDecode(response.data.access));
    localStorage.setItem("authToken", JSON.stringify(response.data));
  }

  return response.data;
};

//Logout user
const logout = (dispatch: any) => {
  localStorage.removeItem("authToken");
  //TODO:Redirect to Home Page
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
