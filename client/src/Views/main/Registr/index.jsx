import { Button, TextField } from "@mui/material";
import React from "react";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import axios from "axios";
import PrintErrors from "../../../utils/PrintError";
import MainTextInput from "../../components/inputs";
import MainButton from "../../components/buttons/MainButton";
import Sidebar from "../../components/sidebar/Sidebar";
import RegistrationIcon from "../../images/form images/Registration.svg";
import "./style/index.scss";
import Header from "../../components/header/Header";
import { Link } from "react-router-dom";

const RegistrPage = () => {
  const [step, setStep] = React.useState(0);
  const [inputs, setInputs] = React.useState({
    name: "",
    password: "",
    mail: "",
    date: "",
  });
  const handleInputChange = (e) => {
    if (!e.target) {
      setInputs({
        ...inputs,
        date: e._d,
      });
      return;
    }
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const handleSecondStep = async () => {
    setStep("pending");
    try {
      await axios.post("/user/step1", inputs);
      setStep(1);
    } catch ({ response }) {
      setStep(0);
      PrintErrors(response.data.errors);
    }
  };

  const handleVerify = async () => {
    try {
      const { data } = await axios.post("/user/step2", { code: inputs.code });
      localStorage.setItem("token", data.token);
      window.location = "/";
    } catch ({ response }) {
      PrintErrors(response.data.errors);
    }
  };

  return (
    <div className="right-main-container registration">
      <Header
        buttons={{
          firstText: "Մուտք",
          secondText: "Գրանցում",
          firstLink: "/sign-up",
          secondLink: "/registration",
        }}
      />
      {step === 0 && (
        <>
          <h2>Already have an account?</h2>
          <div className="form">
            <div className="form__left">
              <img src={RegistrationIcon} alt="registration" />
            </div>
            <div className="form__right">
              <MainTextInput
                name="name"
                value={inputs.name}
                onChange={handleInputChange}
                label="Name"
                placeHolder="Գրեք ձեր անունը"
              />
              <MainTextInput
                name="mail"
                type="mail"
                value={inputs.mail}
                onChange={handleInputChange}
                label="Mail"
                placeHolder="Գրեք ձեր Email-ը"
              />
              <MainTextInput
                name="password"
                type="password"
                value={inputs.password}
                onChange={handleInputChange}
                label="Password"
                placeHolder="Գրեք ձեր ծածկագիրը"
              />
              <MainTextInput
                type="date"
                label="Born Date"
                value={inputs.date}
                onChange={handleInputChange}
                name="date"
                placeHolder="Գրեք ձեր ծննդաթիվը"
              />
              <MainButton
                size="m full"
                color="yellow"
                onClick={() => handleSecondStep()}
              >
                Անցնել առաջ
              </MainButton>
              <div className="form-bottom">
                <p className="m">Don't have an account?</p>
                <Link to="/sign-up">
                  <MainButton color="transparent-yellow">Log In</MainButton>
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
      {step === 1 && (
        <div className="flex flex-col gap-2">
          <MainTextInput
            name="code"
            value={inputs.code}
            onChange={handleInputChange}
            label="Validation Code"
          />
          <MainButton
            color="primary"
            variant="outlined"
            onClick={() => handleVerify()}
          >
            Verify
          </MainButton>
        </div>
      )}
    </div>
  );
};

export default RegistrPage;
