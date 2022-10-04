//Custom hook to check if user profile exist

import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { useAxiosPrivate } from "./useAxiosPrivate";

export const useProfile = (retry = 0) => {
  const API = useAxiosPrivate();
  const { user } = useSelector((state) => state.auth);
  const { isLoading, isError, error, data } = useQuery(
    "profile",
    fetchProfile,
    {
      refetchOnWindowFocus: false,
      retry: retry 
    }
  );

  //Async function to fetch profile
  async function fetchProfile() {
    const res = await API.get(`/account/employer/${user.id}`);
    return res.data;
  }

  return { isLoading, isError, error, data, user };
};

export const useCandProfile = (retry = 0 ) => {
  const API = useAxiosPrivate();
  const { user } = useSelector((state) => state.auth);
  const { isLoading, isError, error, data } = useQuery(
    "profile",
    fetchProfile,
    {
      refetchOnWindowFocus: false,
      retry: retry
    }
  );

  //Async function to fetch profile
  async function fetchProfile() {
    const res = await API.get(`/account/candidate/${user.id}`);
    return res.data;
  }

  return { isLoading, isError, error, data, user };
};
