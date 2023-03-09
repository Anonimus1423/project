import React, { useState } from "react";
import { toast } from "react-toastify";
import { createCourse } from "../../../Api/queries";
import { Upload } from "../../../Upload";
import useSumbitForm from "./../../../utils/submitForm";
import ClassCreateStep1 from "./Components/Step1";
import CreateClassStep2 from "./Components/Step2";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import logout from "./../../../utils/logout";
import { generateSlug } from "./../../../utils/slug";

const CreateClass = () => {
  const [create] = useSumbitForm(createCourse);
  const [step, setStep] = useState(0);
  const [editableLesson, setEditableLesson] = useState(null);
  const [data, setData] = useState({
    title: "",
    description: "",
    picture_src: "",
    lessons: [],
    level: "A1",
    tags: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleCreateCourse = () => {
    create(
      {
        ...data,
        tags: (data.tags || "").split(" "),
      },
      () => {
        toast.success("Course created successfully.");
        navigate("/");
        setData({
          title: "",
          description: "",
          picture_src: "",
          lessons: [],
          tags: "",
        });
      }
    );
  };
  const createLesson = () => {
    const newLesson = {
      slug: generateSlug(),
      title: "New Lesson",
      description: "",
      quizes: [],
      time: "15Minute",
    };
    setData({
      ...data,
      lessons: [...data.lessons, newLesson],
    });
    setEditableLesson({
      lesson: newLesson,
    });
  };
  const handleLessonInputChange = (name, value) => {
    const index = editableLesson.lesson.slug;
    setData({
      ...data,
      lessons: data.lessons.map((item) => {
        if (item.slug === index) {
          return {
            ...item,
            [name]: value,
          };
        }
        return item;
      }),
    });
    if (name !== "description") {
      setEditableLesson({
        lesson: {
          ...editableLesson.lesson,
          [name]: value,
        },
      });
    }
  };

  const handleDeleteLesson = (slug) => {
    if (editableLesson && slug === editableLesson.lesson.slug) {
      setEditableLesson(
        data.lessons.length > 1 ? { lesson: data.lessons.at(-2) } : null
      );
    }
    setData({
      ...data,
      lessons: data.lessons.filter((e, i) => e.slug !== slug),
    });
  };

  const handleDuplicateLesson = (slug) => {
    const toDuplicate = {
      ...data.lessons.find((item, i) => item.slug === slug),
      slug: generateSlug(),
    };
    setEditableLesson({
      lesson: {
        ...toDuplicate,
      },
    });
    setData({
      ...data,
      lessons: [...data.lessons, toDuplicate],
    });
  };

  const addQuizeToLesson = () => {
    const newQuize = {
      title: "",
      description: "",
      answers: [],
      answerIndex: null,
      slug: generateSlug(),
    };
    setData({
      ...data,
      lessons: data.lessons.map((e) => {
        if (e.slug === editableLesson.lesson.slug) {
          setEditableLesson({
            lesson: {
              ...e,
              quizes: [...e.quizes, newQuize],
            },
          });
          return {
            ...e,
            quizes: [...e.quizes, newQuize],
          };
        }
        return e;
      }),
    });
  };

  const dragAndDropquizes = (newQuizes) => {
    setData({
      ...data,
      lessons: data.lessons.map((e) => {
        if (e.slug === editableLesson.lesson.slug) {
          setEditableLesson({
            lesson: {
              ...e,
              quizes: newQuizes,
            },
          });
          return {
            ...e,
            quizes: newQuizes,
          };
        }
        return e;
      }),
    });
  };

  const handleDeleteQuize = (quizeSlug) => {
    setData({
      ...data,
      lessons: data.lessons.map((e) => {
        if (e.slug === editableLesson.lesson.slug) {
          setEditableLesson({
            lesson: {
              ...e,
              quizes: e.quizes.filter((quize) => quize.slug !== quizeSlug),
            },
          });
          return {
            ...e,
            quizes: e.quizes.filter((quize) => quize.slug !== quizeSlug),
          };
        }
        return e;
      }),
    });
  };

  const handleDuplicateQuize = (quizeSlug) => {
    setData({
      ...data,
      lessons: data.lessons.map((e) => {
        if (e.slug === editableLesson.lesson.slug) {
          const toDuplicate = {
            ...e.quizes.find((item, i) => item.slug === quizeSlug),
            slug: generateSlug(),
          };
          setEditableLesson({
            lesson: {
              ...e,
              quizes: [...e.quizes, toDuplicate],
            },
          });
          return {
            ...e,
            quizes: [...e.quizes, toDuplicate],
          };
        }
        return e;
      }),
    });
  };

  const changeEditableQuize = (quizeSlug, name, value, newAnswers) => {
    setData({
      ...data,
      lessons: data.lessons.map((e) => {
        if (e.slug === editableLesson.lesson.slug) {
          const newQuizes = e.quizes.map((item) => {
            if (item.slug === quizeSlug) {
              if (name === "trashAnswer") {
                return {
                  ...item,
                  answerIndex: value,
                  answers: newAnswers,
                };
              }
              return {
                ...item,
                [name]: value,
              };
            }
            return item;
          });
          setEditableLesson({
            lesson: {
              ...e,
              quizes: newQuizes,
            },
          });
          return {
            ...e,
            quizes: newQuizes,
          };
        }
        return e;
      }),
    });
  };

  return (
    <div className="flex flex-col gap-6 px-6 py-5 big-container admin">
      <div className="flex justify-between">
        <div className="flex gap-2">
          <Button
            color="success"
            variant="outlined"
            onClick={() => navigate("/")}
          >
            Home
          </Button>
          <Button
            color="success"
            variant="outlined"
            onClick={() => navigate("/admin/users")}
          >
            Users
          </Button>
        </div>
        <Button color="error" variant="contained" onClick={() => logout()}>
          Log Out
        </Button>
      </div>
      <span className="text-4xl">
        Create Class{step === 1 ? " / Lessons" : ""}
      </span>
      {step === 0 && (
        <ClassCreateStep1
          handleInputChange={handleInputChange}
          data={data}
          setData={setData}
          setStep={setStep}
        />
      )}
      {step === 1 && (
        <CreateClassStep2
          data={data}
          handleDuplicateQuize={handleDuplicateQuize}
          handleDeleteQuize={handleDeleteQuize}
          dragAndDropquizes={dragAndDropquizes}
          addQuizeToLesson={addQuizeToLesson}
          handleDuplicateLesson={handleDuplicateLesson}
          changeEditableQuize={changeEditableQuize}
          handleDeleteLesson={handleDeleteLesson}
          previousPage={() => setStep(0)}
          handleCreateClass={() => handleCreateCourse()}
          handleLessonInputChange={handleLessonInputChange}
          setData={setData}
          addLesson={createLesson}
          editableLesson={editableLesson}
          setEditableLesson={setEditableLesson}
        />
      )}
    </div>
  );
};

export default CreateClass;
