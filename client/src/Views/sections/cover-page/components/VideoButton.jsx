import { ReactComponent as PlayButtonIcon} from "../../../images/icons/Video Play.svg"

function VideoButton() {
    return ( 
        <button className="play-button">
            <PlayButtonIcon />
            <h4 className="subtitle">Ինչպես օգտվել մեր կայքից</h4>
        </button>
    );
}

export default VideoButton;