import React from "react";
import { FaClock } from "react-icons/fa";
import { JobCard } from "../components/Card";
import GuestLayout from "./Layout/Guest";

import "./demo.css";

export const Jobs = () => {
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
            <div className="flex flex-grow flex-col pl-10">
              <div className="flex justify-between">
                <div className="text-sm font-semibold text-gray-800 ">
                  Showing 46 Jobs
                </div>
                <div className="text-sm font-semibold text-gray-800">
                  Sort by: <span className="post-time">Newest Job </span>
                  <span className="menu-icon">▼</span>
                </div>
              </div>
              <div className="mt-4 flex flex-grow">
                <div className="wrapper w-2/5 ">
                  <JobCard />
                  <JobCard />
                  <JobCard />
                </div>
                <div className="ml-4 w-3/5 rounded-md bg-gray-50">
                  <div className="flex h-40 w-full items-center justify-center rounded-t-md bg-gray-300 ">
                    <span className="font-mono font-semibold text-gray-700">
                      Tagline One the shoulder pfff
                    </span>
                  </div>
                  <div className="z-10 -mt-8 h-16 w-16 bg-gray-100 shadow-md">
                    LOGO
                  </div>
                  <button className="float-right -mt-6 ml-4 mr-2 rounded-md bg-blue-700 px-4 py-2 text-sm font-semibold text-white">
                    Apply Now
                  </button>
                  <div className="px-8 pt-12">
                    <div className="flex text-gray-800 ">
                      <div className="text-2xl font-bold">UI /UX Designer</div>
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
                        Patreon
                        <span className="loc ml-2">Londontowne, MD.</span>
                      </div>
                      <div className="font-xs text-gray-700">
                        Posted 8 days ago
                      </div>
                    </div>
                    <div className="mt-5 flex h-16 justify-between rounded-2xl bg-gray-300 px-6 py-1">
                      <div className="leading-7">
                        <div className="whitespace-nowrap font-semibold text-gray-800">
                          Experience
                        </div>
                        <div className="hitespace-nowrap font-sans text-gray-900">
                          Minimum 1 Year
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
                          Full time
                        </div>
                      </div>
                      <div className="leading-7">
                        <div className="whitespace-nowrap font-semibold text-gray-800">
                          Salary
                        </div>
                        <div className="hitespace-nowrap font-sans text-gray-900">
                          $2150.0 / Month
                        </div>
                      </div>
                    </div>
                    <div className="mt-8">
                      <div className="mb-7 font-semibold">Overview</div>
                      <div className="mb-7 leading-8">
                        We believe that design (and you) will be critical to the
                        company's success. You will work with our founders and
                        our early customers to help define and build our product
                        functionality, while maintaining the quality bar that
                        customers have come to expect from modern SaaS
                        applications. You have a strong background in product
                        design with a quantitavely anf qualitatively analytical
                        mindset. You will also have the opportunity to craft our
                        overall product and visual identity and should be
                        comfortable to flex into working.
                      </div>
                      <div className="mb-7 font-semibold">Benefits</div>
                      <div className="mb-7 leading-8">
                        <ul className="list-inside list-disc">
                          <li>
                            Design and build the next generation of our product
                            and visual identity
                          </li>
                          <li>
                            Work with our founders and early customers to
                            understand their needs and translate them into
                            product requirements
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </GuestLayout>
  );
};
