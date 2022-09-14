import React, { useState } from "react";
import { useSelector } from "react-redux";
import AuthLayout from "../Layout/Auth";
import { useAxiosPrivate } from "../../hooks/useAxiosPrivate";
import { useQuery } from "react-query";
import { EmpProfileForm } from "../../components/Forms";

export default function UserProfile() {
  const { user } = useSelector((state) => state.auth);

  const API = useAxiosPrivate();

  //React query to fetch profile
  const { isLoading, isError, error, data } = useQuery(
    "empProfile",
    fetchProfile,
    {
      refetchOnWindowFocus: false,
      retry: 0,
    }
  );
  //Async function to fetch profile
  async function fetchProfile() {
    const res = await API.get(`/account/employer/${user.id}`);
    return res.data;
  }

  const roleBasedRender = () => {
    if (user.role === "EMPLOYER") return <EmpProfileForm user={user} />;
  };

  return (
    <AuthLayout title={"Manage your profile"}>
      <div>UserProfile</div>
      {roleBasedRender()}
    </AuthLayout>
  );
}
