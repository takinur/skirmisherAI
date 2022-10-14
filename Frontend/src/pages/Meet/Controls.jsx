import React, { useState } from "react";
import { useClient } from "./settings";

const Controls = (props) => {
  const client = useClient();

  const { tracks, setStart, setInCall } = props;

  const [trackState, setTrackState] = useState({ video: true, audio: true });

  const mute = async (type) => {
    if (type === "audio") {
      await tracks[0].setEnabled(!trackState.audio);
      setTrackState((ps) => {
        return { ...ps, audio: !ps.audio };
      });
    } else if (type === "video") {
      await tracks[1].setEnabled(!trackState.video);
      setTrackState((ps) => {
        return { ...ps, video: !ps.video };
      });
    }
  };

  const leaveChannel = async () => {
    await client.leave();
    client.removeAllListeners();
    tracks[0].close();
    tracks[1].close();
    setStart(false);
    setInCall(false);
  };

  return (
    <div className="cols-3 grid">
      <button
        className="btn btn-ghost"
        onClick={() => mute("audio")}
        title="Mute Audio"
      >
        MIC
      </button>
      <button
        className="btn btn-ghost"
        onClick={() => mute("video")}
        title="Mute Video"
      >
        VID
      </button>
      <button
        className="btn btn-ghost"
        onClick={leaveChannel}
        title="Leave Channel"
      >
        LEAVE
      </button>
    </div>
  );
};

export default Controls;
