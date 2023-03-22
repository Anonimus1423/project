import Bread from "../../components/bread/Bread.jsx";
import Header from "../../components/header/Header.jsx";
import PageTitle from "../../components/titles/PageTitle";
import "./style/index.scss";
import { getLessonWithTest, getClassInfo } from "../../../Api/queries";
import useSumbitForm from "../../../utils/submitForm";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Video from "./Lesson Components/Video.jsx";
import Footer from "../../components/footer/Footer.jsx";
import MainButton from "../../components/buttons/MainButton.jsx";
import Test from "../Test/index.jsx";
import Loading from "../../components/loading/index.jsx";

function Lesson() {
  let { courseId, lessonId } = useParams();
  const [isTest, setIsTest] = useState(false);
  const [state, setState] = useState(false);
  const [isTestPassed, setIsTestPassed] = useState(false);
  const [getCourse, l] = useSumbitForm(() => getClassInfo(courseId), true);
  const [lesson, setLesson] = useState({});
  const [nextLessonId, setNextLessonId] = useState();
  const [prevLessonId, setPrevLessonId] = useState();
  const [getLesson, loading] = useSumbitForm(
    () => getLessonWithTest(courseId, lessonId),
    true
  );
  useEffect(() => {
    getCourse({}, (data) => {
      setNextLessonId(
        data?.lessons[
          data?.lessons?.findIndex((lesson) => {
            return lesson._id === lessonId;
          })
        ]?._id + 1
      );
      setPrevLessonId(
        data?.lessons[
          data?.lessons?.findIndex((lesson) => {
            return lesson._id === lessonId;
          }) - 1
        ]?._id
      );
    });
    getLesson({}, (data) => {
      setLesson(data);
      if (data?.test?.length === 0) {
        setIsTestPassed(true);
      }
    });
  }, [state]);
  if (!isTest) {
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
        {l || loading ? (
          <Loading className="lesson" />
        ) : (
          <div className="right-container lesson">
            <Bread
              elements={[
                ["Գլխավոր", "/"],
                ["Բալոր դասընթացները", "/courses"],
                ["Դասընթաց", "/courses/" + lesson?.lesson?.courseId],
                [
                  "մոդուլ",
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
            <Video src={lesson?.lesson?.videoUrl?.toString()} />
            <div
              className="lesson-content"
              dangerouslySetInnerHTML={{ __html: lesson?.lesson?.description }}
            ></div>
            <div className="test-buttons">
              <div className="hide">
                <MainButton color="yellow">
                  ԱՆՑՆԵԼ ԼԵԶՎԻ ՄԱՐԴԱԿԻ ԹԵՍՏ
                </MainButton>
              </div>
              {prevLessonId ? (
                <Link
                  to={`/courses/${courseId}/${prevLessonId}`}
                  onClick={() => {
                    if (prevLessonId) {
                      setState((state) => !state);
                    }
                  }}
                >
                  <MainButton color="transparent-yellow" arrowLeft>
                    Նախորդը
                  </MainButton>
                </Link>
              ) : (
                <MainButton
                  color="transparent-yellow"
                  arrowLeft
                  disabled={true}
                  className="disabled"
                >
                  Նախորդը
                </MainButton>
              )}
              <MainButton
                disabled={isTestPassed}
                color="yellow"
                onClick={() => setIsTest(true)}
                className={isTestPassed ? "disabled" : null}
              >
                ԱՆՑՆԵԼ ԼԵԶՎԻ ՄԱՐԴԱԿԻ ԹԵՍՏ
              </MainButton>
              {isTestPassed ? (
                <Link to={`/${courseId}/${nextLessonId}`}>
                  <MainButton
                    color="transparent-yellow"
                    arrowRight
                    disabled={!isTestPassed}
                    className={!isTestPassed ? "disabled" : ""}
                  >
                    Հետագա
                  </MainButton>
                </Link>
              ) : (
                <MainButton
                  color="transparent-yellow"
                  arrowRight
                  disabled={!isTestPassed}
                  className={!isTestPassed ? "disabled" : ""}
                >
                  Հետագա
                </MainButton>
              )}
            </div>
          </div>
        )}
        <Footer fixed={l || loading} />
      </div>
    );
  } else {
    return (
      <Test
        test={lesson.test}
        lesson={lesson.lesson}
        setIsTest={setIsTest}
        setIsTestPassed={setIsTestPassed}
        courseId={courseId}
      />
    );
  }
}

export default Lesson;
