import classNames from "classnames";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export const JobCard = ({ id, title, company, location, type, posted, setJobDetails }) => {
  const [saved, setSaved] = useState(true);

  //Format date to hours ago
  const date = new Date(posted);
  const hours = Math.floor((new Date() - date) / 1000 / 60 / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  const time = () => {
    if (hours < 24) {
      return hours + " hours ago";
    } else if (days < 30) {
      return days + " days ago";
    } else if (months < 12) {
      return months + " months ago";
    } else {
      return years + " years ago";
    }
  };

  const handleSave = (id) => {
    console.log("Saved", id);
    setSaved(!saved);
  };

  const handleItemClick = (id) => {
    console.log("Clicked");
    setJobDetails(id);
  };

  return (
    <div className="relative my-2 w-full cursor-pointer rounded-md bg-gray-50 py-5 px-4 hover:bg-gray-100 ">
      <div
        className="absolute top-0 left-0  h-full w-full"
        onClick={() => handleItemClick(id)}
      ></div>
      <div className="flex">
        <svg
          className="h-9 w-9 text-white"
          fill="none"
          viewBox="0 -13 512 512"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g fill="#feb0a5">
            <path d="M256 92.5l127.7 91.6L512 92 383.7 0 256 91.5 128.3 0 0 92l128.3 92zm0 0M256 275.9l-127.7-91.5L0 276.4l128.3 92L256 277l127.7 91.5 128.3-92-128.3-92zm0 0" />
            <path d="M127.7 394.1l128.4 92 128.3-92-128.3-92zm0 0" />
          </g>
          <path
            d="M512 92L383.7 0 256 91.5v1l127.7 91.6zm0 0M512 276.4l-128.3-92L256 275.9v1l127.7 91.5zm0 0M256 486.1l128.4-92-128.3-92zm0 0"
            fill="#feb0a5"
          />
        </svg>
        <div className="flex-1">
          <div className="mx-2 text-xl font-semibold text-gray-800">
            {title}
          </div>
          <div className="mx-2 mt-1 text-xs">{company}</div>
          <div className="mx-2 mt-1 text-xs">{location}</div>
        </div>
        <div
          className="save-icon z-20 cursor-pointer "
          onClick={() => handleSave(2)}
        >
          <svg
            className={classNames(
              "h-6 w-6 hover:fill-red-500 hover:text-red-500 ",
              { "text-gray-500": saved, "fill-gray-500 text-gray-500": !saved }
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
      </div>
      <div className="mt-3 flex justify-between">
        <div className="flex text-sm text-gray-800">
          <span className="mx-2 block bg-gray-200 px-3 py-1 font-medium text-gray-800">
            {type}
          </span>
          <span className="mx-2 block bg-gray-200 px-3 py-1 font-medium text-gray-800">
            Full Time
          </span>
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
          <span className="mx-1 mt-1 font-sans">{time()}</span>
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
