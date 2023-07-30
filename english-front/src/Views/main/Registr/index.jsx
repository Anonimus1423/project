import React from "react";
import axios from "axios";
import PrintErrors from "../../../utils/PrintError";
import MainTextInput from "../../components/inputs";
import MainButton from "../../components/buttons/MainButton";
import RegistrationIcon from "../../images/form images/Registration.svg";
import "./style/index.scss";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { authUser } from "../../../Api/queries.js";
import { initApp } from "../../../redux/app/reducer.js";
import useSumbitForm from "../../../utils/submitForm.js";
axios.defaults.baseURL = process.env.REACT_APP_AXIOS;

const asyncLocalStorage = {
  setItem: function (key, value) {
    return Promise.resolve().then(function () {
      localStorage.setItem(key, value);
    });
  },
  getItem: function (key) {
    return Promise.resolve().then(function () {
      return localStorage.getItem(key);
    });
  },
};

const RegistrPage = () => {
  const [step, setStep] = React.useState(0);
  const [login] = useSumbitForm(authUser, false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
      PrintErrors(response.data.errors);
      setStep(0);
    }
  };

  const handleVerify = async () => {
    try {
      const { data } = await axios.post("/user/step2", { code: inputs.code });
      asyncLocalStorage.setItem("token", data.token).then(() => {
        axios.defaults.headers.common = {
          Authorization: `bearer ${data.token}`,
        };
        login({}, (data) => {
          dispatch(initApp(data));
          navigate("/");
        });
      });
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
      {step === 0 && (
        <div className="right-container">
          <h2 className="secondPage">Դեռ գրանցված չե՞ք</h2>
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
                  label="Անուն"
                  placeHolder="Գրեք ձեր անունը"
                />
                <MainTextInput
                  name="mail"
                  type="mail"
                  value={inputs.mail}
                  onChange={handleInputChange}
                  label="E-Mail"
                  placeHolder="Գրեք ձեր Email-ը"
                />
                <MainTextInput
                  name="password"
                  type="password"
                  value={inputs.password}
                  onChange={handleInputChange}
                  label="Ծածկագիրը"
                  placeHolder="Գրեք ձեր ծածկագիրը"
                />
                <MainTextInput
                  type="date"
                  label="Ծննդյան ամսաթիվ"
                  value={inputs.date}
                  onChange={handleInputChange}
                  min="1900-01-01"
                  max="2020-12-31"
                  name="date"
                  placeHolder="Գրեք ձեր ծննդաթիվը"
                />
                <MainButton size="m full" color="yellow">
                  Անցնել առաջ
                </MainButton>
                <div className="form-bottom">
                  <p className="m">Արդեն գրանցված ե՞ք</p>
                  <Link to="/log-in">
                    <MainButton color="transparent-yellow">Մուտք</MainButton>
                  </Link>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
      {step === 1 && (
        <div className="right-container">
          <h2 className="secondPage">Դեռ գրանցված չե՞ք</h2>
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
                  placeHolder="Գրեք ձեր վավերացման կոդը"
                  label="Վավերացման կոդ"
                />
                <MainButton size="m full" color="yellow">
                  Հաստատել
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
