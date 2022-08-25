import axios from "axios";
import { useSelector } from "react-redux";
import jwtDecode from "jwt-decode";
import dayjs from "dayjs";

const baseURLEndpoint = import.meta.env.VITE_BASE_URL; //Import from ENV

export const axiosInstance = axios.create({
  baseURL: baseURLEndpoint,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

