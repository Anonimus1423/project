import React from "react";
import { Textarea } from "@mui/joy";
import { Button, TextareaAutosize, TextField } from "@mui/material";
import { Upload } from "./../../../../../Upload/index";
const ClassCreateStep1 = ({ data, setData, setStep, handleInputChange }) => {
  return (
    <>
      <TextField
        value={data.title}
        label="Class Name"
        name="title"
        onChange={handleInputChange}
        placeholder="Enter course name"
      />
      <Textarea
        value={data.description}
        name="description"
        onChange={handleInputChange}
        placeholder="Enter course description"
      />
      <TextField
        value={data.tags}
        label="Enter class tags"
        name="tags"
        onChange={handleInputChange}
        placeholder="Tags will be splited by spaces"
      />
      {data.picture_src && <img width="200px" src={data.picture_src} />}
      <Upload
        handleUpload={(value) => {
          setData({
            ...data,
            picture_src: value,
          });
        }}
      />
      <Button onClick={() => setStep(1)} variant="contained" color="success">
        Next Step
      </Button>
    </>
  );
};

export default ClassCreateStep1;
