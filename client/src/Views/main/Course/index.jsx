import Bread from "../../components/bread/Bread";
import Header from "../../components/header/Header";
import PageTitle from "../../components/titles/PageTitle";
import About from "./Course Components/About";
import LessonButton from "./Course Components/Lesson Button";
import "./style/index.scss";
import "./style/about.scss";
import "./style/lesson button.scss";
import useSumbitForm from "../../../utils/submitForm";
import { getClassInfo } from "../../../Api/queries";
import Footer from "../../components/footer/Footer";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../components/loading";

function Course() {
  let { courseId } = useParams();
  const [getCourse, loading] = useSumbitForm(
    () => getClassInfo(courseId),
    true
  );

  const [course, setCourse] = useState({});

  useEffect(() => {
    getCourse({}, (data) => {
      setCourse(data);
    });
  }, []);
  console.log(course);
  return (
    <div className="right-main-container">
      <Header
        buttons={{
          firstText: "Անգլերենի մակարդակի ստուգում",
          secondText: "Գրանցվել անվճար",
          firstLink: "/test",
          secondLink: "/registration",
        }}
      />
      {!loading ? (
        <div className="course-container">
          <Bread
            elements={[
              ["Գլխավոր", "/"],
              ["Բալոր դասընթացները", "/courses"],
              ["Դասընթաց", window.location.pathname],
            ]}
            className={course?.level}
          />
          <PageTitle
            title={course?.title}
            tags={course?.tags}
            proggress={course?.proggress}
            className={course?.level}
          />
          <About
            title="Դասընթացի մասին"
            description={course?.description}
            image={course?.picture_src}
            className={course?.level}
          />
          {course?.lessons
            ? course.lessons?.map((lesson, id) => {
                return (
                  <LessonButton
                    key={id}
                    id={lesson._id}
                    title={lesson.title}
                    time={lesson.time}
                    checked
                    className={course?.level}
                  />
                );
              })
            : null}
        </div>
      ) : (
        <Loading />
      )}
      <Footer fixed={loading} />
    </div>
  );
}

export default Course;
