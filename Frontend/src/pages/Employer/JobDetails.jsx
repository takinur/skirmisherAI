import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthLayout from "../Layout/Auth";
import { useQuery } from "react-query";
import { useAxiosPrivate } from "../../hooks/useAxiosPrivate";


export const JobDetails = () => {
  const navigate = useNavigate();
  const API = useAxiosPrivate();

  const { id } = useParams();

  if (!id) {
    navigate("/employer/jobs");
  }

  

  //Fetch Job Applications
  const { isLoading, data, refetch } = useQuery(
    "applications",
    async () => {
      const res = await API.get(`/v1/application-dashboard/?job_id=${id}`);
      return res.data;
    },
    {
      refetchOnWindowFocus: true,
      retry: 1,
    }
  );

  console.log("Feteched", data);

  //TODO: Fetch Job Details
  //TODO: Fetch Job Applications
  //TODO: Fetch Job Candidates
  //TODO: invite for interview (API)
  //TODO: hire (API)

  return (
    <AuthLayout title="Job Details">
      <h1
        onClick={() => navigate(-1)}
        className={classNames("ml-5 !bg-purple-600 md:mt-2")}
      >
        Go Back
      </h1>
      
      <div className="wrapper">
        <h1>Job ID: {id} </h1>
        <button onClick={() => navigate(-1)} className="bg-red-400">
          Go back
        </button>
        <h1 className="text-center text-2xl text-gray-600">
          {data && data[0].job_title}
        </h1>
      </div>
    </AuthLayout>
  );
};
