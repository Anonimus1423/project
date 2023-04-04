import { useEffect, useState } from "react";
import MainButton from "../../components/buttons/MainButton";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import { useSelector } from "react-redux";
import "./style/index.scss";
import TestImage from "../../images/Test Image.png";
import { getUserDefaultTest, getUserCourses } from "../../../Api/queries";
import useSumbitForm from "../../../utils/submitForm";
import Result from "../Result/Index";
import Loading from "../../components/loading";
import getEnglishLevel from "../../../utils/getEnglishLevel";
import getNextLevel from "../../../utils/getNextLevel";
import * as appSelectors from "../../../redux/app/selectors";
import axios from "axios";
axios.defaults.baseURL = process.env.REACT_APP_AXIOS;

function Test({ test, lesson, setIsTest, setIsTestPassed, courseId }) {
  let isDefaultTest = false;
  const role = useSelector(appSelectors.roleSelector);
  if (window.location.pathname === "/test") {
    isDefaultTest = true;
  }
  const [currentTest, setCurrentTest] = useState(test);
  const [step, setStep] = useState(0);
  const [testAnswer, setTestAnswer] = useState(null);
  const [isAnswered, setIsAnsered] = useState(false);
  const [falseAndTrueAnsers, setFalseAndTrueAnsers] = useState({
    falseAnswer: null,
    trueAnswer: null,
  });
  const [score, setScore] = useState(0);
  const [answers, setAnsers] = useState([]);
  const [userCourses, loading1] = useSumbitForm(getUserCourses, true);
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    if (isDefaultTest) {
      axios.get(`/api/test`).then((data) => {
        setCurrentTest(data.data);
      });
    }
    if (role === 1) {
      userCourses({}, (data) => {
        setCourses(data.data);
      });
    }
  }, []);
  const checkAnswer = (answerIndex) => {
    if (answerIndex || answerIndex === 0) {
      if (answerIndex === currentTest[step].answerIndex) {
        setScore((score) => score + 1);
      }
      setAnsers([
        ...answers,
        {
          questionIndex: step,
          falseAnswer: answerIndex,
          trueAnswer: currentTest[step].answerIndex,
        },
      ]);
      setFalseAndTrueAnsers({
        falseAnswer: answerIndex,
        trueAnswer: currentTest[step].answerIndex,
      });
      setIsAnsered(true);
    }
  };

  const nextStep = () => {
    setStep((step) => step + 1);
  };
  const previousStep = () => {
    if (step > 0) setStep((step) => step - 1);
  };

  const restart = () => {
    setAnsers([]);
    setStep(0);
  };

  useEffect(() => {
    const answer = answers?.find((answer) => answer.questionIndex === step);
    if (answer) {
      setIsAnsered(true);
      setFalseAndTrueAnsers({
        falseAnswer: answer.falseAnswer,
        trueAnswer: answer.trueAnswer,
      });
    } else {
      setIsAnsered(false);
      setTestAnswer(null);
      setFalseAndTrueAnsers({
        falseAnswer: null,
        trueAnswer: null,
      });
    }
  }, [step]);
  if (currentTest) {
    if (step < currentTest?.length) {
      return (
        <div className="right-main-container test-container">
          <Header
            buttons={{
              firstText: "Անգլերենի մակարդակի ստուգում",
              secondText: "Գրանցվել անվճար",
              firstLink: "/test",
              secondLink: "/registration",
            }}
          />
          <h2 className="secondPage">
            {lesson?.title || "English Level Test"}
          </h2>
          <div className="test-container test-container-2">
            <div className="test">
              <div className="test-top">
                <p className="m">Выбери правильный вариант</p>
                <p className="subtitle h2">
                  {step + 1} \ {currentTest?.length}
                </p>
              </div>
              <div className="test-bottom">
                <img src={TestImage} alt="Test Images" />
                <div className="question">
                  <h5>{currentTest[step]?.description}</h5>
                  <div className="answers">
                    {currentTest[step]?.answers?.map((answer, i) => (
                      <div
                        key={Math.random()}
                        className={
                          falseAndTrueAnsers.trueAnswer === i
                            ? "true answer"
                            : falseAndTrueAnsers.falseAnswer === i
                            ? "false answer"
                            : i === testAnswer
                            ? "answer active"
                            : "answer"
                        }
                        onClick={() => {
                          if (!isAnswered) setTestAnswer(i);
                        }}
                      >
                        <div className="answer-body">{answer}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="test-buttons">
                  <div className="hide">
                    <MainButton
                      color="yellow"
                      onClick={() => {
                        if (!isAnswered) checkAnswer(testAnswer);
                      }}
                    >
                      Պատասխանել
                    </MainButton>
                  </div>
                  <MainButton
                    color="transparent-yellow"
                    arrowLeft
                    onClick={() => previousStep()}
                  >
                    Նախորդը
                  </MainButton>
                  <MainButton
                    color="yellow"
                    onClick={() => {
                      if (!isAnswered) checkAnswer(testAnswer);
                    }}
                  >
                    Պատասխանել
                  </MainButton>
                  <MainButton
                    color="transparent-yellow"
                    arrowRight
                    className={!isAnswered ? "disabled" : ""}
                    disabled={!isAnswered}
                    onClick={() => nextStep()}
                  >
                    Հետագա
                  </MainButton>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      );
    } else {
      return (
        <Result
          title={lesson?.title}
          description={
            <>
              Շնորհավորում ենք դուք անցել եք թեստը <br /> կիսվեք Ձեր
              հաջողությամբ սոցիալական կայքերում
            </>
          }
          leftButtonText="Վերանայել"
          buttonText={
            isDefaultTest ? "Բարելավիր քո անգլերենը!" : "Վերադառնալ դասընթացին"
          }
          buttonLeftText={
            isDefaultTest ? (
              <>
                Անցիր մեր դասընթացը հատուկ
                {" " + getEnglishLevel(score)} <br /> մակարդակի համար
              </>
            ) : (
              <>
                Անցիր մեր դասընթացը հատուկ
                {getNextLevel(getEnglishLevel(score))} <br /> մակարդակի համար
              </>
            )
          }
          tableInfo={
            !isDefaultTest
              ? [
                  {
                    title: "Բոլոր հարցերը",
                    value: currentTest?.length,
                  },
                  {
                    title: "Ջիշտ պատասխաններ",
                    value: score,
                  },
                  {
                    title: "Սխալ պատասխաններ",
                    value: currentTest?.length - score,
                  },
                ]
              : [
                  {
                    title: "Բոլոր հարցերը",
                    value: currentTest?.length,
                  },
                  {
                    title: "Ջիշտ պատասխաններ",
                    value: score,
                  },
                  {
                    title: "Սխալ պատասխաններ",
                    value: currentTest?.length - score,
                  },
                  {
                    title: "Ձեր Անգլերենի Մակարդակը",
                    value: getEnglishLevel(score),
                  },
                ]
          }
          level={getEnglishLevel(score) || null}
          setStep={setStep}
          setIsTest={setIsTest}
          role={role}
          score={score}
          setIsTestPassed={setIsTestPassed}
          testLength={currentTest?.length}
          Ids={{ lessonId: lesson?._id, courseId: courseId }}
          isDefaultTest={isDefaultTest}
          courseLink={`/courses/${
            courses?.find((course) => {
              return course?.course?.level === getEnglishLevel(score);
            })?.course._id
          }`}
        />
      );
    }
  } else {
    return (
      <div className="right-main-container test-container">
        <Header
          buttons={{
            firstText: "Անգլերենի մակարդակի ստուգում",
            secondText: "Գրանցվել անվճար",
            firstLink: "/test",
            secondLink: "/registration",
          }}
        />
        <Loading />
      </div>
    );
  }
}

export default Test;
