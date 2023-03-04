import { useState } from "react";
import Header from "../../components/header/Header";

function Test({ test }) {
  const [step, setStep] = useState(1);
  return (
    <div className="right-main-container registration">
      <Header
        buttons={{
          firstText: "Անգլերենի մակարդակի ստուգում",
          secondText: "Գրանցվել անվճար",
          firstLink: "/test",
          secondLink: "/registration",
        }}
      />
      <h2>{test.name}</h2>
    </div>
  );
}

export default Test;
