import { createBrowserRouter } from "react-router-dom";
import CreateClass from "../Views/admin/CreateClass";

export const adminRoutes = createBrowserRouter([
  {
    path: "/",
    element: <div>admin</div>,
  },
  {
    path: "/admin/create",
    element: <CreateClass />,
  },
]);
