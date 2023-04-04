import { useState } from "react";
import { ReactComponent as PlayButtonIcon } from "../../../images/icons/Video Play.svg";
import ReactPlayer from "react-player";
import VB from "../../../main/Lesson/Lesson Components/VideoButton";

function VideoButton() {
  const [play, setPlay] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  if (play) {
    return (
      <>
        <div
          className="video-black-background"
          onClick={() => setPlay((state) => !state)}
        ></div>
        <div
          className={
            !isPlaying ? "video active fixed-video" : "video fixed-video"
          }
        >
          <div className="background"></div>
          <ReactPlayer
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            width={"100%"}
            height={"auto"}
            url={
              "https://golanguageschool.org/wp-content/uploads/2022/10/SIA-Armenia-2022-Finalist_-Teach-Free.mp4"
            }
            controls={true}
          />
          <VB className={!isPlaying ? "active" : ""} />
        </div>
      </>
    );
  }
  return (
    <button className="play-button" onClick={() => setPlay((state) => !state)}>
      <PlayButtonIcon />
      <h4 className="subtitle">Ինչպես օգտվել մեր կայքից</h4>
    </button>
  );
}

export default VideoButton;
