import Bread from "../../components/bread/Bread.jsx";
import Header from "../../components/header/Header.jsx";
import PageTitle from "../../components/titles/PageTitle";
import "./style/index.scss";
import {
  getLessonWithTest,
  getClassInfo,
  passLesson,
} from "../../../Api/queries";
import useSumbitForm from "../../../utils/submitForm";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Video from "./Lesson Components/Video.jsx";
import Footer from "../../components/footer/Footer.jsx";
import * as appSelectors from "../../../redux/app/selectors";
import getNextLevel from "../../../utils/getNextLevel";
import { initApp } from "../../../redux/app/reducer";
import MainButton from "../../components/buttons/MainButton.jsx";
import Test from "../Test/index.jsx";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/loading/index.jsx";

function Lesson() {
  const dispatch = useDispatch();
  const user = useSelector(appSelectors.appSelector);
  let { courseId, lessonId } = useParams();
  const [isTest, setIsTest] = useState(false);
  const [state, setState] = useState(false);
  const [isTestPassed, setIsTestPassed] = useState(false);
  const [getCourse, l] = useSumbitForm(() => getClassInfo(courseId), true);
  const [lesson, setLesson] = useState({});
  const [nextLessonId, setNextLessonId] = useState();
  const [prevLessonId, setPrevLessonId] = useState();
  const [link, setLink] = useState();
  const [getLesson, loading] = useSumbitForm(
    () => getLessonWithTest(courseId, lessonId),
    true
  );
  const [passLessonFunction, loading2] = useSumbitForm(
    () => passLesson(courseId, lessonId),
    true
  );

  const goNext = (isLastTest) => {
    if (lesson?.test?.length === 0) {
      passLessonFunction({}, () => {});
    }
    if (isLastTest) {
      dispatch(
        initApp({
          user: { ...user.user, level: getNextLevel(user.user.level) },
        })
      );
    }
    setIsTestPassed(false);
    setState((state) => !state);
  };

  useEffect(() => {
    getCourse({}, (data) => {
      setNextLessonId(
        data?.lessons[
          data?.lessons?.findIndex((lesson) => {
            return lesson._id === lessonId;
          }) + 1
        ]?._id || null
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
      console.log(data?.test?.length === 0, data.lesson.passed);
      if (data?.test?.length === 0 || data.lesson.passed) {
        setIsTestPassed(true);
      }
    });
  }, [state]);

  const isLastTest = nextLessonId === null;
  if (nextLessonId === null && link !== "/courses/" + courseId)
    setLink("/courses/" + courseId);
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
              proggress={100}
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
                      setIsTestPassed(false);
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
                <Link
                  onClick={() => goNext(isLastTest)}
                  to={link ? link : `/courses/${courseId}/${nextLessonId}`}
                >
                  <MainButton
                    color="transparent-yellow"
                    arrowRight
                    disabled={!isTestPassed}
                    className={!isTestPassed ? "disabled" : ""}
                  >
                    {!isLastTest ? "Հետագա" : "Ավարտել"}
                  </MainButton>
                </Link>
              ) : (
                <MainButton
                  color="transparent-yellow"
                  arrowRight
                  disabled={!isTestPassed}
                  className={!isTestPassed ? "disabled" : ""}
                >
                  {!isLastTest ? "Հետագա" : "Ավարտել"}
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
