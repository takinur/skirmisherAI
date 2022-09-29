import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { useAxiosPrivate } from "../../hooks/useAxiosPrivate";
import { Greeting } from "../../components/Greeting";
import { useSelector } from "react-redux";
import { NoExInfo } from "../../components/Alerts";
import { Loading } from "../../components/Loading";

import { useProfile } from "../../hooks/useProfile";

export const EmployerDashboard = () => {
  const API = useAxiosPrivate();
  //User from redux store
  const { user } = useSelector((state) => state.auth);

  //Custom hook to check if user profile exist
  const {
    isLoading: empLoading,
    isError: empErr,
    data: employer,
  } = useProfile(); //Pass retry Agument :INT

  console.log("From dashindex Data:", employer);

  //Conditional rendering
  const renderDetails = () => {
    if (empLoading) return <Loading />;
    if (empErr)
      return (
        <NoExInfo
          to="/user/profile"
          text="It seems that you have not provided additional details! "
        />
      );
    // if (data) return <Greeting data={data} />;
  };

  return (
    <div className="h-full">
      <Greeting props={user} />

      <div className="mt-4 min-h-screen w-full rounded-md bg-slate-100 dark:bg-slate-400">
        {renderDetails()}
      </div>
    </div>
  );
};
