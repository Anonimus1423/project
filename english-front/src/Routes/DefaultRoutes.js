import Test from "../Views/main/Test";
import Result from "../Views/main/Result/Index.jsx";
import AllCourses from "../Views/main/AllCourses";
import AboutUs from "../Views/main/Lesson/About Us/AboutUs";

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
  {
    path: "/courses/6419340ba14d67ffaa455692/6419340ba14d67ffaa455694",
    element: <AboutUs />,
  },
  
  
];
