import Test from "../Views/main/Test";
import TestImage from "../Views/images/Test Image.png"
import Result from "../Views/main/Result/Index.jsx";
import AllCourses from "../Views/main/AllCourses";

export const defaultRoutes = [
  {
    path: "/test",
    element: <Test test=
    {
      {
        title: "Ստուգեք Ձեր անգլերենի մակարդակը",
        questions: [
          {
            image: TestImage,
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient?",
            answers: ["answer1", "answer2","answer3", "answer4"],
            answerIndex: 2,
          },
          {
            image: TestImage,
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar",
            answers: ["answer11", "answer21","answer31", "answer41"],
            answerIndex: 2,
          },
          {
            image: TestImage,
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin",
            answers: ["answer13", "answer23","answer33", "answer43"],
            answerIndex: 2,
          }
          ]
      }
    } />
  },
  {
    path: "/test-results",
    element: <Result />
  },
  {
    path: "/courses",
    element: <AllCourses />
  }
];
