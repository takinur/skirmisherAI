import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { useAxiosPrivate } from "../../hooks/useAxiosPrivate";
import { Greeting } from "../../components/Greeting";
import { useSelector } from "react-redux";
import { NoExInfo } from "../../components/Alerts";

export const EmployerDashboard = () => {
  const API = useAxiosPrivate();
  const [profile, setProfile] = useState(null);
  //User from redux store
  const { user } = useSelector((state) => state.auth);

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


  console.log("From dashindex Data:", data);

  //Conditional rendering
  const renderProfile = () => {
    if (isLoading) return <div>Loading...</div>;
    if (isError) return <NoExInfo to="/user/profile" text='It seems that you have not provided additional details! ' />;
    // if (data) return <Greeting data={data} />;
  };

  return (
    <div className="h-full">
      <Greeting props={user} />

      <div className="w-full mt-4 rounded-md bg-slate-100 min-h-screen">
        {renderProfile()}
      </div>
    </div>
  );
};


