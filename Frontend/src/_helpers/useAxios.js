import axios from "axios";
import { useSelector } from "react-redux";
import jwtDecode from "jwt-decode";
import dayjs from "dayjs";
import { axiosInstance } from "./axiosInstance";

export const useAxios = () => {
  const authToken = useSelector((state) => state.auth.authToken);
  axiosInstance.interceptors.request.use(async (config) => {
    if (!authToken) return config;

    config.headers.Authorization = `Bearer ${authToken.access}`;
    return config;
    
  });

  axiosInstance.interceptors.response.use(async (response) => {
    if (response.status === 401) {
      const user = jwtDecode(JSON.stringify(authToken));
      const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

      if (!isExpired) return response;
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}auth/token/refresh/`,
        {
          refresh: authToken.refresh,
        }
      );
      localStorage.setItem("authToken", JSON.stringify(response.data));

      config.headers.Authorization = `Bearer ${response.data.access}`;

      return response;
    }
    return response;
  }), (error) => {
    return Promise.reject(error);
  }
  return axiosInstance;
};
