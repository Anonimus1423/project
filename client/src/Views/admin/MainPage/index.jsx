import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getAllCourses } from "../../../Api/queries";
import logout from "../../../utils/logout";
import useSumbitForm from "../../../utils/submitForm";

const AdminMainPage = () => {
  const [init, loading] = useSumbitForm(getAllCourses, true);
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    init({}, (data) => {
      setCourses(data.reverse());
    });
  }, []);
  return (
    <div className="flex-col flex gap-4 px-4 py-3">
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
        </div>
        <Button color="error" variant="contained" onClick={() => logout()}>
          Log Out
        </Button>
      </div>
      {!loading && (
        <>
          {courses.map((e) => {
            return (
              <div
                onClick={() => navigate(`/admin/edit/${e._id}`)}
                key={e._id}
                className="fex"
                sx={{ border: 1 }}
              >
                <h4>{e.title}</h4>
                <img src={e.picture_src} width="200px" height="200px" alt="" />
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default AdminMainPage;
