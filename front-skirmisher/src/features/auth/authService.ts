import { axiosInstance } from '../../_helpers/axiosInstance';

// import { IAuthContext } from '../types'


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

    // const response = await axios.post("/user/register", userData, config);
    const response = await axiosInstance.post("/user/register", userData);

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

    const response = await axiosInstance.post("/auth/login/", customUser);

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