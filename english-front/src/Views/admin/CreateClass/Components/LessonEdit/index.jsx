import { TextField } from "@mui/material";
import React, { useRef, useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Upload } from "../../../../../Upload";
import { copyToClipboard } from "../../../../../utils/copy";
import { Textarea } from "@mui/joy";

const LessonEdit = ({ data, onChange, index }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onChange(name, value);
  };
  const [editorKey, setEditorKey] = useState(process.env.REACT_APP_TINY);
  const editorRef = useRef();
  useEffect(() => {
    setEditorKey(null);
    setTimeout(() => {
      setEditorKey(process.env.REACT_APP_TINY);
    }, 0);
  }, [index]);
  return (
    <div className="flex flex-col gap-6 width-[100%]">
      <TextField
        value={data.title}
        className="width-1/1"
        onChange={handleInputChange}
        name="title"
        inputProps={{ maxLength: 30 }}
        label="Lesson Title"
      />
      <TextField
        value={data.time}
        className="width-1/1"
        onChange={handleInputChange}
        name="time"
        label="Minimum time for finish this lesson"
      />
      <div className="flex flex-col gap-2">
        <div className="text-xl">Lesson Video</div>
        <div dangerouslySetInnerHTML={{ __html: data.videoUrl }}></div>
        {/* <Upload handleUpload={(url) => onChange("videoUrl", url)} /> */}
        <Textarea
          value={data.videoUrl}
          name="videoUrl"
          onChange={handleInputChange}
          placeholder="Enter video embed"
        />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-xl">
          Insturction - After upload image url auto copied to the clipboard and
          you can past it in the editor
        </span>
        <Upload handleUpload={(url) => copyToClipboard(url)} />
      </div>
      {/* <Editor
        key={editorKey}
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue={data.description}
        onEditorChange={(e) => onChange("description", e)}
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
          ],
          toolbar:
            "undo redo | image media | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help ",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      /> */}
    </div>
  );
};

export default LessonEdit;
