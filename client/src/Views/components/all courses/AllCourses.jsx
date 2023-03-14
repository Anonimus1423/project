import { selectAllCourses } from "../../../redux/courses/selectors";
import { useSelector } from "react-redux";
import CourseBlock from "../../components/course block/CourseBlock";
import getNormalDate from "../../../utils/getNormalDate";

function AllCoursesComponent() {
  const courses = useSelector(selectAllCourses);
  return courses.map((course, i) => {
    return (
      <CourseBlock
        title={course.title}
        description={course.description}
        tags={course.tags}
        date={getNormalDate(course.created_at)}
        Image={course.picture_src}
        id={course._id}
        key={i}
      />
    );
  });
}

export default AllCoursesComponent;
