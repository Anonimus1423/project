import { createBrowserRouter } from "react-router-dom";
import Main from "../Views/main";
import { defaultRoutes } from "./DefaultRoutes";

export const userRoutes = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
  ...defaultRoutes,
]);
