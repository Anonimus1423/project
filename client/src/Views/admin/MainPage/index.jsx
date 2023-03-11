import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getAllCourses } from "../../../Api/queries";
import logout from "../../../utils/logout";
import useSumbitForm from "../../../utils/submitForm";
import "../style/index.scss";
import { deleteClass } from "./../../../Api/queries";
import { toast } from "react-toastify";

const AdminMainPage = () => {
  const [init, loading] = useSumbitForm(getAllCourses, true);
  const [deleteCourse] = useSumbitForm(deleteClass);
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    init({}, (data) => {
      setCourses(data.reverse());
    });
  }, []);
  const handleDeleteCourse = (id) => {
    deleteCourse(id, () => {
      toast.success("Course has been deleted.");
      setCourses(courses.filter((e) => e._id !== id));
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
      {!loading && (
        <>
          {courses.map((e) => {
            return (
              <div
                onClick={() => navigate(`/admin/edit/${e._id}`)}
                key={e._id}
                className="fex admin-course flex items-start justify-between"
                sx={{ border: 1 }}
              >
                <div className="flex flex-col">
                  <h4>{e.title}</h4>
                  <img
                    src={e.picture_src}
                    width="200px"
                    height="200px"
                    alt=""
                  />
                </div>
                <Button
                  color="error"
                  style={{ marginTop: "20px" }}
                  variant="contained"
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    handleDeleteCourse(e._id);
                  }}
                >
                  Delete
                </Button>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default AdminMainPage;
