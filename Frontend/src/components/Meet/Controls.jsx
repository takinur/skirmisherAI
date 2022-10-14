import classNames from "classnames";
import React, { useState } from "react";
import { useClient } from "../../hooks/Meet/settings";

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
    <div className="mt-3 flex items-center justify-center gap-2">
      <button
        onClick={() => mute("audio")}
        className={classNames(
          "ripple inline-block rounded-full p-3 text-center text-white shadow transition hover:bg-opacity-90 hover:shadow-lg focus:outline-none",
          trackState.audio ? "bg-green-700" : "bg-red-600"
        )}
      >
        {trackState.audio ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 512"
            className="h-5 w-5"
            stroke="currentColor"
            fill="#fff"
          >
            <path d="M224 0H416V300.2l18 14c8.9-17.5 14-37.2 14-58.2V216 192h48v24 40c0 32.1-8.6 62.1-23.6 88L620.9 459.3l19 14.7-29.4 37.9-19-14.7L19 52.7 0 38 29.4 .1l19 14.7L224 151.1V0zM358.2 378.2l43.1 33.9c-17.6 9.2-36.9 15.4-57.3 18.2V464h48 24v48H392 320 248 224V464h24 48V430.4C210.2 418.7 144 345.1 144 256V216v-6.5l48 37.8V256c0 70.7 57.3 128 128 128c13.3 0 26.1-2 38.2-5.8z" />
          </svg>
        )}
      </button>
      <button
        onClick={() => mute("video")}
        className={classNames(
          "ripple inline-block rounded-full p-3 text-center text-white shadow transition hover:bg-opacity-90 hover:shadow-lg focus:outline-none",
          trackState.video ? "bg-green-700" : "bg-red-600"
        )}
      >
        {trackState.video ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M12 18.75H4.5a2.25 2.25 0 01-2.25-2.25V9m12.841 9.091L16.5 19.5m-1.409-1.409c.407-.407.659-.97.659-1.591v-9a2.25 2.25 0 00-2.25-2.25h-9c-.621 0-1.184.252-1.591.659m12.182 12.182L2.909 5.909M1.5 4.5l1.409 1.409"
            />
          </svg>
        )}
      </button>
      <button
        onClick={leaveChannel}
        class="ripple inline-block rounded-full bg-red-600 p-3 text-center text-white shadow transition hover:bg-red-700 hover:shadow-lg focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-5 w-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
          />
        </svg>
      </button>
    </div>
  );
};

export default Controls;
