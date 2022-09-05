import axios from "axios";

const baseURLEndpoint = import.meta.env.VITE_BASE_URL; //Import from ENV

export const axiosInstance = axios.create({
  baseURL: baseURLEndpoint,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

