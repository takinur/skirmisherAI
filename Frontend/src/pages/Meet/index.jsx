import React, { useState } from "react";
import GuestLayout from "../Layout/Guest";

import AgoraUIKit from "agora-react-uikit";

export const VideoMeet = () => {
  const [videoCall, setVideoCall] = useState(true);

  const rtcProps = {
    appId: import.meta.env.RTC_APP_ID,
    channel: "Interview",
    token: import.meta.env.RTC_TOKEN,
  };

  const callbacks = {
    EndCall: () => setVideoCall(false),
  };
  return (
    <GuestLayout>
      <div className="mt-20">index</div>
      {
        videoCall ? (
          <div style={{ display: "flex", width: "100vw", height: "100vh" }}>
            <AgoraUIKit rtcProps={rtcProps} callbacks={callbacks} />
          </div>
        ) : (
          <h3 onClick={() => setVideoCall(true)}>Join</h3>
        )
      }
    </GuestLayout>
  );
};
