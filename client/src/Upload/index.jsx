import React from "react";
import cloudinary from "@cloudinary/url-gen";
export const Upload = () => {
  const showWidget = () => {
    let widget = window.cloudinary.createUploadWidget(
      {
        cloudName: process.env.REACT_APP_CLOUDINARY_CLOUD,
        uploadPreset: process.env.REACT_APP_CLOUDINARY_PRESET,
        sources: ["local"],
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          console.log(result.info.url);
        }
      }
    );
    widget.open();
  };
  return <button onClick={() => showWidget()}>Upload</button>;
};
