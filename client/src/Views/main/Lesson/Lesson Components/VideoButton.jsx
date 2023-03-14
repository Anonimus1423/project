import { ReactComponent as PlayButtonIcon } from "../../../images/icons/Play Button Image.svg";

function VideoButton({ className }) {
  return (
    <div className={"video-button " + className}>
      <PlayButtonIcon />
    </div>
  );
}

export default VideoButton;
