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
            <img
              className="h-16 w-16"
              src={company.logo}
              alt="company logo"
            />
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
        <div className="text-gray-800 md:flex ">
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
        <div className="mt-2 justify-between md:flex">
          <div className="font-xs text-gray-700">
            Patreon
            <span className="loc ml-2">Londontowne, MD.</span>
          </div>
          <div className="font-xs text-gray-700">
            Posted {relativeTime(posted)}
          </div>
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
              Work Level
            </div>
            <div className="hitespace-nowrap font-sans text-gray-900">
              Senior Level
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
          <div className="mb-7 font-semibold">Benefits</div>
          <div className="mb-7 leading-8">
            <ul className="list-inside list-disc">
              <li>
                Design and build the next generation of our product and visual
                identity
              </li>
              <li>
                Work with our founders and early customers to understand their
                needs and translate them into product requirements
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
