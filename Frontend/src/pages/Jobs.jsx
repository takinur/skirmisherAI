import React from "react";
import { FaClock } from "react-icons/fa";
import GuestLayout from "./Layout/Guest";

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
          <div className="relative w-full cursor-pointer overflow-hidden rounded bg-gray-50 shadow-lg hover:bg-inherit">
            <div className="px-6 py-4">
              <div className="header flex justify-between text-gray-700">
                <div className="mb-2 text-xl font-bold">Web Developer</div>
                <div className="mb-2">
                  <div className="right-0 top-0 h-8 w-8 rounded-full border-2 border-gray-500 hover:bg-gray-50">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="m-auto mt-1 h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div className=" text-gray-700">
                <div className="mb-2 text-sm font-semibold">
                  <span className="text-gray-700">Google, California</span>
                </div>
                <p className="text-base text-gray-700">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Voluptatibus quia, nulla! Maiores et perferendis eaque,
                  exercitationem praesentium nihil.
                </p>
              </div>
              <div className="mt-2">
                <div className="flex justify-between text-gray-700">
                  <span className="text-md hidden bg-gray-200  px-3 py-1 font-medium text-gray-800 md:block">
                    Remote
                  </span>
                  <div className="time flex">
                    {" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-5 w-5 mt-1"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    12h ago
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
