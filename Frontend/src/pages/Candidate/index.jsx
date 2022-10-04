import React from "react";
import { Greeting } from "../../components/Greeting";
import { NoExInfo } from "../../components/Alerts";
import { Loading } from "../../components/Loading";
import { useCandProfile } from "../../hooks/useProfile";

export const CandidateDashboard = () => {
  //Fetch profile
  const { isLoading, isError, error, data, user } = useCandProfile();

  console.log("From candidate dashindex Data:", data);

  //Conditional rendering
  const rednderDetails = () => {
    if (isLoading) return <Loading />;
    if (isError && error.request.status === 400)
      return (
        <NoExInfo
          to="/user/profile"
          text="Upload your Resume to Get Started! "
        />
      );
    if (isError)
      return <NoExInfo to="/dashboard" text="Something went wrong! " />;
    // if (data) return <Greeting data={data} />;
  };

  return (
    <div className="h-full">
      <Greeting props={user} />

      <div className="mt-4 min-h-screen w-full rounded-md bg-slate-100">
        {rednderDetails()}
      </div>
    </div>
  );
};
