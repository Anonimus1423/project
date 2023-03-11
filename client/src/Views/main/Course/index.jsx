import Bread from "../../components/bread/Bread";
import Header from "../../components/header/Header";
import PageTitle from "../../components/titles/PageTitle";
import About from "./Course Components/About";
import CourseExampleImage from "../../images/course images colored/B2.svg";
import LessonButton from "./Course Components/Lesson Button";
import "./style/index.scss";
import "./style/about.scss";
import "./style/lesson button.scss";
import Footer from "../../components/footer/Footer";

function Course() {
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
      <div className="course-container">
        <Bread
          elements={[
            ["Գլխավոր", "/"],
            ["Բալոր դասընթացները", "/courses"],
            ["A1", "/course"],
          ]}
        />
        <PageTitle
          title="Անգլերենի դասընթաց A1 մակարդակի համար"
          tags={["լավ", "А1"]}
          proggress={30}
        />
        <About
          title="Դասընթացի մասին"
          description="Անգլերեն խոսելը 21-րդ դարում շատ կարևոր է: Ամրագրեք ձեր տեղը #TESOL և #TEFL երաշխավորում ստացած մեր ուսուցիչների մոտ և եղեք 1 քայլով ավելի մոտ Ձեր երազանքին: Անգլերեն խոսելը 21-րդ դարում շատ կարևոր է: Ամրագրեք ձեր տեղը #TESOL և #TEFL երաշխավորում ստացած մեր ուսուցիչների մոտ և եղեք 1 քայլով ավելի մոտ Ձեր երազանքին:"
          image={CourseExampleImage}
        />
        <LessonButton
          title="Present Simple։ Կիրառություն Present Simple։ Կիրառություն "
          time="15ր."
          checked
        />
        <LessonButton
          title="Present Simple։ Կիրառություն"
          time="15ր."
          checked
        />
        <LessonButton
          title="Present Simple։ Կիրառություն"
          time="15ր."
          checked
        />
        <LessonButton title="Present Simple։ Կիրառություն" time="15ր." active />
        <LessonButton title="Present Simple։ Կիրառություն" time="15ր." locked />
        <LessonButton title="Present Simple։ Կիրառություն" time="15ր." locked />
        <LessonButton title="Present Simple։ Կիրառություն" time="15ր." locked />
        <LessonButton title="Present Simple։ Կիրառություն" time="15ր." locked />
      </div>
      <Footer />
    </div>
  );
}

export default Course;
