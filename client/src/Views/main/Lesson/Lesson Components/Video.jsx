import { useState } from "react";
import ReactPlayer from "react-player";
import VideoButton from "./VideoButton";

function Video({ src }) {
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <div className={!isPlaying ? "video active" : "video"}>
      <div className="background"></div>
      <ReactPlayer
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        width={"100%"}
        height={"auto"}
        url={src}
        controls={true}
      />
      <VideoButton className={!isPlaying ? "active" : ""} />
    </div>
  );
}

export default Video;
