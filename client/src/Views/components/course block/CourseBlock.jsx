import "./style/index.scss"
import { ReactComponent as Share} from "../../images/icons/Share.svg"

function CourseBlock({ title, description, tags, date, Image, proggress }) {
    return ( 
        <div className="course">
            <div className="course__body">
                <div className="left">
                    <Image />
                </div>
                <div className="right">
                    <div className="top">
                        <ul className="tags">
                            {tags.map(tagText => {
                                return <li key={Math.random()} className={(Math.random() > 0.5) ? "tag yellow" : "tag purple"}><p className="s">{tagText}</p></li>
                            })}
                        </ul>
                        <div className="share">
                            <Share />
                            <p className="m">{date}</p>
                        </div>
                    </div>
                    <h3 className="h4">{title}</h3>
                    <p className="m">{description}</p>
                </div>
                {
                    proggress
                    ?
                    <div className="proggress">
                        <div className="proggress__back"></div>
                        <div style={{ width: proggress + "%" }} className="proggress__pointer"></div>
                    </div>
                    :
                    null
                }
            </div>
        </div>
    );
}

export default CourseBlock;