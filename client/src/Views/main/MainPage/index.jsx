import React, { useEffect, useState } from "react";
import CourseBlock from "../../components/course block/CourseBlock";
import Header from "../../components/header/Header";
import { getUserCourses } from "../../../Api/queries";
import useSumbitForm from "../../../utils/submitForm";
import { useSelector } from "react-redux";
import * as appSelectors from "../../../redux/app/selectors";
import MainTitle from "../../components/titles/MainTitle";
import AdditionalInformation from "../../sections/Additional Information/AdditionalInformation";
import CoverPage from "../../sections/cover-page/CoverPage";
import { ReactComponent as CourseImageA1 } from "../../images/course images/A1.svg";
import { ReactComponent as CourseImageA2 } from "../../images/course images/A2.svg";
import { ReactComponent as CourseImageB1 } from "../../images/course images/B1.svg";
import { ReactComponent as CourseImageB2 } from "../../images/course images/B2.svg";
import { ReactComponent as CourseImageC1 } from "../../images/course images/C1.svg";
import { ReactComponent as CourseImageC2 } from "../../images/course images/C2.svg";
import Footer from "../../components/footer/Footer";
import TopButton from "../../components/top button/TopButton";
import getNextLevel from "../../../utils/getNextLevel";
import getNormalDate from "../../../utils/getNormalDate";
import getSecondLevel from "../../../utils/getSecondLevel";

function MainPage() {
  const app = useSelector(appSelectors.appSelector);
  let courses;
  const [presentCourse, setPresentCourse] = useState(null);
  const [nextCourse, setNextCourse] = useState(null);
  const [userCourses, loading] = useSumbitForm(getUserCourses, true);
  useEffect(() => {
    userCourses({}, (data) => {
      courses = data.data;
      setPresentCourse(
        courses?.find((course) => {
          return course.course.level === getNextLevel(app.user.level);
        })
      );
      setNextCourse(
        courses?.find(
          (course) =>
            course.course.level === getSecondLevel(app.user.level || "A1")
        )
      );
    });
  }, []);
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
      <CoverPage />
      <AdditionalInformation />
      <div className="right-container after-relative">
        <MainTitle>
          Անհատական դասընթաց անգլերենի ձեր մակարդակին <br /> համապատասխան
        </MainTitle>
        <CourseBlock
          title={presentCourse?.course?.title}
          description={presentCourse?.course?.description}
          tags={presentCourse?.course?.tags}
          date={getNormalDate(presentCourse?.course?.created_at)}
          Image={presentCourse?.course?.picture_src}
          proggress={presentCourse?.progress || 0}
          id={presentCourse?.course?._id}
          loading={loading}
        />
        {app.user.level === "C1" || app.user.level === "C2" ? null : (
          <>
            <MainTitle>Հաջորդ դասընթացը</MainTitle>
            <CourseBlock
              title={nextCourse?.course?.title}
              description={nextCourse?.course?.description}
              tags={nextCourse?.course?.tags}
              date={getNormalDate(nextCourse?.course?.created_at)}
              Image={nextCourse?.course?.picture_src}
              proggress={nextCourse?.progress || 0}
              id={presentCourse?.course?._id}
              loading={loading}
              closed
            />
          </>
        )}
      </div>
      <Footer />
      <TopButton />
    </div>
  );
}

export default MainPage;
