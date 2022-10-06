import React from "react";

export const Applied = () => {
  return (
    <div className="relative flex items-start rounded-xl bg-white p-4 shadow-lg">
      <div className="absolute top-0 right-0 rounded-tr-xl bg-green-600 px-2 py-1 text-white">
        <span className="text-xs">Applied</span>
      </div>

      <div className="my-auto flex h-12 w-12 items-center justify-center rounded-full border border-blue-100 bg-blue-50">
        <span className="text-3xl font-bold text-blue-500">1</span>
      </div>

      <div className="ml-4 mt-3">
        <h2 className="font-semibold">
          React DeveloperReact Developer full stack full stack
        </h2>
        <p className="text-sm text-gray-500">Google Inc</p>
        <p className="mt-2 text-sm text-gray-500">Applied 4 days ago</p>
      </div>
    </div>
  );
};
