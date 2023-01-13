import React, { useEffect } from "react";
import { authUser } from "./Api/queries";
import useSumbitForm from "./utils/submitForm";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const AuthUser = useSumbitForm(authUser);
  const Register = useSumbitForm((data) => axios.post("/user", data));
  useEffect(() => {
    Register({
      name: "",
      password: "",
    });
  }, []);
  return (
    <div className="App">
      <ToastContainer />
    </div>
  );
}

export default App;
