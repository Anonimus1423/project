import React, { useEffect } from "react";
import { authUser, getCoursesList } from "./Api/queries";
import useSumbitForm from "./utils/submitForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { mainRoutes } from "./Routes/main";
import { userRoutes } from "./Routes/user";
import { adminRoutes } from "./Routes/admin";
import { RouterProvider } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as appSelectors from "./redux/app/selectors";
import { initApp } from "./redux/app/reducer";
import "./index.scss";
import "./Views/style/main.scss";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { selectAllCourses } from "./redux/courses/selectors";
import { getCoursesCompleted } from "./redux/courses/reducer";

function App() {
  const role = useSelector(appSelectors.roleSelector);
  const [init, loading] = useSumbitForm(authUser, true);
  const [getCourses] = useSumbitForm(getCoursesList, true);
  const courses = useSelector(selectAllCourses);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    getCourses({}, (data) => {
      dispatch(getCoursesCompleted(data));
    });
    if (token) {
      init({}, (data) => {
        dispatch(initApp(data));
      });
      return;
    }
  }, []);

  return (
    <div className="App">
      <ToastContainer />
      <LocalizationProvider dateAdapter={AdapterMoment}>
        {(!loading || role === 0) && (
          <>
            {role === 0 && <RouterProvider router={mainRoutes} />}
            {role === 1 && <RouterProvider router={userRoutes} />}
            {role === 2 && <RouterProvider router={adminRoutes} />}
          </>
        )}
      </LocalizationProvider>
      asd
    </div>
  );
}

export default App;
