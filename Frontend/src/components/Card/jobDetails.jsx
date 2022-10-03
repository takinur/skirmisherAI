import React from "react";
import { relativeTime } from "../../hooks/useRelativetime";

export const jobDetails = ({
  title,
  company,
  description,
  experience,
  salary,
  type,
  posted,
  qualifications,
  benefits,
  location,
}) => {
  return (
    <>
      <div className="flex h-40 w-full items-center justify-center rounded-t-md bg-gray-300 ">
        <span className="font-mono font-semibold text-gray-700">
          {company.slogan}
        </span>
      </div>
      <div className="z-10 -mt-8 h-16 w-16 bg-gray-100 shadow-md">
        {
          // Check if company logo is available
          company.logo ? (
            <img className="h-16 w-16" src={company.logo} alt="company logo" />
          ) : (
            <div className="flex h-16 w-16 items-center justify-center  bg-green-700">
              <span className="text-4xl font-semibold text-gray-50">
                {company.company_name.charAt(0)}
              </span>
            </div>
          )
        }
      </div>
      <button className="float-right -mt-6 ml-4 mr-2 rounded-md bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800">
        Apply Now
      </button>
      <div className="px-8 pt-12">
        <div className="flex text-gray-800 ">
          <div className="text-2xl font-bold">{title}</div>
          <div className="ml-auto flex items-center">
            <svg
              className="h-6 w-6"
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
            <svg
              className="ml-2 h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4" />
            </svg>
          </div>
        </div>
        <div className="mt-2 flex justify-between">
          <div className="font-xs text-gray-700">
            {company.company_name},
            <span className="loc ml-2">{company.location}</span>
          </div>
          <div className="font-xs text-gray-700">
            Posted {relativeTime(posted)}
          </div>
        </div>
        <div className="font-xs mt-2 text-gray-700 ">
          <span className="loc flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="mr-2 h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z"
              />
            </svg>
            {company.size}
          </span>
          <span className="loc mt-1 flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="mr-2 h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
              />
            </svg>
            {company.website}
          </span>
        </div>
        <div className="mt-5 justify-between rounded-2xl bg-gray-300 px-6 py-1 md:flex md:h-16">
          <div className="leading-7">
            <div className="whitespace-nowrap font-semibold text-gray-800">
              Experience
            </div>
            <div className="hitespace-nowrap font-sans text-gray-900">
              {experience ? experience : "No Experience"}
            </div>
          </div>
          <div className="leading-7">
            <div className="whitespace-nowrap font-semibold text-gray-800">
              Employee Type
            </div>
            <div className="hitespace-nowrap font-sans text-gray-900">
              {type ? type : "Full Time"}
            </div>
          </div>
          <div className="leading-7">
            <div className="whitespace-nowrap font-semibold text-gray-800">
              Salary
            </div>
            <div className="hitespace-nowrap font-sans text-gray-900">
              {
                //If dollar sign is not present in salary, add it
                salary && !salary.includes("$") ? "$" + salary : salary
              }
            </div>
          </div>
        </div>
        <div className="mt-8">
          <div className="mb-7 font-semibold">Overview</div>
          <div className="mb-7 leading-8">{description}</div>
          <div className="mb-2 font-semibold">Qualifications</div>
          <div className="mb-7 leading-8">
            {
              //If qualifications are not present, show "Not Specified"
              qualifications
                ? //extract each skill from skils string
                  qualifications.split(",").map((skill, index) => (
                    <span
                      key={index}
                      className="mr-2 rounded-full bg-gray-300 px-3 py-1 text-sm font-semibold text-gray-700"
                    >
                      {skill}
                    </span>
                  ))
                : "Not Specified"
            }
          </div>
          <div className="mb-2 font-semibold">Benefits</div>
          <div className="mb-7 leading-8">
            {
              //If benefits are not present, show "Not Specified"
              benefits ? benefits : "Not Specified"
            }
          </div>
          <div className="mb-2 font-semibold">Work Location</div>
          <div className="mb-7 leading-8">
            {
              //If location are not present, show "Not Specified"
              location ? location : "Not Specified"
            }
          </div>
        </div>
      </div>
    </>
  );
};
