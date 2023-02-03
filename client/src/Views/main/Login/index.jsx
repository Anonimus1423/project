import { Button } from "@mui/material";
import React from "react";
import { login } from "./../../../Api/queries";
import { toast } from "react-toastify";

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
        // if (error?.response?.data?.errors)
        //   error.response.data.errors.map((e) => {
        //     toast.error(e.msg);
        //   });
      });
  };

  return (
    <div className="flex flex-col gap-4">
      <input
        type="text"
        value={data.login}
        name="login"
        style={{ border: "1px solid black" }}
        onChange={(e) => handleInputChange(e.target.name, e.target.value)}
      />
      <input
        type="password"
        value={data.password}
        name="password"
        style={{ border: "1px solid black" }}
        onChange={(e) => handleInputChange(e.target.name, e.target.value)}
      />
      <Button color="success" variant="outlined" onClick={() => handleLogin()}>
        Login
      </Button>
      {isError && <div>Not Found</div>}
    </div>
  );
};

export default LoginPage;
