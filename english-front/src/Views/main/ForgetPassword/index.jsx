import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import PrintErrors from "../../../utils/PrintError";
import { toast } from "react-toastify";
import Header from "../../components/header/Header";
import LoginIcon from "../../images/form images/Login.svg";
import MainTextInput from "../../components/inputs";
import MainButton from "../../components/buttons/MainButton";
import Footer from "../../components/footer/Footer";
axios.defaults.baseURL = process.env.REACT_APP_AXIOS;

export const ForgetPasswordStep1 = () => {
  const [mail, setMail] = React.useState("");
  const [checked, setChecked] = useState(false)
  const onSumbit = async () => {
    try {
      await axios.post("/user/forget-password", { mail });
      setTimeout(() => setChecked(false), 60000); 
      setChecked(true);
      toast.success("Please check Email");
      toast.info("Didn't get Email? try again in a minute");
    } catch ({ response }) {
      PrintErrors(response.data.errors);
    }
  };
  return (
    <div className="right-main-container registration">
      <Header
        buttons={{
          firstText: "Գրանցում",
          secondText: "Մուտք",
          firstLink: "/registration",
          secondLink: "/log-in",
        }}
        isForm
      />
      <h2 className="secondPage">Մոռացել ե՞ք ծածկագիրը</h2>
      <div className="right-container">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSumbit();
          }}
          className="form"
        >
          <div className="form__left">
            <img src={LoginIcon} alt="registration" />
          </div>
          <div className="form__right">
            <div className="form__right__body margin-top">
              <MainTextInput
                type="mail"
                placeHolder="Գրեք ձեր Email-ը"
                label="E-mail"
                onChange={(e) => setMail(e.target.value)}
              />
              <MainButton size="m full" color="yellow" disabled={checked} className={checked ? "disabled" : ""}>
                ՈՒղարկել E-mail
              </MainButton>
            </div>
          </div>
        </form>
      </div>
      <Footer fixed />
    </div>
  );
};
// SECOND STEP OF FORGET PASSWORD
export const ForgetPasswordStep2 = () => {
  const [password, setPassword] = React.useState("");
  const { token } = useParams();
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const navigate = useNavigate("");
  const onSumbit = async () => {
    try {
      await axios.put("/user/forget-password", {
        password,
        confirmPassword,
        token,
      });
      navigate("/log-in");
      toast.success("Password changed.");
    } catch ({ response }) {
      PrintErrors(response.data.errors);
    }
  };
  return (
    <div className="right-main-container registration">
      <Header
        buttons={{
          firstText: "Գրանցում",
          secondText: "Մուտք",
          firstLink: "/registration",
          secondLink: "/log-in",
        }}
        isForm
      />
      <h2 className="secondPage">Փոխել ծածկագիրը</h2>
      <div className=" right-container">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSumbit();
          }}
          className="form"
        >
          <div className="form__left">
            <img src={LoginIcon} alt="registration" />
          </div>
          <div className="form__right">
            <div className="form__right__body margin-top">
              <MainTextInput
                type="password"
                label="Ծածկագիր"
                placeHolder="Գրեք ձեր ծածկագիրը"
                onChange={(e) => setPassword(e.target.value)}
              />
              <MainTextInput
                type="password"
                label="հաստատել ծածկագիրը"
                placeHolder="հաստատեք ձեր ծածկագիրը-ը"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <MainButton size="m full" color="yellow">
                Փոխել ծածկագիրը
              </MainButton>
            </div>
          </div>
        </form>
      </div>
      <Footer fixed />
    </div>
  );
};
