import React from "react";
import { FaClock } from "react-icons/fa";
import { JobCard } from "../components/Card";
import GuestLayout from "./Layout/Guest";

import "./demo.css";

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
          <div className="detail-page">
            <div className="flex flex-grow flex-col pl-10">
              <div className="flex justify-between">
                <div className="text-sm font-semibold text-gray-800 ">
                  Showing 46 Jobs
                </div>
                <div className="text-sm font-semibold text-gray-800">
                  Sort by: <span className="post-time">Newest Post </span>
                  <span className="menu-icon">▼</span>
                </div>
              </div>
              <div className="flex flex-grow mt-4">
                <div className="flex w-2/5 flex-col bg-red-400 ">
                  <div className="bg-green-600">
                    <div className="py-5 px-4 w-full cursor-pointer rounded-md bg-indigo-500 ">
                      <div className="overview-wrapper">
                        <svg
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
                        <div className="overview-detail">
                          <div className="job-card-title">UI / UX Designer</div>
                          <div className="job-card-subtitle">
                            2972 Westheimer Rd. Santa Ana.
                          </div>
                        </div>
                        <svg
                          className="heart"
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
                      <div className="job-overview-buttons">
                        <div className="search-buttons time-button">
                          Full Time
                        </div>
                        <div className="search-buttons level-button">
                          Senior Level
                        </div>
                        <div className="job-stat">New</div>
                        <div className="job-day">4d</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-3/5">
                  <img className="job-bg" alt="" />
                  <div className="job-logos">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                      <path
                        xmlns="http://www.w3.org/2000/svg"
                        d="M0 .5h4.2v23H0z"
                        fill="#042b48"
                        data-original="#212121"
                      ></path>
                      <path
                        xmlns="http://www.w3.org/2000/svg"
                        d="M15.4.5a8.6 8.6 0 100 17.2 8.6 8.6 0 000-17.2z"
                        fill="#fefefe"
                        data-original="#f4511e"
                      ></path>
                    </svg>
                  </div>
                  <div className="job-explain-content">
                    <div className="job-title-wrapper">
                      <div className="job-card-title">UI /UX Designer</div>
                      <div className="job-action">
                        <svg
                          className="heart"
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
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="feather feather-share-2"
                        >
                          <circle cx="18" cy="5" r="3" />
                          <circle cx="6" cy="12" r="3" />
                          <circle cx="18" cy="19" r="3" />
                          <path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4" />
                        </svg>
                      </div>
                    </div>
                    <div className="job-subtitle-wrapper">
                      <div className="company-name">
                        Patreon{" "}
                        <span className="comp-location">Londontowne, MD.</span>
                      </div>
                      <div className="posted">
                        Posted 8 days ago
                        <span className="app-number">98 Application</span>
                      </div>
                    </div>
                    <div className="explain-bar">
                      <div className="explain-contents">
                        <div className="explain-title">Experience</div>
                        <div className="explain-subtitle">Minimum 1 Year</div>
                      </div>
                      <div className="explain-contents">
                        <div className="explain-title">Work Level</div>
                        <div className="explain-subtitle">Senior level</div>
                      </div>
                      <div className="explain-contents">
                        <div className="explain-title">Employee Type</div>
                        <div className="explain-subtitle">Full Time Jobs</div>
                      </div>
                      <div className="explain-contents">
                        <div className="explain-title">Offer Salary</div>
                        <div className="explain-subtitle">$2150.0 / Month</div>
                      </div>
                    </div>
                    <div className="overview-text">
                      <div className="overview-text-header">Overview</div>
                      <div className="overview-text-subheader">
                        We believe that design (and you) will be critical to the
                        company's success. You will work with our founders and
                        our early customers to help define and build our product
                        functionality, while maintaining the quality bar that
                        customers have come to expect from modern SaaS
                        applications. You have a strong background in product
                        design with a quantitavely anf qualitatively analytical
                        mindset. You will also have the opportunity to craft our
                        overall product and visual identity and should be
                        comfortable to flex into working.
                      </div>
                    </div>
                    <div className="overview-text">
                      <div className="overview-text-header">
                        Job Description
                      </div>
                      <div className="overview-text-item">
                        3+ years working as a product designer.
                      </div>
                      <div className="overview-text-item">
                        A portfolio that highlights your approach to problem
                        solving, as well as you skills in UI.
                      </div>
                      <div className="overview-text-item">
                        Experience conducting research and building out smooth
                        flows.
                      </div>
                      <div className="overview-text-item">
                        Excellent communication skills with a well-defined
                        design process.
                      </div>
                      <div className="overview-text-item">
                        Familiarity with design tools like Sketch and Figma
                      </div>
                      <div className="overview-text-item">
                        Up-level our overall design and bring consistency to
                        end-user facing properties
                      </div>
                    </div>
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
