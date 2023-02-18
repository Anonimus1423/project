import axios from "axios";
const token = localStorage.getItem("token");
axios.defaults.headers.common = { Authorization: `bearer ${token}` };

export const authUser = () => {
  return axios.get("/user/auth");
};

export const createCourse = (data) => {
  return axios.post("/admin/create", data);
};

export const getAllCourses = () => {
  return axios.get("/admin/get-all-courses");
};

export const getAllUsers = (search) => {
  return axios.get(`/admin/get-all-users?search=${search}`);
};

export const getClassInfo = (id) => {
  return axios.get(`/admin/class/${id}`);
};

export const updateClass = ({ id, payload }) => {
  return axios.put(`/admin/class/${id}`, payload);
};

export const login = (data) => {
  return axios.post("/user/login", data);
};

export const getCoursesList = () => {
  return axios.get("/api/courses/all");
};

export const getDefaultTest = () => {
  return axios.get("/admin/default-test");
};

export const updateDefaultTest = (data) => {
  return axios.put("/admin/default-test", data);
};
