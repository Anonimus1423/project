import React from "react";
import axios from "axios";
import PrintErrors from "../../../utils/PrintError";
import MainTextInput from "../../components/inputs";
import MainButton from "../../components/buttons/MainButton";
import RegistrationIcon from "../../images/form images/Registration.svg";
import "./style/index.scss";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
axios.defaults.baseURL = process.env.REACT_APP_AXIOS;

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
      console.log(response.data.errors);
      PrintErrors(response.data.errors);
      setStep(0);
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
          firstLink: "/log-in",
          secondLink: "/registration",
        }}
        isForm
      />
      <ToastContainer />
      {step === 0 && (
        <div className="right-container">
          <h2 className="secondPage">Already have an account?</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSecondStep();
            }}
            className="form"
          >
            <div className="form__left">
              <img src={RegistrationIcon} alt="registration" />
            </div>
            <div className="form__right">
              <div className="form__right__body margin-top">
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
                <MainButton size="m full" color="yellow">
                  Անցնել առաջ
                </MainButton>
                <div className="form-bottom">
                  <p className="m">Don't have an account?</p>
                  <Link to="/log-in">
                    <MainButton color="transparent-yellow">Log In</MainButton>
                  </Link>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
      {step === 1 && (
        <div className="right-container">
          <h2 className="secondPage">Already have an account?</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleVerify();
            }}
            className="form"
          >
            <div className="form__left">
              <img src={RegistrationIcon} alt="registration" />
            </div>
            <div className="form__right">
              <div className="form__right__body">
                <MainTextInput
                  name="code"
                  value={inputs.code}
                  onChange={handleInputChange}
                  placeHolder="Write your validation code"
                  label="Validation Code"
                />
                <MainButton size="m full" color="yellow">
                  Verify
                </MainButton>
              </div>
            </div>
          </form>
        </div>
      )}
      <Footer fixed />
    </div>
  );
};

export default RegistrPage;
