import React from "react";
import { useQuery } from "react-query";
import { useAxiosPrivate } from "../../hooks/useAxiosPrivate";

import { EmpProfileForm } from "../../components/Forms";
import { Loading } from "../../components/Loading";

export const Profile = (props) => {
  const API = useAxiosPrivate();

  //React query to fetch profile
  const { isLoading, isError, data } = useQuery(
    "empProfile",
    fetchProfile,
    {
      refetchOnWindowFocus: false,
      retry: 0,
    }
  );
  //Async function to fetch profile
  async function fetchProfile() {
    const res = await API.get(`/account/employer/${props.user.id}`);
    return res.data;
  }

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <EmpProfileForm user={props.user} />;
  if (data) return <div>Profile</div>;
};
