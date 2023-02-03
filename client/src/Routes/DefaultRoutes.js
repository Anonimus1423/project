import {
  ForgetPasswordStep1,
  ForgetPasswordStep2,
} from "../Views/main/ForgetPassword";
import LoginPage from "../Views/main/Login";
import RegistrPage from "../Views/main/Registr";

export const defaultRoutes = [
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
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
];
