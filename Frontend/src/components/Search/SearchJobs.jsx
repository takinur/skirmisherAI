import React from 'react'

export const SearchJobs = ({ SetSearchValue }) => {
  const handleSearch = (e) => {
    if (!e.target.value) return SetSearchValue('')
    SetSearchValue(e.target.value)
  }

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
          className="w-full border-none  bg-transparent py-2 font-bold text-gray-600 outline-none placeholder:text-gray-400 focus:outline-none"
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
  )
}
