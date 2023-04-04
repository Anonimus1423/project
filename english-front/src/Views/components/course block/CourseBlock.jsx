import "./style/index.scss";
import { ReactComponent as Share } from "../../images/icons/Share.svg";
import { ReactComponent as Lock } from "../../images/icons/Lock.svg";
import { Link } from "react-router-dom";
import Loading from "../loading";

function CourseBlock({
  title,
  description,
  tags,
  date,
  Image,
  proggress,
  closed,
  id,
  loading,
  href,
}) {
  return (
    <Link
      to={href ? href : !closed ? "/courses/" + id : "#"}
      className={
        closed
          ? "course closed"
          : proggress === 100
          ? "course active"
          : "course"
      }
    >
      <div className="close-block">
        <Lock />
      </div>
      <div className="course__body">
        {!loading ? (
          <>
            <div className="left">
              <img src={Image} />
            </div>
            <div className="right">
              <div className="top">
                <ul className="tags">
                  {tags?.map((tagText) => {
                    return (
                      <li
                        key={Math.random()}
                        className={
                          Math.random() > 0.5 ? "tag yellow" : "tag purple"
                        }
                      >
                        <p className="s">{tagText}</p>
                      </li>
                    );
                  })}
                  {proggress !== 100 ? null : (
                    <li className="tag">
                      <p className="s">ավարտված</p>
                    </li>
                  )}
                </ul>
                <div className="share">
                  <Share />
                  <p className="m">{date}</p>
                </div>
              </div>
              <h3 className="h4">{title}</h3>
              <p className="m">{description}</p>
            </div>
          </>
        ) : (
          <>
            <div className="left">
              <img src={Image} />
            </div>
            <Loading />
          </>
        )}
        {proggress ? (
          <div className="proggress">
            <div className="proggress__back"></div>
            <div
              style={{ width: proggress + "%" }}
              className="proggress__pointer"
            ></div>
          </div>
        ) : null}
      </div>
    </Link>
  );
}

export default CourseBlock;
