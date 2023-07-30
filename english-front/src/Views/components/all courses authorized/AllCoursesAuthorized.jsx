import CourseBlock from "../../components/course block/CourseBlock";
import getNormalDate from "../../../utils/getNormalDate";
import { useEffect, useState } from "react";
import * as appSelectors from "../../../redux/app/selectors";
import { useSelector } from "react-redux";
import useSumbitForm from "../../../utils/submitForm";
import getOpenedLevel from "../../../utils/getOpenedLevel";
import sortCourses from "../../../utils/sortCourses";

function AllCoursesAuthorizedComponent({ courses }) {
  const app = useSelector(appSelectors.appSelector);
  const openedLevel = getOpenedLevel(app.user.level || "A1");
  return courses
    .filter((course) => {
      return !course.course.tags.includes("hidden");
    })
    .sort((a, b) => {
      return a?.progress > b?.progress ? 1 : -1;
    })
    .sort((a, b) => (openedLevel.includes(b.course.level) ? sortCourses : -1))
    .map((course, i) => {
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
