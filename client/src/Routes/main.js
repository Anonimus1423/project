import { Route, Routes } from "react-router-dom";
import {
  ForgetPasswordStep1,
  ForgetPasswordStep2,
} from "../Views/main/ForgetPassword";
import LoginPage from "../Views/main/Login";
import MainPageUnAuthorized from "../Views/main/MainPageUnAuthorized";
import RegistrPage from "../Views/main/Registr";
import { defaultRoutes } from "./DefaultRoutes";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPageUnAuthorized />} />
      <Route path="/log-in" element={<LoginPage />} />
      <Route path="/registration" element={<RegistrPage />} />
      <Route path="/forget-password" element={<ForgetPasswordStep1 />} />
      <Route path="/forget-password/:token" element={<ForgetPasswordStep2 />} />
      {defaultRoutes.map((e, key) => {
        return <Route path={e.path} key={key} element={e.element} />;
      })}
    </Routes>
  );
};

export default MainRoutes;
