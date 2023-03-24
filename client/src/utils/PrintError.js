import { toast } from "react-toastify";
const PrintErrors = (errors) => {
  if (errors?.length) {
      errors.forEach((element) => {
      toast.error(element.msg);
    });
  }
};

export default PrintErrors;
