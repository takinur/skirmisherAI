import React from "react";
import GuestLayout from "./Layout/Guest";

export const Jobs = () => {
  return (
    <GuestLayout>
      <div>
        <h1>HEHE</h1>
        Jobs
      </div>

      <div className="wrapper h-screen bg-gray-200 px-28 pt-14">
        <div class="flex h-14 w-full flex-shrink-0 items-center whitespace-nowrap rounded-lg bg-gray-50 pl-5">
          <div class="relative h-14 w-full">
            <div class="flex h-full flex-row border-r-2 ">
              <span class="flex  items-center rounded rounded-r-none bg-transparent px-3 font-bold">
                What
              </span>
              <input
                type="text"
                name="price"
                class="w-full  border-none bg-transparent py-2 font-bold text-gray-700 outline-none focus:outline-none"
                placeholder="Job title, keywords or company"
              />
            </div>           
          </div>
          <div class="relative h-14 w-full">
            <div class="flex h-full flex-row border-r-2 ">
              <span class="flex  items-center rounded rounded-r-none bg-transparent px-3 font-bold">
                Where
              </span>
              <input
                type="text"
                name="price"
                class="w-full  border-none bg-transparent py-2 font-bold text-gray-700 outline-none focus:outline-none"
                placeholder="City, State, Zip code or country"
              />
            </div>           
          </div>
          <div class="flex h-full w-1/2 items-center py-0 px-6 text-sm font-medium ">
            Londontowne, MD
          </div>
        </div>
      </div>
    </GuestLayout>
  );
};
