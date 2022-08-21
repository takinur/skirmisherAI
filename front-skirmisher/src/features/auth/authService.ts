import axios from "axios";
import jwtDecode from "jwt-decode";

// import { IAuthContext } from '../types'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL
const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

//Interface for Auth Service
type DateTime = string;
export type Nullable<T> = T | null;
export interface Iuser {
    id: number;
    name: string;
    email: string;
    current_team_id: Nullable<number>;
    profile_photo_path: Nullable<string>;
    profile_photo_url: string;
    two_factor_enabled: boolean;
    email_verified_at: Nullable<DateTime>;
    created_at: DateTime;
    updated_at: DateTime;
  }
  
  export interface IAuthContext {
    user : Iuser[];
    loginUser : (user: Iuser) => void;
    // logoutUser : () => void;
  }

// Register user
const register = async (userData : IAuthContext) => {

    const response = await axios.post("/user/register", userData, config);

    if(response.data){
        localStorage.setItem("user", JSON.stringify(response.data));
    }
    
    return response.data;
}
// Login user
const login = async (userData : IAuthContext) => {

    const customUser = {
        username: 'takinur',
        password: 'root'
    }

    const response = await axios.post("/auth/login/", customUser, config);

    if(response.data){
        // console.log(jwtDecode(response.data.access));
        localStorage.setItem("authToken", JSON.stringify(response.data));
    }
    
    return response.data;
}

//Logout user
const logout = () => {
    localStorage.removeItem("authToken");
    //TODO:Redirect to Home Page
}

const authService = {
    register,
    logout,
    login,
}

export default authService