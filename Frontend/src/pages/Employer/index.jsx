import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { useAxiosPrivate } from "../../hooks/useAxiosPrivate";

export const EmployerDashboard = () => {
  const API = useAxiosPrivate();
  const [userProfile, setUserProfile] = useState("");
  const id = 188; //Hardcoded for now

  const fetchProfile = async () => {
    const res = await API.get(`/account/employer/${id}`);
    return res.data;
  };
  const {
    isLoading,
    isError,
    error,
    data: empProfile,
  } = useQuery("empProfile", fetchProfile);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;
  // console.log(userProfile , 'USer Profile')

  console.log("From dashindex Data:", empProfile);

  return (
    <div className="h-full">
      <h2>
        Hi, i am from dashboard index page. Designation{empProfile.designation}
      </h2>
    </div>
  );
};
