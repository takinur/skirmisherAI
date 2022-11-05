import React from 'react'
import GuestLayout from './Layout/Guest'

export const ContactPage = () => {
  return (
    <GuestLayout>
      <div className="flex min-h-screen w-full flex-col bg-white font-sans">
        <div>
          <div className="bg-gray-700 md:overflow-hidden">
            <div className="px-4 py-16">
              <div className="relative w-full text-center md:mx-auto md:max-w-2xl">
                <h1 className="mb-6 text-xl font-bold leading-tight text-gray-300 sm:text-2xl md:mt-20 md:text-5xl">
                  Please Help
                </h1>

                <p className="md:px-18 text-gray-400 md:text-xl">
                  A simple and smart solution that will help allocating human resources as well as
                  improving both business growth and productivity
                </p>

                <div className="absolute right-0 bottom-0 -mb-64 -mr-48 hidden h-40 w-40 rounded-full bg-blue-800 md:block"></div>

                <div className="absolute top-0 right-0 -mr-40 mt-32 hidden h-5 w-5 rounded-full bg-yellow-500 md:block"></div>
              </div>
            </div>

            <svg
              className="hidden bg-gray-700 fill-current text-white md:block"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1440 320"
            >
              <path
                fillOpacity="1"
                d="M0,64L120,85.3C240,107,480,149,720,149.3C960,149,1200,107,1320,85.3L1440,64L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"
              ></path>
            </svg>
          </div>

          <div className="relative z-20 mx-auto -mt-80 hidden max-w-4xl rounded-3xl bg-white shadow-lg md:block">
            <div className="absolute top-0 left-0 -z-10 -ml-10 -mt-10 h-20 w-20 rounded-full bg-yellow-500"></div>

            <div className="absolute top-0 left-0 -z-10 -ml-32 mt-12 h-5 w-5 rounded-full bg-blue-500"></div>

            <div className="h-10 rounded-t-lg border-b border-gray-100 bg-white"></div>
            <div className="flex h-[550px] border-2 border-red-500 ">Oh no add form here maybe</div>
          </div>
        </div>
      </div>
    </GuestLayout>
  )
}
