import { createBrowserRouter } from "react-router-dom";
import CreateClass from "../Views/admin/CreateClass";
import AdminMainPage from "../Views/admin/MainPage";
import AdminUsersPage from "../Views/admin/Users";

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
]);
