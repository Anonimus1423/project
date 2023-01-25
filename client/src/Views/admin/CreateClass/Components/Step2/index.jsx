import { Button } from "@mui/material";
import React from "react";

const CreateClassStep2 = ({
  data,
  addLesson,
  editableLesson,
  setEditableLesson,
}) => {
  return (
    <div className="flex gap-6">
      <div className="width-1/3 flex flex-col gap-5">
        {data.lessons.map((e) => {
          return (
            <div className="width-1/1 flex items-center justify-between">
              <span className="text-1xl">{e.name}</span>
            </div>
          );
        })}
        <Button color="success" onClick={addLesson} variant="outlined">
          Add New Lesson
        </Button>
      </div>
      <div className="width-2/3">
        {!editableLesson && <span>Please Create Lesson</span>}
        {editableLesson && (
          <>
            <span>{editableLesson.lesson.name}</span>
          </>
        )}
      </div>
    </div>
  );
};

export default CreateClassStep2;
