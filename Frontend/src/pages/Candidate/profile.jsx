import React from "react";
import { CandProfileForm } from "../../components/Forms/Candidate";
import { Loading } from "../../components/Loading";
import { FaGlobe, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";

import { useCandProfile } from "../../hooks/useProfile";

// TODO: Add Other Sections
// TODO: Add Resume Download Function

export const Profile = () => {
  //React query to fetch profile
  const { isLoading, isError, error, data, user } = useCandProfile();

  console.log("Data from cand profile: ", user);

  if (isLoading) return <Loading />;
  if (isError && error.request.status === 400)
    return <CandProfileForm user={user} />;
  //Return detailed profile view
  if (data) return DetailedProfileView(data, user);
};

function DetailedProfileView(profileData, user) {

  const hanldeViewResume = () => {
    // Create Resume URL with Media URL from ENV ~ Remove Double Quotes
    const media_url = import.meta.env.VITE_MEDIA_URL;
    const resume_url = `${media_url}${profileData.resume_file.replace(
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
                  <div className="float-right sm:mt-0 md:py-6 md:px-3">
                    <button
                    onClick={hanldeViewResume}
                      className="mb-1 rounded bg-green-500 px-4 py-2 text-xs font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-md focus:outline-none active:bg-green-600 sm:mr-2"
                      type="button"
                    >
                      View Resume
                    </button>
                  </div>
                </div>
                <div className="-mt-8 w-full px-4 text-base  text-gray-600 md:mt-6 lg:order-1  lg:w-4/12 ">
                  <span className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700">
                    {user?.email}
                  </span>
                </div>
              </div>
              <div className="text-center md:mt-12">
                <h3 className="mb-2 text-4xl font-semibold leading-normal text-gray-700">
                  {user.name}
                </h3>
                <div className="mt-0 mb-2 flex justify-center text-sm font-bold uppercase leading-normal text-gray-400">
                  {profileData.designation}
                </div>

                <div className="mt-4 mb-2 flex justify-center text-sm font-bold leading-normal text-gray-500">
                  <FaPhoneAlt className="mr-2 text-lg text-gray-500" />
                  {profileData.phone ? profileData.phone : "Not Provided"}
                </div>
              </div>

              <section className="mt-6 grid w-full ">
                <div className="border-l-8 border-green-700 bg-green-50 px-3 ">
                  <h3 className="mb-2 text-3xl font-semibold leading-normal text-gray-700 ">
                    Personal Information
                  </h3>
                </div>
                <div className="ml-4 mt-4 w-full">
                  <div className="grid grid-cols-2 grid-rows-2 gap-4 md:grid-cols-3">
                    <div className="mb-2 ml-2 flex text-base font-medium leading-normal text-gray-700">
                      <p className="font-extrabold">Name</p>
                      <span className="ml-2"> {profileData.name} </span>
                    </div>
                    <div className="mb-2 ml-2 flex text-base font-medium leading-normal text-gray-700">
                      <p className="font-extrabold">Email</p>
                      <span className="ml-2">
                        {" "}
                        {profileData.email
                          ? profileData.email
                          : "Not Provided"}{" "}
                      </span>
                    </div>
                    <div className="mb-2 ml-2 flex text-base font-medium leading-normal text-gray-700">
                      <p className="font-extrabold">Phone</p>
                      <span className="ml-2">
                        {profileData.phone ? profileData.phone : "Not Provided"}
                      </span>
                    </div>
                    <div className="mb-2 ml-2 flex text-base font-medium leading-normal text-gray-700">
                      <p className="font-extrabold">Title</p>
                      <span className="ml-2"> {profileData.designation} </span>
                    </div>
                    <div className="mb-2 ml-2 flex text-base font-medium leading-normal text-gray-700">
                      <p className="font-extrabold">Portfolio</p>
                      <a
                        href={
                          //If link does not contain http:// or https://, add it
                          profileData.website
                            ? profileData.website.includes("http")
                              ? profileData.website
                              : "http://" + profileData.website
                            : "#"
                        }
                        target="_blank"
                        className="ml-2 hover:text-blue-800 "
                      >
                        {profileData.website
                          ? profileData.website
                          : "Not Provided"}
                      </a>
                    </div>
                    <div className="mb-2 ml-2 flex text-base font-medium leading-normal text-gray-700">
                      <p className="font-extrabold">Location</p>
                      <span className="ml-2">
                        {" "}
                        {profileData.location
                          ? profileData.location
                          : "Not Provided"}{" "}
                      </span>
                    </div>
                  </div>
                </div>
              </section>
              <section className="mt-4 grid w-full py-10">
                <div className=" ml-2 border-l-8 border-green-700 bg-green-50 px-3 ">
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
              </section>
              <section className="mt-8 grid w-full ">
                <div className="ml-4 border-l-8 border-green-700 bg-green-50 px-3 ">
                  <h3 className="mb-2 text-3xl font-semibold leading-normal text-gray-700 ">
                    Work Experience
                  </h3>
                </div>
                <div className="ml-4 mt-4 w-full">
                  <div className="grid grid-cols-2 grid-rows-2 gap-4">
                    {
                      //If work experience is not provided, show "Not Provided"
                      profileData.experiences.length !== 0 ? (
                        profileData.experiences.map((experience) => (
                          <>
                            <div className="mb-2 ml-2 flex text-base font-medium leading-normal text-gray-700">
                              <p className="font-extrabold">Name</p>
                              <span className="ml-2"> {experience.name} </span>
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
                <div className=" ml-4 border-l-8 border-green-700 bg-green-50 px-3 ">
                  <h3 className="mb-2 text-3xl font-semibold leading-normal text-gray-700 ">
                    Education
                  </h3>
                </div>
                <div className="ml-4 mt-4 w-full">
                  <div className="grid grid-cols-2 grid-rows-2 gap-4">
                    {profileData.educations.length !== 0 ? (
                      profileData.educations.map((education) => (
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
                <div className="ml-4 border-l-8 border-green-700 bg-green-50 px-3 ">
                  <h3 className="mb-2 text-3xl font-semibold leading-normal text-gray-700 ">
                    Projects
                  </h3>
                </div>
                <div className="ml-4 mt-4 w-full">
                  <div className="gap-4">
                    {profileData.projects.length !== 0 ? (
                      //Join all projects into one string
                      <div className="mb-2 ml-2 flex text-base font-medium leading-normal text-gray-700">
                        <p className="font-extrabold">Details</p>
                        <span className="ml-2 w-full">
                          {profileData.projects
                            .map((project) => project.details)
                            .join(", ")}
                        </span>
                      </div>
                    ) : (
                      <div className=" ml-2 text-center text-base font-medium leading-normal text-gray-700">
                        <p className="font-extrabold">No Projects Provided !</p>
                      </div>
                    )}
                  </div>
                </div>
              </section>
              <section className="mt-4 grid w-full ">
                <div className="ml-4 border-l-8 border-green-700 bg-green-50 px-3 ">
                  <h3 className="mb-2 text-3xl font-semibold leading-normal text-gray-700 ">
                    Social Links
                  </h3>
                </div>
                <div className="ml-4 mt-4 w-full">
                  <div className="grid grid-cols-2 grid-rows-3 gap-4">
                    {profileData.socials.length !== 0 ? (
                      profileData.socials.map((social) => (
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
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
