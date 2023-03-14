import TimeIcon from "../../../images/icons/Time.svg";
import CourseLock from "../../../images/icons/Course Lock.svg";
import CourseChecked from "../../../images/icons/Course Checked.svg";
import MainButton from "../../../components/buttons/MainButton";
import { Link } from "react-router-dom";

function LessonButton({ title, time, checked, locked, active, id }) {
  return (
    <div className={active ? "lesson-button active" : "lesson-button"}>
      <h5>{title}</h5>
      <div className="lesson-button__right">
        <div className="time">
          <img src={TimeIcon} alt="time" />
          <p>{time}</p>
        </div>
        {!locked ? (
          <div className={checked ? "check-box checked" : "check-box"}>
            <img src={CourseChecked} alt="checked" />
          </div>
        ) : (
          <div className="check-box locked">
            <img src={CourseLock} alt="lock" />
          </div>
        )}
        <Link to={window.location.pathname + "/" + id}>
          <MainButton color="yellow-none-gradient" size="m" arrowRight>
            Տեսնել
          </MainButton>
        </Link>
      </div>
    </div>
  );
}

export default LessonButton;
