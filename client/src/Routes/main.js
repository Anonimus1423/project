import { createBrowserRouter } from "react-router-dom";
import MainPage from "../Views/main/MainPage";
import { defaultRoutes } from "./DefaultRoutes";

export const mainRoutes = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  ...defaultRoutes,
]);
