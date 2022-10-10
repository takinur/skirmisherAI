import React from "react";
import { relativeTime } from "../../hooks/useRelativeTime";

export const Applications = ({ ...item }) => {
  console.log("Applications", item);

  return (
    <div className="flex w-full px-5 md:h-20 ">
      <div className="has-rank my-auto flex w-24 items-center justify-center">
        <span className="font-serif text-3xl font-bold text-gray-600">
          #{item.index + 1}
        </span>
      </div>
      <div className="relative grid w-full grid-cols-7 items-center gap-4 rounded-md bg-white shadow-lg">
        <div className="col-span-3 pl-4 font-semibold text-gray-600">
          {item.candidate.name}
        </div>
        <div className="font-mono text-xl font-medium text-gray-600 ">
          {item?.skill_score &&
            item.skill_score.toString().replace(/\.?0+$/, "")}
          %
        </div>
        <div className="flex font-mono text-xl font-semibold text-gray-600">
          <svg
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 496 512"
            className="mr-1 w-5 text-green-500"
          >
            <path
              fill="currentColor"
              d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 448c-110.3 0-200-89.7-200-200S137.7 56 248 56s200 89.7 200 200-89.7 200-200 200zm-80-216c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32zm160 0c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32zm4 72.6c-20.8 25-51.5 39.4-84 39.4s-63.2-14.3-84-39.4c-8.5-10.2-23.7-11.5-33.8-3.1-10.2 8.5-11.5 23.6-3.1 33.8 30 36 74.1 56.6 120.9 56.6s90.9-20.6 120.9-56.6c8.5-10.2 7.1-25.3-3.1-33.8-10.1-8.4-25.3-7.1-33.8 3.1z"
            ></path>
          </svg>
          {item?.total_score &&
            item.total_score.toString().replace(/\.?0+$/, "")}
          %
        </div>
        <div className="font-semibold text-gray-600">
          {" "}
          {relativeTime(item.created_at)}{" "}
        </div>
        <div className="cursor-pointer font-semibold text-green-600 hover:text-green-800 ">
          Invite View Profile
        </div>
      </div>
    </div>
  );
};

export const ApplicationsSkeleton = () => {
  return (
    <div className="flex w-full animate-pulse px-5 md:h-20">
      <div className="has-rank my-auto flex w-24 items-center justify-center">
        <span className="font-serif text-3xl font-bold text-gray-600">
          <div className="h-6 w-6 rounded-md bg-gray-200"></div>
        </span>
      </div>
      <div className="relative grid w-full grid-cols-7 items-center gap-4 rounded-md bg-white shadow-lg">
        <div className="col-span-3 pl-4 font-semibold text-gray-600">
          <div className="flex w-full items-center space-x-2">
            <div className="h-2.5 w-32 rounded-full bg-gray-700"></div>
            <div className="h-2.5 w-24 rounded-full bg-gray-600"></div>
          </div>
        </div>
        <div className="font-mono text-xl font-medium text-gray-600 ">
          <div className="flex w-full items-center space-x-2">
            <div className="h-2.5 w-32 rounded-full bg-gray-700"></div>
          </div>
        </div>
        <div className="flex font-mono text-xl font-semibold text-gray-600">
          <div className="flex w-full items-center space-x-2">
            <div className="h-2.5 w-32 rounded-full bg-gray-700"></div>
          </div>
        </div>
        <div className="font-semibold text-gray-600">
          {" "}
          <div className="flex w-full items-center space-x-2">
            <div className="h-2.5 w-32 rounded-full bg-gray-700"></div>
          </div>{" "}
        </div>
        <div className="cursor-pointer font-semibold text-green-600 hover:text-green-800 ">
          <div className="flex w-full items-center space-x-2">
            <div className="h-2.5 w-32 rounded-full bg-gray-700"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
