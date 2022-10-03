import React, { useState } from "react";
import { JobCard, JobLoading } from "../components/Card";
import GuestLayout from "./Layout/Guest";
import {
  jobDetails as DetailSection,
  JobDetailsLoading,
} from "../components/Card/jobDetails";
import { useQuery } from "react-query";
import { axiosInstance as API } from "../api/axiosInstance";
import classNames from "classnames";

export const Jobs = () => {
  // React query to fetch Jobs
  const { isLoading, data, refetch } = useQuery(
    "jobs",
    async () => {
      const res = await API.get(`jobs-public/`);
      return res.data;
    },
    {
      refetchOnWindowFocus: false,
      retry: 2,
    }
  );

  //Search job by title company or location

  //IF data is loaded set state to first job
  const [jobDetails, setJobDetails] = useState(data ? data[0] : null);

  //View detials of a job with id
  const showDetails = data?.filter((job) => job.id === jobDetails);
  //Set loading state
  // console.log(showDetails);


  return (
    <GuestLayout>
      <div>
        <h1>HEHE</h1>
        Jobs
      </div>

      <div className="wrapper bg-gray-200 px-4 pt-14 md:px-40">
        <div className="w-full flex-shrink-0 items-center whitespace-nowrap rounded-lg bg-gray-50 md:flex md:h-14 md:pl-5 ">
          <div className="relative h-14 w-full border-b-2 border-slate-200 md:border-b-0 md:border-none">
            <div className="flex h-full flex-row border-r-2 ">
              <span className="flex items-center rounded rounded-r-none bg-transparent px-3 font-bold">
                What
              </span>
              <input
                type="text"
                name="price"
                className="w-full  border-none bg-transparent py-2 font-bold text-gray-700 outline-none focus:outline-none"
                placeholder="Job title, keywords or company"
              />
            </div>
          </div>
          <div className="relative h-14 w-full border-b-2 border-slate-200 md:border-b-0 md:border-none">
            <div className="flex h-full flex-row border-r-2 ">
              <span className="flex  items-center rounded rounded-r-none bg-transparent px-3 font-bold">
                Where
              </span>
              <input
                type="text"
                name="price"
                className="w-full  border-none bg-transparent py-2 font-bold text-gray-700 outline-none focus:outline-none"
                placeholder="City, State, Zip code or country"
              />
            </div>
          </div>
          <div className=" h-full w-full py-0 text-sm font-medium md:mt-0 md:w-1/3 ">
            <button
              type="button"
              className="h-full w-full bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Find Jobs
            </button>
          </div>
        </div>
        <div className="mt-10 w-full">
          <div className="grid-wrapper">
            <div className="flex flex-grow flex-col md:pl-10">
              <div className="flex justify-between">
                <div className="text-sm font-semibold text-gray-800 ">
                  Showing 46 Jobs <br/>
                  <button className={classNames("text-blue-700 font-bold block md:hidden", jobDetails === null ? 'hidden' : '' )} onClick={() => setJobDetails(null)}>Back to List</button>

                </div>
                <div className="text-sm font-semibold text-gray-800">
                  Sort by: <span className="post-time">Newest Job </span>
                  <span className="menu-icon">▼</span>
                </div>
              </div>
              <div className="mt-4 md:flex md:flex-grow max-h-screen">
                <div className={classNames("wrapper md:block md:w-2/5 overflow-y-auto", jobDetails !== null ? 'hidden' : '' )}>
                  {
                    // Check if data is loading
                    isLoading ? (
                      <>
                        <JobLoading />
                        <JobLoading />
                        <JobLoading />
                        <JobLoading />
                      </>
                    ) : (
                      data &&
                      data.map((job) => (
                        <JobCard
                          key={job.id}
                          title={job.title}
                          company={job.employer}
                          location={job.work_location}
                          level={job.level}
                          type={job.type}
                          posted={job.created_at}
                          id={job.id}
                          setJobDetails={setJobDetails}
                        />
                      ))
                    )
                  }
                </div>
                <div className="rounded-md bg-gray-50 md:ml-4 md:w-3/5 overflow-y-auto ">
                  {jobDetails ? (
                    <DetailSection
                      title={showDetails[0]?.title}
                      company={showDetails[0]?.employer}
                      location={showDetails[0]?.work_location}
                      type={showDetails[0]?.type}
                      experience={showDetails[0]?.level}
                      posted={showDetails[0]?.created_at}
                      description={showDetails[0]?.description}
                      qualifications={showDetails[0]?.qualifications}
                      salary={showDetails[0]?.salary}
                      benefits={showDetails[0]?.benefits}
                      id={showDetails[0]?.id}
                    />
                  ) : (
                    <JobDetailsLoading />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </GuestLayout>
  );
};
