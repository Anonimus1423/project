import React from "react";
import { Textarea } from "@mui/joy";
import { Button, TextareaAutosize, TextField } from "@mui/material";
import { Upload } from "./../../../../../Upload/index";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

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
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Level</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={data.level}
          label="Level"
          name="level"
          onChange={handleInputChange}
        >
          <MenuItem value={"None"}>None</MenuItem>
          <MenuItem value={"A1"}>A1</MenuItem>
          <MenuItem value={"A2"}>A2</MenuItem>
          <MenuItem value={"B1"}>B1</MenuItem>
          <MenuItem value={"B2"}>B2</MenuItem>
          <MenuItem value={"C1"}>C1</MenuItem>
          <MenuItem value={"C2"}>C2</MenuItem>
        </Select>
      </FormControl>
      <Button onClick={() => setStep(1)} variant="contained" color="success">
        Next Step
      </Button>
    </>
  );
};

export default ClassCreateStep1;
