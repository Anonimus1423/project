import { createBrowserRouter } from "react-router-dom";
import MainPage from "../Views/main/MainPage";
import MyCourses from "../Views/main/MyCourses";
import { defaultRoutes } from "./DefaultRoutes";
import Course from "../Views/main/Course/index.jsx"

export const userRoutes = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/my-courses",
    element: <MyCourses />,
  },
  {
    path: "/course",
    element: <Course />,
  },
  ...defaultRoutes,
]);
