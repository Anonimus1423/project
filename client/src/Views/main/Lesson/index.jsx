import Bread from "../../components/bread/Bread.jsx";
import Header from "../../components/header/Header.jsx";
import PageTitle from "../../components/titles/PageTitle";
import "./style/index.scss";
import { getLessonWithTest } from "../../../Api/queries";
import useSumbitForm from "../../../utils/submitForm";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Video from "./Lesson Components/Video.jsx";

function Lesson() {
  let { courseId, lessonId } = useParams();
  const [getLesson, loading] = useSumbitForm(
    () => getLessonWithTest(courseId, lessonId),
    true
  );
  const [lesson, setLesson] = useState({});
  useEffect(() => {
    getLesson({}, (data) => {
      setLesson(data);
    });
  }, []);
  console.log();
  return (
    <div className="lesson right-main-container">
      <Header
        buttons={{
          firstText: "Անգլերենի մակարդակի ստուգում",
          secondText: "Գրանցվել անվճար",
          firstLink: "/test",
          secondLink: "/registration",
        }}
      />
      <div className="right-container lesson">
        <Bread
          elements={[
            ["Գլխավոր", "/"],
            ["Բալոր դասընթացները", "/courses"],
            ["A1", "/courses/" + lesson?.lesson?.courseId],
            [
              "Класс 3",
              "/courses/" +
                lesson?.lesson?.courseId +
                "/" +
                lesson?.lesson?._id,
            ],
          ]}
        />
        <PageTitle
          title={lesson?.lesson?.title}
          time={lesson?.lesson?.time}
          proggress={30}
        />
        <Video src={lesson?.lesson?.videoUrl.toString()} />
      </div>
    </div>
  );
}

export default Lesson;
