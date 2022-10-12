import React from "react";

export const Resume = (resumeData) => {
  console.log("Resume Data", resumeData);

  const hanldeViewResume = () => {
    // Create Resume URL with Media URL from ENV ~ Remove Double Quotes
    const media_url = import.meta.env.VITE_MEDIA_URL;
    const resume_url = `${media_url}${resumeData.resume_file.replace(
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
      <section className="mt-2 grid w-full ">
        <div className="ml-4 flex justify-between">
          <div className="border-l-8 border-green-700 bg-green-50 px-3 ">
            <h3 className="mb-2 text-3xl font-semibold leading-normal text-gray-700 ">
              Personal Information
            </h3>
          </div>
          <div className="flex items-center">
            <div className="sm:mt-0 md:px-3">
              <button
                onClick={hanldeViewResume}
                className="mb-1 rounded bg-green-500 px-4 py-2 text-xs font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-md focus:outline-none active:bg-green-600 sm:mr-2"
                type="button"
              >
                View Original Resume
              </button>
            </div>
          </div>
        </div>
        <div className="ml-4 mt-4 w-full">
          <div className="grid grid-cols-2 grid-rows-2 gap-4 md:grid-cols-3">
            <div className="mb-2 ml-2 flex text-base font-medium leading-normal text-gray-700">
              <p className="font-extrabold">Name</p>
              <span className="ml-2"> {resumeData.name} </span>
            </div>
            <div className="mb-2 ml-2 flex text-base font-medium leading-normal text-gray-700">
              <p className="font-extrabold">Email</p>
              <span className="ml-2">
                {" "}
                {resumeData.email ? resumeData.email : "Not Provided"}{" "}
              </span>
            </div>
            <div className="mb-2 ml-2 flex text-base font-medium leading-normal text-gray-700">
              <p className="font-extrabold">Phone</p>
              <span className="ml-2">
                {resumeData.phone ? resumeData.phone : "Not Provided"}
              </span>
            </div>
            <div className="mb-2 ml-2 flex text-base font-medium leading-normal text-gray-700">
              <p className="font-extrabold">Title</p>
              <span className="ml-2"> {resumeData.designation} </span>
            </div>

            <div className="mb-2 ml-2 flex text-base font-medium leading-normal text-gray-700">
              <p className="font-extrabold">Portfolio</p>
              <a
                href={
                  //If link does not contain http:// or https://, add it
                  resumeData.website
                    ? resumeData.website.includes("http")
                      ? resumeData.website
                      : "http://" + resumeData.website
                    : "#"
                }
                target="_blank"
                className="ml-2 hover:text-blue-800 "
              >
                {resumeData.website ? resumeData.website : "Not Provided"}
              </a>
            </div>
            <div className="mb-2 ml-2 flex text-base font-medium leading-normal text-gray-700">
              <p className="font-extrabold">Location</p>
              <span className="ml-2">
                {" "}
                {resumeData.location
                  ? resumeData.location
                  : "Not Provided"}{" "}
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className="mt-4 grid w-full ">
        <div className="mr-auto ml-4 border-l-8 border-green-700 bg-green-50 px-3 ">
          <h3 className="mb-2 text-3xl font-semibold leading-normal text-gray-700 ">
            Professional Skills
          </h3>
        </div>
        <div className="mt-2 flex w-full flex-col ">
          <div className="mt-2 ml-4 space-x-1 space-y-2 p-1 text-justify">
            {resumeData.skills.map((skill) => (
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
          <h3 className="mb-2 text-3xl font-semibold leading-normal text-gray-700 ">
            Work Experience
          </h3>
        </div>
        <div className="ml-4 mt-4 w-full">
          <div className="grid grid-cols-2 grid-rows-2 gap-4">
            {
              //If work experience is not provided, show "Not Provided"
              resumeData.experiences.length !== 0 ? (
                resumeData.experiences.map((experience) => (
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
                  <p className="font-extrabold">No Experience Provided ! </p>
                </div>
              )
            }
          </div>
        </div>
      </section>
      <section className="mt-2 grid w-full ">
        <div className="mr-auto ml-4 border-l-8 border-green-700 bg-green-50 px-3 ">
          <h3 className="mb-2 text-3xl font-semibold leading-normal text-gray-700 ">
            Education
          </h3>
        </div>
        <div className="ml-4 mt-4 w-full">
          <div className="grid grid-cols-2 grid-rows-2 gap-4">
            {resumeData.educations.length !== 0 ? (
              resumeData.educations.map((education) => (
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
                <p className="font-extrabold">No Education Provided ! </p>
              </div>
            )}
          </div>
        </div>
      </section>
      <section className="mt-2 grid w-full ">
        <div className="mr-auto ml-4 border-l-8 border-green-700 bg-green-50 px-3 ">
          <h3 className="mb-2 text-3xl font-semibold leading-normal text-gray-700 ">
            Projects
          </h3>
        </div>
        <div className="ml-4 mt-4 w-full">
          <div className="gap-4">
            {resumeData.projects.length !== 0 ? (
              //Join all projects into one string
              <div className="mb-2 ml-2 flex text-base font-medium leading-normal text-gray-700">
                <p className="font-extrabold">Details</p>
                <span className="ml-2 w-full">
                  {resumeData.projects
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
        <div className="mr-auto ml-4 border-l-8 border-green-700 bg-green-50 px-3 ">
          <h3 className="mb-2 text-3xl font-semibold leading-normal text-gray-700 ">
            Social Links
          </h3>
        </div>
        <div className="ml-4 mt-4 w-full">
          <div className="grid grid-cols-2 grid-rows-3 gap-4">
            {resumeData.socials.length !== 0 ? (
              resumeData.socials.map((social) => (
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
                <p className="font-extrabold">No Social Links Provided !</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};
