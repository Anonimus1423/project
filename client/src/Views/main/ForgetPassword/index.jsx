import { Button, Input } from "@mui/material";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import PrintErrors from "../../../utils/PrintError";
import { toast } from "react-toastify";
import Header from "../../components/header/Header";
import { ToastContainer } from "react-toastify";
import LoginIcon from "../../images/form images/Login.svg";
import MainTextInput from "../../components/inputs";
import MainButton from "../../components/buttons/MainButton";
axios.defaults.baseURL = process.env.REACT_APP_AXIOS;

export const ForgetPasswordStep1 = () => {
  const [mail, setMail] = React.useState("");
  const onSumbit = async () => {
    try {
      await axios.post("/user/forget-password", { mail });
      toast.success("Please check Email");
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
      <ToastContainer />
      <h2 className="secondPage">Already have an account?</h2>
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
                label="Email"
                onChange={(e) => setMail(e.target.value)}
              />
              <MainButton size="m full" color="yellow">
                Send Mail
              </MainButton>
            </div>
          </div>
        </form>
      </div>
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
      <ToastContainer />
      <h2 className="secondPage">Already have an account?</h2>
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
                label="Password"
                placeHolder="Գրեք ձեր password-ը"
                onChange={(e) => setPassword(e.target.value)}
              />
              <MainTextInput
                type="password"
                label="Confirm Password"
                placeHolder="հաստատեք ձեր password-ը"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <MainButton size="m full" color="yellow">
                Change
              </MainButton>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
