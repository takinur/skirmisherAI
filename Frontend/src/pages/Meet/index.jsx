import React, { useState } from "react";
import GuestLayout from "../Layout/Guest";

import AgoraUIKit from "agora-react-uikit";

export const VideoMeet = () => {
  const [videoCall, setVideoCall] = useState(true);

  const rtcProps = {
    appId: "3b1d8e44bbdb4cde860aad026cfdfd15",
    channel: "Interview",
    token: "007eJxTYBD+bfk0h+eQstV17jWBhexVydwzmZient4jxn3C0+pcrb4Cg3GSYYpFqolJUlJKkklySqqFmUFiYoqBkVlyWkpaiqGp8Wm35E0yHskLeF1ZGBkgEMTnZPDMK0ktKstMLWdgAABISyBd",
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
