import React from "react";
import { Link } from "react-router-dom";

export const NoExInfo = ({ ...props }) => {

  return (
    <Link
      {...props}
      to={props.to}
      className="flex items-center hover:opacity-90 cursor-pointer justify-between p-4 mb-8 text-sm font-semibold text-purple-100 bg-purple-600 rounded-lg shadow-md focus:outline-none focus:shadow-outline-purple"
    >
      <div className="flex items-center justify-center">
        <div className="alert-icon flex items-center bg-blue-100 border-2 border-blue-500 justify-center h-10 w-10 flex-shrink-0 rounded-full mr-2">
          <span className="text-blue-600">
            <svg fill="currentColor" viewBox="0 0 20 20" className="h-6 w-6">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              ></path>
            </svg>
          </span>
        </div>
        <span className="text-base">{props.text}</span>
      </div>
      <span className="text-base">
        {props.callto ? props.callto : "Lets set it now"}
        <span className="ml-1">→</span>
      </span>
    </Link>
  );
};

