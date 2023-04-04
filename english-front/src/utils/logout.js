const logout = () => {
  localStorage.removeItem("token");
  window.location = "/";
};

export default logout;
