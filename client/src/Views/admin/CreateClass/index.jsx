import React, { useState } from "react";
import { toast } from "react-toastify";
import { createCourse } from "../../../Api/queries";
import { Upload } from "../../../Upload";
import useSumbitForm from "./../../../utils/submitForm";
import ClassCreateStep1 from "./Components/Step1";
import CreateClassStep2 from "./Components/Step2";

const CreateClass = () => {
  const [create] = useSumbitForm(createCourse);
  const [step, setStep] = useState(0);
  const [editableLesson, setEditableLesson] = useState(null);
  const [data, setData] = useState({
    title: "",
    description: "",
    picture_src: "",
    lessons: [],
    tags: "",
  });

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
        tags: data.tags.split(" "),
      },
      () => {
        toast.success("Course created successfully.");
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
    setData({
      ...data,
      lessons: [
        ...data.lessons,
        {
          name: "New Lesson",
          description: "",
          time: "15Minute",
        },
      ],
    });
    setEditableLesson({
      index: data.lessons.length,
      lesson: {
        name: "New Lesson",
        description: "",
        time: "15Minute",
      },
    });
  };
  console.log(data);
  return (
    <div className="flex flex-col gap-6 px-6 py-5">
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
