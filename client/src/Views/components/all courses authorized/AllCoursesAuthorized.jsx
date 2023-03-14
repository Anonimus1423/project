import CourseBlock from "../../components/course block/CourseBlock";
import getNormalDate from "../../../utils/getNormalDate";
import { useEffect, useState } from "react";
import * as appSelectors from "../../../redux/app/selectors";
import { useSelector } from "react-redux";
import useSumbitForm from "../../../utils/submitForm";
import { getUserCourses } from "../../../Api/queries";
import getOpenedLevel from "../../../utils/getOpenedLevel";

function AllCoursesAuthorizedComponent() {
  const app = useSelector(appSelectors.appSelector);
  const [userCourses, loading] = useSumbitForm(getUserCourses, true);
  const [courses, setCourses] = useState([]);
  const openedLevel = getOpenedLevel(app.user.level);
  useEffect(() => {
    userCourses({}, (data) => {
      setCourses(data.data);
    });
  }, []);

  return courses.map((course, i) => {
    const isClosed = !openedLevel.includes(course.course.level);
    return (
      <CourseBlock
        title={course.course.title}
        description={course.course.description}
        tags={course.course.tags}
        date={getNormalDate(course.course.created_at)}
        Image={course.course.picture_src}
        proggress={course.progress}
        id={course.course._id}
        key={i}
        closed={isClosed}
      />
    );
  });
}

export default AllCoursesAuthorizedComponent;
