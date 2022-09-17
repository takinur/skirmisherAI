import React from "react";
import { useQuery } from "react-query";
import { useAxiosPrivate } from "../../hooks/useAxiosPrivate";

import { CandProfileForm } from "../../components/Forms/Candidate";
import { Loading } from "../../components/Loading";
import { FaBuilding, FaGlobe, FaMapMarkerAlt,  FaPhoneAlt, FaUsers } from "react-icons/fa";

export const Profile = (props) => {
  const API = useAxiosPrivate();

  //React query to fetch profile
  const { isLoading, isError, error, data } = useQuery("candProfile", fetchProfile, {
    refetchOnWindowFocus: false,
    retry: 0,
  });
  //Async function to fetch profile
  async function fetchProfile() {
    const res = await API.get(`/account/candidate/${props.user.id}`);
    return res.data;
  }

  console.log(data);

  if (isLoading) return <Loading />;
  if (isError && error.request.status === 400) return <CandProfileForm user={props.user} />;
  //Return detailed profile view
  if (data) return DetailedProfileView(data, props.user);
};

function DetailedProfileView(company, user) {
  return (
    <>
      <section className="relative py-8">
        <div className="container mx-auto px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg">
            <div className="px-6">
              <div className="flex flex-wrap justify-center">
                <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                  <div className="relative">
                    <img
                      alt="Logo"
                      src="/images/brand/logo.png"
                      className="shadow-xl rounded-full h-auto align-middle border-none max-w-150-px"
                    />
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                  <div className="py-6 px-3 mt-32 sm:mt-0">
                    <button
                      className="bg-blue-500 active:bg-blue-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                      type="button"
                    >
                      Connect
                    </button>
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4 lg:order-1">
                  <div className="flex justify-center py-4 lg:pt-4 pt-8">
                    <div className="mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-blue-600">
                        22
                      </span>
                      <span className="text-sm text-gray-400">Job Posted</span>
                    </div>
                    <div className="mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-bluey-600">
                        10
                      </span>
                      <span className="text-sm text-gray-400">Photos</span>
                    </div>
                    <div className="lg:mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-blue-600">
                        89
                      </span>
                      <span className="text-sm text-gray-400">Comments</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center mt-12">
                <h3 className="text-4xl font-semibold leading-normal text-gray-700 mb-2">
                  {user.name}
                </h3>
                <div className="flex justify-center text-sm leading-normal mt-0 mb-2 text-gray-400 font-bold uppercase">
                  <FaBuilding className="mr-2 text-xl text-gray-400" />
                  {company.company_name}
                </div>
                <div className="flex justify-center text-sm leading-normal mt-0 mb-2 text-gray-400 font-bold">
                  <FaMapMarkerAlt className="mr-2 text-xl text-gray-400" />
                  {company.location}
                </div>
                <div className="mb-2 text-green-700 text-xl mt-10">
                  {company.slogan}
                </div>
                <div className="mt-2 grid items-center justify-center">
                  <div className="flex">
                    <FaGlobe className="mr-2 mt-1 text-zinc-500 font-bold" />                 
                    <a
                      className=" font-semibold text-blue-700 hover:opacity-90"
                      target="_blank"
                      href={company.website}
                    >
                      {company.website}
                    </a>
                  </div>
                </div>
                <div className="flex justify-center text-sm leading-normal mt-4 mb-2 text-gray-600 font-bold">
                  <FaUsers className="mr-2 text-xl text-gray-600" />{company.size}
                </div>
                <div className="flex justify-center text-sm leading-normal mt-4 mb-2 text-gray-600 font-bold">
                  <FaPhoneAlt className="mr-2 text-lg text-gray-600" />{company.phone}
                </div>
              </div>
              <div className="mt-10 py-10 border-t border-gray-200 text-center">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-9/12 px-4">
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
