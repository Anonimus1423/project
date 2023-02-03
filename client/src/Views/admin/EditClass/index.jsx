import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { createCourse, updateClass } from "../../../Api/queries";
import { Upload } from "../../../Upload";
import useSumbitForm from "./../../../utils/submitForm";
import ClassCreateStep1 from "./Components/Step1";
import CreateClassStep2 from "./Components/Step2";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import logout from "./../../../utils/logout";
import { getClassInfo } from "./../../../Api/queries";
import { generateSlug } from "./../../../utils/slug";

export const EditClass = () => {
  const [update] = useSumbitForm(updateClass);
  const [init, loading] = useSumbitForm(getClassInfo, true);
  const [step, setStep] = useState(0);
  const { current: toDeleteIds } = useRef([]);
  const [editableLesson, setEditableLesson] = useState(null);
  const [data, setData] = useState({
    title: "",
    description: "",
    picture_src: "",
    lessons: [],
    tags: "",
  });
  const params = useParams();
  useEffect(() => {
    init(params.id, (info) => {
      setData({
        ...info,
        image: info.picture_src,
        tags: info.tags.join(" "),
      });
      setEditableLesson({
        lesson: info.lessons[0],
      });
    });
  }, []);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSaveClass = () => {
    update(
      {
        id: params.id,
        payload: {
          ...data,
          toDeleteIds,
          tags: (data.tags || "").split(" "),
        },
      },
      () => {
        toast.success("Course updated successfully.");
      }
    );
  };
  const createLesson = () => {
    const newLesson = {
      slug: generateSlug(),
      title: "New Lesson",
      description: "",
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
      lessons: data.lessons.filter((e, i) => {
        if (e.slug === slug && e._id) {
          toDeleteIds.push(e._id);
        }
        return e.slug !== slug;
      }),
    });
  };
  const handleDuplicateLesson = (slug) => {
    const lesson = data.lessons.find((item, i) => item.slug === slug);
    const toDuplicate = {
      title: lesson.title,
      description: lesson.description,
      time: lesson.time,
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
  return (
    <>
      {!loading && (
        <div className="flex flex-col gap-6 px-6 py-5">
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
            Edit Class{step === 1 ? " / Lessons" : ""}
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
              handleDuplicateLesson={handleDuplicateLesson}
              handleDeleteLesson={handleDeleteLesson}
              previousPage={() => setStep(0)}
              handleSaveClass={() => handleSaveClass()}
              handleLessonInputChange={handleLessonInputChange}
              setData={setData}
              addLesson={createLesson}
              editableLesson={editableLesson}
              setEditableLesson={setEditableLesson}
            />
          )}
        </div>
      )}
    </>
  );
};
