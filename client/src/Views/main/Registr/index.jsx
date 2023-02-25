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
    <>
      {step === 0 && (
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
            />
            <MainTextInput
              name="mail"
              type="mail"
              value={inputs.mail}
              onChange={handleInputChange}
              label="Mail"
            />
            <MainTextInput
              name="password"
              type="password"
              value={inputs.password}
              onChange={handleInputChange}
              label="Password"
            />
            <MainTextInput
              type="date"
              label="Born Date"
              inputFormat="MM/DD/YYYY"
              value={inputs.date}
              onChange={handleInputChange}
              name="date"
              renderInput={(params) => <TextField {...params} name="date" />}
            />
            <MainButton
              size="m"
              color="yellow"
              onClick={() => handleSecondStep()}
            >
              Next Step
            </MainButton>
          </div>
        </div>
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
    </>
  );
};

export default RegistrPage;
