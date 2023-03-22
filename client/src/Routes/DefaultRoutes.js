import Test from "../Views/main/Test";
import TestImage from "../Views/images/Test Image.png";
import Result from "../Views/main/Result/Index.jsx";
import AllCourses from "../Views/main/AllCourses";

export const defaultRoutes = [
  {
    path: "/test",
    element: (
      <Test />
    ),
  },
  {
    path: "/test-results",
    element: <Result />,
  },
  {
    path: "/courses",
    element: <AllCourses />,
  },
];
