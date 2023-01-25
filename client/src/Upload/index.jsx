import React from "react";
import cloudinary from "@cloudinary/url-gen";
import { Button } from "@mui/material";

export const Upload = ({ handleUpload }) => {
  const showWidget = () => {
    let widget = window.cloudinary.createUploadWidget(
      {
        cloudName: process.env.REACT_APP_CLOUDINARY_CLOUD,
        uploadPreset: process.env.REACT_APP_CLOUDINARY_PRESET,
        sources: ["local"],
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          handleUpload(result.info.url);
        }
      }
    );
    widget.open();
  };
  return (
    <Button onClick={() => showWidget()} variant="secondary">
      Upload
    </Button>
  );
};
