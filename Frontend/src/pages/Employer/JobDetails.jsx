import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthLayout from "../Layout/Auth";

export const JobDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  

  //TODO: Fetch Job Details
  //TODO: Fetch Job Applications
  //TODO: Fetch Job Candidates
  //TODO: invite for interview (API)
  //TODO: hire (API)

  return (
    <AuthLayout title="Job Details">
      <div className="wrapper">
        <h1>Job ID: {id} </h1>
        <button onClick={() => navigate(-1)} className="bg-red-400">
          Go back
        </button>
      </div>
    </AuthLayout>
  );
};
