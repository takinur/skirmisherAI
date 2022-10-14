import { AgoraVideoPlayer } from "agora-rtc-react";
import classNames from "classnames";
import { useState, useEffect } from "react";

export default function Video(props) {
  const { users, tracks } = props;
  const [isMultiple, setIsmultiple] = useState(false);

  useEffect(() => {
    if (users.length > 1) {
      setIsmultiple(true);
    } else {
      setIsmultiple(false);
    }
  }, [users]);

  return (
    <div
      className={classNames(
        "relative grid gap-2 md:grid-flow-col h-5/6",
        !isMultiple ? "w-[600px]" : "w-screen"
      )}
    >
      <div className="mx-6 border-8 border-green-600 ">
        <AgoraVideoPlayer
          videoTrack={tracks[1]}
          style={{ height: "100%", width: "100%" }}
        />
      </div>
      {users.length > 0 &&
        users.map((user) => {
          if (user.videoTrack) {
            return (
              <div className="mx-6 border-8 border-green-600">
                <AgoraVideoPlayer
                  videoTrack={user.videoTrack}
                  key={user.uid}
                  style={{ height: "100%", width: "100%" }}
                />
              </div>
            );
          } else return null;
        })}
    </div>
  );
}
