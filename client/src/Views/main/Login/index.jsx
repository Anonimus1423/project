import React from "react";
import { login } from "./../../../Api/queries";
import MainTextInput from "../../components/inputs";
import MainButton from "../../components/buttons/MainButton";
import Header from "../../components/header/Header";
import LoginIcon from "../../images/form images/Login.svg";
import { Link } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import { toast, ToastContainer } from "react-toastify";

const LoginPage = () => {
  const [data, setData] = React.useState({
    login: "",
    password: "",
  });
  const [isError, setIsError] = React.useState("");

  const handleInputChange = (name, value) => {
    setData({
      ...data,
      [name]: value,
    });
    if (isError) {
      setIsError(false);
    }
  };

  const handleLogin = () => {
    login(data)
      .then(({ data }) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          window.location = "/";
        }
      })
      .catch((error) => {
        setIsError(true);
        if (error?.response?.data?.errors)
          error.response.data.errors.map((e) => {
            toast.error(e.msg);
          });
      });
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
            handleLogin();
          }}
          className="form"
        >
          <div className="form__left">
            <img src={LoginIcon} alt="registration" />
          </div>
          <div className="form__right">
            <div className="form__right__body margin-top">
              <MainTextInput
                type="text"
                placeHolder="Գրեք ձեր Email-ը"
                value={data.login}
                label="Email"
                name="login"
                onChange={(e) =>
                  handleInputChange(e.target.name, e.target.value)
                }
              />
              <MainTextInput
                type="password"
                value={data.password}
                name="password"
                label="Password"
                placeHolder="Գրեք ձեր ծածկագիրը"
                onChange={(e) =>
                  handleInputChange(e.target.name, e.target.value)
                }
              />
              <Link to={"/forget-password"}>
                <MainButton color="transparent-yellow forget" type="button">
                  Forgot password?
                </MainButton>
              </Link>
              <MainButton size="m full" color="yellow" type="submit">
                Գրանցում
              </MainButton>
              <div className="form-bottom">
                <p className="m">Don't have an account?</p>
                <Link to="/registration">
                  <MainButton color="transparent-yellow">
                    Registration
                  </MainButton>
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
      <Footer fixed />
    </div>
  );
};

export default LoginPage;
