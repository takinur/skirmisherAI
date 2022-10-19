import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { relativeTime } from "../../hooks/useRelativeTime";

import { Disclosure, Transition } from "@headlessui/react";
import { FaChevronUp } from "react-icons/fa";
import HeadlessModal from "../Modal";

import Label from "../Label";
import Input from "../Input";
import classNames from "classnames";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { useAxiosPrivate } from "../../hooks/useAxiosPrivate";
import { useEffect } from "react";

import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { Link } from "react-router-dom";

export const Applications = (item) => {
  const API = useAxiosPrivate();

  const [isModal, setModal] = useState(false);
  const [dateTime, setDateTime] = useState();

  const closeModal = () => {
    setModal(false);
  };
  // console.log("Applications", item);
  //Check Status
  const isInvited = item.status.toLowerCase() === "invited";

  //Resume Download
  const hanldeViewResume = () => {
    // Create Resume URL with Media URL from ENV ~ Remove Double Quotes
    const media_url = import.meta.env.VITE_MEDIA_URL;
    const resume_url = `${media_url}${item.candidate.resume_file.replace(
      /['"]+/g,
      ""
    )}`;

    const linkSource = `${resume_url}`;
    const downloadLink = document.createElement("a");
    // const fileName = `${item.candidate.name}_${item.job_title}.pdf`;
    downloadLink.href = linkSource;
    // downloadLink.download = fileName;
    //Open in new tab
    downloadLink.target = "_blank";

    downloadLink.click();
  };

  //React hook form
  const { register, handleSubmit } = useForm();

  // TODO: Update Job Status
  const addMutation = useMutation(
    async (data) => await API.post("/v1/invitation/", data)
  );

  const handleInvite = (data) => {
    data.job_application = item.id;
    //Generate Invitation Code
    data.meet_url = Math.random().toString(36).substring(2, 15);

    if (!dateTime) {
      toast.error("Please select a date");
      return;
    }

    data.schedule = format(dateTime, "yyyy-MM-dd");

    addMutation.mutate(data);
  };
  //Status
  useEffect(() => {
    if (addMutation.isSuccess) {
      toast.success("Invitation Sent");
      setModal(false);
      window.location.reload();
    }
    if (addMutation.isError) {
      toast.error("Something went wrong");
      console.log("Error", addMutation.error);
    }
  }, [addMutation.isSuccess, addMutation.isLoading, addMutation.isError]);

  const isDisabled = addMutation.isLoading || addMutation.isSuccess;

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
                  {item?.total_score > 55 ? (
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
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="mr-1 w-6 text-red-600"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
                      />
                    </svg>
                  )}
                  {item?.total_score &&
                    item.total_score.toString().replace(/\.?0+$/, "")}
                  %
                </div>
                <div className="font-semibold text-gray-600">
                  {relativeTime(item.created_at)}
                </div>
                <div className="flex justify-between ">
                  {isInvited ? (
                    <span className="cursor-pointer font-semibold text-red-600 hover:text-red-800 ">
                      Shortlisted
                    </span>
                  ) : (
                    <span className=" cursor-pointer font-semibold text-green-600 hover:text-green-800 ">
                      Invite
                    </span>
                  )}
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
              <div className="important-for-equal-space w-24"></div>
              <Disclosure.Panel
                as="div"
                className="mb-2 w-full select-text rounded-b-md bg-gray-200 p-6 px-4 text-sm text-gray-500 opacity-100 shadow-lg "
              >
                <section className="mt-2 grid w-full ">
                  <div className="ml-4 flex justify-between">
                    <div className="border-l-8 border-green-700 bg-green-50 px-3 ">
                      <h3 className="my-1 text-2xl font-semibold leading-normal text-gray-700 ">
                        Personal Information
                      </h3>
                    </div>
                    <div className="flex items-center">
                      <div className="flex sm:mt-0 md:px-3">
                        <button
                          onClick={hanldeViewResume}
                          className="mb-1 rounded bg-teal-500 px-4 py-2 text-xs font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-md focus:outline-none active:bg-green-600 sm:mr-2"
                          type="button"
                        >
                          View Original Resume
                        </button>
                        {isInvited ? (
                          <div className="bg-green-300 p-4">
                            <span className="font-bold">Interview Info:</span>
                            <span className="mx-2">
                              {item?.invitation.schedule}
                            </span>
                            <Link
                              className="font-extrabold text-teal-700"
                              to={`/meet/${item?.invitation.meet_url}`}
                            >
                              Join
                            </Link>
                          </div>
                        ) : (
                          <button
                            onClick={() => setModal(true)}
                            className="mb-1 rounded bg-green-500 px-4 py-2 text-xs font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-md focus:outline-none active:bg-green-600 sm:mr-2"
                            type="button"
                          >
                            Invite
                          </button>
                        )}
                      </div>
                    </div>
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
                        <a
                          href={
                            //If link does not contain http:// or https://, add it
                            item.candidate.website
                              ? item.candidate.website.includes("http")
                                ? item.candidate.website
                                : "http://" + item.candidate.website
                              : "#"
                          }
                          target="_blank"
                          className="ml-2 hover:text-blue-800 "
                        >
                          {item.candidate.website
                            ? item.candidate.website
                            : "Not Provided"}
                        </a>
                      </div>
                      <div className="mb-2 ml-2 flex text-base font-medium leading-normal text-gray-700">
                        <p className="font-extrabold">Location</p>
                        <span className="ml-2">
                          {" "}
                          {item.candidate.location
                            ? item.candidate.location
                            : "Not Provided"}{" "}
                        </span>
                      </div>
                    </div>
                  </div>
                </section>
                <section className="mt-4 grid w-full ">
                  <div className="mr-auto ml-4 border-l-8 border-green-700 bg-green-50 px-3 ">
                    <h3 className="my-1 text-2xl font-semibold leading-normal text-gray-700 ">
                      Professional Skills
                    </h3>
                  </div>
                  <div className="mt-2 flex w-full flex-col ">
                    <div className="mt-2 ml-4 space-x-1 space-y-2 p-1 text-justify">
                      {item.candidate.skills.map((skill) => (
                        <button
                          disabled
                          className="rounded-full bg-gray-300 px-5 py-2 text-sm font-medium tracking-wider text-gray-600 shadow-sm hover:bg-gray-400 hover:shadow-2xl"
                        >
                          {skill.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </section>
                <section className="mt-8 grid w-full ">
                  <div className="mr-auto ml-4 border-l-8 border-green-700 bg-green-50 px-3 ">
                    <h3 className="my-1 text-2xl font-semibold leading-normal text-gray-700 ">
                      Work Experience
                    </h3>
                  </div>
                  <div className="ml-4 mt-4 w-full">
                    <div className="grid grid-cols-2 grid-rows-2 gap-4">
                      {
                        //If work experience is not provided, show "Not Provided"
                        item.candidate.experiences.length !== 0 ? (
                          item.candidate.experiences.map((experience) => (
                            <>
                              <div className="mb-2 ml-2 flex text-base font-medium leading-normal text-gray-700">
                                <p className="font-extrabold">Name</p>
                                <span className="ml-2">
                                  {" "}
                                  {experience.name}{" "}
                                </span>
                              </div>
                              <div className="mb-2 ml-2 flex text-base font-medium leading-normal text-gray-700">
                                <p className="font-extrabold">Years</p>
                                <span className="ml-2">
                                  {" "}
                                  {experience.total != 0
                                    ? experience.total
                                    : "Not Provided"}{" "}
                                </span>
                              </div>
                            </>
                          ))
                        ) : (
                          <div className="mb-2 ml-2 text-center text-base font-medium leading-normal text-gray-700">
                            <p className="font-extrabold">
                              No Experience Provided !{" "}
                            </p>
                          </div>
                        )
                      }
                    </div>
                  </div>
                </section>
                <section className="mt-2 grid w-full ">
                  <div className="mr-auto ml-4 border-l-8 border-green-700 bg-green-50 px-3 ">
                    <h3 className="my-1 text-2xl font-semibold leading-normal text-gray-700 ">
                      Education
                    </h3>
                  </div>
                  <div className="ml-4 mt-4 w-full">
                    <div className="grid grid-cols-2 grid-rows-2 gap-4">
                      {item.candidate.educations.length !== 0 ? (
                        item.candidate.educations.map((education) => (
                          <div className="mb-2 ml-2 flex text-base font-medium leading-normal text-gray-700">
                            <p className="font-extrabold">Details</p>
                            <span className="ml-2">
                              {
                                //Remove parenthesis from name
                                education.name
                                  .replace(/[\])}[{(]/g, "")
                                  //Remove single quotes from name
                                  .replace(/'/g, "")
                              }
                            </span>
                          </div>
                        ))
                      ) : (
                        <div className="mb-2 ml-2 text-center text-base font-medium leading-normal text-gray-700">
                          <p className="font-extrabold">
                            No Education Provided !{" "}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </section>
                <section className="mt-2 grid w-full ">
                  <div className="mr-auto ml-4 border-l-8 border-green-700 bg-green-50 px-3 ">
                    <h3 className="my-1 text-2xl font-semibold leading-normal text-gray-700 ">
                      Projects
                    </h3>
                  </div>
                  <div className="ml-4 mt-4 w-full">
                    <div className="gap-4">
                      {item.candidate.projects.length !== 0 ? (
                        //Join all projects into one string
                        <div className="mb-2 ml-2 flex text-base font-medium leading-normal text-gray-700">
                          <p className="font-extrabold">Details</p>
                          <span className="ml-2 w-full">
                            {item.candidate.projects
                              .map((project) => project.details)
                              .join(", ")}
                          </span>
                        </div>
                      ) : (
                        <div className=" ml-2 text-center text-base font-medium leading-normal text-gray-700">
                          <p className="font-extrabold">
                            No Projects Provided !
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </section>
                <section className="mt-4 grid w-full ">
                  <div className="mr-auto ml-4 border-l-8 border-green-700 bg-green-50 px-3 ">
                    <h3 className="my-1 text-2xl font-semibold leading-normal text-gray-700 ">
                      Social Links
                    </h3>
                  </div>
                  <div className="ml-4 mt-4 w-full">
                    <div className="grid grid-cols-2 grid-rows-3 gap-4">
                      {item.candidate.socials.length !== 0 ? (
                        item.candidate.socials.map((social) => (
                          <div className="wrapper font-mono">
                            <a
                              href={
                                //If link does not contain http:// or https://, add it
                                social.name
                                  ? social.name.includes("http")
                                    ? social.name
                                    : "http://" + social.name
                                  : "#"
                              }
                              target="_blank"
                              className="ml-2 hover:text-blue-800 "
                            >
                              {social.name}{" "}
                            </a>
                          </div>
                        ))
                      ) : (
                        <div className="mb-2 ml-2 text-center text-base font-medium leading-normal text-gray-700">
                          <p className="font-extrabold">
                            No Social Links Provided !
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </section>
              </Disclosure.Panel>
            </Transition>
          </div>
        )}
      </Disclosure>
      <HeadlessModal isOpen={isModal} closeModal={closeModal}>
        <div className="flex-auto justify-center p-5 text-center">
          <h2 className="py-4 text-xl font-bold ">Are you sure to invite?</h2>
          <form onSubmit={handleSubmit(handleInvite)} className="">
            <div className="mt-1 w-full text-left">
              <Label className="mb-2" htmlFor="schedule">
                {dateTime !== undefined
                  ? `Schedule Interview for ${dateTime.toDateString() || ""}`
                  : "Schedule Interview"}
              </Label>
              <div className="flex w-full items-start justify-center ">
                <DayPicker
                  mode="single"
                  selected={dateTime}
                  onSelect={setDateTime}
                  className="ml-4"
                />
              </div>
            </div>
            <div className="mt-4 w-full text-left">
              <Label htmlFor="remarks">Remarks (Optional) </Label>
              <Input
                id="remarks"
                type="text"
                className="mt-1 block w-full"
                {...register("remarks")}
                placeholder="If any remarks"
              />
            </div>
            <div className="mt-2 space-x-4 p-3 text-center md:block">
              <button
                className={classNames(
                  "mb-2 rounded-full border bg-white px-5 py-2 text-sm font-medium tracking-wider text-gray-600 shadow-sm hover:bg-gray-100 hover:shadow-lg md:mb-0",
                  {
                    "opacity-25": isDisabled,
                  }
                )}
                disabled={isDisabled}
                type="submit"
              >
                Confirm
              </button>
            </div>
          </form>
        </div>
      </HeadlessModal>
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
