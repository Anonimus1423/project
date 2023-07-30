import axios from "axios";
const token = localStorage.getItem("token");

// AXIOS CONFIGS DONT CHANGE
axios.defaults.headers.common = {
  Authorization: `bearer ${token}`,
};
axios.defaults.headers["Access-Control-Allow-Origin"] = "*";
// axios.defaults.headers["Content-Type"] = "application/x-www-form-urlencoded";
axios.defaults.headers["Access-Control-Allow-Methods"] =
  "GET,PUT,POST,DELETE,PATCH,OPTIONS";
axios.defaults.headers["Access-Control-Allow-Credentials"] = true;
axios.defaults.proxy = {
  host: "lochalhost",
  port: 3443,
};
axios.defaults.baseURL = process.env.REACT_APP_AXIOS;

export const authUser = () => {
  return axios.get("/user/auth");
};

export const createCourse = (data) => {
  return axios.post("/admin/create", data);
};

export const getAllCourses = () => {
  return axios.get("/admin/get-all-courses");
};

export const getAddintionalInformation = () => {
  return axios.get("/api/addintional");
};

export const updateAddintionalInformation = (data) => {
  return axios.post("/api/addintional", data);
};

export const getOnGoingCourses = () => {
  return axios.get("/api/user/ongoing-courses");
};

export const getAllUsers = (search) => {
  return axios.get(`/admin/get-all-users?search=${search}`);
};

export const getClassInfo = (id) => {
  console.log(token);
  return axios.get(`/admin/class/${id}`);
};

export const getUserDefaultTest = () => {
  return axios.get(`/api/test`);
};

export const updateClass = ({ id, payload }) => {
  return axios.put(`/admin/class/${id}`, payload);
};

export const login = (data) => {
  return axios.post("/user/login", data);
};

export const changeUserLevel = (data) => {
  return axios.post("/api/test", data);
};

export const getCoursesList = () => {
  return axios.get("/api/courses/all");
};

export const getUserCourses = () => {
  return axios.get("/api/user/courses/all");
};

export const getDefaultTest = () => {
  return axios.get("/admin/default-test");
};

export const updateDefaultTest = (data) => {
  return axios.put("/admin/default-test", data);
};

export const getLessonWithTest = (courseId, lessonId) => {
  return axios.get(`/api/user/course/${courseId}/lesson/${lessonId}`);
};

export const deleteClass = (id) => {
  return axios.delete(`/admin/class/${id}`);
};

export const getUserClassInfo = (id) => {
  return axios.get(`/api/user/course/${id}`);
};

export const passLesson = (courseId, lessonId) => {
  return axios.post(`/api/pass/${courseId}/${lessonId}`);
};
