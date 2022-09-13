import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import dayjs from "dayjs";
import { useAxiosPrivate } from "../../hooks/useAxiosPrivate";


export const EmployerDashboard = () => {
  const API = useAxiosPrivate();
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
  //Greeting message with dayjs
  const greeting = () => {
    const hour = dayjs().hour();
    if (hour >= 0 && hour < 12) {
      return "Good Morning";
    } else if (hour >= 12 && hour < 17) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  };
  return (
    <div className="h-full">
      <h2>
        Hi, i am from dashboard index page. Designation{empProfile.designation}
      </h2>
      <h1>
      {greeting()}
      </h1>
    </div>
  );
};
