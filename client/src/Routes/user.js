import MainPage from "../Views/main/MainPage";
import MyCourses from "../Views/main/MyCourses";
import { defaultRoutes } from "./DefaultRoutes";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";

const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/my-courses" element={<MyCourses />} />
      {defaultRoutes.map((e, key) => {
        return <Route path={e.path} key={key} element={e.element} />;
      })}
    </Routes>
  );
};

export default UserRoutes;
