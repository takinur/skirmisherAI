import React, { useState, useEffect } from "react";
import GuestLayout from "../Layout/Guest";

import VideoCall from "./VideoCall";

export const VideoMeet = () => {
  const [inCall, setInCall] = useState(false);

  return (
    <GuestLayout>
      <div className="mt-20">
        {inCall ? (
          <VideoCall setInCall={setInCall} />
        ) : (
          <div className="flex items-center justify-center">
            <button className="btn btn-primary" onClick={() => setInCall(true)}>
              Start Call
            </button>
          </div>
        )}
      </div>
    </GuestLayout>
  );
};
