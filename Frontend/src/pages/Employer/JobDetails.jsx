import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthLayout from "../Layout/Auth";
import { useQuery } from "react-query";
import { useAxiosPrivate } from "../../hooks/useAxiosPrivate";
import classNames from "classnames";

import ButtonDefault from "../../components/ButtonDefault";

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
  //EH? TEST Employer -> "nuxosepil@mailinator.com"

  return (
    <AuthLayout title="Job Details">
      <ButtonDefault
        onClick={() => navigate(-1)}
        className={classNames("ml-1 !bg-gray-700 md:mt-2")}
      >
        Go Back to Jobs
      </ButtonDefault>

      <div className="wrapper">
        <h1 className="font text-center text-2xl text-gray-600">
          {data && data[0].job_title}
        </h1>
        <div className="grid grid-cols-1 gap-4 mt-4">
          {/* {data.map((item) => ( */}
          <div className="relative flex items-start rounded-sm bg-white p-4 shadow-lg">
            <div className="my-auto flex h-12 w-12 items-center justify-center rounded-full border border-blue-100 bg-blue-50">
              <span className="text-3xl font-bold text-blue-500">
                {
                  // show index in reverse order
                  // data.length - index
                  5
                }
              </span>
            </div>

            <div className="ml-4 mt-1">
              <h2 className="font-semibold">Title</h2>
              <p className="text-sm text-gray-500">job.employer</p>
              <p className="mt-2 text-sm text-gray-500">Applied</p>
            </div>
          </div>
          {/* ))} */}
        </div>
      </div>
    </AuthLayout>
  );
};
