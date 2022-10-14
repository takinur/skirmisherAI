import React, { useState, useEffect } from "react";
import GuestLayout from "../Layout/Guest";

import VideoCall from "./VideoCall";

export const VideoMeet = () => {
  const [inCall, setInCall] = useState(false);

  return (
    <GuestLayout>
      <div className=" items-center justify-center bg-gray-400 py-24">
        {inCall ? (
          <VideoCall setInCall={setInCall} />
        ) : (
          <div className="flex items-center justify-center">
            <button
              onClick={() => setInCall(true)}
              class="ripple flex rounded-full bg-green-700 p-3 text-center text-white shadow transition hover:bg-green-800 hover:shadow-lg focus:outline-none"
            >
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
                  d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
                />
              </svg>

              <span className="ml-2">Join Call</span>
            </button>
          </div>
        )}
      </div>
    </GuestLayout>
  );
};
