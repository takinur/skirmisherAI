import React from "react";
import { Link } from "react-router-dom";

export const JobCard = () => {


    const handleSave = () => {
        
        console.log("Saved");
    };

  return (
    <div
      className="relative mt-2 w-full cursor-pointer overflow-hidden rounded bg-gray-50 shadow-lg hover:bg-inherit"
    >
      <Link to="/find-work/125">
        <div className="px-6 py-4">
          <div className="header flex justify-between text-gray-700">
            <div className="mb-2 text-xl font-bold">Web Developer</div>
            <div className="mb-2 z-20 relative">
              <button className="right-0 top-0 h-8 w-8 rounded-full border-2 border-gray-500 hover:bg-gray-50" onClick={handleSave}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="m-auto h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>
              </button>
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
              <span className="text-md  bg-gray-200  px-3 py-1 font-medium text-gray-800 md:block">
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
                  className="mt-1 h-5 w-5"
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
      </Link>
    </div>
  );
};
