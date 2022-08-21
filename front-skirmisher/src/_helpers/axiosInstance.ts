import axios from "axios";


export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL, //Import from ENV
    headers: {
        "Content-Type": "application/json",
        Accept : "application/json"
    },
});




