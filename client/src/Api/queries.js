import axios from "axios";
const token = localStorage.getItem("token");
axios.defaults.headers.common = { Authorization: `bearer ${token}` };

export const authUser = () => {
  return axios.get("/user/auth");
};

export const createCourse = (data) => {
  return axios.post("/admin/create", data);
};
