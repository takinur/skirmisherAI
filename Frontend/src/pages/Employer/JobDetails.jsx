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
      <div className="flex h-24 flex-col md:flex-row mt-8 bg-white">
        Search sort filter Et cetra
      </div>

      <div className="wrapper">
        <div className="justify-between px-8 md:flex mt-4">
          <div className="text-2xl text-gray-600 md:ml-20">
            {data && data[0].job_title}
          </div>
          <div className=" text-sm font-semibold text-gray-800">
            Sort by: <span className="post-time">Most Suitable</span>
            <span className="menu-icon">▼</span>
          </div>
        </div>
        <div className="mt-4">
          <div className="wrapper flex w-full px-5 md:h-20 ">
            <div className="has-rank my-auto flex w-24 items-center justify-center">
              <span className="font-serif text-3xl font-bold text-gray-600">
                {/* # */}
              </span>
            </div>
            <div className="relative grid w-full grid-cols-7 items-center gap-4">
              <div className="col-span-3 pl-4 font-bold text-gray-600">
                Candidate Name
              </div>
              <div className="font-bold text-gray-600 ">Skill Match</div>
              <div className=" font-bold text-gray-600">Suitability</div>
              <div className="font-bold text-gray-600"> Applied </div>
              <div className="font-bold text-gray-600"> Action </div>
            </div>
          </div>
        </div>
        <div className="mt-1 grid grid-cols-1 gap-4">
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
              <div className="font-mono text-xl font-semibold text-gray-600 ">
                {" "}
                70%{" "}
              </div>
              <div className="flex font-mono text-xl font-semibold text-gray-600">
                <svg
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 496 512"
                  className="mr-1 w-5 text-green-500"
                >
                  <path
                    fill="currentColor"
                    d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 448c-110.3 0-200-89.7-200-200S137.7 56 248 56s200 89.7 200 200-89.7 200-200 200zm-80-216c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32zm160 0c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32zm4 72.6c-20.8 25-51.5 39.4-84 39.4s-63.2-14.3-84-39.4c-8.5-10.2-23.7-11.5-33.8-3.1-10.2 8.5-11.5 23.6-3.1 33.8 30 36 74.1 56.6 120.9 56.6s90.9-20.6 120.9-56.6c8.5-10.2 7.1-25.3-3.1-33.8-10.1-8.4-25.3-7.1-33.8 3.1z"
                    class=""
                  ></path>
                </svg>
                50%
              </div>
              <div className="font-semibold text-gray-600"> 4 Days ago </div>
              <div className="cursor-pointer font-semibold text-green-600 hover:text-green-800 ">
                Invite
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};
