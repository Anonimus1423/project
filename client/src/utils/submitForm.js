import PrintErrors from "./PrintError";
const useSumbitForm = (query) => {
  return async (data, onSuccess) => {
    try {
      const response = await query(data);
      onSuccess(response.data);
    } catch ({ response }) {
      if (response.status === 403) {
        alert("TOKEN HAS EXPIRED");
        localStorage.removeItem("token");
        window.location.reload();
        return;
      }
      PrintErrors(response.data.errors);
    }
  };
};

export default useSumbitForm;
