import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL
const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }
// Register user
const register = async (userData) => {

    const response = await axios.post("/user/register", userData, config);

    if(response.data){
        localStorage.setItem("user", JSON.stringify(response.data));
    }
    
    return response.data;
}
// Login user
const login = async (userData) => {

    const customUser = {
        username: 'takinur',
        password: 'root'
    }

    const response = await axios.post("/auth/login/", customUser, config);

    if(response.data){
        localStorage.setItem("user", JSON.stringify(response.data));
    }
    
    return response.data;
}

//Logout user
const logout = () => {
    localStorage.removeItem("user");
    //TODO:Redirect to Home Page
}

const authService = {
    register,
    logout,
    login,
}

export default authService