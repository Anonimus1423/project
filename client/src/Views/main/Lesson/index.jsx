import Bread from "../../components/bread/Bread.jsx";
import Header from "../../components/header/Header.jsx";
import PageTitle from "../../components/titles/PageTitle";
import "./style/index.scss";

function Lesson() {
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
      <div className="right-container lesson">
        <Bread
          elements={[
            ["Գլխավոր", "/"],
            ["Բալոր դասընթացները", "/courses"],
            ["A1", "/course"],
            ["Класс 3", "/lesson"],
          ]}
        />
        <PageTitle
          title="Класс 3: Введение глагола"
          time="15ր."
          proggress={30}
        />
      </div>
    </div>
  );
}

export default Lesson;
