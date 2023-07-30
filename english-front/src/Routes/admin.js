import { createBrowserRouter } from "react-router-dom";
import CreateClass from "../Views/admin/CreateClass";
import AdminMainPage from "../Views/admin/MainPage";
import AdminUsersPage from "../Views/admin/Users";
import { EditClass } from "./../Views/admin/EditClass/index";
import Main from "../Views/main";
import { defaultRoutes } from "./DefaultRoutes";
import { DefaultTestAdmin } from "./../Views/admin/DefaultTest/index";
import AddintionalInformationPage from "../Views/admin/AddintionalPage";

export const adminRoutes = createBrowserRouter([
  {
    path: "/",
    element: <AdminMainPage />,
  },
  {
    path: "/admin/create",
    element: <CreateClass />,
  },
  {
    path: "/admin/users",
    element: <AdminUsersPage />,
  },
  {
    path: "/admin/edit/:id",
    element: <EditClass />,
  },
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "/default-test",
    element: <DefaultTestAdmin />,
  },
  {
    path: "/addintional",
    element: <AddintionalInformationPage />,
  },
  ...defaultRoutes,
]);
