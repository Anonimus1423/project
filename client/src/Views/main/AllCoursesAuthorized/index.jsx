import React from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import TopButton from "../../components/top button/TopButton";
import AllCoursesAuthorizedComponent from "../../components/all courses authorized/AllCoursesAuthorized";

function AllCoursesAuthorized() {
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
      <div className="right-container after-relative">
        <AllCoursesAuthorizedComponent />
      </div>
      <Footer />
      <TopButton />
    </div>
  );
}

export default AllCoursesAuthorized;
