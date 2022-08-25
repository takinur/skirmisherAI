import axios from "axios";
import { useSelector } from "react-redux";
import jwtDecode from "jwt-decode";
import dayjs from "dayjs";

const baseURLEndpoint = import.meta.env.VITE_BASE_URL; //Import from ENV

const useAxios = () => {
  let { authToken } = useSelector((state) => state.auth);
  let authTokens = authToken;
  // if (authToken) {
  //   authTokens = JSON.parse(authToken)
  // }
//   const authTokens = JSON.parse(authToken);

//   console.log("authTokens", authTokens.access);
  const axiosInstanceAuth = axios.create({
    baseURL: baseURLEndpoint,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authTokens?.access}`,
    },
  });

  axiosInstanceAuth.interceptors.request.use(
    async (config) => {
      if (!authTokens) return config;

      const user = jwtDecode(authToken);
    //   console.log("user", user);
      const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

      if (!isExpired) return config;
    //   console.log("the ref token", authTokens.refresh);
        const response = await axios.post(
          `${baseURLEndpoint}auth/token/refresh/`,
          {
            refresh: authTokens.refresh,
          }
        );
          console.log("response", response);
        localStorage.setItem("authToken", JSON.stringify(response.data));

        config.headers.Authorization = `Bearer ${response.data.access}`;

      return config;
    },
    (error) => {
      console.log("error", error);
      return Promise.reject(error);
    }
  );
  return axiosInstanceAuth;
};

export default useAxios;
