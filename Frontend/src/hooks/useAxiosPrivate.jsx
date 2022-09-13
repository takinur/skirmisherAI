import { useEffect } from "react";
// import axios from "axios";
import { useSelector } from "react-redux";
import {
  axiosAuthInstance as axiosPrivate,
  axiosInstance as axios,
} from "../api/axiosInstance";
import jwtDecode from "jwt-decode";
import dayjs from "dayjs";

export const useAxiosPrivate = () => {
  //Token from redux store
  const auth = useSelector((state) => state.auth.authToken);
  const refresh = useRefreshToken(auth); //Refresh token function from below

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers.Authorization) {
          config.headers.Authorization = `Bearer ${auth.access}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          //Set new access token in header
          prevRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh]);

  return axiosPrivate;
};

const useRefreshToken = (auth) => {
  const refresh = async () => {
    const decoded = jwtDecode(auth.access);
    const isExpired = dayjs.unix(decoded.exp).diff(dayjs()) < 1;
    console.log(
      "Token expiry time",
      dayjs.unix(decoded.exp).format("DD-MM-YYYY HH:mm:ss")
    );

    if (isExpired) {
      console.log("Token expired");
      const response = await axios.post("auth/token/refresh/", {
        refresh: auth.refresh,
      });
      localStorage.setItem("authToken", JSON.stringify(response.data));
      //Later set new token in redux store
      return response.data.access;
    }
  };

  return refresh;
};
