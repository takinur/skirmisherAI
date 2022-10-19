import React, { useState, useEffect } from "react";
import GuestLayout from "../Layout/Guest";

import VideoCall from "../../components/meet/VideoCall";
import { useParams } from "react-router-dom";

export const VideoMeet = () => {
  const [joinCode, setJoinCode] = useState("");

  const param = useParams();

  const handleChange = (e) => {
    setJoinCode(e.target.value);
  };

  useEffect(() => {
    setJoinCode(param.slug);
  }, [param]);

  const [inCall, setInCall] = useState(false);

  return (
    <div className="wrapper">
      <div className=" items-center justify-center bg-gray-400 py-8">
        {inCall ? (
          <VideoCall setInCall={setInCall} />
        ) : (
          <div className="flex h-screen items-center justify-center">
            <div class="m-4 flex">
              <input
                onChange={handleChange}
                value={joinCode}
                required
                className="mr-0 rounded-l-lg border-t border-b border-l border-gray-200 bg-white p-4 text-gray-800"
                placeholder="Meet code"
              />
              <button
                onClick={() => setInCall(true)}
                className="flex rounded-r-lg border-t border-b  border-r border-green-500 bg-green-700 p-4 px-8 font-bold uppercase text-gray-50"
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
          </div>
        )}
      </div>
    </div>
  );
};
