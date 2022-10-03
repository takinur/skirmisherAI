import React from "react";

export const SearchJobs = ({ jobs, setSearchResults }) => {

    console.log('jobs', jobs);
    
  const handleSearch = (e) => {
    if (!e.target.value) return setSearchResults(jobs);

    const results = jobs.filter((job) => {
      const jobTitle = job.title.toLowerCase();
      const jobCompany = job.employer?.company_name.toLowerCase();
      const jobLocation = job.work_location?.toLowerCase();      
      const jobType = job.type?.toLowerCase();
      const jobLevel = job.level?.toLowerCase();
      const jobDescription = job.description?.toLowerCase();
      const jobQualifications = job.qualifications?.toLowerCase();

      const searchValue = e.target.value.toLowerCase();

      return (
        
        //If not undefined and includes search value
        (jobTitle && jobTitle.includes(searchValue)) ||
        (jobCompany && jobCompany.includes(searchValue)) ||
        (jobLocation && jobLocation.includes(searchValue)) ||
        (jobType && jobType.includes(searchValue)) ||
        (jobLevel && jobLevel.includes(searchValue)) ||
        (jobDescription && jobDescription.includes(searchValue)) ||
        (jobQualifications && jobQualifications.includes(searchValue))
        );

      
    });

    setSearchResults(results);
  };

  return (
    <div className="relative h-14 w-full border-b-2 border-slate-200 md:border-b-0 md:border-none">
      <div className="relative flex h-full flex-row border-r-2 ">
        <span className="flex items-center rounded rounded-r-none bg-transparent px-3 font-bold">
          What
        </span>
        <input
          type="text"
          name="search"
          onChange={handleSearch}
          className="w-full  border-none bg-transparent py-2 font-bold text-gray-700 outline-none focus:outline-none"
          placeholder="Job title, keywords or company"
        />
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
