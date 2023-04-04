import PrintErrors from "./PrintError";
import { useState } from "react";
const useSumbitForm = (query, initialLoadingState) => {
  const [loading, setLoading] = useState(initialLoadingState);
  const func = async (data, onSuccess) => {
    try {
      setLoading(true);
      const response = await query(data);
      onSuccess(response.data);
      setLoading(false);
    } catch ({ response }) {
      if (response?.status === 403) {
        alert("TOKEN HAS EXPIRED");
        localStorage.removeItem("token");
        window.location = "/";
        return;
      }
      setLoading(false);
      PrintErrors(response?.data?.errors);
    }
  };
  return [func, loading];
};

export default useSumbitForm;
