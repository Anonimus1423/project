import React from "react";
import { getDefaultTest, updateDefaultTest } from "../../../Api/queries";
import useSumbitForm from "./../../../utils/submitForm";
import DefaultTestEditor from "./DefaultTestEditor";
import { generateSlug } from "./../../../utils/slug";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const DefaultTestAdmin = () => {
  const [query, loading] = useSumbitForm(getDefaultTest, true);
  const [update] = useSumbitForm(updateDefaultTest);
  const [quizes, setQuizes] = React.useState([]);
  React.useEffect(() => {
    query({}, (data) => {
      setQuizes(data);
    });
  }, []);
  const changeEditableQuize = (slug, name, value) => {
    setQuizes(
      quizes.map((e) => {
        if (e.slug === slug) {
          return {
            ...e,
            [name]: value,
          };
        }
        return e;
      })
    );
  };

  const duplicateQuize = (quizeSlug) => {
    const toDuplicate = {
      ...quizes.find((item, i) => item.slug === quizeSlug),
      slug: generateSlug(),
    };
    setQuizes([...quizes, toDuplicate]);
  };

  const deleteQuize = (quizeSlug) => {
    setQuizes(quizes.filter((e) => e.slug !== quizeSlug));
  };

  const addQuize = () => {
    const newQuize = {
      title: "",
      description: "",
      answers: [],
      answerIndex: null,
      slug: generateSlug(),
    };
    setQuizes([...quizes, newQuize]);
  };
  const navigate = useNavigate();
  const sumbit = () => {
    update(quizes, () => {
      toast.success("Test updated successfuly.");
      navigate("");
    });
  };
  return (
    <div className="flex flex-col p-4 w-full big-container admin">
      <div className="flex justify-between w-full">
        <div className="text-3xl">Edit Test</div>
        <Button
          color="success"
          variant="outlined"
          onClick={() => navigate("/")}
        >
          Go Back
        </Button>
      </div>
      <DefaultTestEditor
        quizes={quizes}
        dragAndDropquizes={(data) => setQuizes(data)}
        handleDuplicateQuize={duplicateQuize}
        addQuize={addQuize}
        handleDeleteQuize={deleteQuize}
        changeEditableQuize={changeEditableQuize}
      />
      <div className="flex justify-between w-full mt-4">
        <Button variant="contained" color="success" onClick={() => sumbit()}>
          Save
        </Button>
      </div>
    </div>
  );
};
