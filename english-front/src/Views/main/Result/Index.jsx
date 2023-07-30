import MainButton from "../../components/buttons/MainButton";
import "./style/index.scss";
import Header from "../../components/header/Header";
import InIcon from "../../images/icons/In.svg";
import FacebookIcon from "../../images/icons/Facebook.svg";
import TwitterIcon from "../../images/icons/Twitter.svg";
import Footer from "../../components/footer/Footer.jsx";
import useSumbitForm from "../../../utils/submitForm";
import { passLesson, changeUserLevel } from "../../../Api/queries";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { initApp } from "../../../redux/app/reducer";
import * as appSelectors from "../../../redux/app/selectors";
import getNextLevel from "../../../utils/getNextLevel";

function Result({
  title,
  description,
  tableInfo,
  buttonLeftText,
  buttonText,
  setStep,
  setIsTest,
  leftButtonText,
  setIsTestPassed,
  score,
  testLength,
  Ids,
  level,
  courseLink,
  role,
  isDefaultTest,
}) {
  const dispatch = useDispatch();
  const user = useSelector(appSelectors.appSelector);
  const [passLessonFunction, loading] = useSumbitForm(
    () => passLesson(Ids?.courseId, Ids?.lessonId),
    true
  );
  const [changeUserLevelFunction, loading1] = useSumbitForm(
    () => changeUserLevel({ level: level }),
    true
  );
  const [state, setState] = useState(false);
  useEffect(() => {
    if (role === 1) {
      if (isDefaultTest) {
        changeUserLevelFunction({}, (data) => {
          if (data.updated === true) {
            toast.success("You level changes successfuly", {
              position: toast.POSITION.TOP_RIGHT,
            });
            dispatch(
              initApp({
                user: { ...user.user, level: getNextLevel(user.user.level) },
              })
            );
          } else {
            toast.info("You have already passed test one time", {
              position: toast.POSITION.TOP_RIGHT,
            });
          }
        });
      }
    }
  }, []);
  const goBack = () => {
    if (role === 1) {
      if (!isDefaultTest) {
        if (testLength / score <= 2) {
          passLessonFunction({}, () => {});
          setIsTestPassed(true);
        }
        setIsTest(false);
      }
    }
  };
  if (role === 0) {
    courseLink = "/registration";
  }
  return (
    <div className="result right-main-container">
      <Header
        buttons={{
          firstText: "Անգլերենի մակարդակի ստուգում",
          secondText: "Գրանցվել անվճար",
          firstLink: "/test",
          secondLink: "/registration",
        }}
      />
      <div className="right-container">
        <h2 className="secondPage">{title}</h2>
        <p>{description}</p>
        <div className="social-icons">
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.origin}`}
          >
            <div className="social-icon">
              <img src={FacebookIcon} alt="facebook" />
            </div>
          </a>
          <a href="https://twitter.com/intent/tweet?text=I%20get%20%20points%20and%20you%20can%20too,%20it's%20very%20fun%20to%20learn%20english%20with%20this%20site%20">
            <div className="social-icon">
              <img src={TwitterIcon} alt="twitter" />
            </div>
          </a>
          <a
            href={`https://www.linkedin.com/shareArticle?mini=true&url=${window.location.origin}`}
          >
            <div className="social-icon">
              <img src={InIcon} alt="linkedin" />
            </div>
          </a>
        </div>
        <div className="table">
          {tableInfo
            ? tableInfo.map((info) => {
                return (
                  <div key={Math.random()} className="row">
                    <div className="left">
                      <p>{info.title}</p>
                    </div>
                    <div className="right">
                      <p>{info.value}</p>
                    </div>
                  </div>
                );
              })
            : null}
        </div>
        <div className="buttons">
          <MainButton
            color="transparent-yellow-bordered"
            onClick={() => setStep(0)}
          >
            {leftButtonText}
          </MainButton>
          <div className="right">
            {!isDefaultTest ? (
              <MainButton color="yellow" onClick={() => goBack()}>
                {buttonText}
              </MainButton>
            ) : (
              <Link
                to={courseLink}
                onClick={() => {
                  setState((state) => !state);
                }}
              >
                <MainButton color="yellow">{buttonText}</MainButton>
              </Link>
            )}
            <p className="s">{buttonLeftText}</p>
          </div>
        </div>
      </div>
      <Footer fixed />
    </div>
  );
}

export default Result;
