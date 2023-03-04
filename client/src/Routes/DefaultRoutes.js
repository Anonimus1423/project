import {
  ForgetPasswordStep1,
  ForgetPasswordStep2,
} from "../Views/main/ForgetPassword";
import LoginPage from "../Views/main/Login";
import RegistrPage from "../Views/main/Registr";
import Test from "../Views/main/Test";

export const defaultRoutes = [
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/registration",
    element: <RegistrPage />,
  },
  {
    path: "/forget-password",
    element: <ForgetPasswordStep1 />,
  },
  {
    path: "/forget-password/:token",
    element: <ForgetPasswordStep2 />,
  },
  {
    path: "/test",
    element: <Test test=
    {
      {
        title: "Ստուգեք Ձեր անգլերենի մակարդակը",
        questions: 
        {
          [
            {
              description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient?",
              answers: ["answer1", "answer2","answer1", "answer2"],
              answerIndex: "",
            }
          ]
        }
      }
    } />
  },
];
