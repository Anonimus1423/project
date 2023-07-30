import React, { useEffect } from "react";
import { Button, Input, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import logout from "../../../utils/logout";
import useSumbitForm from "../../../utils/submitForm";
import {
  getAddintionalInformation,
  updateAddintionalInformation,
} from "../../../Api/queries";
import { toast } from "react-toastify";

const AddintionalInformationPage = () => {
  const navigate = useNavigate();
  const [init, loadnig] = useSumbitForm(getAddintionalInformation);
  const [update] = useSumbitForm(updateAddintionalInformation);
  const [data, setData] = React.useState({
    pupils: 1800,
    videoLessons: 354,
    positiveFeedback: 200,
  });
  useEffect(() => {
    init({}, (information) => {
      setData(information.data[0]);
    });
  }, []);
  console.log(data);

  const handleDataInputChange = (e) => {
    const {
      target: { name, value },
    } = e;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSave = () => {
    update(data, () => {
      toast.success("Changes saved successfuly.");
    });
  };

  return (
    <div className="flex-col flex gap-4 px-4 py-3 big-container admin">
      <div className="flex w-1/1 justify-between">
        <div className="flex gap-2">
          <Button
            color="success"
            variant="outlined"
            onClick={() => navigate("/admin/create")}
          >
            Create Class
          </Button>
          <Button
            color="success"
            variant="outlined"
            onClick={() => navigate("/admin/users")}
          >
            Users
          </Button>
          <Button
            color="success"
            variant="outlined"
            onClick={() => navigate("/default-test")}
          >
            Test
          </Button>
        </div>
        <Button color="error" variant="contained" onClick={() => logout()}>
          Log Out
        </Button>
      </div>
      <div className="flex flex-col gap-6">
        <TextField
          type="number"
          label="Pupils Count"
          value={data.pupils}
          onChange={handleDataInputChange}
          placeholder="Pupils count"
          name="pupils"
        />
        <TextField
          type="number"
          label="Video Lessons Count"
          value={data.videoLessons}
          onChange={handleDataInputChange}
          placeholder="Video Lessons Count"
          name="videoLessons"
        />
        <TextField
          type="number"
          label="Feedbacks Count"
          value={data.positiveFeedback}
          onChange={handleDataInputChange}
          placeholder="Feedbacks Count"
          name="positiveFeedback"
        />
        <Button
          color="success"
          variant="outlined"
          disabled={loadnig}
          onClick={() => handleSave()}
        >
          Save Settings
        </Button>
      </div>
    </div>
  );
};

export default AddintionalInformationPage;
