import MainPage from "../Views/main/MainPage";
import MyCourses from "../Views/main/MyCourses";
import { defaultRoutes } from "./DefaultRoutes";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import Course from "../Views/main/Course/index.jsx";
import Lesson from "../Views/main/Lesson/index.jsx"
import AllCoursesAuthorized from "../Views/main/AllCoursesAuthorized";
import AboutUs from "../Views/main/Lesson/About Us/AboutUs";

const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/my-courses" element={<MyCourses />} />
      <Route path="/courses" element={<AllCoursesAuthorized />} />
      <Route path="/courses/:courseId" element={<Course />} />
      <Route path="/courses/6419340ba14d67ffaa455692/6419340ba14d67ffaa455694" element={<AboutUs />} />;
      <Route path="/courses/:courseId/:lessonId" element={<Lesson />} />
      {defaultRoutes.map((e, key) => {
        return <Route path={e.path} key={key} element={e.element} />;
      })}
    </Routes>
  );
};

export default UserRoutes;
