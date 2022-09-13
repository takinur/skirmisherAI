import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { useAxiosPrivate } from "../../hooks/useAxiosPrivate";
import { Greeting } from "../../components/Greeting";
import { useSelector } from "react-redux";
import { NoAddionalInfo } from "../../components/Alerts";

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
    if (isError) return <NoAddionalInfo to="/emp/info" text='It seems that you have not provided additional details! ' />;
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

const ProfileNotSet = () => {
  return (
    <div className="flex items-center hover:opacity-90 cursor-pointer justify-between p-4 mb-8 text-sm font-semibold text-purple-100 bg-purple-600 rounded-lg shadow-md focus:outline-none focus:shadow-outline-purple">
      <div className="flex items-center justify-center">
        <div className="alert-icon flex items-center bg-blue-100 border-2 border-blue-500 justify-center h-10 w-10 flex-shrink-0 rounded-full mr-2">
          <span className="text-blue-600">
            <svg fill="currentColor" viewBox="0 0 20 20" className="h-6 w-6">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              ></path>
            </svg>
          </span>
        </div>
        <span className="text-base">It seems that you have not provided additional details! </span>
      </div>
      <span className="text-lg font-thin">
        Lets set it now<span>→</span>
      </span>
    </div>
  );
};
