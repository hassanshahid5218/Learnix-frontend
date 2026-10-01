

import React, { FC, useEffect, useState } from "react";
import axios from "axios";

type Props = {
  videoUrl: string;
  title: string;
};

const CoursePlayer: FC<Props> = ({
  videoUrl,
  title,
}) => {
  const [videoData, setVideoData] = useState({
    otp: "",
    playbackInfo: "",
  });

  useEffect(() => {
    axios
      .post(
        "http://localhost:8000/api/v1/getVdoCipherOTP",
        {
          videoId: videoUrl,
        }
      )
      .then((res) => {
        setVideoData(res.data);
      });
  }, [videoUrl]);

  return (
    <div className="w-full overflow-hidden bg-black">
      <div
        className="relative w-full overflow-hidden"
        style={{
          paddingTop: "56.25%",
        }}
      >
        {videoData.otp &&
          videoData.playbackInfo !== "" && (
            <iframe
              src={`https://player.vdocipher.com/v2/?otp=${videoData?.otp}&playbackInfo=${videoData.playbackInfo}&player=NXRqRUwBqpoT99bu`}
              title={title || "Course Video"}
              className="absolute left-0 top-0 h-full w-full border-0"
              allowFullScreen={true}
              allow="encrypted-media"
            />
          )}
      </div>
    </div>
  );
};

export default CoursePlayer;

