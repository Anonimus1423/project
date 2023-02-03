import { Button, Input } from "@mui/material";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import PrintErrors from "../../../utils/PrintError";
import { toast } from "react-toastify";

// FIRST STEP OF FORGET PASSWORD
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
    <div className="flex">
      <Input
        type="mail"
        lable="Mail"
        placeholder="asdasd@gmail.com"
        onChange={(e) => setMail(e.target.value)}
      />
      <Button color="primary" variant="outlined" onClick={() => onSumbit()}>
        Send Mail
      </Button>
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
      navigate("/login");
      toast.success("Password changed.");
    } catch ({ response }) {
      PrintErrors(response.data.errors);
    }
  };
  return (
    <div className="flex flex-col gap-2 px-5 py-5">
      <Input
        type="password"
        lable="Password"
        placeholder=""
        onChange={(e) => setPassword(e.target.value)}
      />
      <Input
        type="password"
        lable="Confirm Password"
        placeholder=""
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <Button color="primary" variant="outlined" onClick={() => onSumbit()}>
        Change
      </Button>
    </div>
  );
};
