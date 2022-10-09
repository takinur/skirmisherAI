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
        <div className="mt-4 grid grid-cols-1 gap-4">
          <div className="wrapper flex w-full px-5 md:h-20 ">
            <div className="has-rank my-auto flex w-24 items-center justify-center">
              <span className="font-serif text-3xl font-bold text-gray-600">
                #
                {
                  // show index in reverse order
                  // data.length - index
                  5
                }
              </span>
            </div>
            <div className="relative grid w-full grid-cols-7 items-center gap-4 rounded-md bg-white shadow-lg">
              <div className="col-span-3 pl-4 font-semibold text-gray-600">
                Vladmir Putin
              </div>
              <div className="font-mono text-2xl font-semibold text-gray-600 ">
                {" "}
                70%{" "}
              </div>
              <div className="font-mono text-2xl font-semibold text-gray-600">
                50%{" "}
              </div>
              <div className="font-semibold text-gray-600"> 4 Days ago </div>
              <div className="font-semibold text-gray-600">Invite</div>
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};
