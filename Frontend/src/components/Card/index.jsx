import classNames from "classnames";
import React, { useState } from "react";
import { relativeTime } from "../../hooks/useRelativetime";

export const JobCard = ({
  id,
  title,
  company,
  location,
  type,
  posted,
  qualifications,
  setJobDetails,
  canApply,
}) => {
  const [saved, setSaved] = useState(false);

  const handleSave = (jobId) => {
    console.log("Saved", jobId);
    setSaved(!saved);
  };

  const handleItemClick = (jobId) => {
    //Set the job details after  2 seconds
    setJobDetails(null);
    setTimeout(() => {
      setJobDetails(jobId);
    }, 1500);
  };

  return (
    <div className="relative my-2 w-full cursor-pointer rounded-md bg-gray-50 py-5 px-4 hover:bg-gray-100 ">
      <div
        className="absolute top-0 left-0  h-full w-full"
        onClick={() => handleItemClick(id)}
      ></div>
      <div className="flex">
        {
          // Check if company logo is available
          company.logo ? (
            <img className="h-16 w-16" src={company.logo} alt="company logo" />
          ) : (
            <div className="flex h-16 w-16 items-center justify-center  bg-gray-700">
              <span className="text-4xl font-semibold text-gray-50">
                {company.company_name.charAt(0)}
              </span>
            </div>
          )
        }
        <div className="flex-1">
          <div className="mx-2 text-xl font-semibold text-gray-800">
            {title}
          </div>
          <div className="mx-2 mt-1 font-serif text-base">
            {company.company_name}
          </div>
          <div className="mx-2 mt-1 text-xs">
            {location} ({type})
          </div>
        </div>
        {
          //IF the user is candidate, show the save button
          canApply && (
            <div
              className="save-icon z-20 cursor-pointer "
              onClick={() => handleSave(2)}
            >
              <svg
                className={classNames(
                  "h-6 w-6 hover:fill-gray-800 hover:text-gray-800 ",
                  {
                    "text-gray-500": !saved,
                    "fill-gray-500 text-gray-500": saved,
                  }
                )}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20.8 4.6a5.5 5.5 0 00-7.7 0l-1.1 1-1-1a5.5 5.5 0 00-7.8 7.8l1 1 7.8 7.8 7.8-7.7 1-1.1a5.5 5.5 0 000-7.8z" />
              </svg>
            </div>
          )
        }
      </div>

      <div className="mt-3 flex justify-between">
        <div className="leading-8">
          {
            //If qualifications are not present, show "Not Specified"
            qualifications
              ? //extract each skill from skils string
                qualifications
                  .split(",")
                  .slice(0, 4)
                  .map((skill, index) => (
                    <span
                      key={index}
                      className="mr-2 rounded-full bg-gray-300 px-3 py-1 text-sm font-semibold text-gray-700"
                    >
                      {skill}
                    </span>
                  ))
              : "Skills Not Specified"

            //Show maximum 3 skills
          }
        </div>
        <div className="flex">
          <div className="wrapper mt-[7px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.4}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <span className="mx-1 mt-1 font-sans">{relativeTime(posted)}</span>
        </div>
      </div>
    </div>
  );
};

export const JobLoading = () => {
  return (
    <div className="relative my-2 w-full cursor-pointer rounded-md bg-gray-50 py-5 px-4 hover:bg-gray-100 ">
      <div className="flex animate-pulse">
        <div className="h-9 w-9 rounded-md bg-gray-200"></div>
        <div className="flex-1">
          <div className="mx-2 h-4 rounded-md bg-gray-200"></div>
          <div className="mx-2 mt-1 h-4 rounded-md bg-gray-200"></div>
          <div className="mx-2 mt-1 h-4 rounded-md bg-gray-200"></div>
        </div>
        <div className="save-icon z-20 cursor-pointer ">
          <div className="h-6 w-6 rounded-md bg-gray-200"></div>
        </div>
      </div>
      <div className="mt-3 flex justify-between">
        <div className="flex text-sm text-gray-800">
          <div className="mx-2 h-4 rounded-md bg-gray-200"></div>
          <div className="mx-2 h-4 rounded-md bg-gray-200"></div>
        </div>

        <div className="time flex">
          <div className="h-5 w-5 rounded-md bg-gray-200"></div>
          <div className="mx-2 h-4 rounded-md bg-gray-200"></div>
        </div>
      </div>
    </div>
  );
};
