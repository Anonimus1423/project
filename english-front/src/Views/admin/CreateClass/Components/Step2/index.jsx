import { Button } from "@mui/material";
import React, { useRef, useEffect, useState } from "react";
import { DragAndDropLessons } from "../DragAndDropLessons";
import LessonEdit from "../LessonEdit";
import { Editor } from "@tinymce/tinymce-react";
import LessonTestEditor from "../LessonTestEditor";

const CreateClassStep2 = ({
  data,
  addLesson,
  editableLesson,
  setEditableLesson,
  handleLessonInputChange,
  previousPage,
  handleCreateClass,
  handleDeleteLesson,
  handleDuplicateLesson,
  addQuizeToLesson,
  setData,
  handleDeleteQuize,
  dragAndDropquizes,
  handleDuplicateQuize,
  changeEditableQuize,
}) => {
  const [editorKey, setEditorKey] = useState(process.env.REACT_APP_TINY);
  const editorRef = useRef();
  useEffect(() => {
    setEditorKey(null);
    setTimeout(() => {
      setEditorKey(process.env.REACT_APP_TINY);
    }, 0);
  }, [editableLesson?.lesson?.slug]);
  return (
    <div className="flex flex-col gap-12">
      <div className="flex gap-6">
        <div className="min-w-[330px] flex flex-col gap-5">
          <DragAndDropLessons
            setEditableLesson={setEditableLesson}
            lessons={data.lessons}
            handleDuplicateLesson={handleDuplicateLesson}
            handleDeleteLesson={handleDeleteLesson}
            changeLessons={(newLessons) =>
              setData({ ...data, lessons: newLessons })
            }
          />
          <Button color="success" onClick={addLesson} variant="outlined">
            Add New Lesson
          </Button>
        </div>
        <div className="w-[100%]">
          {!editableLesson && <span>Please Create Lesson</span>}
          {editableLesson && (
            <LessonEdit
              data={editableLesson.lesson}
              index={editableLesson.index}
              onChange={handleLessonInputChange}
            />
          )}
        </div>
      </div>
      {editableLesson && (
        <div className="w-1/1">
          <Editor
            key={editorKey}
            onInit={(evt, editor) => (editorRef.current = editor)}
            initialValue={editableLesson.lesson.description}
            onEditorChange={(e) => handleLessonInputChange("description", e)}
            init={{
              height: 500,
              menubar: false,
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "preview",
                "help",
                "wordcount",
                "codesample",
                "directionality",
                "emoticons",
                "fullscreen",
                "fullpage",
                "imagetools",
                "nonbreaking",
                "insertdatetime",
              ],
              menubar: "file view",
              fullpage_default_doctype: "<!DOCTYPE html>",
              default_link_target: "_blank",
              toolbar:
                "undo redo nonbreaking | image media insertdatetime imagetools | fullpage fullscreen emoticons | ltr rtl | anchor link charmap code codesample | blocks | " +
                "bold italic forecolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help ",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
          />
        </div>
      )}
      {editableLesson && (
        <LessonTestEditor
          dragAndDropquizes={dragAndDropquizes}
          changeEditableQuize={changeEditableQuize}
          addQuizeToLesson={addQuizeToLesson}
          lesson={editableLesson}
          handleDuplicateQuize={handleDuplicateQuize}
          handleDeleteQuize={handleDeleteQuize}
        />
      )}
      <div className="flex mt-auto w-1/1 justify-between">
        <Button color="success" onClick={previousPage} variant="outlined">
          Previos
        </Button>
        <Button color="success" onClick={handleCreateClass} variant="contained">
          Create Class
        </Button>
      </div>
    </div>
  );
};

export default CreateClassStep2;
