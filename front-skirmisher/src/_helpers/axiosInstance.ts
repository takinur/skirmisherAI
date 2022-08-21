import axios from "axios";


export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL, //Import from ENV
    headers: {
        "Content-Type": "application/json",
        Accept : "application/json"
    },
});

export function getRequest(URL : string) {
    return axiosInstance.get(`/${URL}`).then(response => response);
  }
  
  export function postRequest(URL : string , payload : any) {
    return axiosInstance.post(`/${URL}`, payload).then(response => response);
  }
  
  export function patchRequest(URL : string , payload : any) {
    return axiosInstance.patch(`/${URL}`, payload).then(response => response);
  }
  
  export function deleteRequest(URL : string) {
    return axiosInstance.delete(`/${URL}`).then(response => response);
  }


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
