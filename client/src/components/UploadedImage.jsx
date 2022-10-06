import React from "react";

const UploadedImage = ({ img, i, onClickRemoveFile }) => {
  return (
    <div className="uploaded-image-item">
      <img src={`http://localhost:3000${img}`} alt="uploaded" />
      <button
        type="button"
        onClick={onClickRemoveFile}
        className="delete-btn"
        id={i}
      >
        Delete
      </button>
    </div>
  );
};

export default UploadedImage;
