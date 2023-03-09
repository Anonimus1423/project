import { selectAllCourses } from "../../../redux/courses/selectors";
import { useSelector } from "react-redux";
import CourseBlock from "../../components/course block/CourseBlock";

function AllCoursesComponent() {
  const courses = useSelector(selectAllCourses);
  return courses.map((course, i) => {
    const date = new Date(course.created_at);
    const year = date.getFullYear();
    const month = date.getMonth() > 9 ? date.getMonth() : "0" + date.getMonth();
    const day = date.getDay() > 9 ? date.getDay() : "0" + date.getDay();
    return (
      <CourseBlock
        title={course.title}
        description={course.description}
        tags={course.tags}
        date={year + "." + month + "." + day}
        Image={course.picture_src}
        key={i}
      />
    );
  });
}

export default AllCoursesComponent;
