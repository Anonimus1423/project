import { Button, TextField } from "@mui/material";
import React from "react";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import axios from "axios";
import PrintErrors from "../../../utils/PrintError";

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
    <div className="flex px-20 py-5">
      {step === 0 && (
        <div className="flex flex-col gap-4">
          <TextField
            name="name"
            value={inputs.name}
            onChange={handleInputChange}
            label="Name"
          />
          <TextField
            name="mail"
            type="mail"
            value={inputs.mail}
            onChange={handleInputChange}
            label="Mail"
          />
          <TextField
            name="password"
            type="password"
            value={inputs.password}
            onChange={handleInputChange}
            label="Password"
          />
          <DesktopDatePicker
            label="Born Date"
            inputFormat="MM/DD/YYYY"
            value={inputs.date}
            onChange={handleInputChange}
            name="date"
            renderInput={(params) => <TextField {...params} name="date" />}
          />
          <Button
            color="primary"
            variant="outlined"
            onClick={() => handleSecondStep()}
          >
            Next Step
          </Button>
        </div>
      )}
      {step === 1 && (
        <div className="flex flex-col gap-2">
          <TextField
            name="code"
            value={inputs.code}
            onChange={handleInputChange}
            label="Validation Code"
          />
          <Button
            color="primary"
            variant="outlined"
            onClick={() => handleVerify()}
          >
            Verify
          </Button>
        </div>
      )}
    </div>
  );
};

export default RegistrPage;
