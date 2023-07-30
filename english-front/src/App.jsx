import React, { useEffect, useState } from "react";
import { authUser, getCoursesList } from "./Api/queries";
import useSumbitForm from "./utils/submitForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainRoutes from "./Routes/main";
import UserRoutes from "./Routes/user";
import { adminRoutes } from "./Routes/admin";
import { BrowserRouter, RouterProvider } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as appSelectors from "./redux/app/selectors";
import { initApp } from "./redux/app/reducer";
import "./index.scss";
import "./Views/style/main.scss";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { getCoursesCompleted } from "./redux/courses/reducer";
import Sidebar from "./Views/components/sidebar/Sidebar";

function App() {
  const role = useSelector(appSelectors.roleSelector);
  const [init, loading] = useSumbitForm(authUser, true);
  const [getCourses] = useSumbitForm(getCoursesList, true);
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
  const [sidebarOpened, setSidebarOpened] = useState(false);
  useEffect(() => {
    sidebarOpened
      ? (document.documentElement.style = "overflow: hidden;")
      : (document.documentElement.style = "");
  }, [sidebarOpened]);
  return (
    <div className="App">
      <ToastContainer />
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <div className="main__routes big-container">
          {(!loading || role === 0) && (
            <>
              {role === 0 && (
                <>
                  <BrowserRouter>
                    <div
                      className={
                        sidebarOpened
                          ? "sidebar-button active"
                          : "sidebar-button"
                      }
                      onClick={() => setSidebarOpened((state) => !state)}
                    >
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                    <div
                      className={
                        sidebarOpened
                          ? "black-background active"
                          : "black-background"
                      }
                      onClick={() => setSidebarOpened((state) => !state)}
                    ></div>
                    <Sidebar
                      noUser={true}
                      sidebarOpened={sidebarOpened}
                      setSidebarOpened={setSidebarOpened}
                    />
                    <MainRoutes loading />
                  </BrowserRouter>
                </>
              )}
              {role === 1 && (
                <>
                  <BrowserRouter>
                    <div
                      className={
                        sidebarOpened
                          ? "sidebar-button active"
                          : "sidebar-button"
                      }
                      onClick={() => setSidebarOpened((state) => !state)}
                    >
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                    <div
                      className={
                        sidebarOpened
                          ? "black-background active"
                          : "black-background"
                      }
                      onClick={() => setSidebarOpened((state) => !state)}
                    ></div>
                    <Sidebar
                      sidebarOpened={sidebarOpened}
                      setSidebarOpened={setSidebarOpened}
                    />
                    <UserRoutes />
                  </BrowserRouter>
                </>
              )}
              {role === 2 && <RouterProvider router={adminRoutes} />}
            </>
          )}
        </div>
      </LocalizationProvider>
    </div>
  );
}

export default App;
