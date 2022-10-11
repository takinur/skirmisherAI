import React from "react";
import { relativeTime } from "../../hooks/useRelativeTime";

import { Disclosure, Transition } from "@headlessui/react";
import { FaChevronUp } from "react-icons/fa";

export const Applications = ({ ...item }) => {
  console.log("Applications", item);

  return (
    <>
      <Disclosure as="div" className="mt-2">
        {({ open }) => (
          <div className="w-full px-5 ">
            <div className="flex w-full md:h-20">
              <div className="has-rank my-auto flex w-24 items-center justify-center">
                <span className="font-serif text-3xl font-bold text-gray-600">
                  #{item.index + 1}
                </span>
              </div>
              <Disclosure.Button
                as="div"
                className={`${
                  open ? "rounded-t-md" : "rounded-md shadow-lg"
                } "relative " grid h-full w-full cursor-pointer grid-cols-7 items-center gap-4  bg-white`}
              >
                <div className="font-roboto col-span-3 pl-4 font-semibold text-gray-600">
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
                  {relativeTime(item.created_at)}
                </div>
                <div className="flex justify-between ">
                  <span className="cursor-pointer font-semibold text-green-600 hover:text-green-800 ">
                    Invite
                  </span>
                  <FaChevronUp
                    className={`${
                      open ? "rotate-180 transform" : "rotate-90 "
                    } mr-2 h-5 w-5 text-purple-500 `}
                  />
                </div>
              </Disclosure.Button>
            </div>
            <Transition
              enter="transition duration-500 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
              className="flex"
            >
              <div className="w-24"></div>
              <Disclosure.Panel
                as="div"
                className="mb-2 w-full rounded-b-md bg-gray-200 p-6 px-4 text-sm text-gray-500 opacity-100 shadow-lg"
              >
                <div className="mt-2 grid w-full border-t border-gray-200">
                  <div className="mr-auto ml-4 border-l-8 border-green-700 bg-green-50 px-3 ">
                    <h3 className="mb-2 text-3xl font-semibold leading-normal text-gray-700 ">
                      Personal Information
                    </h3>
                  </div>
                  <div className="ml-4 mt-4 w-full">
                    <div className="grid grid-cols-2 grid-rows-2 gap-4 md:grid-cols-3">
                      <div className="mb-2 ml-2 flex text-base font-medium leading-normal text-gray-700">
                        <p className="font-extrabold">Name</p>
                        <span className="ml-2"> {item.candidate.name} </span>
                      </div>
                      <div className="mb-2 ml-2 flex text-base font-medium leading-normal text-gray-700">
                        <p className="font-extrabold">Email</p>
                        <span className="ml-2">
                          {" "}
                          {item.candidate.email
                            ? item.candidate.email
                            : "Not Provided"}{" "}
                        </span>
                      </div>
                      <div className="mb-2 ml-2 flex text-base font-medium leading-normal text-gray-700">
                        <p className="font-extrabold">Phone</p>
                        <span className="ml-2">
                          {item.candidate.phone
                            ? item.candidate.phone
                            : "Not Provided"}
                        </span>
                      </div>
                      <div className="mb-2 ml-2 flex text-base font-medium leading-normal text-gray-700">
                        <p className="font-extrabold">Title</p>
                        <span className="ml-2">
                          {" "}
                          {item.candidate.designation}{" "}
                        </span>
                      </div>

                      <div className="mb-2 ml-2 flex text-base font-medium leading-normal text-gray-700">
                        <p className="font-extrabold">Portfolio</p>
                        <span className="ml-2 whitespace-nowrap">
                          {" "}
                          {item.candidate.website}{" "}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-2 grid w-full border-t border-gray-200">
                  <div className="mr-auto ml-4 border-l-8 border-green-700 bg-green-50 px-3 ">
                    <h3 className="mb-2 text-3xl font-semibold leading-normal text-gray-700 ">
                      Your Skills*
                    </h3>
                  </div>
                  <div className="mt-4 flex w-full flex-col ">
                    <div className="mt-2 space-x-1 space-y-2 p-1 text-justify">
                      <button className="rounded-full bg-gray-300 px-5 py-2 text-sm font-medium tracking-wider text-gray-600 shadow-sm hover:bg-gray-400 hover:shadow-2xl">
                        skill.name
                      </button>
                    </div>
                  </div>
                </div>
              </Disclosure.Panel>
            </Transition>
          </div>
        )}
      </Disclosure>
    </>
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
