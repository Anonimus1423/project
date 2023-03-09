import { createBrowserRouter } from "react-router-dom";
import {
  ForgetPasswordStep1,
  ForgetPasswordStep2,
} from "../Views/main/ForgetPassword";
import LoginPage from "../Views/main/Login";
import MainPageUnAuthorized from "../Views/main/MainPageUnAuthorized";
import RegistrPage from "../Views/main/Registr";
import { defaultRoutes } from "./DefaultRoutes";

export const mainRoutes = createBrowserRouter([
  {
    path: "/",
    element: <MainPageUnAuthorized />
  },
  {
    path: "/log-in",
    element: <LoginPage />,
  },
  {
    path: "/registration",
    element: <RegistrPage />,
  },
  {
    path: "/forget-password",
    element: <ForgetPasswordStep1 />,
  },
  {
    path: "/forget-password/:token",
    element: <ForgetPasswordStep2 />,
  },
  ...defaultRoutes,
]);
