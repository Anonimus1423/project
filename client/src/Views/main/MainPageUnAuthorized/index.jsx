import React from "react";
import CourseBlock from "../../components/course block/CourseBlock";
import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
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
import AllCoursesComponent from "../../components/all courses/AllCourses";

function MainPageAuthorized() {
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
        <AllCoursesComponent />
      </div>
      <Footer />
      <TopButton />
    </div>
  );
}

export default MainPageAuthorized;
