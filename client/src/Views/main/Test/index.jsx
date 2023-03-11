import { useState } from "react";
import MainButton from "../../components/buttons/MainButton";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import "./style/index.scss";

function Test({ test }) {
  const [step, setStep] = useState(0);
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
      <h2 className="secondPage">{test.title}</h2>
      <div className="test-container test-container-2">
        <div className="test">
          <div className="test-top">
            <p className="m">Выбери правильный вариант</p>
            <p className="subtitle h2">
              {step} \ {test.questions.length}
            </p>
          </div>
          <div className="test-bottom">
            <img src={test.questions[step].image} alt="Test Images" />
            <div className="question">
              <h5>{test.questions[step].description}</h5>
              <div className="answers">
                {test.questions[step].answers.map((answer) => (
                  <div className="answer">
                    <div className="answer-body">{answer}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="test-buttons">
              <div className="hide">
                <MainButton color="yellow">Պատասխանել</MainButton>
              </div>
              <MainButton color="transparent-yellow" arrowLeft>
                Նախորդը
              </MainButton>
              <MainButton color="yellow">Պատասխանել</MainButton>
              <MainButton color="transparent-yellow" arrowRight>
                Հետագա
              </MainButton>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Test;
