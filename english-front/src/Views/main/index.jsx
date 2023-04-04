import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const navigate = useNavigate();
  return (
    <div className="flex">
      <Button
        color="primary"
        variant="outlined"
        onClick={() => navigate("/login")}
      >
        Login
      </Button>
      <Button
        color="primary"
        variant="outlined"
        onClick={() => navigate("/register")}
      >
        Register
      </Button>
      <Button
        color="primary"
        variant="outlined"
        onClick={() => navigate("/forget-password")}
      >
        Forget Password
      </Button>
    </div>
  );
};

export default Main;
