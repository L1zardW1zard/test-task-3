import React from "react";

import styles from "./UploadedImages.module.scss";

const UploadedImages = ({ img, i, onClickRemoveFile }) => {
  return (
    <div className={styles.uploadedImageItem}>
      <img src={`http://localhost:3000${img}`} alt="uploaded" />
      <button
        type="button"
        onClick={onClickRemoveFile}
        className={styles.deleteBtn}
        id={i}
      >
        Delete
      </button>
    </div>
  );
};

export default UploadedImages;
