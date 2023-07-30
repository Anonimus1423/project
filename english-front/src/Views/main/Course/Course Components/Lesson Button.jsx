import TimeIcon from "../../../images/icons/Time.svg";
import CourseLock from "../../../images/icons/Course Lock.svg";
import CourseChecked from "../../../images/icons/Course Checked.svg";
import MainButton from "../../../components/buttons/MainButton";
import { Link } from "react-router-dom";

function LessonButton({
  title,
  time,
  checked,
  locked,
  active,
  id,
  className,
  passed,
}) {
  return (
    <div
      className={
        active
          ? "lesson-button active " + className
          : "lesson-button " + className
      }
    >
      <h5>{title}</h5>
      <div className="lesson-button__right">
        <div className="time">
          <img src={TimeIcon} alt="time" />
          <p>{time}</p>
        </div>
        {locked ? (
          <div className="check-box locked">
            <img src={CourseLock} alt="lock" />
          </div>
        ) : passed ? (
          <div className={checked ? "check-box checked" : "check-box"}>
            <img src={CourseChecked} alt="checked" />
          </div>
        ) : (
          <div className={checked ? "check-box" : "check-box"}>
            <img src={CourseChecked} alt="checked" />
          </div>
        )}
        {!locked ? (
          <Link to={window.location.pathname + "/" + id}>
            <MainButton
              color={"yellow-none-gradient " + className}
              size="m"
              arrowRight
            >
              Տեսնել
            </MainButton>
          </Link>
        ) : (
          <MainButton
            color={"yellow-none-gradient locked " + className}
            size="m"
            arrowRight
          >
            Տեսնել
          </MainButton>
        )}
      </div>
    </div>
  );
}

export default LessonButton;
