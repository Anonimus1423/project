import { toast } from "react-toastify";
const PrintErrors = (errors) => {
  if (errors && typeof errors === Array) {
    errors.forEach((element) => {
      toast.error(element.msg);
    });
  }
};

export default PrintErrors;
