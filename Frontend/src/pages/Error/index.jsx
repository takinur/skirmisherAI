import React from "react";
import { ChatWindow } from "../../components/Message";
import notFound from "../../assets/images/404.svg";
import { FaChevronCircleLeft } from "react-icons/fa";

export const NotFound = () => {
  return (
    <>
      <ChatWindow />
      <div className="min-w-screen min-h-screen bg-blue-100 flex items-center p-5 lg:p-20 overflow-hidden relative">
        <div className="flex-1 min-h-full min-w-full rounded-3xl bg-white shadow-xl p-10 lg:p-20 text-gray-800 relative md:flex items-center text-center md:text-left">
          <div className="w-full md:w-1/2">
            <div className="mb-10 lg:mb-20">LOGO</div>
            <div className="mb-10 md:mb-20 text-gray-600 font-light">
              <h1 className="font-black uppercase text-3xl lg:text-5xl text-yellow-500 mb-10">
                You seem to be lost!
              </h1>
              <p className="text-lg">
                The page you're looking for isn't available.
              </p>
              <p>You can find plenty of other things on our homepage.</p>
            </div>
            <div className="mb-20 md:mb-0">
              <button
                type="button"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <FaChevronCircleLeft className="mr-2" />
                Back to Home Page
              </button>
             
            </div>
          </div>
          <div className="w-full md:w-1/2 text-center bg-green-400">
            <img src={notFound} alt="404" className="w-3/4 mx-auto" />
          </div>
        </div>
        <div className="w-64 md:w-96 h-96 md:h-full bg-blue-200 bg-opacity-30 absolute -top-64 md:-top-96 right-20 md:right-32 rounded-full pointer-events-none -rotate-45 transform"></div>
        <div className="w-96 h-full bg-yellow-200 bg-opacity-20 absolute -bottom-96 right-64 rounded-full pointer-events-none -rotate-45 transform"></div>
      </div>
    </>
  );
};
