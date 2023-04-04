import React from "react";
import Header from "../../components/header/Header";
import { useEffect, useState } from "react";
import Footer from "../../components/footer/Footer";
import useSumbitForm from "../../../utils/submitForm";
import TopButton from "../../components/top button/TopButton";
import AllCoursesAuthorizedComponent from "../../components/all courses authorized/AllCoursesAuthorized";
import Loading from "../../components/loading";
import { getUserCourses } from "../../../Api/queries";

function AllCoursesAuthorized() {
  const [userCourses, loading] = useSumbitForm(getUserCourses, true);
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    userCourses({}, (data) => {
      setCourses(data.data);
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
      {!loading ? (
        <div className="right-container after-relative">
          <AllCoursesAuthorizedComponent courses={courses} />
        </div>
      ) : (
        <Loading className="lesson" />
      )}
      <Footer fixed={loading} />
      <TopButton />
    </div>
  );
}

export default AllCoursesAuthorized;
