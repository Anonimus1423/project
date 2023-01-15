import { createBrowserRouter } from "react-router-dom";
import App from "./App";

export const routes = createBrowserRouter([
  {
    path: "/forget/step2/:token",
    element: <div>token</div>,
  },
  {
    path: "/",
    element: <App />,
  },
]);
