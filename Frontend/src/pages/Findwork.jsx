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

import { SearchJobs } from "../components/Search/SearchJobs";
import { useCandProfile } from "../hooks/useProfile";


//EH? Check for user auth 
//Apply for Job model view and react
//Wishlist Job


export const Findwork = () => {
  const [searchValue, SetSearchValue] = useState("");

  const { data: profile } = useCandProfile();

  const canApply = profile !== undefined || null ? true : false;
  // const canApply = false;
  console.log('Can Apply?', canApply);


  // React query to fetch Jobs and filter them
  const { isLoading, data, refetch } = useQuery(
    ["jobs"],
    async () => {
      const res = await API.get(`jobs-public/`);
      return res.data;
    },
    {
      refetchOnWindowFocus: false,
      retry: 2,
      select: (jobs) =>
        jobs.filter(
          (job) =>
            job.title.toLowerCase().includes(searchValue.toLowerCase()) ||
            job.employer?.company_name
              .toLowerCase()
              .includes(searchValue.toLowerCase()) ||
            (job.work_location &&
              job.work_location
                .toLowerCase()
                .includes(searchValue.toLowerCase())) ||
            (job.qualifications &&
              job.qualifications
                .toLowerCase()
                .includes(searchValue.toLowerCase())) ||
            (job.type &&
              job.type.toLowerCase().includes(searchValue.toLowerCase()))
        ),
    }
  );

  // console.log("Fetchd Jobs", data);

  //IF data is loaded set state to first job
  const [jobDetails, setJobDetails] = useState(data ? data[0]?.id : null);

  //View detials of a job with id
  const showDetails = data?.filter((job) => job.id === jobDetails);
  // console.log("Detials", showDetails);



  return (
    <GuestLayout>
      <div>
        <h1>HEHE</h1>
        Jobs
      </div>

      <div className="wrapper bg-gray-200 px-4 pt-14 md:px-40">
        <div className="w-full flex-shrink-0 items-center whitespace-nowrap rounded-lg bg-gray-50 md:flex md:h-14 md:pl-5 ">
          <SearchJobs SetSearchValue={SetSearchValue} />
        </div>
        <div className="mt-10 w-full">
          <div className="grid-wrapper">
            <div className="flex flex-grow flex-col md:pl-10">
              <div className="flex justify-between">
                <div className="text-sm font-semibold text-gray-800 ">
                  {
                    //  If arry empty show 0 else show length
                    data && data.length > 0
                      ? `Showing ` + data.length + ` Jobs`
                      : `oh no Jobs! Try another search`
                  }
                  <br />
                  <button
                    className={classNames(
                      "block font-bold text-blue-700 md:hidden",
                      jobDetails === null ? "hidden" : ""
                    )}
                    onClick={() => setJobDetails(null)}
                  >
                    Back to List
                  </button>
                </div>
                <div className="text-sm font-semibold text-gray-800">
                  Sort by: <span className="post-time">Newest Job </span>
                  <span className="menu-icon">▼</span>
                </div>
              </div>
              <div className="mt-4 md:max-h-screen md:flex md:flex-grow">
                <div
                  className={classNames(
                    "wrapper overflow-y-auto md:block md:w-2/5",
                    jobDetails !== null ? "hidden" : ""
                  )}
                >
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
                          qualifications={job.qualifications}
                          setJobDetails={setJobDetails}
                          canApply={canApply}
      
                        />
                      ))
                    )
                  }
                </div>
                <div className="overflow-y-auto rounded-md bg-gray-50 md:ml-4 md:w-3/5 ">
                  {jobDetails && jobDetails !== undefined ? (
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
                      canApply={canApply}
                      applicant={profile?.id}
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
