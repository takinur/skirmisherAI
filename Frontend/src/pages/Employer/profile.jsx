import React from "react";
import { useQuery } from "react-query";
import { useAxiosPrivate } from "../../hooks/useAxiosPrivate";

import { EmpProfileForm } from "../../components/Forms";
import { Loading } from "../../components/Loading";
import {
  FaBuilding,
  FaGlobe,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaUsers,
} from "react-icons/fa";
import { useProfile } from "../../hooks/useProfile";

export const Profile = () => {
  const API = useAxiosPrivate();

  const { isLoading, isError, data, user } = useProfile();

  if (isLoading) return <Loading />;
  if (isError) return <EmpProfileForm user={user} />;
  //Return detailed profile view
  if (data) return DetailedProfileView(data, user);
};

function DetailedProfileView(company, user) {
  return (
    <>
      <section className="relative py-8">
        <div className="container mx-auto px-4">
          <div className="relative mb-6 flex w-full min-w-0 flex-col break-words rounded-lg bg-white shadow-xl">
            <div className="px-6">
              <div className="flex flex-wrap justify-center">
                <div className="flex w-full justify-center px-4 lg:order-2 lg:w-3/12">
                  <div className="relative">
                    <img
                      alt="Logo"
                      src="/images/brand/logo.png"
                      className="max-w-150-px h-auto rounded-full border-none align-middle shadow-xl"
                    />
                  </div>
                </div>
                <div className="w-full px-4 lg:order-3 lg:w-4/12 lg:self-center lg:text-right">
                  <div className="mt-32 py-6 px-3 sm:mt-0">
                    <button
                      className="mb-1 rounded bg-blue-500 px-4 py-2 text-xs font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-md focus:outline-none active:bg-blue-600 sm:mr-2"
                      type="button"
                    >
                      Connect
                    </button>
                  </div>
                </div>
                <div className="w-full px-4 lg:order-1 lg:w-4/12">
                  <div className="flex justify-center py-4 pt-8 lg:pt-4">
                    <div className="mr-4 p-3 text-center">
                      <span className="block text-xl font-bold uppercase tracking-wide text-blue-600">
                        22
                      </span>
                      <span className="text-sm text-gray-400">Job Posted</span>
                    </div>
                    <div className="mr-4 p-3 text-center">
                      <span className="text-bluey-600 block text-xl font-bold uppercase tracking-wide">
                        10
                      </span>
                      <span className="text-sm text-gray-400">Photos</span>
                    </div>
                    <div className="p-3 text-center lg:mr-4">
                      <span className="block text-xl font-bold uppercase tracking-wide text-blue-600">
                        89
                      </span>
                      <span className="text-sm text-gray-400">Comments</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-12 text-center">
                <h3 className="mb-2 text-4xl font-semibold leading-normal text-gray-700">
                  {user.name}
                </h3>
                <div className="mt-0 mb-2 flex justify-center text-sm font-bold uppercase leading-normal text-gray-400">
                  <FaBuilding className="mr-2 text-xl text-gray-400" />
                  {company.company_name}
                </div>
                <div className="mt-0 mb-2 flex justify-center text-sm font-bold leading-normal text-gray-400">
                  <FaMapMarkerAlt className="mr-2 text-xl text-gray-400" />
                  {company.location}
                </div>
                <div className="mb-2 mt-10 text-xl text-green-700">
                  {company.slogan}
                </div>
                <div className="mt-2 grid items-center justify-center">
                  <div className="flex">
                    <FaGlobe className="mr-2 mt-1 font-bold text-zinc-500" />
                    <a
                      className=" font-semibold text-blue-700 hover:opacity-90"
                      target="_blank"
                      href={company.website}
                    >
                      {company.website}
                    </a>
                  </div>
                </div>
                <div className="mt-4 mb-2 flex justify-center text-sm font-bold leading-normal text-gray-600">
                  <FaUsers className="mr-2 text-xl text-gray-600" />
                  {company.size}
                </div>
                <div className="mt-4 mb-2 flex justify-center text-sm font-bold leading-normal text-gray-600">
                  <FaPhoneAlt className="mr-2 text-lg text-gray-600" />
                  {company.phone}
                </div>
              </div>
              <div className="mt-10 border-t border-gray-200 py-10 text-center">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full px-4 lg:w-9/12">
                    <p className="mb-4 text-lg leading-relaxed text-gray-700">
                      {company.about}
                    </p>
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
