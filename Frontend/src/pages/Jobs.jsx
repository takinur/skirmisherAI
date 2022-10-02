import React from "react";
import { JobCard } from "../components/Card";
import GuestLayout from "./Layout/Guest";
import { jobDetails as DetailSection } from "../components/Card/jobDetails";


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
            <div className="flex flex-grow flex-col md:pl-10">
              <div className="flex justify-between">
                <div className="text-sm font-semibold text-gray-800 ">
                  Showing 46 Jobs
                </div>
                <div className="text-sm font-semibold text-gray-800">
                  Sort by: <span className="post-time">Newest Job </span>
                  <span className="menu-icon">▼</span>
                </div>
              </div>
              <div className="mt-4 md:flex md:flex-grow">
                <div className="wrapper md:w-2/5 ">
                  <JobCard />
                  <JobCard />
                  <JobCard />
                </div>
                <div className="rounded-md bg-gray-50 md:ml-4 md:w-3/5">
                  <DetailSection />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </GuestLayout>
  );
};
