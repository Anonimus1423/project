import React, { useEffect, useState } from "react";
import CourseBlock from "../../components/course block/CourseBlock";
import Header from "../../components/header/Header";
import { ReactComponent as CourseImageA1 } from "../../images/course images/A1.svg";
import { ReactComponent as CourseImageA2 } from "../../images/course images/A2.svg";
import { ReactComponent as CourseImageB1 } from "../../images/course images/B1.svg";
import { ReactComponent as CourseImageB2 } from "../../images/course images/B2.svg";
import { ReactComponent as CourseImageC1 } from "../../images/course images/C1.svg";
import { ReactComponent as CourseImageC2 } from "../../images/course images/C2.svg";
import Footer from "../../components/footer/Footer";
import TopButton from "../../components/top button/TopButton";
import Courses from "../../components/all courses/AllCourses.jsx";
import MainTitle from "../../components/titles/MainTitle.jsx";
import useSumbitForm from "../../../utils/submitForm";
import getNormalDate from "../../../utils/getNormalDate";
import { getOnGoingCourses } from "../../../Api/queries";
import Loading from "../../components/loading";

function MyCourses() {
  const [onGoingCourses, loading] = useSumbitForm(getOnGoingCourses, true);
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    onGoingCourses({}, (data) => {
      setCourses(data);
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
      {loading ? (
        <Loading />
      ) : (
        <div className="right-container after-relative">
          {courses.length ? (
            <>
              <MainTitle>
                Անհատական դասընթաց անգլերենի ձեր մակարդակին համապատասխան
              </MainTitle>
              {courses
                .sort((a, b) => {
                  return a?.course?.progress !== 100 ? 1 : -1;
                })
                .map((course, i) => {
                  console.log(course);
                  return (
                    <CourseBlock
                      title={course?.course?.title}
                      description={course?.course?.description}
                      tags={course?.course?.tags}
                      date={getNormalDate(course?.course?.created_at)}
                      Image={course?.course?.picture_src}
                      proggress={course?.progress}
                      id={course?.course?._id}
                      key={i}
                    />
                  );
                })}
            </>
          ) : (
            <MainTitle>Այս պահին դուք չունեք անցկացվող դասընթաց</MainTitle>
          )}
        </div>
      )}
      <Footer fixed={courses.length === 0 || courses.length === 1} />
      <TopButton />
    </div>
  );
}

export default MyCourses;
