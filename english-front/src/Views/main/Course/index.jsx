import Bread from "../../components/bread/Bread";
import Header from "../../components/header/Header";
import PageTitle from "../../components/titles/PageTitle";
import About from "./Course Components/About";
import LessonButton from "./Course Components/Lesson Button";
import "./style/index.scss";
import "./style/about.scss";
import "./style/lesson button.scss";
import useSumbitForm from "../../../utils/submitForm";
import { getUserClassInfo } from "../../../Api/queries";
import Footer from "../../components/footer/Footer";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../components/loading";

function Course() {
  let { courseId } = useParams();
  const [getCourse, loading] = useSumbitForm(
    () => getUserClassInfo(courseId),
    true
  );

  const [course, setCourse] = useState({});

  useEffect(() => {
    getCourse({}, (data) => {
      setCourse(data);
    });
  }, []);
  let courseProggress =
    course?.lessons?.length -
    course?.lessons?.reverse().findIndex((lesson) => lesson.passed);
  if (courseProggress === course?.lessons?.length + 1) courseProggress = 0;
  course?.lessons?.reverse();

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
            className={course?.course?.level}
          />
          <PageTitle
            title={course?.course?.title}
            tags={course?.course?.tags}
            proggress={course?.progress}
            className={course?.course?.level}
          />
          <About
            title="Դասընթացի մասին"
            description={course?.course?.description}
            image={course?.course?.picture_src}
            className={course?.course?.level}
          />
          {course?.lessons
            ? course.lessons?.map((lesson, id) => {
                let locked = false;
                if (id >= courseProggress + 1) locked = true;
                return (
                  <LessonButton
                    key={id}
                    id={lesson._id}
                    title={lesson.title}
                    time={lesson.time}
                    checked
                    className={course?.course.level}
                    passed={lesson.passed}
                    locked={locked}
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
