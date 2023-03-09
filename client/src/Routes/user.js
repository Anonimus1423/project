import { createBrowserRouter } from "react-router-dom";
import MainPage from "../Views/main/MainPage";
import MyCourses from "../Views/main/MyCourses";
import { defaultRoutes } from "./DefaultRoutes";

export const userRoutes = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/my-courses",
    element: <MyCourses />,
  },
  ...defaultRoutes,
]);
