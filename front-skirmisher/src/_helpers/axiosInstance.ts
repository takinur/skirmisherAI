import axios from "axios";



export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL, //Import from ENV
    headers: {
        "Content-Type": "application/json",
        Accept : "application/json"
    },
});



// const axiosInstance = axios.create();

// axiosInstance.defaults.baseURL = import.meta.env.VITE_BASE_URL;

// //Headers
// axiosInstance.defaults.headers = {
//   "Content-Type": "application/json",
//   Accept: "application/json",
// };
// //Set 2 seconds time out for axios requests
// axiosInstance.defaults.timeout = 2000;



// export default axiosInstance;
