import "./style/index.scss"
import InfoBlock from "./components/InfoBlock";
import {ReactComponent as StudyIcon} from "../../images/icons/Study.svg";
import {ReactComponent as VideoIcon} from "../../images/icons/Video.svg";
import {ReactComponent as PenIcon} from "../../images/icons/Pen.svg";

function AdditionalInformation() {
    return ( 
        <section className="additionalInformation right-container">
            <InfoBlock text="աշակերտ" number="1856" Icon={StudyIcon} />
            <InfoBlock text="վիդեոդասեր" number="354" Icon={VideoIcon} />
            <InfoBlock text="դրական կարծիք" number="50" Icon={PenIcon} />
        </section>    
    );
}

export default AdditionalInformation;