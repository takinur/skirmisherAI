import React from "react";
import { CandProfileForm } from "../../components/Forms/Candidate";
import { Loading } from "../../components/Loading";
import {
  FaBuilding,
  FaGlobe,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaUsers,
} from "react-icons/fa";

import { useCandProfile } from "../../hooks/useProfile";

export const Profile = (props) => {
  //React query to fetch profile
  const { isLoading, isError, error, data } = useCandProfile();

  console.log("Data from cand profile: ", data);

  if (isLoading) return <Loading />;
  if (isError && error.request.status === 400)
    return <CandProfileForm user={props.user} />;
  //Return detailed profile view
  if (data) return DetailedProfileView(data, props.user);
};

function DetailedProfileView(profileData, user) {
  return (
    <>
      <section className="relative py-8">
        <div className="container mx-auto px-4">
          <div className="relative mb-6 flex w-full min-w-0 flex-col break-words rounded-lg bg-white shadow-xl">
            <div className="px-6">
              <div className="flex flex-wrap justify-center">
                <div className="flex w-full justify-center px-4 lg:order-2 lg:w-3/12">
                  <div className="relative">
                    {profileData?.avatar ? (
                      <img
                        alt="..."
                        src="https://www.takinur.com/images/LOGO_T_256.png"
                        className="max-w-150-px absolute -m-16 -ml-20 h-auto rounded-full border-none align-middle shadow-xl lg:-ml-16"
                      />
                    ) : (
                      <div className="-mt-8 flex h-16 w-16 items-center justify-center rounded-full  bg-gray-700">
                        <span className="text-4xl font-semibold text-gray-50">
                          {user?.name.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="w-full md:px-4 lg:order-3 lg:w-4/12 lg:self-center lg:text-right">
                  <div className="float-right py-6 sm:mt-0 md:px-3">
                    <button
                      className="mb-1 rounded bg-green-500 px-4 py-2 text-xs font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-md focus:outline-none active:bg-green-600 sm:mr-2"
                      type="button"
                    >
                      View Resume
                    </button>
                  </div>
                </div>
                <div className="w-full px-4 lg:order-1 lg:w-4/12">
                  {/* {ADD any top header info} */}
                </div>
              </div>
              <div className="text-center md:mt-12">
                <h3 className="mb-2 text-4xl font-semibold leading-normal text-gray-700">
                  {user.name}
                </h3>
                <div className="mt-0 mb-2 flex justify-center text-sm font-bold uppercase leading-normal text-gray-400">
                  {profileData.designation}
                </div>
                <div className="mt-6 mb-2 flex justify-center text-sm font-bold leading-normal text-gray-500">
                  <FaMapMarkerAlt className="mr-1 text-xl text-gray-400" />
                  {profileData.location ? profileData.location : "Not Provided"}
                </div>
                <div className="mt-2 grid items-center justify-center">
                  <div className="flex">
                    <FaGlobe className="mr-1 mt-1 font-bold text-zinc-500" />
                    <a
                      className=" font-semibold text-blue-700 hover:opacity-90"
                      target="_blank"
                      href={profileData.website ? profileData.website : "#"}
                    >
                      {profileData.website
                        ? profileData.website
                        : "No website/ Portfolio"}
                    </a>
                  </div>
                </div>
                <div className="mt-4 mb-2 flex justify-center text-sm font-bold leading-normal text-gray-500">
                  <FaPhoneAlt className="mr-2 text-lg text-gray-500" />
                  {profileData.phone ? profileData.phone : "Not Provided"}
                </div>
              </div>
              <div className="mt-10 grid w-full border-t border-gray-200 py-10">
                <div className="mr-auto ml-4 border-l-8 border-green-700 bg-green-50 px-3 ">
                  <h3 className="mb-2 text-3xl font-semibold leading-normal text-gray-700 ">
                    Your Skills*
                  </h3>
                </div>
                <div className="mt-4 flex w-full flex-col ">
                  <div className="mt-2 space-x-1 space-y-2 p-1 text-justify">
                    {profileData.skills.map((skill) => (
                      <button
                        key={skill.id}
                        className="rounded-full bg-gray-300 px-5 py-2 text-sm font-medium tracking-wider text-gray-600 shadow-sm hover:bg-gray-400 hover:shadow-2xl"
                      >
                        {skill.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
