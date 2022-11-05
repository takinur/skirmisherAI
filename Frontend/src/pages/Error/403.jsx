import React from 'react'
import notFound from '../../assets/images/403-forbidden.svg'
import { FaChevronCircleLeft } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import logo from '../../assets/images/skirmisher-logo.png'

const UnauthorizedAccess = () => {
  return (
    <>
      <div className="min-w-screen bg-primary-gradient relative flex min-h-screen items-center overflow-hidden p-5 lg:p-20">
        <div className="relative mt-4 min-h-full min-w-full flex-1 items-center rounded-3xl bg-white p-10 text-center text-gray-800 shadow-xl md:flex md:text-left lg:p-20">
          <div className="w-full md:w-1/2">
            <img src={logo} alt="SkirmisherAI Logo" className=" mx-auto w-48 md:ml-20" />
            <div className="mb-10 mt-4 font-light text-gray-600 md:mb-20">
              <h1 className="mb-10 text-3xl font-black uppercase text-red-500 lg:text-5xl">
                Unauthorized Access!
              </h1>
              <p className="text-lg">
                The page you're looking for is absolutly forbidden for some reason.
              </p>
            </div>
            <div className="mb-20 md:mb-0">
              <Link
                to="/login"
                type="button"
                className="mr-2 inline-flex items-center rounded-lg bg-green-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <FaChevronCircleLeft className="mr-2" />
                Navigate to Login
              </Link>
            </div>
          </div>
          <div className="w-full text-center md:w-1/2 ">
            <img src={notFound} alt="404" className="mx-auto w-3/4" />
          </div>
        </div>
        <div className="pointer-events-none absolute -top-64 right-20 h-96 w-64 -rotate-45 transform rounded-full bg-blue-200 bg-opacity-30 md:-top-96 md:right-32 md:h-full md:w-96"></div>
        <div className="pointer-events-none absolute -bottom-96 right-64 h-full w-96 -rotate-45 transform rounded-full bg-yellow-200 bg-opacity-20"></div>
      </div>
    </>
  )
}

export default UnauthorizedAccess
