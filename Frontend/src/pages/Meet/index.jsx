import React, { useState, useEffect } from "react";
import GuestLayout from "../Layout/Guest";

import {config, useClient, useMicrophoneAndCameraTracks, channelName} from "./settings";
import Video from "./Video";
import Controls from "./Controls";


export const VideoMeet = () => {
  const [inCall, setInCall] = useState(false);



  return (
    <GuestLayout>
      <div className="mt-20">index</div>
    </GuestLayout>
  );
};
